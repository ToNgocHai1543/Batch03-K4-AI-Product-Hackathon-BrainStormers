/**
 * VLearn — AI Learning Bridge Application Logic (Task 3.1 & Prototype Engine)
 * Handles UI interactions, session data rendering, state switching for 4 experience paths,
 * citation modal, quiz checking, and user feedback logs (HAX G15).
 */

// ==========================================================================
// 1. Mock Data Dictionary for Session Pairs
// ==========================================================================
const SESSIONS_DATA = {
    'd1-d2': {
        title: 'Cầu Nối Kiến Thức: Day 01 ➔ Day 02',
        desc: 'AI đã phân tích Day 01 (AI & LLM Foundation) và tự động kết nối với các khái niệm cần thiết cho Day 02 (Xác định bài toán cho AI).',
        recap: [
            {
                id: 'r1',
                point: 'LLM không phải chatbot — mà là một bộ não ngôn ngữ nền (Foundation Model) dùng chung cho nhiều tác vụ.',
                citation: 'Slide 10',
                sourceQuote: 'LLM (Large Language Model) là một mô hình ngôn ngữ rất lớn, dựa trên kiến trúc Transformer, được luyện trên hàng nghìn tỷ mảnh chữ... Chatbot chỉ là lớp áo đóng gói bên ngoài bộ não đó.'
            },
            {
                id: 'r2',
                point: 'Token = mảnh chữ. Output token đắt gấp 3–5 lần Input token do cỗ máy phải sinh tuần tự.',
                citation: 'Slide 13, 27',
                sourceQuote: 'Input token = chữ bạn gửi đi (rẻ). Output token = chữ model viết ra (đắt ×3–5 lần). Hóa đơn mỗi lượt = Input + Output tokens.'
            },
            {
                id: 'r3',
                point: '3 Giới hạn bẩm sinh của cỗ máy đoán token: Bong bóng thời gian (cutoff), Hallucination (tự tin nói sai), Bàn làm việc có hạn (context limit).',
                citation: 'Slide 20',
                sourceQuote: 'Giới hạn bẩm sinh: Học giả trong bong bóng. Đây không phải lỗi tạm thời mà là bản chất cỗ máy đoán token. Vì vậy cần prompt tốt, context sạch, tra sổ (RAG), tools và kiểm chứng.'
            },
            {
                id: 'r4',
                point: 'Hành trình phát triển Agent qua 4 cấp độ: Level 0 (LLM trần) ➔ Level 1 (Có tools/RAG) ➔ Level 2 (Planning/Lập kế hoạch) ➔ Level 3 (Multi-agent team).',
                citation: 'Slide 23–24',
                sourceQuote: 'Agent = Goal + Reasoning + Tools + Memory + Action. Agent không phải một loại model khác mà là LLM được đặt vào vòng làm việc có mục tiêu và hành động.'
            },
            {
                id: 'r5',
                point: 'Giải phẫu Prompt gồm 4 lớp xếp chồng: System instruction ➔ User input ➔ Context bổ sung ➔ Output format.',
                citation: 'Slide 28',
                sourceQuote: '1 Prompt = 4 phần: Lớp 1 (System), Lớp 2 (User Input), Lớp 3 (Context), Lớp 4 (Output format mong muốn).'
            }
        ],
        bridge: [
            {
                id: 'b1',
                from: 'Giới hạn bẩm sinh (Hallucination)',
                fromRef: 'Day 01, Slide 20',
                to: 'Khi nào AI KHÔNG phù hợp (PAIR NOT Better)',
                toRef: 'Day 02, Slide 15',
                explanation: 'Do LLM tự tin nói sai và có rủi ro hallucination, Day 02 quy định bài toán yêu cầu 100% minh bạch tuyệt đối hoặc lỗi quá tốn kém (cost of error cao) thì KHÔNG NÊN dùng AI mà nên dùng Rule.'
            },
            {
                id: 'b2',
                from: '4 Level Agent',
                fromRef: 'Day 01, Slide 23-24',
                to: '3 Cấp độ giải pháp (Rule / Workflow / Agent)',
                toRef: 'Day 02, Slide 18-19',
                explanation: 'Nâng cấp từ khái niệm Level Agent sang lựa chọn thực tế: Luôn ưu tiên giải pháp đơn giản nhất (Rule), chỉ nâng lên Workflow hoặc Agent khi thực sự cần thiết.'
            },
            {
                id: 'b3',
                from: 'Token có giá (Chi phí)',
                fromRef: 'Day 01, Slide 27',
                to: 'Định lượng bài toán & Feasibility',
                toRef: 'Day 02, Slide 11-12',
                explanation: 'Hiểu chi phí output token giúp bạn tính toán đúng bài toán ROI và lựa chọn mức độ tự động hóa phù hợp trong Problem Statement.'
            }
        ],
        checklist: [
            { id: 'c1', text: 'Ôn lại: 3 giới hạn bẩm sinh của LLM là gì? (Slide 20)', done: false },
            { id: 'c2', text: 'Ôn lại: Phân biệt 4 level năng lực Agent từ LLM trần đến Multi-agent (Slide 23-24)', done: false },
            { id: 'c3', text: 'Chuẩn bị tâm thế Day 02: Tìm 1 bài toán thực tế bạn vướng phải trong công việc để thực hành', done: false }
        ],
        quiz: [
            {
                id: 'q1',
                question: 'Trường hợp nào sau đây PAIR khuyến cáo KHÔNG NÊN dùng AI mà nên dùng Rule/Script?',
                options: [
                    'A. Cần gợi ý sản phẩm cá nhân hóa cho từng người',
                    'B. Cần tính toán thuế thu nhập chính xác 100% theo luật hiện hành',
                    'C. Tóm tắt email dài thành 3 ý chính',
                    'D. Phân loại cảm xúc khách hàng trong khảo sát'
                ],
                answerIndex: 1,
                explanation: 'Đúng! Tính toán thuế yêu cầu chính xác 100%, có quy định pháp lý tường minh — đây là trường hợp "Lỗi quá tốn kém" và "Thông tin cố định" mà PAIR chỉ định dùng Rule thay vì AI (Slide 15 Day 02).'
            },
            {
                id: 'q2',
                question: 'Điểm khác biệt cốt lõi giữa Agent (Level 2/3) và cỗ máy LLM trần (Level 0) là gì?',
                options: [
                    'A. Agent có dung lượng tham số lớn hơn 100 lần',
                    'B. Agent có vòng lặp (Goal + Reasoning + Tools + Memory + Action) để tương tác ra đời thật',
                    'C. Agent không bao giờ mắc lỗi Hallucination',
                    'D. Agent chỉ chạy được trên phần cứng máy chủ riêng'
                ],
                answerIndex: 1,
                explanation: 'Chính xác! Agent là LLM được đặt vào vòng lặp làm việc có mục tiêu, kết nối tools/API và tự lập kế hoạch hành động (Slide 24 Day 01).'
            }
        ]
    },
    'd2-d3': {
        title: 'Cầu Nối Kiến Thức: Day 02 ➔ Day 03',
        desc: 'Kết nối từ Problem Statement & 3 cấp giải pháp (Day 02) sang Kiến trúc Multi-Agent & Build System (Day 03).',
        recap: [
            {
                id: 'r2_1',
                point: 'Mô hình Double Diamond: Tìm đúng vấn đề (Diamond 1) trước khi tìm giải pháp (Diamond 2).',
                citation: 'Day 02, Slide 3',
                sourceQuote: 'Giải pháp xuất sắc cho sai vấn đề còn tệ hơn không có giải pháp.'
            },
            {
                id: 'r2_2',
                point: '3 Cấp giải pháp Kỹ thuật: Rule (Luật tĩnh) ➔ Workflow (Chuỗi các bước) ➔ Agent (Tác nhân tự chủ).',
                citation: 'Day 02, Slide 18',
                sourceQuote: 'Luôn bắt đầu từ giải pháp đơn giản nhất bên trái, chỉ dịch sang bên phải khi giá trị tăng vượt độ phức tạp.'
            }
        ],
        bridge: [
            {
                id: 'b2_1',
                from: 'Workflow Patterns (Routing, Chaining)',
                fromRef: 'Day 02, Slide 20',
                to: 'Kiến trúc Orchestration Multi-Agent',
                toRef: 'Day 03, Slide 5',
                explanation: 'Patterns Routing & Chaining của Day 02 chính là khối dựng sơ khai để điều phối chuỗi nhiều Agent làm việc song song ở Day 03.'
            }
        ],
        checklist: [
            { id: 'c2_1', text: 'Chốt xong 9 trường Problem Statement cho nhóm', done: false },
            { id: 'c2_2', text: 'Xác định rõ mức Automation: Augment hay Automate', done: false }
        ],
        quiz: [
            {
                id: 'q2_1',
                question: 'Nguyên tắc Anthropic khuyến cáo về độ phức tạp khi xây dựng hệ thống AI là gì?',
                options: [
                    'A. Luôn dùng Multi-Agent để đạt kết quả ấn tượng',
                    'B. Luôn ưu tiên giải pháp đơn giản nhất (Prompting/Workflow), chỉ tăng độ phức tạp khi thực sự cần',
                    'C. Bỏ qua Rule-based vì đã cũ',
                    'D. Dùng model đắt nhất ở mọi công đoạn'
                ],
                answerIndex: 1,
                explanation: 'Đúng! Anthropic nhấn mạnh ưu tiên giải pháp đơn giản nhất có thể giải quyết được bài toán (Slide 20 Day 02).'
            }
        ]
    }
};

