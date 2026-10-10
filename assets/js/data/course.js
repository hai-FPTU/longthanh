/* Mục tiêu và căn cứ pháp lý của lớp tập huấn. */
(function (A) {
  A.data.objectives = [
    { group: 'Kiến thức', items: [
      'Hiểu vai trò, khả năng và giới hạn của trí tuệ nhân tạo; biết các rủi ro khi dùng AI (ảo giác, lộ dữ liệu).',
      'Phân biệt tài khoản định danh điện tử mức 1, mức 2; phân biệt mật khẩu và passcode; nắm quy trình 6 bước nộp hồ sơ trực tuyến.',
      'Nhận diện các thủ đoạn lừa đảo trực tuyến phổ biến tại địa bàn nông thôn: giả danh cơ quan chức năng, lừa qua điện thoại, mạng xã hội, giao dịch mua bán.'
    ]},
    { group: 'Kỹ năng', items: [
      'Sử dụng tốt hơn điện thoại thông minh và các thao tác số cơ bản; dùng AI cơ bản để tra cứu thông tin, soạn nội dung, hỗ trợ công việc.',
      'Hướng dẫn người dân cài đặt, sử dụng VNeID: đăng ký, kích hoạt, tích hợp và xuất trình giấy tờ, xử lý lỗi thường gặp.',
      'Hướng dẫn người dân nộp hồ sơ, thanh toán và tra cứu kết quả trên Cổng Dịch vụ công.',
      'Hướng dẫn cài đặt, sử dụng Sổ sức khỏe điện tử trên VNeID và ứng dụng Smart Vĩnh Long (đăng ký tài khoản, gửi phản ánh hiện trường).',
      'Bật xác thực hai lớp, đặt mật khẩu mạnh; xử lý đúng khi người dân bị lừa đảo.'
    ]},
    { group: 'Thái độ', items: [
      'Hỗ trợ người dân tận tình, đúng quy trình: để người dân tự thao tác, không giữ mật khẩu, mã OTP, passcode của người dân.',
      'Chủ động tuyên truyền, cảnh giác với lừa đảo; báo cáo kịp thời khi phát hiện dấu hiệu bất thường.'
    ]}
  ];

  /* Căn cứ pháp lý (rà soát đến tháng 9/2026). topics: số chuyên đề liên quan. */
  A.data.laws = [
    { kind: 'party', name: 'Nghị quyết số 57-NQ/TW của Bộ Chính trị', code: 'Ngày 22/12/2024', effect: 'Định hướng chiến lược',
      scope: 'Đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia; lấy người dân, doanh nghiệp làm trung tâm; bảo đảm an ninh mạng, an ninh dữ liệu.', topics: [1, 2] },
    { kind: 'law', name: 'Luật Căn cước', code: 'Luật số 26/2023/QH15', effect: 'Hiệu lực từ 01/7/2024',
      scope: 'Căn cước, căn cước điện tử; cơ sở dữ liệu quốc gia về dân cư; căn cước điện tử được tích hợp trong ứng dụng định danh quốc gia (VNeID).', topics: [2, 3] },
    { kind: 'decree', name: 'Nghị định quy định về định danh và xác thực điện tử', code: 'Nghị định số 69/2024/NĐ-CP', effect: 'Đang có hiệu lực',
      scope: 'Tài khoản định danh điện tử mức độ 1, mức độ 2; ứng dụng định danh quốc gia VNeID; trách nhiệm bảo vệ tài khoản của chủ thể.', topics: [2, 3] },
    { kind: 'law', name: 'Luật Giao dịch điện tử', code: 'Luật số 20/2023/QH15', effect: 'Hiệu lực từ 01/7/2024',
      scope: 'Giá trị pháp lý của thông điệp dữ liệu, chứng từ điện tử, chữ ký điện tử trong giao dịch, thủ tục hành chính trên môi trường điện tử.', topics: [2] },
    { kind: 'law', name: 'Luật Bảo vệ dữ liệu cá nhân', code: 'Luật số 91/2025/QH15', effect: 'Hiệu lực từ 01/01/2026',
      scope: 'Nguyên tắc xử lý dữ liệu cá nhân; trách nhiệm khi thu thập, sử dụng, chia sẻ dữ liệu cá nhân của người dân.', topics: [1, 2, 4] },
    { kind: 'law', name: 'Luật An ninh mạng', code: 'Luật số 116/2025/QH15', effect: 'Hiệu lực từ 01/7/2026',
      scope: 'Nghiêm cấm lừa đảo, chiếm đoạt tài sản trên không gian mạng; nghiêm cấm dùng trí tuệ nhân tạo, công nghệ mới giả mạo trái pháp luật hình ảnh, giọng nói của người khác.', topics: [4] },
    { kind: 'law', name: 'Luật Trí tuệ nhân tạo', code: 'Luật số 134/2025/QH15', effect: 'Hiệu lực từ 01/3/2026',
      scope: 'Quản lý hệ thống AI theo mức độ rủi ro; AI là công cụ hỗ trợ, không thay thế trách nhiệm của con người.', topics: [1] }
  ];
})(window.ATTT);
