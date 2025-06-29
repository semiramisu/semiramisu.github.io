# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual blog built with Astro (Yukina theme), featuring Japanese and English content. The blog uses a modern SSG architecture with TypeScript, Tailwind CSS, and Svelte components.

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build for production
pnpm preview      # Preview production build

# Translation Management
pnpm translate:prepare    # Create translation prompts for posts
pnpm translate:apply      # Apply translated content

# Content Validation
node scripts/check-frontmatter.js         # Check post metadata
node scripts/check-frontmatter.js --fix   # Fix post metadata issues

# Image Optimization
node scripts/optimize-images.js [image-path]      # Optimize single image
node scripts/batch-optimize-images.js              # Optimize all images
```

## Architecture Overview

### Content Structure
- **Posts**: `src/contents/posts/` (Japanese) and `src/contents/posts/en/` (English)
- **Frontmatter**: Required fields: `title`, `published`, `description`, `tags`, `category`
- **Translation**: Posts can have `translatedFrom` and `translatedAt` metadata
- **Content Collections**: Defined in `src/content.config.ts` using Astro's content layer

### Key Components
- **Layouts**: `BaseLayout` → `MainLayout` → page-specific layouts
- **Routing**: File-based with dynamic routes for posts, categories, and tags
- **i18n**: Language switching via URL parameter `?lang=en` or `?lang=ja`
- **Search**: Implemented with Pagefind for full-text search
- **Images**: Automatic optimization with Sharp and responsive image generation

### Configuration
- **Site Config**: `yukina.config.ts` - main configuration (title, navigation, social links)
- **Build Config**: `astro.config.mjs` - Astro and integration settings
- **Deployment**: Netlify adapter configured, with headers in `public/_headers`

### Performance Features
- Progressive Web App (PWA) with service worker
- Image lazy loading and optimization
- Critical CSS inlining
- Resource prefetching
- Skeleton loaders for better perceived performance

### Development Patterns
- Use existing component patterns in `src/components/`
- Follow TypeScript strict mode conventions
- Tailwind CSS for styling with custom animations
- Svelte components for interactive elements (search, contact form)
- Markdown processing with remark/rehype plugins for math, TOC, and syntax highlighting