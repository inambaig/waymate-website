import { defineConfig, loadEnv, build as viteBuild } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArticles } from './scripts/build-articles.mjs';
import { bundleArticleAssets } from './scripts/bundle-article-assets.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function buildAllArticles() {
  buildArticles();
  await bundleArticleAssets();
}

function articlesRoutingMiddleware(req, _res, next) {
  const url = (req.url ?? '').split('?')[0];

  if (url === '/articles' || url === '/articles/') {
    req.url = '/articles/index.html';
  } else if (/^\/articles\/[^/]+\/$/.test(url)) {
    req.url = `${url}index.html`;
  }

  next();
}

function articlesPlugin() {
  let rebuildQueue = Promise.resolve();
  let debounceTimer = null;

  function scheduleRebuild() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      rebuildQueue = rebuildQueue.then(() => buildAllArticles()).catch((err) => {
        console.error('[waymate-articles] rebuild failed:', err.message);
      });
    }, 300);
  }

  return {
    name: 'waymate-articles',
    async buildStart() {
      await buildAllArticles();
    },
    configureServer(server) {
      server.middlewares.use(articlesRoutingMiddleware);

      buildAllArticles().then(() => {
        const watchPaths = [
          resolve(__dirname, 'content'),
          resolve(__dirname, 'src/articles.js'),
          resolve(__dirname, 'src/articles.css'),
          resolve(__dirname, 'scripts/templates.mjs'),
          resolve(__dirname, 'scripts/build-articles.mjs'),
        ];
        for (const p of watchPaths) {
          server.watcher.add(p);
        }
        server.watcher.on('change', (file) => {
          if (
            file.includes('/content/') ||
            file.endsWith('articles.js') ||
            file.endsWith('articles.css') ||
            file.includes('scripts/templates.mjs') ||
            file.includes('scripts/build-articles.mjs')
          ) {
            scheduleRebuild();
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), articlesPlugin()],
    server: {
      watch: {
        ignored: ['**/.article-build/**', '**/.article-assets/**', '**/public/articles/**', '**/public/article-assets/**'],
      },
    },
    define: {
      __APP_STORE_URL__: JSON.stringify(env.VITE_APP_STORE_URL ?? ''),
      __PLAY_STORE_URL__: JSON.stringify(env.VITE_PLAY_STORE_URL ?? ''),
      __CONTACT_EMAIL__: JSON.stringify(env.VITE_CONTACT_EMAIL ?? ''),
      __SUPPORT_PHONE__: JSON.stringify(env.VITE_SUPPORT_PHONE ?? ''),
      __SITE_URL__: JSON.stringify(env.VITE_SITE_URL ?? 'https://waymate.pk'),
      __DEMO_VIDEO_ID__: JSON.stringify(env.VITE_DEMO_VIDEO_ID ?? 'mhZM_GSgdFU'),
    },
  };
});
