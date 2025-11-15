import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkOnly'
          }
        ],
        globPatterns: ['**/*.{js,css,html,ico,svg,png}']
      },
      includeAssets: ['favicon.ico', 'icon.svg'],
      manifest: {
        name: 'NeuroVibe: Brain Training Game',
        short_name: 'NeuroVibe',
        description: 'An interactive chat-based game designed to train memory and cognitive skills through word challenges, story comprehension, and association tests, powered by the Gemini API.',
        theme_color: '#6d28d9',
        background_color: '#f9fafb',
        display: 'standalone',
        display_override: ["standalone", "minimal-ui"],
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        lang: 'ru',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/screenshots/screenshot-mobile-1.png',
            sizes: '1080x1920',
            type: 'image/png',
            form_factor: 'narrow'
          },
          {
            src: '/screenshots/screenshot-desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide'
          }
        ],
        shortcuts: [
          {
            name: "Начать игру 'Слова'",
            short_name: "Слова",
            description: "Начать новую игру на запоминание слов",
            url: "/?mode=words",
            icons: [{ "src": "/icon.svg", "sizes": "any" }]
          },
          {
            name: "Начать игру 'История'",
            short_name: "История",
            description: "Начать новую игру на понимание истории",
            url: "/?mode=story",
            icons: [{ "src": "/icon.svg", "sizes": "any" }]
          },
          {
            name: "Начать игру 'Ассоциации'",
            short_name: "Ассоциации",
            description: "Начать новую игру на ассоциативное мышление",
            url: "/?mode=associations",
            icons: [{ "src": "/icon.svg", "sizes": "any" }]
          }
        ]
      },
    })
  ],
})