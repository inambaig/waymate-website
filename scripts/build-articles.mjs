import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  renderArticlesIndex,
  renderCategoryPage,
  renderArticlePage,
} from './templates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');
const OUTPUT_DIR = path.join(ROOT, 'public', 'articles');

const PAGE_SIZE = 10;
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://waymate.pk';

marked.setOptions({ gfm: true, breaks: false });

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function loadCategories() {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'categories.json'), 'utf8'));
}

function loadArticles() {
  const articles = [];

  if (!fs.existsSync(ARTICLES_DIR)) return articles;

  for (const categorySlug of fs.readdirSync(ARTICLES_DIR)) {
    const categoryPath = path.join(ARTICLES_DIR, categorySlug);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    for (const file of fs.readdirSync(categoryPath)) {
      if (!file.endsWith('.md')) continue;
      const raw = fs.readFileSync(path.join(categoryPath, file), 'utf8');
      const { data, content } = matter(raw);
      const date =
        data.date instanceof Date
          ? data.date.toISOString().split('T')[0]
          : String(data.date);
      const updated = data.updated
        ? data.updated instanceof Date
          ? data.updated.toISOString().split('T')[0]
          : String(data.updated)
        : undefined;
      articles.push({
        slug: data.slug ?? file.replace(/\.md$/, ''),
        category: categorySlug,
        title: data.title,
        description: data.description,
        date,
        updated,
        readTime: data.readTime ?? 5,
        image: data.image ?? null,
        imageAlt: data.imageAlt ?? null,
        faq: Array.isArray(data.faq) ? data.faq : null,
        body: content.trim(),
      });
    }
  }

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  ensureDir(dir);
}

function publishStaging(stagingDir) {
  const prevDir = `${OUTPUT_DIR}.prev`;
  if (fs.existsSync(prevDir)) {
    fs.rmSync(prevDir, { recursive: true, force: true });
  }
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.renameSync(OUTPUT_DIR, prevDir);
  }
  fs.renameSync(stagingDir, OUTPUT_DIR);
  if (fs.existsSync(prevDir)) {
    fs.rmSync(prevDir, { recursive: true, force: true });
  }
}

function createStagingDir() {
  return path.join(ROOT, `.article-build-${process.pid}-${Date.now()}`);
}

function urlEntry(loc, { changefreq = 'weekly', priority = '0.8' } = {}) {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function buildPagesSitemap() {
  const pages = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE_URL}/pricing.html`, priority: '0.9', changefreq: 'monthly' },
    { loc: `${SITE_URL}/privacy-policy.html`, priority: '0.4', changefreq: 'yearly' },
    { loc: `${SITE_URL}/terms-of-use.html`, priority: '0.4', changefreq: 'yearly' },
  ];

  const entries = pages.map((page) => urlEntry(page.loc, page)).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function buildSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-articles.xml</loc>
  </sitemap>
</sitemapindex>
`;
}

function buildSitemap(categories, articlesByCategory) {
  const urls = [`${SITE_URL}/articles/`];

  for (const category of categories) {
    const articles = articlesByCategory.get(category.slug) ?? [];
    const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
    urls.push(`${SITE_URL}/articles/${category.slug}/`);
    for (let page = 2; page <= totalPages; page += 1) {
      urls.push(`${SITE_URL}/articles/${category.slug}/page/${page}.html`);
    }
    for (const article of articles) {
      urls.push(`${SITE_URL}/articles/${category.slug}/${article.slug}.html`);
    }
  }

  const entries = urls
    .map(
      (url) => urlEntry(url, {
        priority: url.includes('.html') && !url.endsWith('/articles/') ? '0.8' : '0.9',
      })
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export function buildArticles() {
  const categories = loadCategories();
  const allArticles = loadArticles();

  const articlesByCategory = new Map();
  for (const category of categories) {
    articlesByCategory.set(category.slug, []);
  }
  for (const article of allArticles) {
    const list = articlesByCategory.get(article.category);
    if (list) list.push(article);
  }

  const stagingDir = createStagingDir();
  ensureDir(stagingDir);

  writeFile(
    path.join(stagingDir, 'index.html'),
    renderArticlesIndex({ siteUrl: SITE_URL, categories, articlesByCategory })
  );

  for (const category of categories) {
    const articles = articlesByCategory.get(category.slug) ?? [];
    const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));

    for (let page = 1; page <= totalPages; page += 1) {
      const html = renderCategoryPage({
        siteUrl: SITE_URL,
        category,
        articles,
        currentPage: page,
        totalPages,
        pageSize: PAGE_SIZE,
      });

      if (page === 1) {
        writeFile(path.join(stagingDir, category.slug, 'index.html'), html);
      } else {
        writeFile(path.join(stagingDir, category.slug, 'page', `${page}.html`), html);
      }
    }

    for (const article of articles) {
      const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
      const htmlBody = marked.parse(article.body);
      writeFile(
        path.join(stagingDir, category.slug, `${article.slug}.html`),
        renderArticlePage({
          siteUrl: SITE_URL,
          category,
          article,
          related,
          htmlBody,
        })
      );
    }
  }

  publishStaging(stagingDir);

  writeFile(path.join(ROOT, 'public', 'sitemap-articles.xml'), buildSitemap(categories, articlesByCategory));
  writeFile(path.join(ROOT, 'public', 'sitemap-pages.xml'), buildPagesSitemap());
  writeFile(path.join(ROOT, 'public', 'sitemap.xml'), buildSitemapIndex());

  const totalArticles = allArticles.length;
  console.log(`Built ${totalArticles} articles across ${categories.length} categories → public/articles/`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('build-articles.mjs')) {
  buildArticles();
}
