# /public/work/ — Portfolio design screenshots

Referenced by `<PortfolioGallery />` on `/services/web-design`.
Default items live in `src/components/PortfolioGallery.astro`.

## Current WebP assets (~1024px wide, quality 82)

| File | Industry · Region |
|---|---|
| `corporate-gifting-ecommerce-website-us.webp` | Corporate gifting · US |
| `hospitality-hotel-website-india.webp` | Hospitality · IN |
| `it-recruitment-website-design.webp` | Recruitment + IT consulting · US |
| `audio-visual-company-website-us.webp` | Audio visual · US |

Filenames are anonymised by industry (never real brand names): all client work is under NDA.

Regenerate from source PNGs: `node scripts/optimize-portfolio.mjs`

## Adding more

1. Drop source into Cursor assets or project root.
2. Add mapping in `scripts/optimize-portfolio.mjs`.
3. Run the script, then add `image`, `imageAlt`, `imageWidth`, `imageHeight` to the gallery item.

Missing files fall back to the CSS gradient placeholder.
