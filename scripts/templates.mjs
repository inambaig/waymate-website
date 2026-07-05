const ACCENT_MAP = {
  primary: {
    badge: 'art-badge--primary',
    card: 'art-card--primary',
    btn: 'art-btn--primary',
    glow: 'art-glow--primary',
  },
  secondary: {
    badge: 'art-badge--secondary',
    card: 'art-card--secondary',
    btn: 'art-btn--secondary',
    glow: 'art-glow--secondary',
  },
  tertiary: {
    badge: 'art-badge--tertiary',
    card: 'art-card--tertiary',
    btn: 'art-btn--tertiary',
    glow: 'art-glow--tertiary',
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function accentFor(category) {
  return ACCENT_MAP[category.accent] ?? ACCENT_MAP.primary;
}

function headBlock({ title, description, canonical, ogType = 'website', ogImage = null, articleMeta = null }) {
  const ogArticle =
    ogType === 'article' && articleMeta
      ? `
    <meta property="article:published_time" content="${escapeHtml(articleMeta.publishedTime)}" />
    <meta property="article:modified_time" content="${escapeHtml(articleMeta.modifiedTime)}" />
    <meta property="article:section" content="${escapeHtml(articleMeta.section)}" />
    <meta property="article:author" content="Waymate Team" />`
      : '';

  const ogImageTags = ogImage
    ? `
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:alt" content="${escapeHtml(articleMeta?.imageAlt ?? title)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />`
    : '';

  const jsonLdBlocks = [];
  if (articleMeta?.jsonLd) jsonLdBlocks.push(articleMeta.jsonLd);
  if (articleMeta?.faqJsonLd) jsonLdBlocks.push(articleMeta.faqJsonLd);
  const jsonLd = jsonLdBlocks.length
    ? jsonLdBlocks.map((ld) => `<script type="application/ld+json">${ld}</script>`).join('\n  ')
    : '';

  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonical)}" />
  <meta property="og:site_name" content="Waymate" />
  <meta property="og:locale" content="en_PK" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  ${ogImageTags}
  ${ogArticle}
  <meta name="theme-color" content="#ff9100" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" rel="stylesheet" />
  <link rel="stylesheet" href="/article-assets/articles.css" />
  <script>
    (function () {
      var ua = navigator.userAgent || '';
      var mode = /Android/i.test(ua) ? 'android' : /iPhone|iPad|iPod/i.test(ua) ? 'apple' : 'both';
      document.documentElement.dataset.storeMode = mode;
    })();
  </script>
  ${jsonLd}
</head>`;
}

function storeButtonsMarkup({ variant = 'nav' } = {}) {
  const apple = `<a href="#" class="art-store-btn" data-store="apple" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
      <span class="material-symbols-outlined art-store-btn-icon" aria-hidden="true">phone_iphone</span>
      <span class="art-store-btn-label">
        <span class="art-store-btn-kicker">Download on the</span>
        <span class="art-store-btn-name">App Store</span>
      </span>
    </a>`;

  const google = `<a href="#" class="art-store-btn" data-store="google" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
      <span class="material-symbols-outlined art-store-btn-icon" aria-hidden="true">shop</span>
      <span class="art-store-btn-label">
        <span class="art-store-btn-kicker">Get it on</span>
        <span class="art-store-btn-name">Google Play</span>
      </span>
    </a>`;

  return `<div class="art-store-group art-store-group--${variant}" data-store-group>${apple}${google}</div>`;
}

function siteHeader({ downloadHref = '/#download' } = {}) {
  return `<body class="art-body bg-background text-on-surface overflow-x-hidden">
  <a class="art-skip-link" href="#main-content">Skip to content</a>
  <div id="site-header" class="site-header">
    <nav
      id="site-nav"
      class="bg-white/80 backdrop-blur-xl rounded-full shadow-plump-neutral border-2 border-white"
    >
      <div class="flex justify-between items-center w-full px-4 md:px-6 py-3 max-w-max-width mx-auto">
        <a href="/" class="text-xl md:text-2xl font-black text-primary tracking-tighter flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-container text-2xl md:text-3xl">child_care</span>
          WAYMATE
        </a>

        <div class="hidden md:flex items-center space-x-8">
          <a class="text-on-surface-variant hover:text-primary transition-colors font-bold" href="/#features">Features</a>
          <a class="text-on-surface-variant hover:text-primary transition-colors font-bold" href="/#how-it-works">How It Works</a>
          <a class="text-on-surface-variant hover:text-primary transition-colors font-bold" href="/pricing.html">Pricing</a>
          <a class="text-on-surface-variant hover:text-primary transition-colors font-bold" href="/#cities">Cities</a>
          <a class="text-on-surface-variant hover:text-primary transition-colors font-bold" href="/articles/">Articles</a>
        </div>

        <div class="flex items-center gap-2">
          <a
            href="${escapeHtml(downloadHref)}"
            class="art-nav-get-app bg-primary-container text-on-primary font-black px-4 py-2 rounded-full border-2 border-black/10 cartoon-btn shadow-plump text-sm"
          >Get the App</a>
          ${storeButtonsMarkup({ variant: 'nav' })}
          <button
            id="nav-toggle"
            class="md:hidden flex flex-col gap-[5px] p-2 ml-1"
            aria-label="Toggle menu"
            aria-expanded="false"
          >
            <span class="block w-5 h-0.5 bg-on-surface rounded"></span>
            <span class="block w-5 h-0.5 bg-on-surface rounded"></span>
            <span class="block w-5 h-0.5 bg-on-surface rounded"></span>
          </button>
        </div>
      </div>
    </nav>

    <div id="nav-mobile-panel" class="nav-mobile-panel md:hidden">
      <div class="flex flex-col gap-4 font-bold">
        <a class="text-on-surface-variant" href="/#features">Features</a>
        <a class="text-on-surface-variant" href="/#how-it-works">How It Works</a>
        <a class="text-on-surface-variant" href="/pricing.html">Pricing</a>
        <a class="text-on-surface-variant" href="/#cities">Cities</a>
        <a class="text-on-surface-variant" href="/articles/">Articles</a>
        <a class="art-nav-panel-download text-primary-container" href="${escapeHtml(downloadHref)}">Get the App</a>
        ${storeButtonsMarkup({ variant: 'panel' })}
      </div>
    </div>
  </div>`;
}

function siteFooter() {
  const year = new Date().getFullYear();
  return `<footer class="art-footer">
    <div class="art-footer-grid">
      <div>
        <div class="art-footer-brand">
          <span class="material-symbols-outlined">auto_awesome</span>
          WAYMATE
        </div>
        <p class="art-footer-copy">The friendliest way to share your daily route across Pakistan.</p>
      </div>
      <div>
        <h6 class="art-footer-heading">Explore</h6>
        <ul class="art-footer-list">
          <li><a href="/#features">Features</a></li>
          <li><a href="/articles/">Articles</a></li>
          <li><a href="/#download">Download</a></li>
        </ul>
      </div>
      <div>
        <h6 class="art-footer-heading">Legal</h6>
        <ul class="art-footer-list">
          <li><a href="/terms-of-use.html">Terms of Use</a></li>
          <li><a href="/privacy-policy.html">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="art-footer-bottom">
      <p>© ${year} Waymate. Made with care for Pakistan's commuters.</p>
    </div>
  </footer>
  <script type="module" src="/article-assets/articles.js"></script>
</body>
</html>`;
}

function breadcrumbs(items) {
  const crumbs = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast) {
        return `<li class="art-crumb art-crumb--current" aria-current="page">${escapeHtml(item.label)}</li>`;
      }
      return `<li class="art-crumb"><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`;
    })
    .join('<li class="art-crumb-sep" aria-hidden="true"><span>/</span></li>');

  return `<nav class="art-breadcrumbs" aria-label="Breadcrumb">
    <ol class="art-breadcrumbs-list">${crumbs}</ol>
  </nav>`;
}

function articleCard(article, category, { delay = 0, basePath = '/articles' } = {}) {
  const accent = accentFor(category);
  const href = `${basePath}/${category.slug}/${article.slug}.html`;
  return `<article class="art-card ${accent.card} art-reveal" style="--reveal-delay:${delay}ms">
    <a class="art-card-link" href="${escapeHtml(href)}">
      <div class="art-card-top">
        <span class="art-badge ${accent.badge}">
          <span class="material-symbols-outlined">${escapeHtml(category.icon)}</span>
          ${escapeHtml(category.name)}
        </span>
        <span class="art-read-time">${article.readTime} min read</span>
      </div>
      <h3 class="art-card-title">${escapeHtml(article.title)}</h3>
      <p class="art-card-excerpt">${escapeHtml(article.description)}</p>
      <div class="art-card-meta">
        <time datetime="${escapeHtml(article.date)}">${formatDate(article.date)}</time>
        <span class="art-card-cta">Read article <span class="material-symbols-outlined">arrow_forward</span></span>
      </div>
    </a>
  </article>`;
}

function pagination({ category, currentPage, totalPages, basePath = '/articles' }) {
  if (totalPages <= 1) return '';

  const pageHref = (page) =>
    page === 1
      ? `${basePath}/${category.slug}/`
      : `${basePath}/${category.slug}/page/${page}.html`;

  const pages = [];
  for (let page = 1; page <= totalPages; page += 1) {
    const active = page === currentPage ? ' art-page-btn--active' : '';
    pages.push(
      `<a class="art-page-btn${active}" href="${escapeHtml(pageHref(page))}"${page === currentPage ? ' aria-current="page"' : ''}>${page}</a>`
    );
  }

  const prev =
    currentPage > 1
      ? `<a class="art-page-nav" href="${escapeHtml(pageHref(currentPage - 1))}" rel="prev"><span class="material-symbols-outlined">chevron_left</span> Previous</a>`
      : `<span class="art-page-nav art-page-nav--disabled"><span class="material-symbols-outlined">chevron_left</span> Previous</span>`;

  const next =
    currentPage < totalPages
      ? `<a class="art-page-nav" href="${escapeHtml(pageHref(currentPage + 1))}" rel="next">Next <span class="material-symbols-outlined">chevron_right</span></a>`
      : `<span class="art-page-nav art-page-nav--disabled">Next <span class="material-symbols-outlined">chevron_right</span></span>`;

  return `<nav class="art-pagination art-reveal" aria-label="Pagination">
    ${prev}
    <div class="art-page-list">${pages.join('')}</div>
    ${next}
  </nav>`;
}

export function renderArticlesIndex({ siteUrl, categories, articlesByCategory }) {
  const canonical = `${siteUrl}/articles/`;
  const sections = categories
    .map((category, sectionIndex) => {
      const articles = (articlesByCategory.get(category.slug) ?? []).slice(0, 2);
      const accent = accentFor(category);
      const cards = articles
        .map((article, index) => articleCard(article, category, { delay: sectionIndex * 40 + index * 30 }))
        .join('');

      return `<section class="art-category-section art-reveal" style="--reveal-delay:${sectionIndex * 50}ms" aria-labelledby="cat-${category.slug}">
        <div class="art-category-header">
          <div class="art-category-title-wrap">
            <span class="art-category-icon ${accent.glow}">
              <span class="material-symbols-outlined">${escapeHtml(category.icon)}</span>
            </span>
            <div>
              <h2 id="cat-${category.slug}" class="art-category-title">${escapeHtml(category.name)}</h2>
              <p class="art-category-desc">${escapeHtml(category.description)}</p>
            </div>
          </div>
          <a class="art-btn ${accent.btn}" href="/articles/${category.slug}/">View all <span class="material-symbols-outlined">arrow_forward</span></a>
        </div>
        <div class="art-card-grid">${cards}</div>
      </section>`;
    })
    .join('');

  const itemList = categories.flatMap((category) =>
    (articlesByCategory.get(category.slug) ?? []).slice(0, 2).map((article) => ({
      '@type': 'ListItem',
      name: article.title,
      url: `${siteUrl}/articles/${category.slug}/${article.slug}.html`,
    }))
  );

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Waymate Articles',
    description: 'Guides, tips, and stories about carpooling in Pakistan.',
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Waymate', url: siteUrl },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: itemList.map((item, index) => ({ ...item, position: index + 1 })),
    },
  });

  return `${headBlock({
    title: 'Articles — Waymate | Carpooling Tips & Guides for Pakistan',
    description:
      'Read Waymate articles on carpooling tips, city commute guides, saving money, safety, and green travel across Pakistan.',
    canonical,
    articleMeta: { jsonLd },
  })}
${siteHeader()}
<main id="main-content" class="art-main">
  <header class="art-hero art-hero--index art-reveal">
    <div class="art-hero-blob art-hero-blob--1"></div>
    <div class="art-hero-blob art-hero-blob--2"></div>
    <div class="art-hero-inner">
      <span class="art-hero-kicker">Knowledge Hub</span>
      <h1 class="art-hero-title">Smarter commutes start here</h1>
      <p class="art-hero-subtitle">Expert guides, local city tips, and carpooling advice built for Pakistan's daily riders and hosts.</p>
    </div>
  </header>
  <div class="art-container">${sections}</div>
</main>
${siteFooter()}`;
}

export function renderCategoryPage({
  siteUrl,
  category,
  articles,
  currentPage,
  totalPages,
  pageSize,
}) {
  const basePath = '/articles';
  const canonical =
    currentPage === 1
      ? `${siteUrl}/articles/${category.slug}/`
      : `${siteUrl}/articles/${category.slug}/page/${currentPage}.html`;

  const start = (currentPage - 1) * pageSize;
  const pageArticles = articles.slice(start, start + pageSize);

  const cards = pageArticles
    .map((article, index) => articleCard(article, category, { delay: index * 35 }))
    .join('');

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} — Waymate Articles`,
    description: category.description,
    url: canonical,
    isPartOf: { '@type': 'WebSite', name: 'Waymate', url: siteUrl },
  });

  return `${headBlock({
    title: `${category.name} — Waymate Articles`,
    description: category.description,
    canonical,
    articleMeta: { jsonLd },
  })}
${siteHeader()}
<main id="main-content" class="art-main">
  <header class="art-hero art-hero--category art-reveal">
    <div class="art-hero-blob art-hero-blob--1"></div>
    <div class="art-container art-container--narrow">
      ${breadcrumbs([
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/articles/' },
        { label: category.name, href: `/articles/${category.slug}/` },
      ])}
      <div class="art-category-hero">
        <span class="art-category-icon ${accentFor(category).glow}">
          <span class="material-symbols-outlined">${escapeHtml(category.icon)}</span>
        </span>
        <h1 class="art-hero-title">${escapeHtml(category.name)}</h1>
        <p class="art-hero-subtitle">${escapeHtml(category.description)}</p>
        <p class="art-result-count">${articles.length} article${articles.length === 1 ? '' : 's'}</p>
      </div>
    </div>
  </header>
  <div class="art-container">
    <div class="art-card-grid art-card-grid--category">${cards}</div>
    ${pagination({ category, currentPage, totalPages, basePath })}
  </div>
</main>
${siteFooter()}`;
}

