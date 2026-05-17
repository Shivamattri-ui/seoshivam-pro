# Blog authoring (files live in `blog/`)

Add a **`.md` file** under `src/content/blog/`. Astro loads it automatically. URL:

`/insights/<filename-without-md>`

Example: `src/content/blog/my-new-post.md` → `/insights/my-new-post`

## Required frontmatter (`content.config.ts`)

| Field | Notes |
|-------|--------|
| `title` | String |
| `description` | Meta + AI surfaces |
| `pubDate` | `YYYY-MM-DD` |
| `category` | **Lowercase slug:** `aeo`, `seo`, `ai-search`, or `web-design` only |
| `readTime` | e.g. `"8 min"` |
| `featured` | `true` or `false` |

Optional: `updatedDate`, `ogImage`, `tldr`, `tags`, `faqs`.

**Do not** put non-post `.md` files inside `src/content/blog/` (they become posts). Keep docs like this file **outside** that folder.

Invalid frontmatter breaks validation until fixed (watch the dev terminal).

## After edits

Save the file. With `npm run dev`, the route should reload. If not: fix any terminal errors, hard refresh, or restart dev once.
