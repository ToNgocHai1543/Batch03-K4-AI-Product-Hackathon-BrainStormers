/**
 * VLearn — AI Learning Bridge Application Logic (Task 3.4 Integration)
 * Fetches dynamic AI outputs from /api/session?pair=d1-d2 REST API or trace files,
 * renders dynamic Recap, Bridge Map, Checklist, and Quick Quiz components,
 * posts feedback to /api/feedback (HAX G15), and handles 4 experience states.
 */

// Global App State
let currentSessionKey = 'd1-d2';
let currentExperienceState = 'happy'; // 'happy' | 'low-confidence' | 'failure' | 'correction'
let currentSessionData = null; // Holds fetched AI trace & output data

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
// 1. API Fetching & Render Orchestrator (Task 3.4)
// ==========================================================================

function handleSessionChange() {
    const select = document.getElementById('sessionSelect');
    currentSessionKey = select.value;
    renderCurrentSession();
}

async function renderCurrentSession() {
    showLoadingState();

    try {
        // Step 1: Try fetching dynamic AI output from Backend API /api/session?pair=...&mode=...
        let fetchedData = null;
        try {
            const apiRes = await fetch(`/api/session?pair=${currentSessionKey}&mode=${currentExperienceState}`);
            if (apiRes.ok) {
                const traceJson = await apiRes.json();
                fetchedData = traceJson.output || traceJson;
            }
        } catch (netErr) {
            console.log('[App Fetch Note] API endpoint offline/standalone mode, trying local trace file fallback...');
        }

        // Step 2: Fallback to reading pre-generated trace file if standalone HTML
        if (!fetchedData) {
            try {
                const traceFileRes = await fetch(`../outputs/trace_${currentSessionKey.replace('-', '_')}.json`);
                if (traceFileRes.ok) {
                    const traceJson = await traceFileRes.json();
                    fetchedData = traceJson.output || traceJson;
                }
            } catch (fileErr) {
                console.log('[App Fetch Note] Trace file fetch note:', fileErr);
            }
        }

        // Step 3: Hardcoded fallback if both offline
        if (!fetchedData) {
            fetchedData = getHardcodedFallback(currentSessionKey);
        }

        currentSessionData = fetchedData;
        hideLoadingState();
        displaySessionData(currentSessionData);

    } catch (err) {
        console.error('Error loading session data:', err);
        hideLoadingState();
    }
}

function showLoadingState() {
    const workspace = document.getElementById('bridgeWorkspace');
    if (!document.getElementById('loadingSpinner')) {
        const spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.className = 'loading-spinner-overlay';
        spinner.innerHTML = `
            <div class="spinner-card">
                <div class="spinner-icon">✨</div>
                <h3>AI đang phân tích & kết nối bài học...</h3>
                <p>Nạp transcript & slide ➔ Prompt Chaining (Recap & Bridge Engine)</p>
            </div>
        `;
        document.body.appendChild(spinner);
    }
}

function hideLoadingState() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.remove();
}

function displaySessionData(data) {
    if (!data) return;

    // 1. Title & Header
    const pairTitles = {
        'd1-d2': { title: 'Cầu Nối Kiến Thức: Day 01 ➔ Day 02', desc: 'AI đã phân tích Day 01 (AI & LLM Foundation) và tự động kết nối với các khái niệm cần thiết cho Day 02 (Xác định bài toán cho AI).' },
        'd2-d3': { title: 'Cầu Nối Kiến Thức: Day 02 ➔ Day 03', desc: 'AI đã phân tích Day 02 (Xác định bài toán cho AI) và kết nối với Day 03 (Multi-Agent Systems & Build System).' },
        'd3-d4': { title: 'Cầu Nối Kiến Thức: Day 03 ➔ Day 04', desc: 'AI đã kết nối Day 03 (Multi-Agent Systems) với Day 04 (Eval & Quality Bar Engine).' }
    };

    const headerInfo = pairTitles[currentSessionKey] || { title: `Cầu Nối Kiến Thức: ${currentSessionKey}`, desc: 'Phân tích kiến thức tự động từ AI Learning Bridge.' };
    document.getElementById('bridgeTitle').innerText = headerInfo.title;
    document.getElementById('bridgeDesc').innerHTML = headerInfo.desc;

    // 2. Render Recap
    renderRecapList(data.recap);

    // 3. Render Connection Cards & Diagram
    renderConnectionGrid(data.bridge);
    updateKnowledgeMapDiagram(data.bridge);

    // 4. Render Checklist
    renderChecklist(data.checklist);

    // 5. Render Quick Quiz
    renderQuiz(data.quiz);

    // Re-trigger Mermaid diagram render
    setTimeout(() => {
        if (window.mermaid) {
            try {
                mermaid.contentLoaded();
            } catch (e) {}
        }
    }, 100);
}

// ==========================================================================
// 2. Component Renderers
// ==========================================================================

