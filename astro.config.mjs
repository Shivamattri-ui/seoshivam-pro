import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { rehypeWrapTables } from './src/plugins/rehype-wrap-tables.ts';

export default defineConfig({
  site: 'https://seoshivam.pro',
  compressHTML: true,
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
  integrations: [sitemap()],
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
