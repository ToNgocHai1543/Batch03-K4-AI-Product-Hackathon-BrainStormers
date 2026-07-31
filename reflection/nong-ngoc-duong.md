# Reflection — Nông Ngọc Dương (Eval & Prompt Lead)

## Vai trò trong nhóm

Mình đảm nhận vai trò **Eval & Prompt Lead (Người 4)**, phụ trách thiết kế prompt, xây dựng golden set, định nghĩa tiêu chí đánh giá và đo chất lượng đầu ra recap–bridge.

## Phần mình làm

Mình xây dựng bộ thử gồm **22 case**: 10 case thường, 8 case khó và 4 case hiếm. Trong đó, 10 case được truy về chatlog thật bằng mã hội thoại ẩn danh.

Mình viết system prompt, recap prompt và bridge prompt; xây validator kiểm tra schema, số lượng ý, giới hạn 300 từ, citation và fallback. Mình cũng chạy hai vòng đánh giá:

- Round 1: 18/22 case pass, đạt 81,8%.
- Round 2: 22/22 case pass, đạt 100%.
- Tỷ lệ case eligible có citation tồn tại tăng từ 73,3% lên 100%.
- Số bridge không truy được về nguồn bằng 0.

## AI hỗ trợ thế nào

AI hỗ trợ mình phân tích transcript, phát triển các case khó, viết runner đánh giá và tìm nguyên nhân khi pipeline gặp lỗi. Ví dụ, AI giúp phát hiện schema Pydantic có thuộc tính Gemini không hỗ trợ, chuẩn hóa citation từ dạng `[T04-046]` thành `T04-046`, và phân biệt lỗi prompt với lỗi quota API.

Tuy nhiên, mình vẫn phải tự kiểm tra cấu trúc golden set, đối chiếu citation với transcript và không dùng kết quả AI thay cho đánh giá độc lập của reviewer.

## Một bài học từ case fail của chính nhóm

Ở Round 1, ba trong bốn case fail vì output vượt giới hạn 300 từ. Prompt ban đầu chỉ yêu cầu “không quá 300 từ”, nhưng chỉ dẫn này chưa đủ cụ thể để mô hình kiểm soát độ dài.

Từ failure đó, mình sửa đúng một vấn đề trong prompt v2 bằng cách đặt ngân sách rõ cho từng trường: claim tối đa 18 từ, concept tối đa 6 từ, explanation tối đa 24 từ và warning tối đa 12 từ. Sau thay đổi, output dài nhất chỉ còn 213 từ và toàn bộ 22 case đều pass validator.

Bài học của mình là không nên chỉ viết yêu cầu chất lượng chung chung. Với đầu ra AI, cần biến yêu cầu thành các ràng buộc nhỏ, đo được và có validator kiểm tra tự động.
