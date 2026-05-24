---
title: "How to Get Your Brand Cited by Claude: The Anthropic AI Search Playbook"
description: "Claude uses Brave Search for live queries, not Bing. Most AEO strategies miss this entirely. This is the complete technical playbook for getting your brand cited by Claude: Brave indexation, ClaudeBot access, entity schema, and the content structure Claude's retrieval system actually prefers."
pubDate: 2026-05-24
category: "ai-search"
readTime: "11 min"
featured: false
tldr: "Claude retrieves live web content via Brave Search, not Bing. Getting cited requires Brave indexation (verified at search.brave.com), ClaudeBot allowed in robots.txt, answer-first content structure, and FAQPage schema. Most AEO strategies written in 2024 optimize entirely for Bing-dependent engines and miss Claude's citation pathway entirely."
recap:
  - "Claude uses Brave Search for live queries. A site well-indexed by Bing may still be invisible to Claude. Check Brave indexation separately at search.brave.com and submit your sitemap at search.brave.com/webmaster."
  - "ClaudeBot is Anthropic's training crawler. Allow it explicitly in robots.txt alongside BraveBot. Many security plugins block both by default."
  - "Claude strongly favors FAQPage schema: the acceptedAnswer text is directly extractable as a citation. Every service and content page should have 3 to 5 structured Q&A pairs with specific, data-bearing answers."
tags: ["Claude Citations", "AI Search", "AEO", "Answer Engine Optimization", "Anthropic AI Search"]
faqs:
  - q: "How does Claude decide what to cite?"
    a: "Claude cites sources through two mechanisms. For real-time queries with search enabled, Claude retrieves results from Brave Search and cites the most relevant indexed pages. For knowledge-type questions, Claude draws on its training corpus. In both cases, Claude strongly favors pages with FAQPage schema, answer-first content structure, and specific data rather than vague claims. Brave Search indexation is the technical prerequisite for live-search citations."
  - q: "Is Brave Search indexation different from Google and Bing?"
    a: "Yes. Brave Search operates an independent index crawled by BraveBot. A site can rank number one on Google, be well-indexed by Bing, and still return few results in a Brave site search. To verify Brave indexation, search site:yourdomain.com at search.brave.com. To submit your sitemap, go to search.brave.com/webmaster. These are entirely separate from Google Search Console and Bing Webmaster Tools."
  - q: "What is ClaudeBot and do I need to allow it separately?"
    a: "ClaudeBot is Anthropic's training data crawler. It crawls the web to include content in future model training. BraveBot is Brave's indexing crawler for live search results. Both need to be explicitly allowed in robots.txt. A site that allows ClaudeBot but not BraveBot will appear in Claude's training data but not in live search citations. A site that allows neither cannot be cited by Claude through either mechanism."
  - q: "How is getting cited by Claude different from ChatGPT?"
    a: "The content structure requirements are similar. The technical requirements are different. ChatGPT uses Bing for live search. Claude uses Brave Search. Bing indexation, which most AEO playbooks correctly emphasize for ChatGPT and Copilot, does not help Claude. You need separate Brave indexation alongside Bing indexation to cover both engines. The entity schema and FAQPage schema requirements are the same across both."
---

Most AEO strategies published in 2024 assume AI engines all pull from the same sources. They optimize for Bing indexation because ChatGPT and Copilot use Bing. They work for those engines. They miss Claude entirely.

Claude uses Brave Search for live queries. Brave operates its own independent index, crawled by its own bot, with its own submission interface. A site thoroughly indexed by Bing can return almost no results in a Brave site search. Brands running comprehensive Bing-focused AEO campaigns and wondering why their Claude citation rate stays at zero are missing this technical gap.

This is the Claude-specific playbook. The [ChatGPT citation playbook](/insights/how-to-get-cited-by-chatgpt) covers Bing-dependent engines. This covers what is different for Claude.

## How Claude retrieves information

Claude operates two distinct citation pathways:

