import type { Post } from "./content";

/**
 * Display-layer category grouping for the magazine color system.
 * Raw category values (including typos and compound values) are preserved
 * everywhere URLs and labels appear — this only decides which of the nine
 * `--cat-*` colors an article gets via `data-cat`.
 */
export type CatKey =
  | "work"
  | "chat"
  | "book"
  | "holiday"
  | "career"
  | "money"
  | "tech"
  | "health"
  | "misc";

const EXACT: Record<string, CatKey> = {
  仕事: "work",
  雑談: "chat",
  読書: "book",
  休日: "holiday",
  キャリア: "career",
  同期: "career",
  自己成長: "career",
  お金: "money",
  投資: "money",
  AI: "tech",
  Tech: "tech",
  LLM: "tech",
  IT: "tech",
  blog: "tech",
  SNS: "tech",
  プログラミング: "tech",
  コーディング: "tech",
  開発: "tech",
  再開発: "tech",
  勉強: "tech",
  学習: "tech",
  運動: "health",
  筋トレ: "health",
  トレーニング: "health",
  トレーニグ: "health",
  健康: "health",
};

/** Map a raw category value to its color group. */
export function getCategoryGroup(category?: string): CatKey {
  if (!category) return "misc";
  if (EXACT[category]) return EXACT[category];
  // Compound values like "雑談, トレーニング": first matching part wins.
  for (const part of category.split(/[,、]/)) {
    const key = EXACT[part.trim()];
    if (key) return key;
  }
  return "misc";
}

/** Posts whose category falls into the given color group, order preserved. */
export function filterByGroup(posts: Post[], group: CatKey): Post[] {
  return posts.filter((post) => getCategoryGroup(post.data.category) === group);
}
