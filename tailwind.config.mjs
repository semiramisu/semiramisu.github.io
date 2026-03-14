/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        "primary-soft": "var(--primary-color-lighten)",
        accent: "var(--accent-color)",
        "accent-dark": "var(--accent-color-darken)",
        "accent-light": "var(--accent-color-lighten)",
        background: "var(--background-color)",
        surface: "var(--card-color)",
        border: "var(--border-color)",
        text: {
          DEFAULT: "var(--text-color)",
          sub: "var(--text-color-lighten)",
        },
      },
      fontFamily: {
        brand: ["var(--brand-font)"],
        heading: ["var(--title-font)"],
        body: ["var(--primary-font)"],
        code: ["var(--code-font)"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        hover: "var(--shadow-hover)",
        subtle: "var(--shadow-subtle)",
        medium: "var(--shadow-medium)",
        dramatic: "var(--shadow-dramatic)",
      },
      maxWidth: {
        layout: "var(--page-width-xl)",
      },
      animation: {
        "gradient-rotate": "gradient-rotate 4s linear infinite",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "blur-in": "blur-in 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
