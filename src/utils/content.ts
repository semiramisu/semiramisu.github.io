import { getCollection } from "astro:content";
import { IdToSlug } from "./hash";

/**
 * Extracts date from filename pattern (e.g., "2025_07_01.md")
 * and determines if the post should be published
 */
function shouldPublishPost(filename: string): boolean {
  // Extract date from filename pattern YYYY_MM_DD
  const match = filename.match(/(\d{4})_(\d{2})_(\d{2})/)
  if (!match) return true; // If no date pattern, publish by default
  
  const [, year, month, day] = match;
  const postDate = new Date(`${year}-${month}-${day}T12:00:00`); // Set to noon
  const now = new Date();
  
  // Post should be published if it's past noon on the post date
  return now >= postDate;
}

/**
 * Represents an archive item with a title, slug, date, and optional tags.
 */
export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags?: string[];
  description?: string;
  cover?: string;
  readingMetadata?: { time: number; wordCount: number };
}

/**
 * Represents a tag used to categorize content.
 */
export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Represents a category of content.
 */
export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Retrieves and sorts blog posts by their published date.
 *
 * This function fetches all blog posts from the "posts" collection, filters out drafts if in production mode,
 * and sorts them in descending order by their published date. It also adds `nextSlug`, `nextTitle`, `prevSlug`,
 * and `prevTitle` properties to each post for navigation purposes.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to an array of sorted blog posts with navigation properties.
 */
