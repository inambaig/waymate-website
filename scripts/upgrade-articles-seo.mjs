/**
 * Applies SEO upgrades: pillar articles + tier-2 expansions.
 * Run: node scripts/upgrade-articles-seo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { PILLAR_ARTICLES } from './pillar-content.mjs';
import { buildTier2Upgrade } from './tier2-content.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = path.resolve(__dirname, '../content/articles');

const PILLAR_SLUGS = new Set(PILLAR_ARTICLES.map((a) => `${a.category}/${a.slug}`));

function discoverTier2() {
  const upgrades = [];
  for (const category of fs.readdirSync(ARTICLES_DIR)) {
    const categoryPath = path.join(ARTICLES_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    for (const file of fs.readdirSync(categoryPath)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      if (PILLAR_SLUGS.has(`${category}/${slug}`)) continue;
      const raw = fs.readFileSync(path.join(categoryPath, file), 'utf8');
      const { data } = matter(raw);
      const upgrade = buildTier2Upgrade(category, slug, data.title);
      if (upgrade) upgrades.push(upgrade);
    }
  }
  return upgrades;
}

function yamlQuote(str) {
  return `"${String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function faqToYaml(faq) {
  return faq
    .map(
      (item) => `  - q: ${yamlQuote(item.q)}
    a: ${yamlQuote(item.a)}`
    )
    .join('\n');
}

function writeArticle(article) {
  const filePath = path.join(ARTICLES_DIR, article.category, `${article.slug}.md`);
  const frontmatter = [
    '---',
    `title: ${yamlQuote(article.title)}`,
    `description: ${yamlQuote(article.description)}`,
    `date: ${article.date}`,
    article.updated ? `updated: ${article.updated}` : null,
    `readTime: ${article.readTime}`,
    `slug: ${article.slug}`,
    article.image ? `image: ${article.image}` : null,
    article.imageAlt ? `imageAlt: ${yamlQuote(article.imageAlt)}` : null,
    article.faq?.length ? `faq:\n${faqToYaml(article.faq)}` : null,
    '---',
    '',
    article.body.trim(),
    '',
  ]
    .filter(Boolean)
    .join('\n');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, frontmatter, 'utf8');
}

function patchTier2(upgrade) {
  const filePath = path.join(ARTICLES_DIR, upgrade.category, `${upgrade.slug}.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`skip missing: ${upgrade.category}/${upgrade.slug}`);
    return;
  }

  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  const key = `${upgrade.category}/${upgrade.slug}`;
  if (PILLAR_SLUGS.has(key)) return;

  const mergedBody = `${content.trim()}\n\n${upgrade.extraBody.trim()}`;
  writeArticle({
    category: upgrade.category,
    slug: upgrade.slug,
    title: data.title,
    description: upgrade.description ?? data.description,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
    updated: upgrade.updated ?? '2026-03-01',
    readTime: upgrade.readTime ?? data.readTime ?? 5,
    image: upgrade.image ?? data.image ?? '/article-images/default-og.jpg',
    imageAlt: upgrade.imageAlt ?? data.imageAlt ?? data.title,
    faq: upgrade.faq,
    body: mergedBody,
  });
}

let pillars = 0;
for (const article of PILLAR_ARTICLES) {
  writeArticle(article);
  pillars += 1;
}

let tier2 = 0;
for (const upgrade of discoverTier2()) {
  patchTier2(upgrade);
  tier2 += 1;
}

console.log(`Upgraded ${pillars} pillar articles and ${tier2} tier-2 articles.`);
