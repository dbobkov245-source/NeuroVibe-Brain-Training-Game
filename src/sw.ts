/// <reference lib="webworker" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst, CacheOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 })
    ],
    networkTimeoutSeconds: 3
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-cache',
    plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 })]
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|ico|webp)$/i,
  new StaleWhileRevalidate({
    cacheName: 'images-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 }),
      new CacheableResponsePlugin({ statuses: [0, 200] })
    ]
  })
);

const OFFLINE_PAGE = '/offline.html';

registerRoute(
  OFFLINE_PAGE,
  new CacheOnly({ cacheName: 'offline-cache' })
);

// ИСПРАВЛЕНИЕ: Добавлена типизация FetchEvent
self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open('offline-cache');
        const cachedResponse = await cache.match(OFFLINE_PAGE);
        return cachedResponse || new Response('Offline', { status: 503 });
      })
    );
  }
});

// ИСПРАВЛЕНИЕ: Добавлена типизация SyncEvent
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'sync-game-progress') {
    event.waitUntil(syncGameProgress());
  }
});

async function syncGameProgress() {
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage({ type: 'SYNC_COMPLETE' }));
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
