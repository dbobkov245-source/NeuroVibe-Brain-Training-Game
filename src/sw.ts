// src/sw.ts
/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

declare const self: ServiceWorkerGlobalScope;

// Прекешируем всё, что собрал Vite
precacheAndRoute(self.__WB_MANIFEST || []);

// Очистка старых кешей
cleanupOutdatedCaches();

// Кеширование Google Fonts
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
  })
);

registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

// Оффлайн fallback
registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await fetch('/offline.html');
    } catch {
      return caches.match('/offline.html')!;
    }
  }
);

// Остальные ресурсы — StaleWhileRevalidate
registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico|woff2?)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
  })
);
