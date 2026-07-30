# 💻 Build Lead — Phân tích công việc chi tiết

> **Vai trò**: Người 3 — Build Lead  
> **Branch**: `feature/build-prototype`  
> **Mục tiêu**: Prototype chạy end-to-end, ≥1 lời gọi AI thật, demo 4 đường đi trải nghiệm  
> **Điểm rubric chịu trách nhiệm**: R5 Prototype (8đ) + đóng góp R3 (3đ trải nghiệm)

---

## 🎯 Tóm tắt sản phẩm cần build

**AI Learning Bridge** — Khi học viên mở buổi Day N+1 trên VLearn, hệ thống tự động:
1. **Recap** buổi N (5–7 ý chính + trích dẫn [slide/đoạn])
2. **Bridge map** (2–4 liên kết kiến thức N → N+1 + giải thích)
3. **Checklist** chuẩn bị trước buổi N+1 (3–5 mục)
4. **Quick Quiz** (3–5 câu trắc nghiệm, optional)

---

## 📐 Kiến trúc kỹ thuật

### Workflow Pattern: Prompt Chaining

```
INPUT                          PROCESSING                           OUTPUT
─────────                      ──────────                           ──────

┌──────────────┐   ┌─────────────────────────────────────────┐   ┌──────────────┐
│ transcript   │   │                                         │   │  JSON/MD     │
│ buổi N-1     │──▶│  LLM Call 1: Sinh Recap buổi N-1       │   │  · recap     │
│ (markdown)   │   │  - Tóm tắt 5-7 ý chính                │   │  · bridge    │
├──────────────┤   │  - Kèm citation [Txx-NNN] / [slide Y]  │   │  · checklist │
│ slide        │   │                                         │   │  · quiz      │
│ buổi N-1     │──▶│           ↓ Gate: có cite? ↓            │──▶│              │
│ (text)       │   │                                         │   └──────┬───────┘
├──────────────┤   │  LLM Call 2: Sinh Bridge + Checklist    │          │
│ transcript   │   │  - So sánh nội dung 2 buổi              │          ▼
│ buổi N       │──▶│  - Tìm 2-4 liên kết có căn cứ          │   ┌──────────────┐
│ (markdown)   │   │  - Sinh checklist 3-5 mục               │   │  UI Render   │
├──────────────┤   │  - Sinh quiz (optional)                 │   │  (HTML/CSS)  │
│ slide        │   │                                         │   └──────────────┘
│ buổi N       │──▶│                                         │
│ (text)       │   └─────────────────────────────────────────┘
└──────────────┘
```

### Tech Stack đề xuất

| Thành phần | Lựa chọn | Lý do |
|---|---|---|
| **LLM API** | Google Gemini (gemini-2.0-flash) | Free tier ~1.500 req/ngày, đủ cho hackathon |
| **Backend** | Python (script đơn giản) | Đọc file markdown → gọi API → parse output |
| **Frontend** | HTML/CSS/JS tĩnh hoặc v0.dev | Mock UI, không cần server phức tạp |
| **Data** | Transcript .md + Slide .txt (đã extract) | 6 transcript + 2 slide text có sẵn |

---

## 📋 Phân rã công việc — 7 task

### Task 3.1 — Dựng UI Skeleton (CP2: 17:00 N1)
**Mục tiêu**: Flow chính bấm đi hết được

**Cụ thể**:
- Tạo 1 trang HTML hiển thị giao diện "Learning Bridge"
- Có dropdown chọn buổi học (Day 01 → Day 02, Day 02 → Day 03...)
- 4 section: Recap | Bridge Map | Checklist | Quiz
- Nút "Bỏ qua recap" luôn hiện (nguyên tắc G8)
- Nút 👍👎 + "Sai chỗ nào?" (nguyên tắc G15)
- Có thể dùng data giả (hardcode) ban đầu

**Output**: `codebase/src/index.html` + `codebase/src/style.css`  
**Tiêu chí xong**: Bấm qua hết flow, nhìn thấy 4 section (dù data giả)

---

### Task 3.2 — Xử lý Input: Load & Chunk tài liệu
**Mục tiêu**: Đọc transcript + slide text → chuẩn bị context cho LLM

**Cụ thể**:
- Viết script Python đọc file transcript (`transcript-XX-clean.md`)
- Đọc slide text (đã extract ở `scratch_d1.txt`, `scratch_d2.txt` — hoặc extract lại)
- Mapping buổi nào → file nào:

| Buổi | Transcript | Slide | Ghi chú |
|---|---|---|---|
| Day 1 (Foundation) | `transcript-04-clean.md` + `transcript-06-clean.md` | `d1-slide-hackathon.pdf` → text | Tin cậy cao |
| Day 2 (Bài toán AI) | `transcript-01-clean.md` + `transcript-02-clean.md` + `transcript-03-clean.md` | `d2-slide-hackathon.pdf` → text | Tin cậy cao–vừa |
| Buổi khác | `transcript-05-clean.md` | — | Không gắn số ngày |

- Chunk nếu quá dài (>100K tokens) — ưu tiên giữ nguyên nếu model chấp nhận
- Output: dict/object `{day_code: str, transcript_text: str, slide_text: str}`

