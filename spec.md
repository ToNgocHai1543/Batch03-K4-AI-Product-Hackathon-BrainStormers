# AI SPEC — AI Learning Bridge · Nhóm BrainStormers · Zone [X]
Hướng: [x] A — VLearn  [ ] B — Trợ lý Học viên  [ ] C — Làn mở
Loại: [x] Tính năng mới

## §1. User & Job

- **Job executor + workflow:** Học viên khóa AI Thực Chiến, chủ yếu thuộc K3 và K4, khi bắt đầu một buổi học mới trên VLearn.

  - **Workflow:** Kết thúc buổi N → Bắt đầu buổi N+1 → Cố nhớ lại kiến thức buổi trước → Mở lại slide, video, ghi chú, đoạn chat hoặc hỏi bạn bè/trợ giảng → Lấy lại ngữ cảnh để tiếp tục học, hoặc học bài mới khi chưa hiểu rõ mối liên hệ giữa các buổi.

- **Core JTBD** *(không có tên sản phẩm hoặc AI trong câu):* Khi bắt đầu một buổi học mới, học viên muốn nhanh chóng nhớ lại những kiến thức quan trọng của buổi trước và hiểu chúng liên quan như thế nào đến nội dung hôm nay, để tiếp thu bài mới hiệu quả mà không phải mất nhiều thời gian tìm lại tài liệu.

- **Problem statement** *(không dùng chữ AI):* Khi bắt đầu buổi học mới, nhiều học viên không nhớ rõ nội dung buổi trước, không biết nên ôn lại phần nào hoặc không nhận ra mối liên hệ giữa các buổi học. Họ phải mở lại slide, video, ghi chú, đoạn chat hoặc hỏi người khác để lấy lại ngữ cảnh, làm gián đoạn mạch tư duy, tốn thời gian và giảm hiệu quả tiếp thu kiến thức mới.

- **Evidence** *(chuẩn A — khảo sát người dùng; log đầy đủ tại `evidence/survey_log.md`):*
  - Khảo sát ghi nhận tổng cộng **27 phản hồi**, gồm:
    - **20 học viên K4**.
    - **5 học viên K3**.
    - **1 người thuộc khóa AI khác**.
    - **1 người chọn nhóm “Khác”**.
  - **23/27 người (85,2%)** không nhớ rõ toàn bộ nội dung buổi trước:
    - 14 người chỉ nhớ một phần.
    - 7 người phải xem lại tài liệu mới nhớ.
    - 2 người gần như quên hoàn toàn.
  - Chỉ **4/27 người (14,8%)** cho biết họ nhớ khá rõ nội dung buổi trước.
  - **14/27 người (51,9%)** mất từ **10 phút trở lên** để lấy lại mạch kiến thức:
    - 8 người mất từ 10–20 phút.
    - 6 người mất trên 20 phút.
  - Các khoảng thời gian còn lại:
    - 8 người mất từ 3–10 phút.
    - 5 người mất dưới 3 phút.
  - **24/27 người (88,9%)** xác nhận có ít nhất một khó khăn cụ thể khi bắt đầu buổi học mới; chỉ 3 người chọn “Không gặp khó khăn”.
  - Những khó khăn được ghi nhận nhiều nhất:
    - **11/27 người (40,7%)** không biết nội dung hôm nay liên quan như thế nào đến buổi trước.
    - **6/27 người (22,2%)** không biết nên ôn lại phần nào.
    - **6/27 người (22,2%)** không nhớ buổi trước đã học gì.
    - **1/27 người (3,7%)** khó tìm lại đúng tài liệu.
  - **20/27 người (74,1%)** gặp tình trạng này từ khoảng một nửa số buổi trở lên:
    - 11 người gặp gần như mọi buổi học.
    - 9 người gặp khoảng một nửa số buổi.
  - Các mức tần suất còn lại:
    - 5 người gặp thỉnh thoảng.
    - 2 người gặp hiếm khi.
  - **18/27 người (66,7%)** đánh giá tính năng tóm tắt và kết nối kiến thức giữa các buổi là **“Hữu ích” hoặc “Rất hữu ích”**:
    - 9 người đánh giá “Hữu ích”.
    - 9 người đánh giá “Rất hữu ích”.
  - **26/27 người (96,3%)** cho biết chắc chắn hoặc có thể sử dụng nếu tính năng được tích hợp vào VLearn:
    - 12 người chọn “Chắc chắn có”.
    - 14 người chọn “Có thể”.
    - 1 người chọn “Chưa chắc”.

