/**
 * 日本語と英語の混在テキストに対応した読了時間計算ユーティリティ
 */

// 日本語文字（ひらがな、カタカナ、漢字）の正規表現
const JAPANESE_CHAR_REGEX = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g;
// 英単語の正規表現
const ENGLISH_WORD_REGEX = /\b[\w']+\b/g;

// 読書速度の定数
const JAPANESE_READING_SPEED = 400; // 文字/分
const ENGLISH_READING_SPEED = 200; // 単語/分

export interface ReadingMetadata {
  time: number; // 読了時間（分）
  wordCount: number; // 単語数（日本語の場合は文字数）
}

/**
 * テキストから読了時間と単語数を計算する
 * @param text 計算対象のテキスト
 * @returns 読了時間と単語数のメタデータ
 */
export function calculateReadingTime(text: string): ReadingMetadata {
  // 日本語文字をカウント
  const japaneseChars = text.match(JAPANESE_CHAR_REGEX) || [];
  const japaneseCharCount = japaneseChars.length;
  
  // 日本語文字を除去して英単語をカウント
  const textWithoutJapanese = text.replace(JAPANESE_CHAR_REGEX, ' ');
  const englishWords = textWithoutJapanese.match(ENGLISH_WORD_REGEX) || [];
  const englishWordCount = englishWords.length;
  
  // 読了時間を計算
  const japaneseReadingTime = japaneseCharCount / JAPANESE_READING_SPEED;
  const englishReadingTime = englishWordCount / ENGLISH_READING_SPEED;
  const totalReadingTime = Math.max(1, Math.round(japaneseReadingTime + englishReadingTime));
  
  // 総単語数（日本語の場合は文字数として扱う）
  const totalWordCount = japaneseCharCount + englishWordCount;
  
  return {
    time: totalReadingTime,
    wordCount: totalWordCount
  };
}

/**
 * Markdown/HTMLコンテンツから読了時間を計算する
 * HTMLタグやMarkdown記法を除去してから計算
 * @param content Markdown/HTMLコンテンツ
 * @returns 読了時間と単語数のメタデータ
 */
export function calculateReadingTimeFromContent(content: string): ReadingMetadata {
  // HTMLタグを除去
  let text = content.replace(/<[^>]*>/g, ' ');
  
  // Markdown記法を除去
  text = text
    // 見出し
    .replace(/^#+\s+/gm, '')
    // リンク
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // 画像
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // 強調
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    // コードブロック
    .replace(/```[\s\S]*?```/g, '')
    // インラインコード
    .replace(/`([^`]+)`/g, '$1')
    // 引用
    .replace(/^>\s+/gm, '')
    // 水平線
    .replace(/^[-*_]{3,}$/gm, '')
    // リスト記号
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '');
  
  return calculateReadingTime(text);
}