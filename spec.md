# AI SPEC — AI Learning Bridge · Nhóm BrainStormers · Zone [X]
Hướng: [x] A — VLearn  [ ] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tính năng mới

## §1. User & Job
- Job executor + workflow: Học viên khoá AI Thực Chiến (~1.000 người K3 & K4) bắt đầu buổi học mới trên VLearn.
  - Workflow: Kết thúc buổi N → Bắt đầu buổi N+1 → Cố nhớ lại buổi trước → Bối rối vì không thấy liên kết → Hỏi TA hoặc bỏ qua.
- Core JTBD (không tên sản phẩm/AI trong câu): Khi bắt đầu buổi học mới, học viên muốn nhanh chóng nắm lại kiến thức buổi trước và hiểu nó liên quan thế nào đến nội dung hôm nay, để tiếp thu bài mới hiệu quả hơn.
- Problem statement (KHÔNG chữ AI): Học viên không nhận ra mối liên hệ giữa nội dung các buổi học, dẫn đến kiến thức bị phân mảnh, khó hình thành tư duy hệ thống, và giảm động lực tiếp tục học.
- Evidence (chuẩn A và/hoặc B — log đầy đủ trong repo):
  - Số liệu mining / kết quả khảo sát (n = ?, % xác nhận): _TODO — mining chatlog + khảo sát ≥20 người_
  - ≥5 quote/ví dụ nguyên văn + nguồn: _TODO_

## §2. Impact & quyết định chọn
- Bảng impact ≥3 ứng viên:

| Ứng viên | Bao nhiêu người | Tần suất | Tốn gì mỗi lần | Khả thi | Chọn? |
|---|---|---|---|---|---|
| Bài giảng rời rạc, thiếu liên kết | ~1.000 HV | Mỗi buổi | 10–20 phút tìm lại + mất mạch kiến thức | Cao (data sẵn) | ✅ CHỌN |
| AI tutor trả lời không cite nguồn | ~369 user | Mỗi lần hỏi | Mất niềm tin vào câu trả lời | Cao | ❌ |
| Câu hỏi lặp tốn thời gian TA | ~50 TA | Hàng ngày | 15–30 phút/ngày | Trung bình | ❌ |

- Ứng viên ĐÃ LOẠI + vì sao: _TODO — điền lý do bằng số_
- Ứng viên CHỌN + vì sao (bằng số): _TODO_

## §3. Giải pháp tương tự đã nghiên cứu
- [NotebookLM]: _TODO_
- [Khanmigo]: _TODO_
- [ChatGPT study mode]: _TODO_

## §4. Thiết kế
- Lát cắt MỘT CÂU: Một học viên bắt đầu buổi Day 02 trên VLearn · AI tự động hiển thị recap Day 01 + bridge chỉ ra kiến thức Day 01 nào là nền tảng cho Day 02 kèm trích dẫn cụ thể · giúp học viên nắm được mạch kiến thức trong ≤3 phút thay vì tự tìm 15 phút.
- Non-goals (≥3):
  1. Không build lại toàn bộ UI của VLearn
  2. Không tạo hệ thống chấm điểm chính thức
  3. Không thay thế vai trò giảng viên
  4. Không xây chatbot Q&A tổng quát
- Mức prototype nhắm tới: [ ] Sketch [x] Mock [ ] Working — phần mock: UI hiển thị, knowledge map; phần thật: LLM call sinh recap/bridge
- Automation: [x] augment [ ] conditional [ ] automate — lý do: recap/bridge sai kiến thức → học viên ôn sai → chi phí lỗi trung bình–cao. AI sinh, kèm trích dẫn để user tự kiểm tra.
- §4b. Nguyên tắc đã áp dụng (≥4):

| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
|---|---|
| G2 — Làm rõ nó làm tốt đến đâu | Mỗi ý recap kèm [trang/đoạn] trích dẫn → user biết kiểm lại ở đâu |
| G10 — Thu hẹp phạm vi khi nghi ngờ | Transcript thiếu → hiển thị "Chưa đủ dữ liệu, xem lại slide gốc" |
| G8 — Gạt bỏ dễ dàng | Nút "Bỏ qua recap" luôn hiện, không chặn flow vào bài mới |
| G11 — Giải thích vì sao | Bridge map ghi "vì Day 01 slide 20 nói về giới hạn bẩm sinh → Day 02 dùng để phân tích khi nào AI không phù hợp" |
| G15 — Mời feedback chi tiết | Nút 👍👎 + "Sai chỗ nào?" sau mỗi recap |

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8)

| # | Tình huống cụ thể | Lớp | Hành vi mong muốn | Nguyên tắc |
|---|---|---|---|---|
| 1 | AI bịa liên kết giữa 2 buổi không liên quan | ① | Không đưa ra liên kết, hiển thị "Hai buổi này ít overlap" | G10 |
| 2 | AI trích dẫn sai trang slide | ① | Mọi citation phải match nội dung gốc | G2 |
| 3 | Transcript buổi bị thiếu/ngắn | ② | Báo rõ "Dữ liệu buổi này chưa đầy đủ" + link slide gốc | G10 |
| 4 | Học viên highlight đoạn mơ hồ, hỏi "liên quan gì buổi sau?" | ② | Trả lời "Chưa đủ thông tin để xác định" thay vì đoán | G10 |
| 5 | Hỏi nội dung ngoài khóa học | ③ | "Mình chỉ hỗ trợ nội dung khóa AI Thực Chiến" | G10 |
| 6 | Yêu cầu AI viết bài tập hộ | ③ | Từ chối + gợi ý "Bạn có thể ôn lại recap rồi thử tự làm" | G8 |
| 7 | Nhầm "attention mechanism" (kỹ thuật) với "attention" (chú ý thông thường) | ④ | Dùng đúng thuật ngữ như trong transcript gốc | G2 |
| 8 | Recap gộp Chain-of-Thought với Prompt Engineering thành 1 khái niệm | ④ | Giữ tách biệt, cite đúng slide từng khái niệm | G11 |
| 9 | Học viên bỏ 2 buổi liên tiếp, quay lại buổi N+2 | Hiếm | Sinh recap cả 2 buổi bỏ lỡ + bridge tích lũy | G2 |

## §6. Bốn đường đi của trải nghiệm
- Happy path: Học viên vào buổi N+1 → thấy recap buổi N (5–7 ý, có cite) + bridge map (2–4 liên kết) + checklist → đọc 3 phút → bắt đầu bài mới
- Low-confidence (②): Transcript thiếu → hiển thị recap ngắn + warning "Dữ liệu chưa đầy đủ" + link xem slide gốc
- Failure/không căn cứ (①): AI không tìm được liên kết → "Hai buổi này ít overlap — bạn có thể bắt đầu buổi mới ngay"
- Correction (user sửa): 👎 → "Sai chỗ nào?" → log lại → cải thiện prompt
- Khi bị đòi ngoài phạm vi (③): "Mình chỉ hỗ trợ nội dung khóa AI Thực Chiến — câu này ngoài phạm vi mình nhé!"
- Case đặc thù domain (④): Thuật ngữ AI dùng đúng như trong tài liệu gốc, không paraphrase sai nghĩa