### Ví dụ nguyên văn từ khảo sát

> “Tôi phải lướt lại hết slide để xem buổi trước học những kiến thức nào.”

> “Việc khó khăn nhất là khi chưa kịp nhớ ra buổi trc học gì thì giảng viên đã giảng dạy bài học mới, vì vậy mình phải tự đọc cả 2 bài học cùng một lúc và sẽ gây khó khăn và quá tải nếu bài học quá khó.”

> “Tôi thường nhớ mang máng, không chắc chắn, phần giảng viên giảng không hiểu dù đã học, nhưng tìm lại rất khó khăn, mất khoảng 20 - 30ph vì không biết tìm ở đâu, do quên kiến thức buổi trước.”

> “Không nhớ bài - Mở slide và hỏi bạn bè - khoảng 20ph.”

> “Tôi quên mất Transformer hoạt động ntn và tôi phải nhờ bạn chỉ lại mất 15p.”

> “Thường quên kiến thức, phải mất khoảng 30p để reload lại.”

> “Khi bắt đầu một buổi học mới tôi luôn mơ hồ về việc hôm nay giảng viên đang giảng dạy phần nào và có nhiều buổi gần như tôi không biết giảng viên đang giảng về thứ gì liên quan tới chương trình.”

> “Không nhớ buổi trước học gì và mất thời gian tìm tài liệu, ghi chú, hỏi bạn bè. Nếu như quá lười hoặc bận sau một vài buổi học sẽ ko có kiến thức gì đọng lại và mất thời gian để xem và tìm lại những gì đã học.”

> “Khi bắt đầu buổi hc ms tôi thường ko bt bài tới sẽ làm j và liên quan j dênd buổi trc.”

> “Slide quá nhiều mà không biết tóm tắt là gì nên, không có keyword nên rất khó để hiểu.”

---

## §2. Impact & quyết định chọn

### Bảng impact các ứng viên

| Ứng viên | Quy mô ảnh hưởng | Tần suất xảy ra | Chi phí/tác động mỗi lần | Khả thi trong hackathon | Quyết định |
|---|---:|---|---|---|---|
| **Học viên khó lấy lại mạch kiến thức và kết nối nội dung giữa các buổi học** | **24/27 người (88,9%)** xác nhận gặp ít nhất một khó khăn cụ thể; **23/27 (85,2%)** không nhớ rõ toàn bộ nội dung buổi trước | **20/27 (74,1%)** gặp tình trạng từ khoảng một nửa số buổi trở lên | **14/27 (51,9%)** mất từ 10 phút trở lên; phải tìm lại slide, video, ghi chú, đoạn chat hoặc hỏi người khác; làm gián đoạn mạch tư duy | **Cao** — đã có transcript và slide để tạo recap, bridge và trích dẫn nguồn; phạm vi MVP có thể giới hạn ở hai buổi liên tiếp | ✅ **CHỌN** |
| **Học viên không biết nên ôn lại phần nào trước buổi học mới** | **6/27 người (22,2%)** xác nhận đây là khó khăn làm họ mất nhiều thời gian nhất | Xuất hiện khi bắt đầu buổi học mới hoặc khi chuẩn bị cho bài tiếp theo | Phải tự lướt lại nhiều slide, video và ghi chú; có thể ôn sai trọng tâm hoặc bỏ sót kiến thức nền | **Cao** — có thể tạo checklist kiến thức cần ôn từ tài liệu của hai buổi | ❌ **LOẠI** |
| **Học viên không nhớ buổi trước đã học gì** | **6/27 người (22,2%)** chọn đây là khó khăn lớn nhất; tổng cộng **23/27 (85,2%)** không nhớ rõ toàn bộ nội dung | Xuất hiện khi chuyển sang buổi học tiếp theo | Phải mở lại slide, video, ghi chú hoặc hỏi bạn bè; các phản hồi thực tế ghi nhận thời gian tìm lại từ 15 đến trên 30 phút | **Cao** — có thể tạo bản recap từ transcript và slide | ❌ **LOẠI** |

### Ứng viên đã loại và lý do

