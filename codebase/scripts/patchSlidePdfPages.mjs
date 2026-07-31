import fs from 'node:fs';

const p = new URL('../src/data/courseData.js', import.meta.url);
let s = fs.readFileSync(p, 'utf8');

/** Map condensed slide title -> PDF page (29-page deck) */
const day01PdfByTitle = {
  'Bên trong LLM: Kiến trúc Transformer': 8,
  'Cơ chế Next Token Prediction': 11,
  'Token & Đơn vị đo lường': 13,
  'Tokenomics: Tại sao Output đắt hơn Input 3-5 lần?': 27,
  '4 Level Agent: Từ LLM trần đến Multi-Agent': 23,
  'Giới hạn 1: Cut-off Knowledge & Bong bóng thời gian': 20,
  'Giới hạn 2: Hallucination (Tự tin bịa tin)': 20,
  'Giới hạn 3: Context Window & Lost in the Middle': 14,
  'Prompt 4 Lớp chuẩn hóa': 28,
  'Nguồn sự thật (Source of Truth)': 20,
  'Tối ưu hóa Temperature & Top-P': 29,
  'Chi phí triển khai LLM thực tế': 27,
};

const day02PdfByTitle = {
  'Mô hình Double Diamond (Don Norman / Design Council)': 3,
  'Khung PAIR: 3 Câu hỏi bắt buộc': 13,
  'PAIR Bước 1: Có cần AI không?': 13,
  'PAIR Bước 2: 3 Cấp giải pháp (Rule / Workflow / Agent)': 18,
  'PAIR Bước 3: Reward Function & Success Criteria': 22,
  'Phân tích Cost-of-Error (Chi phí khi AI đoán sai)': 15,
  'Thiết kế Human-in-the-loop (HITL)': 24,
  'Precision vs Recall trong sản phẩm AI': 23,
  'Bản Problem Statement 9 Trường hoàn chỉnh': 27,
};

const subtitleFixes = [
  ["subtitle: 'Slide 16 · Tìm đúng bài toán trước khi làm'", "subtitle: 'Slide 3 · Tìm đúng bài toán trước khi làm'"],
  ["subtitle: 'Slide 22-23 · Quyết định UX sản phẩm'", "subtitle: 'Slide 15, 17 · Quyết định UX sản phẩm'"],
  ["subtitle: 'Slide 24 · Cân bằng Trade-off'", "subtitle: 'Slide 23 · Cân bằng Trade-off'"],
  ["subtitle: '1.000 token ≈ 750 từ'", "subtitle: 'Slide 13 · 1.000 token ≈ 750 từ'"],
  ["subtitle: 'Tham số điều khiển LLM'", "subtitle: 'Slide 29 · Tham số điều khiển LLM'"],
  ["subtitle: 'Nguyên tắc thiết kế sản phẩm AI'", "subtitle: 'Slide 20 · Nguyên tắc thiết kế sản phẩm AI'"],
];

for (const [from, to] of subtitleFixes) {
  if (s.includes(from)) s = s.replace(from, to);
}

const injectPdfPage = (title, pdfPage) => {
  const re = new RegExp(`(\\{ page: \\d+, title: '${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}')`);
  if (!re.test(s)) {
    console.warn('title miss', title);
    return;
  }
  // avoid double inject
  if (s.includes(`title: '${title}', pdfPage:`)) return;
  s = s.replace(re, `$1, pdfPage: ${pdfPage}`);
  console.log('pdfPage', title, '->', pdfPage);
};

Object.entries(day01PdfByTitle).forEach(([t, pge]) => injectPdfPage(t, pge));
Object.entries(day02PdfByTitle).forEach(([t, pge]) => injectPdfPage(t, pge));

fs.writeFileSync(p, s);
console.log('courseData patched');
