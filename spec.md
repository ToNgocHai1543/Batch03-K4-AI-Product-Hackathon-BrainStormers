# AI SPEC — AI Learning Bridge · Nhóm BrainStormers · Zone [X]
Hướng: [x] A — VLearn  [ ] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tính năng mới

## §1. User & Job
- Job executor + workflow: Học viên khoá AI Thực Chiến (~1.000 người K3 & K4) bắt đầu buổi học mới trên VLearn.
  - Workflow: Kết thúc buổi N → Bắt đầu buổi N+1 → Cố nhớ lại buổi trước → Bối rối vì không thấy liên kết → Hỏi TA hoặc bỏ qua.
- Core JTBD (không tên sản phẩm/AI trong câu): Khi bắt đầu buổi học mới, học viên muốn nhanh chóng nắm lại kiến thức buổi trước và hiểu nó liên quan thế nào đến nội dung hôm nay, để tiếp thu bài mới hiệu quả hơn.
- Problem statement (KHÔNG chữ AI): Học viên không nhận ra mối liên hệ giữa nội dung các buổi học, dẫn đến kiến thức bị phân mảnh, khó hình thành tư duy hệ thống, và giảm động lực tiếp tục học.
- Evidence (chuẩn A và/hoặc B — log đầy đủ trong repo):
  - Khảo sát **n = 20 học viên K3–K4**: **17/20 (85%)** nêu ít nhất một vấn đề liên quan đến mất tính liên tục giữa các buổi — 6/20 (30%) không thấy buổi mới liên quan gì buổi trước; 6/20 (30%) không biết cần ôn phần nào; 5/20 (25%) gần như quên nội dung buổi trước. Ngoài ra, 1/20 (5%) khó tìm lại đúng tài liệu và 2/20 (10%) không gặp khó khăn.
  - **Tần suất gặp tình trạng (Câu 6):** 9/20 (45%) gần như mọi buổi, 5/20 (25%) khoảng một nửa số buổi, 4/20 (20%) thỉnh thoảng và 2/20 (10%) hiếm khi. Như vậy **14/20 (70%)** gặp pain ở ít nhất khoảng một nửa số buổi.
  - **Mức hữu ích của tóm tắt tự động (Câu 7):** 6/20 (30%) rất hữu ích, 8/20 (40%) hữu ích, 5/20 (25%) bình thường và 1/20 (5%) rất không hữu ích; gộp hai mức tích cực là **14/20 (70%)**.
  - **Sẵn sàng sử dụng nếu tích hợp vào VLearn (Câu 8):** 9/20 (45%) chắc chắn có, 10/20 (50%) có thể và 1/20 (5%) chưa chắc; gộp “chắc chắn có/có thể” là **19/20 (95%)**.
  - Ví dụ nguyên văn (mã phản hồi dùng để đối chiếu với survey log; tên/MSSV không đưa vào spec public):
    1. Response #4, K4: “Việc khó khăn nhất là khi chưa kịp nhớ ra buổi trc học gì thì giảng viên đã giảng dạy bài học mới, vì vậy mình phải tự đọc cả 2 bài học cùng một lúc và sẽ gây khó khăn và quá tải nếu bài học quá khó”.
    2. Response #5, K4: “Tôi thường nhớ mang máng, không chắc chắn... tìm lại rất khó khăn, mất khoảng 20-30ph vì không biết tìm ở đâu, do quên kiến thức buổi trước”.
    3. Response #8, K4: “Tôi quên mất Transformer hoạt động ntn và tôi phải nhờ bạn chỉ lại mất 15p”.
    4. Response #13, K3: “Thường quên kiến thức, phải mất khoảng 30p để reload lại”.
    5. Response #20: “khi bắt đầu một buổi học mới tôi luôn mơ hồ về việc hôm nay giảng viên đang giảng dạy phần nào và có nhiều buổi gần như tôi không biết giảng viên đang giảng về thứ gì liên quan tới chương trình”.
    6. Response #18: “Tôi xem lại slides trong khoảng 10p trước khi bắt đầu bài học”.