- **Học viên không biết nên ôn lại phần nào — LOẠI:** Pain này được **6/27 người (22,2%)** xác định là khó khăn làm họ mất nhiều thời gian nhất. Một checklist ôn tập có thể giúp học viên tìm đúng nội dung cần xem lại. Tuy nhiên, phạm vi này chỉ giải quyết câu hỏi “cần ôn phần nào”, chưa giải quyết đầy đủ việc học viên không nhớ kiến thức cũ và không hiểu kiến thức đó liên quan như thế nào đến bài học mới.

- **Học viên không nhớ buổi trước đã học gì — LOẠI:** Đây là khó khăn lớn nhất của **6/27 người (22,2%)**, đồng thời **23/27 người (85,2%)** không nhớ rõ toàn bộ nội dung buổi trước. Một bản recap có thể hỗ trợ học viên nhớ lại các ý chính, nhưng nếu chỉ tóm tắt nội dung cũ thì học viên vẫn có thể chưa hiểu kiến thức đó được sử dụng như thế nào trong buổi học tiếp theo. Vì vậy, recap được giữ lại như một phần của giải pháp tổng thể, thay vì được chọn làm toàn bộ bài toán trung tâm.

### Ứng viên được chọn và lý do

Nhóm chọn bài toán **học viên khó lấy lại mạch kiến thức và kết nối nội dung giữa các buổi học** vì đây là ứng viên có bằng chứng mạnh nhất về quy mô ảnh hưởng, tần suất, chi phí và tính khả thi:

1. **24/27 người (88,9%)** xác nhận gặp ít nhất một khó khăn cụ thể khi bắt đầu buổi học mới.
2. **23/27 người (85,2%)** không nhớ rõ toàn bộ nội dung buổi trước.
3. **20/27 người (74,1%)** gặp tình trạng này từ khoảng một nửa số buổi trở lên.
4. **14/27 người (51,9%)** mất từ **10 phút trở lên** để lấy lại mạch kiến thức.
5. **11/27 người (40,7%)** không biết nội dung hôm nay liên quan như thế nào đến buổi trước.
6. **6/27 người (22,2%)** không biết nên ôn lại phần nào.
7. **6/27 người (22,2%)** không nhớ buổi trước đã học gì.
8. **18/27 người (66,7%)** đánh giá tính năng recap và kết nối kiến thức là hữu ích hoặc rất hữu ích.
9. **26/27 người (96,3%)** cho biết chắc chắn hoặc có thể sử dụng tính năng nếu được tích hợp vào VLearn.
10. Nhóm đã có transcript và slide bài giảng để xây dựng, trích dẫn và kiểm thử một MVP gồm recap kết hợp bridge giữa hai buổi liên tiếp.

Ứng viên được chọn bao phủ đồng thời ba nhu cầu xuất hiện rõ trong khảo sát:

- Nhớ lại những kiến thức quan trọng của buổi trước.
- Xác định nội dung cần ưu tiên ôn lại.
- Hiểu mối liên hệ giữa kiến thức cũ và bài học mới.

Phạm vi này tạo tác động rộng hơn hai ứng viên còn lại nhưng vẫn đủ cụ thể để xây dựng và demo trong thời gian hackathon. MVP không cần xử lý toàn bộ lịch sử khóa học mà chỉ tập trung tạo recap và bridge giữa hai buổi liên tiếp, có trích dẫn đến slide hoặc transcript để học viên tự kiểm chứng.

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
  - Ranh giới với source hiện tại: `VLearnTutor.jsx` được xem là màn hình nền/mô phỏng tính năng VLearn sẵn có, **không thuộc lát cắt được đánh giá**; đường demo chính chỉ là Learning Bridge. Quiz nhanh chỉ hỗ trợ tự ôn, không lưu điểm và không được dùng để đánh giá năng lực chính thức.
- Mức prototype hiện tại: [ ] Sketch [x] Mock [ ] Working — UI React, knowledge map, citation navigation, feedback và trace đã có component chạy; happy path có mã gọi Gemini thật. Low-confidence/failure/out-of-scope dùng `PREBAKED_EXPERIENCE_PATHS`, nên là mock có chủ đích. Chưa công nhận Working end-to-end trên artifact repo vì đang thiếu `codebase/src/data/courseData.js`, là dependency được `App.jsx` và `llmService.js` import.
- Automation: [x] augment [ ] conditional [ ] automate — AI đề xuất recap/bridge nhưng học viên quyết định đọc, kiểm tra nguồn hoặc bỏ qua. Nếu nội dung sai, khoảng 1.000 học viên có thể ôn sai nền tảng cho buổi sau và TA phải sửa lại; vì chi phí lỗi trung bình–cao, mỗi ý phải có citation, trạng thái thiếu căn cứ phải thu hẹp output và kết quả không được dùng để chấm điểm chính thức.
- §4b. Nguyên tắc đã áp dụng (≥4):

| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
|---|---|
| G2 — Làm rõ nó làm tốt đến đâu | `LearningBridge.jsx`: badge `Grounded G2`, số ý có trích dẫn, citation cạnh từng recap/bridge và badge `Live API` khi có lời gọi thật |
| G10 — Thu hẹp phạm vi khi nghi ngờ | `App.jsx` + `llmService.js`: demo Low-Confidence/Failure và honest fallback không trả lời khi không tìm được nguồn; các path lỗi hiện dùng dữ liệu prebaked để chứng minh hành vi |
| G8 — Gạt bỏ dễ dàng | `LearningBridge.jsx`: nút “Học ngay” gọi `onSkipBridge`; AI Bridge không chặn học viên vào bài |
| G9 — Sửa dễ dàng | `LearningBridge.jsx` mở `FeedbackModal.jsx` ngay tại recap bị chọn; học viên chọn loại lỗi và nhập mô tả. Bản hiện tại ghi nhận yêu cầu sửa, chưa sửa trực tiếp nội dung trên màn hình |
| G11 — Giải thích vì sao | `LearningBridge.jsx`: mỗi `bridgeLink` hiển thị source concept, target concept, hai citation và `explanation`; knowledge map dùng cùng dữ liệu |
| G15 — Mời feedback chi tiết | `FeedbackModal.jsx` + `logger.js`: 👎 → chọn sai citation/nhầm khái niệm/hallucination/khác → nhập chi tiết → lưu feedback kèm section và citation ID |

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8)

| Lớp | Rủi ro trong lát cắt | Quy tắc đường lui |
|---|---|---|
| ① Nguồn sự thật | Recap/bridge bịa ý hoặc gắn sai citation | Chỉ hiển thị điều truy ngược được về tài liệu; không có căn cứ thì không kết luận |
| ② Mơ hồ/thiếu thông tin | Transcript ngắn, slide thiếu hoặc đoạn được chọn không đủ ngữ cảnh | Nói rõ thiếu gì, thu hẹp output và đưa link tài liệu gốc |
| ③ Ngoài phạm vi/thẩm quyền | Người dùng đòi giải bài, chấm điểm hoặc hỏi ngoài tài liệu khóa học | Từ chối phần ngoài phạm vi, nhắc lại feature làm được gì và cho phép vào bài |
| ④ Đặc thù domain | Sai thuật ngữ AI làm học viên hình thành nền tảng sai | Giữ nguyên thuật ngữ/định nghĩa nguồn; tách các khái niệm gần nhau và cite riêng |

