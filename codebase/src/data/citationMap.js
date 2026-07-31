/**
 * Single source of truth: citation slide numbers = 29-page hackathon PDF pages
 * (what PdfSlideCanvas / handleJumpToSlide actually opens).
 */
export const PDF_CITATIONS = {
  Day01: {
    llmChatbot: 'Day 01 - slide 10',
    token: 'Day 01 - slide 13, 27',
    hallucination: 'Day 01 - slide 20',
    cutoff: 'Day 01 - slide 20',
    context: 'Day 01 - slide 14',
    agent4: 'Day 01 - slide 23-24',
    prompt4: 'Day 01 - slide 28',
    temperature: 'Day 01 - slide 29',
    grounding: 'Day 01 - slide 20',
    transformer: 'Day 01 - slide 8',
    history: 'Day 01 - slide 5',
  },
  Day02: {
    pair: 'Day 02 - slide 13',
    ruleWorkflowAgent: 'Day 02 - slide 18-19',
    costOfError: 'Day 02 - slide 15, 17',
    hitl: 'Day 02 - slide 24',
    precisionRecall: 'Day 02 - slide 23',
    problemStatement: 'Day 02 - slide 27',
    doubleDiamond: 'Day 02 - slide 3',
    automateAugment: 'Day 02 - slide 17',
    reward: 'Day 02 - slide 22',
    feasibility: 'Day 02 - slide 27',
  }
};

/** Primary PDF page numbers for KB / jump targets */
export const PDF_PAGES = {
  Day01: {
    llmChatbot: [10],
    token: [13, 27],
    hallucination: [20],
    cutoff: [20],
    context: [14, 20],
    agent4: [23, 24],
    prompt4: [28],
    temperature: [29],
    grounding: [20],
    transformer: [8, 11, 15],
    history: [5],
  },
  Day02: {
    pair: [8, 13],
    ruleWorkflowAgent: [18, 19],
    costOfError: [15, 17],
    hitl: [17, 24],
    precisionRecall: [23],
    problemStatement: [9, 27],
    doubleDiamond: [3, 4],
    automateAugment: [17],
    reward: [22],
    feasibility: [27],
  }
};

