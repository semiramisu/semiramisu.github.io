import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "セミラミスの庭",
  subTitle: "日々の発見と思いを綴る、知識と経験の交差点",
  brandTitle: "semiramisu",

  description: "IT、健康、仕事、趣味など様々なテーマについての考察や体験を共有するブログ",

  site: "http://semiramisu.com/",

  locale: "ja", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/semiramisu",  // GitHub アカウントページに直接リンク
    },
    {
      nameKey: I18nKeys.nav_bar_x,
      href: "https://x.com/semiramisuWeb3?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3AsemiramisuWeb3%7Ctwcon%5Es1",
    },
  ],

  username: "semiramisu",
  sign: "Ad Astra Per Aspera.",
  avatarUrl: "/icon.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/semiramisu",
    },
    {
      icon: "line-md:twitter-x",
      link: "https://x.com/semiramisuWeb3",
    },

  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "/IMG_3258.jpg",
    "/IMG_4018.jpg",
    "/IMG_4033.JPG",
    "/IMG_4035.JPG",
    "/IMG_4345.jpg",
  ],

  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default YukinaConfig;
