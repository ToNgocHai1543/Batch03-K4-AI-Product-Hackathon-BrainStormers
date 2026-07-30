# 🎙️ Build Lead Live Demo Script (2 Phút Live Demo)

> **Mục tiêu**: Trình bày ấn tượng prototype **AI Learning Bridge** cho Ban Giám Khảo & TA trong đúng 2 phút. Phân chia rõ 1 case chuẩn (Happy Path) và 1 case chỗ khó (Failure/Low-Confidence Path).

---

## ⏱️ Timeline 2 Phút Live Demo

### 0:00 – 0:30 | Đặt Vấn Đề & Giới Thiệu Lát Cắt Prototype
- *"Kính chào Ban Giám Khảo! Hôm nay nhóm BrainStormers xin demo tính năng **AI Learning Bridge** giúp giải quyết triệt để pain point bài học bị rời rạc qua từng 'Day'."*
- *"Hệ thống sử dụng mô hình **Prompt Chaining**: Call 1 sinh Recap có căn cứ ➔ Gate Check kiểm tra Citation ➔ Call 2 sinh Bridge Map & Checklist."*

---

### 0:30 – 1:15 | Case 1: Happy Path (Live Demo Chuẩn)
- **Hành động**: Giữ nút `✨ Happy Path` ở Toolbar, mở cặp **Day 01 ➔ Day 02**.
- **Lời thoại**:
  - *"Khi học viên bắt đầu Day 02, hệ thống tự động hiển thị 5 trọng tâm Day 01. Bấm vào bất kỳ badge nào như `[Slide 20]`, học viên có thể xem trực tiếp đoạn trích dẫn gốc."*
  - *"Đặc biệt, mục **Bridge Map** và **Sơ đồ Mermaid** chỉ rõ 3 điểm chạm: Giới hạn bẩm sinh Day 01 chính là căn cứ để Day 02 xác định khi nào AI KHÔNG phù hợp (PAIR NOT Better)!"*
  - *"Học viên có thể bấm **`Bỏ qua Recap`** bất kỳ lúc nào để vào lớp ngay theo nguyên tắc HAX G8."*

---

### 1:15 – 1:45 | Case 2: Handling Edge Cases (Chỗ Khó & HAX Rules)
- **Hành động 1**: Bấm nút `⚠️ Low-Confidence`.
  - *"Nếu dữ liệu transcript bị nhiễu audio (như đoạn T04-012), hệ thống lập tức hiển thị Banner Cảnh Báo Vàng và thông báo mức độ tin cậy để học viên chủ động đối chiếu Slide gốc."*
- **Hành động 2**: Bấm nút `❌ Failure / Fallback`.
  - *"Khi AI phát hiện 0% overlap citation giữa 2 bài học, theo nguyên tắc HAX G10 Graceful Failure, hệ thống kích hoạt đường lui an toàn: Hiển thị banner thông báo và ẩn phần recap để KHÔNG đưa ra liên kết sai (False Positive Prevention)!"*

---

### 1:45 – 2:00 | User Feedback & Kết Thúc
- **Hành động**: Bấm nút `👎` ➔ Hiện modal phản hồi ➔ Bấm `Gửi Phản Hồi`.
- **Lời thoại**:
  - *"Học viên có thể góp ý trực tiếp. Mọi phản hồi lập tức được ghi vết vào `codebase/outputs/feedback.json` phục vụ kiểm thử red-teaming."*
  - *"Cảm ơn Ban Giám Khảo! Prototype sẵn sàng nhận câu hỏi Q&A."*
