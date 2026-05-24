---
title: "How to Get Your Brand Cited by ChatGPT and Perplexity"
description: "A practical guide to getting your brand cited by ChatGPT, Perplexity, and other AI engines. Schema markup, entity optimization, and answer-first content that actually works."
pubDate: 2025-04-07
category: "aeo"
readTime: "11 min"
featured: true
recap:
  - "ChatGPT cites sources with clear entity schema, FAQPage markup, and GPTBot access in robots.txt — all three are required, none is optional."
  - "Answer-first structure is the highest-leverage change: lead every section with the direct answer, then expand. AI engines extract the first sentence."
  - "Most brands missing from ChatGPT have no technical barrier — just missing schema and bot access, fixable in under a week."
---

Getting cited by <a href="https://openai.com" rel="nofollow noreferrer" target="_blank">ChatGPT</a> or <a href="https://www.perplexity.ai" rel="nofollow noreferrer" target="_blank">Perplexity</a> is not random. It is the result of specific, deliberate choices about how your website is structured, how your content is written, and whether AI bots can even crawl your site in the first place.

This is a practical guide. Not theory. Steps you can implement.

## Step 1: Confirm AI bots can actually access your site

Before any content or schema work, check whether AI engines can crawl you at all.

Visit `yourwebsite.com/robots.txt` or use the [robots.txt checker tool](/tools/robots-txt-checker) to audit without manual parsing. Look for these entries:

```
User-agent: GPTBot
Disallow: /
```

If you see `Disallow: /` for GPTBot (used by ChatGPT), ClaudeBot (used by Claude/Anthropic), PerplexityBot, or any AI crawler, you are blocking them. They cannot read your content and cannot cite you.

Your robots.txt should explicitly allow AI crawlers:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Googlebot
Allow: /
```

Many WordPress and platform-generated robots.txt files block all bots by default. This is the single most common reason brands are invisible in AI search despite having good content.

## Step 2: Establish your entity in the knowledge graph

AI engines build a knowledge graph. To be cited, you need to be a recognized entity in it: a person or organization with known attributes, a clear niche, and consistent signals across crawlable sources.

Entity optimization starts with your JSON-LD schema. On your homepage, implement a Person or Organization schema that clearly states:

- Your name (and the name of key people at your company)
- Your expertise area (specific, not generic)
- Your location and areas served
- Links to your social profiles (sameAs)
- What you know about (knowsAbout)

Here is the live Person schema this site (seoshivam.pro) ships in production. Steal it, adapt the values to your brand, and ship it tonight:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://seoshivam.pro/#shivam",
  "name": "Shivam Attri",
  "jobTitle": "AEO Specialist, SEO Strategist, AI-Visible Web Designer",
  "description": "Shivam Attri helps B2B SaaS founders and growing brands get cited by ChatGPT, Perplexity, and Google AI Overviews through AEO strategy, SEO architecture, and AI-visible web design.",
  "url": "https://seoshivam.pro",
  "image": "https://seoshivam.pro/shivam-attri.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/seoshivampro/",
    "https://www.instagram.com/seoshivam.pro/",
    "https://substack.com/@seoshivampro"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "knowsAbout": [
    "Answer Engine Optimization",
    "AI Search Visibility",
    "ChatGPT Citation Strategy",
    "JSON-LD Schema Markup"
  ]
}
```

The same shape works for any high-intent industry. A few adaptations for industries that pay well in international markets:

- **FinTech founder.** `jobTitle: "Embedded Finance Operator"`, `knowsAbout: ["Embedded Lending", "PCI Compliance", "Stripe Integration", "Treasury Automation"]`. Add the LinkedIn + Crunchbase profile in `sameAs`.
- **Health Tech CEO.** `jobTitle: "Clinical Workflow Software Founder"`, `knowsAbout: ["HIPAA Compliance", "EHR Integration", "Patient Intake Automation", "Clinical Triage"]`. Add the company page + the SEC/FDA filings if any.
- **Legal Tech founder.** `jobTitle: "Contract Automation Specialist"`, `knowsAbout: ["AI Contract Review", "Document Generation", "Matter Management"]`. Add bar association profiles in `sameAs`.
- **Climate Tech operator.** `jobTitle: "Carbon Accounting Software Founder"`, `knowsAbout: ["Scope 3 Emissions", "CDP Reporting", "Carbon Offset Procurement"]`. Add ClimateBase + your company's MRV report.
- **DevTools founder.** `jobTitle: "Developer Experience Lead"`, `knowsAbout: ["Internal Developer Platforms", "CI/CD Architecture", "Open Source Strategy"]`. Add GitHub + your maintained repos.

The structure stays identical. Only the values change. Consistency matters more than complexity. The name, description, and expertise areas in your schema should match what appears on your About page, your LinkedIn bio, your X bio, and any press mentions. Inconsistency signals to AI engines that the entity is not well-defined.

## Step 3: Implement FAQPage schema on your most important pages

The fastest path to AI citation is FAQPage schema. This is machine-readable Q&A markup that AI engines can directly extract and use when synthesizing answers.

