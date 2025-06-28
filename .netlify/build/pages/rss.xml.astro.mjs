import rss from '@astrojs/rss';
import { a as getCollection } from '../chunks/_astro_content_BspSKymQ.mjs';
import { Y as YukinaConfig } from '../chunks/yukina.config_B6t72K7I.mjs';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const parser = new MarkdownIt();
function getExcerpt(content, maxLength = 200) {
  const html = parser.render(content);
  const plainText = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  });
  const cleaned = plainText.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  const truncated = cleaned.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf("。");
  const lastSpace = truncated.lastIndexOf(" ");
  let cutIndex = maxLength;
  if (lastPeriod > maxLength * 0.8) {
    cutIndex = lastPeriod + 1;
  } else if (lastSpace > maxLength * 0.8) {
    cutIndex = lastSpace;
  }
  return cleaned.substring(0, cutIndex) + "...";
}
async function GET(context) {
  const posts = await getCollection("posts");
  const sortedPosts = posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );
  return rss({
    title: YukinaConfig.title,
    description: YukinaConfig.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description || getExcerpt(post.body),
      pubDate: post.data.published,
      link: `/posts/${post.slug}/`,
      categories: [
        ...post.data.category ? [post.data.category] : [],
        ...post.data.tags || []
      ],
      author: YukinaConfig.username
    })),
    customData: `<language>${YukinaConfig.locale}</language>`,
    stylesheet: "/rss-styles.xsl"
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
