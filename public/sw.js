/* eslint-disable no-restricted-globals */

const CACHE_NAME = "offline-cache";
const OFFLINE_URL = "/offline-mode.png";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll([
        OFFLINE_URL,
        // Add any other assets you want to cache here
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
