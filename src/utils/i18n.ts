/**
 * 多言語対応のユーティリティ関数
 */

export type Language = 'ja' | 'en';

export const LANGUAGES: Record<Language, string> = {
  ja: '日本語',
  en: 'English'
};

export const DEFAULT_LANGUAGE: Language = 'ja';

/**
 * ブラウザの言語設定を取得
 */
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('en')) return 'en';
  
  return DEFAULT_LANGUAGE;
}

/**
 * LocalStorageから言語設定を取得
 */
export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('preferred-language');
  if (stored === 'ja' || stored === 'en') {
    return stored;
  }
  
  return null;
}

/**
 * 言語設定を保存
 */
export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('preferred-language', lang);
}

/**
 * 現在の言語を取得（優先順位: LocalStorage > ブラウザ設定 > デフォルト）
 */
export function getCurrentLanguage(): Language {
  return getStoredLanguage() || getBrowserLanguage() || DEFAULT_LANGUAGE;
}

/**
 * URLに言語パラメータを追加/更新
 */
export function updateUrlLanguage(url: string, lang: Language): string {
  const urlObj = new URL(url, window.location.origin);
  
  if (lang === DEFAULT_LANGUAGE) {
    urlObj.searchParams.delete('lang');
  } else {
    urlObj.searchParams.set('lang', lang);
  }
  
  return urlObj.toString();
}

/**
 * URLから言語パラメータを取得
 */
export function getUrlLanguage(url: string): Language | null {
  const urlObj = new URL(url, window.location.origin);
  const lang = urlObj.searchParams.get('lang');
  
  if (lang === 'ja' || lang === 'en') {
    return lang;
  }
  
  return null;
}