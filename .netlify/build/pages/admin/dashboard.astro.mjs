/* empty css                                     */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$MainLayout, a as $$Icon } from '../../chunks/MainLayout_D_1_3qA2.mjs';
import { a as getCollection } from '../../chunks/_astro_content_BspSKymQ.mjs';
import { startOfMonth, endOfMonth, subMonths, eachDayOfInterval, format } from 'date-fns';
import { ja } from 'date-fns/locale';
/* empty css                                        */
export { r as renderers } from '../../chunks/_@astro-renderers_BiSpJXdX.mjs';

async function analyzeContent() {
  const posts = await getCollection("posts", ({ data }) => {
    return data.draft !== true ;
  });
  const publishedPosts = posts.filter((post) => post.data.published <= /* @__PURE__ */ new Date());
  const totalPosts = publishedPosts.length;
  const now = /* @__PURE__ */ new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const monthlyPosts = publishedPosts.filter(
    (post) => post.data.published >= monthStart && post.data.published <= monthEnd
  ).length;
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const lastMonthPosts = publishedPosts.filter(
    (post) => post.data.published >= lastMonthStart && post.data.published <= lastMonthEnd
  ).length;
  const postsGrowth = lastMonthPosts > 0 ? (monthlyPosts - lastMonthPosts) / lastMonthPosts * 100 : 100;
  const tagCounts = /* @__PURE__ */ new Map();
  publishedPosts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  const topTags = Array.from(tagCounts.entries()).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count).slice(0, 10);
  const categoryCounts = /* @__PURE__ */ new Map();
  publishedPosts.forEach((post) => {
    if (post.data.category) {
      categoryCounts.set(post.data.category, (categoryCounts.get(post.data.category) || 0) + 1);
    }
  });
  const topCategories = Array.from(categoryCounts.entries()).map(([category, count]) => ({ category, count })).sort((a, b) => b.count - a.count);
  const thirtyDaysAgo = /* @__PURE__ */ new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const dailyCounts = /* @__PURE__ */ new Map();
  eachDayOfInterval({ start: thirtyDaysAgo, end: now }).forEach((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    dailyCounts.set(dateStr, 0);
  });
  publishedPosts.filter((post) => post.data.published >= thirtyDaysAgo).forEach((post) => {
    const dateStr = format(post.data.published, "yyyy-MM-dd");
    dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + 1);
  });
  const postFrequency = Array.from(dailyCounts.entries()).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date));
  let totalReadingTime = 0;
  let totalWordCount = 0;
  let postsWithStats = 0;
  publishedPosts.forEach((post) => {
    const metadata = post.rendered?.metadata;
    if (metadata?.frontmatter?.readingMetadata) {
      totalReadingTime += metadata.frontmatter.readingMetadata.time || 0;
      totalWordCount += metadata.frontmatter.readingMetadata.wordCount || 0;
      postsWithStats++;
    }
  });
  const avgReadingTime = postsWithStats > 0 ? Math.round(totalReadingTime / postsWithStats) : 0;
  const avgWordCount = postsWithStats > 0 ? Math.round(totalWordCount / postsWithStats) : 0;
  const scheduledPosts = posts.filter((post) => post.data.published > /* @__PURE__ */ new Date()).length;
  const sortedPosts = publishedPosts.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime()
  );
  let gaps = [];
  for (let i = 0; i < sortedPosts.length - 1; i++) {
    const gap = sortedPosts[i].data.published.getTime() - sortedPosts[i + 1].data.published.getTime();
    gaps.push(gap / (1e3 * 60 * 60 * 24));
  }
  const longestGap = gaps.length > 0 ? Math.max(...gaps) : 0;
  const avgGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b) / gaps.length : 0;
  const lastPostDays = sortedPosts.length > 0 ? Math.floor((now.getTime() - sortedPosts[0].data.published.getTime()) / (1e3 * 60 * 60 * 24)) : 0;
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const targetMonth = subMonths(now, i);
    const monthStart2 = startOfMonth(targetMonth);
    const monthEnd2 = endOfMonth(targetMonth);
    const monthPosts = publishedPosts.filter(
      (post) => post.data.published >= monthStart2 && post.data.published <= monthEnd2
    );
    let monthWords = 0;
    let monthReadingTime = 0;
    monthPosts.forEach((post) => {
      const metadata = post.rendered?.metadata;
      if (metadata?.frontmatter?.readingMetadata) {
        monthWords += metadata.frontmatter.readingMetadata.wordCount || 0;
        monthReadingTime += metadata.frontmatter.readingMetadata.time || 0;
      }
    });
    monthlyStats.push({
      month: format(targetMonth, "yyyy年MM月", { locale: ja }),
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
function generateContentSuggestions(analytics) {
  const suggestions = [];
  if (analytics.gaps.lastPostDays > 7) {
    suggestions.push(`最後の投稿から${analytics.gaps.lastPostDays}日経過しています。新しい記事を書きましょう！`);
  }
  if (analytics.gaps.avgGap > 7) {
    suggestions.push(`平均投稿間隔が${Math.round(analytics.gaps.avgGap)}日です。もう少し頻繁に投稿してみましょう。`);
  }
  if (analytics.topTags.length > 0 && analytics.topTags[0].count > analytics.totalPosts * 0.3) {
    suggestions.push(`「${analytics.topTags[0].tag}」タグが多すぎるかもしれません。他のトピックも扱ってみましょう。`);
  }
  if (analytics.avgWordCount < 500) {
    suggestions.push(`平均記事長が${analytics.avgWordCount}文字と短めです。もう少し詳しく書いてみましょう。`);
  } else if (analytics.avgWordCount > 3e3) {
    suggestions.push(`平均記事長が${analytics.avgWordCount}文字と長めです。時には短い記事も混ぜてみましょう。`);
  }
  if (analytics.scheduledPosts === 0) {
    suggestions.push("予約投稿がありません。計画的に記事を準備しましょう。");
  }
  return suggestions;
}

const $$Astro = createAstro("http://semiramisu.com/");
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const analytics = await analyzeContent();
  const suggestions = generateContentSuggestions(analytics);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "コンテンツ分析ダッシュボード", "data-astro-cid-x6qnsptu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard-container" data-astro-cid-x6qnsptu> <div class="dashboard-header" data-astro-cid-x6qnsptu> <h1 class="dashboard-title" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:chart-line", "class": "inline-block w-8 h-8 mr-2", "data-astro-cid-x6qnsptu": true })}
コンテンツ分析ダッシュボード
</h1> <p class="dashboard-subtitle" data-astro-cid-x6qnsptu>ブログの統計情報と分析</p> </div> <!-- メトリクスカード --> <div class="metrics-grid" data-astro-cid-x6qnsptu> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:file-document-multiple", "class": "w-6 h-6", "data-astro-cid-x6qnsptu": true })} </div> <div class="metric-content" data-astro-cid-x6qnsptu> <h3 class="metric-label" data-astro-cid-x6qnsptu>総記事数</h3> <p class="metric-value" data-astro-cid-x6qnsptu>${analytics.totalPosts}</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:calendar-month", "class": "w-6 h-6", "data-astro-cid-x6qnsptu": true })} </div> <div class="metric-content" data-astro-cid-x6qnsptu> <h3 class="metric-label" data-astro-cid-x6qnsptu>今月の投稿</h3> <p class="metric-value" data-astro-cid-x6qnsptu>${analytics.monthlyPosts}</p> <p${addAttribute(`metric-change ${analytics.postsGrowth >= 0 ? "positive" : "negative"}`, "class")} data-astro-cid-x6qnsptu> ${analytics.postsGrowth >= 0 ? "+" : ""}${analytics.postsGrowth.toFixed(1)}%
</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:clock-outline", "class": "w-6 h-6", "data-astro-cid-x6qnsptu": true })} </div> <div class="metric-content" data-astro-cid-x6qnsptu> <h3 class="metric-label" data-astro-cid-x6qnsptu>平均読了時間</h3> <p class="metric-value" data-astro-cid-x6qnsptu>${analytics.avgReadingTime}分</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:text", "class": "w-6 h-6", "data-astro-cid-x6qnsptu": true })} </div> <div class="metric-content" data-astro-cid-x6qnsptu> <h3 class="metric-label" data-astro-cid-x6qnsptu>平均単語数</h3> <p class="metric-value" data-astro-cid-x6qnsptu>${analytics.avgWordCount.toLocaleString()}</p> </div> </div> </div> <!-- 投稿頻度グラフ --> <div class="chart-section" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>投稿頻度（過去30日）</h2> <div class="frequency-chart" data-astro-cid-x6qnsptu> ${analytics.postFrequency.map((day) => renderTemplate`<div class="frequency-bar-container"${addAttribute(`${day.date}: ${day.count}記事`, "title")} data-astro-cid-x6qnsptu> <div class="frequency-bar"${addAttribute(`height: ${day.count > 0 ? Math.max(20, day.count * 40) : 4}px`, "style")}${addAttribute(day.count, "data-count")} data-astro-cid-x6qnsptu></div> </div>`)} </div> </div> <!-- タグとカテゴリ分析 --> <div class="analysis-grid" data-astro-cid-x6qnsptu> <div class="analysis-section" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>人気タグ TOP10</h2> <div class="tag-list" data-astro-cid-x6qnsptu> ${analytics.topTags.map((tag, index) => renderTemplate`<div class="tag-item" data-astro-cid-x6qnsptu> <span class="tag-rank" data-astro-cid-x6qnsptu>#${index + 1}</span> <span class="tag-name" data-astro-cid-x6qnsptu>${tag.tag}</span> <span class="tag-count" data-astro-cid-x6qnsptu>${tag.count}記事</span> <div class="tag-bar"${addAttribute(`width: ${tag.count / analytics.topTags[0].count * 100}%`, "style")} data-astro-cid-x6qnsptu></div> </div>`)} </div> </div> <div class="analysis-section" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>カテゴリ別投稿数</h2> <div class="category-list" data-astro-cid-x6qnsptu> ${analytics.topCategories.map((category) => renderTemplate`<div class="category-item" data-astro-cid-x6qnsptu> <span class="category-name" data-astro-cid-x6qnsptu>${category.category}</span> <span class="category-count" data-astro-cid-x6qnsptu>${category.count}記事</span> <div class="category-progress" data-astro-cid-x6qnsptu> <div class="category-bar"${addAttribute(`width: ${category.count / analytics.totalPosts * 100}%`, "style")} data-astro-cid-x6qnsptu></div> </div> </div>`)} </div> </div> </div> <!-- 月別統計 --> <div class="monthly-stats" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>月別統計（過去6ヶ月）</h2> <div class="stats-table" data-astro-cid-x6qnsptu> <div class="stats-header" data-astro-cid-x6qnsptu> <div data-astro-cid-x6qnsptu>月</div> <div data-astro-cid-x6qnsptu>投稿数</div> <div data-astro-cid-x6qnsptu>総単語数</div> <div data-astro-cid-x6qnsptu>総読了時間</div> </div> ${analytics.monthlyStats.map((stat) => renderTemplate`<div class="stats-row" data-astro-cid-x6qnsptu> <div data-astro-cid-x6qnsptu>${stat.month}</div> <div data-astro-cid-x6qnsptu>${stat.posts}記事</div> <div data-astro-cid-x6qnsptu>${stat.words.toLocaleString()}語</div> <div data-astro-cid-x6qnsptu>${stat.readingTime}分</div> </div>`)} </div> </div> <!-- 改善提案 --> ${suggestions.length > 0 && renderTemplate`<div class="suggestions-section" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:lightbulb", "class": "inline-block w-6 h-6 mr-2", "data-astro-cid-x6qnsptu": true })}
改善提案
</h2> <ul class="suggestions-list" data-astro-cid-x6qnsptu> ${suggestions.map((suggestion) => renderTemplate`<li class="suggestion-item" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Icon", $$Icon, { "name": "mdi:information", "class": "w-5 h-5 text-blue-500", "data-astro-cid-x6qnsptu": true })} <span data-astro-cid-x6qnsptu>${suggestion}</span> </li>`)} </ul> </div>`} <!-- 投稿間隔情報 --> <div class="gap-info" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>投稿間隔分析</h2> <div class="gap-metrics" data-astro-cid-x6qnsptu> <div class="gap-metric" data-astro-cid-x6qnsptu> <span class="gap-label" data-astro-cid-x6qnsptu>最長投稿間隔</span> <span class="gap-value" data-astro-cid-x6qnsptu>${analytics.gaps.longestGap}日</span> </div> <div class="gap-metric" data-astro-cid-x6qnsptu> <span class="gap-label" data-astro-cid-x6qnsptu>平均投稿間隔</span> <span class="gap-value" data-astro-cid-x6qnsptu>${analytics.gaps.avgGap}日</span> </div> <div class="gap-metric" data-astro-cid-x6qnsptu> <span class="gap-label" data-astro-cid-x6qnsptu>最終投稿から</span> <span class="gap-value" data-astro-cid-x6qnsptu>${analytics.gaps.lastPostDays}日</span> </div> </div> </div> </div> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/admin/dashboard.astro", void 0);
const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
