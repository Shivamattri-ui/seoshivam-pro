/**
 * POST /api/resource-gate — email-gated resource requests (list 3, server-side Brevo).
 *
 * Flow:
 *   1. Validate honeypot, time-trap, email, and resourceId.
 *   2. Add contact to Brevo list 3 with LEAD_SOURCE attribute.
 *   3. Return success — Brevo automation handles file delivery email.
 *
 * No download URL is returned to the browser. Users must check their inbox.
 * This keeps the email list as the gate and lets the Brevo automation build the relationship.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const LIST_ID = 3;
/** Timer starts when the user focuses the email field (client). Shorter window than the full contact form. */
const MIN_FILL_MS = 1200;

const ALLOWED = new Set([
  'aeo-audit-80',
  'aeo-content-brief-notion',
  'claude-skills-seo-pdf',
]);

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
          'BREVO_API_KEY is not set. Local: create a .env file in the project root with BREVO_API_KEY=your_key and restart npm run dev. Production: add BREVO_API_KEY in Vercel project settings, then redeploy.',
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

  // Honeypot
  const honey = clean(body.website, 100);
  if (honey) {
    return json({ ok: true, message: 'ok' });
  }

  // Time-trap
  const mountedAt = Number(body.mountedAt) || 0;
  const elapsed = Date.now() - mountedAt;
  if (mountedAt && elapsed < MIN_FILL_MS) {
    return json({ ok: false, error: 'Please take a moment before submitting.' }, 400);
  }

  const email = clean(body.email, 100).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Enter a valid email.' }, 400);
  }

  const resourceId = clean(body.resourceId, 64);
  if (!ALLOWED.has(resourceId)) {
    return json({ ok: false, error: 'Unknown resource.' }, 400);
  }

  const resourceTitle = clean(body.resourceTitle, 120);
  const local = email.split('@')[0] || 'subscriber';
  const leadSource = `resource:${resourceId}${resourceTitle ? ` · ${resourceTitle.slice(0, 80)}` : ''}`.slice(0, 200);

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

    if (res.ok || res.status === 204) {
      return json({ ok: true, message: 'Check your inbox — your download link is on its way.' });
    }

    // Duplicate contact — automation still fires for them
    if (res.status === 400 || res.status === 409) {
      const lower = text.toLowerCase();
      if (lower.includes('duplicate') || lower.includes('already exists') || res.status === 409) {
        return json({ ok: true, message: 'Already subscribed. Check your inbox or spam for the download link.' });
      }
      return json(
        { ok: false, error: 'Could not save your request. Email hello@seoshivam.pro with the resource name.', detail: text.slice(0, 200) },
        502,
      );
    }

    return json(
      { ok: false, error: 'Could not process. Email hello@seoshivam.pro with the resource name.', detail: text.slice(0, 200) },
      502,
    );
  } catch {
    return json({ ok: false, error: 'Network error. Try again later.' }, 502);
  }
};

export const GET: APIRoute = async () => json({ ok: false, error: 'POST required' }, 405);
