# seoshivam.pro — Locked Project Knowledge Base

**Last updated:** May 2026
**Status:** Pre-launch. Architecture locked. Content + screenshots being collected.
**Read this file completely before making any changes.** Most "bugs" reported in the past traced back to me not reading this file and re-deriving conventions on the fly. Don't repeat that.

---

## 1 · STORY + POSITIONING (do not rewrite without instruction)

Shivam Attri spent a year over-thinking how his personal brand site should look. Hired developers, none delivered. Tried Framer — too slow. Built this himself in Astro with Claude. **The site is itself proof of what AEO and AI-visible web design looks like in practice.**

**Who:** Shivam Attri — AEO Specialist · SEO Strategist · AI-Visible Web Designer
**Where:** Gurugram, India · Available globally (US/UK/EU/AU clients)
**Experience:** 7+ years · 30+ brands shipped across logistics SaaS, health tech, hospitality, ecommerce, B2B SaaS
**Build credentials:** 150+ production websites + 50+ high-converting landing pages
**Email:** shivamattri27@gmail.com (public replies and notifications)

**Core POV:** AI search is a power shift, not a trend. Brands that build structured, intent-driven content systems now will dominate visibility while everyone else plays outdated SEO games. The bridge: between invisible brands and AI-visible companies.

**Target buyer:** US-based B2B SaaS founder · $500K–$3M ARR · team of 5–20 · spending $5K–$20K/mo on ads · CAC feels like slow poison · heard about AEO but doesn't know how to show up there.
The line that stops them mid-scroll: *"You are not invisible because of SEO. You are invisible because AI does not understand you."*

---

## 2 · SOCIAL HANDLES (locked URLs, use these exact strings everywhere)

| Platform | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/in/seoshivampro/ |
| Instagram | https://www.instagram.com/seoshivam.pro/ |
| Threads | https://www.threads.com/@seoshivam.pro |
| Substack | https://substack.com/@seoshivampro |
| Reddit (community) | https://www.reddit.com/r/aiseovisibility/ |
| X / Twitter | https://twitter.com/seoshivampro |

Never use legacy handles like `@shivattri`. Always `@seoshivam.pro` / `seoshivampro`.

---

## 3 · TECH STACK (locked)

```
Framework:     Astro 6.1.x
Output mode:   'static' (every page prerenders to HTML at build time)
Adapter:       @astrojs/vercel       ← required for serverless API route
Smooth scroll: lenis ^1.x            ← initialised globally in Nav.astro
Animation:     gsap 3.15.x, motion 12.x (installed but used sparingly)
Markdown:      built-in MDX-less .md + Shiki (theme: github-dark-default)
Hosting:       Vercel (free tier, auto-deploys from GitHub main branch)
Email:         Brevo (formerly Sendinblue) — list ID 3
Domain:        seoshivam.pro
```

**Pages prerender by default. Only `src/pages/api/contact.ts`, `src/pages/api/subscribe.ts`, and `src/pages/api/resource-gate.ts` are dynamic** (they set `export const prerender = false;`). Don't switch the project to `output: 'server'` — every other page would lose static prerendering.

---

## 4 · BRAND SYSTEM (locked — never change without instruction)

### Fonts
| Role | Family | Notes |
|---|---|---|
| Display / hero headings | `Instrument Serif` | italic for animated gradient accents |
| UI / body / nav / buttons | `Syne` (400–800) | tracking `-0.01em` to `-0.025em` on headings |
| Labels / mono / code / tags | `JetBrains Mono` (400–500) | uppercase + 0.12–0.22em letter-spacing for eyebrow stamps |

CSS vars: `--fd` (display), `--fu` (ui), `--fm` (mono). Always use these — never hardcode font-family strings.

### Colors (dark mode default)
```
--bg:   #080808     --s1: #0F0F0F   --s2: #161616   --s3: #1E1E1E   --s4: #252525
--bd:   #2A2A2A     --bds: #1A1A1A
--w:    #F5F2EC     --wd: #A8A49C   --wm: #5C5954
--ac:   #4F8EF7     --ac2: #1A3A8F
--ag:   linear-gradient(135deg, #4F8EF7 0%, #1A3A8F 100%)
--agl:  rgba(79,142,247,0.10)
--green: #22C55E    --red: #EF4444
```

