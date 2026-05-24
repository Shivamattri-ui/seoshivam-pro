---
title: "How to Get Your Brand Cited by Claude: The Anthropic AI Search Playbook"
description: "Claude uses Brave Search for live web queries and a proprietary training corpus for knowledge questions. Getting cited requires different optimizations for each mode. This is the complete playbook, including entity signals, content structure, and how Claude's citation behavior differs from ChatGPT and Perplexity."
pubDate: 2026-05-24
category: "ai-search"
readTime: "11 min"
featured: false
tldr: "Claude cites sources through two distinct mechanisms: live Brave Search results for real-time queries, and its training data for knowledge-type questions. Optimizing for both requires Brave Search indexation, answer-first content structure, strong entity schema, and the kind of specific, practitioner-level content that ends up in Claude's training corpus during future model updates."
recap:
  - "Claude uses Brave Search for live queries and training data for knowledge questions. Both require different optimization strategies."
  - "Brave Search indexation is separate from Google and Bing. Submit your sitemap at search.brave.com/webmaster to confirm your pages are indexed."
  - "Claude's citation behavior strongly favors content that provides a direct answer in the first two sentences, with specific data points rather than general claims."
tags: ["Claude Citations", "AI Search", "AEO", "Answer Engine Optimization", "Anthropic AI Search"]
faqs:
  - q: "How does Claude decide what to cite?"
    a: "Claude cites sources through two distinct mechanisms. For real-time queries with a search tool enabled, Claude retrieves results from Brave Search and cites the most relevant, technically accessible pages. For knowledge-type questions that do not require current information, Claude draws on its training corpus. In both cases, Claude strongly favors content that provides a direct answer immediately, uses specific data rather than vague claims, and comes from a domain with coherent topical authority in the relevant category."
  - q: "Is Brave Search indexation different from Google indexation?"
    a: "Yes. Brave Search maintains its own independent index, crawled by Brave's own crawler (BraveBot). A site can rank well on Google and have poor Brave indexation. To verify your Brave indexation, search site:yourdomain.com on search.brave.com. To improve it, submit your XML sitemap at search.brave.com/webmaster and ensure BraveBot is not blocked in your robots.txt."
  - q: "Does Claude use a robots.txt file named ClaudeBot?"
    a: "Yes. Anthropic's crawler is named ClaudeBot. Your robots.txt should include 'User-agent: ClaudeBot' followed by 'Allow: /' to explicitly permit crawling. Some hosting platforms and WordPress security plugins add wildcard disallows that block ClaudeBot by default. Verify this is not the case before investing in any Claude-specific optimization."
  - q: "How is getting cited by Claude different from getting cited by ChatGPT?"
    a: "ChatGPT's citation behavior is primarily driven by its training corpus and the Bing index (when search is enabled). Claude primarily uses Brave Search for live queries. The content structure requirements are similar: answer-first, semantically clear, entity-consistent. But the distribution channel differs entirely. A site well-indexed by Bing may still be poorly indexed by Brave. Running both requires separate technical verification steps."
---

Claude is now one of the most widely used AI assistants in professional contexts, particularly among developers, researchers, and knowledge workers. When Claude users ask questions about vendors, tools, or industry concepts, the brands that appear in Claude's answers win mindshare that does not appear in any analytics dashboard.

Getting cited by Claude is achievable and currently undercontested. Most AEO strategies focus on ChatGPT and Perplexity. Almost none address Claude's specific citation mechanics. That gap is the opportunity.

## How Claude actually retrieves information

Understanding Claude's information architecture is necessary before optimizing for it. Claude cites sources through two distinct mechanisms:

**Mechanism 1: Live Brave Search**

When Claude has a search tool enabled, it retrieves results from Brave Search for queries that benefit from current information: recent news, vendor comparisons, pricing, current best practices. The sources it cites are the most relevant pages in Brave's index for that query.

This means: if your site is not indexed by Brave, Claude with search enabled will not cite it for live queries. Full stop.

**Mechanism 2: Training corpus**

For knowledge-type questions that do not require current information, "what is topical authority," "how does JSON-LD schema work," "what is the difference between AEO and SEO," Claude draws on its training data. The sources that end up in future model training tend to be pages with strong topical signals, high engagement, structured content, and authoritative external links pointing to them.

