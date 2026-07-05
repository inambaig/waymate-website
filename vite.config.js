import { defineConfig, loadEnv, build as viteBuild } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildArticles } from './scripts/build-articles.mjs';
import { bundleArticleAssets } from './scripts/bundle-article-assets.mjs';
import { injectPartials } from './scripts/partials.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

let buildInFlight = null;

async function buildAllArticles() {
  if (buildInFlight) return buildInFlight;

  buildInFlight = (async () => {
    buildArticles();
    await bundleArticleAssets();
  })();

  try {
    await buildInFlight;
  } finally {
    buildInFlight = null;
  }
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

function htmlPartialsPlugin() {
  const partialsDir = resolve(__dirname, 'partials');

  return {
    name: 'waymate-html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return injectPartials(html);
      },
    },
    configureServer(server) {
      server.watcher.add(partialsDir);
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(partialsDir)) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
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

      const watchPaths = [
          resolve(__dirname, 'content'),
          resolve(__dirname, 'src/articles.js'),
          resolve(__dirname, 'src/articles.css'),
          resolve(__dirname, 'scripts/templates.mjs'),
          resolve(__dirname, 'scripts/build-articles.mjs'),
          resolve(__dirname, 'partials'),
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
            file.includes('scripts/build-articles.mjs') ||
            file.includes('/partials/')
          ) {
            scheduleRebuild();
          }
        });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), htmlPartialsPlugin(), articlesPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          pricing: resolve(__dirname, 'pricing.html'),
          howItWorks: resolve(__dirname, 'how-it-works.html'),
          about: resolve(__dirname, 'about.html'),
          contact: resolve(__dirname, 'contact.html'),
        },
      },
    },
    server: {
      watch: {
        ignored: ['**/.article-build*/**', '**/.article-assets/**', '**/public/articles/**', '**/public/article-assets/**'],
      },
    },
    define: {
      __APP_STORE_URL__: JSON.stringify(env.VITE_APP_STORE_URL ?? ''),
      __PLAY_STORE_URL__: JSON.stringify(env.VITE_PLAY_STORE_URL ?? ''),
      __CONTACT_EMAIL__: JSON.stringify(env.VITE_CONTACT_EMAIL ?? ''),
      __SUPPORT_PHONE__: JSON.stringify(env.VITE_SUPPORT_PHONE ?? ''),
      __SITE_URL__: JSON.stringify(env.VITE_SITE_URL ?? 'https://waymate.pk'),
      __DEMO_VIDEO_ID__: JSON.stringify(env.VITE_DEMO_VIDEO_ID ?? 'mhZM_GSgdFU'),
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL ?? 'http://localhost:4000'),
    },
  };
});