**Output**: `codebase/src/data_loader.py`  
**Tiêu chí xong**: Load được transcript + slide cho ít nhất cặp Day 1 → Day 2

---

### Task 3.3 — Tích hợp LLM API (CP3: 10:30 N2)
**Mục tiêu**: ≥1 lời gọi AI thật ở quyết định trung tâm

**Cụ thể**:
- Gọi Gemini API (hoặc Claude/OpenAI) với prompt từ Người 4
- 2 lời gọi chính:
  - **Call 1**: System prompt + transcript/slide buổi N-1 → Recap (5-7 ý + citation)
  - **Call 2**: System prompt + transcript/slide buổi N-1 + buổi N → Bridge + Checklist + Quiz
- Gate giữa 2 call: kiểm tra recap có citation không → nếu không → retry (max 2 lần)
- Parse output JSON/markdown → lưu vào `codebase/outputs/`
- Log đầy đủ: input tokens, output tokens, model used, latency

**Output**: `codebase/src/llm_client.py` + `codebase/outputs/`  
**Tiêu chí xong**: Gọi API thật, nhận recap + bridge cho Day 1 → Day 2, log trace có trong repo

**⚠️ Lưu ý an toàn**:
- API key trong `.env`, KHÔNG hardcode
- Chỉ đưa data pack tối thiểu vào API (transcript trích đoạn nếu quá dài)
- Log KHÔNG chứa API key

---

### Task 3.4 — Parse Output & Render UI
**Mục tiêu**: Hiển thị kết quả AI lên giao diện

**Cụ thể**:
- Parse JSON/markdown output từ LLM thành structured data:
  ```json
  {
    "recap": [
      {"point": "LLM không phải chatbot — là bộ não ngôn ngữ nền", "citation": "slide 10"}
    ],
    "bridge": [
      {"from_concept": "Giới hạn bẩm sinh", "from_ref": "Day 01, slide 20",
       "to_concept": "Khi nào AI KHÔNG phù hợp", "to_ref": "Day 02, slide 14-15",
       "explanation": "Day 02 dùng chính những giới hạn này để phân tích..."}
    ],
    "checklist": ["Ôn lại: LLM có 3 giới hạn bẩm sinh nào? (slide 20)", ...],
    "quiz": [{"question": "...", "options": [...], "answer": "..."}]
  }
  ```
- Render lên UI (cập nhật `index.html` từ data giả → data thật)
- Citation hiển thị dạng badge clickable: `[slide 20]`, `[T04-045]`

**Output**: `codebase/src/renderer.js` (hoặc Python template)  
**Tiêu chí xong**: UI hiển thị recap + bridge + checklist từ data AI thật

---

### Task 3.5 — Implement 4 đường đi trải nghiệm
**Mục tiêu**: Demo được happy path + 3 edge case

**Cụ thể**:

| Đường đi | Trigger | Hành vi UI | Hành vi AI |
|---|---|---|---|
| ✅ **Happy path** | Vào Day 02, transcript Day 01 đầy đủ | Hiện recap 5-7 ý + bridge 2-4 liên kết + checklist + quiz | LLM call bình thường |
| ⚠️ **Low-confidence** | Transcript buổi ngắn/thiếu | Hiện recap ngắn + banner vàng "⚠️ Dữ liệu chưa đầy đủ — xem slide gốc" | LLM call + gate phát hiện ít citation |
| ❌ **Failure** | 2 buổi ít overlap HOẶC LLM call lỗi | Hiện "Hai buổi này ít liên kết — bạn có thể bắt đầu bài mới ngay" | Fallback graceful |
| 🔄 **Correction** | User bấm 👎 | Modal "Sai chỗ nào?" → log feedback → cảm ơn | Log vào `outputs/feedback.json` |

**Output**: Logic xử lý trong code + UI states  
**Tiêu chí xong**: Demo được cả 4 đường trước TA

---

### Task 3.6 — Mock Knowledge Map
**Mục tiêu**: Hiển thị sơ đồ liên kết kiến thức (mock)

**Cụ thể**:
- Tạo sơ đồ Mermaid hoặc HTML/SVG tĩnh hiển thị:
  ```
  Day 01                     Day 02
  ┌────────────────┐         ┌────────────────┐
  │ Giới hạn LLM   │───🔗──▶│ Khi nào không  │
  │ [slide 20]      │         │ dùng AI [s14]  │
  ├────────────────┤         ├────────────────┤
  │ 4 Level Agent  │───🔗──▶│ Rule/Workflow/ │
  │ [slide 23-24]   │         │ Agent [s18-19] │
  └────────────────┘         └────────────────┘
  ```
- Có thể dùng Mermaid.js để render trong HTML
- Đây là phần MOCK — ghi rõ trong spec

**Output**: Phần knowledge map trong `index.html`  
**Tiêu chí xong**: Nhìn thấy sơ đồ liên kết giữa 2 buổi

---

### Task 3.7 — Backup Demo
**Mục tiêu**: Có bản backup phòng live hỏng

