# /public/images/ — Personal photos used across the site

Drop photos here. Reference them in components by absolute path
(`/images/<filename>`). Each page can use a different photo so you
don't see the same face on every section.

## Photos referenced by the existing components

| Path | Where it shows up |
|---|---|
| `/images/shivam-portrait-square.jpg` | About page dossier portrait (hero zone) |
| `/images/shivam-portrait-tall.jpg` | ContactCta photo card (left of every contact form) |
| `/images/shivam-headshot.jpg` | Blog detail author card + bylines |
| `/images/shivam-working.jpg` | Footer brand column (optional editorial shot) |

The legacy `/shivam-attri.jpg` at the project root still works as a
fallback. Components use the new paths first and fall back to the
legacy file via the `onerror` handler.

## Image guidelines

- **Format:** JPG (better compression for photos than PNG/WebP at this size)
- **Square portrait:** 800×800 minimum
- **Tall portrait:** 800×1000 (4:5 aspect)
- **Headshot:** 600×600 minimum
- **File size:** under 200KB each — the build doesn't process these,
  so optimise externally (e.g. squoosh.app) before dropping in.
