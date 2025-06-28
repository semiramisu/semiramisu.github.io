/* empty css                                  */
import { b as createAstro, c as createComponent, g as defineStyleVars, m as maybeRenderHead, d as addAttribute, e as renderScript, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { a as $$Icon, I as IdToSlug, g as GetCoverURLForUnspecifiedEntry, h as $$OptimizedImage, i as i18n, G as GetSortedPosts, j as GetAllTags, $ as $$MainLayout } from '../chunks/MainLayout_D_1_3qA2.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_ixuNTUny.mjs';
/* empty css                                 */
import 'clsx';
import { f as formatDate } from '../chunks/date_i3ucgsdy.mjs';
import { Y as YukinaConfig, I as I18nKeys } from '../chunks/yukina.config_B6t72K7I.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro$4 = createAstro("http://semiramisu.com/");
const $$AnimatedHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$AnimatedHeading;
  const { text, typingSpeed = 100, cursorDuration = 700 } = Astro2.props;
  const $$definedVars = defineStyleVars([{ typingSpeed, cursorDuration }]);
  return renderTemplate`${maybeRenderHead()}<div class="animated-heading" data-astro-cid-oiydkrgt${addAttribute($$definedVars, "style")}> <span class="typing-text"${addAttribute(text, "data-text")} data-astro-cid-oiydkrgt${addAttribute($$definedVars, "style")}></span> <span class="cursor" data-astro-cid-oiydkrgt${addAttribute($$definedVars, "style")}>|</span> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/AnimatedHeading.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/AnimatedHeading.astro", void 0);

const $$Astro$3 = createAstro("http://semiramisu.com/");
const $$FeaturedPostsCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$FeaturedPostsCarousel;
  const { posts, lang = "ja" } = Astro2.props;
  const langParam = lang === "en" ? "?lang=en" : "";
  function getExcerpt(body, maxLength = 150) {
    if (!body) return "";
    const plainText = body.replace(/^#+\s+/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/```[\s\S]*?```/g, "").replace(/^>\s+/gm, "").replace(/^[-*+]\s+/gm, "").replace(/\n{2,}/g, " ").replace(/\n/g, " ").trim();
    if (plainText.length <= maxLength) {
      return plainText;
    }
    const truncated = plainText.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf("\u3002");
    const lastSpace = truncated.lastIndexOf(" ");
    let cutIndex = maxLength;
    if (lastPeriod > maxLength * 0.8) {
      cutIndex = lastPeriod + 1;
    } else if (lastSpace > maxLength * 0.8) {
      cutIndex = lastSpace;
    }
    return plainText.substring(0, cutIndex) + "...";
  }
  return renderTemplate`${maybeRenderHead()}<div class="featured-carousel-container" data-astro-cid-5z55rg2g> <div class="controls" data-astro-cid-5z55rg2g> <button class="control-button prev" aria-label="Previous slide" data-astro-cid-5z55rg2g> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:chevron-left", "class": "control-icon", "data-astro-cid-5z55rg2g": true })} </button> <button class="control-button next" aria-label="Next slide" data-astro-cid-5z55rg2g> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:chevron-right", "class": "control-icon", "data-astro-cid-5z55rg2g": true })} </button> </div> <div class="carousel-track-container" data-astro-cid-5z55rg2g> <div class="carousel-track" data-astro-cid-5z55rg2g> ${posts.map((post, index) => {
    const entryID = IdToSlug(post.id);
    const contentUrl = `/posts/${entryID}${langParam}`;
    const excerpt = getExcerpt(post.body);
    return renderTemplate`<div class="carousel-slide" data-astro-cid-5z55rg2g> <a${addAttribute(contentUrl, "href")} class="slide-content" data-astro-cid-5z55rg2g> <div class="slide-image-container" data-astro-cid-5z55rg2g> ${renderComponent($$result, "OptimizedImage", $$OptimizedImage, { "class": "slide-image", "src": post.data.cover ?? GetCoverURLForUnspecifiedEntry(entryID), "alt": post.data.title, "width": 800, "height": 400, "loading": "lazy", "data-astro-cid-5z55rg2g": true })} <div class="slide-overlay" data-astro-cid-5z55rg2g> <div class="slide-meta" data-astro-cid-5z55rg2g> <span class="slide-date" data-astro-cid-5z55rg2g> ${renderComponent($$result, "Icon", $$Icon, { "name": "cuida:calendar-outline", "class": "slide-icon", "data-astro-cid-5z55rg2g": true })} ${formatDate(post.data.published, YukinaConfig.locale)} </span> ${post.data.category && renderTemplate`<span class="slide-category" data-astro-cid-5z55rg2g> ${renderComponent($$result, "Icon", $$Icon, { "name": "dashicons:category", "class": "slide-icon", "data-astro-cid-5z55rg2g": true })} ${post.data.category} </span>`} </div> <h3 class="slide-title" data-astro-cid-5z55rg2g>${post.data.title}</h3> ${post.data.description && renderTemplate`<p class="slide-description" data-astro-cid-5z55rg2g>${post.data.description}</p>`} ${excerpt && renderTemplate`<p class="slide-excerpt" data-astro-cid-5z55rg2g>${excerpt}</p>`} <div class="slide-read-more" data-astro-cid-5z55rg2g> <span data-astro-cid-5z55rg2g>${lang === "ja" ? "\u7D9A\u304D\u3092\u8AAD\u3080" : "Read More"}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "cuida:caret-right-outline", "class": "read-more-icon", "data-astro-cid-5z55rg2g": true })} </div> </div> </div> </a> </div>`;
  })} </div> </div> <div class="carousel-indicators" data-astro-cid-5z55rg2g> ${posts.map((_, index) => renderTemplate`<button${addAttribute(`indicator ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-index")}${addAttribute(`Go to slide ${index + 1}`, "aria-label")} data-astro-cid-5z55rg2g></button>`)} </div> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/FeaturedPostsCarousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/FeaturedPostsCarousel.astro", void 0);

const $$Astro$2 = createAstro("http://semiramisu.com/");
const $$TagCloud = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TagCloud;
  const { tags, maxTags = 30 } = Astro2.props;
  const displayTags = tags.slice(0, maxTags);
  const maxCount = Math.max(...displayTags.map((tag) => tag.posts.length));
  const minCount = Math.min(...displayTags.map((tag) => tag.posts.length));
  const getFontSize = (count) => {
    const minSize = 0.8;
    const maxSize = 1.8;
    const size = minCount === maxCount ? (minSize + maxSize) / 2 : minSize + (count - minCount) / (maxCount - minCount) * (maxSize - minSize);
    return `${size}rem`;
  };
  const getTagColor = (index) => {
    const hues = [
      "var(--primary-color)",
      "var(--primary-color-darken)",
      "var(--primary-color-lighten)"
    ];
    return hues[index % hues.length];
  };
  return renderTemplate`${maybeRenderHead()}<div class="tag-cloud" data-astro-cid-r33hqgtg> ${displayTags.map((tag, index) => renderTemplate`<a${addAttribute(tag.slug, "href")} class="tag-item"${addAttribute(`font-size: ${getFontSize(tag.posts.length)}; color: ${getTagColor(index)};`, "style")}${addAttribute(tag.posts.length, "data-posts")} data-astro-cid-r33hqgtg> <span class="tag-text" data-astro-cid-r33hqgtg>${tag.name}</span> <span class="tag-count" data-astro-cid-r33hqgtg>(${tag.posts.length})</span> </a>`)} </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/TagCloud.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/TagCloud.astro", void 0);

const $$SearchBar = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="search-container" data-astro-cid-cleixq6c> <div class="search-input-container" data-astro-cid-cleixq6c> <input type="text" id="search-input" class="search-input"${addAttribute(i18n(I18nKeys.nav_bar_search_placeholder), "placeholder")} aria-label="Search blog posts" data-astro-cid-cleixq6c> ${renderComponent($$result, "Icon", $$Icon, { "name": "line-md:search", "class": "search-icon", "data-astro-cid-cleixq6c": true })} </div> <div id="search-results" class="search-results" data-astro-cid-cleixq6c></div> </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/SearchBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/widgets/SearchBar.astro", void 0);

const $$Astro$1 = createAstro("http://semiramisu.com/");
const $$Archive = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Archive;
  const { posts, lang = "ja" } = Astro2.props;
  const langParam = lang === "en" ? "?lang=en" : "";
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.data.published).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
  const groupPostsByMonth = (posts2) => {
    const months = {};
    posts2.forEach((post) => {
      const date = new Date(post.data.published);
      const monthKey = lang === "ja" ? `${date.getMonth() + 1}\u6708` : `Month ${date.getMonth() + 1}`;
      if (!months[monthKey]) {
        months[monthKey] = [];
      }
      months[monthKey].push(post);
    });
    return months;
  };
  const groupPostsByWeek = (posts2) => {
    const weeks = {};
    posts2.forEach((post) => {
      const date = new Date(post.data.published);
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      const weekKey = `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()} - ${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`;
      if (!weeks[weekKey]) {
        weeks[weekKey] = [];
      }
      weeks[weekKey].push(post);
    });
    return weeks;
  };
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  return renderTemplate`${maybeRenderHead()}<div class="archive" data-astro-cid-pp7spb2p> <div class="archive-header" data-astro-cid-pp7spb2p> <h2 class="section-title mb-6" data-astro-cid-pp7spb2p>ARCHIVE</h2> <a href="/admin/dashboard" class="dashboard-link" data-astro-cid-pp7spb2p> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:chart-line", "class": "w-5 h-5", "data-astro-cid-pp7spb2p": true })} <span data-astro-cid-pp7spb2p>${lang === "ja" ? "\u7D71\u8A08\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9" : "Analytics Dashboard"}</span> </a> </div> ${years.map((year) => {
    const yearPosts = postsByYear[Number(year)];
    const monthGroups = groupPostsByMonth(yearPosts);
    const monthKeys = Object.keys(monthGroups).sort();
    return renderTemplate`<div class="year-group" data-astro-cid-pp7spb2p> <button class="year-button"${addAttribute(year, "data-year")} data-astro-cid-pp7spb2p> <span class="toggle-icon" data-astro-cid-pp7spb2p>▶</span> ${year} (${yearPosts.length})
</button> <div class="months hidden"${addAttribute(year, "data-year-content")} data-astro-cid-pp7spb2p> ${monthKeys.map((month) => {
      const monthPosts = monthGroups[month];
      const weekGroups = groupPostsByWeek(monthPosts);
      const weekKeys = Object.keys(weekGroups);
      return renderTemplate`<div class="month-group" data-astro-cid-pp7spb2p> <button class="month-button"${addAttribute(`${year}-${month}`, "data-month")} data-astro-cid-pp7spb2p> <span class="toggle-icon" data-astro-cid-pp7spb2p>▶</span> ${month} (${monthPosts.length})
</button> <div class="weeks hidden"${addAttribute(`${year}-${month}`, "data-month-content")} data-astro-cid-pp7spb2p> ${weekKeys.map((week) => renderTemplate`<div class="week-group" data-astro-cid-pp7spb2p> <button class="week-button"${addAttribute(`${year}-${month}-${week}`, "data-week")} data-astro-cid-pp7spb2p> <span class="toggle-icon" data-astro-cid-pp7spb2p>▶</span> ${week} (${weekGroups[week].length})
</button> <ul class="posts hidden"${addAttribute(`${year}-${month}-${week}`, "data-week-content")} data-astro-cid-pp7spb2p> ${weekGroups[week].map((post) => renderTemplate`<li data-astro-cid-pp7spb2p> <a${addAttribute(`/posts/${IdToSlug(post.id)}${langParam}`, "href")} class="post-link" data-astro-cid-pp7spb2p> ${post.data.title} </a> </li>`)} </ul> </div>`)} </div> </div>`;
    })} </div> </div>`;
  })} </div>  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/Archive.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/Archive.astro", void 0);

