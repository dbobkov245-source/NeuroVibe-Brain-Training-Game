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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,ts,tsx}']
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
        ]
      },
    })
  ],
})
