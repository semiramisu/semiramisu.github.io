/* empty css                                  */
import { b as createAstro, c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { G as GetSortedPosts, b as GetAllCategories, $ as $$MainLayout } from '../chunks/MainLayout_D_1_3qA2.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_ixuNTUny.mjs';
/* empty css                                     */
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro = createAstro("http://semiramisu.com/");
const $$AllPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AllPosts;
  const url = new URL(Astro2.request.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "ja";
  const allPosts = await GetSortedPosts(lang);
  const allCategories = await GetAllCategories(lang);
  const initialCategoryCount = 10;
  const hasMoreCategories = allCategories.length > initialCategoryCount;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": lang === "ja" ? "\u3059\u3079\u3066\u306E\u8A18\u4E8B" : "All Posts", "data-astro-cid-2c34sfy7": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-container" data-astro-cid-2c34sfy7> <h1 class="page-title" data-astro-cid-2c34sfy7>${lang === "ja" ? "\u3059\u3079\u3066\u306E\u8A18\u4E8B" : "All Posts"}</h1> <div class="categories-container" data-astro-cid-2c34sfy7> <div class="categories-filter" id="categories-filter" data-astro-cid-2c34sfy7> <a${addAttribute(`/all-posts${lang === "en" ? "?lang=en" : ""}`, "href")} class="category-pill active" data-astro-cid-2c34sfy7>${lang === "ja" ? "\u3059\u3079\u3066" : "All"}</a> ${allCategories.map((category, index) => renderTemplate`<a${addAttribute(`/all-posts?category=${encodeURIComponent(category.name)}${lang === "en" ? "&lang=en" : ""}`, "href")}${addAttribute(`category-pill ${index >= initialCategoryCount ? "hidden-category" : ""}`, "class")} data-astro-cid-2c34sfy7> ${category.name} </a>`)} </div> ${hasMoreCategories && renderTemplate`<div class="text-center mt-3" data-astro-cid-2c34sfy7> <button id="show-more-categories" class="show-more-button" data-astro-cid-2c34sfy7> ${lang === "ja" ? "\u3082\u3063\u3068\u898B\u308B" : "Show more"} <span class="arrow-down" data-astro-cid-2c34sfy7>▼</span> </button> </div>`} </div> <div class="posts-grid" data-astro-cid-2c34sfy7> ${allPosts.map((entry, index) => renderTemplate`<div class="post-card-animation"${addAttribute(`animation-delay: calc(var(--onload-animation-delay) + ${index % 12 + 1} * var(--onload-animation-interval));`, "style")}${addAttribute(entry.data.category || "", "data-category")} data-astro-cid-2c34sfy7> ${renderComponent($$result2, "PostCard", $$PostCard, { "id": entry.id, "title": entry.data.title, "published": entry.data.published, "category": entry.data.category, "tags": entry.data.tags, "description": entry.data.description, "image": entry.data.cover, "readingMetadata": entry.rendered.metadata.frontmatter.readingMetadata, "lang": lang, "data-astro-cid-2c34sfy7": true })} </div>`)} </div> </div> ` })}  ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/pages/all-posts.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/all-posts.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/all-posts.astro";
const $$url = "/all-posts";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AllPosts,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
