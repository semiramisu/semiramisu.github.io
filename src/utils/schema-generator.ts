import type { CollectionEntry } from 'astro:content';

export interface SchemaAuthor {
  "@type": "Person";
  name: string;
  url?: string;
  image?: string;
}

export interface SchemaArticle {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: SchemaAuthor;
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  timeRequired?: string;
}

export interface SchemaBreadcrumb {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    item: {
      "@id": string;
      name: string;
    };
  }>;
}

export interface SchemaWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

const SITE_URL = "https://semiramisu.com";
const SITE_NAME = "semiramisu blog";
const AUTHOR_NAME = "semiramisu";

export function generateArticleSchema(
  post: CollectionEntry<'posts'>,
  url: string,
  wordCount?: number,
  readingTime?: number
): SchemaArticle {
  const imageUrl = post.data.cover ? 
    (post.data.cover.startsWith('http') ? post.data.cover : `${SITE_URL}${post.data.cover}`) 
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description || post.data.title,
    image: imageUrl,
    datePublished: post.data.published.toISOString(),
    dateModified: post.data.updated?.toISOString() || post.data.published.toISOString(),
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.jpg`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    keywords: post.data.tags,
    articleSection: post.data.category,
    wordCount: wordCount,
    timeRequired: readingTime ? `PT${readingTime}M` : undefined
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): SchemaBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
        name: item.name
      }
    }))
  };
}

export function generateWebSiteSchema(): SchemaWebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: "プログラミング、個人開発、日々の学びを共有するブログ",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generatePersonSchema(): any {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    url: SITE_URL,
    sameAs: [
      "https://github.com/semiramisu",
      "https://twitter.com/semiramisu" // TwitterアカウントがあればURLを追加
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-employed"
    }
  };
}