/**
 * GET /api/robots-txt?url=<site-or-robots-url>
 *
 * Server-side robots.txt fetch for the AI Bot Access Checker
 * (/tools/robots-txt-checker). Runs as a Vercel serverless function so the
 * browser never has to reach a third-party CORS proxy (those rot: corsproxy.io
 * now 403s anonymous calls, allorigins.win goes down). Same-origin, no CORS.
 *
 * Returns JSON: { ok, status, content, finalUrl } on success,
 * or { ok:false, error } with a friendly reason.
 *
 * Only ever fetches "/robots.txt" on the requested host, and blocks
 * loopback / private / link-local / metadata hosts to limit SSRF surface.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const FETCH_TIMEOUT_MS = 10_000;
const MAX_BYTES = 512 * 1024; // 512 KB is far more than any real robots.txt

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

/** Block loopback, private, link-local and cloud-metadata hosts (SSRF guard). */
function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, ''); // strip IPv6 brackets
  if (!h) return true;
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (!h.includes('.') && !h.includes(':')) return true; // single-label intranet hosts

  // IPv4 literal ranges
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if ([a, b, Number(m[3]), Number(m[4])].some((n) => n > 255)) return true;
    if (a === 0 || a === 127 || a === 10) return true;              // this-host, loopback, private
    if (a === 169 && b === 254) return true;                        // link-local + cloud metadata
    if (a === 172 && b >= 16 && b <= 31) return true;               // private
    if (a === 192 && b === 168) return true;                        // private
    if (a === 100 && b >= 64 && b <= 127) return true;              // CGNAT
    if (a >= 224) return true;                                      // multicast / reserved
  }

  // IPv6 loopback / unique-local / link-local
  if (h === '::1' || h.startsWith('fc') || h.startsWith('fd') || h.startsWith('fe80') || h.startsWith('::ffff:')) return true;

  return false;
}

async function handle(target: string): Promise<Response> {
  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return json({ ok: false, error: 'Enter a valid website URL.' }, 400);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return json({ ok: false, error: 'Only http and https URLs are supported.' }, 400);
  }
  if (isBlockedHost(parsed.hostname)) {
    return json({ ok: false, error: 'That host is not allowed.' }, 400);
  }

  // Always fetch /robots.txt on the requested host, ignoring any path the caller sent.
  const robotsUrl = `${parsed.protocol}//${parsed.host}/robots.txt`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(robotsUrl, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; seoshivam.pro AI Bot Access Checker; +https://seoshivam.pro/tools/robots-txt-checker)',
        accept: 'text/plain, */*',
      },
    });
    clearTimeout(timer);

    // No robots.txt = everything allowed by default. Report empty, not an error.
    if (res.status === 404 || res.status === 410) {
      return json({ ok: true, status: res.status, content: '', finalUrl: res.url });
    }
    if (!res.ok) {
      return json({ ok: false, status: res.status, error: `The site returned HTTP ${res.status} for /robots.txt.` });
    }

    const raw = await res.text();
    const content = raw.length > MAX_BYTES ? raw.slice(0, MAX_BYTES) : raw;
    return json({ ok: true, status: res.status, content, finalUrl: res.url });
  } catch (err) {
    clearTimeout(timer);
    const aborted = err instanceof Error && err.name === 'AbortError';
    return json({
      ok: false,
      error: aborted
        ? 'The site took too long to respond. Try again, or check that it is publicly reachable.'
        : 'Could not reach that site. Check the domain is spelled correctly and publicly accessible.',
    });
  }
}

export const GET: APIRoute = async ({ url }) => {
  const target = (url.searchParams.get('url') || '').trim();
  if (!target) return json({ ok: false, error: 'Missing url parameter.' }, 400);
  return handle(target);
};

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400);
  }
  const target = String(body.url || '').trim();
  if (!target) return json({ ok: false, error: 'Missing url parameter.' }, 400);
  return handle(target);
};