## §2. Impact & quyết định chọn
- Bảng impact ≥3 ứng viên:

| Ứng viên | Bao nhiêu người | Tần suất | Tốn gì mỗi lần | Khả thi | Chọn? |
|---|---|---|---|---|---|
| Mất liên tục giữa các buổi: không thấy liên hệ, không biết ôn gì hoặc quên bài trước | **17/20 (85%)** trong mẫu; phạm vi tiềm năng ~1.000 HV K3–K4 | **14/20 (70%)** gặp ở ít nhất khoảng một nửa số buổi | Các ví dụ định lượng ghi nhận **10–30 phút/lần**; thêm quá tải và mất mạch kiến thức | Cao — transcript/slide hai buổi có sẵn | ✅ CHỌN |
| Khó tìm lại đúng tài liệu/ghi chú | **1/20 (5%)** | Chưa có số đếm tần suất riêng | Một phản hồi mất **20–30 phút/lần** | Cao — có thể cải thiện bằng điều hướng/tìm kiếm | ❌ |
| Không gặp khó khăn khi chuyển buổi | **2/20 (10%)** | Không áp dụng | Không ghi nhận chi phí | Không phải pain cần giải quyết | ❌ |

- Ứng viên ĐÃ LOẠI:
  - “Khó tìm tài liệu” chỉ xuất hiện ở **1/20 (5%)**, thấp hơn nhiều so với cụm mất liên tục giữa các buổi; đây cũng có thể giải bằng tìm kiếm/điều hướng mà chưa cần lát cắt AI riêng.
  - Nhóm **2/20 (10%) không gặp khó khăn** không có pain hoặc chi phí cần xử lý.
- Ứng viên CHỌN: cụm “mất liên tục giữa các buổi” được chọn vì có **17/20 (85%)** người khảo sát xác nhận một trong ba biểu hiện liên quan, **14/20 (70%)** gặp pain ở ít nhất khoảng một nửa số buổi và các phản hồi định lượng cho thấy mất **10–30 phút/lần**. Hướng giải pháp cũng có tín hiệu chấp nhận ban đầu: **14/20 (70%)** đánh giá tóm tắt tự động hữu ích/rất hữu ích và **19/20 (95%)** chắc chắn/có thể sử dụng nếu tích hợp vào VLearn.

## §3. Giải pháp tương tự đã nghiên cứu
> Nghiên cứu nhanh từ tài liệu chính thức, rà soát ngày 31/07/2026. Nhóm học theo từng cặp buổi trên VLearn nên chỉ lấy các pattern phù hợp với lát cắt, không sao chép toàn bộ sản phẩm.

