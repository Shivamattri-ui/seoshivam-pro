# /public/images/ — Personal photos used across the site

Drop photos here. Reference them in components by absolute path
(`/images/<filename>`). Each page can use a different photo so you
don't see the same face on every section.

## Photos referenced by the existing components

| Path | Where it shows up |
|---|---|
| `/images/shivam-attri-aeo-consultant-portrait.jpg` | About dossier + ContactCta + consultant portrait (800×1000) |
| `/images/shivam-attri-seo-podcast.jpg` | Blog author card, bylines, FAQ avatars (600×600) |

The root `/shivam-attri-aeo-seo-specialist.jpg` (520×640) is the homepage
hero photo and the shared `onerror` fallback for the avatars above.
Filenames carry the name + role for image-search relevance.

## Image guidelines

- **Format:** JPG (better compression for photos than PNG/WebP at this size)
- **Square portrait:** 800×800 minimum
- **Tall portrait:** 800×1000 (4:5 aspect)
- **Headshot:** 600×600 minimum
- **File size:** under 200KB each — the build doesn't process these,
  so optimise externally (e.g. squoosh.app) before dropping in.
