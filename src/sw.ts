/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" /> // ✅ Для __WB_MANIFEST

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope; // ✅ Правильный тип

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(({ request }) => request.destination === 'image', new StaleWhileRevalidate({ cacheName: 'images' }));

self.addEventListener('push', (e) => {
  const data = (e as PushEvent).data?.json() ?? {}; // ✅ Приведение типа
  e.waitUntil(
    self.registration.showNotification('NeuroVibe', {
      body: data.body ?? 'Время потренировать мозг!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'daily-quest',
      actions: [{ action: 'open', title: 'Играть' }],
    })
  );
});
