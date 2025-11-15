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
        globPatterns: ['**/*.{js,css,html,ico,svg}']
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
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
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