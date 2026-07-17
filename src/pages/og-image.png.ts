import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

/**
 * Default site OG image (raster). Rasterizes public/og-image.svg to PNG.
 *
 * Endpoint: /og-image.png
 *
 * Why this exists: no major social crawler renders an SVG og:image. Facebook,
 * X, LinkedIn, WhatsApp, Slack and iMessage all require a raster, and Google
 * Discover ignores SVG entirely. The per-blog covers were migrated to PNG
 * (see og/[slug].png.ts) but the SITE-WIDE DEFAULT still pointed at the SVG,
 * so every non-blog page (home, about, work, services, contact, tools,
 * resources) shared a blank preview. This is that fix.
 *
 * Fonts load explicitly from src/og-fonts with loadSystemFonts off, so text
 * renders identically on the Vercel Linux build. Use a cwd-relative path, NOT
 * import.meta.url: the bundled endpoint lives outside src/ and would resolve
 * the font dir to nothing, silently producing a background-only image.
 */
const FONT_DIR = path.join(process.cwd(), 'src', 'og-fonts');
const SVG_PATH = path.join(process.cwd(), 'public', 'og-image.svg');

export const GET: APIRoute = async () => {
  const svg = fs.readFileSync(SVG_PATH, 'utf-8');

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

  // Same lossless re-encode as the per-blog covers: ~66% smaller than resvg's
  // raw output with pixel-identical result, so the gradients stay band-free.
  const png = await sharp(resvg.render().asPng())
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
