/* empty css                                  */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$ChipLayout } from '../chunks/ChipLayout_Dkc9_ArR.mjs';
import { I as I18nKeys } from '../chunks/yukina.config_B6t72K7I.mjs';
import { d as GetCategories, i as i18n } from '../chunks/MainLayout_D_1_3qA2.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const categories = [...(await GetCategories()).values()].sort();
  const chips = categories.map((category) => {
    return {
      name: category.name,
      slug: category.slug,
      subChip: category.posts.length.toString()
    };
  });
  return renderTemplate`${renderComponent($$result, "ChipLayout", $$ChipLayout, { "chips": chips, "title": i18n(I18nKeys.pages_categories_title) })}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/categories/index.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/categories/index.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
