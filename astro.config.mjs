import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { rehypeWrapTables } from './src/plugins/rehype-wrap-tables.ts';

// Build a { slug -> lastmod ISO } map from blog frontmatter so the sitemap
// carries a real <lastmod> per post (updatedDate if set, else pubDate). This
// is the freshness signal Google uses to prioritize re-crawling changed URLs.
function blogLastmod() {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  const map = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const fm = (fs.readFileSync(path.join(dir, file), 'utf8').split('---')[1]) || '';
    const pub = /pubDate:\s*"?([0-9-]+)"?/.exec(fm)?.[1];
    const upd = /updatedDate:\s*"?([0-9-]+)"?/.exec(fm)?.[1];
    const d = upd || pub;
    if (d) map[file.replace(/\.md$/, '')] = new Date(d).toISOString();
  }
  return map;
}
const BLOG_LASTMOD = blogLastmod();
const BUILD_LASTMOD = new Date().toISOString();

export default defineConfig({
  site: 'https://seoshivam.pro',
  compressHTML: true,
  // One canonical URL form site-wide: NO trailing slash (root stays '/').
  // Keeps sitemap, <link rel=canonical>, og:url and the served URL identical,
  // and makes the Vercel adapter 308-redirect '/x/' -> '/x' so there's only
  // ever one indexable address per page. Internal links are all no-slash too.
  trailingSlash: 'never',
  // Windows: some setups miss file-change events; polling makes `src/content/blog/*.md` edits reliable in `astro dev`.
  vite: {
    server: {
      watch: {
        usePolling: process.platform === 'win32',
        interval: 300,
      },
    },
  },
  // Static by default (every page in src/pages renders at build time).
  // Files marked `export const prerender = false;` (currently only the
  // /api/contact endpoint) are deployed as Vercel serverless functions.
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
    // Old image URLs -> renamed SEO/AEO files. 301 permanent so any image-search
    // equity or inbound reference transfers to the new filename (no dead image URLs).
    // Portfolio /work/*.webp are intentionally NOT redirected: nothing links to them,
    // and a redirect would re-expose the real client names removed under NDA.
    '/shivam-attri.jpg': { status: 301, destination: '/shivam-attri-aeo-seo-specialist.jpg' },
    '/images/shivam-headshot.jpg': { status: 301, destination: '/images/shivam-attri-seo-podcast.jpg' },
    '/images/shivam-portrait-square.jpg': { status: 301, destination: '/images/shivam-attri-aeo-consultant-portrait.jpg' },
    '/images/gsc-platform-properties.jpg': { status: 301, destination: '/images/google-search-console-social-platform-properties.jpg' },
    '/images/seoshivampro-pagespeed.jpg': { status: 301, destination: '/images/seoshivam-pro-pagespeed-insights-perfect-score.jpg' },

    // ---------------------------------------------------------------------
    // LEGACY URL MIGRATION (old WordPress site -> this Astro rebuild).
    // These 11 old URLs are the exact set Shivam confirmed from the Wayback
    // archive (Aug 2026); each 301s to the closest live page so residual link
    // equity transfers instead of dying on a 404. Keys are slash-less: the old
    // indexed URLs carry a trailing slash, which trailingSlash:'never'
    // 308-strips first, then these 301s finish the hop. Every destination was
    // verified to return 200 before wiring. Do NOT add any URL here that has
    // not been confirmed against the archive or by Shivam (a URL 404'ing today
    // is not proof it was ever a real page).
    '/no-1-seo-expert-in-india': { status: 301, destination: '/services/seo' },
    '/best-web-development-services': { status: 301, destination: '/services/web-design' },
    '/best-digital-marketing-consultant-in-india': { status: 301, destination: '/about' },
    '/best-digital-marketing-and-web-development-services': { status: 301, destination: '/services' },
    '/best-social-media-marketing-services': { status: 301, destination: '/services' },
    '/contact-best-seo-expert': { status: 301, destination: '/contact' },
    '/blogs': { status: 301, destination: '/insights' },
    '/seo-consultant-how-to-become-an-seo-expert-in-2025': { status: 301, destination: '/insights' },
    '/seo-timeline-how-long-does-seo-take-in-2025': { status: 301, destination: '/insights' },
    '/local-seo-checklist-2024': { status: 301, destination: '/insights' },
    '/seo-for-website-expert-seo-strategies-to-rank-your-website-in-2025': { status: 301, destination: '/insights' },
  },
  integrations: [sitemap({
    serialize(item) {
      // Belt-and-suspenders: strip any trailing slash (except root) so the
      // sitemap <loc> exactly matches the canonical tag. Must run before the
      // lastmod match so the URL is normalized either way.
      try {
        const u = new URL(item.url);
        // Drop the trailing slash on every non-root path so <loc> matches the
        // page's <link rel=canonical> exactly. (The integration already does
        // this under trailingSlash:'never'; this is a guard if that changes.)
        // The integration also strips the ROOT slash; scripts/fix-sitemap-root.mjs
        // re-adds it in postbuild so the homepage <loc> matches its canonical
        // 'https://seoshivam.pro/'.
        if (u.pathname !== '/') u.pathname = u.pathname.replace(/\/+$/, '');
        item.url = u.href;
      } catch { /* leave item.url as-is if it can't be parsed */ }
      // Per-post lastmod for /insights/<slug>; build time for other pages.
      const m = item.url.match(/\/insights\/([^/]+)\/?$/);
      item.lastmod = (m && BLOG_LASTMOD[m[1]]) ? BLOG_LASTMOD[m[1]] : BUILD_LASTMOD;
      return item;
    },
  })],
  build: {
    inlineStylesheets: 'auto',
  },
  markdown: {
    rehypePlugins: [rehypeWrapTables],
    // Shiki — built-in syntax highlighter. Inlines colored <span> per
    // token. The brand picks 'github-dark-default' for a clean,
    // recognisable palette (purple keywords, light strings, blue idents).
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
});
