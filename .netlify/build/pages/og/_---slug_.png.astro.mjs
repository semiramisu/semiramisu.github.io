import '../../chunks/_astro_content_BspSKymQ.mjs';
import '@vercel/og';
export { r as renderers } from '../../chunks/_@astro-renderers_BiSpJXdX.mjs';

async function getStaticPaths() {
  {
    return [];
  }
}
const GET = async ({ props, params }) => {
  {
    return new Response("Not Found", { status: 404 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  getStaticPaths
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