function renderFaqSection(faq) {
  if (!faq?.length) return '';

  const items = faq
    .map(
      (item) => `<details class="art-faq-item art-reveal">
    <summary class="art-faq-question">${escapeHtml(item.q)}</summary>
    <p class="art-faq-answer">${escapeHtml(item.a)}</p>
  </details>`
    )
    .join('');

  return `<section class="art-faq art-reveal" aria-labelledby="faq-heading">
    <h2 id="faq-heading">Frequently asked questions</h2>
    <div class="art-faq-list">${items}</div>
  </section>`;
}

function buildFaqJsonLd(faq) {
  if (!faq?.length) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  });
}

function featuredImageBlock(article) {
  if (!article.image) return '';
  const alt = escapeHtml(article.imageAlt ?? article.title);
  return `<figure class="art-featured-image art-reveal">
    <img src="${escapeHtml(article.image)}" alt="${alt}" width="1200" height="630" loading="eager" decoding="async" />
  </figure>`;
}

export function renderArticlePage({ siteUrl, category, article, related, htmlBody }) {
  const canonical = `${siteUrl}/articles/${category.slug}/${article.slug}.html`;
  const accent = accentFor(category);
  const ogImage = article.image ? `${siteUrl}${article.image}` : null;

  const relatedCards = related
    .map((item, index) => articleCard(item, category, { delay: index * 40 }))
    .join('');

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { '@type': 'Organization', name: 'Waymate Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'Waymate',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    articleSection: category.name,
    inLanguage: 'en-PK',
  };
  if (ogImage) {
    articleJsonLd.image = [ogImage];
  }

  const faqJsonLd = buildFaqJsonLd(article.faq);

  return `${headBlock({
    title: `${article.title} — Waymate`,
    description: article.description,
    canonical,
    ogType: 'article',
    ogImage,
    articleMeta: {
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      section: category.name,
      imageAlt: article.imageAlt,
      jsonLd: JSON.stringify(articleJsonLd),
      faqJsonLd,
    },
  })}
${siteHeader({ downloadHref: '#article-download' })}
<main id="main-content" class="art-main">
  <article class="art-article">
    <header class="art-article-header art-reveal">
      <div class="art-container art-container--article">
        ${breadcrumbs([
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles/' },
          { label: category.name, href: `/articles/${category.slug}/` },
          { label: article.title, href: '#' },
        ])}
        <span class="art-badge ${accent.badge}">
          <span class="material-symbols-outlined">${escapeHtml(category.icon)}</span>
          ${escapeHtml(category.name)}
        </span>
        <h1 class="art-article-title">${escapeHtml(article.title)}</h1>
        <p class="art-article-deck">${escapeHtml(article.description)}</p>
        <div class="art-article-meta">
          <time datetime="${escapeHtml(article.date)}">${formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>${article.readTime} min read</span>
          ${article.updated ? `<span aria-hidden="true">·</span><span>Updated ${formatDate(article.updated)}</span>` : ''}
        </div>
      </div>
    </header>
    ${featuredImageBlock(article)}
    <div class="art-container art-container--article">
      <div class="art-prose art-reveal" style="--reveal-delay:60ms">${htmlBody}</div>
      ${renderFaqSection(article.faq)}
      <aside class="art-related art-reveal" style="--reveal-delay:100ms">
        <h2>More in ${escapeHtml(category.name)}</h2>
        <div class="art-card-grid art-card-grid--related">${relatedCards}</div>
      </aside>
      <div class="art-article-cta art-reveal" id="article-download" style="--reveal-delay:130ms">
        <h2>Ready to carpool?</h2>
        <p>Download Waymate and turn your daily commute into a shared ride.</p>
        ${storeButtonsMarkup({ variant: 'cta' })}
      </div>
    </div>
  </article>
</main>
${siteFooter()}`;
}