This is a longer-term play, but it is not speculative. Content published today that meets Claude's quality and structure signals has a reasonable probability of being included in future training data. Content that fails basic structure checks will not be.

Most optimization strategies need to address both mechanisms. This playbook covers each.

## Step 1: Verify Brave Search indexation

Brave Search operates an independent web index crawled by BraveBot. It is not derived from Google or Bing. A site can rank number one on Google and return zero results in a Brave site search.

Check your indexation right now: open [search.brave.com](https://search.brave.com) and search `site:yourdomain.com`. Compare the result count to your actual published page count. If the numbers are significantly different, you have a Brave indexation gap.

To submit your site to Brave, go to [search.brave.com/webmaster](https://search.brave.com/webmaster) and add your sitemap. This is the equivalent of Google Search Console or Bing Webmaster Tools, and it is free.

Also verify your robots.txt at `yourdomain.com/robots.txt`:

```
User-agent: ClaudeBot
Allow: /

User-agent: BraveBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bingbot
Allow: /
```

Both ClaudeBot (Anthropic's training crawler) and BraveBot (Brave's indexing crawler) need to be explicitly allowed. Many sites have a `Disallow: /` wildcard, or a security plugin that blocks all bots except Googlebot. Either will prevent Claude from crawling or citing your content. You can check your current bot permissions with the [robots.txt checker tool](/tools/robots-txt-checker).

## Step 2: Build content that Claude can extract and attribute

Claude's citation behavior has a consistent pattern across both search-enabled and knowledge queries: it strongly favors content that provides the direct answer in the first two sentences.

This is not a stylistic preference. It reflects how retrieval systems work. When Claude processes a page, it evaluates whether the page answers the query. A page that opens with "Content marketing has been a key component of B2B strategy for decades..." and eventually, in paragraph four, explains what you do is harder to retrieve correctly than a page that opens with "We help B2B SaaS companies rank their content in AI engines by building answer-first content systems."

The structural requirements for Claude-citable content:

**Direct answer first.** The first sentence of every page or section should be extractable as a standalone answer to the question the page targets. If someone asks Claude "what does [your company] do" and Claude pulls your homepage intro, what does that sentence say?

**Specific data over vague claims.** Claude is significantly more likely to cite content containing specific, verifiable numbers than content making general claims. "We have helped 30+ brands across 8 countries" is citable. "We help brands succeed with their SEO" is not. This applies to every page: feature pages, about pages, blog posts, case studies.

**Question-match in headings.** H2 and H3 headings that match the question format of buyer queries ("How do AI engines decide what to cite?" rather than "Our Approach to Citation") give Claude clear extraction anchors. Every major section should have a heading that someone could plausibly type into Claude.

**Semantic completeness.** Claude evaluates topical depth. A single blog post on a topic signals less authority than a site that comprehensively covers a subject from multiple angles, with internal links connecting related content. The [topical authority playbook for SaaS](/insights/topical-authority-saas-playbook) covers how to build this systematically.

## Step 3: Entity signals for Claude

Claude maintains entity knowledge, a set of associations between names, organizations, products, and their attributes. When a user asks Claude about a vendor or category, Claude draws on its entity understanding to determine who the authoritative source is.

Entity signals for Claude follow the same pattern as for other AI engines, with some additions:

**Organization schema with sameAs**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://yoursite.com/#org",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "description": "What you do, for whom, and why it matters. One sentence.",
  "foundingDate": "2018",
  "sameAs": [
    "https://linkedin.com/company/yourcompany",
    "https://twitter.com/yourcompany",
    "https://github.com/yourcompany"
  ]
}
```

The `sameAs` array creates cross-platform entity connections that Claude's training corpus and retrieval systems use to verify organizational identity. LinkedIn is particularly important for professional services and B2B SaaS companies.

**Consistent entity naming across all platforms**

Claude's entity model is built on consistency. If your company is called "Acme AI" on your website, "Acme AI, Inc." on LinkedIn, and "AcmeAI" on GitHub, these read as potentially different entities. Consistent naming across the web strengthens entity confidence.

**About page as entity anchor**

Your about page is the primary entity definition document. It should clearly state:
- What the company does (one sentence)
- Who the founder is with verifiable credentials
- When the company was founded
- What categories or verticals it serves

This is the page Claude's training corpus will most commonly use to answer "what does [your company] do" type queries. Treat it as a structured entity document, not a brand story.

## Step 4: Content specifically written for Claude's query patterns

Claude users in professional contexts query differently from Google users. They write longer, more precise questions. They follow up. They reference previous answers in the same conversation.

Common Claude query patterns from professional users:

- "Explain [concept] as it applies to [specific context]"
- "What are the most important [N] factors for [outcome]"
- "Compare [option A] and [option B] for [specific use case]"
- "What should I look for when evaluating [vendor category]"
- "How would I implement [approach] for a [company type]"

Content that matches these patterns, with precise, conditional answers rather than generic overviews, performs better in Claude citations. An article titled "AEO for B2B SaaS: What to Prioritize in the First 90 Days" will be cited for more Claude queries than an article titled "Introduction to AEO." The specificity is the signal.

This aligns with the broader principle in AEO strategy: [content written to answer specific, high-intent queries](/insights/how-to-get-cited-by-chatgpt) earns more citations across all AI engines than generic awareness content.

## Step 5: FAQPage schema for direct extraction

Claude extracts FAQ-format content with high reliability. A page with properly implemented FAQPage JSON-LD schema gives Claude a clean, structured set of question-answer pairs to pull from, with clear attribution back to the source.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does AEO mean for a B2B SaaS company?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AEO, or Answer Engine Optimization, is the practice of structuring your website and content so that AI engines cite your brand in their generated answers. For B2B SaaS, this means technical fixes (Bing indexation, AI bot access, entity schema) combined with content restructuring so answers appear in the first two sentences of each page."
      }
    }
  ]
}
```

The accepted answer text in FAQPage schema is directly usable by Claude as a citation source. Every service page and key content page should have FAQPage schema covering the 3 to 5 most common questions buyers ask about that topic.

## How Claude citation compares to ChatGPT and Perplexity

The content structure requirements are similar across all three engines, but the distribution mechanics differ:

| Signal | Claude | ChatGPT | Perplexity |
|--------|--------|---------|------------|
| Live search index | Brave Search | Bing | Bing + multiple sources |
| Training data weight | High | High | Moderate |
| FAQPage schema | Strongly favored | Favored | Favored |
| Bing indexation required | Partially (via Brave) | Yes | Yes |
| Brave indexation required | Yes | No | No |
| LinkedIn signals | Moderate | Low | Low |

The [ChatGPT citation guide](/insights/how-to-get-cited-by-chatgpt) and the [Microsoft Copilot playbook](/insights/microsoft-copilot-optimization) cover Bing-specific optimization. This playbook focuses specifically on Brave Search and Claude's training corpus, which are the Claude-specific requirements that most AEO strategies miss.

## Measuring Claude citation performance

Claude does not provide citation analytics. Measurement requires manual verification:

**Monthly citation sampling.** Ask Claude your 15 most important buyer queries manually, with and without search enabled. Document which responses cite your domain. Track changes month over month.

**Branded query monitoring.** Buyers who encounter your brand in Claude often follow up with a direct Google or LinkedIn search. Track branded search volume in Google Search Console month over month. Unexplained increases often correlate with growing AI citation frequency.

**Brave Search Console impressions.** Brave Webmaster Tools shows impressions and clicks from Brave Search. Rising impressions for target queries indicate improving Brave indexation and relevance signals.

The measurement gap in Claude optimization is real. It is also what makes this channel currently undercontested. Brands tracking and systematically improving their Claude citation rates right now are building an authority position before the channel becomes as contested as ChatGPT or Google AI Overviews.

Use the [AI Visibility Score tool](/tools/ai-visibility-score) to benchmark your current citation performance across Claude, ChatGPT, Perplexity, and Google AI Overviews simultaneously.

---

## Related reading

- [How to Get Cited by ChatGPT](/insights/how-to-get-cited-by-chatgpt) — the ChatGPT and OpenAI citation playbook
- [Microsoft Copilot Optimization](/insights/microsoft-copilot-optimization) — Bing indexation and LinkedIn signals for the enterprise AI engine
- [Schema Markup for AI Search](/insights/schema-markup-for-ai-search) — the complete JSON-LD implementation guide
- [AEO Strategy and Services](/services/aeo) — full multi-engine AEO including Claude, ChatGPT, Perplexity, and Google AI Overviews

---

*Need a citation gap analysis across Claude and the other major AI engines? [Start with an audit](/contact) and get a channel-by-channel breakdown of where your brand is visible and where it is missing.*