## §7. Kiểm thử
- Chiều chất lượng và cách đo chi tiết: xem `eval/README.md`. Validator tự động kiểm schema, số lượng 5–7 recap/2–4 bridge, giới hạn 300 từ, citation tồn tại đúng phía và fallback. Hai reviewer độc lập kiểm citation thực sự hỗ trợ claim, logic bridge, nghĩa thuật ngữ domain và độ hữu ích.
- Golden set: `eval/golden_set.json` — đúng 22 case (10 thường, 8 khó với đúng 2 case cho mỗi lớp, 4 hiếm); 10 case thường truy được về chatlog bằng conversation ID ẩn danh. Nội dung đầy đủ được resolve từ `data/` khi chạy, không sao chép data pack vào artifact.
- Quality bar đã khóa lúc 23:48 ngày 30/07, giữ nguyên: "Đạt khi ≥ 80% recap có ít nhất 1 citation chính xác, VÀ 0% bridge chứa thông tin không trace được về tài liệu gốc, VÀ ≥ 70% học viên thử nghiệm xác nhận recap hữu ích."
- Kết quả: Round 1 pass tự động 81,8% (18/22), Round 2 pass 100% (22/22); recap có citation tồn tại tăng từ 73,3% lên 100%, bridge không trace được bằng 0. Xem `eval/results_round_1.md`, `eval/results_round_2.md` và JSON live trong `eval/results/`. Citation chính xác chờ đủ hai reviewer; chỉ số hữu ích lấy từ Validation Lead và vẫn là `pending validation` nếu chưa có feedback thật.

## §8. Phân công & kế hoạch
- Phân công có tên:
  - **Người 1 — Evidence Lead**: Nguyễn Đức Anh
  - **Người 2 — Spec & Design Lead**: Hải Yến
  - **Người 3 — Build Lead**: Nguyễn Hải Anh
  - **Người 4 — Eval & Prompt Lead**: Nông Ngọc Dương
  - **Người 5 — Validation & Demo Lead**: Tô Ngọc Hải
- Willing users (khai báo ≥3 tên cụ thể cho User Testing):
  1. **Nguyễn Đức Hưng** (Học viên khóa AI Thực Chiến K4) — Đã đồng ý tham gia User Testing 10 phút.
  2. **Phạm Sỹ Đức** (Học viên khóa AI Thực Chiến K3) — Đã đồng ý kiểm thử trải nghiệm recap & bridge.
  3. **Thạch Minh Quân** (Trợ giảng TA khóa AI Thực Chiến K4) — Đã đồng ý đánh giá tính hữu ích và độ tin cậy trích dẫn slide.
  4. **Lê Hồng Đức** (Học viên khóa AI Thực Chiến K4) — Dự phòng thử nghiệm giao diện.
  5. **Dương Quang Hưng** (Học viên khóa AI Thực Chiến K4) — Dự phòng thử nghiệm giao diện.
- Multi-prototype (nếu làm): Không (Tập trung hoàn thiện 1 Working Prototype cho VLearn Track A)

## §9. Changelog
| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| 31/07 12:00 | Khai báo danh sách 5 Willing Users cho vòng User Validation | Đáp ứng yêu cầu Checkpoint CP1 & Rubric R6 (4đ) |
| 31/07 12:05 | Thêm tính năng nhấp trích dẫn `[slide X]` tự động nhảy tới trang PDF tương ứng | Phản hồi từ Nguyễn Đức Hưng & Phạm Sỹ Đức: Giúp kiểm chứng nguồn tức thì mà không phải tự cuộn tìm thủ công |
| 31/07 12:10 | Bổ sung phần giải thích chi tiết đáp án kèm slide trích dẫn trong Quiz kiểm tra nhanh | Phản hồi từ Phạm Sỹ Đức: Học viên mong muốn hiểu rõ nguyên lý đằng sau đáp án đúng |
| 31/07 12:15 | Tối ưu hiển thị badge cảnh báo màu vàng & thông điệp "Dữ liệu mờ" cho Low-confidence path | Áp dụng nguyên tắc HAX G2 & G10: Giúp học viên nhận biết độ tự tin của AI trước khi tin tưởng |
| 31/07 12:20 | Tích hợp bộ tự sửa lỗi chính tả & chuẩn hóa thuật ngữ tiếng Việt cho VLearn Tutor Q&A | Phản hồi từ Lê Hồng Đức: Giúp AI xử lý mượt mà khi người dùng gõ sai từ (ví dụ "prolem statement" -> "problem statement") |
