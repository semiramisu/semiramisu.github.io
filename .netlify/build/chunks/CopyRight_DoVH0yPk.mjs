import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, f as renderSlot, e as renderScript, a as renderTemplate, r as renderComponent } from './astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { i as i18n, a as $$Icon } from './MainLayout_D_1_3qA2.mjs';
import { Y as YukinaConfig, I as I18nKeys } from './yukina.config_B6t72K7I.mjs';
import { f as formatDate } from './date_i3ucgsdy.mjs';

const $$Astro$1 = createAstro("http://semiramisu.com/");
const $$Markdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Markdown;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`prose prose-sm lg:prose-base dark:prose-invert shrink max-w-full ${className ?? ""}`, "class")}> ${renderSlot($$result, $$slots["default"])} </div> ${renderScript($$result, "/Users/s26793/blog/semiramisu.github.io/src/components/Markdown.astro?astro&type=script&index=0&lang.ts")} <style>
  .btn-regular-dark {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: oklch(0.45 0.01 var(--hue));
  }

  .btn-regular-dark:hover {
    background-color: oklch(0.5 0.01 var(--hue));
  }

  .btn-regular-dark:active {
    background-color: oklch(0.55 0.01 var(--hue));
  }

  .btn-regular-dark.dark {
    background-color: oklch(0.3 0.02 var(--hue));
  }

  .btn-regular-dark.dark:hover {
    background-color: oklch(0.35 0.03 var(--hue));
  }

  .btn-regular-dark.dark:active {
    background-color: oklch(0.4 0.03 var(--hue));
  }

  .btn-regular-dark.success {
    background-color: oklch(0.75 0.14 var(--hue));
  }

  .btn-regular-dark.success.dark {
    background-color: oklch(0.75 0.14 var(--hue));
  }

  .copy-btn-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.3s;
    transform: translate(-50%, -50%);
  }

  .copy-btn .copy-icon {
    opacity: 1;
    fill: white;
  }

  .copy-btn .copy-icon.dark {
    fill: rgba(255, 255, 255, 0.75);
  }

  .copy-btn.success .copy-icon {
    opacity: 0;
  }

  .copy-btn .success-icon {
    fill: white;
    opacity: 0;
  }

  .copy-btn.success .success-icon {
    opacity: 1;
  }
</style>`;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/Markdown.astro", void 0);

const $$Astro = createAstro("http://semiramisu.com/");
const $$CopyRight = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CopyRight;
  const { title, published, license, author, sourceLink } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="fonts relative mt-4 h-32 w-full rounded-lg bg-gray-100 px-4 py-4 lg:h-36 dark:bg-[var(--background-color)]" data-astro-cid-er4ir5rx> <div class="absolute left-4 top-4 z-10 flex h-24 flex-col justify-between lg:h-28" data-astro-cid-er4ir5rx> <div class="flex flex-col items-start space-y-1" data-astro-cid-er4ir5rx> <p class="!my-0 pl-1 font-bold text-[var(--text-color)]" data-astro-cid-er4ir5rx>${title}</p> <a class="rounded-md px-1 py-0.5 text-sm transition-all hover:bg-[var(--primary-color-lighten)]"${addAttribute(sourceLink ? "source-link" : "post-url", "id")}${addAttribute(sourceLink ?? "", "href")} data-astro-cid-er4ir5rx>${sourceLink ?? ""}</a> </div> <div class="ml-1 flex flex-row space-x-4 lg:space-x-8" data-astro-cid-er4ir5rx> <div class="flex flex-col" data-astro-cid-er4ir5rx> <span class="select-none text-sm text-[var(--text-color-lighten)]" data-astro-cid-er4ir5rx>${i18n(I18nKeys.copy_right_author)}</span> <p class="!my-0 line-clamp-1 text-sm text-[var(--text-color)] lg:text-base" data-astro-cid-er4ir5rx> ${author ?? YukinaConfig.username} </p> </div> <div class="flex flex-col" data-astro-cid-er4ir5rx> <span class="select-none text-sm text-[var(--text-color-lighten)]" data-astro-cid-er4ir5rx>${i18n(I18nKeys.copy_right_publish_date)}</span> <p class="!my-0 line-clamp-1 text-sm text-[var(--text-color)] lg:text-base" data-astro-cid-er4ir5rx> ${formatDate(published, YukinaConfig.locale)} </p> </div> <div class="flex flex-col" data-astro-cid-er4ir5rx> <span class="select-none text-sm text-[var(--text-color-lighten)]" data-astro-cid-er4ir5rx>${i18n(I18nKeys.copy_right_license)}</span> <!-- with special license --> ${license && license.url && renderTemplate`<a class="line-clamp-1 text-sm text-[var(--text-color)] lg:text-base"${addAttribute(license.url, "href")} target="_blank" data-astro-cid-er4ir5rx> ${license.name} </a>`} ${license && !license.url && renderTemplate`<p class="!my-0 line-clamp-1 text-sm text-[var(--text-color)] lg:text-base" data-astro-cid-er4ir5rx> ${license.name} </p>`} <!-- without special license --> ${!license && renderTemplate`<a class="line-clamp-1 text-sm text-[var(--text-color)] lg:text-base"${addAttribute(YukinaConfig.license.url, "href")} target="_blank" data-astro-cid-er4ir5rx> ${YukinaConfig.license.name} </a>`} </div> </div> </div> <div class="relative right-0 top-1/2 z-0 flex h-32 -translate-y-1/2 overflow-hidden lg:h-36" data-astro-cid-er4ir5rx> ${renderComponent($$result, "Icon", $$Icon, { "name": "ooui:logo-cc", "size": 230, "class": "absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 dark:text-[var(--card-color)]", "data-astro-cid-er4ir5rx": true })} </div> </div> `;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/misc/CopyRight.astro", void 0);

export { $$Markdown as $, $$CopyRight as a };
