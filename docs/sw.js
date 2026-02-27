const CACHE = 'dh-v10';
const STATIC = [
  '/deutsch-horen_a1-b1/',
  '/deutsch-horen_a1-b1/index.html',
  '/deutsch-horen_a1-b1/manifest.json',
  '/deutsch-horen_a1-b1/assets/index-aaf42fc0.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