// Application State
let currentSessionKey = 'd1-d2';
let currentExperienceState = 'happy'; // 'happy' | 'low-confidence' | 'failure' | 'correction'

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    renderCurrentSession();
    initializeMermaid();
});

// Initialize Mermaid Diagram Engine
function initializeMermaid() {
    if (window.mermaid) {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Plus Jakarta Sans'
        });
    }
}

// ==========================================================================
// 2. Render Functions
// ==========================================================================

function handleSessionChange() {
    const select = document.getElementById('sessionSelect');
    currentSessionKey = select.value;
    renderCurrentSession();
}

function renderCurrentSession() {
    const data = SESSIONS_DATA[currentSessionKey] || SESSIONS_DATA['d1-d2'];

    // Header Title & Desc
    document.getElementById('bridgeTitle').innerText = data.title;
    document.getElementById('bridgeDesc').innerHTML = data.desc;

    // 1. Render Recap List
    renderRecapList(data.recap);

    // 2. Render Connection Cards
    renderConnectionGrid(data.bridge);

    // 3. Render Checklist
    renderChecklist(data.checklist);

    // 4. Render Quiz
    renderQuiz(data.quiz);

    // Re-render Mermaid if dynamic update occurs
    setTimeout(() => {
        if (window.mermaid) {
            try {
                mermaid.contentLoaded();
            } catch (e) {
                console.log('Mermaid reload note:', e);
            }
        }
    }, 100);
}

