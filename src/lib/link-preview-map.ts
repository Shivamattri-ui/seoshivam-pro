import type { CollectionEntry } from 'astro:content';
import { SITE_ROUTE_META, blogLayoutTitle } from './site-route-meta';

export type LinkPreviewMeta = { t: string; d: string };

export function buildLinkPreviewMap(posts: CollectionEntry<'blog'>[]): Record<string, LinkPreviewMeta> {
  const map: Record<string, LinkPreviewMeta> = {};

  for (const [path, meta] of Object.entries(SITE_ROUTE_META)) {
    map[path] = { t: meta.title, d: meta.description };
  }

  for (const p of posts) {
    map[`/insights/${p.id}`] = {
      t: blogLayoutTitle(p.data.title),
      d: p.data.description,
    };
  }

  return map;
}
