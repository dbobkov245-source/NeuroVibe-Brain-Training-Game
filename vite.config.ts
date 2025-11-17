import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
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
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'NeuroVibe: Brain Training Game',
        short_name: 'NeuroVibe',
        description: 'Интерактивная игра для тренировки памяти и когнитивных навыков',
        theme_color: '#6d28d9',
        background_color: '#f9fafb',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        lang: 'ru',
        categories: ['games', 'education', 'health'],
        start_url: '/',
        scope: '/',
        id: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon'
          },
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/screenshot-mobile-1.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Мобильный интерфейс игры'
          },
          {
            src: '/screenshots/screenshot-desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Выбор режима на десктопе'
          }
        ],
        shortcuts: [
          {
            name: 'Начать игру "Слова"',
            short_name: 'Слова',
            description: 'Начать новую игру на запоминание слов',
            url: '/?mode=words',
            icons: [{ src: '/icon.svg', sizes: 'any' }]
          },
          {
            name: 'Начать игру "История"',
            short_name: 'История',
            description: 'Начать новую игру на понимание истории',
            url: '/?mode=story',
            icons: [{ src: '/icon.svg', sizes: 'any' }]
          },
          {
            name: 'Начать игру "Ассоциации"',
            short_name: 'Ассоциации',
            description: 'Начать новую игру на ассоциативное мышление',
            url: '/?mode=associations',
            icons: [{ src: '/icon.svg', sizes: 'any' }]
          }
        ],
        share_target: {
          action: '/',
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',
          params: {
            title: 'title',
            text: 'text',
            url: 'url'
          }
        },
        launch_handler: {
          client_mode: 'focus-existing'
        },
        edge_side_panel: {
          preferred_width: 480
        }
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    port: 3000,
    host: true
  }
});
