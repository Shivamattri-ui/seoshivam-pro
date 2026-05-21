/**
 * IndexNow batch submission — seoshivam.pro
 *
 * Reads the live sitemap-index.xml, collects every <loc> URL, and
 * submits them all in a single POST to api.indexnow.org (which
 * distributes to Bing, Yandex, and all other IndexNow partners).
 *
 * Run via GitHub Action after every push to main (giving Vercel ~90s
 * to finish its deploy first). No changes to site code, no CWV impact.
 */

const KEY      = 'seoshivampro';
const HOST     = 'seoshivam.pro';
const SITE     = `https://${HOST}`;
const KEY_LOC  = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'IndexNowBot/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

async function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*(https?:\/\/[^\s<]+)\s*<\/loc>/g)]
    .map(m => m[1].trim());
}

async function collectUrls() {
  // sitemap-index.xml lists the individual sitemaps
  const indexXml = await fetchText(`${SITE}/sitemap-index.xml`);
  const sitemapUrls = await extractLocs(indexXml);

  if (!sitemapUrls.length) {
    // Fallback: maybe it is a plain sitemap, not an index
    return extractLocs(indexXml);
  }

  const all = [];
  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetchText(sitemapUrl);
    const locs = await extractLocs(xml);
    all.push(...locs);
  }
  return all;
}

async function submit(urls) {
  const body = JSON.stringify({
    host:        HOST,
    key:         KEY,
    keyLocation: KEY_LOC,
    urlList:     urls,
  });

  const res = await fetch(ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  return res.status;
}

// ── main ──────────────────────────────────────────────────────────────

console.log('Collecting URLs from sitemap...');
const urls = await collectUrls();

if (!urls.length) {
  console.error('No URLs found in sitemap. Aborting.');
  process.exit(1);
}

console.log(`Found ${urls.length} URLs:`);
urls.forEach(u => console.log('  ', u));

console.log(`\nSubmitting to IndexNow (${ENDPOINT})...`);
const status = await submit(urls);

if (status === 200 || status === 202) {
  console.log(`Done. Status ${status} — submission accepted.`);
} else if (status === 422) {
  console.error(`Status 422 — key file not yet accessible at ${KEY_LOC}`);
  process.exit(1);
} else if (status === 429) {
  console.warn(`Status 429 — rate limited. Will retry on next deploy.`);
} else {
  console.error(`Unexpected status: ${status}`);
  process.exit(1);
}
