# AI SPEC — AI Learning Bridge · Nhóm BrainStormers · Zone [X]
Hướng: [x] A — VLearn  [ ] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tính năng mới

## §1. User & Job
## §1. User & Job

- **Job executor + workflow:** Học viên khóa AI Thực Chiến, chủ yếu thuộc K3 và K4, bắt đầu một buổi học mới trên VLearn.
  - **Workflow:** Kết thúc buổi N → Bắt đầu buổi N+1 → Cố nhớ lại nội dung buổi trước → Mở lại slide, ghi chú, video hoặc hỏi bạn bè/trợ giảng → Tiếp tục học sau khi lấy lại được ngữ cảnh, hoặc học trong trạng thái chưa hiểu rõ mối liên hệ giữa các buổi.

- **Core JTBD** *(không tên sản phẩm/AI trong câu):* Khi bắt đầu một buổi học mới, học viên muốn nhanh chóng nhớ lại kiến thức quan trọng của buổi trước và hiểu nội dung đó liên quan như thế nào đến bài học hôm nay, để tiếp thu bài mới hiệu quả mà không phải mất nhiều thời gian tìm lại tài liệu.

- **Problem statement** *(không dùng chữ AI):* Khi bắt đầu buổi học mới, nhiều học viên không nhớ rõ nội dung buổi trước hoặc không nhận ra mối liên hệ giữa các buổi học. Họ phải mở lại slide, ghi chú, video hoặc hỏi người khác để lấy lại ngữ cảnh, làm gián đoạn mạch tư duy, tốn thời gian và giảm hiệu quả tiếp thu kiến thức mới.

- **Evidence** *(chuẩn B — khảo sát người dùng; log đầy đủ tại `evidence/survey_log.md`):*
  - Khảo sát **20 học viên ngoài nhóm**, gồm **14 học viên K4, 5 học viên K3 và 1 học viên khóa AI khác**.
  - **17/20 học viên (85%)** không nhớ rõ toàn bộ nội dung buổi trước:
    - 9 người chỉ nhớ một phần.
    - 6 người phải xem lại mới nhớ.
    - 2 người gần như quên hoàn toàn.
  - **10/20 học viên (50%)** mất từ **10 phút trở lên** để lấy lại mạch kiến thức:
    - 4 người mất 10–20 phút.
    - 6 người mất trên 20 phút.
  - **18/20 học viên (90%)** xác nhận có ít nhất một khó khăn cụ thể khi chuyển sang buổi học mới; chỉ 2 người chọn “Không gặp khó khăn”.
  - Những khó khăn xuất hiện nhiều nhất:
    - **6/20** không biết nội dung hôm nay liên quan gì đến buổi trước.
    - **6/20** không biết nên ôn phần nào.
    - **5/20** không nhớ buổi trước đã học gì.
  - **14/20 học viên (70%)** gặp tình trạng này từ khoảng một nửa số buổi trở lên:
    - 9 người gặp gần như mọi buổi.
    - 5 người gặp khoảng một nửa số buổi.
  - **14/20 học viên (70%)** đánh giá phần tóm tắt và kết nối kiến thức giữa các buổi là “Hữu ích” hoặc “Rất hữu ích”.
  - **19/20 học viên (95%)** cho biết chắc chắn hoặc có thể sử dụng nếu tính năng được tích hợp vào VLearn.
  - **Mining chatlog:** _TODO — bổ sung số hội thoại liên quan đến ôn lại buổi cũ, phương pháp mining và phân tích `day_code` cross-day._

### Ví dụ nguyên văn từ khảo sát

> “Tôi phải lướt lại hết slide để xem buổi trước học những kiến thức nào.”

> “Việc khó khăn nhất là khi chưa kịp nhớ ra buổi trc học gì thì giảng viên đã giảng dạy bài học mới, vì vậy mình phải tự đọc cả 2 bài học cùng một lúc và sẽ gây khó khăn và quá tải nếu bài học quá khó.”

> “Tôi thường nhớ mang máng, không chắc chắn, phần giảng viên giảng không hiểu dù đã học, nhưng tìm lại rất khó khăn, mất khoảng 20 - 30ph vì không biết tìm ở đâu, do quên kiến thức buổi trước.”

> “Không nhớ bài - Mở slide và hỏi bạn bè - khoảng 20ph.”

> “Tôi quên mất Transformer hoạt động ntn và tôi phải nhờ bạn chỉ lại mất 15p.”

> “Thường quên kiến thức, phải mất khoảng 30p để reload lại.”

> “Khi bắt đầu một buổi học mới tôi luôn mơ hồ về việc hôm nay giảng viên đang giảng dạy phần nào và có nhiều buổi gần như tôi không biết giảng viên đang giảng về thứ gì liên quan tới chương trình.”

## §2. Impact & quyết định chọn
## §2. Impact & quyết định chọn

### Bảng impact các ứng viên