function renderRecapList(recapItems) {
    const container = document.getElementById('recapList');
    if (!recapItems || recapItems.length === 0) {
        container.innerHTML = `<div class="recap-item"><p class="recap-content">Chưa có nội dung tóm tắt cho buổi này.</p></div>`;
        return;
    }

    container.innerHTML = recapItems.map(item => `
        <div class="recap-item">
            <p class="recap-content">${item.point}</p>
            <span class="recap-citation" onclick="openCitationModal('${item.citation}', '${escapeQuote(item.sourceQuote)}')">
                📖 ${item.citation}
            </span>
        </div>
    `).join('');
}

function renderConnectionGrid(bridgeItems) {
    const container = document.getElementById('connectionGrid');
    if (!bridgeItems || bridgeItems.length === 0) {
        container.innerHTML = `<div class="connection-card"><p class="card-explanation">Chưa có sơ đồ liên kết.</p></div>`;
        return;
    }

    container.innerHTML = bridgeItems.map(item => `
        <div class="connection-card">
            <div class="card-header-flow">
                <span class="concept-from">${item.from}</span>
                <span class="flow-arrow">➔</span>
                <span class="concept-to">${item.to}</span>
            </div>
            <p class="card-explanation">${item.explanation}</p>
            <div class="card-footer-cit">
                <span class="recap-citation" onclick="openCitationModal('${item.fromRef}', 'Căn cứ nền tảng từ ${item.from}')">${item.fromRef}</span>
                <span class="recap-citation" onclick="openCitationModal('${item.toRef}', 'Căn cứ đích đến ở ${item.to}')">${item.toRef}</span>
            </div>
        </div>
    `).join('');
}