### Light mode (triggered by `html.light` class. Default is dark for everyone. Cream mode only when `localStorage('seoshivam.theme')` is exactly `'light'` after trim + lowercase match; any other value is wiped so stray keys cannot flip the palette. Returning to dark **removes** that key instead of storing `'dark'`. Layout inline CSS paints **`html` and `body`** dark/cream before bundled CSS; inline boot script runs before `theme-color` meta; `body` does **not** transition `background` (only `color`) so hydration cannot animate a cream flash.)
```
--bg:   #F8F6F2     --s1: #FFFFFF   --s2: #F2EFE9   --s3: #E8E4DC
--bd:   #D4CFC6     --w: #1A1714    --wd: #5C5751   --wm: #9C9890
--ac:   #2B5BE0     --ac2: #1A3A8F
--ag:   linear-gradient(135deg, #2B5BE0 0%, #1A3A8F 100%)
```

### The brand wordmark (used in OG images, footer, blog covers)
```html
<span class="iccl-1">seo</span><span class="iccl-2">shivam</span><span class="iccl-3">.pro</span>
```
- `iccl-1` → white 800
- `iccl-2` → italic Instrument Serif with **animated gradient** (`gradShift` 8s linear infinite, `background-size: 300%`)
- `iccl-3` → muted, smaller

### The H2 recipe (used site-wide for section headings)
```html
<h2 class="sec-h">Statement first line<br><em class="grad-anim">italic gradient continuation.</em></h2>
```
- White first line + italic blue-gradient continuation
- `clamp(34px, 5.2vw, 68px)`, weight 400, letter-spacing `-.022em`, line-height `.96`
- The `em` uses `linear-gradient(110deg, ac → 7BAEFF → ac2 → 7BAEFF → ac)` at 300% size with `gradShift 8s` animation

### Eyebrow / hair label
```html
<div class="hair left">SECTION LABEL / SUB-CONTEXT</div>
```
- 10px JetBrains Mono, weight 500, 0.18em tracking, uppercase
- Brand-blue color
- 28px gradient bar marker prefix that grows to 48px on hover

---

## 5 · CONTENT + VOICE RULES (non-negotiable)

1. **NEVER use em-dashes** (`—`) anywhere — not in copy, comments, or code strings. Use `:`, `,`, `.`, or `·` (middot) instead.
2. **No buzzwords:** never use "passionate," "innovative," "holistic," "results-driven."
3. **No exclamation marks** in body copy.
4. **Short sentences. Specific numbers. Opinions stated as conclusions.**
5. **International tone** — written for US/UK/EU/AU audiences (not just India).
6. **All content must be SEO and AEO optimised simultaneously.**
7. **Every client name is under NDA.** Use industry + region only:
   - ✅ "Logistics SaaS · India", "Health Tech · US", "B2B SaaS · UK"
   - ❌ Real domain names, real brand names, anything that identifies a client
8. **Real numbers from documented results:**
   - 150+ websites shipped (lifetime)
   - 50+ high-converting landing pages
   - 40+ international clients
   - 30+ brands across 4 continents
   - 7+ years compounding (since 2018, AEO since 2022)
   - 16× click growth in 30 days (HealthTech SaaS, India: 63 → 1,010 organic clicks)
   - 11K clicks · 346K impressions · 3.2% CTR · 11.3 avg position (Logistics Platform, 3 months)
   - 1.88K clicks · 110K impressions · 1.7% CTR · 10.1 avg position (Health Tech US, 3 months)
   - 463K active users · 552K sessions · 747K views · 157 realtime active (Logistics SaaS GA4, 90 days)
   - 20+ AI engine citations tracked for one Health Tech client
   - <22 hr fastest article-to-rank from launch
   - 100% schema-validated on launch

---

## 6 · SITE ARCHITECTURE (page-by-page status)

