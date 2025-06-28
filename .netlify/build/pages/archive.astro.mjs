/* empty css                                  */
import { c as createComponent, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$PostArchiveLayout } from '../chunks/PostArchiveLayout_R8b_DbX3.mjs';
import { I as I18nKeys } from '../chunks/yukina.config_B6t72K7I.mjs';
import { c as GetArchives, i as i18n } from '../chunks/MainLayout_D_1_3qA2.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Archive = createComponent(async ($$result, $$props, $$slots) => {
  const archiveMap = await GetArchives();
  return renderTemplate`${renderComponent($$result, "PostArchiveLayout", $$PostArchiveLayout, { "archiveMap": archiveMap, "title": i18n(I18nKeys.pages_archive_archive) })}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/archive.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/archive.astro";
const $$url = "/archive";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Archive,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
