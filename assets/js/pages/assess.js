/* Khảo sát đầu vào (trắc nghiệm) và danh mục tự kiểm tra hằng tháng. Bài kiểm tra cuối khóa ở pages/final.js. */
(function (A) {
  'use strict';
  const U = A.util, h = U.h, s = U.s;

  function quizPage(mode) {
    const pre = mode === 'pre';
    const bank = A.data.quiz.map(function (q, i) { return Object.assign({ id: i }, q); }).filter(function (q) { return pre ? q.pre : true; });
    const qs = pre ? bank : U.shuffle(bank);
    const page = h('article', { class: 'page quiz-page' });
    page.append(h('header', { class: 'topic-head' },
      h('p', { class: 'topic-meta' }, h('span', { class: 'sess ' + (pre ? 'sess-am' : 'sess-pm') }, pre ? 'Khai mạc' : 'Tổng kết'), h('span', {}, (A.config.schedule.filter(function (x) { return x.route === (pre ? 'khao-sat' : 'kiem-tra'); })[0] || {}).time || '')),
      h('h1', {}, pre ? 'Khảo sát đầu vào' : 'Bài kiểm tra cuối khóa'),
      h('p', { class: 'lead' }, pre ? 'Mười câu trắc nghiệm, khoảng 5 phút, để biết mình đang ở đâu. Chưa hiển thị đáp án; kết quả được so sánh với bài kiểm tra cuối khóa.' : 'Hai mươi câu trắc nghiệm, thứ tự ngẫu nhiên. Sau khi nộp bài, xem đáp án, giải thích và mức tiến bộ so với khảo sát đầu vào.')));
    const box = h('section', { class: 'quiz' });
    page.append(box);
    const ans = {};
    const perm = {}; // thứ tự phương án được xáo trộn cho từng câu
    let i = 0;
    const name = h('input', { type: 'text', class: 'q-name', placeholder: 'Họ tên, đơn vị (không bắt buộc)', value: U.store.get('learner', ''), 'aria-label': 'Họ tên, đơn vị' });
    name.addEventListener('input', function () { U.store.set('learner', name.value); });
    function start() {
      box.innerHTML = '';
      const prev = U.store.get(mode, null);
      box.append(h('div', { class: 'q-start' }, name,
        prev ? h('p', { class: 'muted' }, 'Đã làm bài này lúc ' + prev.date + ', đạt ' + prev.score + '/' + prev.total + '. Làm lại sẽ ghi đè kết quả cũ.') : null,
        h('button', { class: 'btn', type: 'button', onclick: function () { i = 0; Object.keys(ans).forEach(function (k) { delete ans[k]; }); show(); } }, 'Bắt đầu làm bài'),
        prev ? h('button', { class: 'btn btn-ghost', type: 'button', onclick: function () { result(prev.answers, prev); } }, 'Xem lại kết quả') : null));
    }
    function show() {
      box.innerHTML = '';
      const q = qs[i];
      const prog = h('div', { class: 'q-prog' }, h('div', { style: { width: (i / qs.length * 100) + '%' } }));
      const opts = h('div', { class: 'choices-opts', role: 'radiogroup', 'aria-label': 'Phương án trả lời' });
      if (!perm[q.id]) perm[q.id] = U.shuffle(q.o.map(function (x, k) { return k; }));
      perm[q.id].forEach(function (k, pos) {
        const t = q.o[k];
        const b = h('button', { class: 'opt' + (ans[q.id] === k ? ' picked' : ''), type: 'button', role: 'radio', 'aria-checked': String(ans[q.id] === k) }, h('span', { class: 'opt-k' }, 'ABCD'[pos]), t);
        b.addEventListener('click', function () { ans[q.id] = k; if (i < qs.length - 1) { i++; show(); } else show(); });
        opts.append(b);
      });
      const done = Object.keys(ans).length;
      const nav = h('div', { class: 'q-nav' },
        h('button', { class: 'btn btn-ghost btn-sm', type: 'button', disabled: i === 0, onclick: function () { i--; show(); } }, 'Câu trước'),
        h('span', { class: 'muted' }, 'Đã trả lời ' + done + '/' + qs.length),
        i < qs.length - 1 ? h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () { i++; show(); } }, 'Câu sau') :
          h('button', { class: 'btn btn-sm', type: 'button', disabled: done < qs.length, onclick: submit }, 'Nộp bài'));
      box.append(prog, h('p', { class: 'choices-count' }, 'Câu ' + (i + 1) + '/' + qs.length), h('h2', { class: 'q-q' }, q.q), opts, nav);
    }
    function submit() {
      const score = qs.filter(function (q) { return ans[q.id] === q.a; }).length;
      const rec = { score: score, total: qs.length, date: new Date().toLocaleString('vi-VN'), answers: Object.assign({}, ans), name: name.value };
      U.store.set(mode, rec); A.app.refreshNav();
      result(rec.answers, rec);
    }
    function result(a, rec) {
      box.innerHTML = '';
      const pct = Math.round(rec.score / rec.total * 100);
      const head = h('div', { class: 'q-result' }, h('p', { class: 'big-num' }, h('span', { class: 'n' }, String(rec.score)), h('span', { class: 'u' }, '/' + rec.total)), h('p', {}, pre ? 'Kết quả khảo sát đầu vào đã được ghi nhận. Đáp án sẽ được phân tích trong các chuyên đề.' : (pct >= 80 ? 'Đạt yêu cầu.' : 'Chưa đạt 80%. Xem lại phần giải thích và các chuyên đề liên quan.')));
      box.append(head);
      if (!pre) { U.stamp(head, pct >= 80 ? 'Đạt' : 'Ôn tập', pct >= 80 ? 'good' : 'warn'); if (pct >= 80) U.confetti(head); }
      /* so sánh trước – sau trên 15 câu chung */
      const p1 = U.store.get('pre', null), p2 = U.store.get('post', null);
      if (p1 && p2) {
        const common = A.data.quiz.map(function (q, i2) { return i2; }).filter(function (i2) { return A.data.quiz[i2].pre; });
        const s1 = common.filter(function (k) { return p1.answers[k] === A.data.quiz[k].a; }).length;
        const s2 = common.filter(function (k) { return p2.answers[k] === A.data.quiz[k].a; }).length;
        const cmp = h('div', { class: 'cmp' }, h('h3', {}, 'Tiến bộ trên ' + common.length + ' câu chung'));
        [['Đầu vào', s1, 'pre'], ['Cuối khóa', s2, 'post']].forEach(function (r) {
          const bar = h('div', { class: 'cmp-bar ' + r[2] }, h('span', {}, r[1] + '/' + common.length));
          cmp.append(h('div', { class: 'cmp-row' }, h('span', { class: 'cmp-l' }, r[0]), h('div', { class: 'cmp-track' }, bar)));
          requestAnimationFrame(function () { setTimeout(function () { bar.style.width = (r[1] / common.length * 100) + '%'; }, 60); });
        });
        cmp.append(h('p', { class: 'muted' }, s2 > s1 ? 'Tăng ' + (s2 - s1) + ' câu so với đầu khóa.' : s2 === s1 ? 'Kết quả không đổi so với đầu khóa.' : 'Kết quả thấp hơn đầu khóa; đề nghị ôn tập lại.'));
        box.append(cmp);
      }
      if (!pre) {
        const rv = h('ol', { class: 'review' });
        qs.forEach(function (q) {
          const ok = a[q.id] === q.a;
          rv.append(h('li', { class: ok ? 'ok' : 'bad' }, h('p', { class: 'rv-q' }, q.q), h('p', {}, 'Đáp án đúng: ', h('strong', {}, q.o[q.a]), ok ? '' : '. Đã chọn: ' + (q.o[a[q.id]] || 'chưa trả lời')), h('p', { class: 'muted' }, q.why + ' ', h('a', { href: '#/chuyen-de/' + q.topic }, 'Xem chuyên đề ' + q.topic))));
        });
        box.append(h('h3', {}, 'Đáp án và giải thích'), rv);
      }
      const csv = h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: function () {
        const rows = [['Họ tên, đơn vị', 'Bài', 'Điểm', 'Tổng', 'Thời điểm']];
        [['pre', 'Khảo sát đầu vào'], ['post', 'Kiểm tra cuối khóa']].forEach(function (m) { const r = U.store.get(m[0], null); if (r) rows.push([r.name || '', m[1], r.score, r.total, r.date]); });
        U.download('ket-qua-tap-huan-ai-long-thanh.csv', rows.map(function (r) { return r.map(U.csvCell).join(','); }).join('\n'));
      } }, 'Tải kết quả (CSV)');
      box.append(h('div', { class: 'wg-actions' }, csv, h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: start }, 'Làm lại'), h('a', { class: 'btn btn-sm', href: pre ? '#/chuyen-de/1' : '#/so-tay' }, pre ? 'Vào Chuyên đề 1' : 'Mở Sổ tay bỏ túi')));
    }
    start();
    return page;
  }
  A.pages.pre = function () { return quizPage('pre'); };
  A.pages.post = function () { return quizPage('post'); };
})(window.ATTT);
