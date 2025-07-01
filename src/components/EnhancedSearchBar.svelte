<script lang="ts">
  import { onMount } from "svelte";
  import { OverlayScrollbars } from "overlayscrollbars";
  import Icon from "@iconify/svelte";

  import I18nKeys from "../locales/keys";
  import { i18n } from "../locales/translation";

  let searchKeyword = "";
  let searchResult: any[] = [];
  let filteredResult: any[] = [];
  let selectedCategory = "";
  let selectedTags: string[] = [];
  let dateRange = { start: "", end: "" };
  let readingTimeRange = { min: 0, max: 30 };
  let showFilters = false;
  let searchHistory: string[] = [];

  let resultPannel: HTMLDivElement;
  let searchBar: HTMLDivElement;
  let pagefindLoaded = false;

  // カテゴリとタグのリストを取得
  let categories: string[] = [];
  let tags: string[] = [];

  let search = (keyword: string) => {};

  // 検索履歴の管理
  const addToHistory = (keyword: string) => {
    if (keyword && !searchHistory.includes(keyword)) {
      searchHistory = [keyword, ...searchHistory.slice(0, 4)];
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  };

  const loadHistory = () => {
    const saved = localStorage.getItem('searchHistory');
    if (saved) {
      searchHistory = JSON.parse(saved);
    }
  };

  // フィルタリング関数
  const applyFilters = (results: any[]) => {
    return results.filter(item => {
      // カテゴリフィルター
      if (selectedCategory && item.meta.category !== selectedCategory) {
        return false;
      }

      // タグフィルター
      if (selectedTags.length > 0) {
        const itemTags = item.meta.tags || [];
        const hasAllTags = selectedTags.every(tag => itemTags.includes(tag));
        if (!hasAllTags) return false;
      }

      // 日付範囲フィルター
      if (dateRange.start || dateRange.end) {
        const itemDate = new Date(item.meta.published);
        if (dateRange.start && itemDate < new Date(dateRange.start)) return false;
        if (dateRange.end && itemDate > new Date(dateRange.end)) return false;
      }

      // 読了時間フィルター
      const readingTime = item.meta.readingTime || 5;
      if (readingTime < readingTimeRange.min || readingTime > readingTimeRange.max) {
        return false;
      }

      return true;
    });
  };

  // Wait for pagefind to be available
  const waitForPagefind = async () => {
    let attempts = 0;
    while (attempts < 50) {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.pagefind) {
        pagefindLoaded = true;
        console.log("Pagefind is now available");
        if (searchKeyword) {
          search(searchKeyword);
        }
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    console.error("Pagefind failed to load after 5 seconds");
  };

  onMount(async () => {
    loadHistory();
    waitForPagefind();
    
    // オーバーレイスクロールバーの設定
    OverlayScrollbars(resultPannel, {
      scrollbars: {
        theme: "scrollbar-base scrollbar-auto py-1",
        autoHide: "move",
      },
    });

    // カテゴリとタグの取得（実際の実装では動的に取得）
    categories = ["Tech", "Life", "Travel", "Food", "Sports"];
    tags = ["JavaScript", "TypeScript", "React", "Astro", "CSS", "Node.js", "Python", "AI"];

    search = async (keyword: string) => {
      let searchResultArr = [];

      // @ts-ignore
      if (typeof window !== 'undefined' && window.pagefind && pagefindLoaded) {
        try {
          // @ts-ignore
          const ret = await window.pagefind.search(keyword);
          for (const item of ret.results) {
            const data = await item.data();
            searchResultArr.push(data);
          }
          searchResult = searchResultArr;
          filteredResult = applyFilters(searchResultArr);
          
          if (keyword) {
            addToHistory(keyword);
          }
        } catch (error) {
          console.error("Search error:", error);
          searchResult = [];
          filteredResult = [];
        }
      } else {
        if (keyword) {
          console.warn("Pagefind not loaded yet, search will be triggered when ready");
        }
        searchResult = [];
        filteredResult = [];
      }

      updateResultPanel();
    };
  });

  const updateResultPanel = () => {
    const hasResults = searchKeyword !== "" || showFilters;
    const displayResults = filteredResult.length > 0 || (searchHistory.length > 0 && searchKeyword === "");

    if (hasResults && displayResults) {
      const height = showFilters ? 
        Math.min(600, (filteredResult.length * 84) + 280) : 
        Math.min(436, (filteredResult.length * 84) + (searchKeyword === "" ? 100 : 16));
      
      resultPannel.style.height = `${height}px`;
      resultPannel.style.opacity = "100%";
    } else {
      resultPannel.style.height = "0px";
      resultPannel.style.opacity = "0";
    }
  };

  // クリック外で閉じる処理
  document.addEventListener("click", (event) => {
    if (
      !resultPannel.contains(event.target as any) &&
      !searchBar.contains(event.target as any)
    ) {
      searchKeyword = "";
      showFilters = false;
      updateResultPanel();
    }
  });

  // リアクティブステートメント
  $: {
    search(searchKeyword);
  }

  $: {
    filteredResult = applyFilters(searchResult);
    updateResultPanel();
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter(t => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
  };

  const clearFilters = () => {
    selectedCategory = "";
    selectedTags = [];
    dateRange = { start: "", end: "" };
    readingTimeRange = { min: 0, max: 30 };
  };

  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800">$1</mark>');
  };
</script>

<!-- search bar -->
<div bind:this={searchBar} class="search-bar hidden lg:block relative">
  <div class="bg-black/5 dark:bg-white/5 h-10 rounded-lg flex flex-row">
    <label
      for="enhanced-search-input"
      class="w-10 h-10 flex flex-row justify-center items-center pl-2 pr-1 hover:cursor-text text-gray-400"
    >
      <Icon icon="mingcute:search-line" width={24} height={24} />
    </label>
    <input
      id="enhanced-search-input"
      class="w-36 text-[var(--text-color)] xl:focus:w-60 bg-transparent outline-none transition-all"
      placeholder={i18n(I18nKeys.nav_bar_search_placeholder)}
      type="text"
      autocomplete="off"
      on:focus={() => {
        updateResultPanel();
      }}
      bind:value={searchKeyword}
    />
    <button
      class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[var(--primary-color)] transition-colors"
      on:click={() => {
        showFilters = !showFilters;
        updateResultPanel();
      }}
    >
      <Icon icon="mingcute:filter-line" width={20} height={20} />
    </button>
  </div>
</div>

<!-- result panel -->
<div
  id="result-panel"
  bind:this={resultPannel}
  class="max-h-[600px] overflow-y-scroll opacity-0 !absolute h-0 -right-3 w-[32rem] bg-[var(--card-color)] rounded-2xl top-20 transition-all shadow-xl"
>
  <div class="flex flex-col h-full">
    <!-- 検索履歴 -->
    {#if searchKeyword === "" && searchHistory.length > 0 && !showFilters}
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
          検索履歴
        </h3>
        <div class="flex flex-wrap gap-2">
          {#each searchHistory as history}
            <button
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              on:click={() => searchKeyword = history}
            >
              {history}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- フィルターパネル -->
    {#if showFilters}
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400">
            フィルター
          </h3>
          <button
            class="text-xs text-[var(--primary-color)] hover:underline"
            on:click={clearFilters}
          >
            クリア
          </button>
        </div>

        <!-- カテゴリフィルター -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 dark:text-gray-500">カテゴリ</label>
          <select
            class="w-full mt-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
            bind:value={selectedCategory}
          >
            <option value="">すべて</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
        </div>

        <!-- タグフィルター -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 dark:text-gray-500">タグ</label>
          <div class="flex flex-wrap gap-1 mt-1">
            {#each tags as tag}
              <button
                class="px-2 py-1 text-xs rounded-full transition-colors {selectedTags.includes(tag) ? 'bg-[var(--primary-color)] text-white' : 'bg-gray-100 dark:bg-gray-800'}"
                on:click={() => toggleTag(tag)}
              >
                {tag}
              </button>
            {/each}
          </div>
        </div>

        <!-- 日付範囲 -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 dark:text-gray-500">日付範囲</label>
          <div class="flex gap-2 mt-1">
            <input
              type="date"
              class="flex-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
              bind:value={dateRange.start}
            />
            <span class="self-center">〜</span>
            <input
              type="date"
              class="flex-1 p-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
              bind:value={dateRange.end}
            />
          </div>
        </div>

        <!-- 読了時間 -->
        <div>
          <label class="text-xs text-gray-500 dark:text-gray-500">
            読了時間: {readingTimeRange.min} - {readingTimeRange.max} 分
          </label>
          <div class="flex gap-2 mt-1">
            <input
              type="range"
              min="0"
              max="30"
              class="flex-1"
              bind:value={readingTimeRange.min}
            />
            <input
              type="range"
              min="0"
              max="30"
              class="flex-1"
              bind:value={readingTimeRange.max}
            />
          </div>
        </div>
      </div>
    {/if}

    <!-- 検索結果 -->
    <div class="flex-1 py-2">
      {#if filteredResult.length === 0 && searchKeyword !== ""}
        <div class="p-8 text-center text-gray-500 dark:text-gray-400">
          <Icon icon="mingcute:search-line" width={48} height={48} class="mx-auto mb-2 opacity-50" />
          <p>検索結果が見つかりませんでした</p>
        </div>
      {/if}
      
      {#each filteredResult as item}
        <a
          href={item.url}
          class="mx-2 my-1 py-3 px-4 rounded-xl result-item hover:bg-gray-100 dark:hover:bg-gray-800 transition-all block"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-lg font-semibold text-[var(--text-color)] line-clamp-1">
                {@html highlightText(item.meta.title, searchKeyword)}
              </p>
              <div class="flex gap-2 mt-1 text-xs text-gray-500">
                {#if item.meta.category}
                  <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                    {item.meta.category}
                  </span>
                {/if}
                {#if item.meta.readingTime}
                  <span>{item.meta.readingTime} 分</span>
                {/if}
                {#if item.meta.published}
                  <span>{new Date(item.meta.published).toLocaleDateString('ja-JP')}</span>
                {/if}
              </div>
              <p class="mt-2 text-sm text-[var(--text-color-lighten)] line-clamp-2">
                {@html highlightText(item.excerpt, searchKeyword)}
              </p>
            </div>
            <Icon 
              icon="mingcute:arrow-right-line" 
              width={20} 
              height={20} 
              class="ml-2 text-[var(--primary-color)] flex-shrink-0"
            />
          </div>
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .result-item {
    transition: all 0.2s ease;
  }

  .result-item:hover {
    transform: translateX(4px);
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    background: var(--border-color);
    outline: none;
    border-radius: 2px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--primary-color);
    cursor: pointer;
    border-radius: 50%;
  }

  input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: var(--primary-color);
    cursor: pointer;
    border-radius: 50%;
  }

  :global(mark) {
    padding: 0 2px;
    border-radius: 2px;
  }
</style>