| Ứng viên | Quy mô ảnh hưởng | Tần suất xảy ra | Chi phí/tác động mỗi lần | Khả thi trong hackathon | Quyết định |
|---|---:|---|---|---|---|
| **Học viên khó nhớ và kết nối kiến thức giữa các buổi học** | Khoảng **1.000 học viên K3–K4**; khảo sát hiện tại `n = 20` cho thấy **18/20 (90%)** xác nhận có khó khăn cụ thể | Mỗi khi bắt đầu buổi học mới; **14/20 (70%)** gặp từ khoảng một nửa số buổi trở lên | **10/20 (50%)** mất từ 10 phút trở lên để lấy lại mạch kiến thức; phải mở lại slide, video, ghi chú hoặc hỏi người khác; làm gián đoạn tư duy | **Cao** — đã có transcript, slide và chatlog; phạm vi MVP có thể giới hạn ở recap và bridge giữa hai buổi liên tiếp | ✅ **CHỌN** |
| **AI Tutor trả lời nhưng không trích dẫn nguồn** | Khoảng **369 người dùng** trong tập chatlog được cung cấp | Mỗi lần người dùng đặt câu hỏi cần kiểm chứng kiến thức | Người học khó kiểm tra câu trả lời, giảm niềm tin và có nguy cơ tiếp nhận thông tin sai | **Cao** — có thể bổ sung citation từ transcript/slide | ❌ **LOẠI** |
| **Câu hỏi lặp lại làm mất thời gian của trợ giảng** | Ước tính khoảng **50 TA** | Có thể xảy ra hằng ngày, đặc biệt trước hoặc trong buổi học | Ước tính mất **15–30 phút/TA/ngày** để trả lời các câu hỏi lặp như “buổi trước học gì” hoặc “cần ôn phần nào” | **Trung bình** — cần dữ liệu hội thoại của TA và quy trình vận hành để xác minh đầy đủ | ❌ **LOẠI** |

### Ứng viên đã loại và lý do

- **AI Tutor trả lời nhưng không trích dẫn nguồn — LOẠI:** Ứng viên này có quy mô khoảng **369 người dùng** và khả thi về kỹ thuật, nhưng nhóm hiện chưa có số liệu trực tiếp cho biết bao nhiêu câu trả lời thiếu citation, bao nhiêu người mất niềm tin hoặc mức độ ảnh hưởng thực tế. Trong khi đó, pain về việc nhớ và kết nối kiến thức đã được xác nhận trực tiếp bởi **18/20 học viên (90%)**. Citation được giữ lại như một nguyên tắc an toàn và kiểm chứng cho giải pháp, nhưng không được chọn làm bài toán trung tâm.

- **Câu hỏi lặp lại làm mất thời gian của TA — LOẠI:** Nhóm TA có quy mô nhỏ hơn đáng kể so với khoảng **1.000 học viên**. Con số **15–30 phút/ngày** hiện mới là ước tính và chưa có khảo sát hoặc log riêng từ TA để xác minh. Đây được xem là tác động phụ có thể được cải thiện khi giải quyết pain của học viên, thay vì là đối tượng chính của MVP.

### Ứng viên được chọn và lý do

Nhóm chọn bài toán **học viên khó nhớ và kết nối kiến thức giữa các buổi học** vì đây là ứng viên có bằng chứng mạnh nhất về **quy mô, tần suất, chi phí và tính khả thi**:

1. Đối tượng ảnh hưởng chính là khoảng **1.000 học viên K3–K4**, lớn hơn đáng kể so với nhóm TA.
2. Khảo sát `n = 20` cho thấy **18/20 học viên (90%)** xác nhận có ít nhất một khó khăn cụ thể khi bắt đầu buổi học mới.
3. **17/20 học viên (85%)** không nhớ rõ toàn bộ nội dung buổi trước.
4. **14/20 học viên (70%)** gặp tình trạng này từ khoảng một nửa số buổi trở lên.
5. **10/20 học viên (50%)** mất từ **10 phút trở lên** để lấy lại mạch kiến thức.
6. Nhóm đã có sẵn **6 transcript, 2 bộ slide và 1.261 lượt chat thuộc 585 hội thoại**, đủ để xây dựng và kiểm thử một MVP recap + bridge trong thời gian hackathon.
7. **14/20 học viên (70%)** đánh giá giải pháp recap và kết nối kiến thức là hữu ích hoặc rất hữu ích; **19/20 (95%)** cho biết chắc chắn hoặc có thể sử dụng.

Vì vậy, đây là ứng viên tạo tác động trực tiếp lên nhiều người nhất, xảy ra thường xuyên, đã có bằng chứng người dùng xác nhận và có dữ liệu sẵn để triển khai trong phạm vi hackathon.

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
- Chiều chất lượng + định nghĩa kiểm chứng được: _xem eval/README.md_
- Golden set (≥20 case, file trong eval/): _TODO_
- Quality bar: "Đạt khi ≥ 80% recap có ít nhất 1 citation chính xác, VÀ 0% bridge chứa thông tin không trace được về tài liệu gốc, VÀ ≥ 70% học viên thử nghiệm xác nhận recap hữu ích."
- Kết quả các lượt chạy: _TODO — cập nhật đến trước CP6_

## §8. Phân công & kế hoạch
- Phân công có tên: _xem phan-cong.md_
- Willing users (≥3 tên): _TODO_
- Multi-prototype (nếu làm): _TODO_

## §9. Changelog
| Thời điểm | Đổi gì | Vì sao |
|---|---|---|
| _TODO_ | | |
