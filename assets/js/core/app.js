/* Điều hướng, thanh bên, chế độ trình chiếu, tiến độ học. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;
  const main = document.getElementById('main');
  const side = document.getElementById('sidebar');
  const order = ['', 'khao-sat', 'chuyen-de/1', 'chuyen-de/2', 'chuyen-de/3', 'chuyen-de/4', 'chuyen-de/5', 'kiem-tra', 'thu-vien-prompt', 'so-tay', 'phap-ly'];
  function route() { return (location.hash || '#/').replace(/^#\/?/, ''); }

  function nav() {
    const cur = route();
    const visited = U.store.get('visited', []);
    side.innerHTML = '';
    function link(r, num, title, sub, done) {
      return h('a', { class: 'nav-link' + (done ? ' done' : ''), href: '#/' + r, 'aria-current': cur === r ? 'page' : null },
        h('span', { class: 'nav-num' + (num ? '' : ' nav-dot') }, num || ''), h('span', { class: 'nav-t' }, title, sub ? h('small', {}, sub) : null));
    }
    side.append(h('div', { class: 'nav-group' }, link('', '', 'Giới thiệu chương trình'), link('khao-sat', '', 'Khảo sát đầu vào', A.config.schedule[0].time.split(' ')[0], !!U.store.get('pre', null))));
    [['Buổi sáng', [1, 2]], ['Buổi chiều', [3, 4, 5]]].forEach(function (g) {
      const box = h('div', { class: 'nav-group' }, h('h2', {}, g[0]));
      g[1].forEach(function (n) { const t = A.data.topics[n - 1]; box.append(link('chuyen-de/' + n, String(n), t.title, t.time, visited.indexOf(n) >= 0)); });
      side.append(box);
    });
    side.append(h('div', { class: 'nav-group' }, h('h2', {}, 'Thực hành và tổng kết'),
      link('kiem-tra', '', 'Bài kiểm tra cuối khóa', '', !!U.store.get('post', null)), link('thu-vien-prompt', '', 'Thư viện câu lệnh mẫu'), link('so-tay', '', 'Sổ tay bỏ túi'), link('phap-ly', '', 'Căn cứ pháp lý')));
    side.append(h('p', { class: 'nav-ver' }, A.config.version || ''));
    const pill = document.getElementById('progress');
    if (pill) pill.textContent = 'Đã học ' + visited.filter(function (n) { return n > 0; }).length + '/' + A.data.topics.length + ' chuyên đề';
  }

  function go() {
    const r = route();
    let page;
    const m = /^chuyen-de\/(\d)$/.exec(r);
    const P = { 'khao-sat': ['pre', 'Khảo sát đầu vào'], 'kiem-tra': ['post', 'Kiểm tra cuối khóa'], 'thu-vien-prompt': ['library', 'Thư viện câu lệnh mẫu'], 'so-tay': ['handbook', 'Sổ tay bỏ túi'], 'phap-ly': ['legal', 'Căn cứ pháp lý'] };
    if (m && A.data.topics[+m[1] - 1]) {
      const n = +m[1]; page = A.renderTopic(A.data.topics[n - 1]);
      const v = U.store.get('visited', []); if (v.indexOf(n) < 0) { v.push(n); U.store.set('visited', v); }
      document.title = 'Chuyên đề ' + n + ' – ' + A.config.shortCourse;
    } else if (P[r]) { page = A.pages[P[r][0]](); document.title = P[r][1] + ' – ' + A.config.shortCourse; }
    else { page = A.pages.home(); document.title = A.config.shortCourse + ' – Giáo trình tương tác'; }
    main.innerHTML = ''; main.append(page);
    document.body.classList.remove('nav-open'); menuBtn.setAttribute('aria-expanded', 'false');
    bottomNav();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    nav();
  }

  const menuBtn = document.getElementById('menu-btn');
  function setNav(open) { document.body.classList.toggle('nav-open', open); menuBtn.setAttribute('aria-expanded', String(open)); if (open) { const a = side.querySelector('[aria-current="page"]') || side.querySelector('a'); if (a) a.focus({ preventScroll: true }); } }
  menuBtn.addEventListener('click', function () { setNav(!document.body.classList.contains('nav-open')); });
  document.getElementById('backdrop').addEventListener('click', function () { setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setNav(false); menuBtn.focus(); } });

  /* Thanh chuyển trang dưới cùng trên điện thoại */
  const bnav = document.getElementById('bottom-nav');
  function label(r) {
    const L = { '': 'Giới thiệu', 'khao-sat': 'Khảo sát', 'kiem-tra': 'Kiểm tra', 'thu-vien-prompt': 'Câu lệnh mẫu', 'so-tay': 'Sổ tay', 'phap-ly': 'Pháp lý' };
    if (r in L) return L[r];
    const m = /^chuyen-de\/(\d)$/.exec(r); return m ? 'Chuyên đề ' + m[1] : '';
  }
  function bottomNav() {
    const r = route(), i = order.indexOf(r);
    bnav.innerHTML = '';
    const prev = i > 0 ? order[i - 1] : null, next = i >= 0 && i < order.length - 1 ? order[i + 1] : null;
    bnav.append(
      prev != null ? h('a', { class: 'bn-btn bn-prev', href: '#/' + prev }, h('small', {}, 'Trước'), label(prev)) : h('span', { class: 'bn-btn bn-empty' }),
      h('button', { class: 'bn-btn bn-menu', type: 'button', onclick: function () { setNav(!document.body.classList.contains('nav-open')); } }, h('small', {}, 'Mục lục'), label(r) || 'Trang'),
      next != null ? h('a', { class: 'bn-btn bn-next', href: '#/' + next }, h('small', {}, 'Tiếp'), label(next)) : h('span', { class: 'bn-btn bn-empty' }));
  }
  const pj = document.getElementById('projector-btn');
  function setPj(on) { document.body.classList.toggle('projector', on); pj.setAttribute('aria-pressed', String(on)); U.store.set('projector', on); }
  pj.addEventListener('click', function () { setPj(!document.body.classList.contains('projector')); });
  setPj(!!U.store.get('projector', false));

  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea, select, [contenteditable]') || e.altKey || e.ctrlKey || e.metaKey) return;
    const i = order.indexOf(route());
    if (e.key === 'ArrowRight' && i >= 0 && i < order.length - 1) location.hash = '#/' + order[i + 1];
    if (e.key === 'ArrowLeft' && i > 0) location.hash = '#/' + order[i - 1];
  });
  window.addEventListener('hashchange', go);
  A.app = { go: go, refreshNav: nav };
  go();

  /* Lưu đệm để dùng khi mạng yếu (chỉ khi chạy qua http/https) */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); });
  }
})(window.ATTT);
