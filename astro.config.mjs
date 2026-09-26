import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
export default defineConfig({
  site: SITE_URL || undefined,
  output: 'static',
  integrations: SITE_URL ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
