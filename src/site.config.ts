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
  note: "https://note.com/sekine_ds",

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },

  // Must stay at 6 so /2/ ... /41/ pagination URLs match the previous site
  pageSize: 6,
} as const;

// Uppercase Latin labels are part of the magazine masthead and need no i18n
export const NAV_ITEMS = [
  { href: "/tech/", label: "Tech" },
  { href: "/archive/", label: "Archive" },
  { href: "/categories/", label: "Categories" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

/** Content for the separate technical profile. Keep personal/professional
 * details here so the design stays independent from the personal blog. */
export const TECH_PROFILE = {
  title: "semiramisu | Tech",
  shortName: "semiramisu",
  role: "Data Science / Machine Learning",
  headline: "データと技術で、考えたことを形にする",
  bio:
    "データサイエンスを軸に、自然言語処理や健康データ分析、個人開発について考えています。実務や研究、日々の試行錯誤から得た知見を、再利用できる形で残していきます。",
  avatar: "/icon.jpg",
  socialLinks: [
    { label: "GitHub", href: SITE.github },
    { label: "X", href: SITE.x },
    { label: "note", href: SITE.note },
  ],
  skills: [
    {
      title: "Data & ML",
      items: ["Python", "SQL", "自然言語処理", "機械学習", "LLM"],
    },
    {
      title: "Analysis",
      items: ["データ分析", "統計", "健康データ", "可視化", "仮説検証"],
    },
    {
      title: "Engineering",
      items: ["GitHub", "AWS", "Terraform", "Snowflake", "dbt"],
    },
  ],
  researchIntro:
    "大学、大学院時に執筆した論文について掲載させて頂きます。健康データの分析やテキスト感情分析を行なっていました。",
  researchGroups: [
    {
      title: "ジャーナル（特別号）",
      kind: "Journal",
      items: [
        {
          title: "Improving emotion estimation through a combination of ChatGPT and deep learning",
          href: "https://www.tandfonline.com/doi/abs/10.1080/12460125.2024.2440024",
        },
      ],
    },
    {
      title: "国際会議",
      kind: "International Conference",
      items: [
        {
          title: "Influence Analysis of the Screen Time on Daily Exercise Based on the Personal Activity Factor Model",
          href: "https://ieeexplore.ieee.org/document/9929542",
        },
        {
          title: "Improving Emotion Classification by a Combination of Personal Texts and Social Big Data Based on Naive Bayes",
          href: "https://ieeexplore.ieee.org/document/10086337",
        },
        {
          title: "Weighted Consensus Framework for SNS Emotion Classification Based on LLM Reliability",
          href: "https://ieeexplore.ieee.org/document/11366814",
        },
      ],
    },
    {
      title: "国際会議（セカンドオーサー）",
      kind: "International Conference · Second Author",
      items: [
        {
          title: "Comparative Analysis of Relaxation Effects through Natural Experiences Using a VR Device",
          href: "https://ieeexplore.ieee.org/document/10505450",
        },
        {
          title: "Analysing Relaxation Effects Through Natural Experiences Using Natural Sounds and VR Devices",
          href: "https://ieeexplore.ieee.org/document/10935451",
        },
      ],
    },
  ],
  career: [
    {
      period: "現在",
      title: "データサイエンス / 機械学習",
      description: "業務データを使った課題発見、分析、モデル活用、開発プロセスの改善に取り組んでいます。",
    },
    {
      period: "研究",
      title: "自然言語処理 / 健康データ分析",
      description: "テキストデータや個人活動データを対象に、分析・推定手法を研究してきました。",
    },
  ],
} as const;