| # | Tình huống cụ thể | Lớp | Hành vi mong muốn | Trạng thái trong source hiện tại | Nguyên tắc |
|---|---|---|---|---|---|
| 1 | Hai buổi gần như không liên quan nhưng mô hình bịa một bridge nghe hợp lý | ① | Không hiện cạnh bridge; ghi “Chưa tìm thấy liên kết đủ căn cứ giữa hai buổi” và cho vào bài | **Mock:** Failure path trả `bridgeLinks=[]`; UI hiện trạng thái không có liên kết | G10 |
| 2 | Nội dung recap đúng nhưng citation trỏ nhầm trang/đoạn | ① | Cho mở nguồn và gửi 👎 ngay tại ý; không coi mã citation tồn tại là bằng chứng citation đúng nghĩa | **Một phần:** recap citation bấm được và feedback ghi đúng citation ID; bridge citation chưa truyền day code nên có thể mở sai buổi | G2, G9 |
| 3 | Transcript Day 01 bị thiếu nửa cuối hoặc quá ngắn | ② | Hiện cảnh báo dữ liệu thiếu; chỉ giữ phần có căn cứ và cho phép bỏ qua | **Mock:** Low-Confidence path được chọn từ Demo Controller | G10 |
| 4 | Một slide chỉ có tiêu đề, không đủ dữ kiện để xác định quan hệ với Day 02 | ② | Bỏ bridge không đủ căn cứ; không suy diễn từ tiêu đề | **Mock/được eval:** UI có failure state; golden set kiểm fallback nhưng frontend chưa tự gate theo chất lượng nguồn | G10 |
| 5 | Học viên hỏi một kiến thức không xuất hiện trong tài liệu Day 01–02 | ③ | Nêu rõ ngoài phạm vi và đưa người dùng về bài học | **Mock:** Out-of-Scope path trong Demo Controller; Tutor có honest fallback riêng | G2, G10 |
| 6 | Học viên yêu cầu làm hộ bài tập hoặc chấm điểm chính thức | ③ | Từ chối làm/chấm hộ; gợi ý xem recap và tự thử | **Chưa chứng minh trong Learning Bridge:** non-goal đã chốt; cần dùng Out-of-Scope demo hoặc bổ sung case UI | G8 |
| 7 | Mô hình nhầm “attention mechanism” với “attention” theo nghĩa chú ý thông thường | ④ | Giữ thuật ngữ đúng như nguồn, kèm định nghĩa và citation | **Một phần:** feedback có loại “Nhầm lẫn khái niệm kỹ thuật”; eval có `hard_domain_01`, nhưng frontend không có semantic gate tự động | G2, G11 |
| 8 | Recap gộp Chain-of-Thought và Prompt Engineering thành một khái niệm | ④ | Tách thành hai ý có nguồn riêng; khi mơ hồ thì không gộp | **Được eval, chưa có UI riêng:** `hard_domain_02` kiểm output; feedback cho phép báo nhầm khái niệm | G10, G11 |
| 9 | Học viên bỏ hai buổi liên tiếp rồi mở Day N+2 | Hiếm | Hiển thị recap rút gọn theo thứ tự và bridge tích lũy, có nút bỏ qua | **Chưa implement:** source hiện chỉ lấy `selectedDayIndex - 1` làm buổi trước | G2, G8 |

## §6. Bốn đường đi của trải nghiệm
- **Happy path — AI thật khi có API key:** Học viên mở Day N+1 → chọn tab Bridge Agent → xem recap có citation → xem bridge gồm hai nguồn và giải thích → mở knowledge map/checklist/quiz → chọn “Học ngay”. `llmService.generateLearningBridge()` chỉ gọi Gemini ở path này.
- **Low-confidence (②) — mock có chủ đích:** Demo Controller chọn Low-Confidence → frontend lấy dữ liệu prebaked → hiện cảnh báo/nội dung thu hẹp → học viên kiểm tra nguồn hoặc “Học ngay”. Không trình bày đây là output API live.
- **Failure/không căn cứ (①) — mock có chủ đích:** Demo Controller chọn Failure → trả danh sách bridge rỗng → UI không dựng liên kết giả và vẫn cho học viên vào bài.
- **Correction — component thật:** Tại một ý recap, học viên chọn 👎 → modal hiển thị đúng nội dung đang phản hồi → chọn “Trích dẫn sai / Nhầm khái niệm / Hallucination / Khác” → nhập mô tả → lưu log kèm citation → nhận xác nhận. Đây là đường correction thứ tư theo rubric; Out-of-Scope là case bổ sung, không thay thế correction.
- **Khi bị đòi ngoài phạm vi (③) — mock bổ sung:** Demo Controller chọn Out-of-Scope/Boundary → hiển thị hành vi từ chối theo dữ liệu prebaked → cho học viên quay lại bài.
- **Case đặc thù domain (④):** Frontend cho báo lỗi “Nhầm lẫn khái niệm kỹ thuật”; semantic correctness được đo bằng human review trong `eval/`, chưa có gate tự động ở frontend.

### §6b. Kết quả review khớp spec–source của Spec & Design Lead

