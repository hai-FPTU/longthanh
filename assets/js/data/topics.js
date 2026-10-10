/* Nội dung 5 chuyên đề (theo bài giảng Long Thành – Lớp 2, ngày 11/10/2026). Dữ liệu tình huống là giả định phục vụ học tập. */
(function (A) {
  const S = A.config.schedule;
  function tm(r) { const x = S.filter(function (s) { return s.route === r; })[0]; return x ? x.time : ''; }
  const RED = '#D7261E';

  A.data.topics = [
    /* ================= CHUYÊN ĐỀ 1 ================= */
    { n: 1, session: 'Buổi sáng', time: tm('chuyen-de/1'), format: 'Trình chiếu, thực hành trên điện thoại',
      title: 'Kỹ năng số cơ bản và làm quen công cụ trí tuệ nhân tạo',
      lead: 'Điện thoại thông minh là công cụ làm việc mỗi ngày. AI là trợ lý soạn nội dung, tra cứu, hỏi đáp rất nhanh, nhưng chỉ làm tốt khi được giao việc rõ ràng và kết quả luôn được kiểm tra lại.',
      goals: [1, 4, 9],
      hook: { title: 'Tình huống mở đầu', text: 'Một hộ kinh doanh chụp được tấm ảnh sản phẩm đặc sản quê nhà, nhưng không biết viết gì để đăng bán. Có cách nào có ngay 3 nội dung bán hàng trong 1 phút không?' },
      blocks: [
        { type: 'part', t: 'Phần 1. Kỹ năng số cơ bản trên điện thoại' },
        { type: 'points', title: 'Năm thói quen số cần có', items: [
          { i: 'wifi', t: 'Kết nối mạng ổn định', d: 'Wi‑Fi hoặc 4G/5G ổn định trước khi đăng nhập, nộp hồ sơ, thanh toán.' },
          { i: 'phone', t: 'Cài ứng dụng từ kho chính thức', d: 'Android: Google Play. iPhone: App Store. Không cài từ đường link lạ, tệp gửi qua tin nhắn.' },
          { i: 'refresh', t: 'Cập nhật phiên bản mới', d: 'Nhiều tính năng chỉ có ở phiên bản mới; bản cũ hay lỗi, kém an toàn.' },
          { i: 'lock', t: 'Khóa màn hình', d: 'Cài mã PIN, vân tay hoặc khuôn mặt; không cho người lạ mượn máy khi đang mở khóa.' },
          { i: 'camera', t: 'Chụp ảnh giấy tờ rõ nét', d: 'Đủ 4 góc, đủ sáng, không lóa; dùng để đính kèm hồ sơ trực tuyến.' } ] },
        { type: 'widget', name: 'swipe', title: 'Bài tập: thao tác an toàn hay rủi ro?', intro: 'Bấm nút tương ứng cho từng thẻ.', opts: {
          bins: [{ name: 'An toàn', tone: 'l0', icon: 'check' }, { name: 'Rủi ro', tone: 'l3', icon: 'x' }],
          items: [
            { t: 'Tải ứng dụng VNeID từ Google Play hoặc App Store', bin: 0, why: 'Kho ứng dụng chính thức.' },
            { t: 'Cài ứng dụng “VNeID bản mới” từ đường link trong tin nhắn', bin: 1, why: 'Ứng dụng giả mạo thường được phát tán qua đường link lạ.' },
            { t: 'Cập nhật ứng dụng khi có phiên bản mới', bin: 0, why: 'Bản mới sửa lỗi, đầy đủ tính năng.' },
            { t: 'Cho người lạ mượn điện thoại đang mở khóa để “gọi nhờ”', bin: 1, why: 'Người lạ có thể đọc tin nhắn OTP, mở ứng dụng ngân hàng.' },
            { t: 'Đặt mã khóa màn hình là 000000', bin: 1, why: 'Mã quá dễ đoán.' },
            { t: 'Chụp giấy tờ rõ nét, đủ 4 góc để nộp hồ sơ', bin: 0, why: 'Giúp hồ sơ không bị yêu cầu bổ sung.' }
          ] } },

        { type: 'part', t: 'Phần 2. Trí tuệ nhân tạo là gì, giúp được gì?' },
        { type: 'widget', name: 'salespost', title: '1 ảnh sản phẩm, 3 nội dung bán hàng trong 1 phút', illus: true, intro: 'Bấm nút để xem AI tạo bài đăng, mô tả sản phẩm và nội dung khuyến mãi từ một tấm ảnh.' },
        { type: 'prose', title: 'Trí tuệ nhân tạo (AI)', body: [
          'AI như một trợ lý không biết mệt mỏi: soạn thảo, tóm tắt hàng chục trang tài liệu, tổng hợp thông tin chỉ trong chớp mắt. Các công cụ như ChatGPT, Gemini, Copilot, Claude viết bằng cách <strong>dự đoán chữ tiếp theo</strong> phù hợp nhất.',
          'Khi thiếu dữ liệu, AI vẫn viết tiếp bằng thứ “nghe hợp lý”: đó là <strong>ảo giác</strong> (hallucination). Vì vậy kết quả của AI luôn phải được kiểm tra trước khi dùng.' ] },
        { type: 'points', title: 'Những công cụ AI phổ biến hiện nay', items: [
          { i: 'chat', t: 'ChatGPT', d: 'Soạn thảo, tóm tắt, hỏi đáp, gợi ý ý tưởng và hỗ trợ viết.' },
          { i: 'spark', t: 'Gemini', d: 'Hỗ trợ tìm hiểu nội dung, viết nháp và làm việc với hệ sinh thái Google.' },
          { i: 'doc', t: 'Microsoft Copilot', d: 'Thuận tiện khi làm việc với Word, Excel, PowerPoint.' },
          { i: 'pen', t: 'Claude', d: 'Mạnh về phân tích văn bản dài và diễn đạt mạch lạc.' } ] },
        { type: 'note', kind: 'warn', title: 'Điều quan trọng hơn tên công cụ', body: '<strong>Prompt rõ ràng</strong>, <strong>dữ liệu đầu vào phù hợp</strong> và <strong>kiểm tra lại kết quả</strong>.' },
        { type: 'widget', name: 'nextword', title: 'Xem AI “đoán chữ” và bịa thông tin', illus: true, intro: 'Chọn một tab, bấm “Cho AI viết tiếp”.' },

        { type: 'part', t: 'Phần 3. Câu lệnh (prompt) và cấu trúc sáu thành phần vàng' },
        { type: 'prose', title: 'Prompt là gì?', body: ['<strong>Prompt</strong> là câu lệnh hoặc yêu cầu mình nhập cho AI, nhằm hướng dẫn AI thực hiện nhiệm vụ, sử dụng dữ liệu phù hợp và tạo kết quả theo mong muốn. <em>Prompt càng rõ, AI càng hiểu đúng hướng, nhưng người dùng vẫn phải kiểm tra lại kết quả.</em>'] },
        { type: 'widget', name: 'promptlab', title: 'Phòng thí nghiệm câu lệnh: bật, tắt 6 thành phần vàng' },
        { type: 'points', title: 'Nguyên lý ba khối cốt lõi', items: [
          { i: 'users', t: '1. Nêu bối cảnh', d: 'Nêu rõ vai trò của bạn (ví dụ: cán bộ trạm y tế xã) để AI định hình phong cách phù hợp.' },
          { i: 'database', t: '2. Nêu dữ liệu gốc', d: 'Cung cấp thông tin có sẵn; ngăn AI tự lấy từ các nguồn không chính thống trên mạng xã hội.' },
          { i: 'stop', t: '3. Thiết lập giới hạn', d: '“Không tự ý bịa đặt số liệu”, “Nếu thiếu thông tin thì để trống hoặc ghi Cần bổ sung”.' } ] },
        { type: 'widget', name: 'sort', title: 'Bài tập: xếp các mảnh câu lệnh vào đúng thành phần', opts: {
          bins: [{ name: '1. Vai trò', tone: 'l1' }, { name: '2. Bối cảnh', tone: 'l1' }, { name: '3. Nhiệm vụ', tone: 'l1' }, { name: '4. Đối tượng đọc', tone: 'l0' }, { name: '5. Định dạng', tone: 'l0' }, { name: '6. Ràng buộc', tone: 'l3' }],
          items: [
            { t: '“Bạn là cán bộ truyền thông Trạm Y tế xã.”', bin: 0, why: 'Vai trò: AI đóng vai ai.' },
            { t: '“Khám sàng lọc lúc 07h30 ngày 26/09/2026 tại Trạm Y tế xã, người từ 40 tuổi.”', bin: 1, why: 'Bối cảnh và dữ liệu.' },
            { t: '“Hãy viết thông báo Zalo về lịch khám sàng lọc tăng huyết áp.”', bin: 2, why: 'Nhiệm vụ: AI phải làm gì.' },
            { t: '“Người đọc là người dân, cần dễ hiểu.”', bin: 3, why: 'Đối tượng đọc.' },
            { t: '“Dưới 150 từ, chia 3–5 ý, có icon.”', bin: 4, why: 'Định dạng.' },
            { t: '“Không thêm số điện thoại, không tự bịa quyền lợi.”', bin: 5, why: 'Ràng buộc.' }
          ] } },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: đăng nhập Gemini bằng tài khoản Google', illus: true, opts: {
          note: 'Nên dùng đúng tài khoản Google của cá nhân hoặc công việc; không chia sẻ mã xác minh cho người khác. Giao diện có thể khác tùy điện thoại.',
          apps: [{ name: 'Gemini', short: '✦', color: '#1A73E8', goal: 'Đăng nhập và bắt đầu dùng Gemini trên trình duyệt điện thoại.', steps: [
            { t: 'Mở trình duyệt (Chrome, Safari…), truy cập gemini.google.com.', title: 'gemini.google.com', rows: ['Gemini', 'Trợ lý AI của Google', 'Đăng nhập'], tap: 2 },
            { t: 'Nhấn “Đăng nhập”.', title: 'Gemini', rows: ['Xin chào', 'Trợ lý AI của Google', 'Đăng nhập'], tap: 2 },
            { t: 'Chọn tài khoản Google có sẵn hoặc “Sử dụng tài khoản khác”.', title: 'Chọn tài khoản', rows: ['Nguyễn Văn A · ...@gmail.com', 'Trần Thị B · ...@gmail.com', 'Sử dụng tài khoản khác'], tap: 0 },
            { t: 'Nhập mật khẩu, hoàn tất xác minh nếu Google yêu cầu.', title: 'Chào mừng', rows: ['Nhập mật khẩu ••••••••', 'Hiện mật khẩu', 'Tiếp theo'], tap: 2 },
            { t: 'Xem các điều khoản, nhấn đồng ý để tiếp tục.', title: 'Điều khoản', rows: ['Bằng cách tiếp tục, bạn đồng ý…', 'Chính sách quyền riêng tư', 'Tôi đồng ý'], tap: 2 },
            { t: 'Đăng nhập thành công: bắt đầu hỏi Gemini.', title: 'Gemini', rows: ['Xin chào!', 'Bạn muốn hỏi gì hôm nay?', 'Nhập câu lệnh…'], tap: 2, done: 'Sẵn sàng' } ] }] } },

        { type: 'part', t: 'Phần 4. Dùng AI hỗ trợ công việc với người dân' },
        { type: 'prompt', title: 'Prompt tra cứu và tóm tắt văn bản pháp luật (giới hạn nguồn, buộc nêu căn cứ)', rows: [
          ['Vai trò', 'Đóng vai chuyên viên pháp chế,'],
          ['Nhiệm vụ', 'hãy tra cứu và tóm tắt [TÊN THỦ TỤC/VẤN ĐỀ PHÁP LÝ] theo pháp luật Việt Nam hiện hành tại [THỜI ĐIỂM TRA CỨU].'],
          ['Nguồn', 'Chỉ sử dụng nguồn pháp luật chính thức, đáng tin cậy; kiểm tra hiệu lực văn bản trước khi kết luận; nêu rõ căn cứ pháp lý;'],
          ['Đầu ra', 'Trình bày kết quả dạng bảng với các mục chính;'],
          ['Ràng buộc', 'Không tự suy diễn hoặc bổ sung thông tin không có căn cứ; nếu chưa đủ căn cứ, ghi: “Cần tra cứu thêm văn bản hướng dẫn.”'],
          ['Rà soát', 'Cuối cùng, kiểm tra chéo với quy định và hướng dẫn hiện hành của cơ quan có thẩm quyền, nêu rõ nội dung còn cần xác minh.'] ] },
        { type: 'note', kind: 'law', title: 'Quy tắc vàng', body: '<strong>Phải có nguồn pháp luật – mỗi kết luận phải có nguồn – không đủ thì ghi “chưa đủ căn cứ”.</strong> AI cho manh mối; văn bản gốc cho căn cứ.' },
        { type: 'widget', name: 'poster', title: 'Bài tập: dựng áp phích “Luật An ninh mạng – 5 lưu ý tự bảo vệ”', intro: 'AI gợi ý 8 lưu ý nhưng có 2 lưu ý sai. Chọn 5 lưu ý đúng, chọn tiêu đề, màu sắc, rồi kiểm tra trước khi đăng.' },
        { type: 'points', title: '5 nguyên tắc khi dùng AI để trả lời người dân', items: [
          { i: 'chat', t: '01. Dễ hiểu', d: 'Câu ngắn, từ ngữ thông dụng, 1 ý/đoạn.' },
          { i: 'database', t: '02. Đúng nguồn', d: 'Điều kiện, hồ sơ, thời hạn phải kiểm tra từ nguồn chính thức.' },
          { i: 'x', t: '03. Không bịa', d: 'Không tự thêm số điện thoại, mức phí, biểu mẫu, thời hạn.' },
          { i: 'list', t: '04. Có cấu trúc', d: 'Cần chuẩn bị gì – làm ở đâu – bước tiếp theo.' },
          { i: 'heart', t: '05. Biết giới hạn', d: 'Trường hợp đặc biệt chuyển cán bộ chuyên môn xác minh.' } ] },
        { type: 'widget', name: 'plainlang', title: 'Từ ngôn ngữ nghiệp vụ sang ngôn ngữ phục vụ', intro: 'AI được phép đổi cách diễn đạt, không được đổi nội dung pháp lý.' },
        { type: 'widget', name: 'zalo', title: 'Thực hành: thông báo Zalo lịch khám sàng lọc tăng huyết áp', intro: 'Bật, tắt các yêu cầu trong câu lệnh, bấm “Tạo bài đăng” và quan sát kết quả.', opts: {
          data: 'Trạm Y tế xã tổ chức khám sàng lọc tăng huyết áp lúc 07h30 ngày 26/09/2026; địa điểm tại Trạm Y tế xã; đối tượng người từ 40 tuổi; mang BHYT nếu có.',
          sender: 'Trạm Y tế xã Long Thành', group: 'Nhóm thông tin người dân', av: 'TYT',
          hello: ['📢', 'Kính gửi cô bác và anh chị từ 40 tuổi trở lên trên địa bàn xã,', 'Kính gửi: Nhân dân từ 40 tuổi trở lên.'],
          intro: ['Trạm Y tế xã trân trọng thông báo lịch khám sàng lọc tăng huyết áp như sau:', 'Thực hiện kế hoạch phòng, chống bệnh không lây nhiễm, Trạm Y tế xã tổ chức khám sàng lọc bệnh tăng huyết áp cho các đối tượng trên địa bàn như sau:'],
          items: [['🕖', 'Thời gian: 07h30 ngày 26/09/2026.'], ['📍', 'Địa điểm: Trạm Y tế xã.'], ['🩺', 'Nội dung: đo huyết áp và kiểm tra sàng lọc sức khỏe tim mạch.'], ['💳', 'Lưu ý: cô bác, anh chị vui lòng mang theo thẻ BHYT (nếu có).']],
          fake: ['🎁', 'Quyền lợi: ', 'miễn phí 100%, tặng thuốc huyết áp 1 tháng', '0909 123 456'],
          long: 'Tăng huyết áp là bệnh lý mạn tính phổ biến, diễn biến âm thầm, có thể dẫn tới nhiều biến chứng nguy hiểm như đột quỵ, nhồi máu cơ tim, suy thận… Việc khám sàng lọc định kỳ có ý nghĩa đặc biệt quan trọng trong công tác chăm sóc sức khỏe ban đầu, phát hiện sớm, điều trị kịp thời, nâng cao chất lượng cuộc sống của Nhân dân…',
          close: ['Kính mong bà con sắp xếp thời gian đến trạm kiểm tra để chủ động chăm sóc sức khỏe thật tốt nhé ạ! ', '💙', 'Đề nghị các đối tượng nghiêm túc thực hiện.'],
          limLabel: 'Không thêm số điện thoại, không tự bịa quyền lợi' } },
        { type: 'prompt', title: 'Tình huống: người dân lớn tuổi, mắt kém, nhờ soạn Tờ khai xin xác nhận tình trạng hôn nhân', rows: [
          ['Vai trò', 'Bạn là cán bộ hỗ trợ người dân tại Bộ phận Một cửa xã Long Thành.'],
          ['Nhiệm vụ', 'Soạn dự thảo “Tờ khai xin xác nhận tình trạng hôn nhân”'],
          ['Dữ liệu', 'cho ông Nguyễn Văn An (sinh năm 1968, ngụ ấp Long Thành, tình trạng: chưa từng kết hôn) để làm thủ tục chuyển nhượng quyền sử dụng đất. (Thông tin giả định.)'],
          ['Đầu ra', 'Chuẩn thể thức văn bản hành chính. Xuất file Word.'],
          ['Ràng buộc', 'Những chỗ cần thông tin cá nhân (số CCCD, ngày cấp) ghi chú [Người dân điền].'],
          ['Rà soát', 'Cuối cùng liệt kê các mục người dân cần tự điền và kiểm tra.'] ] },
        { type: 'widget', name: 'spot', title: 'Bài tập: soi bản nháp AI của Tờ khai', intro: 'Cán bộ quên dòng ràng buộc. Bấm vào những chỗ AI tự bịa hoặc không được để AI điền, rồi bấm “Kiểm tra”. Có 4 chỗ.', opts: { cls: 'spot-doc', okStamp: 'Tinh mắt', html:
          '<div class="sd-head"><div></div><div><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b><br><b>Độc lập - Tự do - Hạnh phúc</b></div></div>' +
          '<p class="sd-t"><b>TỜ KHAI CẤP GIẤY XÁC NHẬN TÌNH TRẠNG HÔN NHÂN</b></p>' +
          '<p>Kính gửi: Ủy ban nhân dân xã Long Thành</p>' +
          '<p>Họ, chữ đệm, tên người yêu cầu: <span class="sp" data-ok="0" data-why="Đúng dữ liệu.">Nguyễn Văn An</span></p>' +
          '<p>Năm sinh: <span class="sp" data-ok="0" data-why="Đúng dữ liệu.">1968</span>. Nơi cư trú: <span class="sp" data-ok="0" data-why="Đúng dữ liệu.">ấp Long Thành, xã Long Thành</span></p>' +
          '<p>Số định danh cá nhân: <span class="sp" data-ok="1" data-t="Số định danh 086068001234" data-why="AI tự bịa số định danh. Phải để [Người dân điền]; không đưa số căn cước thật của người dân lên AI.">086068001234</span>, cấp ngày <span class="sp" data-ok="1" data-t="Ngày cấp 15/3/2021" data-why="Ngày cấp do AI tự đặt.">15/3/2021</span></p>' +
          '<p>Tình trạng hôn nhân: <span class="sp" data-ok="0" data-why="Đúng dữ liệu.">Chưa từng kết hôn</span></p>' +
          '<p>Mục đích sử dụng: <span class="sp" data-ok="0" data-why="Đúng dữ liệu.">làm thủ tục chuyển nhượng quyền sử dụng đất</span> <span class="sp" data-ok="1" data-t="“tại thửa đất số 125, tờ bản đồ số 7”" data-why="Số thửa, tờ bản đồ do AI tự thêm.">tại thửa đất số 125, tờ bản đồ số 7</span>.</p>' +
          '<p>Tôi cam đoan những nội dung khai trên đây là đúng sự thật và chịu trách nhiệm trước pháp luật về cam đoan của mình.</p>' +
          '<div class="sd-foot"><div></div><div><i>Long Thành, ngày … tháng … năm 2026</i><br><b>Người yêu cầu</b><br><br><span class="sp" data-ok="1" data-t="“(đã ký) An”" data-why="Chữ ký phải do chính người dân ký sau khi được đọc lại nội dung; không để AI hay cán bộ ghi “đã ký”.">(đã ký) An</span></div></div>' } },
        { type: 'note', kind: 'warn', title: 'Hỗ trợ người dân đúng cách', body: 'Dùng AI soạn mẫu, nhưng <strong>không nhập số căn cước, ngày cấp thật của người dân vào AI</strong>. In ra, <strong>đọc lại cho người dân nghe</strong>, để người dân tự điền thông tin cá nhân (hoặc người thân điền giúp trước mặt), tự ký. Mẫu tờ khai chính thức: dùng mẫu đang áp dụng tại Bộ phận Một cửa.' },

        { type: 'part', t: 'Phần 5. An toàn khi dùng AI' },
        { type: 'widget', name: 'swipe', title: 'Bài tập: phân loại dữ liệu trước khi đưa lên AI', intro: 'Ba mức: Được phép – Cần cân nhắc kỹ – Tuyệt đối cấm.', opts: {
          bins: [{ name: 'Được phép', tone: 'l0', icon: 'check' }, { name: 'Cân nhắc kỹ', tone: 'l2', icon: 'alert' }, { name: 'Tuyệt đối cấm', tone: 'l3', icon: 'x' }],
          items: [
            { t: 'Tình huống giả định dùng trên lớp', bin: 0, why: 'An toàn, công khai.' },
            { t: 'Mẫu văn bản hành chính đã công khai', bin: 0, why: 'Thông tin công khai.' },
            { t: 'Văn bản pháp luật đã ban hành công khai', bin: 0, why: 'Thông tin công khai.' },
            { t: 'Dự thảo nội bộ chưa thông qua', bin: 1, why: 'Chưa chính thức, cần kiểm duyệt.' },
            { t: 'Số liệu thống kê chưa công bố chính thức', bin: 1, why: 'Cần cấp có thẩm quyền đồng ý.' },
            { t: 'Danh sách chưa kiểm duyệt', bin: 1, why: 'Có thể chứa thông tin cá nhân.' },
            { t: 'Hồ sơ, dữ liệu cá nhân của người dân', bin: 2, why: 'Dữ liệu cá nhân: tuyệt đối cấm.' },
            { t: 'Số điện thoại thật, số CCCD, số thẻ BHYT', bin: 2, why: 'Dữ liệu định danh: tuyệt đối cấm.' },
            { t: 'Mật khẩu, mã OTP, passcode', bin: 2, why: 'Thông tin xác thực: tuyệt đối cấm.' }
          ] } },
        { type: 'widget', name: 'flip', title: 'Cảnh giác ảo giác thông tin AI tự vẽ', opts: { tagF: 'Ảo giác', tagB: 'Khắc phục', cards: [
          { i: 'alert', f: 'Tự bịa số hiệu và tên: số hiệu văn bản, ký hiệu, tên người ký.', b: 'Yêu cầu AI dùng dấu [Cần bổ sung] để đánh dấu phần khuyết.' },
          { i: 'scale', f: 'Viện dẫn sai pháp lý: Luật, Nghị định đã hết hiệu lực.', b: 'Kiểm chứng chéo với hệ thống văn bản pháp luật hiện hành.' },
          { i: 'clock', f: 'Đổi ngày giờ tùy ý để câu văn “hợp lý”.', b: 'Ràng buộc cứng: “Tuyệt đối giữ nguyên ngày tháng cung cấp”.' } ] } },
        { type: 'widget', name: 'privacy', title: 'Bảo vệ quyền riêng tư khi sử dụng AI', intro: 'Gạt các công tắc về trạng thái an toàn: xóa lịch sử chat nhạy cảm, tắt tính năng huấn luyện, dùng trò chuyện tạm thời.' }
      ],
      takeaways: ['Cài ứng dụng từ kho chính thức, cập nhật thường xuyên, khóa màn hình.', 'AI soạn nội dung rất nhanh nhưng có thể bịa: luôn kiểm tra trước khi dùng.', 'Câu lệnh tốt có 6 thành phần; luôn ràng buộc “không tự bịa, thiếu thì ghi [Cần bổ sung]”.', 'Không đưa số căn cước, số điện thoại, mật khẩu, OTP của người dân lên AI.'],
      reflect: 'Có việc nào hằng ngày của đồng chí có thể nhờ AI soạn nháp, rồi mình kiểm tra lại?' },

    /* ================= CHUYÊN ĐỀ 2 ================= */
    { n: 2, session: 'Buổi sáng', time: tm('chuyen-de/2'), format: 'Thực hành trên điện thoại, mô phỏng',
      title: 'Hướng dẫn sử dụng VNeID và Dịch vụ công trực tuyến',
      lead: 'VNeID là “chìa khóa” để người dân dùng giấy tờ điện tử và nộp hồ sơ trực tuyến. Cán bộ hướng dẫn theo quy trình, để người dân tự thao tác, và không giữ thông tin cá nhân của người dân.',
      goals: [2, 5, 6, 9],
      hook: { title: 'Tình huống', text: 'Cô Tư đưa điện thoại cho cán bộ: “Con làm giùm cô cái VNeID với, mật khẩu cô ghi đây nè, có mã gì gửi về con đọc giùm luôn nghen.” Đồng chí sẽ làm gì?' },
      blocks: [
        { type: 'part', t: 'Phần 1. Bức tranh chung và nguyên tắc hướng dẫn' },
        { type: 'widget', name: 'flow', title: 'Bức tranh chung: 6 bước hướng dẫn', illus: true, opts: { steps: [
          { i: 'phone', t: 'Cài đặt VNeID', d: 'Tải đúng ứng dụng từ kho chính thức, cập nhật phiên bản mới.' },
          { i: 'idcard', t: 'Đăng ký / kích hoạt', d: 'Đăng ký tài khoản hoặc kích hoạt tài khoản định danh điện tử đã có.' },
          { i: 'folder', t: 'Tích hợp giấy tờ', d: 'Đưa các giấy tờ (thẻ BHYT, giấy phép lái xe, đăng ký xe…) vào ví giấy tờ.' },
          { i: 'heart', t: 'Sổ sức khỏe điện tử', d: 'Tích hợp thẻ BHYT và xem hồ sơ sức khỏe (Chuyên đề 3).' },
          { i: 'qr', t: 'Xuất trình giấy tờ', d: 'Dùng giấy tờ điện tử khi cán bộ hoặc đơn vị tiếp nhận yêu cầu.' },
          { i: 'gear', t: 'Xử lý lỗi thường gặp', d: 'Quên mật khẩu, đổi passcode, đổi thiết bị mới, thiếu dữ liệu.' } ] } },
        { type: 'note', kind: 'law', title: 'Điều kiện', body: 'Muốn sử dụng tốt Sổ sức khỏe điện tử, người dân cần có <strong>VNeID hoạt động ổn định</strong> và <strong>thẻ BHYT đã tích hợp</strong>.' },
        { type: 'points', title: '3 nguyên tắc khi hướng dẫn người dân', items: [
          { i: 'phone', t: '1. Cầm điện thoại càng ít càng tốt', d: 'Cán bộ chỉ chỉ vị trí nút bấm; người dân tự bấm.' },
          { i: 'lock', t: '2. OTP, mật khẩu, passcode', d: 'Để người dân tự nhập, không đọc to, không đọc cho cán bộ.' },
          { i: 'pen', t: '3. Sai thông tin, lỗi xác thực, không đủ điều kiện', d: 'Ghi nhận và chuyển đúng nơi hỗ trợ, không cố thao tác tiếp.' } ] },

        { type: 'part', t: 'Phần 2. Tài khoản mức 1, mức 2 và điều kiện trước khi bắt đầu' },
        { type: 'widget', name: 'sort', title: 'Bài tập: đặc điểm của tài khoản mức 1 và mức 2', opts: {
          bins: [{ name: 'Mức 1', tone: 'l2' }, { name: 'Mức 2', tone: 'l0' }],
          items: [
            { t: 'Thông tin kê khai được đối chiếu tự động', bin: 0, why: 'Đặc điểm của tài khoản mức 1.' },
            { t: 'Phù hợp bước khởi đầu', bin: 0, why: 'Mức 1 là bước đầu.' },
            { t: 'Chưa đủ cho nhiều tiện ích nâng cao', bin: 0, why: 'Mức 1 bị giới hạn tiện ích.' },
            { t: 'Thông tin được xác minh bằng ảnh chân dung', bin: 1, why: 'Mức 2 xác minh chân dung.' },
            { t: 'Cần cho xuất trình giấy tờ', bin: 1, why: 'Tiện ích cần mức 2.' },
            { t: 'Xem thông tin cư trú', bin: 1, why: 'Tiện ích cần mức 2.' },
            { t: 'Nhiều tiện ích y tế', bin: 1, why: 'Sổ sức khỏe điện tử cần mức 2.' }
          ] } },
        { type: 'note', kind: 'warn', title: 'Câu nói nên dùng với người dân', body: '“Để dùng các tiện ích quan trọng, cô/chú cần tài khoản mức 2.” Người dân chưa có mức 2 thì hướng dẫn liên hệ <strong>Công an xã</strong> để được hỗ trợ.' },
        { type: 'rules', variant: 'must', title: 'Trước khi bắt đầu: kiểm tra 5 điều kiện (một phút, tránh lỗi giữa chừng)', items: ['Điện thoại có mạng Internet ổn định.', 'Có số căn cước/định danh cá nhân và số điện thoại đã đăng ký; chuẩn bị sẵn để nhập khi cần.', 'Ứng dụng VNeID đã được cập nhật phiên bản mới.', 'Nhớ mật khẩu hoặc có cách lấy lại mật khẩu.', 'Khi cần NFC: điện thoại phải hỗ trợ đọc chip căn cước (kiểm tra trong phần cài đặt hoặc thông số thiết bị).', 'Nếu thiếu điều kiện: chuyển sang hướng dẫn xử lý lỗi thay vì cố thao tác tiếp.'] },

        { type: 'part', t: 'Phần 3. Cài đặt, đăng ký, kích hoạt VNeID' },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: cài đặt, đăng ký, kích hoạt', illus: true, opts: {
          note: 'Mô phỏng theo bài giảng; giao diện thật có thể khác theo phiên bản. OTP là mã xác thực tạm thời: người dân tự nhập, không đọc cho người khác.',
          apps: [
            { name: 'Cài đặt', short: '⬇', color: RED, goal: 'Bắt đầu từ kho ứng dụng chính thức trên điện thoại.', steps: [
              { t: 'Android: vào Google Play. iPhone: vào App Store.', title: 'Kho ứng dụng', rows: ['Google Play (Android)', 'App Store (iPhone)', 'Không tải từ đường link lạ'], tap: 0 },
              { t: 'Tìm “VNeID” và kiểm tra đúng biểu tượng ứng dụng (Bộ Công an).', title: 'Tìm kiếm: VNeID', rows: ['VNeID – Bộ Công an', 'Trung tâm dữ liệu quốc gia về dân cư', 'Cài đặt'], tap: 0 },
              { t: 'Bấm Cài đặt, chờ tải xong rồi mở ứng dụng.', title: 'VNeID', rows: ['Đang tải…', 'Mở', 'Đánh giá ★★★★'], tap: 1, done: 'Đã cài đặt' } ] },
            { name: 'Đăng ký', short: '+', color: '#B3121A', goal: 'Dành cho người dân chưa có tài khoản.', steps: [
              { t: 'Mở ứng dụng, chọn “Đăng ký”.', title: 'VNeID', rows: ['Đăng nhập', 'Đăng ký', 'Kích hoạt tài khoản định danh điện tử'], tap: 1 },
              { t: 'Nhập số định danh cá nhân và số điện thoại.', title: 'Đăng ký', rows: ['Số định danh cá nhân (12 số)', 'Số điện thoại', 'Tiếp tục'], tap: 2 },
              { t: 'Quét mã QR trên thẻ căn cước để kiểm tra thông tin.', title: 'Quét mã QR', rows: ['Đưa mã QR trên thẻ vào khung', 'Bật đèn', 'Nhập thủ công'], tap: 0 },
              { t: 'Nếu thông tin đúng, bấm đăng ký và chờ OTP. Chỉ tiếp tục khi thông tin hiển thị đúng với giấy tờ của người dân.', title: 'Xác nhận thông tin', rows: ['Họ tên: NGUYỄN VĂN A', 'Ngày sinh: ../../….', 'Đăng ký'], tap: 2, done: 'Chờ OTP' } ] },
            { name: 'Kích hoạt', short: '✓', color: '#8E0E14', goal: 'Áp dụng khi người dân đã đăng ký nhưng chưa kích hoạt.', steps: [
              { t: 'Chọn “Kích hoạt tài khoản định danh điện tử”.', title: 'VNeID', rows: ['Đăng nhập', 'Đăng ký', 'Kích hoạt tài khoản định danh điện tử'], tap: 2 },
              { t: 'Nhập số định danh cá nhân và số điện thoại.', title: 'Kích hoạt', rows: ['Số định danh cá nhân', 'Số điện thoại', 'Gửi yêu cầu'], tap: 2 },
              { t: 'Người dân tự nhập OTP được gửi về điện thoại.', title: 'Nhập mã OTP', rows: ['Mã OTP được gửi về số điện thoại', '_ _ _ _ _ _', 'Xác nhận'], tap: 1 },
              { t: 'Thiết lập mật khẩu, passcode và câu hỏi bảo mật.', title: 'Thiết lập', rows: ['Mật khẩu (8–20 ký tự)', 'Passcode (6 số)', 'Câu hỏi bảo mật'], tap: 0, done: 'Đã kích hoạt' } ] }
          ] } },
        { type: 'widget', name: 'swipe', title: 'Bài tập: mật khẩu hay passcode?', intro: 'Hai loại mã dễ bị nhầm khi hướng dẫn. Chọn đúng cho từng thẻ.', opts: {
          bins: [{ name: 'Mật khẩu', tone: 'l1', icon: 'lock' }, { name: 'Passcode', tone: 'l0', icon: 'key' }],
          items: [
            { t: 'Dùng để đăng nhập VNeID', bin: 0, why: 'Mật khẩu dùng để đăng nhập.' },
            { t: 'Yêu cầu 8–20 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt', bin: 0, why: 'Quy tắc của mật khẩu.' },
            { t: 'Ví dụ dạng: VNeID@2024', bin: 0, why: 'Ví dụ trong bài giảng về cấu trúc mật khẩu (không dùng đúng mật khẩu này).' },
            { t: 'Mã gồm 6 chữ số', bin: 1, why: 'Passcode là mã 6 số.' },
            { t: 'Dùng để mở ví giấy tờ, xuất trình giấy tờ, xem thông tin nhạy cảm', bin: 1, why: 'Chức năng của passcode.' },
            { t: 'Đổi tại: Cá nhân → Đổi passcode', bin: 1, why: 'Đường dẫn đổi passcode.' }
          ] } },

        { type: 'part', t: 'Phần 4. Các tiện ích: tích hợp, xuất trình giấy tờ, xem thông tin cư trú' },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: các tiện ích thường dùng', illus: true, opts: {
          note: 'Cần tài khoản mức 2. Nhập đúng thông tin theo giấy tờ gốc.',
          apps: [
            { name: 'Tích hợp giấy tờ', short: '⊕', color: RED, goal: 'Đăng ký xe, giấy phép lái xe, thẻ BHYT, người phụ thuộc…', steps: [
              { t: 'Vào Ví giấy tờ → Tích hợp thông tin → Tạo mới yêu cầu.', title: 'Ví giấy tờ', rows: ['Tích hợp giấy tờ', 'Xuất trình giấy tờ', 'Tạo mới yêu cầu'], tap: 2 },
              { t: 'Chọn đúng loại giấy tờ cần tích hợp.', title: 'Chọn loại thông tin', rows: ['Đăng ký xe', 'Giấy phép lái xe', 'Thẻ bảo hiểm y tế'], tap: 2 },
              { t: 'Nhập đúng thông tin theo giấy tờ gốc.', title: 'Nhập thông tin', rows: ['Loại thông tin: Thẻ BHYT', 'Số thẻ ……', 'Gửi yêu cầu'], tap: 1 },
              { t: 'Bấm gửi yêu cầu và theo dõi trạng thái xác thực.', title: 'Lịch sử tích hợp', rows: ['Yêu cầu đã gửi', 'Đang chờ phê duyệt', 'Đã xác thực'], tap: 1, done: 'Đã gửi yêu cầu' } ] },
            { name: 'Xuất trình', short: '▣', color: '#B3121A', goal: 'Khi cán bộ hoặc đơn vị tiếp nhận cần xem giấy tờ điện tử.', steps: [
              { t: 'Đăng nhập VNeID.', title: 'VNeID', rows: ['Số định danh', 'Mật khẩu', 'Đăng nhập'], tap: 2 },
              { t: 'Vào “Ví giấy tờ” → “Xuất trình giấy tờ”.', title: 'Ví giấy tờ', rows: ['Tích hợp giấy tờ', 'Xuất trình giấy tờ', 'Giấy tờ của tôi'], tap: 1 },
              { t: 'Nhập passcode (6 số).', title: 'Nhập passcode', rows: ['• • • • • •', 'Quên passcode?', 'Xác nhận'], tap: 0 },
              { t: 'Chọn loại giấy tờ và bấm xác nhận.', title: 'Chọn giấy tờ', rows: ['Thẻ căn cước', 'Thông tin cư trú', 'Thẻ bảo hiểm y tế'], tap: 2, done: 'Đã xuất trình' } ] },
            { name: 'Thông tin cư trú', short: '⌂', color: '#8E0E14', goal: 'Tra cứu thông tin cư trú trên VNeID.', steps: [
              { t: 'Kiểm tra ứng dụng đủ phiên bản và tài khoản mức 2.', title: 'VNeID', rows: ['Định danh mức 2 ✓', 'Phiên bản mới ✓', 'Tiếp tục'], tap: 2 },
              { t: 'Chọn “Ví giấy tờ”.', title: 'Trang chủ', rows: ['Thủ tục hành chính', 'Ví giấy tờ', 'Tiện ích'], tap: 1 },
              { t: 'Chọn “Thông tin cư trú”.', title: 'Ví giấy tờ', rows: ['Thẻ căn cước', 'Thông tin cư trú', 'Giấy phép lái xe'], tap: 1 },
              { t: 'Nhập passcode và xem thông tin thường trú, tạm trú, nơi ở hiện tại.', title: 'Nhập passcode', rows: ['• • • • • •', 'Thường trú / tạm trú', 'Nơi ở hiện tại'], tap: 0, done: 'Xem được thông tin' } ] }
          ] } },

        { type: 'part', t: 'Phần 5. Xử lý lỗi thường gặp' },
        { type: 'widget', name: 'fixit', title: 'Bác sĩ VNeID: chọn tình huống, xem cách xử lý', opts: { items: [
          { i: 'lock', q: 'Quên mật khẩu', why: 'Lâu không đăng nhập, đổi điện thoại, nhầm với passcode.', steps: ['Mở VNeID → “Quên mật khẩu”.', 'Nhập số định danh, số điện thoại.', 'Xác minh thông tin → người dân tự nhập OTP.', 'Tạo mật khẩu mới.'] },
          { i: 'key', q: 'Cần đổi passcode', why: 'Người dân muốn đổi mã 6 số hoặc nghi lộ passcode.', steps: ['Đăng nhập VNeID → Cá nhân.', 'Chọn “Đổi passcode”.', 'Nhập passcode hiện tại.', 'Tạo passcode mới.'] },
          { i: 'phone', q: 'Đổi sang điện thoại mới', why: 'Điện thoại cũ bị mất, hư hoặc không còn đăng nhập được.', steps: ['Cài VNeID trên điện thoại mới.', 'Đăng nhập bằng số căn cước và mật khẩu.', 'Xác nhận đang đăng nhập trên thiết bị mới.', 'Nếu không lấy được mã từ thiết bị cũ, chọn xác thực NFC bằng thẻ căn cước gắn chip.'], note: 'Nếu điện thoại không hỗ trợ NFC hoặc không đọc được, hướng dẫn công dân liên hệ Công an cấp xã để được hỗ trợ.' },
          { i: 'alert', q: 'Nhập passcode sai nhiều lần khi đăng nhập Dịch vụ công', why: 'Người dân không nhớ passcode, đoán thử.', steps: ['Dừng lại, không đoán tiếp.', 'Vào ứng dụng VNeID → hướng dẫn đổi hoặc lấy lại passcode.', 'Đăng nhập lại khi đã có passcode đúng.'], note: 'Theo bài giảng: nhập sai 5 lần liên tiếp thì phải đăng nhập lại vào ngày hôm sau.' },
          { i: 'idcard', q: 'Thông tin hiển thị không khớp giấy tờ', why: 'Dữ liệu dân cư chưa cập nhật hoặc nhập sai.', steps: ['Không tiếp tục đăng ký, kích hoạt.', 'Ghi nhận nội dung sai lệch.', 'Hướng dẫn người dân liên hệ Công an xã để điều chỉnh thông tin.'] }
        ] } },

        { type: 'part', t: 'Phần 6. Nộp hồ sơ và thanh toán trực tuyến' },
        { type: 'widget', name: 'flow', title: 'Quy trình 6 bước nộp hồ sơ trực tuyến', illus: true, opts: { steps: [
          { i: 'idcard', t: 'Đăng nhập', d: 'Sử dụng tài khoản định danh điện tử VNeID.' },
          { i: 'search', t: 'Tra cứu thủ tục', d: 'Tìm thủ tục hành chính cần nộp hồ sơ.' },
          { i: 'pen', t: 'Nhập thông tin', d: 'Điền thông tin vào biểu mẫu điện tử.' },
          { i: 'file', t: 'Đính kèm hồ sơ', d: 'Tải thành phần hồ sơ: DOC, PDF, JPG.' },
          { i: 'money', t: 'Thanh toán', d: 'Nộp phí, lệ phí trực tuyến (nếu có).' },
          { i: 'check', t: 'Theo dõi kết quả', d: 'Tra cứu trạng thái hồ sơ và kết quả.' } ] } },
        { type: 'points', title: 'Đăng nhập Cổng Dịch vụ công (dichvucong.gov.vn) bằng VNeID', items: [
          { i: 'globe', t: '1. Truy cập', d: 'Vào đúng địa chỉ https://dichvucong.gov.vn, bấm “Đăng nhập”.' },
          { i: 'idcard', t: '2. Nhập số định danh và mật khẩu', d: 'Bấm “Đăng nhập”, chọn gửi mã xác nhận về số điện thoại.' },
          { i: 'chat', t: '3. Xác thực', d: 'Người dân tự nhập OTP (hoặc passcode trên ứng dụng VNeID), tích chọn nội dung chia sẻ dữ liệu, bấm “Xác nhận chia sẻ”.' } ] },
        { type: 'widget', name: 'dvcsim', title: 'Mô phỏng: nộp hồ sơ trên Cổng Dịch vụ công từ A đến Z', intro: 'Làm lần lượt 6 bước như trên máy thật. Trợ lý bên phải sẽ nhắc khi làm sai.' },
        { type: 'widget', name: 'order', title: 'Bài tập: sắp xếp 4 bước thanh toán trực tuyến', opts: { done: 'Đúng! Biên lai thanh toán là căn cứ xác nhận giao dịch đã hoàn tất: hướng dẫn người dân lưu lại.', items: [
          { i: 'users', t: 'Vào tài khoản, chọn hồ sơ cần thanh toán', d: 'Thông tin tài khoản → Dịch vụ công của tôi → hồ sơ có yêu cầu thanh toán → “Thanh toán”.' },
          { i: 'list', t: 'Kiểm tra khoản phí và xác nhận giao dịch', d: 'Xem lại danh sách khoản phí, tổng số tiền, nội dung, đơn vị thụ hưởng.' },
          { i: 'money', t: 'Chọn phương thức và đơn vị thanh toán', d: 'Ví dụ: quét QR, thẻ nội địa, thẻ quốc tế, ví điện tử; chọn ngân hàng.' },
          { i: 'doc', t: 'Hoàn tất và lấy biên lai', d: 'Xem thông báo giao dịch thành công; lấy biên lai tại Lịch sử thanh toán.' } ] } },
        { type: 'rules', variant: 'do', title: 'Mẹo nhanh khi hỗ trợ nộp hồ sơ', items: ['Đọc trọn tên thủ tục trước khi bấm để tránh nhầm quy trình.', 'Xem chi tiết thủ tục: thành phần hồ sơ, thời hạn, phí, cơ quan thực hiện.', 'Chuẩn bị sẵn tệp PDF/JPG rõ nét, tên tệp dễ nhận biết, hạn chế tải nhầm.', 'Ghi lại mã hồ sơ ngay sau khi nộp để tra cứu và hỗ trợ khi phát sinh vướng mắc.'] }
      ],
      takeaways: ['Cầm điện thoại càng ít càng tốt: người dân tự bấm, tự nhập OTP, mật khẩu, passcode.', 'Mức 2 mới dùng được nhiều tiện ích quan trọng.', 'Mật khẩu để đăng nhập; passcode 6 số để mở ví giấy tờ, xuất trình.', 'Nộp hồ sơ: chọn đúng thủ tục, đúng cơ quan, đính kèm rõ nét, ghi lại mã hồ sơ.'],
      reflect: 'Lần hỗ trợ người dân gần nhất, đồng chí có lỡ cầm máy làm giùm hay nghe người dân đọc mã OTP không?' },

    /* ================= CHUYÊN ĐỀ 3 ================= */
    { n: 3, session: 'Buổi chiều', time: tm('chuyen-de/3'), format: 'Thực hành trên điện thoại',
      title: 'Hướng dẫn cài đặt các ứng dụng cần thiết',
      lead: 'Sổ sức khỏe điện tử trên VNeID giúp đi khám không cần thẻ BHYT giấy và xem lịch sử khám chữa bệnh. Ứng dụng Smart Vĩnh Long giúp người dân nhận thông tin, gửi phản ánh hiện trường. Cài đúng, dùng đúng, an toàn.',
      goals: [7, 9],
      hook: { title: 'Tình huống', text: 'Chú Sáu đi khám bệnh mà quên thẻ BHYT giấy ở nhà. Trên điện thoại chú đã có VNeID. Chú có thể dùng gì thay thẻ giấy?' },
      blocks: [
        { type: 'part', t: 'Phần 1. Sổ sức khỏe điện tử trên VNeID' },
        { type: 'points', title: 'Sổ sức khỏe điện tử gồm 2 việc cần hướng dẫn', items: [
          { i: 'heart', t: 'Việc 1: Tích hợp thẻ BHYT', d: 'Đăng nhập VNeID → Ví giấy tờ → Tích hợp thông tin → Chọn Thẻ BHYT → Gửi yêu cầu.' },
          { i: 'file', t: 'Việc 2: Xem hồ sơ sức khỏe', d: 'Mở VNeID → Nhóm dịch vụ Hồ sơ sức khỏe → Sổ sức khỏe điện tử → Nhập passcode để xem.' } ] },
        { type: 'note', kind: 'warn', title: 'Lưu ý', body: 'Nếu thẻ BHYT chưa xác thực, người dân có thể chưa xem được đầy đủ dữ liệu trong Sổ sức khỏe điện tử.' },
        { type: 'rules', variant: 'must', title: 'Điều kiện trước khi mở Sổ sức khỏe điện tử', items: ['Đã đăng nhập được VNeID.', 'Tài khoản định danh điện tử mức 2.', 'Có thẻ BHYT còn thông tin hợp lệ.', 'Biết passcode 6 số để mở ví/tiện ích.', 'Ứng dụng VNeID đã cập nhật phiên bản mới.', 'Không đủ điều kiện: chuyển sang nhóm hỗ trợ kích hoạt, nâng mức, lấy lại mật khẩu hoặc cập nhật ứng dụng.'] },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: Sổ sức khỏe điện tử', illus: true, opts: {
          note: 'Cô/chú tự nhập mật khẩu, passcode; cán bộ chỉ hướng dẫn vị trí nút bấm. Giao diện có thể khác theo phiên bản.',
          apps: [
            { name: 'Tích hợp thẻ BHYT', short: '+', color: '#E8590C', goal: 'Đưa thẻ BHYT vào ví giấy tờ.', steps: [
              { t: 'Bước 1: Đăng nhập vào ứng dụng VNeID.', title: 'VNeID', rows: ['Số định danh', 'Mật khẩu', 'Đăng nhập'], tap: 2 },
              { t: 'Bước 2: Tại giao diện chính chọn “Ví giấy tờ” và chọn “Tích hợp giấy tờ”.', title: 'Ví giấy tờ', rows: ['Tích hợp giấy tờ', 'Xuất trình giấy tờ', 'Lịch sử tích hợp'], tap: 0 },
              { t: 'Bước 3: Chọn “Tạo mới yêu cầu”, chọn giấy tờ “Thẻ bảo hiểm y tế”.', title: 'Chọn loại thông tin', rows: ['Đăng ký xe', 'Giấy phép lái xe', 'Thẻ bảo hiểm y tế'], tap: 2 },
              { t: 'Bước 4: Nhập đơn vị cấp thẻ, số thẻ BHYT; tích xác nhận thông tin đúng, chọn “Gửi yêu cầu”.', title: 'Nhập thông tin tích hợp', rows: ['Đơn vị cấp thẻ BHYT', 'Số thẻ BHYT', '☑ Tôi xác nhận thông tin là đúng'], tap: 2 },
              { t: 'Hệ thống hiển thị “Gửi yêu cầu thành công”; chờ phê duyệt.', title: 'Kết quả', rows: ['Gửi yêu cầu thành công', 'Tích hợp thêm thông tin khác', 'Quay về trang chủ'], tap: 0, done: 'Chờ phê duyệt' } ] },
            { name: 'Xuất trình BHYT', short: '▣', color: '#D9480F', goal: 'Dùng khi đi khám chữa bệnh.', steps: [
              { t: 'Bước 1: Tại giao diện chính chọn “Ví giấy tờ” và chọn “Xuất trình giấy tờ”.', title: 'Ví giấy tờ', rows: ['Tích hợp giấy tờ', 'Xuất trình giấy tờ', 'Giấy tờ của tôi'], tap: 1 },
              { t: 'Bước 2: Nhập passcode, tích chọn “Thẻ bảo hiểm y tế”, bấm “Xác nhận”.', title: 'Chọn giấy tờ', rows: ['Thẻ căn cước', 'Thông tin cư trú', 'Thẻ bảo hiểm y tế ☑'], tap: 2 },
              { t: 'Bước 3: Tại giao diện thông tin thẻ, bấm dấu 3 chấm để xem ảnh thẻ BHYT.', title: 'Thẻ bảo hiểm y tế', rows: ['BHYT · Đã xác thực', 'Xem ảnh thẻ (⋮)', 'Xuất trình giấy tờ'], tap: 1, done: 'Sẵn sàng xuất trình' } ] },
            { name: 'Xem hồ sơ sức khỏe', short: '♥', color: '#C2255C', goal: 'Xem lịch sử khám chữa bệnh.', steps: [
              { t: 'Bước 1: Trên màn hình trang chủ, chọn mục “Hồ sơ sức khỏe”.', title: 'Nhóm dịch vụ', rows: ['Thủ tục hành chính', 'An sinh xã hội', 'Hồ sơ sức khỏe'], tap: 2 },
              { t: 'Bước 2: Chọn “Sổ sức khỏe điện tử” và nhập passcode để xem lịch sử khám chữa bệnh.', title: 'Hồ sơ sức khỏe', rows: ['Sổ sức khỏe điện tử', 'Giấy chuyển tuyến', 'Giấy hẹn khám lại'], tap: 0, done: 'Xem được lịch sử' } ] }
          ] } },
        { type: 'widget', name: 'fixit', title: 'Các tình huống thường gặp khi hỗ trợ Sổ sức khỏe điện tử', intro: 'Mục tiêu xử lý lỗi: xác định thiếu điều kiện nào, rồi đưa người dân về đúng bước.', opts: { items: [
          { i: 'search', q: 'Không thấy mục Sổ sức khỏe điện tử', why: 'Ứng dụng phiên bản cũ hoặc tài khoản chưa mức 2.', steps: ['Kiểm tra phiên bản VNeID, cập nhật nếu cần.', 'Kiểm tra tài khoản đã mức 2 chưa.'] },
          { i: 'idcard', q: 'Không có thẻ BHYT trong ví', why: 'Chưa tích hợp thẻ BHYT.', steps: ['Hướng dẫn tích hợp thẻ BHYT trước (Ví giấy tờ → Tích hợp giấy tờ → Thẻ bảo hiểm y tế).'] },
          { i: 'key', q: 'Quên passcode', why: 'Lâu không dùng ví giấy tờ.', steps: ['Vào Cá nhân để đổi hoặc lấy lại passcode theo hướng dẫn bảo mật.'] },
          { i: 'clock', q: 'Không có dữ liệu khám chữa bệnh', why: 'Dữ liệu cần thời gian đồng bộ.', steps: ['Giải thích dữ liệu cần thời gian đồng bộ.', 'Hẹn kiểm tra lại sau.'] },
          { i: 'alert', q: 'Sai thông tin cá nhân hoặc BHYT', why: 'Nhập sai hoặc dữ liệu gốc chưa đúng.', steps: ['Kiểm tra giấy tờ gốc.', 'Tạo lại yêu cầu khi cần.'] }
        ] } },

        { type: 'part', t: 'Phần 2. Ứng dụng Smart Vĩnh Long' },
        { type: 'points', title: 'Giới thiệu tổng thể', items: [
          { i: 'building', t: 'Đơn vị chủ quản', d: 'Nhận diện qua logo tỉnh Vĩnh Long.' },
          { i: 'users', t: 'Nhóm chức năng cho người dân', d: 'Phản ánh hiện trường, cập nhật thông tin, tra cứu dịch vụ công, y tế, giáo dục…' },
          { i: 'laptop', t: 'Nhóm chức năng cho cán bộ', d: 'Quản lý công việc, họp thông minh, cập nhật số liệu, tra cứu thông tin số.' },
          { i: 'idcard', t: 'Tài khoản người dùng', d: 'Quản lý thông tin cá nhân, đăng nhập, đăng ký.' } ] },
        { type: 'points', title: 'Bốn loại bản tin', items: [
          { i: 'alert', t: 'Bản tin cảnh báo', d: '' }, { i: 'bell', t: 'Bản tin thông báo', d: '' }, { i: 'doc', t: 'Truyền thông chính sách', d: '' }, { i: 'megaphone', t: 'Truyền thông quảng bá', d: '' } ] },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: tải, đăng ký, đăng nhập Smart Vĩnh Long', illus: true, opts: {
          note: 'Cần nhập chính xác số điện thoại di động để nhận mã xác thực qua tin nhắn từ tổng đài VINHLONG_SO. Không chia sẻ mã cho người khác.',
          apps: [{ name: 'Smart Vĩnh Long', short: 'VL', color: '#0B6FB8', goal: 'Có tài khoản để gửi phản ánh, nhận thông tin của tỉnh.', steps: [
            { t: 'Vào App Store hoặc Google Play, tìm “Smart Vĩnh Long”, chọn đúng ứng dụng để cài đặt.', title: 'Tìm: Smart Vĩnh Long', rows: ['Smart Vĩnh Long', 'Ứng dụng khác…', 'Cài đặt'], tap: 0 },
            { t: 'Khởi động ứng dụng, chọn mục Tài khoản, chọn “Đăng ký”.', title: 'Tài khoản', rows: ['Tài khoản (số điện thoại, CCCD)', 'Mật khẩu', 'Bạn chưa có tài khoản? Đăng ký'], tap: 2 },
            { t: 'Nhập đầy đủ, chính xác thông tin theo các mục gợi ý; chọn “Kiểm tra thông tin”.', title: 'Đăng ký tài khoản', rows: ['Họ và tên', 'Ngày sinh · Căn cước công dân', 'Số điện thoại · Kiểm tra thông tin'], tap: 2 },
            { t: 'Nhận mã OTP từ tổng đài VINHLONG_SO, người dân tự nhập mã và chọn “Đăng ký”.', title: 'Xác thực OTP', rows: ['Tin nhắn từ VINHLONG_SO', 'Mã OTP: _ _ _ _ _ _', 'Đăng ký'], tap: 1 },
            { t: 'Nhập giới tính, địa chỉ thường trú, mật khẩu; chọn “Đăng ký” để hoàn tất.', title: 'Hoàn tất thông tin', rows: ['Giới tính: Nam / Nữ', 'Địa chỉ thường trú', 'Mật khẩu · Đăng ký'], tap: 2 },
            { t: 'Đăng nhập bằng số điện thoại hoặc số CCCD và mật khẩu.', title: 'Đăng nhập', rows: ['Số điện thoại, CCCD', 'Mật khẩu', 'Đăng nhập'], tap: 2, done: 'Đăng nhập thành công' } ] }] } },
        { type: 'widget', name: 'phananh', title: 'Thực hành: gửi phản ánh hiện trường', intro: 'Chọn nội dung, vị trí, ảnh rồi bấm “Gửi phản ánh”. Ứng dụng mô phỏng sẽ kiểm tra phản ánh có đạt yêu cầu không.' },
        { type: 'note', kind: 'law', title: 'Theo dõi phản ánh', body: 'Trong chức năng Phản ánh hiện trường có: gửi phản ánh; theo dõi phản ánh của người dân trên địa bàn; các phản ánh của cá nhân đã gửi.' },

        { type: 'part', t: 'Phần 3. Cài ứng dụng an toàn' },
        { type: 'widget', name: 'sort', title: 'Bài tập: dấu hiệu ứng dụng thật và ứng dụng giả', opts: {
          bins: [{ name: 'Đáng tin', tone: 'l0' }, { name: 'Đáng ngờ, không cài', tone: 'l3' }],
          items: [
            { t: 'Tải từ Google Play hoặc App Store', bin: 0, why: 'Kho ứng dụng chính thức.' },
            { t: 'Tên nhà phát triển là cơ quan nhà nước, đơn vị chính thức', bin: 0, why: 'Kiểm tra nhà phát triển trước khi cài.' },
            { t: 'Tệp cài đặt .apk gửi qua Zalo, Messenger', bin: 1, why: 'Cách phát tán ứng dụng giả mạo, mã độc.' },
            { t: 'Người gọi điện tự xưng công an, đọc link bảo cài ứng dụng', bin: 1, why: 'Thủ đoạn lừa đảo phổ biến.' },
            { t: 'Ứng dụng đòi quyền đọc tin nhắn, điều khiển màn hình', bin: 1, why: 'Có thể đọc OTP, chiếm quyền điều khiển.' },
            { t: 'Ứng dụng được giới thiệu trên trang .gov.vn của cơ quan', bin: 0, why: 'Nguồn chính thống.' }
          ] } },
        { type: 'table', title: 'Một số ứng dụng thường dùng (tìm đúng tên trên kho ứng dụng chính thức)', head: ['Ứng dụng', 'Dùng để', 'Lưu ý khi hướng dẫn'], rows: [
          ['<strong>VNeID</strong>', 'Định danh điện tử, ví giấy tờ, Sổ sức khỏe điện tử, đăng nhập Dịch vụ công', 'Cần tài khoản mức 2 cho nhiều tiện ích'],
          ['<strong>Smart Vĩnh Long</strong>', 'Thông tin của tỉnh, phản ánh hiện trường, tra cứu dịch vụ', 'OTP từ tổng đài VINHLONG_SO'],
          ['<strong>VssID</strong>', 'Tra cứu thông tin bảo hiểm xã hội, bảo hiểm y tế', 'Kiểm tra nhà phát triển trước khi cài'],
          ['<strong>eTax Mobile</strong>', 'Tra cứu, kê khai, nộp thuế cá nhân', 'Kiểm tra nhà phát triển trước khi cài'],
          ['<strong>Ứng dụng AI</strong> (Gemini, ChatGPT…)', 'Hỏi đáp, soạn nội dung', 'Không nhập thông tin cá nhân, mật khẩu, OTP'] ],
          note: 'Tên, giao diện ứng dụng có thể thay đổi; luôn tìm trên Google Play/App Store và kiểm tra tên nhà phát triển.' }
      ],
      takeaways: ['Sổ sức khỏe điện tử: tích hợp thẻ BHYT trước, rồi xem hồ sơ sức khỏe bằng passcode.', 'Không thấy Sổ sức khỏe điện tử: kiểm tra phiên bản và tài khoản mức 2.', 'Smart Vĩnh Long: đăng ký bằng số điện thoại chính xác; OTP từ VINHLONG_SO.', 'Phản ánh tốt: nội dung rõ, vị trí chính xác, ảnh rõ, lời lẽ khách quan.'],
      reflect: 'Trên điện thoại của đồng chí đã có VNeID mức 2 và thẻ BHYT tích hợp chưa?' },

    /* ================= CHUYÊN ĐỀ 4 ================= */
    { n: 4, session: 'Buổi chiều', time: tm('chuyen-de/4'), format: 'Trình chiếu, thực hành trên điện thoại',
      title: 'Kỹ năng nhận biết, phòng, chống lừa đảo trực tuyến',
      lead: 'Kẻ gian giả danh cơ quan chức năng, gọi điện, nhắn tin, dùng mạng xã hội và cả AI để lừa người dân, nhất là người lớn tuổi. Biết nhận diện, biết bảo vệ tài khoản, biết làm gì khi lỡ bị lừa.',
      goals: [3, 8, 10],
      hook: { title: 'Tình huống', text: '9 giờ sáng, chú Bảy nhận tin nhắn: “Hệ thống BHYT của anh/chị sắp bị khóa do chưa đồng bộ VNeID. Vui lòng xác minh trong 10 phút…” kèm đường link. Chú hỏi cán bộ: “Có bấm vô không con?”' },
      blocks: [
        { type: 'part', t: 'Phần 1. Nhận diện các nguy cơ' },
        { type: 'widget', name: 'threats', title: 'Bốn hình thức lừa đảo phổ biến' },
        { type: 'points', title: 'AI hỗ trợ tội phạm như thế nào?', items: [
          { i: 'chat', t: '1. Tạo tin nhắn lừa đảo giống thật', d: 'AI giúp viết tin nhắn trôi chảy, đúng ngữ cảnh, dễ tạo niềm tin.' },
          { i: 'call', t: '2. Giả giọng nói, khuôn mặt', d: 'Có thể tạo video, giọng nói giả mạo danh tính người thân hoặc cơ quan.' },
          { i: 'users', t: '3. Cá nhân hóa kịch bản lừa đảo', d: 'Kẻ xấu thu thập thông tin công khai rồi dùng AI soạn nội dung nhắm đúng từng người.' },
          { i: 'doc', t: '4. Tạo ảnh, giấy tờ, website giả', d: 'Biên lai, mã QR, trang web, thông báo giả mạo ngày càng tinh vi.' } ] },
        { type: 'rules', variant: 'do', title: 'Cách tự bảo vệ', items: ['Không tin ngay nội dung quá thuyết phục.', 'Luôn gọi lại số chính thức.', 'Kiểm tra nguồn trước khi bấm link hoặc chuyển tiền.', 'Không cung cấp OTP, mật khẩu.', 'AI là công cụ hữu ích, nhưng cũng có thể bị lợi dụng để lừa đảo.'] },

        { type: 'part', t: 'Phần 2. Thực hành nhận diện' },
        { type: 'widget', name: 'spot', title: 'Bài tập: nhận diện tin nhắn lừa đảo BHYT/VNeID', intro: 'Tình huống mô phỏng; đường link là giả lập, không truy cập. Tìm ít nhất 5 dấu hiệu nguy hiểm (có tất cả 6 chỗ).', opts: { cls: 'spot-phone', okStamp: 'Lừa đảo', html:
          '<div class="sms-ph"><div class="sms-top"><span class="sp" data-ok="1" data-t="Tên người gửi “BHYT”" data-why="Tên hiển thị có thể giả mạo; cơ quan bảo hiểm không nhắn tin yêu cầu khai báo như vậy.">BHYT</span><small>Tin nhắn · 09:24</small></div>' +
          '<div class="sms-b">Hệ thống BHYT của anh/chị <span class="sp" data-ok="1" data-t="Đe dọa khóa BHYT" data-why="Đe dọa khóa BHYT để gây sợ hãi.">sắp bị khóa do chưa đồng bộ VNeID</span>. Vui lòng xác minh <span class="sp" data-ok="1" data-t="Tạo áp lực “trong 10 phút”" data-why="Tạo áp lực thời gian để không kịp suy nghĩ.">trong 10 phút</span> tại:<br><span class="sp sms-link" data-ok="1" data-t="Đường link vneid-bhyt-support.example" data-why="Đường link không phải kênh chính thức (.gov.vn).">http://vneid-bhyt-support.example</span><br><br><span class="sp" data-ok="1" data-t="Yêu cầu nhập CCCD và mã OTP" data-why="Yêu cầu nhập căn cước và OTP trên website lạ.">Nhập số CCCD và mã OTP để hoàn tất.</span><br><span class="sp" data-ok="1" data-t="Không có văn bản, đầu mối xác minh" data-why="Không có số văn bản, đầu mối xác minh rõ ràng.">Trân trọng.</span></div></div>' } },
        { type: 'note', kind: 'law', title: 'Xử lý đúng', body: 'Không bấm link → tự mở ứng dụng hoặc trang chính thức → gọi đầu mối đã biết → báo cán bộ, công an xã nếu nghi ngờ.' },
        { type: 'widget', name: 'spot', title: 'Bài tập: ảnh “chuyển khoản thành công” nào có dấu hiệu lừa đảo?', intro: 'Người mua hàng gửi 2 ảnh chụp màn hình giao dịch. Bấm vào các chi tiết đáng ngờ, sau đó bấm “Kiểm tra”.', opts: { cls: 'spot-bank', okStamp: 'Phát hiện', html:
          '<div class="bx-wrap"><div class="bx"><p class="bx-tag">ẢNH 1</p><div class="bx-ph"><p class="bx-bank">Ngân hàng A</p><p class="bx-ok">✔</p><p><span class="sp" data-ok="1" data-t="“LẬP LỆNH THÀNH CÔNG”" data-why="Chỉ là lập lệnh thành công, chưa phải giao dịch thành công. Lệnh có thể bị hủy, không trừ tiền.">LẬP LỆNH THÀNH CÔNG</span></p><p class="bx-amt"><span class="sp" data-ok="1" data-t="Số tiền nhỏ, ngày cũ" data-why="Chiêu thường dùng để tạo niềm tin khi mua bán qua mạng, đặt cọc…">10,000 VND · 03/01/2023</span></p><p class="bx-l">Tên người thụ hưởng ……</p><p class="bx-l">Tài khoản thụ hưởng ……</p><p class="bx-l">Mã giao dịch ……</p></div></div>' +
          '<div class="bx"><p class="bx-tag ok">ẢNH 2</p><div class="bx-ph dark"><p class="bx-bank">Ngân hàng A</p><p><span class="sp" data-ok="0" data-why="Hiển thị “chuyển khoản thành công”.">CHUYỂN KHOẢN THÀNH CÔNG</span></p><p class="bx-amt"><span class="sp" data-ok="0" data-why="Có đầy đủ số tiền, thời gian.">300,000,000 VND · 15:55</span></p><p class="bx-l"><span class="sp" data-ok="0" data-why="Có đủ thông tin giao dịch.">Mã giao dịch, ngân hàng, nội dung đầy đủ</span></p></div></div></div>' +
          '<p class="bx-note">Lưu ý: kể cả ảnh 2 cũng chỉ là ảnh chụp, có thể chỉnh sửa. Bán hàng an toàn = kiểm tra tài khoản nhận tiền thật.</p>' } },
        { type: 'points', title: 'Ảnh chuyển khoản chưa chắc là đã nhận tiền', items: [
          { i: 'clock', t: '1. Đã lập lệnh / chờ xử lý', d: 'Đây chỉ là thông báo đã lập lệnh chuyển tiền; giao dịch có thể đang chờ xử lý hoặc bị hủy, chưa chắc tiền đã vào.' },
          { i: 'camera', t: '2. Ảnh chụp màn hình dễ gây nhầm', d: 'Ảnh có thể bị chỉnh sửa, cắt ghép hoặc gửi lại ảnh cũ.' },
          { i: 'check', t: '3. Cách xác minh đúng', d: 'Kiểm tra biến động số dư thực tế; đối chiếu lịch sử giao dịch trong ứng dụng ngân hàng; chờ thông báo chính thức; không giao hàng chỉ dựa vào ảnh.' } ] },
        { type: 'points', title: 'Nội dung giả mạo do AI (deepfake)', items: [
          { i: 'video', t: 'Video giả khuôn mặt', d: 'Khẩu hình lệch âm thanh; chớp mắt bất thường; viền mặt, chân tóc, vành tai nhòe mờ.' },
          { i: 'call', t: 'Giọng nói AI giả giọng người thân', d: 'Chỉ cần khoảng 5 giây ghi âm giọng thật là có thể nhái giọng. Giọng AI thường đều đều, thiếu cảm xúc tự nhiên.' },
          { i: 'shield', t: 'Nguyên tắc vàng', d: '“Thấy chưa chắc đã tin, nghe chưa chắc là thật”. Hỏi câu hỏi riêng chỉ 2 người biết, hoặc gọi lại bằng số đã lưu từ trước.' } ] },
        { type: 'widget', name: 'deepfake', title: 'Bài tập: soi cuộc gọi video giả mạo', intro: 'Bấm vào những vị trí đáng ngờ trên màn hình cuộc gọi. Có 6 dấu hiệu.' },
        { type: 'widget', name: 'flip', title: 'Hình ảnh, công văn giả và quy tắc ứng phó', opts: { tagF: 'Nhận diện', tagB: 'Chi tiết', cards: [
          { i: 'camera', f: 'Ảnh giả do AI', b: 'Ngón tay thừa, thiếu, dị dạng; chữ trong ảnh méo, nhòe, sai chính tả; bóng đổ không đúng logic thực tế.' },
          { i: 'doc', f: 'Công văn, thông báo giả', b: 'Sai thể thức; số ký hiệu, ngày tháng không chuẩn; con dấu và chữ ký mờ, không rõ nét.' },
          { i: 'shield', f: 'Quy tắc 4 bước vàng', b: '1. Kiểm chứng với kênh chính thống. 2. Không chia sẻ. 3. Báo cáo cán bộ phụ trách. 4. Lưu vết: chụp màn hình làm bằng chứng.' } ] } },

        { type: 'part', t: 'Phần 3. Bảo vệ tài khoản' },
        { type: 'widget', name: 'password', title: 'Phương pháp đặt mật khẩu passphrase', intro: 'Ghép 3–4 từ không liên quan, có chữ hoa, chữ thường, số và ký tự đặc biệt. Không nhập mật khẩu thật.' },
        { type: 'points', title: 'Lựa chọn giải pháp xác thực hai lớp (2FA)', items: [
          { i: 'chat', t: 'Mã OTP qua SMS (trung bình)', d: 'Tiện lợi nhưng có nguy cơ bị chiếm đoạt SIM.' },
          { i: 'phone', t: 'Ứng dụng Authenticator (cao)', d: 'Google/Microsoft Authenticator sinh mã ngay trên máy. Khuyến dùng.' },
          { i: 'usb', t: 'Khóa bảo mật vật lý (rất cao)', d: 'Dành cho người quản trị hệ thống quan trọng.' } ] },
        { type: 'widget', name: 'phonesteps', title: 'Thực hành: bật “lá chắn thép” (2FA) cho Zalo, Facebook, TikTok', intro: 'Yêu cầu 100% học viên dùng điện thoại cá nhân thực hành ngay tại lớp.', illus: true, opts: {
          note: 'Tên mục có thể khác đôi chút tùy phiên bản. Nếu không thấy, dùng ô tìm kiếm trong Cài đặt với từ khóa “2 lớp” hoặc “2 bước”.',
          apps: [
            { name: 'Zalo', short: 'Z', color: '#0068FF', goal: 'Tránh bị hacker chiếm quyền Zalo để lừa đảo người thân, khách hàng.', steps: [
              { t: 'Mở Zalo, chọn thẻ Cá nhân.', title: 'Zalo', rows: ['Tin nhắn', 'Danh bạ', 'Khám phá', 'Nhật ký', 'Cá nhân'], tap: 4 },
              { t: 'Chọn Cài đặt (bánh răng).', title: 'Cá nhân', rows: ['Nguyễn Văn A', 'Ví QR', 'Cloud của tôi', 'Cài đặt ⚙'], tap: 3 },
              { t: 'Chọn “Tài khoản và bảo mật”.', title: 'Cài đặt', rows: ['Tài khoản và bảo mật', 'Quyền riêng tư', 'Dữ liệu trên máy'], tap: 0 },
              { t: 'Bật “Xác thực 2 lớp”.', title: 'Tài khoản và bảo mật', rows: ['Số điện thoại', 'Mã khóa Zalo', 'Xác thực 2 lớp'], tap: 2, toggle: true },
              { t: '(Tùy chọn) Kiểm tra thiết bị đăng nhập, đăng xuất thiết bị lạ.', title: 'Thiết bị đăng nhập', rows: ['iPhone (thiết bị này)', 'Windows · 2 ngày trước', 'Đăng xuất thiết bị lạ'], tap: 2, done: 'Đã bật 2 lớp' } ] },
            { name: 'Facebook', short: 'f', color: '#1877F2', goal: 'Tránh bị chiếm tài khoản bán hàng, liên lạc.', steps: [
              { t: 'Mở Facebook, chọn Menu.', title: 'Facebook', rows: ['Trang chủ', 'Video', 'Bạn bè', 'Thông báo', 'Menu ☰'], tap: 4 },
              { t: 'Chọn “Cài đặt và quyền riêng tư” > “Cài đặt”.', title: 'Menu', rows: ['Trợ giúp và hỗ trợ', 'Cài đặt và quyền riêng tư', 'Cài đặt'], tap: 2 },
              { t: 'Chọn “Trung tâm tài khoản”.', title: 'Cài đặt', rows: ['Trung tâm tài khoản', 'Tùy chọn', 'Đối tượng'], tap: 0 },
              { t: 'Chọn “Mật khẩu và bảo mật” > “Xác thực 2 yếu tố” và bật.', title: 'Mật khẩu và bảo mật', rows: ['Đổi mật khẩu', 'Xác thực 2 yếu tố', 'Nơi bạn đã đăng nhập'], tap: 1, toggle: true },
              { t: '(Tùy chọn) Rà soát “Nơi bạn đã đăng nhập”.', title: 'Nơi bạn đã đăng nhập', rows: ['iPhone · đang hoạt động', 'Windows PC', 'Đăng xuất'], tap: 2, done: 'Đã bật 2 yếu tố' } ] },
            { name: 'TikTok', short: '♪', color: '#111111', goal: 'Tránh mất tài khoản bán hàng, truyền thông.', steps: [
              { t: 'Mở TikTok, chọn Hồ sơ.', title: 'TikTok', rows: ['Trang chủ', 'Bạn bè', '+', 'Hộp thư', 'Hồ sơ'], tap: 4 },
              { t: 'Chọn Menu (☰) > “Cài đặt và quyền riêng tư”.', title: 'Hồ sơ', rows: ['TikTok Studio', 'Số dư', 'Cài đặt và quyền riêng tư'], tap: 2 },
              { t: 'Chọn “Bảo mật và quyền”.', title: 'Cài đặt và quyền riêng tư', rows: ['Tài khoản', 'Quyền riêng tư', 'Bảo mật và quyền'], tap: 2 },
              { t: 'Chọn “Xác minh 2 bước” và bật.', title: 'Bảo mật và quyền', rows: ['Cảnh báo bảo mật', 'Mật khẩu', 'Xác minh 2 bước'], tap: 2, toggle: true },
              { t: '(Tùy chọn) Kiểm tra “Thiết bị của bạn”, gỡ thiết bị lạ.', title: 'Quản lý thiết bị', rows: ['iPhone · Thiết bị này', 'Android · 2 tuần', 'Gỡ thiết bị'], tap: 2, done: 'Đã bật 2 bước' } ] }
          ] } },

        { type: 'part', t: 'Phần 4. Khi nghi ngờ hoặc đã bị lừa đảo' },
        { type: 'widget', name: 'url', title: 'Thực hành: kiểm tra tên miền trang dịch vụ công', intro: 'Đừng nhìn giao diện trước, hãy nhìn chính xác tên miền. Khi làm thật: vào tinnhiemmang.vn để tra cứu tên miền.' },
        { type: 'widget', name: 'order', title: 'Bài tập: quy trình báo cáo sau khi bị lừa đảo', intro: 'Sắp xếp 5 bước người dân, hộ kinh doanh nên làm.', opts: { done: 'Đúng! Giữ bình tĩnh, báo sớm, lưu đủ chứng cứ.', items: [
          { i: 'camera', t: 'Thu thập bằng chứng', d: 'Ảnh chụp màn hình, đường link, số điện thoại, mã giao dịch, tài khoản nhận tiền.' },
          { i: 'building', t: 'Liên hệ ngân hàng', d: 'Thông báo giao dịch nghi ngờ, đề nghị hỗ trợ phong tỏa nếu còn kịp.' },
          { i: 'shield', t: 'Trình báo cơ quan chức năng', d: 'Công an địa phương hoặc đơn vị chuyên trách.' },
          { i: 'megaphone', t: 'Thông báo người thân, khách hàng', d: 'Cảnh báo sớm để tránh lan rộng thiệt hại.' },
          { i: 'lock', t: 'Rà soát lại bảo mật', d: 'Đổi mật khẩu, kiểm tra thiết bị, cập nhật quy trình phòng ngừa.' } ] } },
        { type: 'widget', name: 'choices', title: 'Bài tập: xử lý tình huống', opts: { items: [
          { q: 'Người dân nhận cuộc gọi tự xưng công an, nói căn cước liên quan vụ án, yêu cầu cài ứng dụng để “xác minh”. Khuyên thế nào?', opts: ['Làm theo vì là công an.', 'Tắt máy, không cài ứng dụng; nếu lo lắng thì đến trực tiếp Công an xã để hỏi.', 'Cài ứng dụng nhưng không nhập mật khẩu.'], a: 1, why: 'Cơ quan công an không yêu cầu người dân cài ứng dụng, chuyển tiền qua điện thoại.' },
          { q: 'Hộ kinh doanh nhận ảnh “chuyển khoản thành công” từ khách lạ và được giục giao hàng ngay.', opts: ['Giao ngay vì đã có ảnh.', 'Kiểm tra biến động số dư trong ứng dụng ngân hàng, chỉ giao khi tiền đã vào tài khoản.', 'Hỏi khách gửi thêm ảnh khác.'], a: 1, why: 'Ảnh có thể chỉnh sửa hoặc chỉ là “lập lệnh”. Chỉ tin tài khoản nhận tiền thật.' },
          { q: 'Người dân đã lỡ nhập mã OTP ngân hàng vào trang web lạ. Việc đầu tiên?', opts: ['Chờ xem có mất tiền không.', 'Gọi ngay tổng đài ngân hàng để khóa tài khoản, sau đó trình báo công an và lưu bằng chứng.', 'Xóa tin nhắn cho đỡ lo.'], a: 1, why: 'Báo ngân hàng càng sớm càng tăng khả năng ngăn chặn giao dịch.' } ] } },
        { type: 'widget', name: 'contacts', title: 'Danh bạ khẩn' }
      ],
      takeaways: ['Không bấm link lạ, không cung cấp OTP, mật khẩu cho bất kỳ ai.', 'Ảnh chuyển khoản chưa chắc là đã nhận tiền: kiểm tra số dư thật.', 'Thấy chưa chắc đã tin, nghe chưa chắc là thật: gọi lại số đã lưu.', 'Bật xác thực hai lớp cho Zalo, Facebook, TikTok.', 'Bị lừa: thu thập bằng chứng, báo ngân hàng, trình báo công an.'],
      reflect: 'Đồng chí sẽ nhắc người dân trong ấp mình điều gì đầu tiên về lừa đảo qua tin nhắn?' },

    /* ================= CHUYÊN ĐỀ 5 ================= */
    { n: 5, session: 'Buổi chiều', time: tm('chuyen-de/5'), format: 'Chia nhóm theo ấp, đóng vai',
      title: 'Thực hành xử lý tình huống thực tế tại cơ sở',
      lead: 'Học viên chia nhóm theo ấp, đóng vai cán bộ và người dân để xử lý các tình huống thường gặp: người không có điện thoại thông minh, người cao tuổi, người chưa quen thao tác, hồ sơ bị từ chối, người dân gặp lừa đảo.',
      goals: [5, 6, 9, 10],
      hook: { title: 'Cách thực hành', text: 'Mỗi nhóm chọn 1–2 tình huống. Một người đóng vai người dân, một người đóng vai cán bộ, các thành viên còn lại quan sát và góp ý. Sau đó dùng mô phỏng bên dưới để đối chiếu cách xử lý.' },
      blocks: [
        { type: 'part', t: 'Phần 1. Nguyên tắc hỗ trợ người dân' },
        { type: 'points', items: [
          { i: 'heart', t: 'Kiên nhẫn, nói chậm, từng bước', d: 'Mỗi lần một thao tác; hỏi lại để chắc người dân hiểu.' },
          { i: 'phone', t: 'Người dân tự thao tác', d: 'Cán bộ chỉ vị trí nút bấm, cầm máy càng ít càng tốt.' },
          { i: 'lock', t: 'Không giữ thông tin của người dân', d: 'Không giữ, không ghi, không chụp mật khẩu, OTP, passcode, giấy tờ.' },
          { i: 'pen', t: 'Ghi giấy các bước', d: 'Viết tóm tắt các bước để người dân tự làm lần sau.' },
          { i: 'building', t: 'Luôn có phương án thay thế', d: 'Người không dùng được điện thoại vẫn có thể nộp hồ sơ trực tiếp tại Bộ phận Một cửa.' },
          { i: 'users', t: 'Chuyển đúng nơi', d: 'Sai thông tin dân cư, định danh mức 2: Công an xã. Nghiệp vụ thủ tục: Bộ phận Một cửa, cán bộ chuyên môn.' } ] },

        { type: 'part', t: 'Phần 2. Đóng vai xử lý tình huống' },
        { type: 'widget', name: 'roleplay', title: 'Mô phỏng đóng vai: chọn tình huống, trả lời người dân', intro: 'Chọn một người dân. Với mỗi câu người dân nói, chọn cách trả lời của cán bộ. Trả lời đúng cả 3 lượt để nhận đủ 3 trái tim.', opts: { cases: [
          { ava: '👵', who: 'Bà Tư, 78 tuổi', tag: 'Không có điện thoại thông minh', ctx: 'Bà cần làm thủ tục nhưng chỉ có điện thoại “cục gạch”, nghe nói giờ cái gì cũng phải làm trên mạng.',
            lesson: 'Người không có điện thoại thông minh vẫn được giải quyết thủ tục trực tiếp tại Bộ phận Một cửa. Tài khoản định danh là của từng người; cán bộ không giữ mật khẩu cho người dân.',
            turns: [
              { say: '“Con ơi, bà không có điện thoại xịn, vậy bà có làm giấy tờ được không con?”', opts: [
                { t: '“Dạ được bà. Bà có thể nộp hồ sơ trực tiếp tại Bộ phận Một cửa, con hướng dẫn bà chuẩn bị giấy tờ.”', ok: true, why: 'Luôn có phương án nộp trực tiếp.' },
                { t: '“Giờ phải làm trên mạng hết bà ơi, bà về mua điện thoại rồi lên con làm cho.”', ok: false, why: 'Sai: không bắt buộc người dân phải có điện thoại thông minh.' },
                { t: '“Để con lấy tài khoản VNeID của con nộp giùm bà cho nhanh.”', ok: false, why: 'Sai: tài khoản định danh điện tử là của từng cá nhân, không dùng tài khoản của người khác.' } ] },
              { say: '“Con cháu bà nói làm cái định danh mức 2 cho bà, làm ở đâu con?”', opts: [
                { t: '“Dạ, bà mang thẻ căn cước đến Công an xã để được hỗ trợ đăng ký định danh mức 2.”', ok: true, why: 'Định danh điện tử mức 2 do cơ quan công an hỗ trợ.' },
                { t: '“Bà đưa con số căn cước, con nhập lên ChatGPT hỏi giùm.”', ok: false, why: 'Sai: không đưa số căn cước của người dân lên AI.' },
                { t: '“Cái đó bà tải ứng dụng nào cũng làm được.”', ok: false, why: 'Sai: chỉ dùng ứng dụng VNeID chính thức; mức 2 cần xác minh tại công an.' } ] },
              { say: '“Bà hay quên lắm, con giữ giùm bà cái mật khẩu nghen.”', opts: [
                { t: '“Dạ con giữ cho, bà yên tâm.”', ok: false, why: 'Sai: cán bộ không giữ thông tin cá nhân, mật khẩu của người dân.' },
                { t: '“Dạ con không giữ được bà. Bà nhờ con cháu tin cậy cất giữ giúp, hoặc nếu quên thì dùng chức năng lấy lại mật khẩu, con chỉ bà.”', ok: true, why: 'Đúng nguyên tắc, vẫn có cách hỗ trợ.' },
                { t: '“Bà dán mật khẩu sau lưng điện thoại cho dễ nhớ.”', ok: false, why: 'Sai: ai cầm máy cũng đọc được.' } ] }
            ] },
          { ava: '👨‍🌾', who: 'Chú Năm, 62 tuổi', tag: 'Chưa quen thao tác', ctx: 'Chú cầm điện thoại đưa cho cán bộ, muốn kích hoạt VNeID.',
            lesson: 'Cầm điện thoại càng ít càng tốt: cán bộ chỉ vị trí nút bấm. OTP, mật khẩu, passcode để người dân tự nhập, không đọc to.',
            turns: [
              { say: '“Con cầm làm giùm chú đi, chú không biết bấm đâu hết.”', opts: [
                { t: '“Dạ chú cầm máy, con chỉ chú bấm từng nút, chú làm được mà.”', ok: true, why: 'Người dân tự thao tác, lần sau tự làm được.' },
                { t: '“Dạ chú đưa con làm luôn cho nhanh.”', ok: false, why: 'Hạn chế cầm máy làm thay; người dân không học được và dễ phát sinh rủi ro.' },
                { t: '“Chú về nhờ con cháu làm đi.”', ok: false, why: 'Chưa hỗ trợ tận tình.' } ] },
              { say: '“Có tin nhắn 6 số nè, 4 – 8 – 2… chú đọc con nhập nghen.”', opts: [
                { t: '“Dạ chú đọc đi con nhập.”', ok: false, why: 'Sai: OTP người dân tự nhập, không đọc cho người khác.' },
                { t: '“Dạ chú đừng đọc ra, chú tự gõ 6 số đó vào ô này nghen.”', ok: true, why: 'Đúng: OTP là mã xác thực tạm thời, người dân tự nhập.' },
                { t: '“Chú chụp màn hình gửi Zalo cho con.”', ok: false, why: 'Sai: lộ mã xác thực.' } ] },
              { say: '“Mật khẩu với passcode khác gì vậy con? Chú đặt 123456 hết cho dễ.”', opts: [
                { t: '“Dạ mật khẩu để đăng nhập, phải 8–20 ký tự có chữ hoa, thường, số, ký tự đặc biệt; passcode là 6 số để mở ví giấy tờ. Chú đặt khó đoán, đừng dùng 123456.”', ok: true, why: 'Phân biệt đúng và nhắc đặt mã khó đoán.' },
                { t: '“Dạ giống nhau, chú đặt sao cũng được.”', ok: false, why: 'Sai: hai loại mã khác nhau.' },
                { t: '“Chú đặt ngày sinh cho dễ nhớ.”', ok: false, why: 'Sai: ngày sinh dễ đoán.' } ] }
            ] },
          { ava: '👩', who: 'Cô Hạnh, 45 tuổi', tag: 'Hồ sơ bị yêu cầu bổ sung', ctx: 'Cô nộp hồ sơ trực tuyến tuần trước, nay nhận thông báo hồ sơ cần bổ sung, cô rất bực.',
            lesson: 'Tra cứu bằng mã hồ sơ để xem lý do; bổ sung đúng thành phần, ảnh rõ nét; ghi lại mã hồ sơ để theo dõi.',
            turns: [
              { say: '“Sao hồ sơ của tôi bị trả lại vậy? Tôi nộp rồi mà!”', opts: [
                { t: '“Dạ cô đừng lo, cô cho con xem mã hồ sơ, mình tra cứu trạng thái để biết lý do cụ thể.”', ok: true, why: 'Bình tĩnh, tra cứu bằng mã hồ sơ.' },
                { t: '“Chắc hệ thống lỗi, cô nộp lại hồ sơ mới đi.”', ok: false, why: 'Chưa rõ lý do đã nộp lại dễ trùng hồ sơ, lặp lỗi.' },
                { t: '“Cái này không phải việc của con.”', ok: false, why: 'Thiếu tinh thần phục vụ.' } ] },
              { say: '“Ghi là ảnh giấy tờ không rõ. Tôi chụp bằng điện thoại mà.”', opts: [
                { t: '“Dạ mình chụp lại nơi đủ sáng, đặt giấy tờ trên mặt phẳng, rõ 4 góc, không lóa rồi tải lên bổ sung.”', ok: true, why: 'Hướng dẫn cụ thể cách chụp đạt yêu cầu.' },
                { t: '“Cô gửi ảnh qua Zalo con, con nộp giùm.”', ok: false, why: 'Không nhận giấy tờ cá nhân qua tin nhắn cá nhân.' },
                { t: '“Cô scan bằng máy lớn mới được.”', ok: false, why: 'Không cần thiết; ảnh chụp rõ nét là đủ.' } ] },
              { say: '“Bổ sung xong rồi, sao biết khi nào có kết quả?”', opts: [
                { t: '“Dạ cô lưu mã hồ sơ, vào Cổng Dịch vụ công tra cứu trạng thái, khi có kết quả sẽ xem được trong mục hồ sơ của mình.”', ok: true, why: 'Hướng dẫn tự theo dõi bằng mã hồ sơ.' },
                { t: '“Dạ chừng nào có con gọi.”', ok: false, why: 'Nên hướng dẫn người dân tự tra cứu.' },
                { t: '“Dạ chắc mai có.”', ok: false, why: 'Không hứa thời hạn không có căn cứ.' } ] }
            ] },
          { ava: '👴', who: 'Chú Bảy, 68 tuổi', tag: 'Nhận tin nhắn lạ', ctx: 'Chú nhận tin nhắn “BHYT sắp bị khóa”, có đường link, hỏi cán bộ có bấm vào không.',
            lesson: 'Không bấm link lạ; tự mở ứng dụng chính thức để kiểm tra; không cung cấp CCCD, OTP; báo khi nghi ngờ.',
            turns: [
              { say: '“Tin nhắn nói BHYT của chú sắp bị khóa, kêu bấm vô đây. Chú bấm nghen?”', opts: [
                { t: '“Dạ chú đừng bấm. Đây là dấu hiệu lừa đảo: tạo gấp gáp, link lạ. Mình mở VNeID chính thức để kiểm tra.”', ok: true, why: 'Nhận diện đúng, hướng về kênh chính thức.' },
                { t: '“Dạ chú bấm thử coi sao.”', ok: false, why: 'Sai: link lạ có thể đánh cắp thông tin, cài mã độc.' },
                { t: '“Dạ chú trả lời tin nhắn hỏi lại.”', ok: false, why: 'Không tương tác với số lạ.' } ] },
              { say: '“Chú lỡ bấm rồi, nó kêu nhập số căn cước với mã OTP.”', opts: [
                { t: '“Dạ chú dừng lại, không nhập gì hết, đóng trang đó lại.”', ok: true, why: 'Dừng ngay, không cung cấp thông tin.' },
                { t: '“Dạ nhập căn cước thôi, đừng nhập OTP.”', ok: false, why: 'Không cung cấp bất kỳ thông tin nào trên trang lạ.' },
                { t: '“Dạ nhập đi cho xong.”', ok: false, why: 'Sai nghiêm trọng.' } ] },
              { say: '“Rồi giờ chú làm gì nữa con?”', opts: [
                { t: '“Dạ chú chụp màn hình tin nhắn làm bằng chứng, báo Công an xã; nếu lỡ nhập thông tin ngân hàng thì gọi ngay ngân hàng để khóa tài khoản.”', ok: true, why: 'Lưu bằng chứng, báo cơ quan chức năng, báo ngân hàng kịp thời.' },
                { t: '“Dạ xóa tin nhắn là xong.”', ok: false, why: 'Mất bằng chứng; chưa báo cáo.' },
                { t: '“Dạ chuyển tiếp tin nhắn cho mọi người coi.”', ok: false, why: 'Không lan truyền đường link lừa đảo.' } ] }
            ] },
          { ava: '🧑‍💼', who: 'Anh Tám, hộ kinh doanh', tag: 'Bán hàng online', ctx: 'Anh bán đặc sản qua Zalo, khách lạ gửi ảnh chuyển khoản 3 triệu, giục giao hàng ngay.',
            lesson: 'Bán hàng an toàn = kiểm tra tài khoản nhận tiền thật. Bật xác thực hai lớp cho tài khoản bán hàng.',
            turns: [
              { say: '“Khách gửi ảnh chuyển khoản rồi nè, tôi giao hàng luôn được không?”', opts: [
                { t: '“Anh mở ứng dụng ngân hàng kiểm tra biến động số dư, tiền vào thật rồi mới giao.”', ok: true, why: 'Chỉ tin số dư thực tế.' },
                { t: '“Có ảnh rồi thì giao đi anh.”', ok: false, why: 'Ảnh có thể là “lập lệnh” hoặc bị chỉnh sửa.' },
                { t: '“Anh hỏi khách có chắc không.”', ok: false, why: 'Kẻ gian sẽ khẳng định “chắc chắn”.' } ] },
              { say: '“Ảnh ghi ‘Lập lệnh thành công’ là sao?”', opts: [
                { t: '“Dạ chỉ là đã lập lệnh, chưa chắc tiền đã chuyển, có thể bị hủy.”', ok: true, why: 'Phân biệt đúng.' },
                { t: '“Dạ là chuyển xong rồi.”', ok: false, why: 'Sai.' },
                { t: '“Dạ là ngân hàng bảo đảm.”', ok: false, why: 'Sai.' } ] },
              { say: '“Tôi sợ bị hack Zalo bán hàng, làm sao?”', opts: [
                { t: '“Anh bật xác thực 2 lớp: Cá nhân → Cài đặt → Tài khoản và bảo mật → Xác thực 2 lớp, và dùng mật khẩu mạnh.”', ok: true, why: 'Đúng các bước trong bài.' },
                { t: '“Anh đưa mật khẩu con giữ giùm.”', ok: false, why: 'Không bao giờ giao mật khẩu cho người khác.' },
                { t: '“Không sao đâu anh.”', ok: false, why: 'Chủ quan.' } ] }
            ] }
        ] } },

        { type: 'part', t: 'Phần 3. Góp ý và tổng kết nhóm' },
        { type: 'widget', name: 'reveal', title: 'Câu hỏi thảo luận sau đóng vai', opts: { cases: [
          { title: 'Quan sát vai cán bộ', text: 'Các thành viên quan sát và trả lời:', qs: [
            { q: 'Cán bộ có cầm máy làm thay người dân không?', a: 'Đánh giá đạt khi cán bộ chỉ vị trí nút bấm, để người dân tự thao tác.' },
            { q: 'Cán bộ có nghe, nhìn hay ghi lại OTP, mật khẩu, passcode của người dân không?', a: 'Đạt khi người dân tự nhập, cán bộ quay mặt hoặc nhắc người dân che màn hình.' },
            { q: 'Cán bộ có đưa ra phương án thay thế khi người dân không làm được trực tuyến không?', a: 'Ví dụ: nộp trực tiếp tại Bộ phận Một cửa; liên hệ Công an xã để định danh mức 2.' },
            { q: 'Người dân có tự làm lại được lần sau không?', a: 'Cán bộ nên ghi giấy tóm tắt các bước cho người dân.' } ] } ] } }
      ],
      takeaways: ['Người dân tự thao tác; cán bộ chỉ cách, cầm máy càng ít càng tốt.', 'Không giữ, không nghe, không ghi mật khẩu, OTP, passcode của người dân.', 'Luôn có phương án thay thế: nộp trực tiếp tại Bộ phận Một cửa.', 'Hồ sơ bị yêu cầu bổ sung: tra cứu bằng mã hồ sơ, bổ sung đúng lý do.', 'Gặp lừa đảo: dừng lại, lưu bằng chứng, báo ngân hàng và công an.'],
      reflect: 'Trong ấp của đồng chí, ai là người cần được hỗ trợ đầu tiên, và hỗ trợ việc gì?' }
  ];
})(window.ATTT);
