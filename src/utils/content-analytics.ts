import { getCollection } from 'astro:content';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from 'date-fns';
import { ja } from 'date-fns/locale';
import { calculateReadingTimeFromContent } from './reading-time';

export interface ContentAnalytics {
  totalPosts: number;
  monthlyPosts: number;
  postsGrowth: number;
  topTags: Array<{ tag: string; count: number }>;
  topCategories: Array<{ category: string; count: number }>;
  postFrequency: Array<{ date: string; count: number }>;
  avgReadingTime: number;
  avgWordCount: number;
  scheduledPosts: number;
  gaps: {
    longestGap: number;
    avgGap: number;
    lastPostDays: number;
  };
  monthlyStats: Array<{
    month: string;
    posts: number;
    words: number;
    readingTime: number;
  }>;
}

export async function analyzeContent(): Promise<ContentAnalytics> {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  // 公開済みの記事のみ
  const publishedPosts = posts.filter(post => post.data.published <= new Date());

  const publishedPostsWithStats = await Promise.all(
    publishedPosts.map(async post => {
      const rendered =
        typeof post.render === 'function'
          ? await post.render()
          : (post as any).rendered;
      const readingMetadata =
        rendered?.remarkPluginFrontmatter?.readingMetadata ??
        rendered?.metadata?.frontmatter?.readingMetadata ??
        calculateReadingTimeFromContent(post.body);

      return {
        post,
        readingMetadata
      };
    })
  );
  
  // 総記事数
  const totalPosts = publishedPosts.length;
  
  // 今月の記事数
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const monthlyPosts = publishedPosts.filter(post => 
    post.data.published >= monthStart && post.data.published <= monthEnd
  ).length;
  
  // 先月との比較
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const lastMonthPosts = publishedPosts.filter(post => 
    post.data.published >= lastMonthStart && post.data.published <= lastMonthEnd
  ).length;
  const postsGrowth = lastMonthPosts > 0 
    ? ((monthlyPosts - lastMonthPosts) / lastMonthPosts) * 100 
    : 100;
  
  // タグ分析
  const tagCounts = new Map<string, number>();
  publishedPosts.forEach(post => {
    post.data.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  const topTags = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // カテゴリ分析
  const categoryCounts = new Map<string, number>();
  publishedPosts.forEach(post => {
    if (post.data.category) {
      categoryCounts.set(post.data.category, (categoryCounts.get(post.data.category) || 0) + 1);
    }
  });
  const topCategories = Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
  
  // 投稿頻度（過去30日）
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const dailyCounts = new Map<string, number>();
  
  eachDayOfInterval({ start: thirtyDaysAgo, end: now }).forEach(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    dailyCounts.set(dateStr, 0);
  });
  
  publishedPosts
    .filter(post => post.data.published >= thirtyDaysAgo)
    .forEach(post => {
      const dateStr = format(post.data.published, 'yyyy-MM-dd');
      dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + 1);
    });
  
  const postFrequency = Array.from(dailyCounts.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
  
  // 平均読了時間と単語数
  let totalReadingTime = 0;
  let totalWordCount = 0;
  let postsWithStats = 0;
  
  publishedPostsWithStats.forEach(({ readingMetadata }) => {
    if (readingMetadata) {
      totalReadingTime += readingMetadata.time || 0;
      totalWordCount += readingMetadata.wordCount || 0;
      postsWithStats++;
    }
  });
  
  const avgReadingTime = postsWithStats > 0 ? Math.round(totalReadingTime / postsWithStats) : 0;
  const avgWordCount = postsWithStats > 0 ? Math.round(totalWordCount / postsWithStats) : 0;
  
  // 予約投稿数
  const scheduledPosts = posts.filter(post => post.data.published > new Date()).length;
  
  // 投稿間隔分析
  const sortedPosts = publishedPosts.sort((a, b) => 
    b.data.published.getTime() - a.data.published.getTime()
  );
  
  let gaps: number[] = [];
  for (let i = 0; i < sortedPosts.length - 1; i++) {
    const gap = sortedPosts[i].data.published.getTime() - sortedPosts[i + 1].data.published.getTime();
    gaps.push(gap / (1000 * 60 * 60 * 24)); // 日数に変換
  }
  
  const longestGap = gaps.length > 0 ? Math.max(...gaps) : 0;
  const avgGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b) / gaps.length : 0;
  const lastPostDays = sortedPosts.length > 0 
    ? Math.floor((now.getTime() - sortedPosts[0].data.published.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  
  // 月別統計（過去6ヶ月）
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const targetMonth = subMonths(now, i);
    const monthStart = startOfMonth(targetMonth);
    const monthEnd = endOfMonth(targetMonth);
    
    const monthPosts = publishedPostsWithStats.filter(({ post }) =>
      post.data.published >= monthStart && post.data.published <= monthEnd
    );

    const monthWords = monthPosts.reduce(
      (sum, { readingMetadata }) => sum + (readingMetadata?.wordCount || 0),
      0
    );
    const monthReadingTime = monthPosts.reduce(
      (sum, { readingMetadata }) => sum + (readingMetadata?.time || 0),
      0
    );

    monthlyStats.push({
      month: format(targetMonth, 'yyyy年MM月', { locale: ja }),
      posts: monthPosts.length,
      words: monthWords,
      readingTime: monthReadingTime
    });
  }
  
  return {
    totalPosts,
    monthlyPosts,
    postsGrowth,
    topTags,
    topCategories,
    postFrequency,
    avgReadingTime,
    avgWordCount,
    scheduledPosts,
    gaps: {
      longestGap: Math.round(longestGap),
      avgGap: Math.round(avgGap),
      lastPostDays
    },
    monthlyStats
  };
}

export function generateContentSuggestions(analytics: ContentAnalytics): string[] {
  const suggestions: string[] = [];
  
  // 投稿頻度に基づく提案
  if (analytics.gaps.lastPostDays > 7) {
    suggestions.push(`最後の投稿から${analytics.gaps.lastPostDays}日経過しています。新しい記事を書きましょう！`);
  }
  
  if (analytics.gaps.avgGap > 7) {
    suggestions.push(`平均投稿間隔が${Math.round(analytics.gaps.avgGap)}日です。もう少し頻繁に投稿してみましょう。`);
  }
  
  // タグの偏りに基づく提案
  if (analytics.topTags.length > 0 && analytics.topTags[0].count > analytics.totalPosts * 0.3) {
    suggestions.push(`「${analytics.topTags[0].tag}」タグが多すぎるかもしれません。他のトピックも扱ってみましょう。`);
  }
  
  // 記事の長さに基づく提案
  if (analytics.avgWordCount < 500) {
    suggestions.push(`平均記事長が${analytics.avgWordCount}文字と短めです。もう少し詳しく書いてみましょう。`);
  } else if (analytics.avgWordCount > 3000) {
    suggestions.push(`平均記事長が${analytics.avgWordCount}文字と長めです。時には短い記事も混ぜてみましょう。`);
  }
  
  // 予約投稿に基づく提案
  if (analytics.scheduledPosts === 0) {
    suggestions.push('予約投稿がありません。計画的に記事を準備しましょう。');
  }
  
  return suggestions;
}