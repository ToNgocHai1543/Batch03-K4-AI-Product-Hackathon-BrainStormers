# Reflection — Nông Ngọc Dương (Eval & Prompt Lead)

## Vai trò trong nhóm
Người 4 — Eval & Prompt Lead: Phụ trách thiết kế System Prompt, bộ thử Golden Set (22 cases), chạy đánh giá đo nghiệm và khóa Quality bar.

## Phần mình làm
- Viết System Prompt 4 Lớp chuẩn hóa cho mô hình sinh Recap và Bridge map.
- Xây dựng `eval/golden_set.json` gồm 22 case bài test và viết công cụ đo tự động `eval/eval_core.py`.
- Khóa Quality Bar trong `spec.md` §7 và chạy 2 lượt đo lặp Prompt (Round 1: 81.8% -> Round 2: 100%).

## AI hỗ trợ thế nào
- Dùng AI sinh các case kiểm thử góc (boundary/out-of-scope) để thử độ bền của Prompt.

## Một bài học từ case fail của chính nhóm
- **Bài học**: Lượt đo đầu tiên chỉ đạt 73.3% trích dẫn do Prompt chưa ép format JSON nghiêm ngặt. Sau khi bổ sung JSON Schema chỉ định rõ `citations: ["Day01 - slide X"]`, tỷ lệ trích dẫn đúng đạt 100%.
