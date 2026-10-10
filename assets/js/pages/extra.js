/* Trang thực hành theo nhóm, thư viện câu lệnh mẫu, sổ tay bỏ túi. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  A.pages.library = function () {
    const page = h('article', { class: 'page' });
    page.append(h('header', { class: 'topic-head' }, h('h1', {}, 'Thư viện câu lệnh mẫu'), h('p', { class: 'lead' }, 'Các câu lệnh mẫu trong bài giảng. Bấm “Sao chép”, dán vào Gemini, ChatGPT…, thay phần trong ngoặc vuông bằng dữ liệu được phép sử dụng.')));
    /* Bộ ghép câu lệnh */
    const K = ['Vai trò', 'Bối cảnh', 'Nhiệm vụ', 'Đối tượng đọc', 'Định dạng', 'Ràng buộc'];
    const PH = ['Bạn là cán bộ … của UBND xã Long Thành (hoặc: Bạn là người bán hàng…).', 'Việc gì, khi nào, ở đâu, ai liên quan (chỉ dữ liệu được phép).', 'Hãy soạn / tóm tắt / phân tích …', 'Người đọc là …', 'Dưới … từ; dạng bảng / gạch đầu dòng; xuất file Word.', 'Không tự bịa số liệu, căn cứ, tên người, số điện thoại. Thiếu thông tin ghi [Cần bổ sung].'];
    const vals = U.store.get('builder', K.map(function () { return ''; }));
    const out = h('div', { class: 'gt-preview' });
    const meter = h('div', { class: 'gt-meter' }, h('span'));
    const cnt = h('span', { class: 'muted small' });
    function upd() {
      const n = vals.filter(function (v) { return v.trim(); }).length;
      out.textContent = vals.filter(function (v) { return v.trim(); }).join(' ') || '(Điền các ô bên trái để ghép câu lệnh.)';
      meter.firstChild.style.width = (n / 6 * 100) + '%'; meter.className = 'gt-meter' + (n === 6 ? ' full' : '');
      cnt.textContent = n + '/6 thành phần'; U.store.set('builder', vals);
    }
    const ed = h('div', { class: 'gt-ed' });
    K.forEach(function (k, i) {
      const ta = h('textarea', { rows: 2, placeholder: PH[i], 'aria-label': k }); ta.value = vals[i];
      ta.addEventListener('input', function () { vals[i] = ta.value; upd(); });
      ed.append(h('label', { class: 'gt-row c' + i }, h('span', { class: 'gt-lab' }, h('b', {}, String(i + 1)), k), ta));
    });
    page.append(h('section', { class: 'blk wg' }, h('h2', {}, 'Bộ ghép câu lệnh 6 thành phần vàng'),
      h('div', { class: 'gt-grid' }, ed, h('div', {}, h('h4', { class: 'sub-h' }, 'Câu lệnh hoàn chỉnh'), meter, cnt, out, h('div', { class: 'wg-actions' },
        h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { U.copy(out.textContent); } }, A.icon('copy'), 'Sao chép'),
        h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { vals.fill(''); ed.querySelectorAll('textarea').forEach(function (t) { t.value = ''; }); upd(); } }, 'Xóa'))))));
    upd();
    /* Bộ lọc */
    let f = 0, q = '';
    const chips = h('div', { class: 'lib-f' });
    ['Tất cả'].concat(A.data.topics.map(function (t) { return 'CĐ ' + t.n; })).forEach(function (t, i) { chips.append(h('button', { type: 'button', class: 'chip', 'aria-pressed': String(i === 0), onclick: function () { f = i; chips.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); }); draw(); } }, t)); });
    const search = h('input', { type: 'search', class: 'lib-s', placeholder: 'Tìm câu lệnh, ví dụ: Zalo, pháp luật, số liệu…', 'aria-label': 'Tìm câu lệnh' });
    search.addEventListener('input', function () { q = search.value.toLowerCase(); draw(); });
    const grid = h('div', { class: 'lib-grid' });
    const all = A.data.library.slice();
    function draw() {
      grid.innerHTML = '';
      all.filter(function (x) { return (!f || x.cd === f) && (!q || (x.t + ' ' + x.text).toLowerCase().indexOf(q) >= 0); }).forEach(function (x) {
        const body = h('p', { class: 'lib-t' }, x.text);
        grid.append(h('article', { class: 'lib-c' }, h('div', { class: 'lib-h' }, A.icon(x.i || 'doc'), h('span', {}, h('small', {}, 'Chuyên đề ' + x.cd), h('strong', {}, x.t))), body,
          h('div', { class: 'wg-actions' }, h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { U.copy(x.text); } }, A.icon('copy'), 'Sao chép'),
            h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { body.classList.toggle('open'); this.textContent = body.classList.contains('open') ? 'Thu gọn' : 'Xem đủ'; } }, 'Xem đủ'))));
      });
      if (!grid.children.length) grid.append(h('p', { class: 'muted' }, 'Không tìm thấy câu lệnh phù hợp.'));
    }
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Câu lệnh mẫu theo chuyên đề'), chips, search, grid));
    draw();
    return page;
  };

  A.pages.handbook = function () {
    const page = h('article', { class: 'page handbook' });
    page.append(h('header', { class: 'topic-head' }, h('h1', {}, 'Sổ tay bỏ túi'), h('p', { class: 'lead' }, 'Những điều cần nhớ khi dùng AI trong công việc hằng ngày. Có thể in ra hoặc lưu trên điện thoại.')));
    const cards = [
      { c: 0, i: 'phone', t: '3 nguyên tắc khi hướng dẫn người dân', l: ['Cầm điện thoại càng ít càng tốt: chỉ vị trí nút bấm', 'OTP, mật khẩu, passcode: người dân tự nhập, không đọc to', 'Sai thông tin, lỗi xác thực: ghi nhận, chuyển đúng nơi hỗ trợ'] },
      { c: 1, i: 'idcard', t: 'VNeID cần nhớ', l: ['Mức 2 mới dùng được nhiều tiện ích quan trọng', 'Mật khẩu: đăng nhập (8–20 ký tự)', 'Passcode: 6 số, mở ví giấy tờ', 'Định danh mức 2, sai thông tin dân cư: Công an xã', 'Đổi máy mới: xác thực NFC bằng căn cước gắn chip'] },
      { c: 2, i: 'globe', t: 'Nộp hồ sơ trực tuyến 6 bước', l: ['Đăng nhập bằng VNeID', 'Tra cứu đúng thủ tục', 'Nhập thông tin', 'Đính kèm hồ sơ PDF/JPG rõ nét', 'Thanh toán (nếu có), lấy biên lai', 'Ghi mã hồ sơ, tra cứu kết quả'] },
      { c: 3, i: 'heart', t: 'Sổ sức khỏe điện tử', l: ['Tích hợp thẻ BHYT: Ví giấy tờ → Tích hợp giấy tờ', 'Xuất trình BHYT: Ví giấy tờ → Xuất trình → passcode', 'Xem hồ sơ: Hồ sơ sức khỏe → Sổ sức khỏe điện tử', 'Không thấy mục: cập nhật app, kiểm tra mức 2'] },
      { c: 4, i: 'building', t: 'Smart Vĩnh Long', l: ['Tải đúng ứng dụng trên kho chính thức', 'Đăng ký: số điện thoại chính xác, OTP từ VINHLONG_SO', 'Phản ánh: nội dung rõ, vị trí, ảnh rõ, lời lẽ khách quan'] },
      { c: 5, i: 'ai', t: 'Dùng AI an toàn', l: ['Câu lệnh 6 thành phần: vai trò, bối cảnh, nhiệm vụ, đối tượng, định dạng, ràng buộc', 'Luôn kiểm tra lại: AI có thể bịa', 'Không nhập CCCD, số điện thoại, OTP, mật khẩu'] },
      { c: 6, i: 'alert', t: 'Phòng chống lừa đảo', l: ['Không bấm link lạ, không cung cấp OTP', 'Ảnh chuyển khoản chưa chắc đã nhận tiền', 'Thấy chưa chắc đã tin, nghe chưa chắc là thật', 'Bật xác thực hai lớp cho Zalo, Facebook, TikTok'] },
      { c: 7, i: 'shield', t: 'Bị lừa đảo: 5 bước', l: ['Thu thập bằng chứng', 'Liên hệ ngân hàng', 'Trình báo cơ quan chức năng', 'Thông báo người thân, khách hàng', 'Rà soát lại bảo mật'] }
    ];
    const grid = h('div', { class: 'hb-grid' });
    cards.forEach(function (c) { grid.append(h('section', { class: 'hb c' + c.c }, h('h2', {}, A.icon(c.i), c.t), h('ul', {}, c.l.map(function (x) { return h('li', {}, x); })))); });
    page.append(grid);
    const ct = h('div', { class: 'wg-host wg-contacts' }); A.widgets.contacts(ct);
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Danh bạ khẩn'), ct));
    page.append(h('div', { class: 'wg-actions no-print' }, h('button', { class: 'btn', type: 'button', onclick: function () { window.print(); } }, 'In sổ tay')));
    return page;
  };
})(window.ATTT);
