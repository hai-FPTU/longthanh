/* Chuyên đề 6: An toàn thông tin và nhận diện rủi ro AI. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h;

  /* ---------- Cài đặt quyền riêng tư của công cụ AI ---------- */
  A.widgets.privacy = function (host) {
    const T = [
      { k: 'hist', t: 'Quản lý lịch sử trò chuyện', d: 'Xóa các phiên có nội dung công việc ngay khi xong việc.', want: false, lab: 'Lưu lịch sử trò chuyện' },
      { k: 'train', t: 'Tắt tính năng huấn luyện', d: 'Tắt tùy chọn “Dùng dữ liệu hội thoại để huấn luyện / cải thiện mô hình”.', want: false, lab: 'Dùng dữ liệu của tôi để cải thiện mô hình' },
      { k: 'temp', t: 'Chế độ trò chuyện tạm thời', d: 'Ưu tiên “Trò chuyện tạm thời” khi xử lý văn bản dự thảo.', want: true, lab: 'Trò chuyện tạm thời' }
    ];
    const st = { hist: true, train: true, temp: false };
    const scr = h('div', { class: 'pv-scr' }, h('div', { class: 'pv-head' }, A.icon('gear'), h('strong', {}, 'Cài đặt – Dữ liệu và quyền riêng tư')));
    const flow = h('div', { class: 'pv-flow' }, A.icon('laptop'), h('span', { class: 'pv-pipe' }, h('i'), h('i'), h('i')), A.icon('cloud'));
    const shield = h('div', { class: 'pv-shield' }, A.icon('shield'), h('strong', {}, '0/3'));
    const tips = h('ol', { class: 'pv-tips' });
    T.forEach(function (t) {
      const id = 'pv' + t.k + Math.random().toString(36).slice(2, 6);
      const cb = h('input', { type: 'checkbox', id: id }); cb.checked = st[t.k];
      cb.addEventListener('change', function () { st[t.k] = cb.checked; upd(); });
      scr.append(h('label', { class: 'pv-row', for: id }, h('span', {}, t.lab), h('span', { class: 'pv-sw' }, cb, h('i'))));
      tips.append(h('li', { 'data-k': t.k }, h('strong', {}, t.t), h('span', {}, t.d)));
    });
    let was = false;
    function upd() {
      const n = T.filter(function (t) { return st[t.k] === t.want; }).length;
      shield.querySelector('strong').textContent = n + '/3';
      shield.className = 'pv-shield l' + n;
      flow.className = 'pv-flow' + (st.train ? ' leak' : '') + (st.temp ? ' temp' : '');
      tips.querySelectorAll('li').forEach(function (li) { const t = T.filter(function (x) { return x.k === li.dataset.k; })[0]; li.classList.toggle('done', st[t.k] === t.want); });
      if (n === 3 && !was) { U.confetti(host); U.toast('Đã thiết lập an toàn. Dù vậy, vẫn không đưa dữ liệu nhạy cảm lên AI.', 'ok'); }
      was = n === 3;
    }
    host.append(h('div', { class: 'pv' }, h('div', { class: 'pv-phone' }, scr), h('div', { class: 'pv-side' }, h('div', { class: 'pv-top' }, flow, shield), tips,
      h('p', { class: 'muted small' }, 'Tên mục cài đặt khác nhau giữa ChatGPT, Gemini, Copilot… và có thể thay đổi theo phiên bản. Tắt huấn luyện không thay thế nguyên tắc: dữ liệu nhạy cảm tuyệt đối không đưa lên.'))));
    upd();
  };

  /* ---------- Thẻ nguy cơ lừa đảo ---------- */
  A.widgets.threats = function (host) {
    const S = [
      { t: 'Phishing – Email giả mạo', ch: 'email', from: 'no-reply@bhxh-govvn.com', tag: 'Thư điện tử', msg: 'Tài khoản BHYT của Quý khách sắp hết hạn. Vui lòng bấm vào đây để cập nhật ngay, tránh bị gián đoạn quyền lợi.', sign: ['Tên miền lạ, không phải .gov.vn', 'Hối thúc xác minh', 'Đường link, tệp đính kèm bất thường'], act: 'Kiểm tra kỹ tên miền; không bấm link; không tải tệp đính kèm từ email không rõ nguồn.' },
      { t: 'Vishing – Cuộc gọi giả mạo', ch: 'call', from: 'Công an Quận X · +84 24 8888 9999', tag: 'Cuộc gọi', msg: '“Cuộc gọi mạo danh công an/Sở Y tế yêu cầu đọc mã OTP để xác minh hồ sơ.”', sign: ['Giọng gấp gáp, đe dọa', 'Dọa xử phạt, khóa tài khoản', 'Yêu cầu cung cấp OTP'], act: 'Bình tĩnh; gọi lại số chính thức để kiểm tra; không cung cấp thông tin cá nhân, tài khoản, OTP.' },
      { t: 'Smishing – Tin nhắn lừa đảo', ch: 'sms', from: '+84 98 765 4321', tag: 'Tin nhắn', msg: 'BHYT/VNeID chưa đồng bộ. Để tránh bị gián đoạn quyền lợi, vui lòng cập nhật ngay: https://bit.ly/3Xy7aZ', sign: ['Nguồn gửi là số cá nhân lạ', 'Link rút gọn', 'Yêu cầu đăng nhập, cung cấp thông tin'], act: 'Không bấm link trong SMS lạ; tự gõ địa chỉ chính thức; luôn kiểm tra trước khi nhập thông tin.' },
      { t: 'Giả mạo sếp', ch: 'zalo', from: 'Nguyễn Văn Minh (tài khoản mới)', tag: 'Zalo', msg: 'Em giúp anh chuyển khoản cho đối tác theo thông tin bên dưới nhé. Việc này cần hoàn tất trong hôm nay. Anh đang họp, không nghe máy được.', sign: ['Tài khoản lạ hoặc đổi nick', 'Yêu cầu gấp, tạo áp lực thời gian', 'Yêu cầu chuyển tiền hoặc gửi thông tin nội bộ'], act: 'Gọi xác nhận trực tiếp với sếp qua số đã lưu; chỉ thực hiện khi có xác nhận bằng nhiều kênh.' }
    ];
    const grid = h('div', { class: 'scams' });
    S.forEach(function (x) {
      const scr = h('div', { class: 'sc-screen sc-' + x.ch });
      if (x.ch === 'call') scr.append(h('div', { class: 'sc-call' }, A.icon('call'), h('strong', {}, x.from), h('span', {}, 'Cuộc gọi đến…')), h('p', { class: 'sc-msg sc-quote' }, x.msg));
      else scr.append(h('div', { class: 'sc-head' }, A.icon(x.ch === 'email' ? 'mail' : x.ch === 'sms' ? 'chat' : 'users'), h('strong', {}, x.from), h('span', { class: 'sc-tag' }, x.tag)), h('p', { class: 'sc-msg sc-bubble' }, x.msg));
      const back = h('div', { class: 'sc-back' }, h('p', { class: 'sc-h' }, 'Dấu hiệu'), h('ul', {}, x.sign.map(function (s1) { return h('li', {}, s1); })), h('p', { class: 'sc-h ok' }, 'Cách phòng tránh'), h('p', {}, x.act));
      const card = h('button', { class: 'sc-card', type: 'button', 'aria-expanded': 'false' }, h('span', { class: 'sc-title' }, x.t), scr, back);
      card.addEventListener('click', function () { const on = card.classList.toggle('open'); card.setAttribute('aria-expanded', String(on)); });
      grid.append(card);
    });
    host.append(h('p', { class: 'muted small' }, 'Bấm vào từng thẻ để lật xem dấu hiệu và cách phòng tránh.'), grid);
  };

  /* ---------- Soi cuộc gọi video deepfake ---------- */
  A.widgets.deepfake = function (host) {
    const SP = [
      { at: 'vid', x: 50, y: 19, t: 'Viền tóc, vành tai nhòe', d: 'Vùng tiếp giáp giữa khuôn mặt giả và đầu thật thường bị mờ, rung khi người trong video quay đầu.' },
      { at: 'vid', x: 44, y: 41, t: 'Mắt ít chớp, ánh nhìn đờ', d: 'Mắt chớp quá ít hoặc quá đều, ánh nhìn không theo cử động đầu.' },
      { at: 'vid', x: 50, y: 57, t: 'Khẩu hình lệch âm thanh', d: 'Môi chuyển động không khớp với tiếng; răng, lưỡi mờ.' },
      { at: 'vid', x: 63, y: 46, t: 'Ánh sáng khuôn mặt khác nền', d: 'Mặt sáng đều trong khi phòng tối, bóng đổ không khớp nguồn sáng.' },
      { at: 'chat', x: 92, y: 50, t: 'Yêu cầu bất thường, gấp gáp', d: '“Gửi ngay danh sách người bệnh và mã truy cập hệ thống, đang họp gấp.” Lãnh đạo thật không yêu cầu như vậy qua cuộc gọi.' },
      { at: 'top', x: 88, y: 50, t: 'Tài khoản gọi lạ', d: 'Cuộc gọi từ tài khoản mới, không phải số, tài khoản đã lưu của lãnh đạo.' }
    ];
    const found = [];
    const stage = h('div', { class: 'df-stage' });
    const call = h('div', { class: 'df-call', html:
      '<div class="df-top"><span class="df-rec">● Gọi video</span><b>“Giám đốc” · tài khoản mới</b></div><div class="df-vid">' +
      '<svg viewBox="0 0 400 300" class="df-svg" aria-hidden="true"><defs><radialGradient id="dfl" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#FFE2C6"/><stop offset="1" stop-color="#E9B48C"/></radialGradient></defs>' +
      '<rect width="400" height="300" fill="#1B2638"/><rect x="0" y="210" width="400" height="90" fill="#121A27"/><rect x="250" y="40" width="110" height="80" rx="4" fill="#26344C"/>' +
      '<path d="M120 300 Q130 220 200 210 Q270 220 280 300Z" fill="#2E4A7A"/><path d="M185 212 L200 240 L215 212Z" fill="#fff"/>' +
      '<g class="df-head"><ellipse cx="200" cy="130" rx="62" ry="76" fill="url(#dfl)"/><path class="df-hair" d="M138 120 Q140 50 200 50 Q262 50 262 120 Q250 80 200 82 Q150 80 138 120Z" fill="#2B2420"/>' +
      '<ellipse class="df-eye" cx="176" cy="122" rx="8" ry="5" fill="#2B2420"/><ellipse class="df-eye" cx="224" cy="122" rx="8" ry="5" fill="#2B2420"/>' +
      '<path d="M200 128 L195 150 L205 150" fill="none" stroke="#C58A63" stroke-width="2"/><path class="df-mouth" d="M182 168 Q200 178 218 168" fill="none" stroke="#9A4B3A" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse class="df-edge" cx="200" cy="130" rx="64" ry="78" fill="none" stroke="#FFE2C6" stroke-opacity=".45" stroke-width="6"/></g>' +
      '</svg></div><div class="df-chat">Gửi ngay cho anh danh sách người bệnh và mã truy cập hệ thống, đang họp gấp!</div>' +
      '<div class="df-ctrl"><span>🎤</span><span class="end">✆</span><span>📷</span></div>' });
    stage.append(call);
    const list = h('ol', { class: 'df-list' });
    const count = h('p', { class: 'ft-count', 'aria-live': 'polite' });
    SP.forEach(function (sp, i) {
      const b = h('button', { class: 'df-hot', type: 'button', style: { left: sp.x + '%', top: sp.y + '%' }, 'aria-label': 'Điểm nghi vấn ' + (i + 1) });
      b.addEventListener('click', function (e) { e.stopPropagation(); if (found.indexOf(i) >= 0) return; found.push(i); b.classList.add('got'); b.textContent = String(found.length); list.append(h('li', {}, h('strong', {}, sp.t), ' – ', sp.d)); upd(); });
      call.querySelector('.df-' + sp.at).append(b);
    });
    stage.addEventListener('click', function (e) { const r = stage.getBoundingClientRect(); const m = h('span', { class: 'df-miss', style: { left: (e.clientX - r.left) + 'px', top: (e.clientY - r.top) + 'px' } }); stage.append(m); setTimeout(function () { m.remove(); }, 600); });
    function upd() {
      count.textContent = 'Tìm được ' + found.length + '/' + SP.length + ' dấu hiệu.';
      if (found.length === SP.length) { U.stamp(stage, 'Deepfake', 'bad'); U.confetti(host); rule.hidden = false; }
    }
    const rule = h('div', { class: 'df-rule', hidden: true }, h('strong', {}, 'Xử lý đúng: '), 'Không gửi danh sách, mật khẩu, OTP; kết thúc cuộc gọi và gọi lại bằng số điện thoại đã lưu từ trước; xác minh qua người thứ ba có thẩm quyền; chụp màn hình, báo cán bộ phụ trách công nghệ thông tin.');
    const hint = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { stage.classList.add('hint'); setTimeout(function () { stage.classList.remove('hint'); }, 1600); } }, 'Gợi ý vị trí');
    host.append(h('div', { class: 'df' }, stage, h('div', { class: 'df-side' }, count, list, h('div', { class: 'wg-actions' }, hint), rule)));
    upd();
  };

  /* ---------- Giải phẫu đường liên kết ---------- */
  const SLD = ['gov.vn', 'com.vn', 'org.vn', 'edu.vn', 'net.vn', 'ac.vn', 'info.vn', 'co.uk', 'com.au'];
  const TRUSTED = ['vinhlong.gov.vn', 'dichvucong.gov.vn', 'bocongan.gov.vn', 'vneid.gov.vn', 'chinhphu.vn', 'ncsc.gov.vn', 'tinnhiemmang.vn', 'google.com', 'zalo.me', 'gemini.google.com'];
  const SHORT = ['bit.ly', 'tinyurl.com', 'goo.gl', 'rb.gy', 'cutt.ly', 't.ly', 'is.gd', 'shorturl.at'];
  const ODD_TLD = ['xyz', 'top', 'cc', 'info', 'click', 'live', 'site', 'online', 'icu', 'buzz', 'shop', 'vip', 'club', 'pw', 'tk'];
  function lev(a, b) { const m = []; for (let i = 0; i <= a.length; i++) { m[i] = [i]; } for (let j = 1; j <= b.length; j++) m[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return m[a.length][b.length]; }
  function parseUrl(raw) {
    let str = raw.trim(); if (!/^[a-z]+:\/\//i.test(str)) str = 'http://' + str;
    let u; try { u = new URL(str); } catch (e) { return null; }
    const host = u.hostname.toLowerCase();
    const isIP = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    const parts = host.split('.');
    let reg = host;
    if (!isIP && parts.length >= 2) { const last2 = parts.slice(-2).join('.'); reg = (SLD.indexOf(last2) >= 0 && parts.length >= 3) ? parts.slice(-3).join('.') : last2; }
    const sub = host.length > reg.length ? host.slice(0, host.length - reg.length - 1) : '';
    const flags = [];
    if (u.protocol === 'http:') flags.push('Không mã hóa (http): thông tin nhập vào có thể bị nghe lén.');
    if (u.username) flags.push('Có phần “' + decodeURIComponent(u.username) + '@” trước tên miền: trình duyệt bỏ qua phần này, địa chỉ thật là “' + host + '”.');
    if (isIP) flags.push('Dùng địa chỉ IP thay cho tên miền.');
    if (host.indexOf('xn--') >= 0) flags.push('Tên miền quốc tế hóa (xn--): có thể dùng ký tự trông giống chữ Latinh để giả mạo.');
    if (SHORT.indexOf(reg) >= 0) flags.push('Đường liên kết rút gọn: không biết được đích đến thật.');
    const tld = parts[parts.length - 1];
    if (ODD_TLD.indexOf(tld) >= 0) flags.push('Đuôi tên miền “.' + tld + '” thường bị dùng cho trang lừa đảo.');
    if (/gov|chinhphu|vneid|dichvucong|congan|bca|bhyt|hokhau/.test(host) && !/\.gov\.vn$|^chinhphu\.vn$|\.chinhphu\.vn$/.test(host)) flags.push('Có chữ gợi liên tưởng cơ quan nhà nước nhưng tên miền thật không thuộc .gov.vn.');
    TRUSTED.forEach(function (t) { if (reg !== t) { const d = lev(reg, t); if (d > 0 && d <= 2) flags.push('Tên miền “' + reg + '” gần giống “' + t + '” (khác ' + d + ' ký tự).'); } });
    if ((reg.match(/-/g) || []).length >= 2) flags.push('Tên miền có nhiều dấu gạch nối.');
    const trusted = TRUSTED.indexOf(reg) >= 0 || /\.gov\.vn$/.test(reg);
    return { u: u, host: host, reg: reg, sub: sub, flags: flags, trusted: trusted && flags.length === 0 };
  }
  A.widgets.url = function (host) {
    const drills = [
      { u: 'https://dichvucongvnbca.com', fake: true },
      { u: 'https://dichvucong.gov.vn', fake: false },
      { u: 'https://dichvucong.hokhauso.com', fake: true },
      { u: 'https://dichvucong.bocongan.gov.vn', fake: false },
      { u: 'http://vneid-gov.cc/cap-nhat', fake: true },
      { u: 'https://tinnhiemmang.vn', fake: false },
      { u: 'https://bit.ly/bhyt-2026', fake: true },
      { u: 'https://vinhlong.gov.vn.xac-thuc-bhyt.com/login', fake: true }
    ];
    let k = 0, right = 0;
    const card = h('div', { class: 'url-drill' });
    function anatomy(p) {
      const u = p.u; const wrap = h('div', { class: 'url-anat' });
      function seg(t, cls, lab) { return h('span', { class: 'ua ' + cls }, h('span', { class: 'ua-t' }, t), h('span', { class: 'ua-l' }, lab)); }
      wrap.append(seg(u.protocol + '//', u.protocol === 'https:' ? 'ua-ok' : 'ua-bad', u.protocol === 'https:' ? 'có mã hóa' : 'không mã hóa'));
      if (u.username) wrap.append(seg(decodeURIComponent(u.username) + '@', 'ua-bad', 'phần bị bỏ qua'));
      if (p.sub) wrap.append(seg(p.sub + '.', 'ua-sub', 'tên miền con'));
      wrap.append(seg(p.reg, p.trusted ? 'ua-reg ok' : 'ua-reg', 'tên miền thật'));
      const rest = u.pathname + u.search; if (rest && rest !== '/') wrap.append(seg(rest, 'ua-path', 'đường dẫn'));
      return wrap;
    }
    function draw() {
      card.innerHTML = '';
      if (k >= drills.length) { card.append(h('p', { class: 'choices-end' }, 'Kết quả luyện tập: ' + right + '/' + drills.length + '.'), h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { k = 0; right = 0; draw(); } }, 'Làm lại')); return; }
      const d = drills[k];
      const fb = h('div', { class: 'url-fb' });
      const acts = h('div', { class: 'ib-acts' });
      function go(fake) {
        acts.remove(); const ok = fake === d.fake; if (ok) right++;
        const p = parseUrl(d.u);
        fb.append(h('p', { class: ok ? 'ok' : 'bad' }, h('strong', {}, ok ? 'Chính xác. ' : 'Chưa chính xác. '), d.fake ? 'Đây là địa chỉ đáng ngờ.' : 'Đây là địa chỉ chính thức.'), anatomy(p));
        const ul = h('ul', { class: 'url-flags' }); (p.flags.length ? p.flags : ['Tên miền thật thuộc cơ quan nhà nước; vẫn nên tự gõ địa chỉ hoặc dùng dấu trang đã lưu.']).forEach(function (f) { ul.append(h('li', {}, f)); });
        fb.append(ul, h('button', { class: 'btn btn-sm', type: 'button', onclick: function () { k++; draw(); } }, k === drills.length - 1 ? 'Xem kết quả' : 'Địa chỉ tiếp theo'));
      }
      acts.append(h('button', { class: 'btn btn-safe', type: 'button', onclick: function () { go(false); } }, 'Tin cậy'), h('button', { class: 'btn btn-seal', type: 'button', onclick: function () { go(true); } }, 'Đáng ngờ'));
      card.append(h('p', { class: 'choices-count' }, 'Địa chỉ ' + (k + 1) + '/' + drills.length), h('p', { class: 'url-big' }, d.u), acts, fb);
    }
    draw();
    const inp = h('input', { type: 'text', class: 'url-input', placeholder: 'Dán một đường liên kết, ví dụ https://dichvucong.gov.vn', 'aria-label': 'Đường liên kết cần phân tích', spellcheck: 'false' });
    const out = h('div', { class: 'url-out', 'aria-live': 'polite' });
    function analyze() {
      out.innerHTML = ''; if (!inp.value.trim()) return;
      const p = parseUrl(inp.value);
      if (!p) { out.append(h('p', { class: 'bad' }, 'Không đọc được địa chỉ này. Kiểm tra lại ký tự.')); return; }
      out.append(anatomy(p));
      const ul = h('ul', { class: 'url-flags' });
      if (p.flags.length) p.flags.forEach(function (f) { ul.append(h('li', {}, f)); });
      else ul.append(h('li', { class: 'ok' }, p.trusted ? 'Tên miền thuộc danh sách cơ quan nhà nước, dịch vụ quen thuộc.' : 'Chưa phát hiện dấu hiệu bất thường theo quy tắc đơn giản. Điều này không bảo đảm địa chỉ an toàn: hãy xác minh người gửi.'));
      out.append(ul);
    }
    inp.addEventListener('input', analyze);
    host.append(h('h4', { class: 'sub-h' }, 'Luyện tập: tin cậy hay đáng ngờ?'), card, h('h4', { class: 'sub-h' }, 'Công cụ phân tích đường liên kết'), inp, out, h('p', { class: 'muted small' }, 'Công cụ chỉ phân tích cấu trúc địa chỉ, không truy cập trang web. Kết quả mang tính hỗ trợ nhận diện.'));
  };

  A.widgets.password = function (host) {
    const common = ['123456', '12345678', '123456789', '1234567890', 'password', 'matkhau', 'admin', 'qwerty', 'abc123', '111111', '123123', 'iloveyou', 'anhyeuem', 'emyeuanh', '000000', 'p@ssw0rd', 'aa123456'];
    const words = ['vinhlong', 'longthanh', 'vietnam', 'ubnd', 'ngaysinh', 'tencongty', 'matkhau', 'password', 'admin', 'vanthu', 'congvu', 'hochiminh', 'saigon', 'mekong', 'cantho', 'bentre', 'travinh', 'nguyen', 'tran', 'huynh'];
    const input = h('input', { type: 'password', class: 'pw-input', placeholder: 'Nhập mật khẩu thử nghiệm', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Mật khẩu thử nghiệm' });
    const show = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', 'aria-pressed': 'false' }, 'Hiện');
    show.addEventListener('click', function () { const v = input.type === 'password'; input.type = v ? 'text' : 'password'; show.textContent = v ? 'Ẩn' : 'Hiện'; show.setAttribute('aria-pressed', String(v)); });
    const bar = h('div', { class: 'pw-meter' }, h('div', { class: 'pw-fill' }));
    const verdict = h('p', { class: 'pw-verdict', 'aria-live': 'polite' });
    const checks = [
      ['len', 'Từ 12 ký tự trở lên'], ['low', 'Có chữ thường'], ['up', 'Có chữ hoa'], ['num', 'Có chữ số'], ['sym', 'Có ký hiệu'],
      ['word', 'Không chứa từ phổ biến, tên địa phương, họ phổ biến'], ['year', 'Không chứa năm (19xx, 20xx)'], ['seq', 'Không có chuỗi liên tiếp hoặc lặp lại']
    ];
    const ul = h('ul', { class: 'pw-checks' });
    const liMap = {}; checks.forEach(function (c) { liMap[c[0]] = h('li', {}, c[1]); ul.append(liMap[c[0]]); });
    function norm(x) { return x.toLowerCase().replace(/@/g, 'a').replace(/0/g, 'o').replace(/[1!|]/g, 'i').replace(/3/g, 'e').replace(/\$/g, 's').replace(/5/g, 's'); }
    function fmt(sec) {
      if (sec < 1) return 'dưới 1 giây';
      const u = [[31536000 * 1e6, 'triệu năm'], [31536000 * 1000, 'nghìn năm'], [31536000, 'năm'], [2592000, 'tháng'], [86400, 'ngày'], [3600, 'giờ'], [60, 'phút'], [1, 'giây']];
      for (let i = 0; i < u.length; i++) if (sec >= u[i][0]) { const v = sec / u[i][0]; return (v >= 1000 && i === 0 ? 'hơn 1000' : Math.round(v).toLocaleString('vi-VN')) + ' ' + u[i][1]; }
    }
    function analyze(p) {
      const r = { len: p.length >= 12, low: /[a-z]/.test(p), up: /[A-Z]/.test(p), num: /\d/.test(p), sym: /[^A-Za-z0-9]/.test(p) };
      const n = norm(p);
      let pool = (r.low ? 26 : 0) + (r.up ? 26 : 0) + (r.num ? 10 : 0) + (r.sym ? 33 : 0); if (!pool) pool = 1;
      let eff = p.length;
      const hitWords = words.filter(function (w) { return n.indexOf(w) >= 0; });
      if (common.indexOf(p.toLowerCase()) >= 0) eff = 0.4;
      hitWords.forEach(function (w) { eff -= (w.length - 1.5); });
      const yr = p.match(/(19|20)\d{2}/g) || []; yr.forEach(function () { eff -= 2.5; });
      const seq = p.match(/(0123|1234|2345|3456|4567|5678|6789|abcd|qwer|asdf)/gi) || []; seq.forEach(function () { eff -= 2.5; });
      const rep = p.match(/(.)\1{2,}/g) || []; rep.forEach(function (m) { eff -= (m.length - 1); });
      r.word = hitWords.length === 0 && common.indexOf(p.toLowerCase()) < 0; r.year = yr.length === 0; r.seq = seq.length === 0 && rep.length === 0;
      eff = Math.max(eff, 0.4);
      const log10 = eff * Math.log10(pool);
      const sec = Math.pow(10, log10) / 2 / 1e10;
      return { r: r, log10: log10, sec: sec };
    }
    function update() {
      const p = input.value;
      if (!p) { bar.firstChild.style.width = '0'; verdict.textContent = 'Kết quả sẽ hiện khi nhập.'; verdict.className = 'pw-verdict'; checks.forEach(function (c) { liMap[c[0]].className = ''; }); return; }
      const a = analyze(p);
      checks.forEach(function (c) { liMap[c[0]].className = a.r[c[0]] ? 'ok' : 'no'; });
      const pct = Math.max(4, Math.min(100, a.log10 / 20 * 100));
      bar.firstChild.style.width = pct + '%';
      const lvl = a.sec < 60 ? ['Rất yếu', 'bad'] : a.sec < 86400 ? ['Yếu', 'bad'] : a.sec < 31536000 ? ['Trung bình', 'warn'] : a.sec < 31536000 * 100 ? ['Khá', 'ok'] : ['Mạnh', 'ok'];
      bar.className = 'pw-meter ' + lvl[1];
      verdict.className = 'pw-verdict ' + lvl[1];
      verdict.textContent = lvl[0] + '. Thời gian ước tính để dò ra: ' + fmt(a.sec) + '.';
    }
    input.addEventListener('input', update);
    const examples = ['12345678', 'ngaysinh2000', 'tencongty123', 'Caphe_Sang#47', 'ConXe-May+Xanh_2026'];
    const ex = h('div', { class: 'pw-ex' }, h('span', {}, 'Thử nhanh:'), examples.map(function (e) { return h('button', { class: 'chip chip-sm', type: 'button', onclick: function () { input.value = e; input.type = 'text'; show.textContent = 'Ẩn'; update(); } }, e); }));
    const gw = ['songhau', 'luabong', 'xoaicat', 'mangcut', 'bentau', 'nuocnoi', 'phusa', 'lucbinh', 'hoasen', 'traisau', 'cauvan', 'vuondua', 'ghechai', 'tranghoa', 'chuongtre', 'khoatuoi', 'bonggua', 'gomdo', 'cayduoc', 'donghay'];
    const gen = h('p', { class: 'pw-gen' });
    const genBtn = h('button', { class: 'btn btn-sm', type: 'button', onclick: function () {
      const pick = U.shuffle(gw).slice(0, 4); pick[1] = pick[1][0].toUpperCase() + pick[1].slice(1);
      const sym = '#!%&*?'[Math.floor(Math.random() * 6)];
      gen.textContent = pick.join('-') + '-' + (10 + Math.floor(Math.random() * 90)) + sym;
    } }, 'Gợi ý một cụm mật khẩu');
    host.append(h('div', { class: 'pw' },
      h('div', { class: 'pw-row' }, input, show), bar, verdict, ul, ex,
      h('div', { class: 'pw-genbox' }, genBtn, gen, h('p', { class: 'muted small' }, 'Cụm mật khẩu gồm nhiều từ không liên quan: dài, dễ nhớ, khó dò. Không sử dụng lại cụm đã hiển thị trước lớp. Ước tính giả định máy tính thử 10 tỷ mật khẩu mỗi giây.'))));
    update();
  };

})(window.ATTT);
