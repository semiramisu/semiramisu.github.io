# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

「セミラミスの庭」(https://semiramisu.com/) — a Japanese personal blog built from scratch with Astro 6. The design system is "Magazine Grid": light-first editorial magazine aesthetic — paper background, heavy ink rules, bold gothic headlines, card grids, a vermilion accent, and a 9-color category palette. Plain readable typography for article prose. No CSS framework, no UI framework — plain CSS custom properties and vanilla scripts only.

## Essential Commands

```bash
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build (also runs Pagefind indexing)
pnpm preview      # Preview the production build
pnpm check        # astro check (type-check .astro files)
```

## Architecture

### Content
- **Posts**: `src/content/posts/*.md` (Japanese, filename = slug, e.g. `2025_03_05.md` → `/posts/2025_03_05/`)
- **Frontmatter**: `title`, `published` (required); `description`, `tags`, `category`, `draft` (optional). Schema in `src/content.config.ts`
- **Pages content**: `src/content/specs/` (about.md, privacy-policy.md)
- **Post images**: `src/content/posts/media/`, referenced relatively (`./media/...`), served via Netlify Image CDN

### Critical invariant: URL compatibility
Post URLs (`/posts/<filename>/`), category/tag URLs (raw Japanese slugs like `/categories/お金/`), and pagination (`/2/`–`/41/`, pageSize 6) must match the pre-rebuild site. giscus comments are mapped by pathname; changing a URL silently orphans its comment thread and SEO. `docs/url-inventory.txt` is the baseline — compare `dist/` against it after structural changes.

### Design system
- `src/styles/tokens.css` — all design tokens (colors, fonts, sizes). Light (paper) is default (`:root`), dark overrides under `html[data-theme="dark"]`. Includes the 9 category colors (`--cat-*`)
- `src/styles/global.css` — reset, base elements, magazine utilities (`.kicker`, `.meta-line`, `.chip`, `.rule-heavy`, `.display`) and the `[data-cat]` → `--cat` color wiring
- `src/styles/prose.css` — article body only. **Keep chrome motifs out of prose**; the article body stays plain for readability
- Category colors are display-layer only: `src/utils/categories.ts` maps raw category values (incl. typos/compounds) to 9 color groups. Raw values stay untouched in URLs and labels
- Latin display face is Archivo Black (@fontsource, masthead words / big dates / kickers / 404); JetBrains Mono is for code blocks only; body text uses system Japanese gothic fonts (no Japanese webfont by design)
- Cards (`PostCard.astro`) use a typographic date plate instead of images — ~85% of posts have no image, so the plate (category tint + huge day numeral) is the visual unit

### Key conventions
- Components are self-contained `.astro` files with scoped styles and (when needed) a small vanilla `<script>`. No Svelte/React
- Site metadata and nav live in `src/site.config.ts`
- i18n is client-side only: `?lang=en` swaps strings marked with `data-i18n="key"` (dictionary: `src/i18n/ui.ts`). The build output is always Japanese
- Monetization is env-gated: AdSense/GA/donation render only when `PUBLIC_GOOGLE_ADSENSE_CLIENT` / `PUBLIC_GA_MEASUREMENT_ID` / `PUBLIC_PAYPAY_ID` / `PUBLIC_BUYMEACOFFEE_URL` are set (configured in Netlify, see `.env.example`)
- giscus settings are hardcoded in `src/components/Comments.astro` — do not change `data-mapping="pathname"` or the repo/category IDs

### Deployment
- Netlify (Git integration on `main`), config in `netlify.toml` + `public/_headers` + `public/_redirects`
- `public/sw.js` is a **kill-switch service worker** that unregisters the old site's caching SW from visitors' browsers. Do not delete it and do not register a new SW
- Pagefind search index is generated during `pnpm build` into `dist/pagefind/`
