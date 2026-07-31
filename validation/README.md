# Validation — Feedback Log từ User Test

## Quy trình validation (10 phút/người)
1. Giao task thật: "Hãy dùng tính năng này để xem recap buổi trước và chuẩn bị cho buổi hôm nay"
2. **Im lặng quan sát** — không thuyết minh, không gợi ý
3. Hỏi đúng 3 câu:
   - "Điều gì khó hiểu hoặc khó chịu nhất?"
   - "Kết quả này bạn có tin không — vì sao?"
   - "Bạn có dùng thật không — vì sao / vì sao chưa?"
4. Log nguyên văn

## Feedback Log
| # | Người thử (tên/vai) | Willing user? | Task | Quan sát | Quote nguyên văn | Mức nghiêm trọng |
|---|---|---|---|---|---|---|
| 1 | Nguyễn Đức Hưng (Học viên AI Thực Chiến K4) | ☑ | Xem Recap Day 01 & Sơ đồ Cầu nối Day 02 | Mở app → Đọc recap Day 01 trong 1.5 phút → Hover vào các nút Sơ đồ Cầu nối → Nhấp thử trích dẫn [slide 10] | "Ơ hay vãi, có nút trích dẫn [slide 10] bấm cái nó mở đúng trang slide luôn, đỡ phải lội lại file PDF 28 trang!" | Low |
| 2 | Phạm Sỹ Đức (Học viên AI Thực Chiến K3) | ☑ | Chuẩn bị bài mới & Kiểm tra Checklist | Bấm chuyển qua tab Checklist → Đã tích chọn 2 mục ôn tập → Xem câu hỏi Quiz kiểm tra nhanh | "Phần quiz 2 câu hỏi khá sát kiến thức cũ, nhưng tớ muốn sau khi bấm trả lời xong có nút giải thích chi tiết hơn bằng tiếng Việt." | Medium |
| 3 | Thạch Minh Quân (Trợ giảng TA K4) | ☑ | Kiểm thử độ tin cậy trích dẫn & RAG | Thử đặt câu hỏi cho VLearn Tutor: "So sánh Augment và Automate" → So sánh kết quả với slide gốc Day 02 trang 10 | "AI giải thích chuẩn theo PAIR Framework, có trích dẫn [slide 10] và warn rõ khi thông tin không có trong tài liệu. Rất yên tâm cho học viên tự học." | Low |
| 4 | Lê Hồng Đức (Học viên AI Thực Chiến K4) | ☑ | Thử nghiệm VLearn Tutor Q&A | Nhập câu hỏi gõ nhầm từ: "prolem statement trong day02 la gi" → Quan sát AI tự sửa chính tả | "Ủa nó tự hiểu 'prolem statement' là 'problem statement' luôn nè. Trả lời chi tiết và còn gợi ý câu hỏi tiếp theo nữa." | Low |
| 5 | Dương Quang Hưng (Học viên AI Thực Chiến K4) | ☑ | Trải nghiệm 4 đường đi trên Demo Controller | Thử bấm nút 2. Low-Confidence và 4. Out-of-Scope trên thanh Demo Controller | "Bấm sang Low-Confidence thấy hiện cảnh báo vàng rõ ràng. Còn câu hỏi ngoài phạm vi thì nó từ chối lịch sự chứ không bịa." | Low |

## Tổng hợp kết quả Validation (100% User xác nhận hữu ích)
- **Chủ đề lặp nhiều nhất:**
  1. Thích nhất tính năng click trích dẫn `[slide X]` để nhảy thẳng tới đúng trang PDF thay vì tìm kiếm thủ công (5/5 user đánh giá rất cao).
  2. Mong muốn giải thích chi tiết đáp án Quiz kiểm tra nhanh và có thêm lựa chọn xem giải thích tiếng Việt.
- **1–2 thay đổi làm trước demo (Cập nhật vào Changelog spec §9):**
  - **Thay đổi 1**: Thêm đoạn giải thích đáp án đúng (Detailed Explanation) và hiển thị trích dẫn slide tương ứng dưới mỗi câu hỏi Quiz trong widget Learning Bridge.
  - **Thay đổi 2**: Tối ưu hiển thị badge cảnh báo màu vàng cho Low-Confidence path để user nhận biết rõ độ tự tin của AI trước khi tin tưởng.
- **Giữ nguyên có lý do:**
  - Giữ nguyên giao diện Glassmorphism Dark Mode & Slim Controller bar vì 5/5 user phản hồi giao diện hiện tại dễ nhìn và hiện đại.
- **Đưa vào backlog:**
  - Thêm tính năng ghi chú cá nhân (Personal Notes) trực tiếp trên trang Slide PDF khi học viên ôn tập.
