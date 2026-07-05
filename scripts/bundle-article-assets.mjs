import { build as viteBuild, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TEMP_OUT = join(ROOT, '.article-assets');
const PUBLIC_OUT = join(ROOT, 'public/article-assets');

export async function bundleArticleAssets() {
  const env = loadEnv('production', ROOT, '');
  await viteBuild({
    root: ROOT,
    configFile: false,
    plugins: [tailwindcss()],
    logLevel: 'warn',
    define: {
      __APP_STORE_URL__: JSON.stringify(env.VITE_APP_STORE_URL ?? ''),
      __PLAY_STORE_URL__: JSON.stringify(env.VITE_PLAY_STORE_URL ?? ''),
      __CONTACT_EMAIL__: JSON.stringify(env.VITE_CONTACT_EMAIL ?? ''),
      __SUPPORT_PHONE__: JSON.stringify(env.VITE_SUPPORT_PHONE ?? ''),
    },
    build: {
      emptyOutDir: true,
      outDir: TEMP_OUT,
      copyPublicDir: false,
      rollupOptions: {
        input: { articles: resolve(ROOT, 'src/articles.js') },
        output: {
          entryFileNames: 'articles.js',
          assetFileNames: (assetInfo) => {
            const names = assetInfo.names ?? [];
            if (names.some((n) => n.endsWith('.css'))) return 'articles.css';
            return '[name][extname]';
          },
        },
      },
    },
  });

  fs.mkdirSync(PUBLIC_OUT, { recursive: true });
  for (const file of ['articles.js', 'articles.css']) {
    fs.copyFileSync(join(TEMP_OUT, file), join(PUBLIC_OUT, file));
  }
}

if (process.argv[1]?.endsWith('bundle-article-assets.mjs')) {
  bundleArticleAssets().then(() => console.log('Bundled article assets → public/article-assets/'));
}
