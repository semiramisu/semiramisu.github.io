import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { SITE } from "../site.config";
import { getPublishedPosts } from "../utils/content";

const parser = new MarkdownIt();

/** Plain-text excerpt for posts without a description. */
function getExcerpt(content: string, maxLength = 200): string {
  const html = parser.render(content);
  const plain = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;

  const truncated = plain.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf("。");
  const cutIndex = lastPeriod > maxLength * 0.8 ? lastPeriod + 1 : maxLength;
  return plain.substring(0, cutIndex) + "...";
}

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || getExcerpt(post.body ?? ""),
      pubDate: post.data.published,
      // post.id, not post.slug — content-layer entries have no slug property
      link: `/posts/${post.id}/`,
      categories: [
        ...(post.data.category ? [post.data.category] : []),
        ...post.data.tags,
      ],
      author: SITE.author,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