function renderChecklist(checklistItems) {
    const container = document.getElementById('checklistContainer');
    if (!checklistItems || checklistItems.length === 0) {
        container.innerHTML = `<p class="section-intro">Không có checklist.</p>`;
        return;
    }

    container.innerHTML = checklistItems.map((item, idx) => `
        <label class="check-item ${item.done ? 'completed' : ''}" id="checkItem_${idx}">
            <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleCheckItem(${idx})">
            <span class="check-text">${item.text}</span>
        </label>
    `).join('');
}

function toggleCheckItem(idx) {
    const itemEl = document.getElementById(`checkItem_${idx}`);
    if (itemEl) {
        itemEl.classList.toggle('completed');
    }
}

function renderQuiz(quizItems) {
    const container = document.getElementById('quizContainer');
    if (!quizItems || quizItems.length === 0) {
        container.innerHTML = `<p class="section-intro">Không có câu hỏi trắc nghiệm.</p>`;
        return;
    }

    container.innerHTML = quizItems.map((q, qIdx) => `
        <div class="quiz-card" id="quizCard_${qIdx}">
            <h4 class="quiz-question">Câu ${qIdx + 1}: ${q.question}</h4>
            <div class="quiz-options">
                ${q.options.map((opt, oIdx) => `
                    <div class="quiz-option" onclick="checkQuizAnswer(${qIdx}, ${oIdx}, ${q.answerIndex}, '${escapeQuote(q.explanation)}')">
                        <span>${opt}</span>
                    </div>
                `).join('')}
            </div>
            <div class="quiz-feedback hidden" id="quizFeedback_${qIdx}"></div>
        </div>
    `).join('');
}

function checkQuizAnswer(qIdx, selectedIdx, correctIdx, explanation) {
    const quizCard = document.getElementById(`quizCard_${qIdx}`);
    const options = quizCard.querySelectorAll('.quiz-option');
    const feedbackEl = document.getElementById(`quizFeedback_${qIdx}`);

    options.forEach((opt, idx) => {
        opt.classList.remove('correct', 'wrong');
        if (idx === correctIdx) {
            opt.classList.add('correct');
        } else if (idx === selectedIdx && selectedIdx !== correctIdx) {
            opt.classList.add('wrong');
        }
    });

    feedbackEl.classList.remove('hidden', 'success', 'error');
    if (selectedIdx === correctIdx) {
        feedbackEl.classList.add('success');
        feedbackEl.innerHTML = `<strong>✓ Đúng rồi!</strong> ${explanation}`;
    } else {
        feedbackEl.classList.add('error');
        feedbackEl.innerHTML = `<strong>✗ Chưa chính xác.</strong> Đáp án đúng là Lựa chọn ${String.fromCharCode(65 + correctIdx)}. ${explanation}`;
    }
}

