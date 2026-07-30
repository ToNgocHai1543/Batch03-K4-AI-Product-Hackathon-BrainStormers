# Prompt Template 1 — Recap Generator (Call 1)

Dựa trên tài liệu buổi học cũ dưới đây ({prev_day_code}):

---
{prev_day_context}
---

Hãy tạo 5–7 điểm tóm tắt (Recap) trọng tâm nhất của buổi học này.
Yêu cầu:
1. Mỗi điểm tóm tắt là một câu ngắn gọn, súc tích, đi thẳng vào bản chất.
2. Mọi điểm tóm tắt BẮT BUỘC kèm trích dẫn cụ thể dạng `Slide XX` hoặc mã `[Txx-NNN]`.
3. Trả về định dạng JSON array:
[
  {
    "id": "r1",
    "point": "...",
    "citation": "Slide XX",
    "source_quote": "..."
  }
]
