/* empty css                                  */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { g as getEntry, r as renderEntry } from '../chunks/_astro_content_BspSKymQ.mjs';
import { $ as $$MainLayout } from '../chunks/MainLayout_D_1_3qA2.mjs';
import { $ as $$Markdown, a as $$CopyRight } from '../chunks/CopyRight_DoVH0yPk.mjs';
/* empty css                                 */
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro = createAstro("http://semiramisu.com/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const aboutPost = await getEntry("specs", "about");
  const { Content } = await renderEntry(aboutPost);
  const { title, subTitle, bannerImage, published } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "subTitle": subTitle, "bannerImage": bannerImage, "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="article-wrapper" data-astro-cid-kh7btl4r> <div class="article" data-astro-cid-kh7btl4r> ${renderComponent($$result2, "Markdown", $$Markdown, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Content", Content, { "data-astro-cid-kh7btl4r": true })} ` })} ${published && title && renderTemplate`${renderComponent($$result2, "CopyRight", $$CopyRight, { "title": title, "published": published, "data-astro-cid-kh7btl4r": true })}`} </div> </div> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/about.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