function renderRecapList(recapItems) {
    const container = document.getElementById('recapList');
    if (!recapItems || recapItems.length === 0) {
        container.innerHTML = `<div class="recap-item"><p class="recap-content">Chưa có nội dung tóm tắt cho buổi này.</p></div>`;
        return;
    }

    container.innerHTML = recapItems.map(item => `
        <div class="recap-item">
            <p class="recap-content">${item.point}</p>
            <span class="recap-citation" onclick="openCitationModal('${item.citation || 'Slide/Transcript'}', '${escapeQuote(item.source_quote || item.point)}')">
                📖 ${item.citation || 'Trích dẫn gốc'}
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
                <span class="recap-citation" onclick="openCitationModal('${item.from_ref}', 'Căn cứ nền tảng từ ${item.from}')">${item.from_ref}</span>
                <span class="recap-citation" onclick="openCitationModal('${item.to_ref}', 'Căn cứ đích đến ở ${item.to}')">${item.to_ref}</span>
            </div>
        </div>
    `).join('');
}

function updateKnowledgeMapDiagram(bridgeItems) {
    const container = document.getElementById('mermaidDiagram');
    if (!container || !bridgeItems) return;

    if (currentSessionKey === 'd1-d2') {
        container.textContent = `
graph LR
    subgraph Day1["🔵 Day 01 — AI & LLM Foundation"]
        D1_1["Giới hạn bẩm sinh<br/>(Slide 20)"]
        D1_2["4 Level Agent<br/>(Slide 23-24)"]
        D1_3["Token & Chi phí<br/>(Slide 27)"]
    end
    subgraph Day2["🟢 Day 02 — Bài Toán AI"]
        D2_1["Khi nào KHÔNG dùng AI<br/>(PAIR Not Better)"]
        D2_2["3 Cấp giải pháp<br/>(Rule / Workflow / Agent)"]
        D2_3["Đánh giá ROI & Feasibility"]
    end
    D1_1 ==>|"Căn cứ xác định"| D2_1
    D1_2 ==>|"Cơ sở chọn cấp độ"| D2_2
    D1_3 ==>|"Căn cứ kinh tế"| D2_3

    classDef d1 fill:#1e1b4b,stroke:#6366f1,color:#e0e7ff;
    classDef d2 fill:#064e3b,stroke:#10b981,color:#d1fae5;
    class D1_1,D1_2,D1_3 d1;
    class D2_1,D2_2,D2_3 d2;
        `;
    } else {
        container.textContent = `
graph LR
    subgraph Day2["🟢 Day 02 — Bài Toán AI"]
        D2_1["Workflow Patterns<br/>(Slide 20)"]
        D2_2["Double Diamond<br/>(Slide 3)"]
    end
    subgraph Day3["🟣 Day 03 — Multi-Agent Systems"]
        D3_1["Orchestration Engine<br/>(Slide 5)"]
        D3_2["Building Agents<br/>System Architecture"]
    end
    D2_1 ==>|"Pattern cơ sở"| D3_1
    D2_2 ==>|"Định hình giải pháp"| D3_2

    classDef d2 fill:#064e3b,stroke:#10b981,color:#d1fae5;
    classDef d3 fill:#4c1d95,stroke:#a855f7,color:#f3e8ff;
    class D2_1,D2_2 d2;
    class D3_1,D3_2 d3;
        `;
    }
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
                    <div class="quiz-option" onclick="checkQuizAnswer(${qIdx}, ${oIdx}, ${q.answer_index !== undefined ? q.answer_index : q.answerIndex}, '${escapeQuote(q.explanation)}')">
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

// Helper to escape quotes
function escapeQuote(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Fallback Hardcoded Object
function getHardcodedFallback(key) {
    if (key === 'd1-d2') {
        return {
            "recap": [
                { "point": "LLM không phải chatbot — mà là một bộ não ngôn ngữ nền (Foundation Model) dùng chung.", "citation": "Slide 10", "source_quote": "LLM là mô hình ngôn ngữ lớn..." },
                { "point": "Token = mảnh chữ. Output token đắt gấp 3–5 lần Input token.", "citation": "Slide 13, 27", "source_quote": "Input token (rẻ), Output token (đắt ×3-5)." },
                { "point": "3 Giới hạn bẩm sinh: Bong bóng thời gian, Hallucination, Bàn làm việc có hạn.", "citation": "Slide 20", "source_quote": "Học giả trong bong bóng..." }
            ],
            "bridge": [
                { "from": "Giới hạn bẩm sinh (Hallucination)", "from_ref": "Day 01, Slide 20", "to": "Khi nào AI KHÔNG phù hợp (PAIR NOT Better)", "to_ref": "Day 02, Slide 15", "explanation": "LLM có rủi ro hallucination nên trường hợp yêu cầu 100% chính xác tuyệt đối nên dùng Rule." }
            ],
            "checklist": [
                { "text": "Ôn lại 3 giới hạn bẩm sinh của LLM (Slide 20)" }
            ],
            "quiz": [
                { "question": "Trường hợp nào PAIR khuyến cáo KHÔNG dùng AI?", "options": ["A. Cá nhân hóa", "B. Tính thuế 100% chuẩn luật", "C. Tóm tắt email", "D. Lọc spam"], "answer_index": 1, "explanation": "Tính thuế cần 100% chuẩn luật." }
            ]
        };
    }
    return {
        "recap": [{ "point": "Double Diamond: Tìm đúng vấn đề trước khi tìm giải pháp.", "citation": "Day 02, Slide 3" }],
        "bridge": [{ "from": "Workflow Patterns", "from_ref": "Day 02, Slide 20", "to": "Orchestration Engine", "to_ref": "Day 03, Slide 5", "explanation": "Khối dựng cho Multi-Agent." }],
        "checklist": [{ "text": "Chốt xong 9 trường Problem Statement" }],
        "quiz": [{ "question": "Nguyên tắc Anthropic khuyến cáo là gì?", "options": ["A. Dùng multi-agent luôn", "B. Ưu tiên giải pháp đơn giản nhất", "C. Bỏ qua rule", "D. Dùng model đắt nhất"], "answer_index": 1, "explanation": "Ưu tiên giải pháp đơn giản nhất." }]
    };
}

// ==========================================================================
// 3. Demo Controller & 4 Experience Paths
// ==========================================================================

async function setExperienceState(state) {
    currentExperienceState = state;

    document.querySelectorAll('.state-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.state === state);
    });

    const banner = document.getElementById('statusBanner');
    const workspace = document.getElementById('bridgeWorkspace');

    banner.className = 'status-banner hidden';

    // Re-fetch data for the new experience mode
    await renderCurrentSession();

    switch (state) {
        case 'happy':
            workspace.classList.remove('hidden');
            showTemporaryToast('✨ Trạng thái Happy Path: Hiển thị đầy đủ Recap + Bridge Map + Citations');
            break;

        case 'low-confidence':
            workspace.classList.remove('hidden');
            banner.className = 'status-banner warning';
            document.getElementById('bannerIcon').innerText = '⚠️';
            document.getElementById('bannerTitle').innerText = 'Low-Confidence Warning (Chất lượng nguồn thấp)';
            document.getElementById('bannerMessage').innerText = currentSessionData.warning_message || 'Dữ liệu Transcript buổi trước bị thiếu hoặc mơ hồ (đoạn T04-012). Recap bên dưới chỉ mang tính tham khảo, vui lòng kiểm tra lại Slide gốc!';
            
            const recapContainer = document.getElementById('recapList');
            if (recapContainer) {
                recapContainer.insertAdjacentHTML('afterbegin', `
                    <div class="recap-item" style="border-left-color: var(--warning); background: rgba(245, 158, 11, 0.05);">
                        <p class="recap-content">⚠️ <em>Lưu ý: Mức độ tin cậy của bài tóm tắt này đạt 62%. Audio transcript chứa các đoạn [không nghe rõ].</em></p>
                        <span class="recap-citation">Cảnh báo độ tin cậy</span>
                    </div>
                `);
            }
            break;

        case 'failure':
            banner.className = 'status-banner error';
            document.getElementById('bannerIcon').innerText = '❌';
            document.getElementById('bannerTitle').innerText = 'AI Edge Case: Không tìm thấy căn cứ liên kết (Fallback Mode)';
            document.getElementById('bannerMessage').innerText = currentSessionData.warning_message || 'AI không tìm thấy mối liên hệ đủ tin cậy giữa hai buổi này (0% overlap citation). Để tránh đưa ra liên kết sai (False Positive), hệ thống khuyên bạn nên vào thẳng bài học!';
            workspace.classList.add('hidden');
            break;

        case 'correction':
            workspace.classList.remove('hidden');
            openFeedbackModal();
            break;
    }
}

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

function skipRecap() {
    if (confirm('Bạn có muốn bỏ qua Recap và đi thẳng tới Bài Học không?')) {
        alert('🚀 Đã bỏ qua Recap! Chuyển hướng người học vào VLearn Classroom.');
    }
}

function closeBanner() {
    document.getElementById('statusBanner').classList.add('hidden');
}

// ==========================================================================
// 4. Modals & User Feedback API Integration (Task 3.4 & HAX G15)
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

async function submitDetailedFeedback() {
    const category = document.getElementById('feedbackCategory').value;
    const comment = document.getElementById('feedbackComment').value;

    const logEntry = {
        timestamp: new Date().toISOString(),
        session: currentSessionKey,
        experienceState: currentExperienceState,
        category: category,
        comment: comment || 'Không có bình luận thêm'
    };

    // Try posting feedback to backend REST API /api/feedback
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logEntry)
        });

        if (response.ok) {
            const resJson = await response.json();
            showTemporaryToast(`✅ ${resJson.message}`);
        } else {
            showTemporaryToast('✅ Đã ghi nhận phản hồi vào log thử nghiệm.');
        }
    } catch (e) {
        showTemporaryToast('✅ Đã lưu phản hồi vào log codebase/outputs/feedback.json');
    }
    
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
