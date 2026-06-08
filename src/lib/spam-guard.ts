import disposableDomains from 'disposable-email-domains';

const DISPOSABLE = new Set(disposableDomains.map((d) => d.toLowerCase()));

/** Reported abuse + SMS-to-email gateways bots use as throwaways. */
const EXTRA_BLOCKED = new Set([
  'a7gi.ru',
  'txt.att.net',
  'vtext.com',
  'tmomail.net',
  'messaging.sprintpcs.com',
  'message.alltel.com',
  'txt.bell.ca',
  'sms.rogers.com',
]);

const DOMAIN_MARKERS = [
  'tempmail',
  'temp-mail',
  'mailinator',
  'guerrillamail',
  'yopmail',
  'throwaway',
  'fakeinbox',
  'trashmail',
  'getnada',
  'sharklasers',
  'dispostable',
  'maildrop',
  '10minutemail',
  'tempinbox',
  'discard',
  'mohmal',
  'emailondeck',
  'mintemail',
  'spamgourmet',
  'mailnesia',
  'mailcatch',
  'spambox',
  'tempr',
  'tmpmail',
  'fakemail',
  'burnermail',
  'mail-temp',
  'tempail',
];

const BOT_UA_RE = /curl|wget|python-requests|scrapy|httpclient|java\/|go-http|libwww|headless|phantomjs|selenium|puppeteer/i;

export type GuardResult =
  | { ok: true }
  | { ok: false; silent: boolean; error: string };

export function extractEmailDomain(email: string): string {
  const at = email.lastIndexOf('@');
  if (at < 1) return '';
  return email.slice(at + 1).toLowerCase();
}

function domainChain(host: string): string[] {
  const parts = host.split('.').filter(Boolean);
  const chain: string[] = [];
  for (let i = 0; i < parts.length - 1; i++) {
    chain.push(parts.slice(i).join('.'));
  }
  return chain;
}

function isBlockedDomain(host: string): boolean {
  const h = host.toLowerCase();
  if (!h || !h.includes('.')) return true;

  for (const d of domainChain(h)) {
    if (DISPOSABLE.has(d) || EXTRA_BLOCKED.has(d)) return true;
    for (const marker of DOMAIN_MARKERS) {
      if (d.includes(marker)) return true;
    }
  }
  return false;
}

function looksRandomLocal(local: string): boolean {
  if (local.length < 10) return false;
  const digits = (local.match(/\d/g) || []).length;
  if (digits >= 6) return true;
  const consonantRun = local.match(/[bcdfghjklmnpqrstvwxyz]{6,}/i);
  return Boolean(consonantRun);
}

export function validateLeadEmail(email: string): GuardResult {
  const normalized = email.trim().toLowerCase();
  const domain = extractEmailDomain(normalized);
  if (!domain) {
    return { ok: false, silent: false, error: 'Enter a valid email.' };
  }

  if (isBlockedDomain(domain)) {
    return {
      ok: false,
      silent: true,
      error: 'Use a permanent email address. Temporary or disposable addresses are not accepted.',
    };
  }

  const local = normalized.split('@')[0] || '';
  if (looksRandomLocal(local) && domain.length <= 12) {
    return {
      ok: false,
      silent: true,
      error: 'Enter a valid email address.',
    };
  }

  return { ok: true };
}

export function validateSubmissionTiming(mountedAt: number, minFillMs: number): GuardResult {
  if (!mountedAt || mountedAt < 1) {
    return { ok: false, silent: true, error: 'ok' };
  }

  const now = Date.now();
  if (mountedAt > now + 120_000) {
    return { ok: false, silent: true, error: 'ok' };
  }

  const elapsed = now - mountedAt;
  if (elapsed < minFillMs) {
    return { ok: false, silent: false, error: 'Please take a moment before submitting.' };
  }

  return { ok: true };
}

export function validateUserAgent(userAgent: string | null | undefined): GuardResult {
  const ua = (userAgent || '').trim();
  if (!ua || ua.length < 12) {
    return { ok: false, silent: true, error: 'ok' };
  }
  if (BOT_UA_RE.test(ua)) {
    return { ok: false, silent: true, error: 'ok' };
  }
  return { ok: true };
}

export function validateLeadName(name: string): GuardResult {
  const n = name.trim();
  if (!n) return { ok: false, silent: false, error: 'Enter a real name.' };
  if (/https?:\/\//i.test(n) || /www\./i.test(n)) {
    return { ok: false, silent: true, error: 'Enter a real name.' };
  }
  if (n.length > 60 && !/\s/.test(n)) {
    return { ok: false, silent: true, error: 'Enter a real name.' };
  }
  return { ok: true };
}

export function guardResponse(result: GuardResult, json: (data: Record<string, unknown>, status?: number) => Response): Response | null {
  if (result.ok) return null;
  if (result.silent) {
    return json({ ok: true, message: result.error || 'ok' });
  }
  return json({ ok: false, error: result.error }, 400);
}
