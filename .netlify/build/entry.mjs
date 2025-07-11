import { r as renderers } from './chunks/_@astro-renderers_HEXNp3S5.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CD_QzPz8.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/all-posts.astro.mjs');
const _page4 = () => import('./pages/archive.astro.mjs');
const _page5 = () => import('./pages/categories/_category_.astro.mjs');
const _page6 = () => import('./pages/categories.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/og/_---slug_.png.astro.mjs');
const _page9 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page10 = () => import('./pages/privacy-policy.astro.mjs');
const _page11 = () => import('./pages/robots.txt.astro.mjs');
const _page12 = () => import('./pages/rss.xml.astro.mjs');
const _page13 = () => import('./pages/tags/_tag_.astro.mjs');
const _page14 = () => import('./pages/tags.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const _page16 = () => import('./pages/_---page_.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/all-posts.astro", _page3],
    ["src/pages/archive.astro", _page4],
    ["src/pages/categories/[category].astro", _page5],
    ["src/pages/categories/index.astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/og/[...slug].png.ts", _page8],
    ["src/pages/posts/[...slug].astro", _page9],
    ["src/pages/privacy-policy.astro", _page10],
    ["src/pages/robots.txt.ts", _page11],
    ["src/pages/rss.xml.ts", _page12],
    ["src/pages/tags/[tag].astro", _page13],
    ["src/pages/tags/index.astro", _page14],
    ["src/pages/index.astro", _page15],
    ["src/pages/[...page].astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "fe423c5e-5c6b-4abb-b9a3-1e7c6f72005c"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
