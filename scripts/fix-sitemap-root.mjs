/**
 * Restore the homepage trailing slash in the generated sitemap.
 * Runs as part of `postbuild`, before the IndexNow submit.
 *
 * Under `trailingSlash: 'never'`, @astrojs/sitemap deliberately strips the
 * root slash, emitting `<loc>https://seoshivam.pro</loc>`. We standardize on
 * NO trailing slash for every leaf page (so <loc> matches <link rel=canonical>
 * exactly and there's one indexable URL per page), but the homepage canonical
 * is `https://seoshivam.pro/`. This re-adds that single root slash so the
 * sitemap and the homepage canonical agree.
 *
 * Only the exact bare-root <loc> is touched: subpage locs (which carry a path)
 * and the sitemap-index file locs (which carry a filename) never match. The
 * script never fails the build.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT_NO_SLASH = '<loc>https://seoshivam.pro</loc>';
const ROOT_WITH_SLASH = '<loc>https://seoshivam.pro/</loc>';

// The Vercel adapter writes to dist/client; some setups surface it under
// .vercel/output/static. Patch whichever exist.
const SITEMAP_CANDIDATES = [
  path.join(process.cwd(), 'dist', 'client', 'sitemap-0.xml'),
  path.join(process.cwd(), '.vercel', 'output', 'static', 'sitemap-0.xml'),
];

function log(...a) { console.log('[fix-sitemap-root]', ...a); }

function main() {
  let patched = 0;
  for (const file of SITEMAP_CANDIDATES) {
    if (!fs.existsSync(file)) continue;
    const xml = fs.readFileSync(file, 'utf8');
    if (!xml.includes(ROOT_NO_SLASH)) continue;
    fs.writeFileSync(file, xml.split(ROOT_NO_SLASH).join(ROOT_WITH_SLASH));
    patched++;
    log('patched root <loc> in', path.relative(process.cwd(), file));
  }
  if (!patched) log('nothing to patch (root already has its slash, or no sitemap found)');
}

try { main(); } catch (err) { log('error (non-fatal):', err?.message || err); }
