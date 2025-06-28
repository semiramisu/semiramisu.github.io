import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import YukinaConfig from "../../yukina.config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

function getExcerpt(content: string, maxLength: number = 200): string {
  // Markdownをプレーンテキストに変換
  const html = parser.render(content);
  const plainText = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  });
  
  // 改行と余分な空白を削除
  const cleaned = plainText
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // 指定文字数で切り取り
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // 文の区切りで自然に切る
  const truncated = cleaned.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('。');
  const lastSpace = truncated.lastIndexOf(' ');
  
  let cutIndex = maxLength;
  if (lastPeriod > maxLength * 0.8) {
    cutIndex = lastPeriod + 1;
  } else if (lastSpace > maxLength * 0.8) {
    cutIndex = lastSpace;
  }
  
  return cleaned.substring(0, cutIndex) + '...';
}

export async function GET(context: { site: string }) {
  const posts = await getCollection("posts");
  
  // 投稿を公開日順にソート（新しい順）
  const sortedPosts = posts.sort((a, b) => 
    b.data.published.getTime() - a.data.published.getTime()
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
        ...(post.data.category ? [post.data.category] : []),
        ...(post.data.tags || [])
      ],
      author: YukinaConfig.username,
    })),
    customData: `<language>${YukinaConfig.locale}</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
