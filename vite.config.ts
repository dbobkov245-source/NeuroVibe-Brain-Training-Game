import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: VitePWAOptions = {
  registerType: 'prompt',
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  injectRegister: 'auto',
  workbox: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          cacheableResponse: { statuses: [0, 200] }
        }
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'images-cache',
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }
        }
      }
    ]
  },
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
  manifest: {
    name: 'NeuroVibe: Brain Training Game',
    short_name: 'NeuroVibe',
    description: 'Интерактивная игра для тренировки памяти и когнитивных навыков',
    theme_color: '#6d28d9',
    background_color: '#f9fafb',
    display: 'standalone',
    orientation: 'portrait-primary',
    start_url: '/',
    scope: '/',
    id: '/',
    lang: 'ru',
    categories: ['games', 'education', 'health'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'apple touch icon' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' }
    ],
    shortcuts: [
      {
        name: 'Слова',
        short_name: 'Слова',
        description: 'Начать игру на запоминание слов',
        url: '/?mode=words',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      },
      {
        name: 'История',
        short_name: 'История',
        description: 'Начать игру на понимание истории',
        url: '/?mode=story',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      },
      {
        name: 'Ассоциации',
        short_name: 'Ассоциации',
        description: 'Начать игру на ассоциативное мышление',
        url: '/?mode=associations',
        icons: [{ src: '/icon.svg', sizes: 'any' }]
      }
    ],
    share_target: {
      action: '/',
      method: 'GET',
      params: { title: 'title', text: 'text', url: 'url' }
    }
  },
  devOptions: { enabled: true, type: 'module' }
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
  server: {
    port: 3000,
    host: true,
    // Убран proxy loop - API работает напрямую через Vercel функции
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['./src/components/Icons']
        }
      }
    }
  }
});
