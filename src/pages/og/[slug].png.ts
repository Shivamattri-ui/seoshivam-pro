import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { buildOgCoverSvg } from '../../lib/og-cover';

/**
 * Per-blog OG image (raster). Rasterizes the branded 1200x630 cover SVG
 * to PNG so it qualifies for Google Discover and every social crawler.
 *
 * Endpoint: /og/<post-id>.png
 *
 * Why PNG: Google Discover only surfaces a post when it can pull a large,
 * high-quality RASTER image (>=1200px wide) enabled by max-image-preview:large.
 * SVG og:images are ignored by Discover, so blog posts point og:image and
 * Article schema at this PNG.
 *
 * Fonts are loaded explicitly from src/og-fonts so text renders identically
 * on the Vercel Linux build as it does locally (loadSystemFonts is off).
 * This route prerenders at build time (cwd is the project root), so a
 * cwd-relative path is reliable; import.meta.url is not, because the bundled
 * endpoint module lives outside src/ and would resolve the fonts to nothing.
 */
const FONT_DIR = path.join(process.cwd(), 'src', 'og-fonts');

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const svg = buildOgCoverSvg((props as any).post);

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#050608',
    font: {
      fontDirs: [FONT_DIR],
      loadSystemFonts: false,
      defaultFontFamily: 'Syne',
      serifFamily: 'Instrument Serif',
      sansSerifFamily: 'Syne',
      monospaceFamily: 'JetBrains Mono',
    },
  });

  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
