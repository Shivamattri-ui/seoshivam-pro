import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: 'seoshivam.pro Insights',
    description:
      'AEO, SEO, and AI search visibility essays by Shivam Attri. Answer-first analysis for B2B SaaS founders.',
    site: context.site ?? 'https://seoshivam.pro',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: '<language>en-us</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/insights/${post.id}/`,
      categories: [post.data.category],
    })),
  });
}