**Live Brave Search (when search is enabled):** For queries that benefit from current information — vendor comparisons, pricing, current tools, recent updates — Claude runs a Brave Search query and cites the most relevant indexed pages. If your site is not indexed by Brave, this pathway is entirely closed.

**Training corpus (for knowledge questions):** For questions with stable answers — "what is topical authority," "how does FAQPage schema work," "what is the difference between AEO and SEO" — Claude draws on its training data. Content that met Claude's quality signals during previous training runs can produce citations without a live search step.

The practical implication: brands that want consistent Claude citations across both query types need to address both pathways. Brave indexation for live queries. Content quality and structure for training corpus citations.

## Step 1: Verify and fix Brave indexation

Open [search.brave.com](https://search.brave.com) and run `site:yourdomain.com`. Compare the result count to your actual published page count. For most sites, the discrepancy is significant — some return under 20% of their actual pages.

To submit your sitemap: [search.brave.com/webmaster](https://search.brave.com/webmaster). Add your domain, verify ownership (same process as Google Search Console), and submit your XML sitemap URL.

Brave does not have a URL-by-URL submission tool as of 2025. Sitemap submission and natural crawling are the primary mechanisms. This means Brave indexation builds more slowly than Bing, and is another reason to address it early rather than retroactively.

Allow BraveBot explicitly in robots.txt alongside the other AI crawlers:

```
User-agent: BraveBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /
```

Note the distinction between BraveBot (Brave's indexing crawler) and ClaudeBot (Anthropic's training crawler). Both need to be allowed. Many sites block all non-major-search-engine bots by default through security plugins or Cloudflare settings. Use the [robots.txt checker](/tools/robots-txt-checker) to confirm which bots your site is currently allowing.

## Step 2: FAQPage schema — Claude's highest-extractability format

Of all schema types, FAQPage produces the most direct citations in Claude responses. The `acceptedAnswer` text is structured, clearly attributed to the source URL, and extractable without the surrounding prose context that live search results carry.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AEO and how does it differ from SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AEO, Answer Engine Optimization, is the practice of structuring content so AI engines cite your brand in generated answers. SEO targets keyword rankings in traditional search results. The technical foundation overlaps but the content structure requirements differ: AEO requires answer-first formatting, FAQPage schema, and entity definition. SEO requires topical authority and technical crawlability. The most effective approach builds one system that satisfies both."
      }
    }
  ]
}
```

The accepted answer text should be 40 to 100 words, contain a direct factual answer, include at least one specific data point, and avoid any marketing language. Claude's extraction is precise: vague answers produce low-confidence citations with hedged language; specific answers produce direct citations with source attribution.

Every service page and high-traffic content page should have 3 to 5 FAQ schema entries targeting the specific questions your buyers ask. The broader [schema markup for AI search](/insights/schema-markup-for-ai-search) guide covers the full JSON-LD stack.

## Step 3: Entity signals Claude uses

Claude's training corpus includes entity knowledge: what a brand is, what it does, what category it operates in. Brands with weak entity signals either do not appear in Claude responses or appear with uncertain language ("I believe" rather than a direct statement).

Entity clarity for Claude requires:

**Organization schema with a precise description field:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://yoursite.com/#org",
  "name": "Your Brand",
  "url": "https://yoursite.com",
  "description": "One sentence: product category, target buyer, specific outcome.",
  "foundingDate": "2022",
  "sameAs": [
    "https://linkedin.com/company/yourbrand",
    "https://github.com/yourbrand"
  ]
}
```

The `description` field is pulled directly into entity representations in AI training data. It needs to be precise enough to distinguish your brand from every other brand in your category. "We help SaaS companies grow" is not a distinguishing description. "Customer success automation for B2B SaaS companies with 50 to 500 seats" is.

**Consistent naming across surfaces.** If your company name in the schema is "Acme AI," your LinkedIn is "Acme AI Inc.," and your GitHub is "acme-ai-hq," Claude's entity model may treat these as separate entities or have low confidence in the connection. Consistent naming across your schema, LinkedIn, GitHub, and any press mentions strengthens entity coherence.

## Step 4: Content structure that Claude extracts reliably

Claude users in professional settings write longer, more specific queries than typical search users. Common patterns from enterprise and developer contexts:

- "Explain the difference between [X] and [Y] for [specific use case]"
- "What are the most important factors when evaluating [vendor category] for [company type]"
- "How does [approach] compare to [alternative approach] in terms of [specific metric]"

Content targeting these patterns performs better in Claude citations than content targeting generic short-tail queries. Specificity is the signal. A guide titled "AEO for Legal Tech: Getting Cited by AI Tools Used by Corporate Counsel" will be cited for more Claude queries than a guide titled "Introduction to AEO."

The structural requirements for content Claude extracts predictably:

**Answer in sentence one.** The direct response to the question the page targets must appear before any context, qualification, or background. Claude pulls from the beginning of content blocks when constructing citations.

**Specific data over general claims.** "Our median client sees first citations within 60 days" is citable. "Our clients see great results" is not. Every factual claim should have a number attached where possible.

**Question-match headings.** H2 and H3 headings written as questions or matching question phrasing give Claude precise extraction anchors. "How long does AEO take?" as an H2 will be extracted for Claude queries asking that exact question. "Our Process" will not.

This content structure overlaps exactly with what produces [topical authority](/insights/topical-authority-saas-playbook) for traditional search. The same cluster of specific, expert-level posts that earns Google citations earns Claude citations when the Brave indexation layer is in place.

## Step 5: Comparing Claude to other engines

| Signal | Claude | ChatGPT | Copilot | Perplexity |
|--------|--------|---------|---------|------------|
| Live search index | Brave Search | Bing | Bing | Bing + multiple |
| Training corpus weight | High | High | Moderate | Low |
| Bing indexation required | No | Yes | Yes | Yes |
| Brave indexation required | Yes | No | No | No |
| FAQPage schema value | Very high | High | High | High |
| LinkedIn signals | Moderate | Low | High | Low |

The [Microsoft Copilot playbook](/insights/microsoft-copilot-optimization) covers the Bing-specific optimization path for Copilot, which is the enterprise AI engine most different from Claude in its technical requirements.

## Measuring Claude citation performance

No native analytics exist for Claude citations. Three indirect signals are worth tracking:

**Monthly manual sampling.** Ask Claude your 20 most important buyer queries, with and without the search tool enabled. Document which responses cite your domain and what text is extracted. Repeat monthly. Changes in citation frequency and the queries you appear for reveal whether the Brave indexation and content structure work is producing results.

**Brave Search Console impressions.** Brave Webmaster Tools shows impressions and clicks for your domain across Brave queries. Rising impressions for target queries correlate with improving Claude live-search citation probability.

**Branded Google search growth.** Buyers who encounter your brand in Claude responses frequently search your brand name on Google as a follow-up. Unexplained growth in branded impressions in Google Search Console is one of the more reliable secondary indicators of increasing AI citation frequency across engines.

Run the [AI Visibility Score](/tools/ai-visibility-score) to benchmark your current citation status across Claude, ChatGPT, Perplexity, and Google AI Overviews before building a channel-specific optimization roadmap.

---

## Related reading

- [ChatGPT citations](/insights/how-to-get-cited-by-chatgpt) — Bing-based engines: ChatGPT and Perplexity
- [Microsoft Copilot optimization](/insights/microsoft-copilot-optimization) — Bing indexation, LinkedIn signals, enterprise citation mechanics
- [schema markup for AI search](/insights/schema-markup-for-ai-search) — complete JSON-LD implementation by page type
- [AEO strategy](/services/aeo) — multi-engine implementation including Claude, ChatGPT, Perplexity, and Copilot

---

*Need a citation gap analysis across Claude and the other major AI engines? [Start with an audit](/contact) and get a channel-by-channel breakdown of where your brand currently appears and what is blocking the gaps.*
