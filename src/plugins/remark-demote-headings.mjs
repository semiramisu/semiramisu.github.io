/**
 * Many older posts use `#` for section headings, but the page already renders
 * the post title as the only <h1>. When a document contains depth-1 headings,
 * shift every heading down one level so sections become <h2> (picked up by
 * the TOC and the `##` prose markers). Heading ids are slugged from text,
 * so existing anchor links keep working.
 */
export function remarkDemoteHeadings() {
  return (tree) => {
    const headings = [];
    let hasH1 = false;

    (function walk(node) {
      if (node.type === "heading") {
        headings.push(node);
        if (node.depth === 1) hasH1 = true;
      }
      if (node.children) node.children.forEach(walk);
    })(tree);

    if (!hasH1) return;
    for (const heading of headings) {
      heading.depth = Math.min(6, heading.depth + 1);
    }
  };
}
