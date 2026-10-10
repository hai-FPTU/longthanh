/* Chuyên đề 1: Tổng quan AI và cách đặt câu lệnh. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  /* ---------- 15 phút và một bản dự thảo ---------- */
  A.widgets.deadline = function (host) {
    const clock = h('div', { class: 'dl-clock' }, h('span', { class: 'dl-time' }, '15:00'), h('small', {}, 'còn lại'));
    const ring = s('svg', { viewBox: '0 0 120 120', class: 'dl-ring' }, s('circle', { cx: 60, cy: 60, r: 52, class: 'dl-bg' }), s('circle', { cx: 60, cy: 60, r: 52, class: 'dl-fg' }));
    const clk = h('div', { class: 'dl-clk' }, ring, clock);
    function lane(name, cls) {
      const doc = h('div', { class: 'dl-doc' }); for (let i = 0; i < 8; i++) doc.append(h('i'));
      const st = h('p', { class: 'dl-st' }, 'Chưa bắt đầu');
      const bar = h('div', { class: 'dl-bar' }, h('span'));
      return { el: h('div', { class: 'dl-lane ' + cls }, h('h4', {}, name), doc, bar, st), doc: doc, st: st, bar: bar };
    }
    const L1 = lane('Tự soạn từ đầu', 'dl-man'), L2 = lane('AI soạn nháp + cán bộ kiểm tra', 'dl-ai');
    const bubble = h('div', { class: 'dl-boss' }, A.icon('chat'), h('span', {}, '“15 phút nữa in ra mang lên phòng để tôi duyệt!”'));
    const btn = h('button', { class: 'btn', type: 'button' }, A.icon('play'), 'Bắt đầu 15 phút');
    const msg = h('p', { class: 'dl-msg', hidden: true });
    btn.addEventListener('click', async function () {
      btn.disabled = true; msg.hidden = true; host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); });
      [L1, L2].forEach(function (L) { L.doc.querySelectorAll('i').forEach(function (x) { x.className = ''; }); L.bar.firstChild.style.width = '0'; L.st.textContent = ''; L.el.classList.remove('late', 'won'); });
      const fg = ring.querySelector('.dl-fg'); const tEl = clock.querySelector('.dl-time');
      const total = 15 * 60, steps = 60;
      for (let k = 0; k <= steps; k++) {
        if (!host.isConnected) return;
        const sec = Math.round(total * k / steps), left = total - sec;
        tEl.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
        fg.style.strokeDashoffset = String(327 * k / steps);
        clk.classList.toggle('hot', left <= 180);
        /* thủ công: 25 phút cho 8 dòng */
        const m = Math.min(8, Math.floor(sec / (25 * 60) * 8));
        L1.doc.querySelectorAll('i').forEach(function (x, j) { if (j < m) x.className = 'on'; });
        L1.bar.firstChild.style.width = Math.min(100, sec / (25 * 60) * 100) + '%';
        L1.st.textContent = 'Đang gõ… ' + m + '/8 đoạn';
        /* AI: 1 phút nháp, 5 phút kiểm tra */
        if (sec <= 60) { const a = Math.min(8, Math.ceil(sec / 60 * 8)); L2.doc.querySelectorAll('i').forEach(function (x, j) { if (j < a) x.className = 'on'; }); L2.st.textContent = 'AI đang soạn nháp…'; }
        else if (sec <= 360) { const c = Math.min(8, Math.ceil((sec - 60) / 300 * 8)); L2.doc.querySelectorAll('i').forEach(function (x, j) { x.className = j < c ? 'on chk' : 'on'; }); L2.st.textContent = 'Cán bộ kiểm tra số liệu, thể thức… ' + c + '/8'; }
        else if (!L2.el.classList.contains('won')) { L2.el.classList.add('won'); L2.st.textContent = 'Xong lúc 06:00 – còn 9 phút để trình ký'; U.stamp(L2.el, 'Kịp giờ', 'good'); }
        L2.bar.firstChild.style.width = Math.min(100, sec / 360 * 100) + '%';
        await U.wait(70);
      }
      L1.el.classList.add('late'); L1.st.textContent = 'Hết giờ: mới xong 4/8 đoạn'; U.stamp(L1.el, 'Trễ hạn', 'bad');
      msg.hidden = false; msg.textContent = 'AI rút ngắn khâu soạn nháp, nhưng 5 phút kiểm tra là bắt buộc: AI có thể bịa số hiệu, căn cứ, tên người ký. Thời gian tiết kiệm được dành cho việc kiểm tra.';
      btn.disabled = false; btn.lastChild.textContent = 'Chạy lại';
    });
    host.append(h('div', { class: 'dl-top' }, bubble, clk), h('div', { class: 'dl-lanes' }, L1.el, L2.el), h('div', { class: 'wg-actions' }, btn), msg,
      h('p', { class: 'muted small' }, 'Minh họa với thời gian giả định để so sánh; thời gian thực tế tùy loại văn bản.'));
  };

  /* ---------- Phòng thí nghiệm câu lệnh: bật/tắt 6 thành phần vàng ---------- */
  A.widgets.promptlab = function (host) {
    const C = [
      { k: 'role', t: 'Vai trò', q: 'Bạn là ai?', v: 'Bạn là cán bộ truyền thông Trạm Y tế xã.' },
      { k: 'ctx', t: 'Bối cảnh', q: 'Việc xảy ra thế nào?', v: 'Trạm Y tế tổ chức khám sàng lọc tăng huyết áp: 07h30 ngày 20/03/2026 tại Trạm Y tế xã; đối tượng từ 40 tuổi, mang thẻ BHYT nếu có.' },
      { k: 'task', t: 'Nhiệm vụ', q: 'Yêu cầu AI làm gì?', v: 'Hãy viết thông báo ngắn gửi người dân về lịch khám sàng lọc.' },
      { k: 'aud', t: 'Đối tượng đọc', q: 'Viết cho ai?', v: 'Người đọc là người dân bình thường, cần dễ hiểu.' },
      { k: 'fmt', t: 'Định dạng', q: 'Muốn kết quả ra sao?', v: 'Dưới 150 từ, chia 3 ý chính.' },
      { k: 'lim', t: 'Ràng buộc', q: 'Không được làm gì?', v: 'Không đổi lịch, không thêm số điện thoại, không bịa quyền lợi.' }
    ];
    const on = { role: false, ctx: false, task: true, aud: false, fmt: false, lim: false };
    const chips = h('div', { class: 'pl-chips' });
    const promptBox = h('div', { class: 'pl-prompt' });
    const out = h('div', { class: 'pl-out' });
    const legend = h('p', { class: 'pl-legend' }, h('mark', { class: 'g' }, 'đúng dữ liệu'), h('mark', { class: 'b' }, 'AI tự đoán, tự bịa'), h('mark', { class: 'w' }, 'khó hiểu, lan man'));
    /* đồng hồ đo */
    const gauge = s('svg', { viewBox: '0 0 200 118', class: 'pl-gauge', role: 'img', 'aria-label': 'Mức độ rõ ràng của câu lệnh' },
      s('path', { d: 'M20 100 A80 80 0 0 1 180 100', class: 'pg-bg' }),
      s('path', { d: 'M20 100 A80 80 0 0 1 180 100', class: 'pg-fg', pathLength: 100 }),
      s('g', { class: 'pg-needle' }, s('line', { x1: 100, y1: 100, x2: 100, y2: 34 }), s('circle', { cx: 100, cy: 100, r: 7 })),
      s('text', { x: 100, y: 116, class: 'pg-txt', 'text-anchor': 'middle', text: '0%' }));
    const glabel = h('p', { class: 'pl-glabel' });
    C.forEach(function (c, i) {
      const b = h('button', { class: 'pl-chip c' + i, type: 'button', 'aria-pressed': String(on[c.k]) }, h('b', {}, String(i + 1)), h('span', {}, h('strong', {}, c.t), h('small', {}, c.q)));
      b.addEventListener('click', function () { on[c.k] = !on[c.k]; b.setAttribute('aria-pressed', String(on[c.k])); render(); });
      chips.append(b);
    });
    function result() {
      const parts = [];
      const g = function (t) { return '<mark class="g">' + t + '</mark>'; }, b = function (t) { return '<mark class="b">' + t + '</mark>'; }, w = function (t) { return '<mark class="w">' + t + '</mark>'; };
      if (!on.task) return '<p>' + w('Tăng huyết áp là bệnh lý mạn tính phổ biến, được định nghĩa khi huyết áp tâm thu ≥ 140 mmHg… Bạn muốn tôi giúp gì thêm về chủ đề này?') + '</p><p class="pl-note">Không có nhiệm vụ: AI không biết phải làm gì, trả lời chung chung.</p>';
      parts.push('<p class="pl-h">' + (on.role ? g('TRẠM Y TẾ XÃ') + ' THÔNG BÁO' : 'THÔNG BÁO') + '</p>');
      parts.push('<p class="pl-h2">Về việc khám sàng lọc ' + (on.aud ? 'tăng huyết áp' : w('tầm soát tăng huyết áp nguyên phát và các yếu tố nguy cơ tim mạch')) + '</p>');
      const when = on.ctx ? g('07h30 ngày 20/03/2026') : b('7 giờ sáng thứ Hai tuần sau');
      const where = on.ctx ? g('Trạm Y tế xã') : b('Bệnh viện huyện');
      const who = on.ctx ? g('người dân từ 40 tuổi') : b('toàn thể người dân');
      if (on.fmt) {
        parts.push('<ul><li>🕖 Thời gian: ' + when + '</li><li>📍 Địa điểm: ' + where + '</li><li>👥 Đối tượng: ' + who + (on.ctx ? ', ' + g('mang thẻ BHYT nếu có') : '') + '</li></ul>');
      } else {
        parts.push('<p>' + (on.aud ? 'Nhằm giúp bà con phát hiện sớm bệnh huyết áp cao, ' : w('Thực hiện chủ trương tăng cường công tác chăm sóc sức khỏe ban đầu, nâng cao hiệu quả phòng, chống bệnh không lây nhiễm trong cộng đồng dân cư, ')) + (on.role ? 'Trạm Y tế xã' : 'chúng tôi') + ' tổ chức khám sàng lọc vào lúc ' + when + ' tại ' + where + '. Đối tượng: ' + who + (on.ctx ? ', ' + g('mang thẻ BHYT nếu có') : '') + '. ' + (on.aud ? '' : w('Việc khám sàng lọc định kỳ có ý nghĩa quan trọng trong dự phòng biến chứng tim mạch, đột quỵ, suy thận… ')) + '</p>');
      }
      if (!on.lim) parts.push('<p>' + b('Hoàn toàn miễn phí, tặng thuốc huyết áp 1 tháng.') + ' Liên hệ: ' + b('0909 123 456') + '.</p>');
      parts.push('<p>' + (on.aud ? 'Kính mời bà con đến đúng giờ!' : 'Trân trọng thông báo.') + '</p>');
      return parts.join('');
    }
    let tok = 0;
    async function render() {
      const n = C.filter(function (c) { return on[c.k]; }).length;
      const pct = Math.round(n / 6 * 100);
      gauge.querySelector('.pg-needle').style.transform = 'rotate(' + (-90 + n / 6 * 180) + 'deg)';
      gauge.querySelector('.pg-fg').style.strokeDasharray = pct + ' 100';
      gauge.querySelector('.pg-txt').textContent = pct + '%';
      gauge.setAttribute('class', 'pl-gauge ' + (n <= 2 ? 'lo' : n <= 4 ? 'mid' : 'hi'));
      glabel.textContent = n === 6 ? 'Câu lệnh đủ 6 thành phần: AI có đủ dữ kiện, ít phải đoán.' : n >= 4 ? 'Khá rõ. Bật thêm thành phần còn thiếu để AI bớt đoán.' : 'Câu lệnh còn mơ hồ: AI sẽ tự đoán phần lớn nội dung.';
      promptBox.innerHTML = '';
      C.forEach(function (c, i) { if (on[c.k]) promptBox.append(h('span', { class: 'pl-seg c' + i }, c.v + ' ')); });
      if (!promptBox.childNodes.length) promptBox.append(h('span', { class: 'muted' }, '(Câu lệnh trống)'));
      const my = ++tok;
      out.classList.add('typing'); out.innerHTML = '<p class="pl-dots"><i></i><i></i><i></i></p>';
      await U.wait(500); if (my !== tok) return;
      out.classList.remove('typing'); out.innerHTML = result();
      const bads = out.querySelectorAll('mark.b').length;
      out.setAttribute('data-bad', bads ? bads + ' chỗ AI tự bịa' : 'Không có chỗ bịa');
      if (n === 6) U.confetti(out.parentNode);
    }
    host.append(h('p', { class: 'wg-intro' }, 'Bấm bật, tắt từng thành phần. Quan sát câu lệnh, kim đồng hồ và kết quả AI thay đổi thế nào.'), chips,
      h('div', { class: 'pl-grid' },
        h('div', { class: 'pl-left' }, h('h4', { class: 'sub-h' }, 'Câu lệnh gửi AI'), promptBox, h('div', { class: 'pl-gwrap' }, gauge, glabel)),
        h('div', { class: 'pl-right' }, h('h4', { class: 'sub-h' }, A.icon('ai'), 'AI trả lời (mô phỏng)'), h('div', { class: 'pl-paper' }, out), legend)));
    render();
  };

  /* ---------- So sánh trước, sau bằng thanh trượt ---------- */
  A.widgets.beforeafter = function (host, o) {
    const stage = h('div', { class: 'ba' });
    const L = h('div', { class: 'ba-pane ba-before' }, h('p', { class: 'ba-tag' }, A.icon('x'), o.before.tag), h('div', { class: 'ba-prompt' }, o.before.prompt), h('div', { class: 'ba-res', html: o.before.res }), h('ul', { class: 'ba-why' }, o.before.why.map(function (x) { return h('li', {}, x); })));
    const R = h('div', { class: 'ba-pane ba-after' }, h('p', { class: 'ba-tag' }, A.icon('check'), o.after.tag), h('div', { class: 'ba-prompt' }, o.after.prompt), h('div', { class: 'ba-res', html: o.after.res }), h('ul', { class: 'ba-why' }, o.after.why.map(function (x) { return h('li', {}, x); })));
    const handle = h('div', { class: 'ba-handle' }, h('span', {}, '‹ ›'));
    const range = h('input', { type: 'range', min: 0, max: 100, value: 50, class: 'ba-range', 'aria-label': 'Kéo để so sánh hai câu lệnh' });
    function set(v) { stage.style.setProperty('--p', v + '%'); }
    range.addEventListener('input', function () { set(range.value); });
    stage.append(L, R, handle, range); set(50);
    host.append(stage, h('div', { class: 'wg-actions ba-quick' },
      h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { range.value = 100; set(100); } }, 'Xem prompt chưa tốt'),
      h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { range.value = 0; set(0); } }, 'Xem prompt tốt')),
      o.formula ? h('p', { class: 'ba-formula' }, A.icon('spark'), o.formula) : null);
    U.onVisible(host, async function () { if (U.reduced()) return; for (const v of [50, 80, 20, 50]) { range.value = v; set(v); await U.wait(450); } });
  };

  /* ---------- AI "đoán chữ tiếp theo" ---------- */
  A.widgets.nextword = function (host) {
    const S = [
      { tab: 'Số hiệu văn bản', prompt: 'Soạn phần căn cứ cho kế hoạch chuyển đổi số năm 2026 của xã.', start: 'Căn cứ Quyết định số',
        cands: [['125/QĐ-UBND', 27], ['89/QĐ-UBND', 21], ['312/QĐ-UBND', 17], ['47/QĐ-UBND', 14], ['khác', 21]],
        tail: ' ngày 15/3/2026 của UBND xã Long Thành về ban hành Kế hoạch chuyển đổi số…',
        why: 'AI không biết xã đã ban hành quyết định nào, nhưng vẫn phải viết tiếp. Nó chọn một số hiệu “nghe giống thật” và bịa luôn ngày ban hành. Đây là ảo giác (hallucination): sai nhưng rất tự tin.' },
      { tab: 'Số liệu', prompt: 'Viết đoạn mở đầu báo cáo, nêu tỷ lệ hồ sơ trực tuyến của xã năm 2025.', start: 'Năm 2025, tỷ lệ hồ sơ nộp trực tuyến của xã đạt',
        cands: [['78,5%', 23], ['82,3%', 21], ['65%', 18], ['91,2%', 15], ['khác', 23]],
        tail: ', tăng 12,4 điểm phần trăm so với năm 2024, vượt chỉ tiêu tỉnh giao.',
        why: 'AI không có số liệu của xã. Con số, mức tăng và cả nhận định “vượt chỉ tiêu” đều do AI tạo ra cho câu văn trôi chảy.' },
      { tab: 'Người ký', prompt: 'Hoàn thiện phần chữ ký cho thông báo của UBND xã.', start: 'KT. CHỦ TỊCH, PHÓ CHỦ TỊCH: Nguyễn Văn',
        cands: [['Hùng', 25], ['Minh', 22], ['Long', 19], ['Thành', 12], ['khác', 22]],
        tail: ' (đã ký)',
        why: 'Tên người ký là thông tin AI không thể biết. Nó chọn tên phổ biến nhất. Văn bản trình lên có tên người ký sai là lỗi nghiêm trọng: luôn để trống cho lãnh đạo quyết định.' }
    ];
    let cur = 0;
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    const stage = h('div', { class: 'nw' });
    S.forEach(function (x, i) { const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(i === 0) }, x.tab); b.addEventListener('click', function () { cur = i; Array.prototype.forEach.call(tabs.children, function (y, k) { y.setAttribute('aria-selected', String(k === i)); }); draw(); }); tabs.append(b); });
    function draw() {
      const x = S[cur]; stage.innerHTML = '';
      const line = h('p', { class: 'nw-line' }, h('span', {}, x.start + ' '), h('span', { class: 'nw-blank' }, '▁▁▁'));
      const bars = h('div', { class: 'nw-bars' });
      const els = x.cands.map(function (c) { const fill = h('span', { class: 'nw-fill' }); const row = h('div', { class: 'nw-row' }, h('span', { class: 'nw-w' }, c[0]), h('span', { class: 'nw-track' }, fill), h('span', { class: 'nw-p' }, c[1] + '%')); bars.append(row); return { row: row, fill: fill, c: c }; });
      const why = h('p', { class: 'nw-why', hidden: true }, x.why);
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, 'Cho AI viết tiếp');
      go.addEventListener('click', async function () {
        go.disabled = true;
        await U.wait(150);
        els.forEach(function (e) { e.fill.style.width = e.c[1] * 2.6 + '%'; });
        await U.wait(1100);
        els[0].row.classList.add('pick');
        await U.wait(700);
        const blank = line.querySelector('.nw-blank'); blank.className = 'nw-word'; blank.textContent = x.cands[0][0];
        const tail = h('span', { class: 'nw-tail' }, ''); line.append(tail);
        for (let j = 0; j <= x.tail.length; j += 2) { if (!host.isConnected) return; tail.textContent = x.tail.slice(0, j); await U.wait(25); }
        U.stamp(stage, 'Bịa', 'bad');
        why.hidden = false; go.textContent = 'Xem lại'; go.disabled = false;
        go.onclick = function () { draw(); };
      }, { once: true });
      stage.append(h('div', { class: 'nw-prompt' }, h('small', {}, 'Yêu cầu của cán bộ'), x.prompt), h('div', { class: 'nw-out' }, h('small', {}, 'AI đang viết'), line), h('p', { class: 'nw-cap' }, 'Các phương án AI cân nhắc cho chỗ trống (xác suất minh họa):'), bars, h('div', { class: 'wg-actions' }, go), why);
    }
    host.append(tabs, stage); draw();
  };
})(window.ATTT);
