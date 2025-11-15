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
        display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        lang: 'ru',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
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
            form_factor: 'narrow',
            label: 'Game chat interface on mobile'
          },
          {
            src: '/screenshots/screenshot-desktop-1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Game mode selection on desktop'
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
        ],
        launch_handler: {
          client_mode: 'focus-existing'
        },
        edge_side_panel: {
// FIX: Corrected syntax for object property
          preferred_width: 480
        },
        related_applications: [
          // TODO: Замените на ваши реальные ID
          {
            "platform": "play",
            "url": "https://play.google.com/store/apps/details?id=com.example.neurovibe",
            "id": "com.example.neurovibe"
          },
          // TODO: Замените на ваш реальный URL
          {
            "platform": "itunes",
            "url": "https://itunes.apple.com/app/neurovibe/id123456789"
          }
        ]
      },
    })
  ],
})