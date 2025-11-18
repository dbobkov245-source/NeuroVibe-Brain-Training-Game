// src/sw.ts
/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST || []);

cleanupOutdatedCaches();

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

registerRoute(
  ({ request }) => request.mode === 'navigate',
  async () => {
    try {
      return await fetch('/offline.html');
    } catch {
      const cache = await caches.open('workbox-precache');
      const response = await cache.match('/offline.html');
      return response || new Response('Offline content not available', { status: 503 });
    }
  }
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico|woff2?)$/,
  new StaleWhileRevalidate({
    cacheName: 'assets',
  })
);
