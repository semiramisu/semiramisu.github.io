import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** All non-draft posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
}

/** Category name -> post count, ordered by count desc. */
export function countCategories(posts: Post[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (!post.data.category) continue;
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  }
  return new Map([...counts].sort((a, b) => b[1] - a[1]));
}

/** Tag name -> post count, ordered by count desc. */
export function countTags(posts: Post[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...counts].sort((a, b) => b[1] - a[1]));
}

/** Posts grouped by publication year, newest year first. */
export function groupByYear(posts: Post[]): [number, Post[]][] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.published.getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

/**
 * Related posts scored by shared category (+2) and shared tags (+1 each),
 * falling back to recency among candidates with equal scores.
 */
export function getRelatedPosts(post: Post, all: Post[], count = 3): Post[] {
  const tagSet = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => {
      let score = 0;
      if (post.data.category && p.data.category === post.data.category) {
        score += 2;
      }
      for (const tag of p.data.tags) {
        if (tagSet.has(tag)) score += 1;
      }
      return { post: p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.published.getTime() - a.post.data.published.getTime(),
    )
    .slice(0, count)
    .map((entry) => entry.post);
}

/** ISO-like date for the terminal aesthetic: 2026-06-10 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Short date without year: 06-10 (for year-grouped lists) */
export function formatDateShort(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${m}-${d}`;
}
