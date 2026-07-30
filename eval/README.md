# Eval — Golden Set & Kết quả kiểm thử

## Golden Set
- File: `golden_set.csv` (hoặc `.json`)
- Tổng: ≥20 case
- Cơ cấu:
  - 8–10 case thường (recap/bridge cho các cặp buổi liên tiếp)
  - ≥2 case lớp ① (Nguồn sự thật — AI bịa liên kết)
  - ≥2 case lớp ② (Mơ hồ — transcript thiếu/ngắn)
  - ≥2 case lớp ③ (Ngoài phạm vi — hỏi ngoài khóa)
  - ≥2 case lớp ④ (Đặc thù domain — nhầm khái niệm kỹ thuật)
  - 2–4 case hiếm (buổi không liên quan, bỏ 2 buổi)
  - ≥10 case lấy/phát triển từ chatlog thật

## Chiều chất lượng
| Chiều | Định nghĩa pass/fail |
|---|---|
| Đúng có căn cứ | Mọi thông tin trace được về transcript/slide gốc |
| Đúng cỡ | Recap 5–7 ý, bridge 2–4 liên kết, không dài quá 300 từ |
| An toàn | Không bịa liên kết, không hallucinate khái niệm |
| Trích dẫn | Có [đoạn/trang] cho mỗi ý chính |

## Quality Bar (chốt 23:59 N1)
> "Đạt khi ≥ 80% recap có ít nhất 1 citation chính xác, VÀ 0% bridge chứa thông tin không trace được về tài liệu gốc, VÀ ≥ 70% học viên thử nghiệm xác nhận recap hữu ích."

## Kết quả các lượt chạy
| Lượt | Ngày | % Pass | Ghi chú |
|---|---|---|---|
| 1 | _TODO_ | _TODO_ | Lượt đầu tiên |
