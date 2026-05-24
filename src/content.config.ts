import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Lowercase slugs only (labels like "AEO" in the UI come from catLabels in pages).
    category: z.enum(['aeo', 'seo', 'ai-search', 'web-design'], {
      error: () => ({
        message:
          'category must be one of: aeo | seo | ai-search | web-design (lowercase slugs, not "SEO" or "AEO")',
      }),
    }),
    readTime: z.string(),
    featured: z.boolean().default(false),
    ogImage: z.string().optional(),
    tldr: z.string().optional(),
    // Quick Recap: 3 tight bullets displayed before the article body.
    // Drives AI citability (structured takeaways) + skimmability.
    recap: z.array(z.string()).max(3).optional(),
    tags: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };
