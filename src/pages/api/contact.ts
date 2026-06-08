/**
 * /api/contact — server-side lead capture endpoint.
 *
 * The browser CANNOT call api.brevo.com directly (CORS blocks it +
 * the API key would be exposed). This endpoint runs as a Vercel
 * serverless function, validates + sanitizes the payload, then makes
 * two Brevo calls:
 *
 *   1. POST /v3/contacts          → adds the lead to list 3
 *      (triggers any welcome automation set up in Brevo dashboard)
 *
 *   2. POST /v3/smtp/email        → sends a notification email to
 *      hello@seoshivam.pro so Shivam sees the lead in his inbox
 *
 * Both calls fire in parallel via Promise.allSettled. As long as the
 * notification email goes through, the request returns success — even
 * if the contact already exists (Brevo returns 400 for duplicates).
 *
 * Anti-abuse hardening:
 *   - Honeypot field check (silent success for bot submissions)
 *   - Time-trap: submissions under 2.5s after form mount are rejected
 *   - Length clamps + regex validation server-side
 *   - All HTML escaped before going into the notification email
 *   - Rate-limit hint header so the client can decide what to show
 *
 * Reads the Brevo API key from env so it is never bundled into the
 * client. Set BREVO_API_KEY in Vercel project env (Settings → Env Vars).
 */
import type { APIRoute } from 'astro';
import {
  guardResponse,
  validateLeadEmail,
  validateLeadName,
  validateSubmissionTiming,
  validateUserAgent,
} from '../../lib/spam-guard';

export const prerender = false; // Force this route to run as a function

