# Slide Presentation — VLearn AI Learning Bridge Agent (Nhóm BrainStormers)

> **Thời lượng presentation**: 5 phút  
> **Thời lượng Q&A**: 5 phút  
> **Nguyên tắc**: Mỗi slide có ≥1 con số / quote minh chứng có nguồn rõ ràng.

---

## 🖼️ Slide 1: User & Job — Nỗi đau & Bằng chứng thực tế
- **Người trình bày**: **Nguyễn Đức Anh** (Người 1 — Evidence Lead) — *45 giây*
- **Đối tượng**: Học viên khóa AI Thực Chiến tại VinUniversity (~1.000 học viên).
- **Core JTBD**: *"Khi bắt đầu buổi học mới, học viên muốn nhanh chóng nắm lại kiến thức buổi trước và hiểu nó liên quan thế nào đến nội dung hôm nay, để tiếp thu bài mới hiệu quả hơn."*
- **Minh chứng dữ liệu (Evidence)**:
  - 📊 **Khảo sát n = 20 học viên**: 65% (13/20 học viên) xác nhận họ mất từ 10–20 phút để mở lại slide/video cũ chỉ để nhớ lại bài trước dạy gì.
  - 💬 **Quote nguyên văn**: *"Lần nào vào bài mới cũng thấy ngợp vì quên mất bài cũ đã học những gì, mà lội lại PDF 20-30 trang thì lười quá!"* — Học viên K4.

---

## 🖼️ Slide 2: Vì sao chọn tính năng này — Bảng Impact Chọn / Loại
- **Người trình bày**: **Hải Yến** (Người 2 — Spec & Design Lead) — *45 giây*
- **So sánh 3 bài toán ứng viên**:

| Ứng viên Bài toán | Quy mô & Tần suất | Thiệt hại | Khả thi | Quyết định |
|---|---|---|---|---|
| **1. Kiến thức bài giảng rời rạc, thiếu liên kết** | ~1.000 HV • Mỗi buổi học | Mất 15' tìm lại + gãy mạch tư duy | Cao | **CHỌN (Track A)** |
| **2. Chatbot AI trả lời không cite nguồn** | ~369 user • Khi hỏi bài | Mất niềm tin vào AI | Cao | LOẠI (Có RAG giải quyết) |
| **3. Lặp câu hỏi tốn thời gian TA** | ~50 TA • Hàng ngày | Tốn 30'/ngày | Trung bình | LOẠI (Ưu tiên HV trước) |

- **Lát cắt 1 câu**: Một học viên bắt đầu Day 02 trên VLearn → AI tự động hiển thị Recap Day 01 + Bridge Map nối tri thức kèm trích dẫn `[slide X]` chỉ trong ≤3 phút.

---

## 🖼️ Slide 3: Giải pháp & Live Demo (Working Prototype)
- **Người trình bày**: **Nguyễn Hải Anh** (Người 3 — Build Lead) & **Nông Ngọc Dương** (Người 4 — Eval Lead) — *90 giây*
- **Kiến trúc & Tích hợp**:
  - Web App React + Vite + Vanilla CSS Dark Mode & Glassmorphism.
  - Gọi Gemini API thật (`gemini-1.5-flash`) qua REST + Fallback Simulator mượt mà.
  - Logger lưu lịch sử vết gọi AI cho Rubric R5.
- **Kịch bản Live Demo**:
  1. *Happy Path*: Mở VLearn → AI sinh Recap & Bridge nối Day 01 ➔ Day 02 có click trích dẫn `[slide 10]` tự động cuộn PDF.
  2. *Handling Chỗ khó / Guardrail*: Bấm chuyển sang đường đi Low-Confidence & Out-of-Scope → AI từ chối thông minh, không bịa thông tin (Áp dụng HAX G10 & G2).

---

## 🖼️ Slide 4: Kết quả Đánh giá — Quality Bar & Đo nghiệm
- **Người trình bày**: **Nông Ngọc Dương** (Người 4 — Eval & Prompt Lead) — *45 giây*
- **Bộ thử Golden Set**: **22 test cases** chuẩn hóa (10 case thường, 8 case khó/4 lớp chỗ khó, 4 case hiếm).
- **So sánh Quality Bar vs Kết quả thực tế**:

| Chỉ số | Target Quality Bar | Kết quả Round 1 | Kết quả Round 2 (Sau lặp Prompt) | Trạng thái |
|---|---|---|---|---|
| **Pass rate tổng thể** | ≥ 80% | 81.8% (18/22) | **100% (22/22)** | **VƯỢT TARGET** |
| **Citation tồn tại & chính xác** | ≥ 80% | 73.3% | **100%** | **VƯỢT TARGET** |
| **Bridge không trace được** | **0%** | 0% | **0%** | **ĐẠT CHUẨN** |

- **Bài học Prompt Engineering**: Ép JSON Schema nghiêm ngặt + Kỹ thuật Prompt 4 Lớp giúp triệt tiêu 100% lỗi Hallucination nguồn.

---

## 🖼️ Slide 5: Người dùng thật nói gì — Validation & Feedback
- **Người trình bày**: **Tô Ngọc Hải** (Người 5 — Validation & Demo Lead) — *45 giây*
- **Vòng User Testing (n = 5 học viên & TA thật)**:
  - 💬 *Quote 1*: *"Có nút trích dẫn [slide 10] bấm cái nó mở đúng trang slide luôn, đỡ phải lội lại file PDF 28 trang!"* — Nguyễn Đức Hưng (HV K4).
  - 💬 *Quote 2*: *"AI giải thích chuẩn theo PAIR Framework, có cảnh báo rõ khi không có trong tài liệu. Rất yên tâm!"* — Thạch Minh Quân (TA K4).
- **Changelog từ Feedback (spec §9)**:
  - ✅ **Đã làm**: Bổ sung nút nhấp citation cuộn PDF + chi tiết đáp án kèm trích dẫn slide trong Quiz.
  - ✅ **100% User xác nhận**: AI Learning Bridge giúp họ nắm bắt bài mới nhanh gấp 3 lần.

---

## 🖼️ Slide 6: Bài học kinh nghiệm & Kế hoạch 1 tuần tới
- **Người trình bày**: **Hải Yến** (Người 2 — Spec & Design Lead) — *30 giây*
- **Bài học kinh nghiệm nhóm**:
  - Không over-engineering chọn Multi-Agent khi Workflow Chaining + Prompt 4 Lớp đã giải quyết 100% bài toán.
  - Vibe-coding hiệu quả nhờ phân công tài liệu rõ ràng và giữ kỷ luật Checkpoint.
- **Nếu có thêm 1 tuần**:
  1. Tích hợp RAG động với toàn bộ 10+ slide trong chương trình học.
  2. Bổ sung tính năng ghi chú bài giảng (Personal Notes) trực tiếp trên trình đọc Slide.
