import fs from 'node:fs';

const p = new URL('../src/services/llmService.js', import.meta.url);
let s = fs.readFileSync(p, 'utf8');

const replacements = [
  ["slidePages: [3, 4, 5]", "slidePages: [3, 4]", "double-diamond pages"],
  ["followup: 'Sau khi tìm đúng bài toán, dùng PAIR Framework để chọn giải pháp AI [slide 6]'", "followup: 'Sau khi tìm đúng bài toán, dùng PAIR Framework để chọn giải pháp AI [slide 13]'"],
  ['**Diamond 1: Tìm đúng Bài toán (Problem Space) [slide 4-5]**', '**Diamond 1: Tìm đúng Bài toán (Problem Space) [slide 3-4]**'],

  ["id: 'pair-framework',\n    dayCode: 'Day02',\n    slidePages: [6, 7, 8, 9]", "id: 'pair-framework',\n    dayCode: 'Day02',\n    slidePages: [8, 13]"],
  ['**PAIR Framework là gì? [slide 6]**', '**PAIR Framework là gì? [slide 13]**'],
  ['**Câu hỏi PAIR 1: AI có tạo ra giá trị khác biệt không? [slide 7]**', '**Câu hỏi PAIR 1: AI có tạo ra giá trị khác biệt không? [slide 13]**'],
  ['**Câu hỏi PAIR 2: Chọn Automate hay Augment? Rule/Workflow/Agent? [slide 8]**', '**Câu hỏi PAIR 2: Chọn Automate hay Augment? Rule/Workflow/Agent? [slide 8, 17]**'],
  ['**Câu hỏi PAIR 3: Reward Function & Success Criteria [slide 9]**', '**Câu hỏi PAIR 3: Reward Function & Success Criteria [slide 22]**'],
  ["followup: 'Hiểu thêm về Cost-of-Error để chọn Automate vs Augment [slide 10]'", "followup: 'Hiểu thêm về Cost-of-Error để chọn Automate vs Augment [slide 15, 17]'"],

  ["id: 'rule-workflow-agent',\n    dayCode: 'Day02',\n    slidePages: [7, 8]", "id: 'rule-workflow-agent',\n    dayCode: 'Day02',\n    slidePages: [18, 19]"],
  ['**Tại sao cần phân 3 cấp? [slide 8]**\nKhông phải bài toán nào cũng cần AI phức tạp.', '**Tại sao cần phân 3 cấp? [slide 18-19]**\nKhông phải bài toán nào cũng cần AI phức tạp.'],
  ["followup: 'Tiếp theo: Cost-of-Error quyết định Augment hay Automate [slide 10]'", "followup: 'Tiếp theo: Cost-of-Error quyết định Augment hay Automate [slide 15, 17]'"],

  ["id: 'cost-of-error',\n    dayCode: 'Day02',\n    slidePages: [10, 11]", "id: 'cost-of-error',\n    dayCode: 'Day02',\n    slidePages: [15, 17, 24]"],
  ['**Cost-of-Error là gì? [slide 10]**', '**Cost-of-Error là gì? [slide 15]**'],
  ['**Thiết kế Human-in-the-Loop (HITL) [slide 11]**', '**Thiết kế Human-in-the-Loop (HITL) [slide 24]**'],
  ["followup: 'Hiểu thêm Precision vs Recall để chọn chiến lược đánh giá mô hình AI [slide 12]'", "followup: 'Hiểu thêm Precision vs Recall để chọn chiến lược đánh giá mô hình AI [slide 23]'"],

  ["id: 'precision-recall',\n    dayCode: 'Day02',\n    slidePages: [12]", "id: 'precision-recall',\n    dayCode: 'Day02',\n    slidePages: [23]"],
  ['**Precision và Recall là gì? [slide 12]**', '**Precision và Recall là gì? [slide 23]**'],
  ["followup: 'Kết hợp Precision/Recall với thiết kế Human-in-the-loop [slide 11]'", "followup: 'Kết hợp Precision/Recall với thiết kế Human-in-the-loop [slide 24]'"],

  ["id: 'problem-statement-9',\n    dayCode: 'Day02',\n    slidePages: [13, 15, 25]", "id: 'problem-statement-9',\n    dayCode: 'Day02',\n    slidePages: [9, 27]"],
  ['**Tại sao cần Problem Statement 9 Trường? [slide 13]**', '**Tại sao cần Problem Statement 9 Trường? [slide 27]**'],
  ['**Checklist Chất lượng Problem Statement [slide 25]:**', '**Checklist Chất lượng Problem Statement [slide 27]:**'],
  ["followup: 'Thực hành viết Problem Statement cho bài toán của nhóm tại Lab chiều [slide 15]'", "followup: 'Thực hành viết Problem Statement cho bài toán của nhóm [slide 27]'"],
];

let ok = 0;
for (const [from, to] of replacements) {
  if (!s.includes(from)) {
    console.warn('MISS:', from.slice(0, 70));
    continue;
  }
  s = s.replace(from, to);
  ok += 1;
}

fs.writeFileSync(p, s);
console.log(`Patched ${ok}/${replacements.length}`);