const $$Astro = createAstro("http://semiramisu.com/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const url = new URL(Astro2.request.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "ja";
  const allPosts = await GetSortedPosts(lang);
  const recentPosts = allPosts.slice(0, 6);
  const featuredPosts = allPosts.filter((post) => post.data.tags?.includes(lang === "ja" ? "\u4ED5\u4E8B" : "Work")).slice(0, 5);
  const allTags = await GetAllTags(lang);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "isHome": true, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="hero-section-simple mb-2" data-astro-cid-j7pv25f6> <div class="fade-in-up flex flex-col items-center justify-center space-y-4 text-center py-3" data-astro-cid-j7pv25f6> <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "AnimatedHeading", $$AnimatedHeading, { "text": lang === "ja" ? "\u3088\u3046\u3053\u305D\uFF01\u79C1\u306E\u30D6\u30ED\u30B0\u3078" : "Welcome to My Blog!", "data-astro-cid-j7pv25f6": true })} </h1> </div> </div> <div class="space-y-8" data-astro-cid-j7pv25f6> <!-- Featured Posts Carousel --> <section class="featured-posts" data-astro-cid-j7pv25f6> <h2 class="section-title mb-6" data-astro-cid-j7pv25f6>${i18n(I18nKeys.featured_posts)}</h2> ${renderComponent($$result2, "FeaturedPostsCarousel", $$FeaturedPostsCarousel, { "posts": featuredPosts, "lang": lang, "data-astro-cid-j7pv25f6": true })} </section> <!-- Recent Posts --> <section class="recent-posts" data-astro-cid-j7pv25f6> <h2 class="section-title mb-6" data-astro-cid-j7pv25f6>${i18n(I18nKeys.recent_posts)}</h2> <div class="posts-grid" data-astro-cid-j7pv25f6> ${recentPosts.map((entry, index) => renderTemplate`<div class="post-card-animation"${addAttribute(`animation-delay: calc(var(--onload-animation-delay) + ${index + 1} * var(--onload-animation-interval));`, "style")} data-astro-cid-j7pv25f6> ${renderComponent($$result2, "PostCard", $$PostCard, { "id": entry.id, "title": entry.data.title, "published": entry.data.published, "category": entry.data.category, "tags": entry.data.tags, "description": entry.data.description, "image": entry.data.cover, "readingMetadata": entry.rendered.metadata.frontmatter.readingMetadata, "lang": lang, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> <div class="mt-8 text-center" data-astro-cid-j7pv25f6> <a${addAttribute(`/all-posts${lang === "en" ? "?lang=en" : ""}`, "href")} class="inline-block py-2 px-6 rounded-full bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--primary-color-darken)] transition-all transform hover:scale-105" data-astro-cid-j7pv25f6> ${lang === "ja" ? "\u3059\u3079\u3066\u306E\u8A18\u4E8B\u3092\u898B\u308B" : "View All Posts"} </a> </div> </section> <!-- Tag Cloud --> <section class="tag-section" data-astro-cid-j7pv25f6> <h2 class="section-title mb-6" data-astro-cid-j7pv25f6>${i18n(I18nKeys.explore_tags)}</h2> ${renderComponent($$result2, "TagCloud", $$TagCloud, { "tags": allTags, "data-astro-cid-j7pv25f6": true })} </section> <!-- Archive Section --> <section class="archive-section" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Archive", $$Archive, { "posts": allPosts, "lang": lang, "data-astro-cid-j7pv25f6": true })} </section> <!-- Search Section --> <section class="search-section py-14 mt-14" data-astro-cid-j7pv25f6> <div class="search-container fade-in-up" data-astro-cid-j7pv25f6> <h2 class="section-title mb-4 text-center" data-astro-cid-j7pv25f6>${lang === "ja" ? "\u8A18\u4E8B\u3092\u691C\u7D22" : "Search Articles"}</h2> <p class="max-w-2xl text-lg text-[var(--text-color-lighten)] text-center mx-auto mb-6" data-astro-cid-j7pv25f6> ${lang === "ja" ? "\u65E5\u3005\u306E\u601D\u3044\u3084\u767A\u898B\u3001\u5B66\u3073\u3092\u5171\u6709\u3059\u308B\u5834\u6240\u3067\u3059\u3002\u304A\u697D\u3057\u307F\u304F\u3060\u3055\u3044\uFF01" : "A place to share daily thoughts, discoveries, and learnings. Enjoy!"} </p> <div class="w-full max-w-xl mx-auto px-4" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "SearchBar", $$SearchBar, { "data-astro-cid-j7pv25f6": true })} </div> </div> </section> </div> `, "head": ($$result2) => renderTemplate`<meta name="page-type" content="home">` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/index.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
