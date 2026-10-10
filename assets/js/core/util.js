/* Tiện ích dùng chung: tạo phần tử, lưu trữ cục bộ, con dấu, thông báo. */
(function (A) {
  'use strict';
  function h(tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') { for (const sk in v) { if (sk.slice(0, 2) === '--') el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; } }
      else el.setAttribute(k, v === true ? '' : v);
    }
    const kids = Array.prototype.slice.call(arguments, 2).flat(Infinity);
    kids.forEach(function (c) {
      if (c == null || c === false) return;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return el;
  }
  const NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null) continue;
      if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    Array.prototype.slice.call(arguments, 2).flat(Infinity).forEach(function (c) { if (c) el.append(c); });
    return el;
  }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  const store = {
    get: function (k, d) { try { const v = localStorage.getItem('ltks.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('ltks.' + k, JSON.stringify(v)); } catch (e) { /* bỏ qua khi trình duyệt chặn lưu trữ */ } },
    del: function (k) { try { localStorage.removeItem('ltks.' + k); } catch (e) { } }
  };
  function stamp(host, text, kind) {
    Array.prototype.forEach.call(host.querySelectorAll(':scope > .stamp'), function (x) { x.remove(); });
    const st = h('div', { class: 'stamp stamp-' + (kind || 'bad'), 'aria-hidden': 'true' }, text);
    host.append(st);
    return st;
  }
  let toastTimer;
  function toast(msg, kind) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'show ' + (kind || '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.className = ''; }, 3600);
  }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function onVisible(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } });
    }, { threshold: 0.3 });
    io.observe(el);
  }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, reduced() ? Math.min(ms, 80) : ms); }); }
  function download(name, text, type) {
    const blob = new Blob(['\ufeff' + text], { type: (type || 'text/csv') + ';charset=utf-8' });
    const a = h('a', { href: URL.createObjectURL(blob), download: name });
    document.body.append(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function csvCell(v) { v = String(v == null ? '' : v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
  /* Pháo giấy nhỏ khi hoàn thành bài tập */
  function confetti(host) {
    if (reduced() || !host) return;
    const box = h('div', { class: 'confetti', 'aria-hidden': 'true' });
    const colors = ['#0B63CE', '#F5B400', '#0B8A5F', '#E0457B', '#5B4BD6', '#19B5E8'];
    for (let i = 0; i < 26; i++) {
      const p = h('i'); p.style.left = (Math.random() * 100) + '%'; p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * .25) + 's'; p.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px'); p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      box.append(p);
    }
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.append(box); setTimeout(function () { box.remove(); }, 1800);
  }
  function copy(text, okMsg) {
    function done() { toast(okMsg || 'Đã sao chép. Dán vào Gemini, ChatGPT… để thử.', 'ok'); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, fallback); } else fallback();
    function fallback() { const t = h('textarea', { style: { position: 'fixed', opacity: '0' } }); t.value = text; document.body.append(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) { toast('Không sao chép được, hãy bôi đen và sao chép thủ công.', 'bad'); } t.remove(); }
  }
  A.util = { h: h, s: s, shuffle: shuffle, store: store, stamp: stamp, toast: toast, reduced: reduced, onVisible: onVisible, esc: esc, wait: wait, download: download, csvCell: csvCell, confetti: confetti, copy: copy };
  A.widgets = A.widgets || {};
  A.data = A.data || {};
  A.pages = A.pages || {};
})(window.ATTT = window.ATTT || {});
