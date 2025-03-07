import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "セミラミスの庭",
  subTitle: "毎日成長 毎日更新 IT、健康、運動、音楽etc",
  brandTitle: "semiramisu",

  description: "blog site",

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
      href: "/github",
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
