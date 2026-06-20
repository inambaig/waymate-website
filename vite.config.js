import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss()],
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
