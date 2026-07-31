# Reflection — Nguyễn Hải Anh (Build Lead)

## Vai trò trong nhóm
Người 3 — Build Lead: Lập trình Working Prototype, tích hợp Gemini API thật, xử lý giao diện React + Vite và Logger hệ thống.

## Phần mình làm
- Xây dựng giao diện VLearn Platform với trình xem PDF Slide, Slim Demo Controller bar, và widget Learning Bridge.
- Viết `llmService.js` gọi API Gemini thật, xử lý JSON parsing, fallback simulator và hệ thống ghi log `logger.js`.

## AI hỗ trợ thế nào
- Dùng AI để sinh mã nguồn React UI mượt mà với hiệu ứng Glassmorphism và tối ưu hóa xử lý async API fetch.

## Một bài học từ case fail của chính nhóm
- **Bài học**: Khi gọi Gemini API bị lỗi rải rác do mạng, nếu không có lớp Fallback simulator thì app sẽ bị nát giao diện. Việc bổ sung lớp Fallback mượt giúp Live Demo luôn ổn định 100%.