Every service page, product page, and key landing page should have FAQPage schema covering the specific questions buyers ask about that topic.

Structure:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between AEO and SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO targets Google's ranked list of ten blue links. AEO targets the synthesized answer AI engines give before a user sees any search results. AEO requires structured data, entity optimization, and answer-first content rather than keyword optimization alone."
      }
    }
  ]
}
```

Three rules for FAQPage answers that get cited:

1. **Start with the direct answer.** The first sentence of the answer field should state the answer. No preamble. No "great question."
2. **Keep answers between 50 and 200 words.** Long enough to be comprehensive. Short enough to be excerpted.
3. **Use specific language.** Vague answers do not get cited. "It depends" is not an answer. "60 to 90 days" is.

## Step 4: Write answer-first content

AI engines are built to synthesize answers. They favor content that is structured as answers, not content that buries answers in narrative.

The answer-first format:

### Old format (bad for AI citation)
*"Many businesses struggle with customer churn. In this article, we'll explore various approaches to reducing churn, including..."*

### Answer-first format (good for AI citation)
*"The most effective way to reduce B2B SaaS churn is to identify at-risk accounts 30 to 60 days before renewal using product usage signals. Accounts using fewer than three core features in the 60 days before renewal have a 4x higher churn rate than active users."*

The pattern: State the answer. Give the specific number or concrete detail. Then elaborate.

Apply this format to:
- Blog post opening paragraphs
- Section headers and the first sentence under each header
- Any FAQ-style section on your service or product pages

## Step 5: Build topical authority depth

Isolated content does not get cited. A website with 10 excellent articles about one topic gets cited more reliably than a website with 100 articles scattered across 20 topics. The full system for building this is in the [topical authority cluster playbook](/insights/topical-authority-saas-playbook).

Topical authority means publishing a cluster of content that answers every meaningful question in your niche. The cluster structure:

1. **Pillar page**: A comprehensive, 3,000+ word resource on the core topic (e.g., "Complete Guide to AEO")
2. **Cluster posts**: 10 to 20 focused posts each answering one specific sub-question (e.g., "How to implement FAQPage schema," "What is entity optimization," "How to track AI citations")
3. **Internal links**: Every cluster post links to the pillar. The pillar links to every cluster post.

This architecture signals to AI engines that your site is the definitive resource for this topic, not a site that happened to write one article about it.

## Step 6: Monitor and track your citations

You cannot improve what you do not measure. Track your AI citation status monthly:

### Manual tracking
- Type your 20 highest-value questions into ChatGPT, Perplexity, and Google AI Overviews
- Note whether your brand is cited and in what context
- Screenshot and date-stamp all positive citations

### Tools
- Perplexity has a built-in citation tracker in Perplexity Pro
- Track your brand mentions via <a href="https://www.google.com/alerts" rel="nofollow noreferrer" target="_blank">Google Alerts</a> (captures when AI-cited content references you)
- Use <a href="https://www.semrush.com" rel="nofollow noreferrer" target="_blank">Semrush</a> or <a href="https://ahrefs.com" rel="nofollow noreferrer" target="_blank">Ahrefs</a> to track which pages are earning links from AI-adjacent content
- The [AI Visibility Score quiz](/tools/ai-visibility-score) gives a structured audit of your current citation readiness

### What to do with the data
- Pages that get cited: expand them, add more schema, add more answer-first content
- Pages that do not get cited: check schema validity, rewrite opening paragraphs in answer-first format, add FAQPage schema

## The timeline to expect

Based on client results:

- **Week 1 to 2**: Technical fixes (robots.txt, schema implementation, sitemap)
- **Month 1**: Entity schema deployed, first batch of answer-first content published
- **Month 2 to 3**: First AI citations begin appearing. Often starts with Perplexity (faster citation cycles) before ChatGPT
- **Month 4 to 6**: Consistent citation presence established for core topic cluster
- **Month 6+**: Brand recognition compounds. AI engines begin citing you for tangentially related queries

One health tech client went from zero tracked citations to 20+ appearances in 90 days after implementing this exact process.

## The one thing most brands skip

Most brands that try AEO implement schema and then wait. They do not update their robots.txt. They do not restructure existing content in answer-first format. They do not build topical depth.

The brands that get cited are the ones that do all of it. Not sequentially. Simultaneously.

Schema without content depth gets you occasional citations. Content depth without schema gets you nothing. Topical authority without bot access gets you nothing.

All three, in parallel, is what produces consistent AI citation at scale.

---

## Related reading

- [schema markup for AI search](/insights/schema-markup-for-ai-search) — every schema type that matters, with implementation examples
- [AEO vs SEO](/insights/aeo-vs-seo-difference) — how citation optimization and organic rankings work together
- [topical authority for SaaS](/insights/topical-authority-saas-playbook) — the content depth that sustains AI citations over time
- [AEO strategy](/services/aeo) — full AEO implementation across 6 AI engines

---

Shivam Attri is an [AEO specialist](/) helping B2B SaaS brands get cited by ChatGPT, Perplexity, and Google AI Overviews. See the full [AEO service](/services/aeo) or [book an audit](/contact).
