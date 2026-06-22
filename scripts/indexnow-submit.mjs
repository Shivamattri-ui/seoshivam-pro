/**
 * IndexNow auto-submit. Runs as `postbuild` after `astro build`.
 *
 * Notifies IndexNow-participating engines (Bing, Yandex, Naver, Seznam) the
 * moment a new build is deployed, so new/updated pages get crawled fast. Bing's
 * index powers ChatGPT Search and Copilot, so this is the highest-value
 * "instant indexing" lever available to us. Google does NOT use IndexNow; for
 * Google we rely on sitemap <lastmod> + Search Console.
 *
 * The key is public by design (served at KEY_LOCATION). This script never fails
 * the build: any error is logged and we exit 0 so a deploy is never blocked.
 *
 * Runs only on Vercel PRODUCTION builds. Set INDEXNOW_FORCE=1 to run locally.
 */
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'seoshivam.pro';
const KEY = '557bee82cbe04cc4835072b085e3edbc';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// The Vercel adapter writes to dist/client; some setups surface it under
// .vercel/output/static. Check both so the script works either way.
const SITEMAP_CANDIDATES = [
  path.join(process.cwd(), 'dist', 'client', 'sitemap-0.xml'),
  path.join(process.cwd(), '.vercel', 'output', 'static', 'sitemap-0.xml'),
];

function log(...a) { console.log('[indexnow]', ...a); }

async function main() {
  // Only ping on real production deploys.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return log('skip: non-production deploy (', process.env.VERCEL_ENV, ')');
  }
  if (!process.env.VERCEL && !process.env.INDEXNOW_FORCE) {
    return log('skip: local build (set INDEXNOW_FORCE=1 to submit)');
  }

  const sitemap = SITEMAP_CANDIDATES.find(p => fs.existsSync(p));
  if (!sitemap) return log('skip: sitemap not found in', SITEMAP_CANDIDATES.join(' or '));
  const xml = fs.readFileSync(sitemap, 'utf8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (!urlList.length) return log('skip: no URLs in sitemap');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  // 200 OK and 202 Accepted both mean success.
  log(`submitted ${urlList.length} URLs -> ${res.status} ${res.statusText}`);
}

main().catch(err => log('error (non-fatal):', err?.message || err)).finally(() => process.exit(0));
