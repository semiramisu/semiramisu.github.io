import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { i as i18n, $ as $$MainLayout, a as $$Icon } from './MainLayout_D_1_3qA2.mjs';
import { $ as $$PostCard } from './PostCard_ixuNTUny.mjs';
import { I as I18nKeys } from './yukina.config_B6t72K7I.mjs';
/* empty css                           */

const $$Astro = createAstro("http://semiramisu.com/");
const $$PostArchiveLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostArchiveLayout;
  const { archiveMap, title } = Astro2.props;
  const allPosts = [...archiveMap.values()].flat();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title || i18n(I18nKeys.pages_archive_archive), "isHome": false, "data-astro-cid-rosbtmqz": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="archives" data-astro-cid-rosbtmqz> <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[var(--border-color)]" data-astro-cid-rosbtmqz> <div class="flex items-center space-x-2 mb-4 sm:mb-0" data-astro-cid-rosbtmqz> <span class="text-3xl font-bold text-[var(--text-color)]" data-astro-cid-rosbtmqz> ${title || i18n(I18nKeys.pages_archive_archive)} </span> <span class="text-xl text-[var(--text-color-lighten)]" data-astro-cid-rosbtmqz>
(${allPosts.length} 記事)
</span> </div> <a href="/admin/dashboard" class="dashboard-link inline-flex items-center gap-2" data-astro-cid-rosbtmqz> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:chart-line", "class": "w-5 h-5", "data-astro-cid-rosbtmqz": true })} <span data-astro-cid-rosbtmqz>統計ダッシュボード</span> </a> </div> <div class="posts-grid" data-astro-cid-rosbtmqz> ${allPosts.map((post, index) => renderTemplate`<div class="post-card-animation"${addAttribute(`animation-delay: calc(var(--onload-animation-delay) + ${index + 1} * var(--onload-animation-interval));`, "style")} data-astro-cid-rosbtmqz> ${renderComponent($$result2, "PostCard", $$PostCard, { "id": post.id, "title": post.title, "published": post.date, "tags": post.tags, "description": post.description, "image": post.cover, "readingMetadata": post.readingMetadata, "data-astro-cid-rosbtmqz": true })} </div>`)} </div> </div> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/layouts/PostArchiveLayout.astro", void 0);

export { $$PostArchiveLayout as $ };
