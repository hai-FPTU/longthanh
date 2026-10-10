/* Chuyên đề 3: Tra cứu, tổng hợp và kiểm tra thông tin pháp luật. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Kiểm chứng 4 bước một câu trả lời của AI ---------- */
  A.widgets.verify4 = function (host) {
    const STEPS = [{ i: 'search', t: 'Truy nguồn' }, { i: 'globe', t: 'Mở nguồn chính thức' }, { i: 'clock', t: 'Kiểm tra hiệu lực' }, { i: 'doc', t: 'Đọc điều khoản gốc' }];
    const CASES = [
      { tab: 'Tình huống 1', claim: '“Theo Nghị định 88/2024/NĐ-CP, UBND xã có thẩm quyền quyết định việc này mà không cần xin ý kiến cấp trên.”',
        res: ['AI nêu số hiệu nhưng không nêu điều, khoản cụ thể. Yêu cầu AI chỉ rõ điều khoản: AI đưa ra “Điều 12, khoản 3”.', 'Tra số hiệu trên Cơ sở dữ liệu quốc gia về văn bản pháp luật: văn bản có tồn tại, nhưng tên văn bản không liên quan đến thẩm quyền đang hỏi.', 'Cần kiểm tra thêm văn bản sửa đổi, văn bản hướng dẫn sau khi sắp xếp chính quyền địa phương hai cấp.', 'Đọc Điều 12 bản gốc: không có nội dung như AI trích. Câu trả lời “nghe hợp lý” nhưng không có căn cứ.'],
        verdict: 'bad', stamp: 'Loại bỏ', end: 'Không tìm thấy căn cứ: loại bỏ kết luận, sửa câu lệnh để AI chỉ dùng tài liệu được cung cấp. Ghi “Chưa xác minh” nếu cần giữ lại để hỏi tiếp.' },
      { tab: 'Tình huống 2', claim: '“Theo Điều 15 Luật Hộ tịch năm 2014, trong thời hạn 60 ngày kể từ ngày sinh con, cha hoặc mẹ có trách nhiệm đăng ký khai sinh cho con.”',
        res: ['AI nêu đủ: tên văn bản, năm, điều cụ thể.', 'Tra Luật Hộ tịch số 60/2014/QH13 trên Cơ sở dữ liệu quốc gia về văn bản pháp luật: văn bản tồn tại.', 'Kiểm tra tình trạng hiệu lực và các văn bản sửa đổi, bổ sung (nếu có) tại thời điểm tra cứu.', 'Đọc Điều 15 bản gốc: nội dung khớp với câu AI trích.'],
        verdict: 'good', stamp: 'Đủ căn cứ', end: 'Đủ căn cứ: được dùng, ghi rõ nguồn (tên văn bản, điều, khoản) ngay trong tài liệu. Vẫn kiểm tra thủ tục đang công bố trên Cổng Dịch vụ công.' }
    ];
    let ci = 0;
    const tabs = h('div', { class: 'tabs', role: 'tablist' });
    const stage = h('div', { class: 'v4' });
    CASES.forEach(function (c, k) { const b = h('button', { class: 'tab', type: 'button', role: 'tab', 'aria-selected': String(k === 0) }, c.tab); b.addEventListener('click', function () { ci = k; Array.prototype.forEach.call(tabs.children, function (x, j) { x.setAttribute('aria-selected', String(j === k)); }); draw(); }); tabs.append(b); });
    function draw() {
      const c = CASES[ci]; let step = 0;
      stage.innerHTML = '';
      const claim = h('div', { class: 'v4-claim' }, h('span', { class: 'v4-bot' }, A.icon('ai'), 'AI trả lời'), h('p', {}, c.claim), h('span', { class: 'v4-scan' }));
      const track = h('ol', { class: 'v4-track' });
      const nodes = STEPS.map(function (s1, k) { const li = h('li', { class: 'v4-step' }, h('span', { class: 'v4-n' }, A.icon(s1.i)), h('strong', {}, (k + 1) + '. ' + s1.t), h('p', { class: 'v4-r' })); track.append(li); return li; });
      const end = h('p', { class: 'v4-end', hidden: true });
      const btn = h('button', { class: 'btn btn-sm', type: 'button' }, 'Bước 1: ' + STEPS[0].t);
      btn.addEventListener('click', async function () {
        btn.disabled = true; claim.classList.add('scanning');
        nodes[step].classList.add('run'); await U.wait(900);
        nodes[step].classList.remove('run'); nodes[step].classList.add('done', step === 3 ? c.verdict : 'ok');
        nodes[step].querySelector('.v4-r').textContent = c.res[step];
        claim.classList.remove('scanning');
        step++;
        if (step < 4) { btn.disabled = false; btn.textContent = 'Bước ' + (step + 1) + ': ' + STEPS[step].t; }
        else { btn.remove(); end.hidden = false; end.className = 'v4-end ' + (c.verdict === 'good' ? 'ok' : 'bad'); end.textContent = c.end; claim.classList.add(c.verdict); U.stamp(claim, c.stamp, c.verdict === 'good' ? 'good' : 'bad'); }
      });
      stage.append(claim, track, h('div', { class: 'wg-actions' }, btn), end);
    }
    host.append(tabs, stage, h('p', { class: 'muted small' }, 'Mô phỏng theo tình huống trong bài giảng. Khi làm thật, tra cứu tại vbpl.vn (Cơ sở dữ liệu quốc gia về văn bản pháp luật) hoặc Công báo, Cổng Dịch vụ công.'));
    draw();
  };

  /* ---------- Bộ tạo áp phích tuyên truyền ---------- */
  A.widgets.poster = function (host) {
    const TIPS = [
      { i: 'lock', t: 'Đặt mật khẩu mạnh, bật xác thực hai lớp', ok: true },
      { i: 'link', t: 'Không bấm đường link lạ trong tin nhắn, email', ok: true },
      { i: 'key', t: 'Không cung cấp mã OTP cho bất kỳ ai', ok: true },
      { i: 'search', t: 'Kiểm chứng thông tin trước khi chia sẻ', ok: true },
      { i: 'call', t: 'Bị lừa đảo: báo ngay công an, ngân hàng', ok: true },
      { i: 'idcard', t: 'Không đăng ảnh căn cước, giấy tờ lên mạng', ok: true },
      { i: 'chat', t: 'Nhân viên ngân hàng gọi đến hỏi OTP thì đọc mã cho nhanh', ok: false, why: 'Sai nghiêm trọng: ngân hàng không bao giờ hỏi mã OTP.' },
      { i: 'globe', t: 'Bấm link trong tin nhắn để cập nhật VNeID kịp hạn', ok: false, why: 'Sai: chỉ cập nhật trong ứng dụng VNeID chính thức.' }
    ];
    const THEMES = [['Xanh dương', '#0B63CE', '#E6F0FC'], ['Đỏ cam', '#D9480F', '#FFF0E6'], ['Xanh lá', '#0B8A5F', '#E3F5EC']];
    const TITLES = ['5 LƯU Ý AN TOÀN KHI DÙNG MẠNG XÃ HỘI', 'TỰ BẢO VỆ MÌNH TRÊN KHÔNG GIAN MẠNG', 'CẢNH GIÁC LỪA ĐẢO TRỰC TUYẾN'];
    const picked = [0, 1, 2]; let theme = 0, title = 0;
    const list = h('div', { class: 'po-list' });
    const poster = h('div', { class: 'po-poster' });
    const fb = h('div', { class: 'po-fb', 'aria-live': 'polite' });
    TIPS.forEach(function (tp, k) {
      const b = h('button', { class: 'po-opt', type: 'button', 'aria-pressed': String(picked.indexOf(k) >= 0) }, A.icon(tp.i), h('span', {}, tp.t));
      b.addEventListener('click', function () {
        const j = picked.indexOf(k);
        if (j >= 0) picked.splice(j, 1); else { if (picked.length >= 5) { U.toast('Áp phích chỉ chọn 5 lưu ý. Bỏ bớt một lưu ý trước.'); return; } picked.push(k); }
        b.setAttribute('aria-pressed', String(picked.indexOf(k) >= 0)); fb.innerHTML = ''; render();
      });
      list.append(b);
    });
    const th = h('div', { class: 'po-themes' }, THEMES.map(function (t, k) { return h('button', { type: 'button', class: 'po-sw', style: { background: t[1] }, 'aria-label': 'Màu ' + t[0], 'aria-pressed': String(k === 0), onclick: function (e) { theme = k; th.querySelectorAll('button').forEach(function (x, j) { x.setAttribute('aria-pressed', String(j === k)); }); render(); } }); }));
    const ts = h('select', { 'aria-label': 'Tiêu đề áp phích' }, TITLES.map(function (t, k) { return h('option', { value: k }, t); }));
    ts.addEventListener('change', function () { title = +ts.value; render(); });
    function render() {
      const t = THEMES[theme];
      poster.style.setProperty('--pc', t[1]); poster.style.setProperty('--pb', t[2]);
      poster.innerHTML = '';
      poster.append(h('div', { class: 'po-hd' }, A.icon('shield', 'po-big'), h('small', {}, 'LUẬT AN NINH MẠNG'), h('strong', {}, TITLES[title])));
      const ul = h('ol', { class: 'po-items' });
      picked.forEach(function (k, n) { const tp = TIPS[k]; ul.append(h('li', { class: 'po-it', style: { '--d': n } }, h('span', { class: 'po-num' }, String(n + 1)), A.icon(tp.i), h('span', {}, tp.t))); });
      for (let n = picked.length; n < 5; n++) ul.append(h('li', { class: 'po-it empty' }, h('span', { class: 'po-num' }, String(n + 1)), h('span', {}, 'Chọn thêm lưu ý…')));
      poster.append(ul, h('div', { class: 'po-ft' }, 'Sống và làm việc theo pháp luật – Cảnh giác để an toàn'), h('div', { class: 'po-src' }, 'UBND xã Long Thành'));
    }
    const chk = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      fb.innerHTML = ''; poster.querySelectorAll('.stamp').forEach(function (x) { x.remove(); });
      if (picked.length < 5) { fb.append(h('p', { class: 'bad' }, 'Áp phích cần đủ 5 lưu ý.')); return; }
      const bad = picked.filter(function (k) { return !TIPS[k].ok; });
      if (bad.length) { fb.append(h('p', { class: 'bad' }, h('strong', {}, 'Phát hiện nội dung sai: ')), h('ul', {}, bad.map(function (k) { return h('li', {}, TIPS[k].t + ' – ' + TIPS[k].why); }))); U.stamp(poster, 'Sai nội dung', 'bad'); return; }
      fb.append(h('p', { class: 'ok' }, 'Nội dung đúng. Trước khi đăng: đối chiếu với nguồn chính thống, xin ý kiến lãnh đạo, kiểm tra chính tả.'));
      U.stamp(poster, 'Đã kiểm tra', 'good'); U.confetti(poster);
    } }, 'Kiểm tra nội dung trước khi đăng');
    host.append(h('div', { class: 'po' },
      h('div', { class: 'po-ctrl' }, h('h4', { class: 'sub-h' }, '1. Chọn 5 lưu ý (AI gợi ý 8 ý, có ý sai)'), list, h('h4', { class: 'sub-h' }, '2. Tiêu đề và màu sắc'), ts, th, h('div', { class: 'wg-actions' }, chk), fb),
      h('div', { class: 'po-phone' }, h('div', { class: 'po-notch' }), poster)));
    render();
  };
})(window.ATTT);
