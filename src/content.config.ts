import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    lang: z.enum(["ja", "en"]).default("ja"),
  }),
});

const specs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/content/specs",
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, specs };
