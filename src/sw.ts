/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'work-box-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(({ request }) => request.destination === 'image', new StaleWhileRevalidate({ cacheName: 'images' }));

self.addEventListener('push', (e) => {
  const data = e.data?.json() ?? {};
  e.waitUntil(
    self.registration.showNotification('NeuroVibe', {
      body: data.body ?? 'Время потренировать мозг!',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: 'daily-quest',
      actions: [{ action: 'open', title: 'Играть' ],
    })
  );
});
