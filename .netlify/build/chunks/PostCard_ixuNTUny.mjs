import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, a as renderTemplate } from './astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { I as IdToSlug, g as GetCoverURLForUnspecifiedEntry, i as i18n, k as $$ResponsiveImage, a as $$Icon } from './MainLayout_D_1_3qA2.mjs';
import { Y as YukinaConfig, I as I18nKeys } from './yukina.config_B6t72K7I.mjs';
import { f as formatDate } from './date_i3ucgsdy.mjs';
/* empty css                          */

const $$Astro = createAstro("http://semiramisu.com/");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostCard;
  const props = Astro2.props;
  const baseUrl = props.id.startsWith("/") ? props.id : `/posts/${IdToSlug(props.id)}`;
  const langParam = props.lang === "en" ? "?lang=en" : "";
  const contentUrl = `${baseUrl}${langParam}`;
  const entryID = props.id.startsWith("/") ? props.id.split("/").pop() : IdToSlug(props.id);
  const { time = 0, wordCount = 0 } = props.readingMetadata ?? { time: 0, wordCount: 0 };
  const imageUrl = props.image ?? GetCoverURLForUnspecifiedEntry(entryID);
  imageUrl.startsWith("http");
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col rounded-3xl bg-[var(--card-color)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full" data-astro-cid-iyiqi2so> <a${addAttribute(contentUrl, "href")} class="relative h-[200px] transition-all hover:brightness-90" data-astro-cid-iyiqi2so> ${renderComponent($$result, "ResponsiveImage", $$ResponsiveImage, { "class": "absolute left-0 top-0 h-full w-full object-cover", "src": imageUrl, "alt": "CoverPost", "width": 400, "height": 200, "data-astro-cid-iyiqi2so": true })} <div class="absolute bottom-2 w-full" data-astro-cid-iyiqi2so> <div class="mx-2 flex flex-row justify-between" data-astro-cid-iyiqi2so> <div class="flex flex-row items-center space-x-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[var(--primary-color-lighten)] dark:text-[var(--text-color)]" data-astro-cid-iyiqi2so> ${renderComponent($$result, "Icon", $$Icon, { "name": "cuida:calendar-outline", "data-astro-cid-iyiqi2so": true })} <span class="select-none" data-astro-cid-iyiqi2so> ${formatDate(props.published, YukinaConfig.locale)} </span> </div> ${props.category && renderTemplate`<div class="flex flex-row items-center space-x-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[var(--primary-color-lighten)] dark:text-[var(--text-color)]" data-astro-cid-iyiqi2so> ${renderComponent($$result, "Icon", $$Icon, { "name": "dashicons:category", "data-astro-cid-iyiqi2so": true })} <span class="max-w-28 select-none truncate" data-astro-cid-iyiqi2so> ${props.category} </span> </div>`} </div> </div> </a> <div class="flex flex-col h-auto min-h-[150px] p-5 flex-grow" data-astro-cid-iyiqi2so> <div class="flex w-full flex-row items-center mb-3" data-astro-cid-iyiqi2so> <div class="mr-2 h-5 w-1 rounded-lg bg-[var(--primary-color)]" data-astro-cid-iyiqi2so></div> <a${addAttribute(contentUrl, "href")} class="title" data-astro-cid-iyiqi2so> <p class="line-clamp-2" data-astro-cid-iyiqi2so>${props.title}</p> ${renderComponent($$result, "Icon", $$Icon, { "name": "cuida:caret-right-outline", "class": "translate-y-[0.07rem] text-[var(--primary-color)]", "data-astro-cid-iyiqi2so": true })} </a> </div> <div data-astro-cid-iyiqi2so> <p class="desc" data-astro-cid-iyiqi2so>${props.description}</p> </div> <div class="mt-auto pt-3" data-astro-cid-iyiqi2so> <div class="select-none" data-astro-cid-iyiqi2so> <div class="reading-time" data-astro-cid-iyiqi2so> <span data-astro-cid-iyiqi2so> ${wordCount} ${i18n(I18nKeys.post_card_words)} </span> <span data-astro-cid-iyiqi2so>|</span> <span data-astro-cid-iyiqi2so> ${time} ${i18n(I18nKeys.post_card_minutes)} </span> </div> </div> </div> </div> </div> `;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/PostCard.astro", void 0);

export { $$PostCard as $ };
