/**
 * Site-wide configuration. Single source of truth for metadata,
 * social links, and listing behavior.
 */
export const SITE = {
  title: "セミラミスの庭",
  subtitle: "日々の発見と思いを綴る、知識と経験の交差点",
  brand: "semiramisu",
  description:
    "IT、健康、仕事、趣味など様々なテーマについての考察や体験を共有するブログ",
  url: "https://semiramisu.com/",
  locale: "ja",
  author: "semiramisu",
  sign: "Ad Astra Per Aspera.",

  github: "https://github.com/semiramisu",
  x: "https://x.com/sekine_DS",

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // Must stay at 6 so /2/ ... /41/ pagination URLs match the previous site
  pageSize: 6,
} as const;

export const NAV_ITEMS = [
  { href: "/", labelKey: "nav.home" },
  { href: "/archive/", labelKey: "nav.archive" },
  { href: "/about/", labelKey: "nav.about" },
  { href: "/contact/", labelKey: "nav.contact" },
] as const;
