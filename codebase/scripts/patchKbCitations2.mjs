import fs from 'node:fs';

const p = new URL('../src/services/llmService.js', import.meta.url);
let s = fs.readFileSync(p, 'utf8');

const pageFixes = {
  "'pair-framework'": [8, 13],
  "'rule-workflow-agent'": [18, 19],
  "'cost-of-error'": [15, 17, 24],
  "'precision-recall'": [23],
  "'problem-statement-9'": [9, 27],
};

for (const [id, pages] of Object.entries(pageFixes)) {
  const idIdx = s.indexOf(`id: ${id}`);
  if (idIdx < 0) {
    console.warn('ID not found', id);
    continue;
  }
  const slice = s.slice(idIdx, idIdx + 220);
  const m = slice.match(/slidePages: \[[^\]]*\]/);
  if (!m) {
    console.warn('slidePages not found near', id);
    continue;
  }
  const old = m[0];
  const neu = `slidePages: [${pages.join(', ')}]`;
  s = s.slice(0, idIdx) + slice.replace(old, neu) + s.slice(idIdx + 220);
  console.log('OK', id, old, '->', neu);
}

const textFixes = [
  ['**Tại sao cần phân 3 cấp? [slide 8]**', '**Tại sao cần phân 3 cấp? [slide 18-19]**'],
  ['**Cost-of-Error là gì? [slide 10]**', '**Cost-of-Error là gì? [slide 15]**'],
  ['**Thiết kế Human-in-the-Loop (HITL) [slide 11]**', '**Thiết kế Human-in-the-Loop (HITL) [slide 24]**'],
  ['**Precision và Recall là gì? [slide 12]**', '**Precision và Recall là gì? [slide 23]**'],
  ['**Tại sao cần Problem Statement 9 Trường? [slide 13]**', '**Tại sao cần Problem Statement 9 Trường? [slide 27]**'],
  ['**Checklist Chất lượng Problem Statement [slide 25]:**', '**Checklist Chất lượng Problem Statement [slide 27]:**'],
  ["followup: 'Tiếp theo: Cost-of-Error quyết định Augment hay Automate [slide 10]'", "followup: 'Tiếp theo: Cost-of-Error quyết định Augment hay Automate [slide 15, 17]'"],
  ["followup: 'Hiểu thêm Precision vs Recall để chọn chiến lược đánh giá mô hình AI [slide 12]'", "followup: 'Hiểu thêm Precision vs Recall để chọn chiến lược đánh giá mô hình AI [slide 23]'"],
  ["followup: 'Kết hợp Precision/Recall với thiết kế Human-in-the-loop [slide 11]'", "followup: 'Kết hợp Precision/Recall với thiết kế Human-in-the-loop [slide 24]'"],
  ["followup: 'Thực hành viết Problem Statement cho bài toán của nhóm tại Lab chiều [slide 15]'", "followup: 'Thực hành viết Problem Statement cho bài toán của nhóm [slide 27]'"],
  ['**PAIR Framework là gì? [slide 6]**', '**PAIR Framework là gì? [slide 13]**'],
  ['**Câu hỏi PAIR 1: AI có tạo ra giá trị khác biệt không? [slide 7]**', '**Câu hỏi PAIR 1: AI có tạo ra giá trị khác biệt không? [slide 13]**'],
  ['**Câu hỏi PAIR 3: Reward Function & Success Criteria [slide 9]**', '**Câu hỏi PAIR 3: Reward Function & Success Criteria [slide 22]**'],
  ["followup: 'Hiểu thêm về Cost-of-Error để chọn Automate vs Augment [slide 10]'", "followup: 'Hiểu thêm về Cost-of-Error để chọn Automate vs Augment [slide 15, 17]'"],
];

for (const [from, to] of textFixes) {
  if (s.includes(from)) {
    s = s.replace(from, to);
    console.log('TEXT OK', from.slice(0, 40));
  }
}

fs.writeFileSync(p, s);
console.log('done');
