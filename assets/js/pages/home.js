/* Trang chủ và trang căn cứ pháp lý. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, C = A.config;
  const TICONS = ['ai', 'idcard', 'heart', 'shield', 'users'];

  A.pages.home = function () {
    const page = h('article', { class: 'page home' });
    /* Hero: câu lệnh 6 thành phần → AI → bản nháp → kiểm tra */
    const chips = ['VNeID', 'Dịch vụ công', 'Sổ sức khỏe', 'Smart Vĩnh Long', 'Trợ lý AI', '2FA'];
    const demo = h('div', { class: 'hx', 'aria-hidden': 'true' },
      h('div', { class: 'hx-chat' }, h('p', { class: 'hx-k' }, 'Kỹ năng số'), h('div', { class: 'hx-chips' }, chips.map(function (c, i) { return h('span', { class: 'hx-chip c' + i, style: { '--d': i } }, c); }))),
      h('div', { class: 'hx-bot' }, A.icon('ai'), h('span', { class: 'hx-pulse' })),
      h('div', { class: 'hx-doc' }, h('p', { class: 'hx-dt' }, 'NỘP HỒ SƠ THÀNH CÔNG'), h('i'), h('i'), h('i'), h('i', { class: 'warn' }), h('i'), h('i', { class: 'short' }),
        h('ul', { class: 'hx-checks' }, ['Người dân tự nhập OTP', 'Đúng thủ tục', 'Hồ sơ rõ nét', 'Đã lưu mã hồ sơ'].map(function (t, i) { return h('li', { style: { '--d': i } }, t); }))));
    const heroTxt = h('div', { class: 'hero-txt' },
      h('p', { class: 'hero-org' }, C.organizer),
      h('h1', {}, 'Kỹ năng số cơ bản', h('span', { class: 'hero-h1-2' }, 'và hỗ trợ người dân sử dụng dịch vụ công trực tuyến')),
      h('p', { class: 'hero-sub' }, 'Giáo trình tương tác: làm quen AI, hướng dẫn VNeID và Dịch vụ công, cài Sổ sức khỏe điện tử và Smart Vĩnh Long, phòng chống lừa đảo, đóng vai hỗ trợ người dân.'),
      h('dl', { class: 'hero-facts' },
        h('div', {}, h('dt', {}, 'Thời gian'), h('dd', {}, C.date + ' (' + C.sessions + ')')),
        h('div', {}, h('dt', {}, 'Địa điểm'), h('dd', {}, C.venue)),
        h('div', {}, h('dt', {}, 'Học viên'), h('dd', {}, C.learners + ' học viên · ' + C.className + ' · thực hành theo nhóm ấp'))),
      h('div', { class: 'hero-cta' }, h('a', { class: 'btn', href: '#/khao-sat' }, 'Làm khảo sát đầu vào'), h('a', { class: 'btn btn-ghost', href: '#/chuyen-de/1' }, 'Bắt đầu học')));
    page.append(h('section', { class: 'hero' }, heroTxt, demo));
    (async function loop() {
      await U.wait(300);
      while (demo.isConnected) {
        demo.className = 'hx'; await U.wait(400);
        demo.classList.add('s1'); await U.wait(1700);
        demo.classList.add('s2'); await U.wait(1300);
        demo.classList.add('s3'); await U.wait(1600);
        demo.classList.add('s4'); await U.wait(3200);
        if (U.reduced()) return;
      }
    })();

    /* 6 chuyên đề */
    const visited = U.store.get('visited', []);
    const grid = h('div', { class: 'cd-grid' });
    A.data.topics.forEach(function (t, i) {
      grid.append(h('a', { class: 'cd-card c' + i + (visited.indexOf(t.n) >= 0 ? ' done' : ''), href: '#/chuyen-de/' + t.n, style: { '--d': i } },
        h('span', { class: 'cd-ico' }, A.icon(TICONS[i])), h('span', { class: 'cd-n' }, 'Chuyên đề ' + t.n + ' · ' + t.session), h('strong', {}, t.title), h('span', { class: 'cd-t' }, t.time), h('span', { class: 'cd-ok' }, '✓ Đã học')));
    });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Năm chuyên đề'), grid));

    /* Mã QR */
    if (window.qrcode && /^https?:$/.test(location.protocol)) {
      const url = location.origin + location.pathname;
      const qr = window.qrcode(0, 'M'); qr.addData(url); qr.make();
      page.append(h('section', { class: 'qr-box' },
        h('div', { class: 'qr-img', html: qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true }) }),
        h('div', {}, h('h2', {}, 'Mở giáo trình trên điện thoại'), h('p', {}, 'Mở ứng dụng Camera hoặc Zalo, quét mã để vào giáo trình. Không cần cài đặt, không cần đăng nhập.'), h('p', { class: 'qr-url' }, url),
          h('p', { class: 'muted small' }, 'Có thể chọn “Thêm vào màn hình chính” để mở nhanh như một ứng dụng.'))));
    }

    /* Lịch */
    const tl = h('ol', { class: 'timeline' });
    C.schedule.forEach(function (it) {
      let title = it.title;
      const m = /^chuyen-de\/(\d)$/.exec(it.route || '');
      if (m) title = 'Chuyên đề ' + m[1] + '. ' + A.data.topics[+m[1] - 1].title;
      const inner = [h('span', { class: 'tl-time' }, it.time), h('span', { class: 'tl-title' }, title)];
      tl.append(h('li', { class: 'tl-' + it.session + (it.route ? '' : ' tl-break') }, it.route ? h('a', { href: '#/' + it.route }, inner) : h('div', {}, inner)));
    });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Chương trình'), h('div', { class: 'tl-wrap' }, h('div', {}, h('h3', { class: 'tl-h' }, 'Buổi sáng'), h('p', { class: 'muted' }, 'Kỹ năng số và AI; VNeID và Dịch vụ công trực tuyến.')), h('div', {}, h('h3', { class: 'tl-h' }, 'Buổi chiều'), h('p', { class: 'muted' }, 'Cài đặt ứng dụng; phòng chống lừa đảo; đóng vai xử lý tình huống.'))), tl,
      h('p', { class: 'muted small' }, 'Giờ học có thể điều chỉnh theo thực tế lớp học.')));

    /* Mục tiêu */
    const og = h('div', { class: 'obj-grid' }); let n = 0;
    A.data.objectives.forEach(function (gr) {
      const ol = h('ol', { start: n + 1 }); gr.items.forEach(function (x) { n++; ol.append(h('li', {}, x)); });
      og.append(h('div', { class: 'obj' }, h('h3', {}, gr.group), ol));
    });
    page.append(h('section', { class: 'blk' }, h('h2', {}, 'Mục tiêu tập huấn'), og));

    page.append(h('section', { class: 'blk how' }, h('h2', {}, 'Cách sử dụng giáo trình'),
      h('dl', { class: 'points' },
        h('div', { class: 'pt' }, h('dt', {}, 'Học viên'), h('dd', {}, 'Mở giáo trình trên điện thoại, làm bài tập và mô phỏng cùng giảng viên, thực hành song song trên ứng dụng thật. Kết quả chỉ lưu trên trình duyệt của mình.')),
        h('div', { class: 'pt' }, h('dt', {}, 'Giảng viên'), h('dd', {}, 'Bật “Chế độ trình chiếu” để phóng to chữ; dùng phím mũi tên trái, phải để chuyển trang.')),
        h('div', { class: 'pt' }, h('dt', {}, 'Sau tập huấn'), h('dd', {}, 'Dùng “Sổ tay bỏ túi” khi hỗ trợ người dân; xem lại mô phỏng Cổng Dịch vụ công bất cứ lúc nào.')))));
    return page;
  };

  A.pages.legal = function () {
    const page = h('article', { class: 'page' });
    page.append(h('header', { class: 'topic-head' }, h('h1', {}, 'Căn cứ pháp lý'), h('p', { class: 'lead' }, 'Các văn bản đang có hiệu lực liên quan đến định danh điện tử, giao dịch điện tử, bảo vệ dữ liệu cá nhân, an ninh mạng và trí tuệ nhân tạo. Rà soát đến tháng 9 năm 2026.')));
    const groups = [['party', 'Văn bản của Đảng', 'flag'], ['law', 'Luật', 'scale'], ['decree', 'Nghị định, thông tư', 'doc'], ['guide', 'Văn bản hướng dẫn', 'note']];
    groups.forEach(function (g) {
      const items = A.data.laws.filter(function (l) { return l.kind === g[0]; });
      if (!items.length) return;
      const grid = h('div', { class: 'laws' });
      items.forEach(function (l) {
        grid.append(h('article', { class: 'law law-' + l.kind },
          h('div', { class: 'law-top' }, A.icon(g[2]), h('span', { class: 'law-code' }, l.code)),
          h('h3', {}, l.name), h('p', { class: 'law-st' }, l.effect), h('p', {}, l.scope),
          h('p', { class: 'law-tp' }, 'Liên quan: ', l.topics.map(function (t, i) { return [i ? ', ' : '', h('a', { href: '#/chuyen-de/' + t }, 'Chuyên đề ' + t)]; }))));
      });
      page.append(h('section', { class: 'blk' }, h('h2', {}, g[1] + ' (' + items.length + ')'), grid));
    });
    page.append(h('p', { class: 'muted small' }, 'Trước khi trích dẫn trong văn bản của cơ quan, đề nghị tra cứu điều, khoản cụ thể trên Cơ sở dữ liệu quốc gia về văn bản pháp luật (vbpl.vn).'));
    return page;
  };
})(window.ATTT);
