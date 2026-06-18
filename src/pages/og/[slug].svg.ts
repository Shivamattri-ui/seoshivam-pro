import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { buildOgCoverSvg } from '../../lib/og-cover';

/**
 * Per-blog OG image (vector). Returns the branded 1200x630 cover as SVG.
 *
 * Endpoint: /og/<post-id>.svg
 *
 * Note: SVG og:image is accepted by X, modern Facebook, and LinkedIn, but
 * NOT by Google Discover, which needs a large raster image. Blog posts
 * therefore reference the .png twin (see /og/[slug].png.ts) for og:image
 * and Article schema; this route stays for vector-friendly consumers.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const svg = buildOgCoverSvg((props as any).post);
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
