const CACHE_NAME = 'neurovibe-cache-v1';
const urlsToCacheOnInstall = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  // Removed icon-192.png and icon-512.png as they might not exist in the public folder,
  // causing the service worker installation to fail. The browser will still fetch them 
  // when needed based on the manifest file.
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Pre-cache the main app shell files.
        return cache.addAll(urlsToCacheOnInstall);
      })
  );
});

self.addEventListener('fetch', event => {
  // Let the browser handle non-GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For API calls, always go to the network.
  if (event.request.url.includes('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we have a cached response, return it.
        if (response) {
          return response;
        }

        // Otherwise, fetch from the network.
        return fetch(event.request).then(
          (networkResponse) => {
            // Check if we received a valid response.
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              return networkResponse;
            }
            
            if (networkResponse.type === 'opaque') {
                return networkResponse;
            }

            // Clone the response stream.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(error => {
            console.error('Fetching failed:', error);
            // You could return a custom offline page here if you have one.
            throw error;
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