/** Both addresses receive every lead notification. */
const NOTIFY_TO = [
  { email: 'hello@seoshivam.pro',    name: 'Shivam Attri' },
  { email: 'shivamattri27@gmail.com', name: 'Shivam Attri' },
];
const NOTIFY_FROM_EMAIL = 'hello@seoshivam.pro';
const NOTIFY_FROM_NAME = 'seoshivam.pro form';
/** All contact-form leads go to List 2 (leads). */
const CONTACT_LIST_ID = 2;
const MIN_FILL_MS = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE  = /^[A-Za-zÀ-ſ .'\-]{2,80}$/;
const PHONE_RE = /^[0-9 +\-]{5,20}$/;

function clean(raw: unknown, max: number): string {
  if (raw === undefined || raw === null) return '';
  return String(raw)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function escHtml(s: string): string {
  const map: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  };
  return s.replace(/[&<>"']/g, (c) => map[c]);
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
          'BREVO_API_KEY is not set. Local: add it to .env in the project root and restart npm run dev. Production: set it in Vercel Environment Variables and redeploy.',
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

  // ── 1. Honeypot ──
  const honey = clean(body.website, 100);
  if (honey) {
    // Silent fake-success for bots
    return json({ ok: true, message: 'ok' });
  }

  const uaBlock = guardResponse(validateUserAgent(request.headers.get('user-agent')), json);
  if (uaBlock) return uaBlock;

  // ── 2. Time-trap ──
  const mountedAt = Number(body.mountedAt) || 0;
  const timingBlock = guardResponse(validateSubmissionTiming(mountedAt, MIN_FILL_MS), json);
  if (timingBlock) return timingBlock;

  // ── 3. Sanitize + validate ──
  const name        = clean(body.name, 80);
  const email       = clean(body.email, 100).toLowerCase();
  const dial        = clean(body.dial, 6) || '+1';
  const phone       = clean(body.phone, 20);
  const service     = clean(body.service, 80);
  const budget      = clean(body.budget, 40);
  const deadline    = clean(body.deadline, 40);
  const sourceField = clean(body.source_field, 40);
  const message     = clean(body.message, 1500);
  const leadSrc     = clean(body.lead_source, 60) || 'unknown';
  const listId      = CONTACT_LIST_ID; // always List 2 — leads

  if (!NAME_RE.test(name)) return json({ ok: false, error: 'Enter a real name.' }, 400);
  const nameBlock = guardResponse(validateLeadName(name), json);
  if (nameBlock) return nameBlock;
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: 'Enter a valid email.' }, 400);
  const emailBlock = guardResponse(validateLeadEmail(email), json);
  if (emailBlock) return emailBlock;
  if (phone && !PHONE_RE.test(phone)) return json({ ok: false, error: 'Phone has invalid characters.' }, 400);
  if (!service)     return json({ ok: false, error: 'Select a service.' }, 400);
  if (!budget)      return json({ ok: false, error: 'Select a budget.' }, 400);
  if (!deadline)    return json({ ok: false, error: 'Select a deadline.' }, 400);
  if (!sourceField) return json({ ok: false, error: 'Select where you heard about me.' }, 400);

  const fullPhone = phone ? `${dial} ${phone}` : '';

  // ── 4. Brevo: add contact ──
  const attributes: Record<string, string> = {
    FIRSTNAME:    name.split(' ')[0] || name,
    LASTNAME:     name.split(' ').slice(1).join(' ') || '',
    FULLNAME:     name,
    SMS:          fullPhone,
    WHATSAPP:     fullPhone,
    SERVICE:      service,
    BUDGET:       budget,
    DEADLINE:     deadline,
    SOURCE_FIELD: sourceField,
    MESSAGE:      message,
    LEAD_SOURCE:  leadSrc,
    SUBMITTED_AT: new Date().toISOString(),
  };

  const headers: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
    'api-key': apiKey,
  };

  const addContactReq = fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, listIds: [listId], attributes, updateEnabled: true }),
  });

  // ── 5. Brevo: notification email to Shivam ──
  const notifyHtml = `
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#1A1714;line-height:1.6;max-width:640px;margin:0 auto;padding:24px">
      <p style="font-family:Georgia,serif;font-size:11px;letter-spacing:2px;color:#2554D6;margin:0 0 6px;text-transform:uppercase">SEOSHIVAM.PRO &middot; New lead</p>
      <h1 style="font-family:Georgia,serif;font-size:26px;margin:0 0 14px;color:#15110D;font-weight:400">${escHtml(name)} · ${escHtml(service)}</h1>
      <p style="margin:0 0 24px;color:#54504A">Submitted from <strong>${escHtml(leadSrc)}</strong> at ${escHtml(new Date().toLocaleString())}</p>
      <table style="border-collapse:collapse;width:100%;font-size:13px;border:1px solid #E0DAD0;border-radius:8px;overflow:hidden">
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;width:140px;border-bottom:1px solid #E0DAD0">Name</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(name)}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Email</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0"><a href="mailto:${escHtml(email)}" style="color:#2554D6">${escHtml(email)}</a></td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Phone</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(fullPhone || 'n/a')}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Service</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(service)}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Budget</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(budget)}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Deadline</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(deadline)}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;border-bottom:1px solid #E0DAD0">Heard via</td><td style="padding:10px 14px;border-bottom:1px solid #E0DAD0">${escHtml(sourceField)}</td></tr>
        <tr><td style="padding:10px 14px;background:#F1ECE3;font-weight:600;vertical-align:top">Message</td><td style="padding:10px 14px;white-space:pre-wrap">${escHtml(message || 'n/a')}</td></tr>
      </table>
      <p style="margin:24px 0 0;color:#54504A;font-size:12px">Reply directly to this email to respond to ${escHtml(name)}.</p>
    </div>`;

  const sendNotifyReq = fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      to: NOTIFY_TO,
      replyTo: { email, name },
      sender: { email: NOTIFY_FROM_EMAIL, name: NOTIFY_FROM_NAME },
      subject: `New lead: ${name} · ${service}`,
      htmlContent: notifyHtml,
    }),
  });

  // ── 6. Run both, evaluate outcomes ──
  const [contactRes, notifyRes] = await Promise.allSettled([addContactReq, sendNotifyReq]);

  const contactOk =
    contactRes.status === 'fulfilled' &&
    (contactRes.value.ok ||
     contactRes.value.status === 204 ||
     contactRes.value.status === 400 /* duplicate email */ ||
     contactRes.value.status === 409);

  const notifyOk =
    notifyRes.status === 'fulfilled' &&
    (notifyRes.value.ok || notifyRes.value.status === 201);

  // Both legs failed → real failure
  if (!contactOk && !notifyOk) {
    let detail = 'Brevo API failed';
    try {
      if (contactRes.status === 'fulfilled') {
        detail = `contact ${contactRes.value.status}: ` + (await contactRes.value.text()).slice(0, 200);
      } else if (notifyRes.status === 'fulfilled') {
        detail = `notify ${notifyRes.value.status}: ` + (await notifyRes.value.text()).slice(0, 200);
      } else {
        detail = (contactRes.reason as Error)?.message || 'Network error';
      }
    } catch {}
    return json({ ok: false, error: 'Could not deliver. Email hello@seoshivam.pro directly.', detail }, 502);
  }

  return json({
    ok: true,
    message: 'Got it. Replying within 4 hours from hello@seoshivam.pro.',
    delivery: { contact: contactOk, email: notifyOk },
  });
};

export const GET: APIRoute = async () => {
  return json({ ok: false, error: 'POST required' }, 405);
};
