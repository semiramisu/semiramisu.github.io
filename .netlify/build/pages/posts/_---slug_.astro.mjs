/* empty css                                     */
import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, e as renderScript, d as addAttribute, a as renderTemplate, F as Fragment, f as renderSlot } from '../../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { a as getCollection, r as renderEntry } from '../../chunks/_astro_content_BspSKymQ.mjs';
import { a as $$Icon, I as IdToSlug, $ as $$MainLayout, e as $$StructuredData } from '../../chunks/MainLayout_D_1_3qA2.mjs';
import { $ as $$Markdown, a as $$CopyRight } from '../../chunks/CopyRight_DoVH0yPk.mjs';
/* empty css                                     */
import 'clsx';
import { $ as $$PostCard } from '../../chunks/PostCard_ixuNTUny.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro$6 = createAstro("http://semiramisu.com/");
const $$EnhancedTableOfContents = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$EnhancedTableOfContents;
  const { headings = [] } = Astro2.props;
  function buildHeadingTree(headings2) {
    const tree = [];
    const stack = [];
    headings2.forEach((heading) => {
      const item = {
        ...heading,
        children: []
      };
      while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
        stack.pop();
      }
      if (stack.length === 0) {
        tree.push(item);
      } else {
        stack[stack.length - 1].children.push(item);
      }
      stack.push(item);
    });
    return tree;
  }
  const headingTree = buildHeadingTree(headings);
  return renderTemplate`${maybeRenderHead()}<div class="enhanced-toc-container" data-astro-cid-iawnbpmg> <div class="toc-header" data-astro-cid-iawnbpmg> <h2 data-astro-cid-iawnbpmg>目次</h2> <button class="toc-toggle" aria-label="目次を折りたたむ" data-astro-cid-iawnbpmg> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:chevron-down", "class": "toggle-icon", "data-astro-cid-iawnbpmg": true })} </button> </div> <div class="reading-progress-bar" data-astro-cid-iawnbpmg> <div class="progress-fill" data-astro-cid-iawnbpmg></div> </div> ${headings.length > 0 ? renderTemplate`<nav class="toc-content" aria-label="目次" data-astro-cid-iawnbpmg> <ul class="toc-list" data-astro-cid-iawnbpmg> ${headingTree.map((heading) => renderTemplate`<li${addAttribute(`toc-item depth-${heading.depth}`, "class")} data-astro-cid-iawnbpmg> <a${addAttribute(`#${heading.slug}`, "href")} class="toc-link"${addAttribute(heading.slug, "data-slug")}${addAttribute(heading.depth, "data-depth")} data-astro-cid-iawnbpmg> <span class="toc-text" data-astro-cid-iawnbpmg>${heading.text}</span> <span class="toc-progress" data-astro-cid-iawnbpmg></span> </a> ${heading.children.length > 0 && renderTemplate`<button class="toc-collapse-btn" aria-label="サブセクションを展開" data-expanded="true" data-astro-cid-iawnbpmg> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:chevron-right", "class": "collapse-icon", "data-astro-cid-iawnbpmg": true })} </button>`} ${heading.children.length > 0 && renderTemplate`<ul class="toc-sublist" data-astro-cid-iawnbpmg> ${heading.children.map((child) => renderTemplate`<li${addAttribute(`toc-item depth-${child.depth}`, "class")} data-astro-cid-iawnbpmg> <a${addAttribute(`#${child.slug}`, "href")} class="toc-link"${addAttribute(child.slug, "data-slug")}${addAttribute(child.depth, "data-depth")} data-astro-cid-iawnbpmg> <span class="toc-text" data-astro-cid-iawnbpmg>${child.text}</span> <span class="toc-progress" data-astro-cid-iawnbpmg></span> </a> </li>`)} </ul>`} </li>`)} </ul> </nav>` : renderTemplate`<p class="toc-empty" data-astro-cid-iawnbpmg>この記事には目次がありません</p>`} <!-- モバイル用フローティングボタン --> <button class="toc-mobile-toggle" aria-label="目次を表示" data-astro-cid-iawnbpmg> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:list-3", "data-astro-cid-iawnbpmg": true })} </button> </div> <!-- モバイル用目次モーダル --> <div class="toc-mobile-modal" data-astro-cid-iawnbpmg> <div class="modal-backdrop" data-astro-cid-iawnbpmg></div> <div class="modal-content" data-astro-cid-iawnbpmg> <div class="modal-header" data-astro-cid-iawnbpmg> <h3 data-astro-cid-iawnbpmg>目次</h3> <button class="modal-close" aria-label="閉じる" data-astro-cid-iawnbpmg> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:close", "data-astro-cid-iawnbpmg": true })} </button> </div> <div class="modal-body" data-astro-cid-iawnbpmg> <!-- 目次の内容がここに動的に挿入されます --> </div> </div> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/EnhancedTableOfContents.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/EnhancedTableOfContents.astro", void 0);

const $$Astro$5 = createAstro("http://semiramisu.com/");
const $$ReadingProgress = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$ReadingProgress;
  return renderTemplate`${maybeRenderHead()}<div id="reading-progress" class="reading-progress-container" data-astro-cid-mu6cnre2> <div class="reading-progress-bar" data-astro-cid-mu6cnre2></div> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/ReadingProgress.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/ReadingProgress.astro", void 0);

const $$Astro$4 = createAstro("http://semiramisu.com/");
const $$ShareButtons = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ShareButtons;
  const { title, url, description = "" } = Astro2.props;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    hatena: `https://b.hatena.ne.jp/entry/${encodedUrl}`,
    pocket: `https://getpocket.com/save?url=${encodedUrl}&title=${encodedTitle}`
  };
  return renderTemplate`${maybeRenderHead()}<div class="share-buttons" data-astro-cid-zllr3mxm> <span class="share-label" data-astro-cid-zllr3mxm>この記事をシェア</span> <div class="share-buttons-list" data-astro-cid-zllr3mxm> <a${addAttribute(shareUrls.twitter, "href")} target="_blank" rel="noopener noreferrer" class="share-button twitter" aria-label="Xでシェア" title="Xでシェア" data-astro-cid-zllr3mxm> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:twitter-x", "data-astro-cid-zllr3mxm": true })} </a> <a${addAttribute(shareUrls.facebook, "href")} target="_blank" rel="noopener noreferrer" class="share-button facebook" aria-label="Facebookでシェア" title="Facebookでシェア" data-astro-cid-zllr3mxm> <svg class="facebook-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-zllr3mxm> <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" data-astro-cid-zllr3mxm></path> </svg> </a> <a${addAttribute(shareUrls.line, "href")} target="_blank" rel="noopener noreferrer" class="share-button line" aria-label="LINEでシェア" title="LINEでシェア" data-astro-cid-zllr3mxm> <svg class="line-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-zllr3mxm> <path fill="currentColor" d="M19.365 9.863c.349 0 .63.285.63.631c0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63c0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63c0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596c-.064.021-.133.031-.199.031c-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629c-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595c.06-.023.136-.033.194-.033c.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63c.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63c.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63c.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63c0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608c.391.082.923.258 1.058.59c.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645c1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" data-astro-cid-zllr3mxm></path> </svg> </a> <a${addAttribute(shareUrls.hatena, "href")} target="_blank" rel="noopener noreferrer" class="share-button hatena" aria-label="はてなブックマークに追加" title="はてなブックマークに追加" data-astro-cid-zllr3mxm> <svg class="hatena-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-zllr3mxm> <path d="M20.47 0C22.42 0 24 1.58 24 3.53v16.94c0 1.95-1.58 3.53-3.53 3.53H3.53C1.58 24 0 22.42 0 20.47V3.53C0 1.58 1.58 0 3.53 0h16.94zM8.88 17.9a5.42 5.42 0 0 1-2.36-.52c-.72-.34-1.29-.8-1.7-1.39-.42-.58-.7-1.24-.85-1.99-.15-.74-.23-1.52-.23-2.32 0-.83.09-1.6.25-2.31.17-.71.44-1.33.82-1.86.38-.52.88-.94 1.5-1.24.63-.3 1.39-.45 2.3-.45.78 0 1.44.1 1.97.29.54.19.96.44 1.28.74.31.3.54.63.68.98.13.36.2.7.2 1.03 0 .42-.13.78-.37 1.08-.25.3-.59.44-1.03.44-.4 0-.73-.1-.98-.33-.25-.22-.44-.53-.58-.93a2.46 2.46 0 0 0-.28-.63.87.87 0 0 0-.4-.34 1.75 1.75 0 0 0-.65-.1c-.43 0-.77.1-1.01.3-.25.2-.45.48-.6.82-.14.34-.24.73-.3 1.17-.05.44-.07.89-.07 1.35 0 .49.02.96.08 1.4.05.45.15.84.28 1.19.13.35.33.63.58.84.25.2.58.31 1.02.31.5 0 .89-.2 1.17-.6.27-.4.44-.95.5-1.65.02-.33.12-.6.28-.78.16-.18.46-.28.89-.28.36 0 .65.1.86.3.22.2.32.52.32.94 0 .42-.1.87-.28 1.34-.18.47-.47.9-.86 1.3-.4.38-.9.7-1.53.95-.62.25-1.39.37-2.29.37zm7.3.1c-.56 0-1-.18-1.34-.56-.33-.37-.5-.88-.5-1.52V8.29c0-.64.17-1.15.5-1.52.33-.37.78-.56 1.34-.56.55 0 1 .19 1.33.56.34.37.5.88.5 1.52v7.63c0 .64-.16 1.15-.5 1.52-.33.38-.78.56-1.33.56zm0-10.82c-.43 0-.8-.14-1.08-.41a1.33 1.33 0 0 1-.43-1c0-.39.14-.72.43-1 .29-.27.65-.41 1.08-.41.44 0 .8.14 1.08.41.29.28.43.61.43 1s-.14.73-.43 1c-.28.27-.64.41-1.08.41z" data-astro-cid-zllr3mxm></path> </svg> </a> <a${addAttribute(shareUrls.pocket, "href")} target="_blank" rel="noopener noreferrer" class="share-button pocket" aria-label="Pocketに保存" title="Pocketに保存" data-astro-cid-zllr3mxm> <svg class="pocket-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-zllr3mxm> <path fill="currentColor" d="M18.813 10.259l-5.646 5.419a1.649 1.649 0 0 1-2.282 0l-5.646-5.419a1.645 1.645 0 0 1 2.276-2.376l4.511 4.322l4.517-4.322a1.643 1.643 0 0 1 2.326.049a1.64 1.64 0 0 1-.045 2.326l-.011.001zm3.93-7.48C22.178 1.109 20.486 0 18.596 0H5.406C3.516 0 1.824 1.109 1.26 2.778A4.748 4.748 0 0 0 .906 4.44v7.124c0 3.522 1.91 6.779 5.003 8.505a11.946 11.946 0 0 0 6.093 1.663a11.981 11.981 0 0 0 5.13-1.15a11.903 11.903 0 0 0 1.03-.535c3.032-1.754 4.932-5.009 4.932-8.483V4.44a4.75 4.75 0 0 0-.354-1.661h.003z" data-astro-cid-zllr3mxm></path> </svg> </a> <button class="share-button copy-link" aria-label="リンクをコピー" title="リンクをコピー"${addAttribute(url, "data-url")} data-astro-cid-zllr3mxm> <svg class="link-icon" viewBox="0 0 24 24" width="20" height="20" data-astro-cid-zllr3mxm> <path fill="currentColor" d="M11 17H7q-2.075 0-3.537-1.463T2 12q0-2.075 1.463-3.537T7 7h4v2H7q-1.25 0-2.125.875T4 12q0 1.25.875 2.125T7 15h4zm-3-4v-2h8v2zm5 4v-2h4q1.25 0 2.125-.875T20 12q0-1.25-.875-2.125T17 9h-4V7h4q2.075 0 3.537 1.463T22 12q0 2.075-1.463 3.537T17 17z" data-astro-cid-zllr3mxm></path> </svg> </button> </div> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/ShareButtons.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/ShareButtons.astro", void 0);

const $$Astro$3 = createAstro("http://semiramisu.com/");
const $$RelatedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$RelatedPosts;
  const { currentPost, maxPosts = 3, isCompact = false } = Astro2.props;
  const allPosts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const otherPosts = allPosts.filter((post) => post.id !== currentPost.id).sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
  function calculateRelevanceScore(post) {
    let score = 0;
    if (post.data.category === currentPost.data.category && currentPost.data.category) {
      score += 3;
    }
    if (post.data.tags && currentPost.data.tags) {
      const commonTags = post.data.tags.filter((tag) => {
        return currentPost.data.tags?.includes(tag);
      });
      score += commonTags.length * 2;
    }
    const oneYearAgo = /* @__PURE__ */ new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    if (post.data.published > oneYearAgo) {
      score += 1;
    }
    return score;
  }
  const relatedPosts = otherPosts.map((post) => ({ post, score: calculateRelevanceScore(post) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, maxPosts).map((item) => item.post);
  const finalPosts = relatedPosts.length < maxPosts ? [...relatedPosts, ...otherPosts.slice(0, maxPosts - relatedPosts.length)] : relatedPosts;
  return renderTemplate`${finalPosts.length > 0 && renderTemplate`${maybeRenderHead()}<div${addAttribute(`related-posts ${isCompact ? "compact" : ""}`, "class")} data-astro-cid-dpgbfi7r><h2 class="related-posts-title" data-astro-cid-dpgbfi7r>関連記事</h2>${isCompact ? renderTemplate`<div class="related-posts-list" data-astro-cid-dpgbfi7r>${finalPosts.map((post) => renderTemplate`<a${addAttribute(`/posts/${IdToSlug(post.id)}/`, "href")} class="related-post-item" data-astro-cid-dpgbfi7r><div class="related-post-content" data-astro-cid-dpgbfi7r><h3 class="related-post-title" data-astro-cid-dpgbfi7r>${post.data.title}</h3><div class="related-post-meta" data-astro-cid-dpgbfi7r><time data-astro-cid-dpgbfi7r>${new Date(post.data.published).toLocaleDateString("ja-JP")}</time>${post.data.category && renderTemplate`<span class="related-post-category" data-astro-cid-dpgbfi7r>${post.data.category}</span>`}</div>${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="related-post-tags" data-astro-cid-dpgbfi7r>${post.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="related-post-tag" data-astro-cid-dpgbfi7r>${tag}</span>`)}</div>`}</div></a>`)}</div>` : renderTemplate`<div class="related-posts-grid" data-astro-cid-dpgbfi7r>${finalPosts.map((post) => {
    const bodyText = post.body || "";
    const japaneseCharCount = (bodyText.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
    const englishWords = bodyText.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, " ").split(/\s+/).filter((word) => word.length > 0);
    const wordCount = japaneseCharCount + englishWords.length;
    const japaneseReadingTime = japaneseCharCount / 400;
    const englishReadingTime = englishWords.length / 200;
    const time = Math.max(1, Math.ceil(japaneseReadingTime + englishReadingTime));
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "id": post.id, "title": post.data.title, "published": post.data.published, "category": post.data.category, "tags": post.data.tags, "description": post.data.description, "image": post.data.cover, "readingMetadata": { time, wordCount }, "data-astro-cid-dpgbfi7r": true })}`;
  })}</div>`}</div>`}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/RelatedPosts.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro("http://semiramisu.com/");
const $$Comments = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Comments;
  const { lang = "ja" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div class="comments-container" data-astro-cid-jvxsf75u> <h2 class="comments-title" data-astro-cid-jvxsf75u>\u30B3\u30E1\u30F3\u30C8</h2> <div class="giscus" data-astro-cid-jvxsf75u></div> </div> <script src="https://giscus.app/client.js" data-repo="semiramisu/semiramisu.github.io" data-repo-id="R_kgDOOD4A8A" data-category="Announcements" data-category-id="DIC_kwDOOD4A8M4CsJLk" data-mapping="pathname" data-strict="0" data-reactions-enabled="1" data-emit-metadata="0" data-input-position="top" data-theme="preferred_color_scheme" data-lang="ja" data-loading="lazy" crossorigin="anonymous" async>\n<\/script>  ', ""])), maybeRenderHead(), renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/Comments.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/s26793/blog/semiramisu.github.io/src/components/Comments.astro", void 0);

const $$Astro$1 = createAstro("http://semiramisu.com/");
const $$PostLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostLayout;
  const {
    title,
    subTitle,
    bannerImage,
    published,
    license,
    author,
    sourceLink,
    headings = [],
    slug,
    currentPost,
    wordCount,
    readingTime
  } = Astro2.props;
  const siteUrl = Astro2.site?.toString() || "";
  const postUrl = slug ? `${siteUrl}posts/${slug}/` : Astro2.url.toString();
  const breadcrumbs = [
    { name: "\u30DB\u30FC\u30E0", url: "/" },
    { name: "\u30D6\u30ED\u30B0", url: "/all-posts" },
    { name: title || "Post", url: postUrl }
  ];
  return renderTemplate`${renderComponent($$result, "Main", $$MainLayout, { "title": title, "subTitle": subTitle, "bannerImage": bannerImage, "isHome": false }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ReadingProgress", $$ReadingProgress, {})} ${maybeRenderHead()}<div id="post-content-wrapper" class="post-content-wrapper"> <article id="post-article" class="post-article"> <div class="article-inner"> ${renderComponent($$result2, "Markdown", $$Markdown, {}, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["default"])} ` })} ${title && slug && renderTemplate`<div class="post-actions"> ${renderComponent($$result2, "ShareButtons", $$ShareButtons, { "title": title, "url": postUrl, "description": subTitle })} </div>`} ${published && title && renderTemplate`${renderComponent($$result2, "CopyRight", $$CopyRight, { "title": title, "published": published, "license": license, "author": author, "sourceLink": sourceLink })}`} ${renderComponent($$result2, "Comments", $$Comments, { "lang": "ja" })} </div> </article> <aside id="post-toc" class="post-toc"> ${renderComponent($$result2, "EnhancedTableOfContents", $$EnhancedTableOfContents, { "headings": headings })} ${currentPost && renderTemplate`<div class="related-posts-sidebar"> ${renderComponent($$result2, "RelatedPosts", $$RelatedPosts, { "currentPost": currentPost, "maxPosts": 3, "isCompact": true })} </div>`} </aside> </div> `, "head": ($$result2) => renderTemplate`${currentPost && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "StructuredData", $$StructuredData, { "type": "article", "post": currentPost, "breadcrumbs": breadcrumbs, "wordCount": wordCount, "readingTime": readingTime })} ` })}`}` })}  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/layouts/PostLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/layouts/PostLayout.astro", void 0);

const $$Astro = createAstro("http://semiramisu.com/");
async function getStaticPaths() {
  const postEntries = await getCollection("posts");
  return postEntries.map((entry) => ({
    params: { slug: IdToSlug(entry.id) },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content, headings } = await renderEntry(entry);
  const slug = IdToSlug(entry.id);
  return renderTemplate`${!entry.data.licenseName && renderTemplate`${renderComponent($$result, "PostLayout", $$PostLayout, { "title": entry.data.title, "subTitle": entry.data.description, "bannerImage": entry.data.cover, "published": entry.data.published, "headings": headings, "slug": slug, "currentPost": entry }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="hidden" data-pagefind-body data-pagefind-weight="10" data-pagefind-meta="title">${entry.data.title}</div><div data-pagefind-body>${renderComponent($$result2, "Content", Content, {})}</div>` })}`}${entry.data.licenseName && renderTemplate`${renderComponent($$result, "PostLayout", $$PostLayout, { "title": entry.data.title, "subTitle": entry.data.description, "bannerImage": entry.data.cover, "published": entry.data.published, "license": { name: entry.data.licenseName, url: entry.data.licenseUrl }, "author": entry.data.author, "sourceLink": entry.data.sourceLink, "headings": headings, "slug": slug, "currentPost": entry }, { "default": ($$result2) => renderTemplate`<div class="hidden" data-pagefind-body data-pagefind-weight="10" data-pagefind-meta="title">${entry.data.title}</div><div data-pagefind-body>${renderComponent($$result2, "Content", Content, {})}</div>` })}`}<!-- <Fragment set:html={tocHTMLString} /> -->`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/posts/[...slug].astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/posts/[...slug].astro";
const $$url = "/posts/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
