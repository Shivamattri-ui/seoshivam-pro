/**
 * POST /api/subscribe — blog sidebar email capture only.
 * Server-side Brevo (never expose API key to the browser).
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const LIST_ID = Number(import.meta.env.BREVO_LIST_ID) || 3;
const MIN_FILL_MS = 1200;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(raw: unknown, max: number): string {
  if (raw === undefined || raw === null) return '';
  return String(raw)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.BREVO_API_KEY;
  if (!apiKey) {
    return json(
      {
        ok: false,
        error:
          'BREVO_API_KEY is not set. Local: add it to .env and restart npm run dev. Production: set it in Vercel and redeploy.',
      },
      500,
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON body.' }, 400);
  }

  const honey = clean(body.website, 100);
  if (honey) {
    return json({ ok: true, message: 'ok' });
  }

  const mountedAt = Number(body.mountedAt) || 0;
  const elapsed = Date.now() - mountedAt;
  if (mountedAt && elapsed < MIN_FILL_MS) {
    return json({ ok: false, error: 'Please take a moment before submitting.' }, 400);
  }

  const email = clean(body.email, 100).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Enter a valid email.' }, 400);
  }

  const allowedSources = new Set(['blog-sidebar', 'blog-newsletter', 'ai-score-tool']);
  const sourceRaw = clean(body.leadSource, 40);
  const leadSource = allowedSources.has(sourceRaw) ? sourceRaw : 'blog-newsletter';

  const local = email.split('@')[0] || 'subscriber';
  const attributes: Record<string, string> = {
    FIRSTNAME: local.slice(0, 40),
    LASTNAME: '',
    FULLNAME: local,
    LEAD_SOURCE: leadSource,
    SUBMITTED_AT: new Date().toISOString(),
  };

  const headers: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': apiKey,
  };

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        listIds: [LIST_ID],
        attributes,
        updateEnabled: true,
      }),
    });

    const text = await res.text().catch(() => '');
    const duplicate =
      res.status === 409 ||
      (res.status === 400 && /duplicate|already exist|already in list/i.test(text));

    const ok = res.ok || res.status === 204 || duplicate;

    if (!ok) {
      let errMsg = 'Could not subscribe. Try again in a moment.';
      if (res.status === 401) errMsg = 'Subscription service is not configured. Email hello@seoshivam.pro.';
      else if (res.status === 400) errMsg = 'Enter a valid email address.';
      return json(
        { ok: false, error: errMsg, detail: text.slice(0, 160) },
        res.status === 401 ? 500 : 502,
      );
    }

    return json({ ok: true, message: 'Subscribed.' });
  } catch {
    return json({ ok: false, error: 'Network error. Try again later.' }, 502);
  }
};

export const GET: APIRoute = async () => json({ ok: false, error: 'POST required' }, 405);
