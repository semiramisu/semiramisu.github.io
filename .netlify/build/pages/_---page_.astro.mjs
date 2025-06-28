/* empty css                                  */
import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$MainLayout, G as GetSortedPosts } from '../chunks/MainLayout_D_1_3qA2.mjs';
import { $ as $$PostCard } from '../chunks/PostCard_ixuNTUny.mjs';
import 'clsx';
/* empty css                                  */
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$Astro$1 = createAstro("http://semiramisu.com/");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pagination;
  const props = Astro2.props;
  const maxVisiblePages = 4;
  let pages = [];
  if (props.lastPage <= maxVisiblePages) {
    pages = Array.from({ length: props.lastPage }, (_, i) => i + 1);
  } else {
    const startPage = Math.max(
      1,
      props.current - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(props.lastPage, startPage + maxVisiblePages - 1);
    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");
    pages.push(
      ...Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    );
    if (endPage < props.lastPage - 1) pages.push("...");
    if (endPage < props.lastPage) pages.push(props.lastPage);
  }
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(props.style, "style")}${addAttribute(["flex flex-row justify-center space-x-4", [props.class]], "class:list")} data-astro-cid-qoqou5sv> <a${addAttribute(props.prevURL, "href")}${addAttribute([props.prevURL ? "button" : "button-disabled"], "class:list")} data-astro-cid-qoqou5sv> <span data-astro-cid-qoqou5sv>＜</span> </a> <div class="flex flex-row space-x-2" data-astro-cid-qoqou5sv> ${pages.map(
    (page) => page === "..." ? renderTemplate`<span class="text-md text-[var(--primary-color)]" data-astro-cid-qoqou5sv>...</span>` : renderTemplate`<a${addAttribute(page === 1 ? "/" : `/${page}`, "href")}${addAttribute([page === props.current ? "button-selected" : "button"], "class:list")} data-astro-cid-qoqou5sv> <span data-astro-cid-qoqou5sv>${page}</span> </a>`
  )} </div> <a${addAttribute(props.nextURL, "href")}${addAttribute([props.nextURL ? "button" : "button-disabled"], "class:list")} data-astro-cid-qoqou5sv> <span data-astro-cid-qoqou5sv>＞</span> </a> </div> `;
}, "/Users/s26793/blog/semiramisu.github.io/src/components/controllers/Pagination.astro", void 0);

const $$Astro = createAstro("http://semiramisu.com/");
async function getStaticPaths({
  paginate
}) {
  const postCollections = await GetSortedPosts();
  return paginate(postCollections, { pageSize: 6 });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-8"> <div class="w-full space-y-4"> ${page.data.map((entry, index) => renderTemplate`<div class="onload-animation"${addAttribute(`animation-delay: calc(var(--onload-animation-delay) + ${index + 1} * var(--onload-animation-interval));`, "style")}> ${renderComponent($$result2, "PostCard", $$PostCard, { "id": entry.id, "title": entry.data.title, "published": entry.data.published, "category": entry.data.category, "tags": entry.data.tags, "description": entry.data.description, "image": entry.data.cover, "readingMetadata": entry.rendered.metadata.frontmatter.readingMetadata })} </div>`)} </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "class": "onload-animation", "lastPage": page.lastPage, "current": page.currentPage, "prevURL": page.url.prev, "nextURL": page.url.next, "style": `animation-delay: calc(var(--onload-animation-delay) + ${page.data.length + 1} * var(--onload-animation-interval));` })} </div> ` })}`;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/[...page].astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/[...page].astro";
const $$url = "/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
