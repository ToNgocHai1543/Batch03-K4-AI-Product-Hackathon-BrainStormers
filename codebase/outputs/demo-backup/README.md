# 🚨 Emergency Demo Backup Kit — Build Lead (Task 3.7)

> **Mục đích**: Hướng dẫn kích hoạt chế độ Demo Dự Phòng (Emergency Demo Mode) trong 10 giây nếu khi lên thuyết trình bị mất mạng Wi-Fi, hỏng API key hoặc server sập.

---

## ⚡ 3 Bước Kích Hoạt Khẩn Cấp (10 Giây)

### Bước 1: Mở Server Local ở Chế Độ Offline Engine
Mở Terminal/PowerShell tại thư mục project và gõ:
```bash
python codebase/src/server.py 8000
```
> *Server tự động phát hiện mất mạng và sử dụng Offline Generative Engine để sinh output thật từ data pack mà KHÔNG CẦN internet.*

### Bước 2: Truy Cập Giao Diện Demo Local
Mở trình duyệt bất kỳ (Chrome/Edge):
👉 **`http://localhost:8000/index.html`**

### Bước 3: Sử Dụng Thanh "Demo Controller" Để Điều Khiển Trải Nghiệm Live
Dùng 4 nút màu ở trên cùng để trình bày trực tiếp cho Ban Giám Khảo:
1. **✨ Happy Path**: Trình bày case chuẩn Day 01 ➔ Day 02 đầy đủ trích dẫn.
2. **⚠️ Low-Confidence**: Trình bày case audio transcript bị nhiễu.
3. **❌ Failure / Fallback**: Trình bày case ranh giới 0% overlap citation (HAX G10).
4. **💬 User Correction**: Trình bày case học viên góp ý sửa lỗi (HAX G15).

---

## 📁 Danh Sách Asset Trong Thư Mục Backup

| Asset | Mô tả |
|---|---|
| `demo_script.md` | Kịch bản thuyết trình live 2 phút dành riêng cho Build Lead |
| `trace_d1_d2.json` | Trace log chi tiết cho cặp Day 01 ➔ Day 02 |
| `trace_d2_d3.json` | Trace log chi tiết cho cặp Day 02 ➔ Day 03 |
| `feedback.json` | Nhật ký lưu vết phản hồi người dùng |
| `README.md` | Hướng dẫn kích hoạt khẩn cấp (file này) |
