var I18nKeys = /* @__PURE__ */ ((I18nKeys2) => {
  I18nKeys2["copy_right_author"] = "copy_right_author";
  I18nKeys2["copy_right_publish_date"] = "copy_right_publish_date";
  I18nKeys2["copy_right_license"] = "copy_right_license";
  I18nKeys2["nav_bar_home"] = "nav_bar_home";
  I18nKeys2["nav_bar_archive"] = "nav_bar_archive";
  I18nKeys2["nav_bar_about"] = "nav_bar_about";
  I18nKeys2["nav_bar_contact"] = "nav_bar_contact";
  I18nKeys2["nav_bar_github"] = "nav_bar_github";
  I18nKeys2["nav_bar_x"] = "nav_bar_x";
  I18nKeys2["nav_bar_search_placeholder"] = "nav_bar_search_placeholder";
  I18nKeys2["post_card_words"] = "post_card_words";
  I18nKeys2["post_card_minutes"] = "post_card_minutes";
  I18nKeys2["side_bar_categories"] = "side_bar_categories";
  I18nKeys2["side_bar_tags"] = "side_bar_tags";
  I18nKeys2["side_bar_view_more"] = "side_bar_view_more";
  I18nKeys2["archive_year_title_count"] = "archive_year_title_count";
  I18nKeys2["pages_categories_archive"] = "pages_categories_archive";
  I18nKeys2["pages_archive_archive"] = "pages_archive_archive";
  I18nKeys2["pages_tags_archive"] = "pages_tags_archive";
  I18nKeys2["pages_tags_title"] = "pages_tags_title";
  I18nKeys2["pages_categories_title"] = "pages_categories_title";
  I18nKeys2["featured_posts"] = "featured_posts";
  I18nKeys2["recent_posts"] = "recent_posts";
  I18nKeys2["explore_tags"] = "explore_tags";
  return I18nKeys2;
})(I18nKeys || {});

const YukinaConfig = {
  title: "セミラミスの庭",
  subTitle: "日々の発見と思いを綴る、知識と経験の交差点",
  brandTitle: "semiramisu",
  description: "IT、健康、仕事、趣味など様々なテーマについての考察や体験を共有するブログ",
  site: "http://semiramisu.com/",
  locale: "ja",
  // set for website language and date format
  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/"
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive"
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about"
    },
    {
      nameKey: I18nKeys.nav_bar_contact,
      href: "/contact"
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/semiramisu"
      // GitHub アカウントページに直接リンク
    },
    {
      nameKey: I18nKeys.nav_bar_x,
      href: "https://x.com/semiramisuWeb3?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3AsemiramisuWeb3%7Ctwcon%5Es1"
    }
  ],
  username: "semiramisu",
  sign: "Ad Astra Per Aspera.",
  avatarUrl: "/icon.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/semiramisu"
    },
    {
      icon: "line-md:twitter-x",
      link: "https://x.com/semiramisuWeb3"
    }
  ],
  maxSidebarCategoryChip: 6,
  // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,
  banners: [
    "/IMG_3258.jpg",
    "/IMG_4018.jpg",
    "/IMG_4033.JPG",
    "/IMG_4035.JPG",
    "/IMG_4345.jpg"
  ],
  slugMode: "HASH",
  // 'RAW' | 'HASH'
  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
  }};

export { I18nKeys as I, YukinaConfig as Y };
