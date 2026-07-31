# Reflection — Nguyễn Đức Anh (Evidence Lead)

## Vai trò trong nhóm

**Người 1 — Evidence Lead:** Phụ trách khảo sát người dùng, tổng hợp bằng chứng và lượng hóa mức độ ảnh hưởng của vấn đề học viên khó lấy lại mạch kiến thức giữa các buổi học.

## Phần mình làm

Tôi xây dựng và triển khai khảo sát, thu được **27 phản hồi**, gồm 20 học viên K4, 5 học viên K3 và 2 người thuộc nhóm khác. Tôi tổng hợp dữ liệu, tính tỷ lệ và chọn các trích dẫn nguyên văn để chứng minh pain của người dùng.

Kết quả nổi bật cho thấy **24/27 người (88,9%)** gặp ít nhất một khó khăn khi bắt đầu buổi học mới, **23/27 người (85,2%)** không nhớ rõ toàn bộ nội dung buổi trước và **14/27 người (51,9%)** mất từ 10 phút trở lên để lấy lại mạch kiến thức.

Tôi hoàn thiện nội dung **User, Job, Problem Statement, Evidence và Impact** trong `spec.md` §1–§2, đồng thời tạo `evidence/survey_log.md` để lưu câu hỏi, phương pháp đếm, kết quả khảo sát và các phản hồi tiêu biểu. Dữ liệu công khai đã được loại bỏ họ tên và mã học viên để tránh lộ thông tin cá nhân.

## AI hỗ trợ thế nào

Tôi sử dụng AI để rà soát cách đặt câu hỏi khảo sát, chuẩn hóa dữ liệu phản hồi, kiểm tra phép tính tỷ lệ và tổng hợp các câu trả lời mở thành những nhóm pain có thể đo lường. AI cũng hỗ trợ đối chiếu số liệu giữa `survey_log.md` và `spec.md`, phát hiện các con số chưa có bằng chứng và viết lại nội dung theo hướng ngắn gọn, có nguồn kiểm chứng.

Tôi không dùng AI để tự tạo phản hồi hoặc thay đổi kết quả khảo sát. Các số liệu và trích dẫn cuối cùng đều dựa trên dữ liệu người dùng thật.

## Một bài học từ case fail của chính nhóm

Ban đầu, phần Evidence trong `spec.md` còn sử dụng các con số ước tính như số lượng người bị ảnh hưởng, thời gian mất từ 10–20 phút và để lại nhiều mục `TODO`. Những thông tin này nghe hợp lý nhưng chưa đủ điều kiện làm bằng chứng vì người khác không thể kiểm chứng cách đo.

Sau khi triển khai khảo sát, tôi thay các ước tính bằng số liệu thực tế từ 27 phản hồi, ghi rõ câu hỏi, mẫu số, cách tính và các câu trả lời nguyên văn. Bài học tôi rút ra là: trong AI Product, một nhận định hợp lý chưa phải là bằng chứng; mọi pain và quyết định sản phẩm cần được gắn với dữ liệu có thể truy vết và kiểm chứng.