| Mức | Phát hiện | Quyết định thiết kế / tiêu chí bàn giao |
|---|---|---|
| **Blocker** | Repo thiếu `codebase/src/data/courseData.js` dù `App.jsx` và `llmService.js` import file này | Giữ mức **Mock** cho đến khi file được commit và `npm run build` thành công từ clean checkout |
| **Blocker** | `LearningBridge.jsx` gọi `extractSlidePage(...)` tại tab Bridge nhưng chỉ khai báo `extractSlidePageAndDay(...)` | Sửa helper/call site và kiểm tra bấm mở cả citation nguồn lẫn đích trước khi demo |
| **Cao** | Khi Gemini lỗi, service âm thầm trả `PREBAKED_EXPERIENCE_PATHS.happy` | Fallback phải có nhãn “Demo fallback / Không phải Live API”, warning và hành động thử lại/bỏ qua; không để người dùng nhầm mock với kết quả thật |
| **Cao** | Citation bridge gọi `onJumpToSlide(srcPage/targetPage)` nhưng không truyền day code | Citation nguồn phải mở Day N; citation đích phải mở Day N+1, tương tự cách recap truyền cả trang và ngày |
| **Vừa** | Demo Controller có Out-of-Scope thay vì nút Correction | Demo correction bằng nút 👎 trên recap và nói rõ đây là path thứ tư; Out-of-Scope là case bổ sung |
| **Vừa** | `VLearnTutor.jsx` là chatbot Q&A rộng hơn lát cắt | Không đưa Tutor vào claim/lượt demo của Learning Bridge; coi đây là UI nền của VLearn để không vi phạm non-goal |
| **Vừa** | Ba path lỗi luôn prebaked (`pathMode !== 'happy'`) | Badge/slide demo phải công khai phần mock; chỉ happy path được dùng làm bằng chứng AI call thật |
| **Backlog** | Chưa hỗ trợ người học bỏ hai buổi liên tiếp | Không claim case hiếm #9 đã implement; giữ làm ưu tiên nếu có thêm một tuần |

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
| 31/07/2026 — sau khi pull prototype mới | Audit khớp spec–source: cập nhật mức thật/mock, vị trí 6 nguyên tắc, trạng thái 9 kịch bản và 4 đường đi; tách Tutor khỏi lát cắt | Source mới đã có UI/feedback/trace nhưng ba error path còn prebaked; cần mô tả trung thực theo artifact |
| 31/07/2026 — sau khi pull prototype mới | Ghi 2 blocker và các design gap: thiếu `courseData.js`, helper citation bridge sai tên, fallback API chưa minh bạch, citation bridge thiếu day code | Ngăn claim Working khi clean checkout chưa chạy và tránh người dùng nhầm output mock/API hoặc mở sai nguồn |
| 31/07/2026 — trước CP3 | Mở rộng evidence từ n=20 lên n=27; cập nhật pain (85%), tần suất thường xuyên (74%), mức hữu ích (67%), mức sẵn sàng dùng (96%) và thêm 2 quote | Phản ánh 7 phản hồi mới; PP1 “không thấy liên hệ giữa hai buổi” trở thành pain áp đảo với 11/27 (41%) |
| 31/07/2026 — trước CP3 | Cập nhật evidence n=20, 6 quote, tần suất (70% gặp thường xuyên), mức hữu ích (70%), mức sẵn sàng dùng (95%) và bảng impact | Thay các ước tính/TODO bằng kết quả khảo sát do Người 1 bàn giao; không công khai tên/MSSV trong spec |
| 31/07/2026 — trước CP3 | Hoàn thiện benchmark NotebookLM, Khanmigo và ChatGPT Study Mode; chốt khác biệt “đúng thời điểm + đúng cặp nguồn + output ≤3 phút” | Tránh biến lát cắt thành chatbot học tập tổng quát và làm rõ quyết định thiết kế từ sản phẩm tương tự |
| 31/07/2026 — trước CP3 | Viết lại lát cắt theo đủ 1 user · 1 việc · 1 quyết định AI · 1 kết quả; làm rõ AI đề xuất còn học viên kiểm chứng/quyết định | Khớp lựa chọn **augment** và xử lý cost-of-error khi recap/bridge sai |
| 31/07/2026 — trước CP3 | Cụ thể hóa 6 nguyên tắc HAX/PAIR thành thành phần UI/hành vi có thể kiểm tra | Đáp ứng yêu cầu mỗi nguyên tắc phải trỏ được vào vị trí cụ thể, không chỉ nêu tên |
| 31/07/2026 — trước CP3 | Bổ sung định nghĩa 4 lớp, làm rõ 9 kịch bản và 4 đường đi với thông báo + hành động tiếp theo | Để prototype/eval có đặc tả hành vi rõ ràng; không thay đổi prompt, golden set hay kết quả đo |
