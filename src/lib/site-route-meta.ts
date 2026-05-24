/** Canonical Layout title + meta description per static route (single source of truth). */
export type RouteMeta = {
  title: string;
  description: string;
};

/** Blog post title suffix — unchanged, applied via blogLayoutTitle(). */
export const BLOG_LAYOUT_TITLE_SUFFIX = ' | Shivam Attri';

export function blogLayoutTitle(postTitle: string): string {
  return `${postTitle}${BLOG_LAYOUT_TITLE_SUFFIX}`;
}

export const SITE_ROUTE_META: Record<string, RouteMeta> = {

  // ─── Homepage ────────────────────────────────────────────────────────────────
  '/': {
    title: 'AI SEO Expert, AEO Strategist & Growth Marketing Specialist | Shivam Attri',
    description:
      'AEO, SEO, and AI-visible web design that gets brands cited by ChatGPT, Perplexity, and Google AI Overviews. 7+ years · 40+ clients globally. Book a free audit.',
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  '/about': {
    title: 'Shivam Attri · AEO Specialist, AI SEO Expert & B2B SaaS Growth Strategist',
    description:
      'AEO specialist and SEO strategist. 7+ years, 40+ brands across SaaS, HealthTech, Logistics, eCommerce, and more. US · UK · EU · AU · IN. See the work.',
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  '/contact': {
    title: 'Start an AEO or SEO Project · Free 1-Page Audit | Shivam Attri',
    description:
      'Describe your project. I reply within 4 hours with a 1-page AI visibility audit. AEO, SEO, and web design. Working globally: US, UK, EU, AU.',
  },

  // ─── Work / Case Studies ─────────────────────────────────────────────────────
  '/work': {
    title: 'AEO & SEO Results: 16× Click Growth, 20+ AI Citations | Shivam Attri',
    description:
      'GSC-verified results across SaaS, HealthTech, Logistics, and B2B Services. 16× clicks in 30 days · 463K users in 90 days · 20+ AI citations. View case studies.',
  },

  // ─── Insights / Blog ─────────────────────────────────────────────────────────
  '/insights': {
    title: 'The Visibility Engine: SEO, AEO, GEO & AI Search Insights | Shivam Attri',
    description:
      'Practitioner guides on AEO, SEO, GEO, and AI search visibility. Written from real client work, not theory. Get cited by ChatGPT, Perplexity, and Google AI Overviews.',
  },

  // ─── Resources ───────────────────────────────────────────────────────────────
  '/resources': {
    title: 'Free AEO Audit, Content Brief & Claude Skills PDF | Shivam Attri',
    description:
      '80-point AEO audit, Notion content brief, and Claude Skills PDF. Free email-gated resources for AI-search optimized content systems. Download instantly.',
  },

  // ─── Tools hub ───────────────────────────────────────────────────────────────
  '/tools': {
    title: 'Free AEO Tools: AI Visibility Score & Bot Checker | Shivam Attri',
    description:
      'Free AEO tools: AI visibility quiz, robots.txt bot checker, and robots.txt generator for 15 AI crawlers. No account required. Run your audit now.',
  },

  // ─── Tool: AI Visibility Score ───────────────────────────────────────────────
  '/tools/ai-visibility-score': {
    title: 'AI Visibility Score: Test Your AEO Readiness for Free | Shivam Attri',
    description:
      'Free 10-question quiz that scores your AI visibility across bot access, entity schema, FAQ markup, and citation-ready content. Get your score out of 100 instantly.',
  },

  // ─── Tool: Robots.txt Checker ────────────────────────────────────────────────
  '/tools/robots-txt-checker': {
    title: 'AI Bot Access Checker: Free robots.txt Audit | Shivam Attri',
    description:
      'Check if GPTBot, ClaudeBot, PerplexityBot, and Bingbot can crawl your site. Blocked robots.txt is the #1 cause of zero AI citations. Free, instant, no login.',
  },

  // ─── Tool: Robots.txt Generator ──────────────────────────────────────────────
  '/tools/robots-txt-generator': {
    title: 'AI Robots.txt Generator: Build for 15 AI Crawlers | Shivam Attri',
    description:
      'Build a robots.txt for 15 AI crawlers in seconds. Allow or block GPTBot, ClaudeBot, PerplexityBot, Bingbot, and more. Live preview, copy, and download.',
  },

  // ─── Services hub ────────────────────────────────────────────────────────────
  '/services': {
    title: 'AEO Strategist · SEO · AI-Visible Web Design | Shivam Attri',
    description:
      'Three services, one architecture: AEO for AI citations, SEO for organic pipeline, and AI-visible web design to power both. For brands reducing paid dependency.',
  },

  // ─── AEO Service ─────────────────────────────────────────────────────────────
  '/services/aeo': {
    title: 'AEO Services: AI Search Optimization & Citation Growth | Shivam Attri',
    description:
      'Get cited by ChatGPT, Perplexity, Google AI Overviews, and Copilot. Technical audit, entity schema, answer-first content, and 6-engine citation tracking.',
  },

  // ─── SEO Service ─────────────────────────────────────────────────────────────
  '/services/seo': {
    title: 'SEO Expert: Organic Growth, AI Search & Brand Visibility | Shivam Attri',
    description:
      'Organic pipeline, lower CAC, and AI citations from one SEO system. Technical SEO, topical authority, entity optimization. Start with a free SEO audit.',
  },

  // ─── Web Design Service ──────────────────────────────────────────────────────
  '/services/web-design': {
    title: 'AI-Optimized Web Design: Conversion Focused & AEO Ready | Shivam Attri',
    description:
      'Websites cited by ChatGPT, Perplexity, and Google AI Overviews from launch day. JSON-LD schema, semantic HTML, AI bot access. Webflow, Framer, Astro, WordPress.',
  },
};