export async function GetSortedPosts(lang: "ja" | "en" = "ja") {
  const allBlogPosts = await getCollection("posts", ({ data, id }) => {
    const isDraftFiltered = import.meta.env.PROD ? data.draft !== true : true;
    const isLangFiltered = (data.lang || "ja") === lang;
    const isPublishTimeReached = shouldPublishPost(id);
    return isDraftFiltered && isLangFiltered && isPublishTimeReached;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  for (let i = 1; i < sorted.length; i++) {
    (sorted[i].data as any).nextSlug = (sorted[i - 1] as any).slug;
    (sorted[i].data as any).nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    (sorted[i].data as any).prevSlug = (sorted[i + 1] as any).slug;
    (sorted[i].data as any).prevTitle = sorted[i + 1].data.title;
  }

  return sorted;
}

/**
 * Retrieves and organizes blog post archives.
 *
 * This function fetches all blog posts from the "posts" collection, filters them based on the environment
 * (excluding drafts in production), and organizes them into a map of archives grouped by year.
 * Each archive entry contains the post's title, slug, publication date, and tags.
 * The archives are sorted in descending order by year and by date within each year.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to a map of archives grouped by year.
 */
export async function GetArchives(lang: "ja" | "en" = "ja") {
  const allBlogPosts = await getCollection("posts", ({ data, id }) => {
    const isDraftFiltered = import.meta.env.PROD ? data.draft !== true : true;
    const isLangFiltered = (data.lang || "ja") === lang;
    const isPublishTimeReached = shouldPublishPost(id);
    return isDraftFiltered && isLangFiltered && isPublishTimeReached;
  });

  const archives = new Map<number, Archive[]>();

  for (const post of allBlogPosts) {
    const date = new Date(post.data.published);
    const year = date.getFullYear();
    if (!archives.has(year)) {
      archives.set(year, []);
    }

    // 日本語と英語の混在テキストに対応した読み時間計算
    const japaneseCharCount = (post.body.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
    const englishWords = post.body.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ').split(/\s+/).filter(word => word.length > 0);
    const wordCount = japaneseCharCount + englishWords.length;
    const japaneseReadingTime = japaneseCharCount / 400;
    const englishReadingTime = englishWords.length / 200;
    const time = Math.max(1, Math.ceil(japaneseReadingTime + englishReadingTime));
    
    const readingMetadata = {
      time,
      wordCount
    };

    archives.get(year)!.push({
      title: post.data.title,
      id: `/posts/${IdToSlug(post.id)}`,
      date: date,
      tags: post.data.tags,
      description: post.data.description,
      cover: post.data.cover,
      readingMetadata
    });
  }

  const sortedArchives = new Map(
    [...archives.entries()].sort((a, b) => b[0] - a[0]),
  );
  sortedArchives.forEach((value) => {
    value.sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  return sortedArchives;
}

/**
 * Retrieves all tags from blog posts.
 *
 * This function fetches all blog posts from the "posts" collection and extracts tags from each post.
 * It then organizes the tags into a map where each tag is associated with its metadata and the posts that have that tag.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to a map of tags. Each key is a tag slug, and the value is an object containing the tag's name, slug, and associated posts.
 */
export async function GetTags(lang: "ja" | "en" = "ja") {
  const allBlogPosts = await getCollection("posts", ({ data, id }) => {
    const isDraftFiltered = import.meta.env.PROD ? data.draft !== true : true;
    const isLangFiltered = (data.lang || "ja") === lang;
    const isPublishTimeReached = shouldPublishPost(id);
    return isDraftFiltered && isLangFiltered && isPublishTimeReached;
  });

  const tags = new Map<string, Tag>();
  allBlogPosts.forEach((post) => {
    post.data.tags?.forEach((tag: string) => {
      const tagSlug = IdToSlug(tag);
      if (!tags.has(tagSlug)) {
        tags.set(tagSlug, {
          name: tag,
          slug: `/tags/${tagSlug}`,
          posts: [],
        });
      }

      const readingMetadata = {
        time: Math.ceil(post.body.length / 500), // 1分あたり約500文字として計算
        wordCount: post.body.split(/\s+/).length
      };

      tags.get(tagSlug)!.posts.push({
        title: post.data.title,
        id: `/posts/${IdToSlug(post.id)}`,
        date: new Date(post.data.published),
        tags: post.data.tags,
        description: post.data.description,
        cover: post.data.cover,
        readingMetadata
      });
    });
  });

  return tags;
}

/**
 * Retrieves all tags as an array, sorted by post count.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to an array of tags sorted by the number of posts that have each tag.
 */
export async function GetAllTags(lang: "ja" | "en" = "ja") {
  const tags = await GetTags(lang);
  return Array.from(tags.values())
    .sort((a, b) => b.posts.length - a.posts.length);
}

/**
 * Retrieves all blog post categories and their associated posts.
 *
 * This function fetches all blog posts from the "posts" collection and filters them based on the environment.
 * In production, it excludes drafts. It then organizes the posts into categories and returns a map of categories.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to a map of categories, where each category contains its name, slug, and associated posts.
 */
export async function GetCategories(lang: "ja" | "en" = "ja") {
  const allBlogPosts = await getCollection("posts", ({ data, id }) => {
    const isDraftFiltered = import.meta.env.PROD ? data.draft !== true : true;
    const isLangFiltered = (data.lang || "ja") === lang;
    const isPublishTimeReached = shouldPublishPost(id);
    return isDraftFiltered && isLangFiltered && isPublishTimeReached;
  });

  const categories = new Map<string, Category>();

  allBlogPosts.forEach((post) => {
    if (!post.data.category) return;
    const categorySlug = IdToSlug(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.category,
        slug: `/categories/${categorySlug}`,
        posts: [],
      });
    }

    // 日本語と英語の混在テキストに対応した読み時間計算
    const japaneseCharCount = (post.body.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
    const englishWords = post.body.replace(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ').split(/\s+/).filter(word => word.length > 0);
    const wordCount = japaneseCharCount + englishWords.length;
    const japaneseReadingTime = japaneseCharCount / 400;
    const englishReadingTime = englishWords.length / 200;
    const time = Math.max(1, Math.ceil(japaneseReadingTime + englishReadingTime));
    
    const readingMetadata = {
      time,
      wordCount
    };

    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/posts/${IdToSlug(post.id)}`,
      date: new Date(post.data.published),
      tags: post.data.tags,
      description: post.data.description,
      cover: post.data.cover,
      readingMetadata
    });
  });

  return categories;
}

/**
 * Retrieves all categories as an array, sorted by post count.
 *
 * @param lang - Optional language filter. If not provided, defaults to "ja"
 * @returns A promise that resolves to an array of categories sorted by the number of posts in each category.
 */
export async function GetAllCategories(lang: "ja" | "en" = "ja") {
  const categories = await GetCategories(lang);
  return Array.from(categories.values())
    .sort((a, b) => b.posts.length - a.posts.length);
}
