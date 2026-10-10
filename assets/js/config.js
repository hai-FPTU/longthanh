/* Cấu hình lớp tập huấn – chỉnh sửa tệp này để dùng lại cho địa phương, lớp học khác. */
window.ATTT = window.ATTT || {};
ATTT.config = {
  course: 'Kỹ năng số cơ bản và hỗ trợ người dân sử dụng dịch vụ công trực tuyến',
  shortCourse: 'Kỹ năng số và dịch vụ công trực tuyến',
  className: 'Lớp 2',
  version: 'Phiên bản 1, cập nhật 09/10/2026',
  organizer: 'Ủy ban nhân dân xã Long Thành, tỉnh Vĩnh Long',
  trainer: 'VNPT Vĩnh Long',
  date: 'Chủ nhật, ngày 11/10/2026',
  startTime: '07:30',
  venue: 'Hội trường Ủy ban nhân dân xã Long Thành',
  learners: 53,
  sessions: '02 buổi',
  // Lịch học. Giờ cụ thể có thể chỉnh lại cho khớp lịch thực tế. "route" trỏ tới trang tương ứng.
  schedule: [
    { session: 'sang', time: '07:30 – 07:45', title: 'Khai mạc, khảo sát đầu vào', route: 'khao-sat' },
    { session: 'sang', time: '07:45 – 09:15', title: 'Chuyên đề 1', route: 'chuyen-de/1' },
    { session: 'sang', time: '09:15 – 09:30', title: 'Giải lao', route: null },
    { session: 'sang', time: '09:30 – 11:15', title: 'Chuyên đề 2', route: 'chuyen-de/2' },
    { session: 'chieu', time: '13:30 – 14:30', title: 'Chuyên đề 3', route: 'chuyen-de/3' },
    { session: 'chieu', time: '14:30 – 15:30', title: 'Chuyên đề 4', route: 'chuyen-de/4' },
    { session: 'chieu', time: '15:30 – 15:45', title: 'Giải lao', route: null },
    { session: 'chieu', time: '15:45 – 16:45', title: 'Chuyên đề 5', route: 'chuyen-de/5' },
    { session: 'chieu', time: '16:45 – 17:15', title: 'Kiểm tra cuối khóa, tổng kết', route: 'kiem-tra' }
  ],
  // ĐƯỜNG DÂY HỖ TRỢ – lấy theo bài giảng; đề nghị kiểm tra lại trước khi phát cho học viên.
  hotlines: [
    { t: 'Tổng đài An toàn mạng quốc gia', v: '1800.1031', note: 'Miễn phí' },
    { t: 'Cổng cảnh báo an toàn thông tin quốc gia', v: 'canhbao.ncsc.gov.vn', note: 'Phản ánh trang web, tài khoản lừa đảo' },
    { t: 'Cảnh sát hình sự (C02) – tố giác tội phạm', v: '069.2345.860', note: '' },
    { t: 'An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao', v: '069.219.4053', note: '' }
  ],
  // Đầu mối trong xã – điền trước buổi học
  contacts: [
    { role: 'Bộ phận Một cửa UBND xã Long Thành', value: 'Số điện thoại: ……………………', note: 'Hướng dẫn thủ tục, hỗ trợ nộp hồ sơ trực tuyến.' },
    { role: 'Công an xã Long Thành', value: 'Số điện thoại: ……………………', note: 'Định danh điện tử mức 2, tố giác lừa đảo, giả mạo cơ quan nhà nước.' },
    { role: 'Cán bộ phụ trách chuyển đổi số của xã, Tổ công nghệ số cộng đồng', value: '……………………', note: 'Hỗ trợ cài đặt, sử dụng ứng dụng.' }
  ]
};
