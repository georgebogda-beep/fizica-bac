/* Service worker: păstrează aplicația în telefon ca să meargă și fără internet.
   Când schimbi ceva în aplicație, mărește VERSION ca telefoanele să ia varianta nouă. */
const VERSION = 'fizbac-v1';
const FILES = [
  './', './index.html', './manifest.webmanifest', './fonts/fonts.css',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  ...Array.from({ length: 12 }, (_, i) => `./fonts/f${i + 1}.woff2`)
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* pagina: întâi rețeaua (ca să vină actualizările), cache dacă nu e internet;
   restul (fonturi, iconițe): întâi cache-ul */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
