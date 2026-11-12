/* Offline cache. غيّر رقم VERSION كل ما تعدّل في المنيو عشان الموبايلات تاخد التحديث */
const VERSION = "menu-2026-11-12-v4";
const FILES = ["./", "index.html", "style.css", "app.js", "data.js", "manifest.webmanifest", "config.js", "img/icon.svg", "img/logo.png", "img/americano.webp", "img/berry-white-mocha.webp", "img/campfire-mocha.webp", "img/cappuccino.webp", "img/caramel-high-rise.webp", "img/caramel-macchiato.webp", "img/caribou-cooler.webp", "img/coffeeless-cooler.webp", "img/cold-press.webp", "img/cortado.webp", "img/espresso-shaker.webp", "img/espresso.webp", "img/flat-white.webp", "img/freshly-brewed.webp", "img/fudgy-wudgy.webp", "img/herbal-tea.webp", "img/hibiscus-berries.webp", "img/hot-chocolate.webp", "img/latte.webp", "img/lite-latte.webp", "img/mango-orange.webp", "img/mint-condition-mocha.webp", "img/mocha.webp", "img/red-velvet.webp", "img/salted-caramel-budino.webp", "img/spanish-latte.webp", "img/strawberry-banana.webp", "img/tiramisu.webp", "img/turkish-coffee.webp", "img/turtle-mocha.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  // network-first so edits show up fast; fall back to cache when offline
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
});
