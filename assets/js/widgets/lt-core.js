/* Học liệu tương tác dùng chung cho lớp Long Thành: thực hành nhóm, thẻ quẹt, sắp xếp thứ tự, mô phỏng điện thoại, soi chi tiết. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Thực hành theo nhóm: tình huống + câu lệnh 6 thành phần + rà soát ---------- */
  A.widgets.grouptask = function (host, o) {
    const G = A.data.groupTasks[o.cd]; const K = A.data.promptKeys; const groups = A.config.groups;
    let cur = U.store.get('group', 'kt');
    if (!G.tasks[cur]) cur = 'kt';
    const bar = h('div', { class: 'gt-tabs', role: 'tablist' });
    const pane = h('div', { class: 'gt-pane' });
    const btns = groups.map(function (g) {
      const b = h('button', { class: 'gt-tab', type: 'button', role: 'tab', style: { '--gc': g.color } }, A.icon(g.icon), h('span', {}, g.name));
      b.addEventListener('click', function () { cur = g.id; U.store.set('group', cur); draw(); });
      bar.append(b); return b;
    });
    function draw() {
      btns.forEach(function (b, i) { b.setAttribute('aria-selected', String(groups[i].id === cur)); });
      const g = groups.filter(function (x) { return x.id === cur; })[0];
      const t = G.tasks[cur];
      const vals = U.store.get('gt-' + o.cd + '-' + cur, null) || t.prompt.slice();
      pane.innerHTML = ''; pane.style.setProperty('--gc', g.color);
      const sit = h('div', { class: 'gt-sit' }, h('p', { class: 'gt-k' }, A.icon('note'), 'Tình huống – ', t.doc), h('p', {}, t.situation));
      const preview = h('div', { class: 'gt-preview' });
      function assemble() { return vals.join(' '); }
      function upd() { preview.textContent = assemble(); U.store.set('gt-' + o.cd + '-' + cur, vals); }
      const ed = h('div', { class: 'gt-ed' });
      K.forEach(function (k, i) {
        const ta = h('textarea', { rows: 2, 'aria-label': k }); ta.value = vals[i];
        ta.addEventListener('input', function () { vals[i] = ta.value; upd(); });
        ed.append(h('label', { class: 'gt-row c' + i }, h('span', { class: 'gt-lab' }, h('b', {}, String(i + 1)), k), ta));
      });
      const acts = h('div', { class: 'wg-actions' },
        h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { U.copy(assemble()); } }, A.icon('copy'), 'Sao chép câu lệnh'),
        h('a', { class: 'btn btn-ghost btn-sm', href: 'https://gemini.google.com/app', target: '_blank', rel: 'noopener' }, 'Mở Gemini'),
        h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { U.store.del('gt-' + o.cd + '-' + cur); draw(); } }, 'Khôi phục mẫu'));
      /* Rà soát */
      const ck = h('ul', { class: 'gt-check' });
      const st = U.store.get('gtc-' + o.cd + '-' + cur, []);
      const meter = h('div', { class: 'gt-meter' }, h('span'));
      function mupd() {
        const n = st.length, tot = t.check.length;
        meter.firstChild.style.width = (n / tot * 100) + '%';
        meter.className = 'gt-meter' + (n === tot ? ' full' : '');
        if (n === tot) { U.stamp(ckBox, 'Sẵn sàng trình', 'good'); } else ckBox.querySelectorAll('.stamp').forEach(function (x) { x.remove(); });
      }
      t.check.forEach(function (c, i) {
        const id = 'gc' + o.cd + cur + i;
        const cb = h('input', { type: 'checkbox', id: id }); cb.checked = st.indexOf(i) >= 0;
        cb.addEventListener('change', function () { const k = st.indexOf(i); if (cb.checked && k < 0) st.push(i); if (!cb.checked && k >= 0) st.splice(k, 1); U.store.set('gtc-' + o.cd + '-' + cur, st); mupd(); if (st.length === t.check.length) U.confetti(ckBox); });
        ck.append(h('li', {}, cb, h('label', { for: id }, c)));
      });
      const ckBox = h('div', { class: 'gt-ckbox' }, h('h4', {}, A.icon('search'), 'Rà soát kết quả AI trả về'), h('p', { class: 'muted small' }, 'Dán câu lệnh vào công cụ AI, đọc kết quả, rồi đánh dấu từng điểm đã kiểm tra.'), meter, ck);
      pane.append(sit,
        h('div', { class: 'gt-grid' }, h('div', {}, h('h4', { class: 'sub-h' }, 'Câu lệnh 6 thành phần (có thể sửa)'), ed), h('div', {}, h('h4', { class: 'sub-h' }, 'Câu lệnh hoàn chỉnh'), preview, acts)),
        ckBox);
      upd(); mupd();
    }
    const gen = h('details', { class: 'gt-gen' }, h('summary', {}, 'Khung câu lệnh chung của chuyên đề'),
      h('div', { class: 'pc-rows' }, G.general.map(function (v, i) { return h('div', { class: 'pc-row c' + i }, h('span', { class: 'pc-k' }, h('b', {}, String(i + 1)), K[i]), h('span', { class: 'pc-v' }, v)); })),
      h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { U.copy(G.general.join(' ')); } }, A.icon('copy'), 'Sao chép khung chung'));
    host.append(gen, bar, pane); draw();
  };

  /* ---------- Thẻ quẹt phân loại (2 hoặc 3 hướng) ---------- */
  A.widgets.swipe = function (host, o) {
    const items = o.shuffle === false ? o.items.slice() : U.shuffle(o.items);
    let i = 0, right = 0;
    const deck = h('div', { class: 'sw-deck', 'aria-live': 'polite' });
    const fb = h('div', { class: 'sw-fb' });
    const btns = h('div', { class: 'sw-btns', style: { '--n': o.bins.length } });
    const count = h('p', { class: 'choices-count' });
    const bar = h('div', { class: 'sw-bar' }, h('span'));
    let busy = false;
    o.bins.forEach(function (b, bi) {
      btns.append(h('button', { class: 'sw-btn tone-' + (b.tone || 'l1'), type: 'button', onclick: function () { pick(bi); } }, b.icon ? A.icon(b.icon) : null, h('span', {}, b.name)));
    });
    function card(it, k) {
      return h('div', { class: 'sw-card' + (k ? ' back' : ''), style: { '--k': k } }, it.icon ? A.icon(it.icon, 'sw-ico') : null, h('p', { class: 'sw-t' }, it.t), it.sub ? h('p', { class: 'sw-sub' }, it.sub) : null);
    }
    function draw() {
      deck.innerHTML = '';
      count.textContent = i < items.length ? 'Thẻ ' + (i + 1) + '/' + items.length : '';
      bar.firstChild.style.width = (i / items.length * 100) + '%';
      if (i >= items.length) {
        btns.hidden = true;
        deck.append(h('div', { class: 'sw-end' }, h('p', { class: 'big-num' }, h('span', { class: 'n' }, String(right)), h('span', { class: 'u' }, '/' + items.length)), h('p', {}, right === items.length ? 'Chính xác toàn bộ!' : 'Xem lại các thẻ chưa đúng ở phần giải thích phía trên.'),
          h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { i = 0; right = 0; btns.hidden = false; fb.innerHTML = ''; host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); }); draw(); } }, 'Làm lại')));
        U.stamp(host, right === items.length ? 'Xuất sắc' : 'Hoàn thành', right === items.length ? 'good' : 'warn');
        if (right === items.length) U.confetti(host);
        return;
      }
      for (let k = Math.min(items.length - 1, i + 2); k >= i; k--) deck.append(card(items[k], k - i));
    }
    async function pick(bi) {
      if (busy || i >= items.length) return; busy = true;
      const it = items[i]; const ok = it.bin === bi; if (ok) right++;
      const top = deck.lastChild;
      const dir = o.bins.length === 2 ? (bi === 0 ? 'l' : 'r') : (['l', 'u', 'r'][bi] || 'r');
      top.classList.add('fly-' + dir, ok ? 'is-ok' : 'is-bad');
      fb.innerHTML = '';
      fb.append(h('p', { class: ok ? 'ok' : 'bad' }, h('strong', {}, ok ? 'Đúng. ' : 'Chưa đúng – thuộc nhóm “' + o.bins[it.bin].name + '”. '), it.why || ''));
      await U.wait(480);
      i++; busy = false; draw();
    }
    host.append(count, bar, deck, btns, fb); draw();
  };

  /* ---------- Sắp xếp đúng thứ tự ---------- */
  A.widgets.order = function (host, o) {
    const correct = o.items.map(function (x, i) { return Object.assign({ k: i }, x); });
    let list = U.shuffle(correct);
    while (correct.length > 1 && list.every(function (x, i) { return x.k === i; })) list = U.shuffle(correct);
    const ol = h('ol', { class: 'ord' });
    const fb = h('p', { class: 'sort-status', 'aria-live': 'polite' }, 'Dùng nút mũi tên để đưa các bước về đúng thứ tự, sau đó bấm “Kiểm tra”.');
    let tries = 0, solved = false;
    function draw(mark) {
      ol.innerHTML = '';
      list.forEach(function (x, i) {
        const li = h('li', { class: 'ord-it' + (mark ? (x.k === i ? ' ok' : ' bad') : '') + (solved ? ' solved' : ''), style: { '--d': i } },
          h('span', { class: 'ord-n' }, String(i + 1)), x.i ? A.icon(x.i, 'ord-ico') : null, h('span', { class: 'ord-t' }, h('strong', {}, x.t), solved && x.d ? h('small', {}, x.d) : null),
          solved ? null : h('span', { class: 'ord-mv' },
            h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Đưa lên', disabled: i === 0, onclick: function () { mv(i, -1); } }, '▲'),
            h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Đưa xuống', disabled: i === list.length - 1, onclick: function () { mv(i, 1); } }, '▼')));
        ol.append(li);
      });
    }
    function mv(i, d) { const t = list[i]; list[i] = list[i + d]; list[i + d] = t; draw(); }
    const chk = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      tries++;
      const n = list.filter(function (x, i) { return x.k === i; }).length;
      if (n === list.length) {
        solved = true; draw(true); chk.hidden = true;
        fb.className = 'sort-status ok'; fb.textContent = (o.done || 'Chính xác!') + (tries > 1 ? ' (sau ' + tries + ' lần kiểm tra)' : '');
        U.stamp(host, 'Đúng quy trình', 'good'); U.confetti(host);
      } else { draw(true); fb.className = 'sort-status bad'; fb.textContent = 'Đúng vị trí ' + n + '/' + list.length + ' bước. Các bước màu đỏ chưa đúng chỗ.'; }
    } }, 'Kiểm tra');
    const rs = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { host.innerHTML = ''; A.widgets.order(host, o); } }, 'Làm lại');
    host.append(ol, h('div', { class: 'wg-actions' }, chk, rs), fb); draw();
  };

  /* ---------- Mô phỏng thao tác trên điện thoại ---------- */
  A.widgets.phonesteps = function (host, o) {
    let ai = 0, si = 0, timer = null;
    const tabs = h('div', { class: 'ps-tabs', role: 'tablist' });
    const phone = h('div', { class: 'ps-phone' });
    const cap = h('div', { class: 'ps-cap', 'aria-live': 'polite' });
    const dots = h('div', { class: 'ps-dots' });
    const prev = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { stop(); if (si > 0) { si--; draw(); } } }, '‹ Trước');
    const next = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { stop(); if (si < cur().steps.length - 1) { si++; draw(); } } }, 'Tiếp ›');
    const play = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: autoplay }, A.icon('play'), 'Tự chạy');
    function cur() { return o.apps[ai]; }
    o.apps.forEach(function (a, k) {
      const b = h('button', { class: 'ps-tab', type: 'button', role: 'tab', style: { '--ac': a.color } }, h('span', { class: 'ps-logo', style: { background: a.color } }, a.short || a.name[0]), a.name);
      b.addEventListener('click', function () { stop(); ai = k; si = 0; draw(); });
      tabs.append(b);
    });
    function draw() {
      const a = cur(), st = a.steps[si];
      Array.prototype.forEach.call(tabs.children, function (b, k) { b.setAttribute('aria-selected', String(k === ai)); });
      phone.style.setProperty('--ac', a.color);
      phone.innerHTML = '';
      const scr = h('div', { class: 'ps-scr' });
      scr.append(h('div', { class: 'ps-status' }, h('span', {}, '09:41'), h('span', {}, '▂▄▆ 🔋')), h('div', { class: 'ps-head' }, si > 0 ? h('span', { class: 'ps-back' }, '‹') : null, h('strong', {}, st.title)));
      const body = h('div', { class: 'ps-body' });
      st.rows.forEach(function (r, k) {
        const row = h('div', { class: 'ps-row' + (k === st.tap ? ' tap' : '') }, h('span', { class: 'ps-ri' }), h('span', {}, r));
        if (st.toggle && k === st.tap) row.append(h('span', { class: 'ps-sw' }, h('i')));
        body.append(row);
      });
      if (st.done) body.append(h('div', { class: 'ps-done' }, A.icon('shield'), h('span', {}, st.done)));
      scr.append(body); phone.append(h('div', { class: 'ps-notch' }), scr);
      setTimeout(function () { const t = phone.querySelector('.ps-row.tap'); if (t) t.classList.add('pressed'); }, U.reduced() ? 0 : 450);
      cap.innerHTML = '';
      cap.append(h('p', { class: 'ps-step' }, 'Bước ' + (si + 1) + '/' + a.steps.length), h('p', { class: 'ps-t' }, st.t), a.goal && si === 0 ? h('p', { class: 'muted small' }, 'Mục tiêu: ' + a.goal) : null);
      dots.innerHTML = '';
      a.steps.forEach(function (x, k) { dots.append(h('button', { type: 'button', class: 'ps-dot' + (k === si ? ' on' : ''), 'aria-label': 'Bước ' + (k + 1), onclick: function () { stop(); si = k; draw(); } })); });
      prev.disabled = si === 0; next.disabled = si === a.steps.length - 1;
      if (si === a.steps.length - 1 && st.done) U.confetti(phone.parentNode);
    }
    function stop() { if (timer) { clearTimeout(timer); timer = null; play.disabled = false; } }
    function autoplay() {
      stop(); si = 0; draw(); play.disabled = true;
      (function tick() { timer = setTimeout(function () { if (!host.isConnected) return; if (si < cur().steps.length - 1) { si++; draw(); tick(); } else stop(); }, 2400); })();
    }
    host.append(tabs, h('div', { class: 'ps-wrap' }, phone, h('div', { class: 'ps-side' }, cap, dots, h('div', { class: 'wg-actions' }, prev, next, play), o.note ? h('p', { class: 'muted small' }, o.note) : null)));
    draw();
  };

  /* ---------- Soi chi tiết: bấm vào các đoạn nghi vấn ---------- */
  A.widgets.spot = function (host, o) {
    const wrap = h('div', { class: 'spot ' + (o.cls || ''), html: o.html });
    const spans = Array.prototype.slice.call(wrap.querySelectorAll('.sp'));
    const total = spans.filter(function (x) { return x.dataset.ok === '1'; }).length;
    let locked = false;
    const status = h('p', { class: 'sort-status', 'aria-live': 'polite' });
    function upd() { const n = wrap.querySelectorAll('.sp.mk').length; status.className = 'sort-status'; status.textContent = 'Đã đánh dấu ' + n + ' chỗ. Cần tìm ' + total + ' chỗ có vấn đề.'; }
    spans.forEach(function (sp) {
      sp.setAttribute('tabindex', '0'); sp.setAttribute('role', 'button');
      function tg() { if (locked) return; sp.classList.toggle('mk'); upd(); }
      sp.addEventListener('click', tg);
      sp.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tg(); } });
    });
    const out = h('ol', { class: 'spot-why' });
    const chk = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      locked = true; chk.hidden = true; out.innerHTML = '';
      let hit = 0, wrong = 0;
      spans.forEach(function (sp) {
        const ok = sp.dataset.ok === '1', mk = sp.classList.contains('mk');
        if (ok && mk) { hit++; sp.classList.add('hit'); } else if (ok) sp.classList.add('miss'); else if (mk) { wrong++; sp.classList.add('fp'); }
        if (ok) out.append(h('li', { class: mk ? 'ok' : 'bad' }, h('strong', {}, sp.dataset.t || sp.textContent), mk ? '' : ' (bỏ sót)', ' – ', sp.dataset.why));
        else if (mk && sp.dataset.why) out.append(h('li', { class: 'muted' }, h('strong', {}, sp.textContent), ': ', sp.dataset.why));
      });
      status.className = 'sort-status ' + (hit === total && !wrong ? 'ok' : 'bad');
      status.textContent = 'Tìm đúng ' + hit + '/' + total + (wrong ? '; đánh dấu nhầm ' + wrong + ' chỗ' : '') + '.';
      U.stamp(host, hit === total ? (o.okStamp || 'Phát hiện đủ') : 'Còn bỏ sót', hit === total ? 'good' : 'warn');
      if (hit === total && !wrong) U.confetti(host);
      rs.hidden = false;
    } }, o.checkLabel || 'Kiểm tra');
    const rs = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', hidden: true, onclick: function () { host.innerHTML = ''; A.widgets.spot(host, o); } }, 'Làm lại');
    host.append(wrap, h('div', { class: 'wg-actions' }, chk, rs), status, out); upd();
  };
})(window.ATTT);
