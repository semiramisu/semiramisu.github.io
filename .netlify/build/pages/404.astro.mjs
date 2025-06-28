/* empty css                                  */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$MainLayout, a as $$Icon } from '../chunks/MainLayout_D_1_3qA2.mjs';
/* empty css                               */
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Main", $$MainLayout, { "title": "404 - \u30DA\u30FC\u30B8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="error-container" data-astro-cid-zetdm5md> <div class="error-content" data-astro-cid-zetdm5md> <div class="error-code" data-astro-cid-zetdm5md> <span class="digit" data-astro-cid-zetdm5md>4</span> <div class="planet-container" data-astro-cid-zetdm5md> <div class="planet" data-astro-cid-zetdm5md></div> <div class="orbit" data-astro-cid-zetdm5md> <div class="meteor" data-astro-cid-zetdm5md></div> </div> </div> <span class="digit" data-astro-cid-zetdm5md>4</span> </div> <h1 class="error-title" data-astro-cid-zetdm5md>ページが見つかりません</h1> <p class="error-message" data-astro-cid-zetdm5md>
お探しのページは削除されたか、移動した可能性があります。
</p> <div class="action-buttons" data-astro-cid-zetdm5md> <a href="/" class="home-button" data-astro-cid-zetdm5md> ${renderComponent($$result2, "Icon", $$Icon, { "name": "line-md:home", "class": "button-icon", "data-astro-cid-zetdm5md": true })}
ホームに戻る
</a> <button class="back-button" onclick="history.back()" data-astro-cid-zetdm5md> ${renderComponent($$result2, "Icon", $$Icon, { "name": "line-md:arrow-left", "class": "button-icon", "data-astro-cid-zetdm5md": true })}
前のページに戻る
</button> </div> </div> </div> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/404.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
