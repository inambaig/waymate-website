# Waymate Website

Static marketing website for [Waymate](https://waymate.pk) — **Kinetic Play** design system with a fun, bubbly carpooling landing page.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Articles (SEO Blog)

Articles are stored as Markdown in `content/articles/{category}/{slug}.md` and compiled to static HTML at build time.

```bash
# Seed initial articles (safe to re-run — skips existing files)
npm run seed:articles

# Regenerate article HTML manually
npm run build:articles

# Full build (articles + site)
npm run build
```

### Adding a new article

1. Create `content/articles/{category-slug}/my-article.md` with frontmatter:

```markdown
---
title: "Your Article Title"
description: "SEO meta description (150–160 chars)."
date: 2025-07-01
updated: 2026-03-01
readTime: 6
slug: my-article
image: /article-images/default-og.jpg
imageAlt: "Descriptive alt text for the hero image"
faq:
  - q: "Common question?"
    a: "Clear, helpful answer."
---

Article body in markdown with internal links like [Lahore guide](/articles/city-guides/carpooling-lahore-guide.html)...
```

2. Run `npm run build` and deploy.

**SEO upgrade scripts:**

```bash
npm run setup:images      # download hero images to public/article-images/
npm run upgrade:articles  # apply pillar + tier-2 content upgrades
```

Generated pages live at `/articles/`, `/articles/{category}/`, and `/articles/{category}/{slug}.html`.

**Sitemaps** (regenerated on `npm run build:articles`):

| File | Contents |
|------|----------|
| `/sitemap.xml` | Index pointing to pages + articles sitemaps |
| `/sitemap-pages.xml` | Homepage, pricing, privacy, terms |
| `/sitemap-articles.xml` | All article hub, category, and article URLs |


## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APP_STORE_URL` | Apple App Store link |
| `VITE_PLAY_STORE_URL` | Google Play Store link |
| `VITE_CONTACT_EMAIL` | Footer contact email |
| `VITE_SUPPORT_PHONE` | Footer phone number |
| `VITE_SITE_URL` | Canonical site URL |
| `VITE_DEMO_VIDEO_ID` | YouTube video ID for mobile hero demo (default: `mhZM_GSgdFU`) |

The mobile hero phone mockup embeds the YouTube Short with autoplay + mute. Change `VITE_DEMO_VIDEO_ID` to swap the demo later.

## Design

- **Typography:** Quicksand
- **Theme:** Kinetic Play — orange `#ff9100`, green `#006e1c`, yellow `#f9e534`, background `#f4fafd`
- **Mobile:** Phone mockup with YouTube demo, stacked cards, "Get the App" nav CTA
- **Desktop:** Two-column hero with 3D illustration, bento feature grid, pill nav

## Deploy on Vercel

1. Push repo to GitHub
2. Import project on Vercel (Framework: Vite, Output: `dist`)
3. Add all `VITE_*` env vars in project settings
4. Deploy
