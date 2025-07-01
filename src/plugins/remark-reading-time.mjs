import { toString as mdastToString } from "mdast-util-to-string";
// 共通の読了時間計算ロジックを使用
import { calculateReadingTime } from "../utils/reading-time.ts";

export function remarkReadingTime() {
  return (tree, { data }) => {
    const textOnPage = mdastToString(tree);
    const readingMetadata = calculateReadingTime(textOnPage);
    data.astro.frontmatter.readingMetadata = readingMetadata;
  };
}
