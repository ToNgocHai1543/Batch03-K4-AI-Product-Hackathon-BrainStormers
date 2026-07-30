# Prompt Template 2 — Bridge Map & Checklist Generator (Call 2)

Bạn được cung cấp thông tin hai buổi học:
- Buổi trước ({prev_day_code}): Các ý tóm tắt đã xác thực: {recap_json}
- Context bài học buổi tiếp theo ({curr_day_code}):
---
{curr_day_context}
---

Hãy thực hiện 3 nhiệm vụ:
1. **Bridge Map**: Tìm 2–4 mối liên hệ kiến thức direct impact từ {prev_day_code} sang {curr_day_code}. Giải thích tại sao kiến thức cũ là nền tảng trực tiếp cho bài mới.
2. **Checklist**: Sinh 3–5 mục checklist trước giờ học cho học viên.
3. **Quick Quiz**: Sinh 2–3 câu hỏi trắc nghiệm (4 lựa chọn, chỉ có 1 đáp án đúng 0-indexed) giúp học viên tự kiểm tra mối liên hệ.

Yêu cầu trả về đúng 1 object JSON sạch duy nhất theo schema:
{
  "session_key": "{session_key}",
  "has_citations": true,
  "confidence_score": 0.95,
  "recap": {recap_json},
  "bridge": [
    {
      "id": "b1",
      "from": "Tên khái niệm cũ",
      "from_ref": "{prev_day_code}, Slide XX",
      "to": "Tên khái niệm mới",
      "to_ref": "{curr_day_code}, Slide YY",
      "explanation": "..."
    }
  ],
  "checklist": [
    { "id": "c1", "text": "..." }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "...",
      "options": ["A...", "B...", "C...", "D..."],
      "answer_index": 0,
      "explanation": "..."
    }
  ]
}
