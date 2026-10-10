/* Thư viện câu lệnh mẫu của Lớp 2 (theo bài giảng). */
(function (A) {
  A.data.library = [
    { cd: 1, t: 'Viết 3 nội dung bán hàng từ ảnh sản phẩm', i: 'camera',
      text: 'Bạn là người hỗ trợ bán hàng cho hộ kinh doanh ở xã Long Thành. Từ ảnh sản phẩm tôi gửi và thông tin sau: [tên sản phẩm, thành phần, khối lượng, giá, nơi bán], hãy viết: (1) bài đăng Facebook/Zalo dưới 80 từ; (2) mô tả sản phẩm dạng gạch đầu dòng; (3) nội dung khuyến mãi (chỉ khi tôi có chương trình). Giọng văn gần gũi, có icon. Chỉ dùng thông tin tôi cung cấp; không tự thêm khuyến mãi, cam kết, giải thưởng; chỗ thiếu ghi [người bán bổ sung].' },
    { cd: 1, t: 'Thông báo Zalo khám sàng lọc tăng huyết áp', i: 'heart',
      text: 'Bạn là cán bộ truyền thông Trạm Y tế xã. Hãy viết thông báo Zalo dưới 150 từ, gửi người dân từ 40 tuổi về lịch khám sàng lọc tăng huyết áp. Thời gian vào lúc 07h30 ngày 26/09/2026; địa điểm tại Trạm Y tế xã; mang BHYT nếu có; giọng văn thân thiện; có icon; chia 3–5 ý; không thêm số điện thoại, không tự bịa quyền lợi.' },
    { cd: 1, t: 'Tra cứu và tóm tắt văn bản pháp luật', i: 'scale',
      text: 'Đóng vai chuyên viên pháp chế, hãy tra cứu và tóm tắt [TÊN THỦ TỤC/VẤN ĐỀ PHÁP LÝ] theo pháp luật Việt Nam hiện hành tại [THỜI ĐIỂM TRA CỨU]. Yêu cầu: Chỉ sử dụng nguồn pháp luật chính thức, đáng tin cậy; Kiểm tra hiệu lực văn bản trước khi kết luận; Nêu rõ căn cứ pháp lý; Trình bày kết quả dạng bảng với các mục chính; Không tự suy diễn hoặc bổ sung thông tin không có căn cứ; Nếu chưa đủ căn cứ, ghi: “Cần tra cứu thêm văn bản hướng dẫn.” Cuối cùng, kiểm tra chéo thông tin với các quy định pháp luật và hướng dẫn hiện hành của cơ quan có thẩm quyền, đồng thời nêu rõ những nội dung còn cần xác minh.' },
    { cd: 1, t: 'Áp phích tuyên truyền Luật An ninh mạng', i: 'shield',
      text: 'Bạn là cán bộ truyền thông pháp luật. Hãy tạo một áp phích tuyên truyền về Luật An ninh mạng dành cho người dân về tự bảo vệ khi sử dụng internet và mạng xã hội. Yêu cầu: Ngôn ngữ đơn giản, dễ hiểu, phù hợp với cộng đồng. Áp phích sinh động trực quan, có icon minh họa. Có tiêu đề nổi bật và 5 ý chính ngắn gọn. Màu sắc rõ ràng, dễ đọc trên điện thoại. Ưu tiên bố cục dọc để dễ chia sẻ trên Zalo/Facebook. Cuối áp phích có thông điệp. Phải tìm thông tin từ nguồn chính thống.' },
    { cd: 1, t: 'Soạn mẫu Tờ khai cho người dân (không nhập thông tin cá nhân thật)', i: 'doc',
      text: 'Bạn là cán bộ hỗ trợ người dân tại Bộ phận Một cửa xã Long Thành. Soạn dự thảo “Tờ khai xin xác nhận tình trạng hôn nhân” cho [họ tên, năm sinh, nơi cư trú, tình trạng hôn nhân] để làm thủ tục [mục đích]. Chuẩn thể thức văn bản hành chính; những chỗ cần thông tin cá nhân (CCCD, ngày cấp) ghi chú [Người dân điền]; không tự thêm thông tin. Xuất file Word.' },
    { cd: 1, t: 'Viết lại cho người dân dễ hiểu', i: 'wand',
      text: 'Hãy viết lại đoạn hướng dẫn sau cho người dân lớn tuổi dễ hiểu: [dán đoạn văn]. Yêu cầu: câu ngắn, từ ngữ thông dụng, chia bước 1–2–3; giữ nguyên nội dung, điều kiện, thời hạn; không thêm mức phí, số điện thoại, thời hạn mới.' },
    { cd: 2, t: 'Soạn tờ hướng dẫn nộp hồ sơ trực tuyến cho người dân', i: 'globe',
      text: 'Bạn là cán bộ Bộ phận Một cửa xã Long Thành. Hãy soạn tờ hướng dẫn 1 trang cho người dân về cách nộp hồ sơ trên Cổng Dịch vụ công (dichvucong.gov.vn) theo 6 bước: đăng nhập bằng VNeID, tra cứu thủ tục, nhập thông tin, đính kèm hồ sơ, thanh toán (nếu có), tra cứu kết quả bằng mã hồ sơ. Mỗi bước 1–2 câu, chữ to, dễ hiểu; có lưu ý: tự nhập OTP, không đưa mật khẩu cho người khác, ghi lại mã hồ sơ. Không thêm số điện thoại, đường link khác.' },
    { cd: 3, t: 'Soạn hướng dẫn tích hợp thẻ BHYT trên VNeID', i: 'heart',
      text: 'Hãy viết tin nhắn Zalo dưới 120 từ hướng dẫn người dân tích hợp thẻ BHYT trên VNeID theo các bước: đăng nhập VNeID → Ví giấy tờ → Tích hợp giấy tờ → Tạo mới yêu cầu → chọn Thẻ bảo hiểm y tế → nhập đơn vị cấp thẻ, số thẻ → tích xác nhận → Gửi yêu cầu. Giọng thân thiện, có icon; nhắc người dân tự nhập mật khẩu, passcode; không thêm thông tin khác.' },
    { cd: 4, t: 'Soạn tin cảnh báo lừa đảo cho nhóm Zalo ấp', i: 'alert',
      text: 'Bạn là cán bộ xã. Hãy viết tin cảnh báo dưới 120 từ gửi nhóm Zalo của ấp về thủ đoạn nhắn tin giả mạo “BHYT/VNeID sắp bị khóa, bấm link xác minh”. Nêu 3 dấu hiệu nhận biết và 3 việc cần làm (không bấm link, không cung cấp CCCD/OTP, báo Công an xã khi nghi ngờ). Ngôn ngữ dễ hiểu cho người lớn tuổi, có icon; không thêm số điện thoại, đường link.' }
  ];
})(window.ATTT);
