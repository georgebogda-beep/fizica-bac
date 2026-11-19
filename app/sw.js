/* Service worker: păstrează aplicația în telefon ca să meargă și fără internet.
   VERSION se mărește doar când se schimbă lista FILES sau logica de mai jos. */
const VERSION = 'fizbac-v7';
const FILES = [
  './', './index.html', './natura.js', './manifest.webmanifest', './fonts/fonts.css',
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

/* Ce schimbi pe site apare singur la următoarea deschidere (cu internet), fără VERSION nou:
   - pagina și scripturile (index.html, natura.js, manifest): întâi rețeaua, cache dacă nu e internet;
   - fonturi și iconițe: din cache imediat, iar în fundal se aduce varianta nouă pentru data viitoare. */
const fresh = (req, key) => fetch(req, { cache: 'no-cache' }).then(r => {
  if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(key || req, copy)); }
  return r;
}).catch(() => caches.match(key || req, { ignoreSearch: true }));

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(fresh(req, './index.html')); return; }
  if (/\.(js|webmanifest|json|html)$/.test(url.pathname)) { e.respondWith(fresh(req)); return; }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