| Giải pháp | Flow giải job | Đáng học | Đáng né / giới hạn | AI Learning Bridge khác gì |
|---|---|---|---|---|
| [NotebookLM](https://support.google.com/notebooklm/answer/16164461) | Người dùng tải/chọn PDF, slide, website, video hoặc ghi chú → hỏi trong notebook → nhận câu trả lời dựa trên nguồn, có citation; có thể tạo study guide, mind map, flashcard/quiz | Grounding theo tập nguồn do người dùng chọn; citation nằm cạnh nội dung và mở được đúng ngữ cảnh để kiểm chứng | Người học phải chủ động tạo notebook, nạp/chọn nguồn và đặt câu hỏi; nếu nhiều nguồn hoặc câu hỏi mơ hồ, hệ thống có thể không tìm đúng phần liên quan. Không có flow mặc định nối buổi N với N+1 trên VLearn | Tự kích hoạt tại thời điểm học viên mở buổi N+1; nguồn đã được giới hạn vào tài liệu hai buổi; output cố định ở recap + 2–4 bridge + checklist, đọc trong ≤3 phút |
| [Khanmigo](https://support.khanacademy.org/hc/en-us/articles/13860282793869-What-are-the-Community-Guidelines-for-Khanmigo) | Học viên mở trợ lý trong ngữ cảnh bài học/bài tập → Khanmigo dùng câu hỏi, gợi ý và giải thích để dẫn dắt → học viên trả lời qua nhiều lượt và tự đi đến kết quả | Không đưa đáp án ngay; dùng câu hỏi kiểu Socratic và “productive struggle” để giữ vai trò chủ động của người học; trợ giúp nằm trong ngữ cảnh học tập | Hội thoại nhiều lượt không phù hợp khi học viên chỉ có vài phút để lấy lại mạch kiến thức; Khan Academy cũng khuyến nghị không coi Khanmigo là nguồn duy nhất và phải kiểm tra thêm nguồn | Không đóng vai tutor tổng quát và không kéo dài hội thoại; chỉ làm cầu nối ngắn giữa hai buổi, luôn kèm căn cứ từ transcript/slide và cho phép bỏ qua |
| [ChatGPT Study Mode](https://help.openai.com/en/articles/11780217-study-mode) | Người học bật Study Mode, nêu mục tiêu/trình độ và có thể tải tài liệu → hệ thống hỏi điều đã biết, hướng dẫn từng bước → đặt câu hỏi mở/quiz để kiểm tra mức hiểu | Chia nhỏ kiến thức, điều chỉnh độ sâu, hỏi kiểm tra hiểu và khuyến khích suy luận thay vì chỉ trả đáp án | Phụ thuộc vào việc người học mô tả mục tiêu và cung cấp đúng context; tài liệu chính thức lưu ý hệ thống vẫn có thể sai hoặc đôi lúc trả lời thẳng. Đây là trải nghiệm chat rộng, không bảo đảm tự nối đúng hai buổi của một khóa | VLearn biết sẵn học viên đang mở buổi nào và buổi trước là gì; hệ thống chủ động tạo một artifact có cấu trúc, có citation và fallback khi không đủ căn cứ, không yêu cầu người học prompt |

**Kết luận thiết kế:** kết hợp pattern “grounded citation” của NotebookLM với cách giữ quyền chủ động cho người học của Khanmigo/Study Mode; không chọn trải nghiệm chatbot mở. Lợi thế của lát cắt là **đúng thời điểm chuyển buổi + đúng cặp nguồn + output ngắn, cố định và kiểm chứng được**.

## §4. Thiết kế
- Lát cắt MỘT CÂU: Khi một học viên bắt đầu Day 02 trên VLearn, hệ thống dùng tài liệu Day 01–02 để đề xuất recap Day 01 và 2–4 bridge có trích dẫn, giúp học viên tự kiểm chứng và nắm lại mạch kiến thức trong ≤3 phút thay vì tự tìm khoảng 15 phút.
- Non-goals (≥3):
  1. Không build lại toàn bộ UI của VLearn
  2. Không tạo hệ thống chấm điểm chính thức
  3. Không thay thế vai trò giảng viên
  4. Không xây chatbot Q&A tổng quát
- Mức prototype nhắm tới: [ ] Sketch [x] Mock [ ] Working — phần mock: UI hiển thị, knowledge map; phần thật: LLM call sinh recap/bridge
- Automation: [x] augment [ ] conditional [ ] automate — AI đề xuất recap/bridge nhưng học viên quyết định đọc, kiểm tra nguồn hoặc bỏ qua. Nếu nội dung sai, khoảng 1.000 học viên có thể ôn sai nền tảng cho buổi sau và TA phải sửa lại; vì chi phí lỗi trung bình–cao, mỗi ý phải có citation, trạng thái thiếu căn cứ phải thu hẹp output và kết quả không được dùng để chấm điểm chính thức.
- §4b. Nguyên tắc đã áp dụng (≥4):

| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
|---|---|
| G2 — Làm rõ nó làm tốt đến đâu | Header ghi “Tạo từ tài liệu Day 01–02”; mỗi ý recap/bridge kèm `[slide/trang/đoạn]` để học viên biết phạm vi và kiểm lại |
| G10 — Thu hẹp phạm vi khi nghi ngờ | Transcript/slide thiếu hoặc không tìm thấy overlap → giảm số ý và hiện “Chưa đủ dữ liệu để kết luận” thay vì đoán |
| G8 — Gạt bỏ dễ dàng | Nút “Bỏ qua recap, vào bài học” luôn hiện; lỗi AI không chặn flow vào Day 02 |
| G9 — Sửa dễ dàng | Sau khi chọn 👎, học viên chọn ý sai/nhập sửa ngắn ngay tại output thay vì phải mở luồng hỗ trợ khác |
| G11 — Giải thích vì sao | Mỗi cạnh bridge có câu “Day 01 [nguồn A] là nền tảng cho Day 02 [nguồn B] vì…” và mở được hai nguồn |
| G15 — Mời feedback chi tiết | 👍/👎 sau recap; khi chọn 👎 hệ thống hỏi “Ý nào sai hoặc chưa rõ?” và ghi nhận đúng mục được chọn |

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8)

| Lớp | Rủi ro trong lát cắt | Quy tắc đường lui |
|---|---|---|
| ① Nguồn sự thật | Recap/bridge bịa ý hoặc gắn sai citation | Chỉ hiển thị điều truy ngược được về tài liệu; không có căn cứ thì không kết luận |
| ② Mơ hồ/thiếu thông tin | Transcript ngắn, slide thiếu hoặc đoạn được chọn không đủ ngữ cảnh | Nói rõ thiếu gì, thu hẹp output và đưa link tài liệu gốc |
| ③ Ngoài phạm vi/thẩm quyền | Người dùng đòi giải bài, chấm điểm hoặc hỏi ngoài tài liệu khóa học | Từ chối phần ngoài phạm vi, nhắc lại feature làm được gì và cho phép vào bài |
| ④ Đặc thù domain | Sai thuật ngữ AI làm học viên hình thành nền tảng sai | Giữ nguyên thuật ngữ/định nghĩa nguồn; tách các khái niệm gần nhau và cite riêng |

| # | Tình huống cụ thể | Lớp | Hành vi mong muốn | Nguyên tắc |
|---|---|---|---|---|
| 1 | Hai buổi gần như không liên quan nhưng mô hình bịa một bridge nghe hợp lý | ① | Không hiện cạnh bridge; ghi “Chưa tìm thấy liên kết đủ căn cứ giữa hai buổi” và cho vào bài | G10 |
| 2 | Nội dung recap đúng nhưng citation trỏ nhầm trang/đoạn | ① | Đánh dấu ý đó là không đạt, không hiển thị như kết quả tin cậy; cho mở đúng nguồn hoặc gửi 👎 tại ý | G2, G9 |
| 3 | Transcript Day 01 bị thiếu nửa cuối hoặc quá ngắn | ② | Hiện banner “Dữ liệu Day 01 chưa đầy đủ”; chỉ tóm tắt phần có nguồn và đưa link slide gốc | G10 |
| 4 | Một slide chỉ có tiêu đề, không đủ dữ kiện để xác định quan hệ với Day 02 | ② | Bỏ bridge đó và ghi “Chưa đủ thông tin để xác định”; không suy diễn từ tiêu đề | G10 |
| 5 | Học viên hỏi một kiến thức không xuất hiện trong tài liệu Day 01–02 | ③ | “Nội dung này nằm ngoài tài liệu Day 01–02 nên mình chưa thể kết luận”; cho mở bài hoặc tài liệu gốc | G2, G10 |
| 6 | Học viên yêu cầu làm hộ bài tập hoặc chấm điểm chính thức | ③ | Từ chối làm/chấm hộ; gợi ý xem recap, mở bài tập và tự thử bước đầu | G8 |
| 7 | Mô hình nhầm “attention mechanism” với “attention” theo nghĩa chú ý thông thường | ④ | Giữ thuật ngữ đúng như nguồn, kèm định nghĩa và citation; không dùng bản diễn giải gây đổi nghĩa | G2, G11 |
| 8 | Recap gộp Chain-of-Thought và Prompt Engineering thành một khái niệm | ④ | Tách thành hai ý, mỗi ý có nguồn riêng; nếu nguồn không phân biệt rõ thì báo mơ hồ | G10, G11 |
| 9 | Học viên bỏ hai buổi liên tiếp rồi mở Day N+2 | Hiếm | Không nhồi toàn bộ lịch sử vào một recap; hiển thị hai recap rút gọn theo thứ tự và bridge tích lũy, có nút bỏ qua | G2, G8 |

## §6. Bốn đường đi của trải nghiệm
- **Happy path:** Học viên mở Day N+1 → header cho biết hệ thống dùng tài liệu Day N–N+1 → xem recap Day N gồm 5–7 ý có citation → xem 2–4 bridge, mỗi bridge có nguồn ở cả hai buổi → xem checklist → chọn “Bắt đầu bài mới” trong ≤3 phút.
- **Low-confidence (②):** Hệ thống phát hiện transcript/slide thiếu → banner nêu rõ buổi nào thiếu dữ liệu → chỉ hiện các ý có căn cứ với nhãn “Bản rút gọn” → học viên chọn “Xem tài liệu gốc” hoặc “Bỏ qua, vào bài”.
- **Failure/không căn cứ (①):** Không tìm thấy bridge đủ căn cứ → không dựng knowledge map giả → hiện “Chưa tìm thấy liên kết đủ căn cứ giữa hai buổi” → đưa link hai nguồn và nút vào bài mới.
- **Correction:** Học viên chọn 👎 tại một ý → chọn lý do “Sai nội dung / Sai nguồn / Khó hiểu” và có thể nhập sửa ngắn → hệ thống xác nhận đã ghi nhận, giữ nút mở nguồn và không tự tuyên bố rằng nội dung đã được sửa đúng.
- **Khi bị đòi ngoài phạm vi (③):** Hệ thống nêu “Mình chỉ tạo recap và cầu nối từ tài liệu Day N–N+1” → từ chối làm hộ/chấm điểm/trả lời ngoài nguồn → đưa học viên về recap hoặc bài học.
- **Case đặc thù domain (④):** Thuật ngữ AI được giữ đúng như tài liệu; các khái niệm gần nhau nằm ở các ý riêng với citation riêng; khi nguồn mâu thuẫn, hệ thống nêu mâu thuẫn thay vì tự chọn một định nghĩa.

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
| 31/07/2026 — trước CP3 | Cập nhật evidence n=20, 6 quote, tần suất (70% gặp thường xuyên), mức hữu ích (70%), mức sẵn sàng dùng (95%) và bảng impact | Thay các ước tính/TODO bằng kết quả khảo sát do Người 1 bàn giao; không công khai tên/MSSV trong spec |
| 31/07/2026 — trước CP3 | Hoàn thiện benchmark NotebookLM, Khanmigo và ChatGPT Study Mode; chốt khác biệt “đúng thời điểm + đúng cặp nguồn + output ≤3 phút” | Tránh biến lát cắt thành chatbot học tập tổng quát và làm rõ quyết định thiết kế từ sản phẩm tương tự |
| 31/07/2026 — trước CP3 | Viết lại lát cắt theo đủ 1 user · 1 việc · 1 quyết định AI · 1 kết quả; làm rõ AI đề xuất còn học viên kiểm chứng/quyết định | Khớp lựa chọn **augment** và xử lý cost-of-error khi recap/bridge sai |
| 31/07/2026 — trước CP3 | Cụ thể hóa 6 nguyên tắc HAX/PAIR thành thành phần UI/hành vi có thể kiểm tra | Đáp ứng yêu cầu mỗi nguyên tắc phải trỏ được vào vị trí cụ thể, không chỉ nêu tên |
| 31/07/2026 — trước CP3 | Bổ sung định nghĩa 4 lớp, làm rõ 9 kịch bản và 4 đường đi với thông báo + hành động tiếp theo | Để prototype/eval có đặc tả hành vi rõ ràng; không thay đổi prompt, golden set hay kết quả đo |