**Cụ thể**:
- Screenshot từng màn hình (4 đường đi)
- Record video ngắn (30s–1min) chạy qua flow
- Lưu vào `codebase/outputs/demo-backup/`

**Output**: Screenshots + video  
**Tiêu chí xong**: Nếu live hỏng, vẫn demo được bằng backup

---

## 🗂️ Cấu trúc file cuối cùng

```
codebase/
├── README.md                    ← mô tả prototype (đã có)
├── .env.example                 ← template API key
├── prompts/                     ← ⚡ phối hợp với Người 4
│   ├── system_prompt.md
│   ├── recap_prompt.md
│   └── bridge_prompt.md
├── src/
│   ├── index.html               ← UI chính
│   ├── style.css                ← styling
│   ├── app.js                   ← logic frontend
│   ├── data_loader.py           ← load transcript/slide
│   ├── llm_client.py            ← gọi LLM API
│   └── main.py                  ← orchestrator (chạy pipeline)
└── outputs/
    ├── demo-backup/             ← screenshots + video
    ├── trace_day1_to_day2.json  ← log/trace lời gọi AI
    └── feedback.json            ← log user feedback (👍👎)
```

---

## ⏰ Timeline cá nhân (K4)

```
═══════════════════════════════════════════════════════════════
  NGÀY 1 — CHIỀU + TỐI
═══════════════════════════════════════════════════════════════

  15:00-17:00  ▶ Task 3.1: Dựng UI skeleton
               ▶ Task 3.2: Viết data_loader.py (load transcript)
               
  17:00        CP2 — Show flow bấm được ✅
  
  17:00-22:00  ▶ Task 3.3: Tích hợp LLM API (gọi thật)
               ▶ Task 3.4: Parse output → render UI
               ⚡ Phối hợp Người 4: nhận prompt template

  22:00-23:59  ▶ Polish: đảm bảo AI call chạy ổn
               ▶ Commit code lên repo

═══════════════════════════════════════════════════════════════
  NGÀY 2 — SÁNG + CHIỀU
═══════════════════════════════════════════════════════════════

  08:00-10:30  ▶ Task 3.5: Implement 4 đường đi
               ▶ Fix bug từ đêm qua
               ⚡ Phối hợp Người 4: chạy golden set trên prototype

  10:30        CP3 — AI chạy thật + log/trace ✅

  10:30-12:00  ▶ Task 3.6: Mock knowledge map (Mermaid)
               ▶ Task 3.7: Backup demo (screenshot/video)

  12:00        CP4 — Chốt tiến độ

  12:00-14:00  ▶ Hỗ trợ Người 5 chạy validation
               ▶ Fix issue từ feedback
               ▶ Dry run demo

  14:00        CP5 — Xác minh ✅
  15:00        CP6 — DEMO 🎤
```

---

## 🤝 Điểm phối hợp quan trọng

| Phối hợp với | Nội dung | Khi nào |
|---|---|---|
| **Người 4 (Eval & Prompt)** | Nhận prompt template → tích hợp vào `llm_client.py` | 15:00–17:00 N1 |
| **Người 4 (Eval & Prompt)** | Chạy golden set trên prototype → feedback về output quality | 08:00–10:30 N2 |
| **Người 2 (Spec & Design)** | Tham vấn 4 đường đi trải nghiệm: happy/low-conf/failure/correction | 17:00–22:00 N1 |
| **Người 5 (Validation)** | Hỗ trợ chạy prototype cho user test | 12:00–14:00 N2 |

---

## ✅ Checklist tự kiểm trước CP

### Trước CP2 (17:00 N1)
- [ ] UI skeleton bấm đi hết flow (dù data giả)
- [ ] Repo có commit đầu tiên trên branch `feature/build-prototype`

### Trước CP3 (10:30 N2)
- [ ] ≥1 lời gọi AI thật (không hardcode output)
- [ ] Log/trace có trong `codebase/outputs/`
- [ ] Output hiển thị trên UI

### Trước CP5 (14:00 N2)
- [ ] 4 đường đi trải nghiệm demo được
- [ ] Knowledge map mock hiển thị
- [ ] Backup demo (screenshot/video) sẵn sàng
- [ ] **Tôi giải thích được MỌI phần code có tên mình**

### Trước CP6 (15:00 N2)
- [ ] Demo script chuẩn bị: 1 case chuẩn (happy) + 1 case chỗ khó (low-conf hoặc failure)
- [ ] Live demo chạy mượt ≥2 lần dry run

---

## ⚠️ Rủi ro & phương án B

| Rủi ro | Xác suất | Phương án B |
|---|---|---|
| API rate limit / hết free tier | Trung bình | Cache output → hiển thị từ file JSON đã lưu |
| API response quá chậm (>10s) | Thấp | Hiện loading spinner + timeout 15s → fallback |
| Output LLM không có citation | Cao | Gate + retry prompt kèm instruction "PHẢI có citation" |
| Transcript quá dài cho context window | Trung bình | Chunk theo đoạn (mã `[Txx-NNN]`), gửi đoạn relevant |
| UI không kịp làm đẹp | Thấp | Dùng v0.dev sinh UI nhanh, hoặc HTML thuần + CSS đơn giản |