/** Extract first slide number for jump */
export const firstSlideNum = (citation) => {
  const m = String(citation || '').match(/slide\s*(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
};

/** Smart Linker explanations mapping citations to deep product-thinking insights */
export const CITATION_EXPLANATIONS = {
  // Day 01 Citations
  'Day 01 - slide 10': 'Slide 10 ở Day 01 làm rõ sự khác biệt giữa LLM (Reasoning Engine - bộ não suy luận) và Chatbot (UI Layer - giao diện chat). Hiểu điều này giúp bạn thiết kế các Headless AI Service ẩn sau hệ thống.',
  'Day 01 - slide 13, 27': 'Slide 13 & 27 ở Day 01 giải thích cơ chế Tokenomics và lý do vì sao sinh Output Token đắt gấp 3-5 lần Input Token do phải xử lý tuần tự (Autoregressive).',
  'Day 01 - slide 20': 'Slide 20 ở Day 01 phân tích các giới hạn bẩm sinh của LLM (Hallucination - tự tin bịa tin, Cut-off Knowledge). Khái niệm Grounding ở Day 02 chính là giải pháp trực tiếp để hạn chế lỗi này.',
  'Day 01 - slide 14': 'Slide 14 ở Day 01 giới hạn về Context Window và hiện tượng "Lost in the Middle" (LLM dễ bỏ sót thông tin ở giữa văn bản dài). Bạn cần thiết kế RAG hoặc cắt nhỏ chunk để xử lý.',
  'Day 01 - slide 23-24': 'Slide 23-24 ở Day 01 định nghĩa 4 cấp độ Agent từ LLM trần (Naked LLM) đến Multi-Agent. Đây là nền tảng lý thuyết cho việc phân chia Cấp giải pháp (Rule/Workflow/Agent) ở Day 02.',
  'Day 01 - slide 28': 'Slide 28 ở Day 01 hướng dẫn cấu trúc Prompt 4 Lớp chuẩn hóa (System, User Input, Context, Output Format) để tối ưu độ chính xác và định dạng đầu ra cho AI.',
  'Day 01 - slide 29': 'Slide 29 ở Day 01 giải thích tham số Temperature (mức độ ngẫu nhiên từ 0.0 đến 2.0). Đặt Temperature = 0.0 cho các bài toán cần tính chính xác cao như trích xuất dữ liệu.',
  'Day 01 - slide 8': 'Slide 8 ở Day 01 giới thiệu kiến trúc Transformer và cơ chế Self-Attention đột phá giúp mô hình hiểu mối liên hệ giữa các từ ở khoảng cách xa.',
  'Day 01 - slide 5': 'Slide 5 ở Day 01 tóm tắt lịch sử 70 năm của Trí tuệ nhân tạo, điểm mốc từ phép thử Turing đến sự bùng nổ của Generative AI sau năm 2022.',
  
  // Day 02 Citations
  'Day 02 - slide 13': 'Slide 13 ở Day 02 giới thiệu khung câu hỏi PAIR. Trong đó câu đầu tiên cực kỳ quan trọng: AI có thực sự tạo ra thêm giá trị khác biệt so với giải pháp truyền thống (If/Else, Rule-based) hay không?',
  'Day 02 - slide 18-19': 'Slide 18-19 ở Day 02 phân tích 3 cấp độ giải pháp (Rule-based, Workflow, Agentic). Nguyên tắc cốt lõi là luôn bắt đầu thử nghiệm từ cấp thấp nhất (Rule-based) để kiểm chứng tính khả thi.',
  'Day 02 - slide 15, 17': 'Slide 15 & 17 ở Day 02 giải thích khái niệm Cost-of-error (Chi phí khi AI sai). Nếu chi phí này ở mức CAO (như y tế, tài chính), bắt buộc phải có con người kiểm duyệt (Human-in-the-loop).',
  'Day 02 - slide 24': 'Slide 24 ở Day 02 hướng dẫn thiết kế Human-in-the-loop (HITL) cho kịch bản Augmentation: AI tạo bản nháp, con người duyệt và tinh chỉnh trước khi thực thi.',
  'Day 02 - slide 23': 'Slide 23 ở Day 02 phân tích sự đánh đổi giữa Precision (Độ chính xác - thà bỏ sót còn hơn sai) và Recall (Độ phủ - thà bắt nhầm còn hơn bỏ sót) trong thiết kế sản phẩm AI.',
  'Day 02 - slide 27': 'Slide 27 ở Day 02 cung cấp mẫu Problem Statement 9 Trường hoàn chỉnh - tài liệu cốt lõi để bóc tách yêu cầu mơ hồ thành bài toán AI khả thi.',
  'Day 02 - slide 3': 'Slide 3 ở Day 02 trình bày mô hình Double Diamond (Don Norman). Nhấn mạnh việc hội tụ tìm đúng bài toán trước khi bắt tay vào thiết kế giải pháp.',
  'Day 02 - slide 17': 'Slide 17 ở Day 02 phân biệt rõ ràng giữa Task Automation (tự động hóa 100%) và Task Augmentation (AI đề xuất gợi ý, người ra quyết định cuối).',
  'Day 02 - slide 22': 'Slide 22 ở Day 02 định nghĩa Reward Function và Success Criteria: làm rõ thế nào là một kết quả thành công của mô hình AI đối với nghiệp vụ.'
};

/** Helper to clean up citation string and get explanation */
export const getCitationExplanation = (citation) => {
  if (!citation) return null;
  // Normalize string: strip brackets, trim, fix whitespace
  const clean = citation.replace(/[\[\]]/g, '').trim();
  
  // Try exact match
  if (CITATION_EXPLANATIONS[clean]) return CITATION_EXPLANATIONS[clean];
  
  // Try partial match
  const keys = Object.keys(CITATION_EXPLANATIONS);
  const match = keys.find(k => clean.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(clean.toLowerCase()));
  if (match) return CITATION_EXPLANATIONS[match];
  
  // Fallback default AI explanation helper
  return `Tài liệu buổi học có đề cập thông tin này tại ${clean}. Trích dẫn này giúp củng cố kiến thức nền tảng và cung cấp ngữ cảnh lý thuyết thực tế để bạn đối chiếu trực tiếp trên slide.`;
};

