/* empty css                                     */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$PostArchiveLayout } from '../../chunks/PostArchiveLayout_R8b_DbX3.mjs';
import { I as I18nKeys } from '../../chunks/yukina.config_B6t72K7I.mjs';
import { d as GetCategories, i as i18n } from '../../chunks/MainLayout_D_1_3qA2.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro = createAstro("http://semiramisu.com/");
async function getStaticPaths() {
  const categories = await GetCategories();
  const categoryList = Array.from(categories.keys());
  return categoryList.map((category) => ({
    params: { category }
  }));
}
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const categories = await GetCategories();
  const { category } = Astro2.params;
  async function FormatArchiveMap() {
    const posts = categories.get(category).posts;
    const categoryName2 = categories.get(category).name;
    const archiveMap2 = /* @__PURE__ */ new Map();
    posts.forEach((post) => {
      const year = post.date.getFullYear();
      if (archiveMap2.has(year)) archiveMap2.get(year).push(post);
      else archiveMap2.set(year, [post]);
    });
    return { archiveMap: archiveMap2, categoryName: categoryName2 };
  }
  const { archiveMap, categoryName } = await FormatArchiveMap();
  return renderTemplate`${renderComponent($$result, "PostArchiveLayout", $$PostArchiveLayout, { "archiveMap": archiveMap, "title": categoryName, "subTitle": i18n(I18nKeys.pages_categories_archive) })}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/categories/[category].astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/categories/[category].astro";
const $$url = "/categories/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
