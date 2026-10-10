/* Học liệu riêng cho Lớp 2: AI bán hàng, Cổng Dịch vụ công mô phỏng, bác sĩ ứng dụng, phản ánh hiện trường, đóng vai hỗ trợ người dân. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- 1 ảnh sản phẩm → 3 nội dung bán hàng ---------- */
  A.widgets.salespost = function (host) {
    const prod = h('div', { class: 'sx-prod', html:
      '<svg viewBox="0 0 160 190" aria-hidden="true"><defs><linearGradient id="spb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4E3C1"/><stop offset="1" stop-color="#E2C48E"/></linearGradient></defs>' +
      '<path d="M30 40 Q80 20 130 40 L140 175 Q80 188 20 175Z" fill="url(#spb)" stroke="#B88A45" stroke-width="2"/>' +
      '<rect x="40" y="70" width="80" height="62" rx="8" fill="#fff" stroke="#B88A45"/>' +
      '<text x="80" y="95" text-anchor="middle" font-size="13" font-weight="800" fill="#7A4B12">ĐẶC SẢN</text><text x="80" y="113" text-anchor="middle" font-size="13" font-weight="800" fill="#7A4B12">QUÊ NHÀ</text><text x="80" y="126" text-anchor="middle" font-size="8" fill="#9A6B2E">Long Thành</text>' +
      '<g fill="#C77A2E"><circle cx="55" cy="150" r="6"/><circle cx="72" cy="156" r="7"/><circle cx="92" cy="151" r="6"/><circle cx="108" cy="158" r="7"/></g></svg>' });
    const CARDS = [
      { k: 'fb', t: 'Bài đăng Facebook/Zalo', i: 'share', body: 'Đặc sản quê nhà – hương vị thuần khiết từ thiên nhiên 🌿 Thơm ngon, sạch, an toàn cho cả gia đình. Món quà ý nghĩa từ quê hương Long Thành! <mark class="b">Bán chạy nhất tỉnh</mark> #DacSanQueNha' },
      { k: 'desc', t: 'Mô tả sản phẩm', i: 'list', body: '✔ Thành phần: <mark class="b">100% nguyên liệu tự nhiên</mark><br>✔ Đặc điểm: thơm, giòn, đóng gói tiện lợi<br>✔ Khối lượng: <mark class="w">[người bán bổ sung]</mark><br>✔ Hạn sử dụng: <mark class="w">[người bán bổ sung]</mark>' },
      { k: 'sale', t: 'Nội dung khuyến mãi', i: 'megaphone', body: '🔥 ƯU ĐÃI ĐẶC BIỆT CHỈ TRONG HÔM NAY! Mua 2 túi đặc sản quê nhà <mark class="b">GIẢM NGAY 20%</mark> 🎁 Số lượng có hạn – đừng bỏ lỡ!' }
    ];
    const out = h('div', { class: 'sx-cards' });
    const els = CARDS.map(function (c, i) { const e = h('div', { class: 'sx-card c' + i }, h('p', { class: 'sx-h' }, A.icon(c.i), c.t), h('div', { class: 'sx-b', html: c.body })); out.append(e); return e; });
    const lesson = h('div', { class: 'sx-lesson', hidden: true }, h('p', {}, h('strong', {}, 'Những chỗ tô đỏ là AI tự thêm: '), '“bán chạy nhất tỉnh”, “100% nguyên liệu tự nhiên”, “giảm 20%”. Người bán phải kiểm tra: có đúng sự thật không, có chương trình khuyến mãi thật không. Quảng cáo sai sự thật có thể bị xử phạt và mất uy tín.'), h('p', {}, h('strong', {}, 'Câu lệnh tốt hơn: '), '“… Chỉ dùng thông tin tôi cung cấp; không tự thêm khuyến mãi, cam kết, giải thưởng; chỗ thiếu ghi [người bán bổ sung].”'));
    const timer = h('span', { class: 'sx-timer' }, '00');
    const btn = h('button', { class: 'btn', type: 'button' }, A.icon('wand'), 'AI tạo 3 nội dung');
    btn.addEventListener('click', async function () {
      btn.disabled = true; lesson.hidden = true; host.classList.add('run');
      els.forEach(function (e) { e.classList.remove('on'); });
      for (let s = 0; s <= 60; s += 4) { if (!host.isConnected) return; timer.textContent = String(s).padStart(2, '0'); if (s === 16) els[0].classList.add('on'); if (s === 36) els[1].classList.add('on'); if (s === 56) els[2].classList.add('on'); await U.wait(110); }
      host.classList.remove('run'); lesson.hidden = false; btn.disabled = false; btn.lastChild.textContent = 'Chạy lại';
      U.stamp(out, 'Kiểm tra trước khi đăng', 'warn');
    });
    host.append(h('div', { class: 'sx' }, h('div', { class: 'sx-left' }, prod, h('div', { class: 'sx-ai' }, A.icon('ai'), h('span', {}, timer, ' giây'))), out), h('div', { class: 'wg-actions' }, btn), lesson);
  };

  /* ---------- Bác sĩ ứng dụng: chọn lỗi → cách xử lý ---------- */
  A.widgets.fixit = function (host, o) {
    const list = h('div', { class: 'fx2-list' });
    const pane = h('div', { class: 'fx2-pane', 'aria-live': 'polite' }, h('div', { class: 'fx2-empty' }, A.icon('search'), h('p', {}, o.empty || 'Chọn một tình huống bên trái để xem cách xử lý.')));
    const seen = [];
    o.items.forEach(function (it, i) {
      const b = h('button', { class: 'fx2-q', type: 'button' }, A.icon(it.i || 'alert'), h('span', {}, it.q));
      b.addEventListener('click', function () {
        list.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        if (seen.indexOf(i) < 0) { seen.push(i); b.classList.add('seen'); }
        pane.innerHTML = '';
        pane.append(h('div', { class: 'fx2-dx' }, h('span', { class: 'fx2-tag' }, 'Nguyên nhân thường gặp'), h('p', {}, it.why)),
          h('ol', { class: 'fx2-steps' }, it.steps.map(function (s, k) { return h('li', { style: { '--d': k } }, s); })),
          it.note ? h('p', { class: 'fx2-note' }, A.icon('alert'), it.note) : null);
        if (seen.length === o.items.length) U.toast('Đã xem hết các tình huống. Mục tiêu: xác định thiếu điều kiện nào, rồi đưa người dân về đúng bước.', 'ok');
      });
      list.append(b);
    });
    host.append(h('div', { class: 'fx2' }, list, pane));
  };

  /* ---------- Cổng Dịch vụ công mô phỏng ---------- */
  A.widgets.dvcsim = function (host) {
    const STEPS = ['Đăng nhập', 'Tra cứu thủ tục', 'Chọn cơ quan', 'Đính kèm hồ sơ', 'Nộp và lưu mã', 'Tra cứu trạng thái'];
    let step = 0, savedCode = '';
    const CODE = 'H61.139-261011-000' + (100 + Math.floor(Math.random() * 800));
    const bar = h('ol', { class: 'dv-steps' }, STEPS.map(function (s, i) { return h('li', {}, h('b', {}, String(i + 1)), h('span', {}, s)); }));
    const screen = h('div', { class: 'dv-screen' });
    const coach = h('div', { class: 'dv-coach', 'aria-live': 'polite' });
    const note = h('div', { class: 'dv-note' }, A.icon('note'), h('span', {}, 'Sổ ghi chú: '), h('strong', {}, '(chưa có mã hồ sơ)'));
    const browser = h('div', { class: 'dv-browser' },
      h('div', { class: 'dv-url' }, h('span', { class: 'dv-dots' }, h('i'), h('i'), h('i')), h('span', { class: 'dv-addr' }, '🔒 https://dichvucong.gov.vn')),
      h('div', { class: 'dv-brand' }, h('span', { class: 'dv-logo' }, '★'), h('strong', {}, 'CỔNG DỊCH VỤ CÔNG QUỐC GIA'), h('small', {}, 'Mô phỏng')), screen);
    function say(t, kind) { coach.innerHTML = ''; coach.className = 'dv-coach ' + (kind || ''); coach.append(h('span', { class: 'dv-av' }, '👩‍💼'), h('p', {}, t)); }
    function setStep(i) {
      step = i;
      bar.querySelectorAll('li').forEach(function (li, k) { li.className = k < i ? 'done' : k === i ? 'on' : ''; });
      screen.innerHTML = ''; screen.classList.remove('in'); void screen.offsetWidth; screen.classList.add('in');
      [s0, s1, s2, s3, s4, s5][i]();
    }
    function s0() {
      say('Bước 1: Đăng nhập bằng tài khoản định danh điện tử VNeID (số định danh cá nhân 12 số và mật khẩu).');
      const id = h('input', { class: 'dv-in', value: '0860xxxxxxxx', readonly: true, 'aria-label': 'Số định danh cá nhân' });
      const pw = h('input', { class: 'dv-in', type: 'password', value: 'matkhau123', readonly: true, 'aria-label': 'Mật khẩu' });
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, 'Đăng nhập');
      go.addEventListener('click', function () {
        go.disabled = true;
        const pop = h('div', { class: 'dv-pop' }, h('p', { class: 'dv-pop-h' }, A.icon('chat'), 'Mã xác nhận đã được gửi về điện thoại của người dân'), h('div', { class: 'dv-otp' }, '• • • • • •'), h('p', {}, 'Ai nên nhập mã OTP này?'));
        const a = h('button', { class: 'opt', type: 'button' }, 'Người dân tự xem và tự nhập mã');
        const b = h('button', { class: 'opt', type: 'button' }, 'Người dân đọc mã cho cán bộ nhập giúp cho nhanh');
        a.addEventListener('click', function () {
          a.classList.add('right'); b.disabled = a.disabled = true;
          const ck = h('input', { type: 'checkbox', id: 'dvshare' });
          const next = h('button', { class: 'btn btn-sm', type: 'button', disabled: true }, 'Xác nhận chia sẻ và tiếp tục');
          ck.addEventListener('change', function () { next.disabled = !ck.checked; });
          next.addEventListener('click', function () { setStep(1); });
          pop.append(h('label', { class: 'dv-ck', for: 'dvshare' }, ck, h('span', {}, 'Đã đọc kỹ nội dung, đồng ý chia sẻ dữ liệu cho Cổng Dịch vụ công.')), next);
          say('Đúng. OTP là mã xác thực tạm thời: người dân tự nhập, không đọc cho người khác. Tiếp theo đọc kỹ và tích chọn nội dung chia sẻ dữ liệu.', 'ok');
        });
        b.addEventListener('click', function () { b.classList.add('wrong'); say('Chưa đúng. Cán bộ không nhận, không đọc mã OTP của người dân, dù là để giúp. Hãy chọn lại.', 'bad'); });
        pop.append(a, b); screen.append(pop);
      });
      screen.append(h('div', { class: 'dv-card' }, h('h4', {}, 'Đăng nhập VNeID'), h('label', {}, 'Số định danh cá nhân', id), h('label', {}, 'Mật khẩu', pw), go));
    }
    function s1() {
      say('Bước 2: Nhập từ khóa thủ tục rồi bấm tìm kiếm. Tình huống: chị Lan (giả định) cần đăng ký khai sinh cho con mới sinh 2 tuần.');
      const inp = h('input', { class: 'dv-in', placeholder: 'Nhập từ khóa thủ tục…', 'aria-label': 'Từ khóa thủ tục' });
      const res = h('div', { class: 'dv-res' });
      const R = [
        { t: 'Đăng ký khai sinh có yếu tố nước ngoài', ok: false, why: 'Không đúng: trường hợp này không có yếu tố nước ngoài.' },
        { t: 'Đăng ký lại khai sinh', ok: false, why: 'Không đúng: “đăng ký lại” dành cho người đã từng đăng ký nhưng sổ hộ tịch và bản chính đều bị mất.' },
        { t: 'Đăng ký khai sinh', ok: true },
        { t: 'Cấp bản sao trích lục hộ tịch', ok: false, why: 'Không đúng: đây là xin bản sao giấy tờ đã có.' }
      ];
      function search() {
        res.innerHTML = '';
        if (!/khai\s*sinh/i.test(inp.value)) { res.append(h('p', { class: 'muted' }, 'Gợi ý: gõ “khai sinh”.')); return; }
        res.append(h('p', { class: 'muted small' }, 'Có 4 kết quả. Đọc kỹ tên thủ tục trước khi bấm.'));
        R.forEach(function (r) {
          const b = h('button', { class: 'dv-item', type: 'button' }, A.icon('doc'), h('span', {}, r.t));
          b.addEventListener('click', function () {
            if (!r.ok) { b.classList.add('wrong'); say(r.why + ' Mẹo: đọc trọn tên thủ tục trước khi bấm để tránh nhầm quy trình.', 'bad'); return; }
            b.classList.add('right');
            res.append(h('div', { class: 'dv-detail' }, h('h4', {}, 'Chi tiết thủ tục (minh họa)'),
              h('ul', {}, h('li', {}, h('strong', {}, 'Thành phần hồ sơ: '), 'Tờ khai đăng ký khai sinh; Giấy chứng sinh.'), h('li', {}, h('strong', {}, 'Thời hạn giải quyết: '), 'xem trên trang thủ tục.'), h('li', {}, h('strong', {}, 'Phí, lệ phí: '), 'xem mục phí, lệ phí của thủ tục.'), h('li', {}, h('strong', {}, 'Cơ quan thực hiện: '), 'Ủy ban nhân dân cấp xã.')),
              h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { setStep(2); } }, 'Nộp trực tuyến')));
            say('Đúng thủ tục. Luôn xem chi tiết: thành phần hồ sơ, thời hạn, phí, cơ quan thực hiện trước khi bấm nộp.', 'ok');
          });
          res.append(b);
        });
      }
      const go = h('button', { class: 'btn btn-sm', type: 'button', onclick: search }, A.icon('search'), 'Tìm kiếm');
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') search(); });
      screen.append(h('div', { class: 'dv-card' }, h('h4', {}, 'Tra cứu thủ tục hành chính'), h('div', { class: 'dv-row' }, inp, go), h('div', { class: 'dv-chips' }, h('button', { type: 'button', class: 'chip chip-sm', onclick: function () { inp.value = 'khai sinh'; search(); } }, 'khai sinh')), res));
    }
    function s2() {
      say('Bước 3: Chọn đúng nơi tiếp nhận hồ sơ: tỉnh, rồi xã nơi cư trú.');
      const t = h('select', { class: 'dv-in', 'aria-label': 'Tỉnh/Thành phố' }, h('option', { value: '' }, '-- Chọn Tỉnh/Thành phố --'), h('option', {}, 'Tỉnh Vĩnh Long'), h('option', {}, 'Thành phố Cần Thơ'), h('option', {}, 'Tỉnh Đồng Tháp'));
      const x = h('select', { class: 'dv-in', 'aria-label': 'Phường/Xã', disabled: true }, h('option', { value: '' }, '-- Chọn Phường/Xã --'));
      t.addEventListener('change', function () {
        x.innerHTML = ''; x.append(h('option', { value: '' }, '-- Chọn Phường/Xã --'));
        if (t.value === 'Tỉnh Vĩnh Long') { ['Xã Long Hồ', 'Xã Long Thành', 'Phường Long Châu'].forEach(function (n) { x.append(h('option', {}, n)); }); x.disabled = false; say('Tốt. Giờ chọn xã nơi chị Lan cư trú: xã Long Thành.'); }
        else { x.disabled = true; say('Chưa đúng tỉnh. Chị Lan cư trú tại tỉnh Vĩnh Long.', 'bad'); }
      });
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, 'Nộp hồ sơ');
      go.addEventListener('click', function () {
        if (x.value !== 'Xã Long Thành') { say('Hãy chọn đúng “Xã Long Thành”. Chọn sai nơi tiếp nhận làm hồ sơ bị chuyển trả, mất thời gian.', 'bad'); return; }
        setStep(3);
      });
      screen.append(h('div', { class: 'dv-card' }, h('h4', {}, 'Chọn cơ quan thực hiện'), h('label', {}, 'Tỉnh/Thành phố', t), h('label', {}, 'Phường/Xã', x), go));
    }
    function s3() {
      say('Bước 4: Đính kèm đúng thành phần hồ sơ (Tờ khai, Giấy chứng sinh). Chọn tệp rõ nét, đúng định dạng PDF, JPG, DOC.');
      const F = [
        { n: 'To_khai_dang_ky_khai_sinh.pdf', ok: true, k: 'tk' },
        { n: 'Giay_chung_sinh_mo_nhoe.jpg', ok: false, why: 'Ảnh mờ, nhòe: hồ sơ dễ bị yêu cầu bổ sung. Chụp lại rõ nét, đủ 4 góc.' },
        { n: 'Giay_chung_sinh_ro_net.jpg', ok: true, k: 'gcs' },
        { n: 'Video_quay_man_hinh.mp4', ok: false, why: 'Sai định dạng: Cổng chỉ nhận tệp tài liệu, hình ảnh theo yêu cầu.' },
        { n: 'Anh_chan_dung_be.png', ok: false, why: 'Không thuộc thành phần hồ sơ của thủ tục này.' }
      ];
      const got = {};
      const drop = h('div', { class: 'dv-drop' }, A.icon('cloud'), h('p', {}, 'Bấm vào tệp bên dưới để tải lên'));
      const up = h('ul', { class: 'dv-up' });
      const files = h('div', { class: 'dv-files' });
      const go = h('button', { class: 'btn btn-sm', type: 'button', disabled: true }, 'Tiếp tục');
      go.addEventListener('click', function () { setStep(4); });
      F.forEach(function (f) {
        const ext = f.n.split('.').pop().toUpperCase();
        const b = h('button', { class: 'dv-file', type: 'button' }, h('span', { class: 'dv-ext e-' + ext }, ext), h('span', {}, f.n));
        b.addEventListener('click', function () {
          if (!f.ok) { b.classList.add('wrong'); say(f.why, 'bad'); return; }
          if (got[f.k]) return; got[f.k] = 1; b.classList.add('right'); b.disabled = true;
          const li = h('li', {}, h('span', { class: 'dv-ext e-' + ext }, ext), h('span', {}, f.n), h('span', { class: 'dv-prog' }, h('i')), h('b', { class: 'ok' }, '✓'));
          up.append(li);
          if (got.tk && got.gcs) { go.disabled = false; say('Đã đủ thành phần hồ sơ. Kiểm tra lại các tệp đã tải lên đúng nội dung rồi bấm Tiếp tục.', 'ok'); }
          else say('Đã tải lên. Còn thiếu một thành phần hồ sơ.');
        });
        files.append(b);
      });
      screen.append(h('div', { class: 'dv-card' }, h('h4', {}, 'Đính kèm thành phần hồ sơ'), drop, up, h('p', { class: 'muted small' }, 'Tệp trên máy của người dân:'), files, go));
    }
    function s4() {
      say('Bước 5: Nộp hồ sơ. Sau khi gửi, hệ thống hiển thị mã hồ sơ: phải ghi lại để tra cứu.');
      const box = h('div', { class: 'dv-card dv-center' });
      const sub = h('button', { class: 'btn', type: 'button' }, 'Gửi hồ sơ');
      sub.addEventListener('click', async function () {
        sub.remove();
        box.append(h('div', { class: 'dv-spin' })); await U.wait(1100); box.querySelector('.dv-spin').remove();
        const code = h('p', { class: 'dv-code' }, CODE);
        const save = h('button', { class: 'btn btn-sm', type: 'button' }, A.icon('pen'), 'Ghi mã vào sổ');
        save.addEventListener('click', function () { savedCode = CODE; note.querySelector('strong').textContent = CODE; note.classList.add('pop'); save.disabled = true; next.disabled = false; say('Đã ghi mã hồ sơ. Nhắc người dân chụp màn hình hoặc ghi mã ra giấy.', 'ok'); });
        const next = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', disabled: true, onclick: function () { setStep(5); } }, 'Tra cứu trạng thái');
        box.append(h('div', { class: 'dv-okbig' }, '✓'), h('h4', {}, 'Nộp hồ sơ thành công'), h('p', {}, 'Mã số hồ sơ:'), code, h('p', { class: 'muted small' }, 'Hồ sơ đang chờ tiếp nhận'), h('div', { class: 'wg-actions' }, save, next));
        U.confetti(box);
      });
      box.append(A.icon('share', 'dv-big'), h('h4', {}, 'Xác nhận gửi hồ sơ'), h('p', { class: 'muted' }, 'Đăng ký khai sinh · Xã Long Thành · 2 tệp đính kèm'), sub);
      screen.append(box);
    }
    function s5() {
      say('Bước 6: Tra cứu hồ sơ bằng mã hồ sơ để theo dõi tiến độ.');
      const inp = h('input', { class: 'dv-in', placeholder: 'Nhập mã hồ sơ', 'aria-label': 'Mã hồ sơ' });
      const res = h('div');
      const go = h('button', { class: 'btn btn-sm', type: 'button' }, A.icon('search'), 'Tra cứu');
      go.addEventListener('click', async function () {
        res.innerHTML = '';
        if (inp.value.trim() !== CODE) { say('Mã chưa đúng. Lấy mã trong sổ ghi chú (bấm vào sổ để điền).', 'bad'); return; }
        const tl = h('ol', { class: 'dv-tl' });
        [['Đã nộp', 'done'], ['Đã tiếp nhận', 'done'], ['Đang xử lý', 'now'], ['Có kết quả', '']].forEach(function (x) { tl.append(h('li', { class: x[1] }, h('i'), h('span', {}, x[0]))); });
        res.append(h('div', { class: 'dv-detail' }, h('p', {}, h('strong', {}, 'Mã hồ sơ: '), CODE), h('p', {}, h('strong', {}, 'Thủ tục: '), 'Đăng ký khai sinh'), h('p', {}, h('strong', {}, 'Cơ quan: '), 'UBND xã Long Thành'), tl));
        bar.querySelectorAll('li').forEach(function (li) { li.className = 'done'; });
        say('Hoàn thành 6 bước! Khi có kết quả, người dân xem tại mục hồ sơ của mình; nếu hồ sơ bị yêu cầu bổ sung, đọc kỹ lý do để bổ sung đúng.', 'ok');
        U.stamp(browser, 'Hoàn thành', 'good'); U.confetti(browser);
        again.hidden = false;
      });
      note.onclick = function () { if (savedCode) inp.value = savedCode; };
      const again = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', hidden: true, onclick: function () { browser.querySelectorAll('.stamp').forEach(function (x) { x.remove(); }); savedCode = ''; note.querySelector('strong').textContent = '(chưa có mã hồ sơ)'; setStep(0); } }, 'Làm lại từ đầu');
      screen.append(h('div', { class: 'dv-card' }, h('h4', {}, 'Tra cứu tình trạng hồ sơ'), h('div', { class: 'dv-row' }, inp, go), res, again));
    }
    host.append(bar, h('div', { class: 'dv' }, browser, h('div', { class: 'dv-side' }, coach, note)), h('p', { class: 'muted small' }, 'Mô phỏng để luyện thao tác; tên thủ tục, mã hồ sơ, dữ liệu là giả định. Giao diện thật của Cổng Dịch vụ công có thể khác.'));
    setStep(0);
  };

  /* ---------- Gửi phản ánh hiện trường (Smart Vĩnh Long) ---------- */
  A.widgets.phananh = function (host) {
    const TXT = [
      { t: 'Rác!!! Xử lý đi!!!', ok: false, why: 'Quá chung chung: không biết ở đâu, việc gì, mức độ thế nào.' },
      { t: 'Đoạn đường đầu ấp, gần cầu, có ổ gà lớn khoảng 1 mét, trời mưa đọng nước, xe máy dễ té. Đề nghị kiểm tra, sửa chữa.', ok: true },
      { t: 'Ông B. nhà số 15 xả rác bừa bãi, mọi người vào xem mặt ông ta!', ok: false, why: 'Nêu tên, kích động, xúc phạm người khác. Phản ánh cần khách quan, đúng sự việc.' }
    ];
    const IMG = [
      { k: 'blur', ok: false, why: 'Ảnh tối, mờ: không thấy rõ hiện trạng.' },
      { k: 'road', ok: true },
      { k: 'face', ok: false, why: 'Ảnh chụp cận mặt người khác: không cần thiết và ảnh hưởng quyền riêng tư.' }
    ];
    const st = { t: null, loc: false, img: null };
    const tx = h('div', { class: 'pa-opts' });
    TXT.forEach(function (x, i) { tx.append(h('button', { type: 'button', class: 'pa-txt', onclick: function () { st.t = i; tx.querySelectorAll('button').forEach(function (b, k) { b.classList.toggle('on', k === i); }); fb.innerHTML = ''; } }, x.t)); });
    const map = h('div', { class: 'pa-map' }, h('span', { class: 'pa-road' }), h('span', { class: 'pa-river' }), h('span', { class: 'pa-pin' }, '📍'));
    const locBtn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { st.loc = true; map.classList.add('dropped'); locBtn.textContent = '✓ Đã lấy vị trí hiện tại'; } }, '📍 Chọn vị trí hiện tại');
    const imgs = h('div', { class: 'pa-imgs' });
    const art = {
      blur: '<svg viewBox="0 0 90 70"><rect width="90" height="70" fill="#2C3440"/><ellipse cx="45" cy="45" rx="30" ry="10" fill="#3F4855" filter="url(#b1)"/><defs><filter id="b1"><feGaussianBlur stdDeviation="3"/></filter></defs></svg>',
      road: '<svg viewBox="0 0 90 70"><rect width="90" height="70" fill="#BFE3F7"/><path d="M0 40 L90 32 L90 70 L0 70Z" fill="#7B7F86"/><ellipse cx="46" cy="52" rx="16" ry="6" fill="#4A4E55"/><ellipse cx="46" cy="51" rx="12" ry="4" fill="#6FA7C9"/><path d="M0 40 L90 32" stroke="#fff" stroke-dasharray="6 4"/></svg>',
      face: '<svg viewBox="0 0 90 70"><rect width="90" height="70" fill="#E8D8C6"/><circle cx="45" cy="34" r="20" fill="#F2C9A5"/><circle cx="38" cy="31" r="2.5" fill="#333"/><circle cx="52" cy="31" r="2.5" fill="#333"/><path d="M38 42 Q45 47 52 42" stroke="#9A4B3A" stroke-width="2" fill="none"/><path d="M25 25 Q45 5 65 25" fill="#3B2B22"/></svg>'
    };
    IMG.forEach(function (x, i) { imgs.append(h('button', { type: 'button', class: 'pa-img', html: art[x.k], 'aria-label': 'Ảnh ' + (i + 1), onclick: function () { st.img = i; imgs.querySelectorAll('button').forEach(function (b, k) { b.classList.toggle('on', k === i); }); fb.innerHTML = ''; } })); });
    const fb = h('div', { class: 'pa-fb' });
    const phone = h('div', { class: 'pa-phone' });
    const send = h('button', { class: 'btn', type: 'button' }, 'Gửi phản ánh');
    send.addEventListener('click', function () {
      fb.innerHTML = ''; const err = [];
      if (st.t == null) err.push('Chưa nhập nội dung phản ánh.'); else if (!TXT[st.t].ok) err.push('Nội dung: ' + TXT[st.t].why);
      if (!st.loc) err.push('Chưa chọn vị trí: người xử lý không biết hiện trường ở đâu.');
      if (st.img == null) err.push('Chưa đính kèm ảnh hoặc video hiện trường.'); else if (!IMG[st.img].ok) err.push('Ảnh: ' + IMG[st.img].why);
      if (err.length) { fb.append(h('ul', { class: 'bad' }, err.map(function (e) { return h('li', {}, e); }))); return; }
      const dlg = h('div', { class: 'pa-dlg' }, h('p', { class: 'pa-dlg-h' }, 'GỬI PHẢN ÁNH'), h('p', {}, 'Phản ánh đã được gửi thành công, vui lòng chờ phản hồi của đơn vị xử lý. Trân trọng cảm ơn!'), h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { dlg.remove(); } }, '🏠 Về trang chủ'));
      phone.append(dlg); U.confetti(phone);
    });
    phone.append(h('div', { class: 'pa-top' }, '‹ Gửi phản ánh'),
      h('div', { class: 'pa-body' }, h('p', { class: 'pa-l' }, '1. Nội dung phản ánh'), tx, h('p', { class: 'pa-l' }, '2. Vị trí'), map, locBtn, h('p', { class: 'pa-l' }, '3. Ảnh hoặc video'), imgs, send));
    host.append(h('div', { class: 'pa' }, phone, h('div', { class: 'pa-side' }, h('h4', {}, 'Một phản ánh tốt có'), h('ol', {}, h('li', {}, 'Nội dung rõ: việc gì, ở đâu, mức độ.'), h('li', {}, 'Vị trí chính xác (nhập hoặc chọn từ bản đồ).'), h('li', {}, 'Ảnh hoặc video rõ hiện trạng.'), h('li', {}, 'Lời lẽ khách quan, không xúc phạm, không lộ thông tin riêng của người khác.')), fb)));
  };

  /* ---------- Đóng vai: hỗ trợ người dân ---------- */
  A.widgets.roleplay = function (host, o) {
    let si = 0;
    const tabs = h('div', { class: 'rp-tabs' });
    const stage = h('div', { class: 'rp-stage' });
    const done = U.store.get('rp-done', []);
    o.cases.forEach(function (c, i) {
      const b = h('button', { type: 'button', class: 'rp-tab' + (done.indexOf(i) >= 0 ? ' done' : ''), 'aria-pressed': String(i === 0) }, h('span', { class: 'rp-ava' }, c.ava), h('span', {}, h('strong', {}, c.who), h('small', {}, c.tag)));
      b.addEventListener('click', function () { si = i; tabs.querySelectorAll('button').forEach(function (x, k) { x.setAttribute('aria-pressed', String(k === i)); }); play(); });
      tabs.append(b);
    });
    function play() {
      const c = o.cases[si]; let t = 0, score = 0;
      stage.innerHTML = '';
      const chat = h('div', { class: 'rp-chat' });
      const opts = h('div', { class: 'rp-opts' });
      const hearts = h('div', { class: 'rp-hearts', 'aria-label': 'Mức hài lòng' });
      stage.append(h('div', { class: 'rp-head' }, h('span', { class: 'rp-ava big' }, c.ava), h('div', {}, h('strong', {}, c.who), h('p', {}, c.ctx)), hearts), chat, opts);
      function drawHearts() { hearts.innerHTML = ''; for (let k = 0; k < c.turns.length; k++) hearts.append(h('span', { class: k < score ? 'on' : '' }, '♥')); }
      async function turn() {
        drawHearts(); opts.innerHTML = '';
        if (t >= c.turns.length) {
          const full = score === c.turns.length;
          chat.append(h('div', { class: 'rp-end ' + (full ? 'ok' : '') }, h('strong', {}, full ? 'Hỗ trợ đúng cách! ' : 'Hoàn thành. '), c.lesson));
          if (full) { U.confetti(stage); if (done.indexOf(si) < 0) { done.push(si); U.store.set('rp-done', done); tabs.children[si].classList.add('done'); } }
          opts.append(h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: play }, 'Đóng vai lại'));
          chat.scrollTop = chat.scrollHeight; return;
        }
        const tu = c.turns[t];
        const typing = h('div', { class: 'rp-msg them typing' }, h('i'), h('i'), h('i')); chat.append(typing); chat.scrollTop = chat.scrollHeight;
        await U.wait(650); typing.remove();
        chat.append(h('div', { class: 'rp-msg them' }, tu.say)); chat.scrollTop = chat.scrollHeight;
        opts.append(h('p', { class: 'rp-ask' }, 'Cán bộ trả lời:'));
        U.shuffle(tu.opts.map(function (x, k) { return Object.assign({ k: k }, x); })).forEach(function (op) {
          opts.append(h('button', { class: 'opt', type: 'button', onclick: async function () {
            opts.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
            this.classList.add(op.ok ? 'right' : 'wrong');
            chat.append(h('div', { class: 'rp-msg me' }, op.t));
            chat.append(h('div', { class: 'rp-fb ' + (op.ok ? 'ok' : 'bad') }, (op.ok ? '✓ ' : '✗ ') + op.why));
            chat.scrollTop = chat.scrollHeight;
            if (op.ok) score++;
            await U.wait(op.ok ? 1100 : 1900); t++; turn();
          } }, op.t));
        });
      }
      turn();
    }
    host.append(tabs, stage); play();
  };
})(window.ATTT);
