const CACHE_NAME = "matodo-cache-v1";
const urlsToCache = ["/MaTodo/", "/MaTodo/index.html", "/MaTodo/Reminder.css", "/MaTodo/Reminder.js", "/MaTodo/manifest.json"];

self.addEventListener("install", (event) => {
     event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
     event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