### Priority 1 (already built, locked structure)
| Route | File | Status | Notes |
|---|---|---|---|
| `/` | `src/pages/index.astro` | ✅ Built | Hero (Operator's Editorial), manifesto spread, case file tabs, **services: two sticky stacks** (01–03 core + 04–06 scale/ops), each card paired with an interactive right preview (AIO, SERP, platform tabs, Ads dashboard, programmatic URL tabs, n8n flow), process timeline, about teaser, **My tools** 2-col stack list (left = brand stack, right = tool cards), FAQ accordion, lead magnet, testimonials marquee, ContactCta, Footer |
| `/about` | `src/pages/about.astro` | ✅ Built | Hero, **dossier** (sticky portrait + count-up stat list, 16×/7+/30+/20+ data-bl-target), origin story essay (drop cap, pull quote, integrated horizontal timeline, 20-tag stack strip), **manifesto rows** (3 sticky-num rows, replaces card grid), founder quote (word-unblur), **build log** (150+ + 50+ headline, platform bars, 6-country geo split, terminal `deploy_to_index.log`), testimonials marquee, ContactCta, Footer |
| `/services` (hub) | `src/pages/services/index.astro` | ✅ Built | Tabbed 6-service overview, ContactCta |
| `/services/aeo` | `src/pages/services/aeo.astro` | ✅ Built | Hero, what-is-AEO, deliverables, **CitationShowcase** (4-engine tabbed AI Overview demo), proof, FAQ, ContactCta |
| `/services/seo` | `src/pages/services/seo.astro` | ✅ Built | Hero, compound growth, what-included, **GscDashboard + AudienceWidget** (Logistics platform 11K clicks + Logistics SaaS 463K users), proof trio, FAQ, ContactCta |
| `/services/web-design` | `src/pages/services/web-design.astro` | ✅ Built | Hero, comparison, platforms, included, **PortfolioGallery** (browser-mockup design showcase), FAQ, ContactCta |
| `/work` | `src/pages/work.astro` | ✅ Built | Hero summary, **GscDashboard featured** (Logistics platform), **AudienceWidget** (GA4 Logistics SaaS), 3 case studies, **"8 more wins" ledger** (NDA-summarized engagements), ContactCta, Footer |
| `/contact` | `src/pages/contact.astro` | ✅ Built | Full contact form (uses ContactCta) |
| `/insights` | `src/pages/insights/index.astro` | ✅ Built | Editorial masthead, animated H1, stat counters, category tabs (with counts) + live search input, featured cover (matches blog-cover style), 3-column post grid with mini-covers, newsletter card |
| `/insights/[slug]` | `src/pages/insights/[slug].astro` | ✅ Built | Breadcrumb, meta strip, H1, **TL;DR lead** (citable for AI), byline + share, **CSS-rendered cover** (no image needed), **3-column layout** (sticky TOC / prose / sticky author+lead form), full prose styles (drop cap, gradient pull-quote, brand-bar H2, syntax-highlighted code with chrome bar + Show more, FAQ `<details>` accordion, image figures, **tables wrapped for horizontal scroll** via `rehype-wrap-tables`, internal link styling + preview card), inline mid-CTA, **AI Summarise grid** (6 engines with prefilled prompts), related-3 cards |
| `/resources` | `src/pages/resources.astro` | ✅ Built | Hero + sticky author sidebar, three email-gated resources (80-point AEO audit PDF, AEO Notion brief, Claude Skills PDF), FAQ, ContactCta |
| `/tools` | `src/pages/tools/index.astro` | ✅ Built | Hub with two-tool listing, FAQ, ContactCta |
| `/tools/ai-visibility-score` | `src/pages/tools/ai-visibility-score.astro` | ✅ Built | 10-question quiz with `<style is:global>` (critical — JS-rendered options need global scope), animated progress bar, eyebrow + serif question, gradient-sweep options |
| `/tools/robots-txt-checker` | `src/pages/tools/robots-txt-checker.astro` | ✅ Built | Multi-proxy CORS fallback (direct → corsproxy.io → allorigins/raw), proper RFC-compliant parser (groups, longest-prefix, allow-wins) |
| `/api/contact` | `src/pages/api/contact.ts` | ✅ Built | **Server-side endpoint** — `export const prerender = false;` |
| `/api/subscribe` | `src/pages/api/subscribe.ts` | ✅ Built | Blog sidebar email only → Brevo list 3, server-side key — `export const prerender = false;` |
| `/api/resource-gate` | `src/pages/api/resource-gate.ts` | ✅ Built | `/resources` per-file email gate → Brevo list 3; `LEAD_SOURCE` includes `resource:{slug}` and optional title (no custom Brevo fields required) — `export const prerender = false;` |
| `/og/[slug].svg` | `src/pages/og/[slug].svg.ts` | ✅ Built | Per-blog dynamic OG image generator |

### Auto-generated
- `/sitemap.xml` (Astro sitemap integration)
- `/robots.txt` (allows GPTBot, ClaudeBot, PerplexityBot, Bingbot, Googlebot — file in `public/robots.txt`)
- `/og-image.svg` (default brand OG, 1200×630)

---

## 7 · COMPONENT INVENTORY (every reusable component)

| Component | Location | Purpose | Key props |
|---|---|---|---|
| `Layout.astro` | `src/layouts/` | Base HTML shell, SEO meta, JSON-LD, OG tags | `title`, `description`, `canonical`, `ogImage`, `schema` |
| `Nav.astro` | `src/components/` | Sticky pill nav, dropdown, theme toggle, scramble logo · **also hosts the global motion layer** (cursor, Lenis, magnetic, image fade) | none — auto-detects current path |
| `Footer.astro` | `src/components/` | Editorial masthead footer with animated wordmark, real social SVGs, AI buttons (4 brand SVGs), keyword marquee, back-to-top via Lenis | none |
| `ContactCta.astro` | `src/components/` | **Primary site-wide lead form.** 8 fields (Name/Phone+dial/Email/Service/Budget/Deadline/Source/Message). Photo-left layout. POSTs to `/api/contact`. Honeypot + time-trap + rate-limit. | `eyebrow`, `heading`, `headingEm`, `deck`, `id`, `listId` (default 3), `source` |
| `GscDashboard.astro` | `src/components/` | Search Console-style widget. URL bar + 4 metric tiles + animated SVG line chart + top queries + insights pills | `domain`, `industry`, `range`, `clicks {from, to}`, `impressions`, `ctr`, `position`, `queries[]`, `insights[]`, `id` |
| `AudienceWidget.astro` | `src/components/` | GA4-style audience widget. 4 metric tiles + 90-day chart + realtime card with country breakdown | `property`, `industry`, `range`, `activeUsers`, `sessions`, `views`, `newUsers`, `realtime`, `countries[]`, `id` |
| `PortfolioGallery.astro` | `src/components/` | Browser-mockup design showcase. URL bar shows industry+region (no real domains). Supports image OR CSS-rendered placeholder. | `items[]` (slug, label, industry, region, platform, year, deliverable, image?, accent?), `eyebrow`, `heading`, `headingEm`, `deck`, `id` |
| `CitationShowcase.astro` | `src/components/` | 4-engine tabbed AI citation demo (ChatGPT/Perplexity/Google AIO/Claude) with engine-tinted brand colors | `engines[]`, `eyebrow`, `heading`, `headingEm`, `deck`, `brand`, `id` |
| `FaqBlock.astro` | `src/components/` | Reusable FAQ accordion + auto-emits FAQPage JSON-LD schema | `faqs[]` (q, a), `eyebrow`, `heading`, `headingEm`, `deck`, `id`, `emitSchema` |

---

## 8 · API + BREVO INTEGRATION

### Endpoint: `POST /api/contact`
File: `src/pages/api/contact.ts` (with `export const prerender = false;` so it runs as a Vercel serverless function)

Flow:
1. Reads `BREVO_API_KEY` from server env (NEVER bundled to client)
2. Validates honeypot (`website` field)
3. Time-trap: rejects submissions <2.5s after form mount (anti-bot)
4. Sanitizes all inputs (HTML-strip, whitespace-collapse, length-clamp, HTML-escape)
5. Validates name/email/phone with regex
6. Fires both Brevo calls in parallel via `Promise.allSettled`:
   - `POST /v3/contacts` — adds lead to **list ID 3** with attributes (FIRSTNAME, LASTNAME, FULLNAME, SMS, WHATSAPP, SERVICE, BUDGET, DEADLINE, SOURCE_FIELD, MESSAGE, LEAD_SOURCE, SUBMITTED_AT). Triggers Brevo welcome automation.
   - `POST /v3/smtp/email` — sends styled HTML notification to `shivamattri27@gmail.com` with `replyTo` set to the lead's email (so you hit Reply and respond directly).
7. Returns success JSON. 400-duplicate from contacts call is treated as success (automation still fires).

### Endpoint: `POST /api/subscribe`
File: `src/pages/api/subscribe.ts` (Vercel serverless, `prerender = false`)

Blog sidebar only: JSON body `{ email, website?, mountedAt }`. Same honeypot + 2.5s time-trap as contact. Calls **only** `POST /v3/contacts` (list 3, `LEAD_SOURCE: blog-sidebar`). No exposed keys in the browser; the old inline Brevo fetch on blog posts was removed.

### Endpoint: `POST /api/resource-gate`
File: `src/pages/api/resource-gate.ts` (Vercel serverless, `prerender = false`)

`/resources` only: JSON body `{ email, website?, mountedAt, resourceId, resourceTitle? }`. `resourceId` must be one of: `aeo-audit-80`, `aeo-content-brief-notion`, `claude-skills-seo-pdf`. Honeypot + time-trap: timer should start when the user focuses the email field (client); minimum wait 1.2s after that stamp. Calls **only** `POST /v3/contacts` (list 3) with `LEAD_SOURCE` like `resource:aeo-audit-80 · 80-Point AEO Audit` (truncated). Segment or automate in Brevo on `LEAD_SOURCE` contains `resource:aeo-audit-80` etc.

### Required env vars
| Name | Where set | Why |
|---|---|---|
| `BREVO_API_KEY` | Vercel project env (Settings → Environment Variables) AND `.env` for local dev | Server-side authentication to Brevo. Never in client bundle. |

### Brevo dashboard setup (one-time)
- List ID 3 must exist (named `seoshivam-leads`)
- Welcome automation triggered by addition to list 3 (configure in Brevo's Marketing → Automations panel)
- Sender `shivamattri27@gmail.com` verified in Brevo (transactional `sender.email` from `/api/contact` uses this address). If Brevo rejects sends, add or verify this sender in Senders.

### Existing test data (do not change without instruction)
The form has been tested working against list 3. If new leads aren't arriving, check (in order):
1. `BREVO_API_KEY` is set in Vercel env
2. Brevo sender domain is verified
3. Vercel function logs for the `/api/contact` endpoint
4. Sidebar subscribe failures: Vercel logs for `/api/subscribe`
5. Resource download failures: Vercel logs for `/api/resource-gate` (check `LEAD_SOURCE` in Brevo for `resource:` prefix)

---

## 9 · MOTION + ANIMATION ARCHITECTURE

### Global stack (all in `Nav.astro`'s script block)
1. **Lenis smooth-scroll** — initialised once (`autoRaf`), exposed as `window.__lenis`. Runs unless `prefers-reduced-motion: reduce`. Desktop: higher `lerp` for responsive wheel tracking; touch: `smoothWheel: false` (native momentum). Section progress + scroll-linked ticks listen to `lenis.on('scroll')` when Lenis is active (no duplicate window scroll listeners). JS scroll-parallax was removed (layout thrash). `@import lenis/dist/lenis.css` in `global.css`. Anchors use `-80px` offset (clears sticky nav). Theme toggle does **not** use View Transitions (avoid full-root captures during scroll).
2. **`.rv → .in` reveal observer** — adds `.in` to any `.rv` element entering viewport. Runs even with `prefers-reduced-motion: reduce` (otherwise content stays at opacity:0 forever — CSS just flattens transition duration to 0.01s).
3. **Custom cursor (`.bcur`)** — single element, hover-only. `data-cursor="Label"` on any element → label pill follows cursor.
4. **Magnetic hover** — on `.btn-p`, `.ccta-submit`, `.lead-sbtn`, `.cf-submit`. 8px max shift, LERP 0.18.
5. **Image fade-scale** — `.ic-cover img`, `.pgal-canvas img`, `.ab-doss-img`, `.ccta-photo img`, `img[data-scale-in]`. 1.06 → 1.0 + opacity 0 → 1 over 1.2s on viewport entry.
6. **Scroll progress bar** — `#scrollProg` element, fills as page scrolls.

### CSS keyframes (defined in `global.css`)
- `pageEnter` — body opacity 0→1 (550ms). **NO transform.**
- `gradShift` — animated gradient text (8s linear infinite)
- `mq` — keyword marquee (40s)
- `bcurGrad` — cursor pill gradient sweep
- `opcPulse` — small dot pulse (1.6s ease-in-out)

### Stagger delays
`.rv.d1` (100ms) · `.rv.d2` (200ms) · `.rv.d3` (300ms) · `.rv.d4` (400ms) · `.rv.d5` (500ms)

### `data-cursor` attribute
Add to any interactive element to show a descriptive label inside the cursor pill on hover:
```html
<a href="/work" data-cursor="See real results">…</a>
```

---

## 10 · CRITICAL ANTI-PATTERNS (do not repeat — each one cost a sprint)

### ❌ Never put `transform`, `filter`, or `perspective` on `<body>`, `<html>`, or any ancestor of fixed-position elements
**Why:** It creates a new containing block. `position: fixed` descendants (nav, custom cursor, scroll progress) become pinned to the transformed body, not the viewport. Result: nav stops sticking, cursor lags, lag everywhere.
**Verified by:** `body { animation: pageEnter ... }` is opacity-only.

### ❌ Never split text into spans inside elements with `background-clip: text`
**Why:** The brand pattern is `<em class="grad-anim">italic words</em>` with the gradient painted onto text via `background-clip: text`. If JS wraps each word in a child `<span>`, the gradient computes per-span and the children inherit `-webkit-text-fill-color` — gradient breaks, text renders white/invisible.
**Affects:** Every section H2 with the brand recipe, blog covers, footer wordmark.

### ❌ Never insert chrome bars INSIDE `<pre>` elements
**Why:** `<pre>` has `white-space: pre` user-agent style + Shiki adds inline styles (padding, background). These cascade to children and break flex layouts → bar contents stack vertically with huge gaps.
**Pattern that works:** Wrap `<pre>` in a `<figure class="cb-wrap">` and put the bar BEFORE the pre as a sibling.

### ❌ Never expose Brevo API key in client-side code
**Why:** Browser-to-Brevo direct calls fail (CORS) AND expose the key to anyone who views source. Always route through `/api/contact`.

### ❌ Never use real client domains/brand names anywhere
**Why:** All work is under NDA. Prior leak: `cargorates.ai` was hardcoded as a default — caught and fixed. Use industry labels: `Logistics SaaS · India`, etc.

### ❌ Never use em-dashes (`—`) in user-facing copy
**Why:** Brand voice rule. Use `:`, `,`, `.`, or `·` (middot) instead. This includes `Layout title`, all headings, all body copy, all schema descriptions, all form options.

### ❌ Never run word-by-word reveal animations on gradient-clipped text
**Why:** Same root cause as the span-split bug. If you must do per-word stagger, do it on plain-color text, never on `.grad-anim`.

### ❌ Never use scoped `<style>` in pages with JS-rendered innerHTML
**Why:** Astro adds `data-astro-cid-*` attributes to elements at build time for scoping. JS-injected innerHTML elements DON'T get the attribute → scoped CSS never matches → unstyled output.
**Pattern that works:** Use `<style is:global>` on pages with dynamic JS-rendered content (`/tools/ai-visibility-score`, `/tools/robots-txt-checker`, GscDashboard, AudienceWidget, etc.).

### ❌ Never put global FAQ rules without scoping to `.faq-list`
**Why:** Homepage uses `.faq-stage > .faq-item` with custom styles. Service pages use `.faq-list > .faq-item`. Unscoped rules hit both → homepage breaks.
**Pattern that works:** Scope all service-page FAQ rules to `.faq-list .faq-item`.

### ❌ Never edit page CSS inside `<style>` (scoped) when the markup is rendered server-side but has data-attributes mutated by JS
Same scoping issue as above.

---

## 11 · OG IMAGES (per-page social previews)

- Default: `/public/og-image.svg` (1200×630, brand mesh + animated wordmark + stat strip footer)
- The branded cover design lives in `src/lib/og-cover.ts` (`buildOgCoverSvg`) — one source of truth, shared by both per-blog endpoints below. Pulls post title (auto-wrapped to 3 lines), category label, date, read-time. Title is a STATIC gradient (no animation: rasterizers + crawlers can't animate).
- Per-blog SVG: `/src/pages/og/[slug].svg.ts` → `/og/<slug>.svg` (vector, for X/Facebook/LinkedIn).
- **Per-blog PNG (Google Discover): `/src/pages/og/[slug].png.ts` → `/og/<slug>.png`.** Rasterizes the same cover SVG via `@resvg/resvg-js`. **Blog `og:image` + `Article` schema `image` point at the PNG**, not the SVG, because Google Discover only surfaces posts with a large RASTER image (≥1200px) and ignores SVG og:images. This is what makes blogs eligible for Discover.
  - Fonts are bundled in `src/og-fonts/` (Instrument Serif Italic/Regular, Syne, JetBrains Mono — OFL, from google/fonts) and loaded into resvg with `loadSystemFonts:false` so text renders identically on the Vercel Linux build.
  - ⚠️ Load the font dir via `path.join(process.cwd(), 'src', 'og-fonts')`, NOT `import.meta.url` — the bundled endpoint module lives outside `src/`, so `import.meta.url` resolves to nothing and resvg renders the cover with **no text** (background only). Verify by opening a generated `dist/client/og/*.png`.
- `Layout.astro` resolves `ogImage` to absolute URL, sets `og:image:type` (detects svg/png/webp/jpeg), `og:image:width=1200`, `og:image:height=630`, `og:image:alt`, `twitter:card`, `twitter:site`, `twitter:creator`.
- `robots` meta in `Layout.astro` includes `max-image-preview:large` — also mandatory for Discover. Do not remove.

---

## 12 · BLOG SYSTEM

### Post structure
```yaml
---
title: "Post Title"
description: "SEO meta + AI citation hook"
pubDate: 2026-04-01
updatedDate: 2026-05-15   # optional
category: aeo             # REQUIRED: lowercase slug aeo | seo | ai-search | web-design (not "AEO" / "SEO")
readTime: "8 min"
featured: false
ogImage: "/og/custom.svg" # optional override
tldr: "Direct answer..." # optional, used as the lead callout below H1
tags: ["AEO", "SaaS"]    # optional
---

Markdown content here.
```

### Post location
`src/content/blog/<slug>.md` → renders at `/insights/<slug>`

### Authoring workflow (drop-in Markdown)
1. **New post:** add `src/content/blog/your-slug.md` with valid frontmatter. It appears on `/insights` and at `/insights/your-slug` after save (no manual registry).
2. **Edits:** save the file; `astro dev` reloads the route. If nothing updates: check the terminal for schema errors (invalid `category` breaks the entry), then hard refresh or restart dev.
3. **Windows:** `astro.config.mjs` enables watched-file polling on `win32` so content edits are picked up reliably.

### Schema config
`src/content.config.ts` — Zod schema enforces frontmatter shape

### Author docs (not in `blog/` folder)
`src/content/README-blog.md` — human-authored reference only (anything named `*.md` inside `src/content/blog/` is treated as a post)

### Code blocks
Use triple-backtick with language tag: ` ```ts `, ` ```json `, ` ```bash `, ` ```python ` etc. Astro/Shiki auto-highlights with `github-dark-default` theme. JS adds chrome bar (traffic lights + lang pill + Copy button) + Show more for long blocks.

### Schema example examples (use varied industries — DO NOT only use Logistics or Health Tech)
When showing JSON-LD examples in posts, vary the example brand:
- B2B SaaS founder
- E-commerce founder (DTC, AU/UK markets)
- FinTech startup (US, Series A)
- EdTech platform (international)
- Legal Tech (US)
- Marketing Tech (CA/EU)
- Industrial / Manufacturing SaaS
- Hospitality / Travel SaaS

---

## 13 · TYPOGRAPHY DETAILS (blog detail spec)

```
Body prose:        18.5px Syne, line-height 1.92, letter-spacing 0.002em
Lead paragraph:    +12% size, brighter (var(--w)), 36px bottom margin
Drop cap:          6.4em Instrument Serif italic, gradient
H2:                clamp(32, 3.8vw, 48px), 80px top margin, 56×3px gradient bar marker
H3:                clamp(21, 2.1vw, 26px) Syne 700, 56px top margin
Paragraph spacing: 28px between (h2+p collapses to 0)
Lists ul:          14px gradient-bar markers (was 8px), padding-left 30px
Lists ol:          number chip with 30px min-width, 6px radius, 18px gap
Blockquote:        36/40px padding, 1.32em italic serif, 84px opening quote glyph
HR:                fade-edge gradient + centered § glyph in italic serif
Inline code:       JetBrains Mono, brand-blue color, light-blue tinted background
Code block:        chrome bar (dots + lang pill + Copy) + Shiki syntax + Show more if >480px tall
```

---

## 14 · COMMON COMMANDS

```bash
npm run dev       # localhost:4321
npm run build     # builds to dist/ + bundles serverless function
npm run preview   # preview production build locally

# Local dev with API endpoint working
# 1. Copy .env.example to .env and set BREVO_API_KEY=... (Brevo → SMTP & API → API Keys)
# 2. Restart npm run dev (required so Astro picks up new env vars)
```

---

## 15 · DEPLOYMENT (Vercel)

1. Push to GitHub `main` → Vercel auto-deploys
2. Vercel env vars (Settings → Environment Variables):
   - `BREVO_API_KEY` (all environments)
3. Domain: `seoshivam.pro`
4. Build output: static pages + per-blog OG covers (both `.svg` and `.png` per post) + 3 serverless functions (`/api/contact`, `/api/subscribe`, `/api/resource-gate`)
5. `vercel.json` pins `buildCommand` to `npm run build` so the `postbuild` hook always runs (Vercel otherwise may call `astro build` directly and skip it).

### Indexing (sitemap + IndexNow)
- **Sitemap** (`@astrojs/sitemap`) emits per-URL `<lastmod>`: blog posts get their `updatedDate || pubDate` (mapped in `astro.config.mjs` via `blogLastmod()` + the `serialize` hook), other pages get build time. This is the freshness signal for Google. Don't drop the serialize hook.
- **IndexNow** (`scripts/indexnow-submit.mjs`, wired as `postbuild`): on every Vercel **production** build it POSTs all sitemap URLs to `api.indexnow.org`, instantly notifying Bing/Yandex/Naver/Seznam. Bing's index powers ChatGPT Search + Copilot, so this is the main "instant indexing" lever. Google does NOT use IndexNow.
  - Public key file: `public/aab3919b8d18adb74090622a666fc2a4.txt` (the key is public by design, served at that URL; `keyLocation` in the script must keep matching this filename).
  - The script only runs on `VERCEL_ENV=production` (set `INDEXNOW_FORCE=1` to run locally), and never fails the build (always exits 0).
  - ⚠️ **One-time unlock required:** IndexNow returns `403 UserForbiddedToAccessSite` until the domain is added + verified in **Bing Webmaster Tools** (Bing must recognize ownership of seoshivam.pro). Our side is correct (key file live + byte-exact, payload host matches); the 403 is purely Bing not yet knowing the domain. After BWT verification (easiest: "Import from Google Search Console"), submissions start succeeding and every deploy auto-submits. Verify in **Bing Webmaster Tools → IndexNow**.
  - There is no legit instant-index API for Google; use sitemap `lastmod` + GSC "Request Indexing".
  - Legacy `public/seoshivampro.txt` is an unused orphan (a weak old IndexNow key with no submitter); harmless, left in place.

---

## 16 · WHAT'S OWED (next sessions)

Tracked here so future sessions know what's intentionally unfinished:

1. **More case study data** — user is collecting screenshots + GSC data for additional industries (FinTech, EdTech, B2B SaaS UK, etc.) to fill out the "Eight more wins" ledger and add more `<GscDashboard />` instances on `/work`.
2. **Real design screenshots for `<PortfolioGallery />`** — drop into `/public/work/<slug>.jpg` and pass `image="/work/<slug>.jpg"` per item. User collecting.
3. **Light-mode polish pass** — light theme works but hasn't been line-by-line refined.
4. **AdSense placement on blog pages** — month 4+ task per original spec. Privacy Policy + Terms pages required first.
5. **More blog content** — varied industries beyond logistics + health tech.
6. **Performance audit** — Lighthouse pass once content is locked.

---

## 17 · BEHAVIOR EXPECTATIONS FOR CLAUDE

When working on this project:

1. **Read this file first.** Every section is a hard-won lesson.
2. **Match the brand voice exactly.** No em-dashes, no buzzwords, international tone, specific numbers.
3. **Use existing components before building new ones.** ContactCta / GscDashboard / AudienceWidget / PortfolioGallery / CitationShowcase / FaqBlock cover most use cases.
4. **Use the design tokens** — `var(--ac)`, `var(--fd)`, `var(--ag)` etc. Never hardcode brand colors or fonts.
5. **Test position-fixed elements after CSS changes.** If you touch body/html/section ancestors, verify nav/cursor/scroll-progress still pin to viewport.
6. **Test gradient text after JS changes.** If you touch DOM in headings, verify `.grad-anim` italics still render their blue gradient.
7. **Server-side first for sensitive logic.** API keys, validation, email sending → `/api/*` endpoints, never client.
8. **Use industry-only labels for client work.** Never expose real domains or brand names.
9. **Width and height on every `<img>`.** Prevents CLS.
10. **Single H1 per page.** Layout component does not enforce — be vigilant.
11. **For each rebuild, finish the build with a clean `npm run build`.** If it errors, the lock is broken.
12. **Never silently rewrite content the user wrote.** If a markdown file or copy block exists, treat it as the source of truth unless explicitly told otherwise.

---

## 18 · QUICK REFERENCE: WHEN BUGS APPEAR

| Symptom | Probable cause | Fix |
|---|---|---|
| Nav stops sticking | `transform` / `filter` / `perspective` on body or section ancestor | Remove it. Use opacity-only animations on body. |
| Gradient text renders white | Word-reveal split inside `.grad-anim` | Stop splitting text in gradient-clipped elements |
| Code block bar stacked vertically with huge gap | Chrome inserted inside `<pre>` | Wrap `<pre>` in `<figure class="cb-wrap">` and put bar as sibling |
| Form submits with no email/Brevo entry | `BREVO_API_KEY` missing in Vercel env, OR sender domain not verified, OR fetch hitting browser CORS | Set env var; verify Brevo sender; route through `/api/contact` |
| FAQ items invisible / faded | Page uses `.faq-list .faq-item` markup but no CSS rules → rendering as default browser button styles | Global FAQ CSS exists in `global.css`, scoped to `.faq-list` only — verify markup uses that wrapper |
| JS-rendered options unstyled | Page uses scoped `<style>` instead of `<style is:global>` | Switch to global on any page with dynamic innerHTML |
| Cursor not following | Same as nav-not-sticking — ancestor transform issue | Check body/html for transform/filter |
| Animations not running | `prefers-reduced-motion: reduce` was killing all observers | The `.rv` observer always runs; CSS just flattens transition |
| Real client domain visible anywhere | NDA violation — fix immediately | Replace with industry label (`Logistics SaaS · India` etc.) |

---

End of knowledge base. **If you change something material to this file, update the relevant section.**
