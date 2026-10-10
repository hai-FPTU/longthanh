/* Lưu đệm giáo trình để mở được khi mạng yếu hoặc mất mạng.
   Chiến lược: luôn lấy bản mới từ mạng; chỉ dùng bản lưu khi mất mạng.
   Khi cập nhật nội dung, tăng số VERSION để xóa bản lưu cũ. */
const VERSION = 'ltks-v1';
const ASSETS = [
  './',
  'assets/css/base.css',
  'assets/css/content.css',
  'assets/css/layout.css',
  'assets/css/lt.css',
  'assets/css/lt2.css',
  'assets/css/mobile.css',
  'assets/css/print.css',
  'assets/css/widgets.css',
  'assets/img/favicon.svg',
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'assets/js/config.js',
  'assets/js/core/app.js',
  'assets/js/core/icons.js',
  'assets/js/core/render.js',
  'assets/js/core/util.js',
  'assets/js/data/course.js',
  'assets/js/data/prompts.js',
  'assets/js/data/quiz.js',
  'assets/js/data/topics.js',
  'assets/js/pages/assess.js',
  'assets/js/pages/extra.js',
  'assets/js/pages/home.js',
  'assets/js/widgets/common.js',
  'assets/js/widgets/lt-cd1.js',
  'assets/js/widgets/lt-cd3.js',
  'assets/js/widgets/lt-cd5.js',
  'assets/js/widgets/lt-cd6.js',
  'assets/js/widgets/lt-core.js',
  'assets/js/widgets/lt2.js',
  'assets/vendor/qrcode.js',
  'index.html',
  'manifest.webmanifest'
];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !font) return;
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(function (res) {
    if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req.mode === 'navigate' ? 'index.html' : req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req.mode === 'navigate' ? 'index.html' : req).then(function (hit) { return hit || caches.match(req, { ignoreSearch: true }); });
  }));
});
