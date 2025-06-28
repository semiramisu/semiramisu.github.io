import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from './MainLayout_D_1_3qA2.mjs';
/* empty css                         */

const $$Astro = createAstro("http://semiramisu.com/");
const $$ChipLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ChipLayout;
  const { chips, title, subTitle, bannerImage, slug } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Main", $$MainLayout, { "title": title, "subTitle": subTitle, "bannerImage": bannerImage, "slug": slug, "isHome": false, "data-astro-cid-xekwhzyf": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col rounded-2xl bg-[var(--card-color)] p-6" data-astro-cid-xekwhzyf> <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3" data-astro-cid-xekwhzyf> ${chips.map((chip) => renderTemplate`<a${addAttribute(chip.slug, "href")} class="chip flex select-none flex-row items-center justify-between rounded-lg px-4 py-2 transition-all hover:bg-[var(--primary-color-lighten)]" data-astro-cid-xekwhzyf> <p class="chip-name truncate pl-0 text-lg text-[var(--text-color)] transition-all" data-astro-cid-xekwhzyf> ${chip.name} </p> ${chip.subChip && renderTemplate`<span class="ml-2 rounded-md bg-[var(--primary-color-lighten)] px-3 py-1 text-[var(--primary-color)]" data-astro-cid-xekwhzyf> ${chip.subChip} </span>`} </a>`)} </div> </div> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/layouts/ChipLayout.astro", void 0);

export { $$ChipLayout as $ };
