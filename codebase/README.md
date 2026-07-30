# Codebase — AI Learning Bridge Agent

## Mô tả
Prototype cho tính năng AI Learning Bridge trên VLearn — tự động sinh recap, bridge map, checklist chuẩn bị và quiz nhanh giữa các buổi học.

## Mức prototype
- [ ] Sketch
- [ ] Mock
- [x] Working *(target)*

## Phần nào mock, phần nào thật
| Thành phần | Thật / Mock | Ghi chú |
|---|---|---|
| LLM Call sinh recap | **Thật** | Gọi API Gemini/Claude |
| LLM Call sinh bridge | **Thật** | Gọi API Gemini/Claude |
| Dữ liệu transcript/slide | **Thật** | Từ `data/vlearn-pack/` |
| UI hiển thị | **Mock** | HTML/CSS tĩnh hoặc v0.dev |
| Knowledge map visualization | **Mock** | Sơ đồ tĩnh hoặc Mermaid |

## Cách chạy
```bash
# TODO: Thêm hướng dẫn chạy sau khi build
```

## Cấu trúc
```
codebase/
├── README.md          ← file này
├── prompts/           ← system prompt + prompt template
├── src/               ← source code
└── outputs/           ← log/trace các lần gọi AI
```
