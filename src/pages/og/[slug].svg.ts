import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

/**
 * Per-blog dynamic OG image generator.
 *
 * Returns a 1200x630 SVG sized for social-card preview, branded to
 * match the homepage's editorial cover (blue gradient mesh, blueprint
 * grid, animated-gradient title rendered as a static gradient at this
 * resolution since social platforms cannot animate).
 *
 * Endpoint: /og/<post-id>.svg
 *
 * Note: SVG og:image is supported by Twitter X, modern Facebook, and
 * LinkedIn. Older crawlers fall back to the og:image:type meta hint.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
};

const escape = (s: string) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Wrap a long title across lines with a max char count per line.
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
      if (lines.length === maxLines - 1) {
        // Last line: keep adding remaining words and ellipsize if needed
        const rest = words.slice(words.indexOf(w)).join(' ');
        lines.push(rest.length > maxChars ? rest.slice(0, maxChars - 1).trimEnd() + '…' : rest);
        return lines;
      }
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

const catLabels: Record<string,string> = {
  aeo: 'ANSWER ENGINE OPTIMIZATION',
  seo: 'SEARCH ENGINE OPTIMIZATION',
  'ai-search': 'AI SEARCH VISIBILITY',
  'web-design': 'AI-VISIBLE WEB DESIGN',
};

export const GET: APIRoute = async ({ props }) => {
  const post = (props as any).post;
  const title = post.data.title as string;
  const category = post.data.category as string;
  const readTime = post.data.readTime as string;
  const lines = wrap(title, 28, 3);
  const catLabel = catLabels[category] || category.toUpperCase();
  const date = (post.data.pubDate as Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();

  const titleY = 250;
  const lineHeight = 92;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0B14"/>
      <stop offset="100%" stop-color="#050608"/>
    </linearGradient>
    <radialGradient id="g1" cx="90%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#4F8EF7" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="#4F8EF7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="10%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#1A3A8F" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1A3A8F" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="title" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4F8EF7"/>
      <stop offset="50%" stop-color="#A8C8FF"/>
      <stop offset="100%" stop-color="#4F8EF7"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  <!-- Top strip: brand + category -->
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="600" letter-spacing="3" fill="rgba(255,255,255,0.55)">
    <text x="80" y="80">SEOSHIVAM.PRO &#183; INSIGHTS</text>
    <text x="1120" y="80" text-anchor="end" fill="#4F8EF7">${escape(catLabel)}</text>
  </g>
  <line x1="80" y1="100" x2="1120" y2="100" stroke="rgba(79,142,247,0.35)" stroke-width="1"/>

  <!-- Title -->
  <g font-family="Georgia, 'Instrument Serif', serif" font-style="italic" font-size="78" font-weight="400" fill="url(#title)" letter-spacing="-2">
    ${lines.map((l, i) => `<text x="80" y="${titleY + i * lineHeight}">${escape(l)}</text>`).join('\n    ')}
  </g>

  <!-- Bottom strip: meta -->
  <line x1="80" y1="540" x2="1120" y2="540" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
  <g font-family="'Syne', sans-serif" font-size="22" font-weight="600" fill="#F5F2EC" letter-spacing="-0.3">
    <text x="80" y="582">By Shivam Attri</text>
  </g>
  <g font-family="'JetBrains Mono', monospace" font-size="14" font-weight="500" letter-spacing="2.4" fill="rgba(245,242,236,0.55)">
    <text x="290" y="582">${escape(date)} &#183; ${escape(readTime)} READ</text>
    <text x="1120" y="582" text-anchor="end" fill="#4F8EF7">SEOSHIVAM.PRO</text>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
