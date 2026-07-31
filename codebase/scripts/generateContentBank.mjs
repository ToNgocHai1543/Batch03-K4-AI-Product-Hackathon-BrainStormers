/**
 * One-shot generator: builds ~200 grounded samples for Bridge/Quiz banks.
 * Run: node scripts/generateContentBank.mjs
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../src/data/bridgeContentBank.js');

// Citations MUST match 29-page hackathon PDF page numbers (jump targets).
const day01Topics = [
  { name: 'LLM vs Chatbot', slide: 'Day 01 - slide 10', key: 'llm-chatbot' },
  { name: 'Token & Tokenomics', slide: 'Day 01 - slide 13, 27', key: 'token' },
  { name: 'Hallucination', slide: 'Day 01 - slide 20', key: 'hallucination' },
  { name: 'Knowledge Cutoff', slide: 'Day 01 - slide 20', key: 'cutoff' },
  { name: 'Context Window', slide: 'Day 01 - slide 14', key: 'context' },
  { name: '4 Level Agent', slide: 'Day 01 - slide 23-24', key: 'agent4' },
  { name: 'Prompt 4 Lớp', slide: 'Day 01 - slide 28', key: 'prompt4' },
  { name: 'Temperature', slide: 'Day 01 - slide 29', key: 'temp' },
  { name: 'Grounding / Source of Truth', slide: 'Day 01 - slide 20', key: 'grounding' },
  { name: 'Transformer & Attention', slide: 'Day 01 - slide 8', key: 'transformer' },
];

const day02Topics = [
  { name: 'PAIR Framework', slide: 'Day 02 - slide 13', key: 'pair' },
  { name: 'Rule / Workflow / Agent', slide: 'Day 02 - slide 18-19', key: 'rwa' },
  { name: 'Cost-of-error', slide: 'Day 02 - slide 15, 17', key: 'coe' },
  { name: 'Human-in-the-loop', slide: 'Day 02 - slide 24', key: 'hitl' },
  { name: 'Precision vs Recall', slide: 'Day 02 - slide 23', key: 'pr' },
  { name: 'Problem Statement 9 Trường', slide: 'Day 02 - slide 27', key: 'ps9' },
  { name: 'Double Diamond', slide: 'Day 02 - slide 3', key: 'dd' },
  { name: 'Automate vs Augment', slide: 'Day 02 - slide 17', key: 'aa' },
  { name: 'Reward Function', slide: 'Day 02 - slide 22', key: 'reward' },
  { name: 'Feasibility kinh tế', slide: 'Day 02 - slide 27', key: 'feas' },
];

const recapTexts = {
  'llm-chatbot': [
    'LLM là Reasoning Engine nền tảng, còn Chatbot chỉ là lớp giao diện người dùng.',
    'Không nên đồng nhất LLM với ChatGPT App — LLM có thể chạy headless trong sản phẩm.',
    'LLM có thể trích xuất dữ liệu, phân loại intent, sinh code — không chỉ chat.',
  ],
  token: [
    'Token là đơn vị tính chi phí và độ dài ngữ cảnh của LLM.',
    'Output token thường đắt gấp 3–5 lần input vì sinh tuần tự autoregressive.',
    'Tối ưu độ dài câu trả lời giúp kiểm soát chi phí API khi scale người dùng.',
  ],
  hallucination: [
    'Hallucination: LLM có thể trả lời sai nhưng vẫn tự tin và mượt mà.',
    'Không tin tuyệt đối câu trả lời LLM nếu thiếu citation / grounding data.',
    'Hallucination là lý do cần Human-in-the-loop khi cost-of-error cao.',
  ],
  cutoff: [
    'Knowledge cutoff khiến LLM không biết sự kiện sau ngày cắt dữ liệu huấn luyện.',
    'Cần RAG hoặc Search Tool để cập nhật kiến thức ngoài cutoff.',
  ],
  context: [
    'Context window lớn vẫn có hiện tượng Lost in the Middle với văn bản dài.',
    'Đặt thông tin quan trọng ở đầu/cuối prompt và chia nhỏ tài liệu (chunking).',
  ],
  agent4: [
    '4 Level Agent: Naked LLM → Tool-using → Workflow → Multi-Agent.',
    'Không phải bài toán nào cũng cần Multi-Agent — ưu tiên cấp đơn giản trước.',
  ],
  prompt4: [
    'Prompt 4 lớp: System Instruction → User Input → Context → Output Format.',
    'Ép Output Format JSON giúp backend parse ổn định hơn văn bản tự do.',
  ],
  temp: [
    'Temperature thấp (≈0) cho kết quả nhất quán; cao hơn cho sáng tạo.',
    'Bài toán trích xuất dữ liệu nên dùng temperature thấp để giảm nhiễu.',
  ],
  grounding: [
    'Grounding cung cấp nguồn sự thật để AI tham chiếu thay vì tự bịa.',
    'Nguyên tắc G10: không có trong tài liệu thì trả lời không biết.',
  ],
  transformer: [
    'Self-Attention giúp Transformer hiểu quan hệ từ dù ở xa trong câu.',
    'Next Token Prediction là cơ chế vận hành cốt lõi của LLM.',
  ],
};

const bridgePairs = [
  ['hallucination', 'coe', 'Hallucination Day 01 → buộc phân tích Cost-of-error ở Day 02 trước khi Automate.'],
  ['hallucination', 'hitl', 'Vì LLM có thể bịa tin, Day 02 thiết kế HITL khi rủi ro cao.'],
  ['hallucination', 'aa', 'Hallucination giải thích vì sao Augment an toàn hơn Automate ở domain nhạy cảm.'],
  ['agent4', 'rwa', '4 Level Agent Day 01 được Day 02 cụ thể hóa thành Rule / Workflow / Agent.'],
  ['agent4', 'pair', 'Phân cấp agent giúp trả lời PAIR: có cần AI và cần cấp nào.'],
  ['token', 'feas', 'Tokenomics Day 01 là input để đánh giá feasibility kinh tế Day 02.'],
  ['token', 'ps9', 'Chi phí token đi vào trường dữ liệu/chi phí của Problem Statement 9 trường.'],
  ['prompt4', 'rwa', 'Prompt 4 lớp là khối xây dựng của Workflow (Prompt Chaining).'],
  ['prompt4', 'reward', 'Output Format rõ ràng hỗ trợ đo Reward Function / success criteria.'],
  ['grounding', 'hitl', 'Grounding + HITL giảm rủi ro khi AI sai trong sản phẩm thật.'],
  ['grounding', 'pr', 'Citation/grounding hỗ trợ chiến lược High Precision khi cost-of-error cao.'],
  ['context', 'ps9', 'Giới hạn context ảnh hưởng khả thi dữ liệu đầu vào trong Problem Statement.'],
  ['cutoff', 'pair', 'Cutoff nhắc PAIR: nếu cần dữ liệu realtime thì phải gắn tool/RAG.'],
  ['temp', 'reward', 'Temperature ảnh hưởng độ ổn định — liên quan tiêu chí thành công.'],
  ['transformer', 'pair', 'Hiểu cơ chế LLM giúp quyết định khi nào Rule đủ, khi nào cần LLM.'],
  ['llm-chatbot', 'aa', 'LLM không chỉ chatbot → có thể Augment quy trình nội bộ, không bắt buộc chat UI.'],
  ['llm-chatbot', 'rwa', 'Nếu chỉ cần if/else thì dùng Rule, không cần “chatbot LLM”.'],
  ['agent4', 'aa', 'Cấp Agent cao thường đi kèm Automate nhiều hơn → phải cân Cost-of-error.'],
  ['token', 'aa', 'Chi phí token cao có thể khiến Automate 100% không khả thi về kinh tế.'],
  ['grounding', 'ps9', 'Nguồn sự thật là tiêu chí Go/No-Go trong Problem Statement.'],
];

const quizBlueprints = [
  {
    q: 'LLM khác Chatbot ở điểm nào?',
    options: ['LLM chỉ là giao diện chat', 'LLM là Reasoning Engine; Chatbot là UI', 'Chatbot đắt hơn LLM', 'Không khác nhau'],
    correct: 1,
    explain: 'Chatbot là lớp UI; LLM mới là bộ não xử lý ngôn ngữ.',
    cite: 'Day 01 - slide 10',
  },
  {
    q: 'Vì sao output token thường đắt hơn input?',
    options: ['Vì font chữ lớn hơn', 'Vì sinh tuần tự autoregressive tốn tài nguyên hơn', 'Vì Google tính sai', 'Vì không dùng GPU'],
    correct: 1,
    explain: 'Output sinh từng bước; input xử lý song song nên rẻ hơn.',
    cite: 'Day 01 - slide 13, 27',
  },
  {
    q: 'Hallucination nghĩa là gì?',
    options: ['Model bị treo', 'Trả lời sai nhưng vẫn tự tin/mượt', 'Hết context window', 'Temperature = 0'],
    correct: 1,
    explain: 'LLM dự đoán token theo xác suất, không đảm bảo sự thật.',
    cite: 'Day 01 - slide 20',
  },
  {
    q: 'Khi cost-of-error cao nên chọn gì?',
    options: ['Automate 100%', 'Augment + Human-in-the-loop', 'Bỏ AI hoàn toàn luôn', 'Chỉ dùng Multi-Agent'],
    correct: 1,
    explain: 'Cần người duyệt khi AI sai gây hậu quả lớn.',
    cite: 'Day 02 - slide 15, 17',
  },
  {
    q: 'Nguyên tắc chọn cấp giải pháp Day 02?',
    options: ['Luôn dùng Agent', 'Bắt đầu từ Rule/Workflow đơn giản trước', 'Chỉ dùng Regex', 'Bỏ PAIR'],
    correct: 1,
    explain: 'Start simple: giảm chi phí và rủi ro.',
    cite: 'Day 02 - slide 18-19',
  },
  {
    q: 'PAIR Framework trả lời câu nào trước?',
    options: ['Chọn màu UI', 'AI có tạo giá trị khác biệt không?', 'Thuê bao nhiêu GPU', 'Viết blog'],
    correct: 1,
    explain: 'PAIR bắt đầu từ việc có cần AI hay không.',
    cite: 'Day 02 - slide 13',
  },
  {
    q: 'Prompt 4 lớp gồm thành phần nào?',
    options: ['Chỉ User Input', 'System, User, Context, Output Format', 'Chỉ Temperature', 'Chỉ API Key'],
    correct: 1,
    explain: 'Cấu trúc 4 lớp giúp ổn định và giảm hallucination.',
    cite: 'Day 01 - slide 28',
  },
  {
    q: 'Temperature ≈ 0 phù hợp bài toán nào?',
    options: ['Brainstorm sáng tạo', 'Trích xuất dữ liệu/code cần nhất quán', 'Viết thơ tự do', 'Sinh meme'],
    correct: 1,
    explain: 'Temperature thấp giảm ngẫu nhiên, tăng tính tái lập.',
    cite: 'Day 01 - slide 29',
  },
  {
    q: 'High Precision nghĩa là gì trong sản phẩm AI?',
    options: ['Thà bắt nhầm còn hơn bỏ sót', 'Thà bỏ sót còn hơn bắt nhầm/sai', 'Luôn Automate', 'Bỏ HITL'],
    correct: 1,
    explain: 'Domain pháp lý/y tế ưu tiên Precision cao.',
    cite: 'Day 02 - slide 23',
  },
  {
    q: 'Knowledge cutoff giải quyết bằng cách nào?',
    options: ['Tăng temperature', 'RAG / Search Tool / dữ liệu cập nhật', 'Xóa system prompt', 'Giảm top-p xuống 0'],
    correct: 1,
    explain: 'Cần nguồn dữ liệu ngoài cutoff.',
    cite: 'Day 01 - slide 20',
  },
  {
    q: 'Tokenomics hỗ trợ bước nào ở Day 02?',
    options: ['Chọn font slide', 'Đánh giá feasibility/chi phí vận hành', 'Viết nhật ký cảm xúc', 'Tắt HITL'],
    correct: 1,
    explain: 'Chi phí token ảnh hưởng Go/No-Go kinh tế.',
    cite: 'Day 01 - slide 27 → Day 02 - slide 27',
  },
  {
    q: 'Lost in the Middle là gì?',
    options: ['Mất API key', 'Thông tin giữa văn bản dài dễ bị bỏ sót', 'Hết tiền GPU', 'Lỗi CSS'],
    correct: 1,
    explain: 'Context dài không đồng nghĩa nhớ đều mọi đoạn.',
    cite: 'Day 01 - slide 14',
  },
  {
    q: 'Human-in-the-loop dùng khi nào?',
    options: ['Luôn luôn kể cả gợi ý nhạc', 'Khi AI sai gây thiệt hại lớn', 'Khi không có dữ liệu', 'Khi temperature = 1'],
    correct: 1,
    explain: 'HITL phù hợp cost-of-error cao.',
    cite: 'Day 02 - slide 24',
  },
  {
    q: 'Rule-based khác Agent chỗ nào?',
    options: ['Rule tự lập kế hoạch', 'Rule theo luật cố định; Agent tự quyết bước tiếp', 'Agent rẻ hơn Rule', 'Không khác'],
    correct: 1,
    explain: 'Rule deterministic; Agent linh hoạt nhưng rủi ro/chi phí cao hơn.',
    cite: 'Day 02 - slide 18-19',
  },
  {
    q: 'Grounding giúp gì?',
    options: ['Tăng hallucination', 'Neo câu trả lời vào nguồn sự thật', 'Xóa citation', 'Tắt JSON mode'],
    correct: 1,
    explain: 'Cung cấp dữ liệu thật vào prompt để kiểm chứng.',
    cite: 'Day 01 - slide 20',
  },
  {
    q: 'Double Diamond nhấn mạnh điều gì?',
    options: ['Code trước hỏi sau', 'Tìm đúng bài toán trước khi giải', 'Chỉ cần Deliver', 'Bỏ Discovery'],
    correct: 1,
    explain: 'Tránh xây đúng sản phẩm nhưng sai vấn đề.',
    cite: 'Day 02 - slide 3',
  },
  {
    q: 'Level 2 Agent (Tool-using) khác Level 1 chỗ nào?',
    options: ['Không khác', 'Được gắn công cụ bên ngoài (search, code, DB)', 'Không dùng prompt', 'Chỉ chạy offline'],
    correct: 1,
    explain: 'Tool-using cho phép gọi API/tool khi cần.',
    cite: 'Day 01 - slide 23',
  },
  {
    q: 'Reward Function dùng để làm gì?',
    options: ['Trang trí UI', 'Định nghĩa thế nào là câu trả lời đúng/thành công', 'Tăng temperature', 'Xóa checklist'],
    correct: 1,
    explain: 'Không đo được thì không cải thiện được.',
    cite: 'Day 02 - slide 22',
  },
  {
    q: 'Khi nào KHÔNG nên dùng AI?',
    options: ['Bài toán bất định ngôn ngữ', 'Có thể giải bằng if/else chính xác 100%', 'Cần tóm tắt văn bản', 'Cần dịch thuật'],
    correct: 1,
    explain: 'PAIR: đừng dùng AI nếu phần mềm thường đủ.',
    cite: 'Day 02 - slide 13',
  },
  {
    q: 'Augment khác Automate chỗ nào?',
    options: ['Augment = AI tự quyết 100%', 'Augment = AI đề xuất, người duyệt', 'Automate luôn rẻ hơn', 'Không liên quan HITL'],
    correct: 1,
    explain: 'Augment giữ human-in-the-loop.',
    cite: 'Day 02 - slide 22',
  },
];

const checklistSeeds = [
  'Ôn lại khái niệm {t1} ({s1})',
  'Giải thích bằng lời của bạn: {t1}',
  'Đối chiếu slide {s1} với ghi chú cá nhân',
  'Liên hệ {t1} với {t2} trước buổi học mới',
  'Viết 1 ví dụ thực tế áp dụng {t2}',
  'Chuẩn bị 1 bài toán doanh nghiệp liên quan {t2}',
  'Kiểm tra bạn phân biệt được {t1} và {t2}',
  'Ghi chú risk/cost-of-error nếu dùng {t1} trong sản phẩm',
  'Liệt kê 3 câu hỏi muốn hỏi TA về {t1}',
  'Mở PDF và đọc lại trang liên quan {s1}',
  'Tóm tắt {t1} trong 2 câu cho đồng đội',
  'Đánh dấu chỗ còn mơ hồ về {t2} để hỏi lại',
  'So sánh Augment vs Automate với ngữ cảnh {t2}',
  'Xác định cấp Rule/Workflow/Agent cho bài toán gắn với {t1}',
  'Kiểm tra citation của {t1} còn đúng slide không',
];

const recap = [];
let rid = 1;
for (const topic of day01Topics) {
  const texts = recapTexts[topic.key] || [`Khái niệm cốt lõi: ${topic.name}.`];
  texts.forEach((text, i) => {
    recap.push({
      id: `recap_${rid}`,
      text,
      citation: topic.slide,
      refId: `slide-${topic.key}-${i + 1}`,
      topic: topic.key,
    });
    rid += 1;
  });
}
// expand recap variants to ~50
const recapExtras = [
  'Tóm tắt nhanh: {name} là nền tảng chuyển tiếp sang Day 02.',
  'Học viên cần nắm vững {name} trước khi làm Problem Statement.',
  '{name} xuất hiện nhiều lần trong lab và quiz chuyển tiếp.',
  'Nếu quên {name}, hãy mở lại {slide} trước khi sang PAIR.',
  'Gợi ý ôn tập: viết lại định nghĩa {name} không nhìn slide.',
];
for (const topic of day01Topics) {
  for (const tpl of recapExtras) {
    if (recap.length >= 50) break;
    recap.push({
      id: `recap_${rid++}`,
      text: tpl.replaceAll('{name}', topic.name).replaceAll('{slide}', topic.slide),
      citation: topic.slide,
      refId: `slide-${topic.key}-x`,
      topic: topic.key,
    });
  }
  if (recap.length >= 50) break;
}

const bridgeLinks = [];
let bid = 1;
for (const [srcKey, tgtKey, explanation] of bridgePairs) {
  const src = day01Topics.find((t) => t.key === srcKey);
  const tgt = day02Topics.find((t) => t.key === tgtKey);
  if (!src || !tgt) continue;
  bridgeLinks.push({
    id: `b_${bid++}`,
    sourceConcept: src.name,
    sourceRef: src.slide,
    targetConcept: tgt.name,
    targetRef: tgt.slide,
    explanation,
  });
}
// expand bridge variants
const bridgeSuffix = [
  ' Đây là cầu nối kiến thức bắt buộc trước lab Day 02.',
  ' Học viên nên click citation để đối chiếu slide gốc.',
  ' Nếu bỏ qua liên kết này dễ chọn sai cấp giải pháp.',
  ' Dùng liên kết này để giải thích cho đồng đội trong nhóm.',
];
const baseBridges = [...bridgeLinks];
for (const b of baseBridges) {
  for (const suffix of bridgeSuffix) {
    if (bridgeLinks.length >= 50) break;
    bridgeLinks.push({
      ...b,
      id: `b_${bid++}`,
      explanation: b.explanation + suffix,
    });
  }
  if (bridgeLinks.length >= 50) break;
}

const checklist = [];
let cid = 1;
for (const t1 of day01Topics) {
  for (const t2 of day02Topics.slice(0, 4)) {
    for (const tpl of checklistSeeds.slice(0, 2)) {
      if (checklist.length >= 40) break;
      checklist.push({
        id: `ck_${cid++}`,
        text: tpl
          .replaceAll('{t1}', t1.name)
          .replaceAll('{s1}', t1.slide)
          .replaceAll('{t2}', t2.name),
        done: false,
        topic: t1.key,
      });
    }
    if (checklist.length >= 40) break;
  }
  if (checklist.length >= 40) break;
}

const quiz = [];
let qid = 1;
const optionNoise = [
  (opts) => opts,
  (opts) => [opts[0], opts[2], opts[1], opts[3]],
  (opts) => [opts[3], opts[1], opts[2], opts[0]],
];

for (const bp of quizBlueprints) {
  for (let v = 0; v < 3; v += 1) {
    const shuffledOpts = optionNoise[v]([...bp.options]);
    const correctText = bp.options[bp.correct];
    const correctAnswer = shuffledOpts.indexOf(correctText);
    quiz.push({
      id: `q_${qid++}`,
      question: v === 0 ? bp.q : `${bp.q} (biến thể ${v + 1})`,
      options: shuffledOpts,
      correctAnswer,
      explanation: bp.explain,
      citation: bp.cite,
    });
  }
}

// more quiz from topic pairs to reach ~60
const pairQuizTpl = [
  {
    q: 'Liên kết đúng nhất giữa {s} và {t} là gì?',
    options: [
      'Hai khái niệm không liên quan',
      '{s} ở Day 01 tạo nền để hiểu/áp dụng {t} ở Day 02',
      '{t} thay thế hoàn toàn {s}',
      'Chỉ cần nhớ {t}, bỏ {s}',
    ],
    correct: 1,
    explain: '{s} là tiền đề; {t} là bước áp dụng thiết kế sản phẩm.',
  },
  {
    q: 'Nếu bỏ qua {s} khi học {t}, rủi ro nào dễ xảy ra?',
    options: [
      'Không có rủi ro',
      'Chọn sai cấp giải pháp / đánh giá rủi ro AI sai',
      'PDF không mở được',
      'Temperature tự tăng',
    ],
    correct: 1,
    explain: 'Thiếu nền {s} dẫn tới quyết định thiết kế {t} thiếu căn cứ.',
  },
];

for (const [srcKey, tgtKey] of bridgePairs) {
  const src = day01Topics.find((t) => t.key === srcKey);
  const tgt = day02Topics.find((t) => t.key === tgtKey);
  if (!src || !tgt) continue;
  for (const tpl of pairQuizTpl) {
    if (quiz.length >= 60) break;
    quiz.push({
      id: `q_${qid++}`,
      question: tpl.q.replaceAll('{s}', src.name).replaceAll('{t}', tgt.name),
      options: tpl.options.map((o) => o.replaceAll('{s}', src.name).replaceAll('{t}', tgt.name)),
      correctAnswer: tpl.correct,
      explanation: tpl.explain.replaceAll('{s}', src.name).replaceAll('{t}', tgt.name),
      citation: `${src.slide} → ${tgt.slide}`,
    });
  }
  if (quiz.length >= 60) break;
}

const file = `// AUTO-GENERATED by scripts/generateContentBank.mjs — do not hand-edit bulk entries.
// Total samples ≈ ${recap.length + bridgeLinks.length + checklist.length + quiz.length}

export const RECAP_BANK = ${JSON.stringify(recap, null, 2)};

export const BRIDGE_LINK_BANK = ${JSON.stringify(bridgeLinks, null, 2)};

export const CHECKLIST_BANK = ${JSON.stringify(checklist, null, 2)};

export const QUIZ_BANK = ${JSON.stringify(quiz, null, 2)};

export const BANK_STATS = {
  recap: RECAP_BANK.length,
  bridgeLinks: BRIDGE_LINK_BANK.length,
  checklist: CHECKLIST_BANK.length,
  quiz: QUIZ_BANK.length,
  total: RECAP_BANK.length + BRIDGE_LINK_BANK.length + CHECKLIST_BANK.length + QUIZ_BANK.length
};
`;

writeFileSync(outPath, file, 'utf8');
console.log('Wrote', outPath);
console.log({
  recap: recap.length,
  bridgeLinks: bridgeLinks.length,
  checklist: checklist.length,
  quiz: quiz.length,
  total: recap.length + bridgeLinks.length + checklist.length + quiz.length,
});
