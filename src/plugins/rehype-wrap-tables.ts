import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Wraps each <table> in <div class="art-table-wrap"> for horizontal scroll
 * and consistent borders without breaking markdown-authored tables.
 */
export function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'table') return;
      if (!parent || parent.type !== 'element' || index === undefined || !('children' in parent)) return;
      const cls = parent.properties?.className;
      const arr = Array.isArray(cls) ? cls : cls ? [String(cls)] : [];
      if (arr.includes('art-table-wrap')) return;

      const wrap: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['art-table-wrap'] },
        children: [node],
      };
      parent.children[index] = wrap;
    });
  };
}
