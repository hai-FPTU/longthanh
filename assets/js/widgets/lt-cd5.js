/* Chuyên đề 5: Tiếp nhận, giải quyết thủ tục hành chính và giao tiếp với người dân. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Từ ngôn ngữ nghiệp vụ sang ngôn ngữ phục vụ ---------- */
  A.widgets.plainlang = function (host) {
    const V = [
      { lab: 'Bản gốc (nghiệp vụ)', html: 'Người yêu cầu thực hiện thủ tục có trách nhiệm xuất trình thành phần hồ sơ theo quy định và chịu trách nhiệm về tính chính xác của thông tin kê khai; trường hợp hồ sơ chưa đầy đủ, cán bộ tiếp nhận hướng dẫn bổ sung, hoàn thiện theo quy định <b class="k">trong 01 lần</b>.' },
      { lab: 'Bản viết lại (phục vụ)', html: 'Anh/chị vui lòng chuẩn bị đủ giấy tờ theo danh sách. Trước khi nộp, kiểm tra kỹ họ tên, số giấy tờ. Nếu hồ sơ còn thiếu, cán bộ một cửa sẽ hướng dẫn bổ sung <b class="k">một lần</b> cho đầy đủ.' },
      { lab: 'Bản AI “quá tay”', html: 'Bà con cứ mang giấy tờ gì có sẵn tới, <mark class="b">thiếu cũng không sao</mark>, cán bộ sẽ <mark class="b">làm giúp trong ngày</mark> nha!' }
    ];
    const seg = h('div', { class: 'seg' });
    const card = h('div', { class: 'plg' });
    const note = h('p', { class: 'plg-n', 'aria-live': 'polite' });
    const NOTES = ['Câu dài, nhiều thuật ngữ: người dân khó biết mình phải làm gì trước.', 'Ngắn, rõ hành động, giữ nguyên nội dung pháp lý (hướng dẫn bổ sung một lần).', 'Thân thiện nhưng làm SAI quy định: hứa “thiếu cũng không sao”, “làm trong ngày”. AI được đổi cách diễn đạt, KHÔNG được đổi nội dung pháp lý.'];
    function show(k) {
      seg.querySelectorAll('button').forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === k)); });
      card.classList.remove('in'); void card.offsetWidth;
      card.innerHTML = ''; card.className = 'plg v' + k + ' in';
      card.append(h('p', { class: 'plg-lab' }, V[k].lab), h('p', { class: 'plg-t', html: V[k].html }));
      note.className = 'plg-n ' + (k === 1 ? 'ok' : k === 2 ? 'bad' : '');
      note.textContent = NOTES[k];
      if (k === 2) U.stamp(card, 'Sai quy định', 'bad'); if (k === 1) U.stamp(card, 'Dễ hiểu', 'good');
    }
    V.forEach(function (v, k) { seg.append(h('button', { type: 'button', onclick: function () { show(k); } }, ['Nghiệp vụ', 'Phục vụ', 'AI quá tay'][k])); });
    host.append(seg, card, note);
    show(0);
  };

  /* ---------- Soạn bài Zalo với các ràng buộc ---------- */
  A.widgets.zalo = function (host, o) {
    o = o || {};
    const D = Object.assign({
      data: 'Thu gom rác cồng kềnh sáng Thứ Bảy 03/10/2026, mang rác ra trước 08h00; tập kết tại Sân sinh hoạt Khu phố 2; chỉ nhận rác cồng kềnh, không vứt kèm rác sinh hoạt.',
      sender: 'UBND xã Long Thành', group: 'Nhóm thông tin Khu phố 2', av: 'LT',
      hello: ['📢', 'Kính gửi bà con cô bác Khu phố 2,', 'Kính gửi: Nhân dân Khu phố 2.'],
      intro: ['UBND xã Long Thành trân trọng thông báo lịch thu gom rác thải cồng kềnh (giường, tủ, nệm, bàn ghế cũ…) cuối tuần này nhằm giữ gìn cảnh quan môi trường sạch đẹp:', 'Thực hiện kế hoạch bảo vệ môi trường, giữ gìn mỹ quan đô thị trên địa bàn, Ủy ban nhân dân xã thông báo về việc tổ chức thu gom rác thải có kích thước lớn như sau:'],
      items: [['🕗', 'Thời gian tập kết: trước 08h00 sáng Thứ Bảy, ngày 03/10/2026.'], ['📍', 'Địa điểm: Sân sinh hoạt Khu phố 2.'], ['⚠️', 'Lưu ý: điểm thu gom CHỈ NHẬN rác cồng kềnh, bà con vui lòng KHÔNG mang rác sinh hoạt hằng ngày ra khu vực này.']],
      fake: ['💰', 'Phí thu gom: ', '50.000 đồng/món', '0909 888 777'],
      long: 'Việc thu gom rác thải cồng kềnh là một trong những hoạt động thiết thực nhằm thực hiện tiêu chí môi trường, góp phần xây dựng nếp sống văn minh, nâng cao ý thức trách nhiệm của mỗi người dân, mỗi hộ gia đình trong công tác bảo vệ môi trường, phòng chống dịch bệnh, đồng thời tạo cảnh quan xanh, sạch, đẹp trên toàn địa bàn khu phố nói riêng và toàn xã nói chung. Ủy ban nhân dân xã đề nghị Ban điều hành khu phố tổ chức tuyên truyền sâu rộng…',
      close: ['Kính mong bà con chủ động dọn dẹp và mang rác ra đúng giờ, đúng nơi quy định. Cùng chung tay xây dựng Khu phố 2 sáng – xanh – sạch – đẹp nhé ạ! ', '💚', 'Đề nghị Nhân dân nghiêm túc thực hiện.']
    }, o);
    const OPT = [
      { k: 'tone', t: 'Giọng thân thiện, vận động' },
      { k: 'icon', t: 'Dùng biểu tượng (icon)' },
      { k: 'list', t: 'Chia 3–5 ý gạch đầu dòng' },
      { k: 'short', t: 'Dưới 150 từ' },
      { k: 'lim', t: D.limLabel || 'Không tự bịa chi phí, số điện thoại' }
    ];
    const on = { tone: true, icon: false, list: false, short: false, lim: false };
    const ctrl = h('div', { class: 'za-ctrl' });
    OPT.forEach(function (op) {
      const id = 'za-' + op.k + Math.random().toString(36).slice(2, 6);
      const cb = h('input', { type: 'checkbox', id: id }); cb.checked = on[op.k];
      cb.addEventListener('change', function () { on[op.k] = cb.checked; });
      ctrl.append(h('label', { class: 'switch', for: id }, cb, h('span', {}, op.t)));
    });
    const chat = h('div', { class: 'za-chat' });
    const words = h('p', { class: 'za-wc' });
    function build() {
      const ic = function (e) { return on.icon ? e + ' ' : ''; };
      const b = function (t) { return '<mark class="b">' + t + '</mark>'; };
      const p = [];
      p.push(on.tone ? ic(D.hello[0]) + D.hello[1] : D.hello[2]);
      p.push(on.tone ? D.intro[0] : D.intro[1]);
      const items = D.items.map(function (x) { return ic(x[0]) + x[1]; });
      if (!on.lim) items.push(ic(D.fake[0]) + D.fake[1] + b(D.fake[2]) + '. Liên hệ: ' + b(D.fake[3]) + '.');
      if (on.list) p.push('<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'); else p.push(items.join(' '));
      if (!on.short) p.push('<span class="za-long">' + D.long + '</span>');
      p.push(on.tone ? D.close[0] + ic(D.close[1]) : D.close[2]);
      return p.map(function (x) { return x.indexOf('<ul>') === 0 ? x : '<p>' + x + '</p>'; }).join('');
    }
    const go = h('button', { class: 'btn btn-sm', type: 'button' }, A.icon('wand'), 'Tạo bài đăng');
    go.addEventListener('click', async function () {
      go.disabled = true; chat.innerHTML = ''; host.querySelectorAll('.stamp').forEach(function (x) { x.remove(); });
      const typing = h('div', { class: 'za-msg typing' }, h('i'), h('i'), h('i'));
      chat.append(typing); await U.wait(900); typing.remove();
      const msg = h('div', { class: 'za-msg', html: build() }); chat.append(msg);
      const n = msg.textContent.trim().split(/\s+/).length;
      const bad = msg.querySelectorAll('mark.b').length;
      words.innerHTML = '';
      const okAll = n < 150 && !bad && on.list && on.tone;
      words.append(h('span', { class: n < 150 ? 'ok' : 'bad' }, 'Số từ: ' + n + (n < 150 ? ' (đạt)' : ' (quá dài)')), ' · ', h('span', { class: bad ? 'bad' : 'ok' }, bad ? bad + ' chỗ AI tự bịa' : 'Không có thông tin bịa'));
      if (okAll) { U.stamp(chat.parentNode, 'Đăng được', 'good'); U.confetti(chat.parentNode); } else if (bad) U.stamp(chat.parentNode, 'Có thông tin bịa', 'bad');
      go.disabled = false;
    });
    host.append(h('div', { class: 'za' },
      h('div', { class: 'za-left' }, h('div', { class: 'za-data' }, h('strong', {}, 'Dữ liệu gốc: '), D.data), h('h4', { class: 'sub-h' }, 'Yêu cầu trong câu lệnh'), ctrl, h('div', { class: 'wg-actions' }, go), words),
      h('div', { class: 'za-phone' }, h('div', { class: 'za-bar' }, h('span', { class: 'za-av' }, D.av), h('span', {}, h('strong', {}, D.sender), h('small', {}, D.group))), chat)));
  };
})(window.ATTT);
