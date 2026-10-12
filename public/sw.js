// Kill-switch service worker.
// The previous site registered a caching SW on every visitor's browser.
// This replacement wipes all caches, unregisters itself, and reloads open
// tabs so returning visitors get the new site instead of stale caches.
// The old SW calls registration.update() hourly, so this propagates on its own.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
