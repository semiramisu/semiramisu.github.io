import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

import { SITE } from "./src/site.config.ts";

export default defineConfig({
  site: SITE.url,

  integrations: [sitemap(), pagefind()],

  markdown: {
    shikiConfig: {
      // Dual themes: CSS in prose.css switches via [data-theme]
      themes: {
        light: "github-light",
        dark: "github-dark-default",
      },
      defaultColor: false,
    },
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
          content: { type: "text", value: "#" },
        },
      ],
    ],
  },

  adapter: netlify(),
});
