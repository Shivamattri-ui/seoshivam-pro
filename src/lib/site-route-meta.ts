/** Canonical Layout title + meta description per static route (single source of truth). */
export type RouteMeta = {
  title: string;
  description: string;
};

export const BLOG_LAYOUT_TITLE_SUFFIX = ' | Shivam Attri';

export function blogLayoutTitle(postTitle: string): string {
  return `${postTitle}${BLOG_LAYOUT_TITLE_SUFFIX}`;
}

export const SITE_ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Shivam Attri: AEO, SEO & AI-Visible Web Design | seoshivam.pro',
    description:
      'Shivam Attri helps B2B SaaS founders get cited by ChatGPT, Perplexity and Google AI Overviews. AEO strategy, SEO architecture, AI-visible web design from India to the world.',
  },
  '/about': {
    title: 'About Shivam Attri · AEO Specialist and SEO Strategist',
    description:
      'Shivam Attri: AEO Specialist helping B2B SaaS founders get cited in ChatGPT, Perplexity, and Google AI Overviews. 7+ years, 30+ brands, clients across US, UK, EU, AU, IN, DE.',
  },
  '/contact': {
    title: 'Contact Shivam Attri | AEO and SEO Specialist',
    description:
      'Start a conversation about AEO strategy, SEO architecture, or AI-visible web design. Based in India, working globally with US, UK, EU, and AU clients.',
  },
  '/work': {
    title: 'Client Work: AEO and SEO Results | Shivam Attri',
    description:
      'Real client results: 16x click growth in 30 days, 20+ AI citations tracked, 4.7x organic leads. GSC-verified case studies across SaaS, hospitality, recruitment tech, and corporate gifting.',
  },
  '/insights': {
    title: 'Insights: AEO, SEO and AI Search Visibility | Shivam Attri',
    description:
      'Long-form guides on Answer Engine Optimization, SEO architecture, Google AI Overviews, and building AI search visibility for B2B SaaS brands.',
  },
  '/resources': {
    title: 'AEO Audit, Content Brief, Claude Skills | Shivam Attri',
    description:
      'Three free AEO resources: 80-point audit checklist, content brief Notion template, and Claude Skills PDF for SEO content production. Email-gated.',
  },
  '/tools': {
    title: 'Free AEO and SEO Tools: Visibility Score, Bot Checker, Robots.txt Generator | Shivam Attri',
    description:
      'Three free tools for AI search visibility: a 10-signal AEO readiness quiz, an AI bot access checker for robots.txt, and a robots.txt generator covering fifteen AI crawlers. No account required.',
  },
  '/tools/ai-visibility-score': {
    title: 'AI Visibility Score: Free AEO Readiness Quiz | Shivam Attri',
    description:
      'Free 10-question AI visibility quiz for B2B SaaS sites. Score bot access, entity schema, FAQ markup, and citation-ready content. Instant score out of 100 plus a prioritised fix list.',
  },
  '/tools/robots-txt-checker': {
    title: 'AI Bot Access Checker: Free robots.txt Checker for AI Engines | Shivam Attri',
    description:
      'Check whether GPTBot, ClaudeBot, PerplexityBot, Bingbot, and Googlebot can access your website. The most common reason for zero AI citations is a blocked robots.txt. Free, instant, no login.',
  },
  '/tools/robots-txt-generator': {
    title: 'AI Robots.txt Generator: Free robots.txt Builder for ChatGPT, Claude, Perplexity | Shivam Attri',
    description:
      'Build a robots.txt file optimized for 15 AI crawlers. Allow or block GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot, and more with one click. Live preview, copy, download. No login required.',
  },
  '/services': {
    title: 'AEO, SEO and AI-Visible Web Design Services | Shivam Attri',
    description:
      'Get cited by ChatGPT, Perplexity, and Google AI Overviews. AEO strategy, SEO architecture, and AI-visible web design for B2B SaaS founders.',
  },
  '/services/aeo': {
    title: 'AEO Strategy for B2B SaaS | Shivam Attri',
    description:
      'Get your brand cited in ChatGPT, Perplexity, and Google AI Overviews. AEO strategy built from real client results across US, UK, EU, and Australia.',
  },
  '/services/seo': {
    title: 'SEO Strategy and Architecture for B2B SaaS | Shivam Attri',
    description:
      'Organic rankings that compound. Technical SEO, content architecture, topical authority systems, and entity optimization for B2B SaaS brands with ambition.',
  },
  '/services/web-design': {
    title: 'AI-Visible Web Design: Webflow, Framer, Astro, WordPress | Shivam Attri',
    description:
      'Websites structured for AI crawlability from day one. JSON-LD schema, semantic HTML, bot-accessible architecture. Webflow, Framer, Astro, and WordPress builds.',
  },
};
