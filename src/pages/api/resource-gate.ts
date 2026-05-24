/**
 * POST /api/resource-gate — email-gated resource requests (list 3, server-side Brevo).
 *
 * Flow:
 *   1. Add contact to Brevo list 3 (LEAD_SOURCE: resource:<id>)
 *   2. Send transactional email directly with the download link (no Brevo automation needed)
 *   3. Return { ok: true, downloadUrl } so the frontend can show a live download button
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const LIST_ID = 3;
const MIN_FILL_MS = 1200;

const NOTIFY_FROM_EMAIL = 'shivamattri27@gmail.com';
const NOTIFY_FROM_NAME  = 'Shivam Attri';
const SITE_BASE         = 'https://seoshivam.pro';

const ALLOWED = new Set([
  'aeo-audit-80',
  'aeo-content-brief-notion',
  'claude-skills-seo-pdf',
]);

/** Resources with a real hosted file return a downloadUrl and trigger a delivery email. */
const RESOURCE_DELIVERY: Record<string, { downloadUrl: string; label: string; subject: string }> = {
  'aeo-audit-80': {
    downloadUrl: `${SITE_BASE}/downloads/aeo-audit-80.pdf`,
    label: '80-Point AEO Audit',
    subject: 'Your 80-Point AEO Audit is here — seoshivam.pro',
  },
};

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

function buildDeliveryEmail(email: string, delivery: { downloadUrl: string; label: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${delivery.label}</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 0">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%">

        <!-- Header -->
        <tr><td style="padding:0 0 32px">
          <a href="${SITE_BASE}" style="text-decoration:none;font-size:22px;font-weight:800;letter-spacing:-.02em;color:#F5F2EC">
            seo<em style="font-style:italic;color:#4F8EF7">shivam</em>.pro
          </a>
        </td></tr>

        <!-- Body card -->
        <tr><td style="background:#0F0F0F;border:1px solid #2A2A2A;border-radius:12px;padding:40px">

          <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#4F8EF7">
            YOUR RESOURCE IS READY
          </p>
          <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#F5F2EC;line-height:1.2">
            ${delivery.label}
          </h1>
          <p style="margin:0 0 28px;font-size:15px;color:#A8A49C;line-height:1.7">
            Thanks for downloading. The file opens directly in your browser — bookmark it, or save a copy to your device for offline use.
          </p>

          <!-- CTA button -->
          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr><td style="background:linear-gradient(135deg,#4F8EF7,#1A3A8F);border-radius:8px">
              <a href="${delivery.downloadUrl}" target="_blank"
                 style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;letter-spacing:.04em;color:#ffffff;text-decoration:none">
                Open PDF &rarr;
              </a>
            </td></tr>
          </table>

          <p style="margin:0 0 4px;font-size:12px;color:#5C5954">Or copy this link:</p>
          <p style="margin:0 0 32px;font-size:12px;color:#4F8EF7;word-break:break-all">
            <a href="${delivery.downloadUrl}" style="color:#4F8EF7">${delivery.downloadUrl}</a>
          </p>

          <hr style="border:none;border-top:1px solid #2A2A2A;margin:0 0 28px">

          <p style="margin:0 0 8px;font-size:14px;color:#A8A49C;line-height:1.6">
            Questions about implementing the audit? Reply to this email and I will help directly.
          </p>
          <p style="margin:0;font-size:14px;color:#A8A49C;line-height:1.6">
            For a full AEO implementation, see the
            <a href="${SITE_BASE}/services/aeo" style="color:#4F8EF7;text-decoration:none">AEO strategy page</a>
            or <a href="${SITE_BASE}/contact" style="color:#4F8EF7;text-decoration:none">start with an audit</a>.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:28px 0 0">
          <p style="margin:0;font-size:11px;color:#5C5954;line-height:1.6">
            Shivam Attri &middot; AEO Specialist &middot; Gurugram, India &middot; Available globally<br>
            <a href="${SITE_BASE}" style="color:#5C5954">${SITE_BASE}</a> &middot;
            <a href="mailto:hello@seoshivam.pro" style="color:#5C5954">hello@seoshivam.pro</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
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
    const isDuplicate =
      (res.status === 400 || res.status === 409) &&
      (text.toLowerCase().includes('duplicate') || text.toLowerCase().includes('already exists') || res.status === 409);

    const contactOk = res.ok || res.status === 204 || isDuplicate;

    if (!contactOk) {
      return json(
        { ok: false, error: 'Could not save your request. Email hello@seoshivam.pro with the resource name.', detail: text.slice(0, 200) },
        502,
      );
    }

    // ── Send delivery email if this resource has a hosted file ──────────────────
    const delivery = RESOURCE_DELIVERY[resourceId];
    if (delivery) {
      // Fire and forget — don't fail the whole request if the email bounces
      fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          sender: { name: NOTIFY_FROM_NAME, email: NOTIFY_FROM_EMAIL },
          to: [{ email }],
          replyTo: { email: 'hello@seoshivam.pro', name: 'Shivam Attri' },
          subject: delivery.subject,
          htmlContent: buildDeliveryEmail(email, delivery),
        }),
      }).catch(() => {/* silent — contact was saved, email is best-effort */});

      return json({
        ok: true,
        message: isDuplicate
          ? 'Already subscribed. Your download link is below.'
          : 'You are in. Your download link is below.',
        downloadUrl: delivery.downloadUrl,
      });
    }

    // Resources without a hosted file yet — rely on Brevo automation
    return json({
      ok: true,
      message: isDuplicate
        ? 'You are already on the list. Check your inbox or spam for the file.'
        : 'You are on the list. Check your inbox for the file.',
    });

  } catch {
    return json({ ok: false, error: 'Network error. Try again later.' }, 502);
  }
};

export const GET: APIRoute = async () => json({ ok: false, error: 'POST required' }, 405);
