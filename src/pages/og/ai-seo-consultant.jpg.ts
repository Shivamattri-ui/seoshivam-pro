import type { APIRoute } from 'astro';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

/**
 * Share image for /ai-seo-consultant (1200x630 JPEG; photo-based, so JPEG keeps it near 60KB).
 *
 * Endpoint: /og/ai-seo-consultant.jpg
 *
 * Same look as the page hero in its default (dark) theme: the mountain photo
 * cropped like the hero (object-position center 42%), the warm hero tint, the
 * "AI SEO Consultant" badge, both H1 lines and the brand wordmark.
 * resvg ignores weight on the variable Syne font, so the ExtraBold lines get a
 * same-colour round stroke to match the hero weight.
 * The photo is cropped with sharp; the text layer is an SVG rasterized by
 * resvg with the bundled fonts (cwd-relative font dir, see og-image.png.ts).
 */
const FONT_DIR = path.join(process.cwd(), 'src', 'og-fonts');
const PHOTO = path.join(process.cwd(), 'public', 'images', 'ai-seo-hero-background.jpg');
const W = 1200;
const H = 630;

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="tint" cx="50%" cy="50%" r="62%">
      <stop offset="0" stop-color="#080604" stop-opacity="0.5"/>
      <stop offset="0.55" stop-color="#080604" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#080604" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c0906" stop-opacity="0.26"/>
      <stop offset="0.42" stop-color="#0c0906" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#080604" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="line2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#9CC2FF"/>
      <stop offset="0.5" stop-color="#7BAEFF"/>
      <stop offset="1" stop-color="#4F8EF7"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4F8EF7"/>
      <stop offset="1" stop-color="#7BAEFF"/>
    </linearGradient>
    <filter id="soft" x="-10%" y="-30%" width="120%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
      <feOffset dy="2" result="b"/>
      <feFlood flood-color="#000" flood-opacity="0.5"/>
      <feComposite in2="b" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#tint)"/>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>

  <g transform="translate(600 132)">
    <rect x="-150" y="-23" width="300" height="46" rx="23" fill="#0e0b08" fill-opacity="0.58" stroke="#4F8EF7" stroke-width="1.5"/>
    <circle cx="-118" cy="0" r="6" fill="#7BAEFF"/>
    <text x="10" y="6" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="500" letter-spacing="3" fill="#9CC2FF">AI SEO CONSULTANT</text>
  </g>

  <g filter="url(#soft)" text-anchor="middle">
    <text x="600" y="262" font-family="'Instrument Serif', serif" font-style="italic" font-size="74" fill="#F6F1E9" letter-spacing="-0.5">Your buyers ask AI</text>
    <text x="600" y="340" font-family="'Instrument Serif', serif" font-style="italic" font-size="74" fill="#F6F1E9" letter-spacing="-0.5">before they ask Google.</text>
    <text x="600" y="422" font-family="'Syne', sans-serif" font-size="46" font-weight="800" fill="url(#line2)" stroke="url(#line2)" stroke-width="2.2" stroke-linejoin="round" letter-spacing="-0.4">I make sure both find you.</text>
  </g>

  <text x="600" y="560" text-anchor="middle" font-size="34" letter-spacing="-0.4"><tspan font-family="'Syne', sans-serif" font-weight="800" fill="#F5F2EC" stroke="#F5F2EC" stroke-width="1.5" stroke-linejoin="round">seo</tspan><tspan font-family="'Instrument Serif', serif" font-style="italic" fill="url(#mark)">shivam</tspan><tspan font-family="'Syne', sans-serif" font-size="24" font-weight="600" fill="#C9C4BA">.pro</tspan></text>
</svg>`;

export const GET: APIRoute = async () => {
  const text = new Resvg(overlay, {
    fitTo: { mode: 'width', value: W },
    font: {
      fontDirs: [FONT_DIR],
      loadSystemFonts: false,
      defaultFontFamily: 'Syne',
      serifFamily: 'Instrument Serif',
      sansSerifFamily: 'Syne',
      monospaceFamily: 'JetBrains Mono',
    },
  }).render().asPng();

  // Hero crop: width 1200 gives 750 tall, keep the band centred at 42% like object-position.
  const png = await sharp(PHOTO)
    .resize(W, 750)
    .extract({ left: 0, top: Math.round((750 - H) * 0.42), width: W, height: H })
    .composite([{ input: text }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