// Helper to escape single quotes in quotes
function escapeQuote(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ==========================================================================
// 3. Demo Controller & 4 Experience Paths
// ==========================================================================

function setExperienceState(state) {
    currentExperienceState = state;

    // Update active toolbar button
    document.querySelectorAll('.state-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.state === state);
    });

    const banner = document.getElementById('statusBanner');
    const workspace = document.getElementById('bridgeWorkspace');

    // Reset status banner
    banner.className = 'status-banner hidden';

    switch (state) {
        case 'happy':
            workspace.classList.remove('hidden');
            renderCurrentSession();
            showTemporaryToast('✨ Trạng thái Happy Path: Hiển thị đầy đủ Recap + Bridge Map + Citations');
            break;

        case 'low-confidence':
            workspace.classList.remove('hidden');
            banner.className = 'status-banner warning';
            document.getElementById('bannerIcon').innerText = '⚠️';
            document.getElementById('bannerTitle').innerText = 'Low-Confidence Warning (Chất lượng nguồn thấp)';
            document.getElementById('bannerMessage').innerText = 'Dữ liệu Transcript buổi trước bị thiếu hoặc mơ hồ (đoạn T04-012). Recap bên dưới chỉ mang tính tham khảo, vui lòng kiểm tra lại Slide gốc!';
            
            // Adjust recap to indicate low-confidence
            const recapContainer = document.getElementById('recapList');
            recapContainer.insertAdjacentHTML('afterbegin', `
                <div class="recap-item" style="border-left-color: var(--warning); background: rgba(245, 158, 11, 0.05);">
                    <p class="recap-content">⚠️ <em>Lưu ý: Mức độ tin cậy của bài tóm tắt này đạt 65%. Một số đoạn transcript bị nhiễu audio.</em></p>
                    <span class="recap-citation">Cảnh báo độ tin cậy</span>
                </div>
            `);
            break;

        case 'failure':
            banner.className = 'status-banner error';
            document.getElementById('bannerIcon').innerText = '❌';
            document.getElementById('bannerTitle').innerText = 'AI Edge Case: Không tìm thấy căn cứ liên kết (Fallback Mode)';
            document.getElementById('bannerMessage').innerText = 'AI không tìm thấy mối liên hệ đủ tin cậy giữa hai buổi này (0% overlap citation). Để tránh đưa ra liên kết sai (False Positive), hệ thống khuyên bạn nên vào thẳng bài học!';
            
            // Hide workspace for graceful fallback
            workspace.classList.add('hidden');
            break;

        case 'correction':
            workspace.classList.remove('hidden');
            renderCurrentSession();
            openFeedbackModal();
            break;
    }
}

// Toast notification helper
function showTemporaryToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1e1b4b;
        color: #a5b4fc;
        border: 1px solid #6366f1;
        padding: 12px 20px;
        border-radius: 10px;
        font-size: 0.88rem;
        z-index: 2000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
    `;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Action: Skip Recap (HAX G8 Rule)
function skipRecap() {
    if (confirm('Bạn có muốn bỏ qua Recap và đi thẳng tới Bài Học Day 02 không?')) {
        alert('🚀 Đã bỏ qua Recap! Chuyển hướng người học vào VLearn Classroom Day 02.');
    }
}

function closeBanner() {
    document.getElementById('statusBanner').classList.add('hidden');
}

// ==========================================================================
// 4. Feedback & Citation Modals (HAX G15 / G9)
// ==========================================================================

function openFeedbackModal() {
    document.getElementById('feedbackModal').classList.remove('hidden');
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').classList.add('hidden');
}

function submitFeedback(type) {
    if (type === 'up') {
        showTemporaryToast('👍 Cảm ơn bạn! Đã ghi nhận đánh giá hữu ích.');
    }
}

function submitDetailedFeedback() {
    const category = document.getElementById('feedbackCategory').value;
    const comment = document.getElementById('feedbackComment').value;

    const logEntry = {
        timestamp: new Date().toISOString(),
        session: currentSessionKey,
        experienceState: currentExperienceState,
        category: category,
        comment: comment || 'Không có bình luận thêm'
    };

    console.log('📌 Logging user feedback entry for evaluation:', logEntry);
    showTemporaryToast('✅ Đã lưu phản hồi vào log codebase/outputs/feedback.json');
    
    // Clear & close
    document.getElementById('feedbackComment').value = '';
    closeFeedbackModal();
}

function openCitationModal(citationTitle, quoteText) {
    document.getElementById('citationTitle').innerText = `🔍 Nguồn Trích Dẫn: ${citationTitle}`;
    document.getElementById('citationMeta').innerText = `Xác thực căn cứ: ${citationTitle} • Nguồn VLearn Data Pack`;
    document.getElementById('citationQuote').innerText = quoteText || 'Trích dẫn nguyên văn từ tài liệu bài giảng gốc.';
    document.getElementById('citationModal').classList.remove('hidden');
}

function closeCitationModal() {
    document.getElementById('citationModal').classList.add('hidden');
}
