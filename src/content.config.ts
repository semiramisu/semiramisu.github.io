import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    sourceLink: z.string().optional(),
    licenseName: z.string().optional(),
    licenseUrl: z.string().optional(),
    lang: z.enum(["ja", "en"]).optional().default("ja"),
    translatedFrom: z.string().optional(),
    translatedAt: z.date().optional(),
  }),
});

const specs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/specs",
  }),
});

const shorts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/shorts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(["ja", "en"]).optional().default("ja"),
  }),
});

export const collections = { posts, specs, shorts };
