<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import I18nKeys from "../locales/keys";
  import { i18n } from "../locales/translation";

  let searchOpen = false;
  let searchKeyword = "";
  let searchResult: any[] = [];
  let filteredResult: any[] = [];
  let pagefindLoaded = false;
  let showFilters = false;
  let selectedCategory = "";
  let selectedTags: string[] = [];
  let searchHistory: string[] = [];

  let searchOverlay: HTMLDivElement;
  let searchInput: HTMLInputElement;

  // カテゴリとタグのリスト
  let categories: string[] = ["Tech", "Life", "Travel", "Food", "Sports"];
  let tags: string[] = ["JavaScript", "TypeScript", "React", "Astro", "CSS", "Node.js", "Python", "AI"];

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
      if (selectedCategory && item.meta.category !== selectedCategory) {
        return false;
      }

      if (selectedTags.length > 0) {
        const itemTags = item.meta.tags || [];
        const hasAllTags = selectedTags.every(tag => itemTags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  };

  const waitForPagefind = async () => {
    let attempts = 0;
    while (attempts < 50) {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.pagefind) {
        pagefindLoaded = true;
        if (searchKeyword) {
          search(searchKeyword);
        }
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  };

  onMount(() => {
    loadHistory();
    waitForPagefind();

    search = async (keyword: string) => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.pagefind && pagefindLoaded) {
        try {
          // @ts-ignore
          const ret = await window.pagefind.search(keyword);
          const results = [];
          for (const item of ret.results) {
            results.push(await item.data());
          }
          searchResult = results;
          filteredResult = applyFilters(results);
          
          if (keyword) {
            addToHistory(keyword);
          }
        } catch (error) {
          console.error("Search error:", error);
          searchResult = [];
          filteredResult = [];
        }
      } else {
        searchResult = [];
        filteredResult = [];
      }
    };
  });

  const openSearch = () => {
    searchOpen = true;
    setTimeout(() => {
      searchInput?.focus();
    }, 100);
  };

  const closeSearch = () => {
    searchOpen = false;
    searchKeyword = "";
    showFilters = false;
  };

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
  };

  $: search(searchKeyword);
  $: filteredResult = applyFilters(searchResult);
</script>

<!-- Search Button -->
<button
  class="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--text-color)] transition-all hover:bg-[var(--primary-color-hover)] hover:text-[var(--primary-color)]"
  on:click={openSearch}
  aria-label="検索を開く"
>
  <Icon icon="mingcute:search-line" width={24} height={24} />
</button>

<!-- Search Overlay -->
{#if searchOpen}
  <div
    bind:this={searchOverlay}
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    on:click={closeSearch}
  >
    <div
      class="fixed inset-x-0 top-0 z-50 bg-[var(--card-color)] px-4 py-4 shadow-lg"
      on:click|stopPropagation
    >
      <!-- Search Header -->
      <div class="flex items-center gap-2 mb-4">
        <button
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          on:click={closeSearch}
        >
          <Icon icon="mingcute:arrow-left-line" width={24} height={24} />
        </button>
        <div class="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">
          <Icon icon="mingcute:search-line" width={20} height={20} class="text-gray-400" />
          <input
            bind:this={searchInput}
            bind:value={searchKeyword}
            type="text"
            placeholder={i18n(I18nKeys.nav_bar_search_placeholder)}
            class="flex-1 p-2 bg-transparent outline-none text-[var(--text-color)]"
          />
        </div>
        <button
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 {showFilters ? 'bg-gray-100 dark:bg-gray-800' : ''}"
          on:click={() => showFilters = !showFilters}
        >
          <Icon icon="mingcute:filter-line" width={24} height={24} />
        </button>
      </div>

      <!-- Filters -->
      {#if showFilters}
        <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-sm">フィルター</h3>
            <button
              class="text-xs text-[var(--primary-color)]"
              on:click={clearFilters}
            >
              クリア
            </button>
          </div>
          
          <!-- Category -->
          <select
            class="w-full mb-2 p-2 text-sm bg-white dark:bg-gray-800 rounded outline-none"
            bind:value={selectedCategory}
          >
            <option value="">すべてのカテゴリ</option>
            {#each categories as category}
              <option value={category}>{category}</option>
            {/each}
          </select>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1">
            {#each tags as tag}
              <button
                class="px-2 py-1 text-xs rounded-full {selectedTags.includes(tag) ? 'bg-[var(--primary-color)] text-white' : 'bg-gray-200 dark:bg-gray-700'}"
                on:click={() => toggleTag(tag)}
              >
                {tag}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Search History -->
      {#if searchKeyword === "" && searchHistory.length > 0}
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            検索履歴
          </h3>
          <div class="flex flex-wrap gap-2">
            {#each searchHistory as history}
              <button
                class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full"
                on:click={() => searchKeyword = history}
              >
                {history}
              </button>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Results -->
      <div class="max-h-[60vh] overflow-y-auto">
        {#if filteredResult.length === 0 && searchKeyword !== ""}
          <div class="py-8 text-center text-gray-500">
            <Icon icon="mingcute:search-line" width={48} height={48} class="mx-auto mb-2 opacity-50" />
            <p>検索結果が見つかりませんでした</p>
          </div>
        {/if}

        {#each filteredResult as item}
          <a
            href={item.url}
            class="block p-3 mb-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            on:click={closeSearch}
          >
            <h3 class="font-semibold text-[var(--text-color)] line-clamp-1">
              {item.meta.title}
            </h3>
            <div class="flex gap-2 mt-1 text-xs text-gray-500">
              {#if item.meta.category}
                <span>{item.meta.category}</span>
              {/if}
              {#if item.meta.readingTime}
                <span>{item.meta.readingTime}分</span>
              {/if}
            </div>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {@html item.excerpt}
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  input {
    -webkit-appearance: none;
  }
</style>