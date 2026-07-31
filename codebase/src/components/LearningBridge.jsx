import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckSquare, Sparkles, HelpCircle, ThumbsDown, FileText, ArrowRight,
  ExternalLink, Bot
} from 'lucide-react';
import KnowledgeMap from './KnowledgeMap';
import FeedbackModal from './FeedbackModal';
import { llmService } from '../services/llmService';

export default function LearningBridge({ 
  bridgeData, 
  fromDay, 
  toDay, 
  onRefreshLLM, 
  loading, 
  onSkipBridge,
  onJumpToSlide
}) {
  const [activeTab, setActiveTab] = useState('recap'); // 'recap' | 'bridge' | 'map' | 'checklist'
  const [quizAnswers, setQuizAnswers] = useState({});
  const [checklistState, setChecklistState] = useState({});
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [quizItems, setQuizItems] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    if (bridgeData?.quiz) {
      setQuizItems(bridgeData.quiz);
      setQuizAnswers({});
    }
  }, [bridgeData]);

  const quizScore = useMemo(() => {
    if (!quizItems.length) return { answered: 0, correct: 0 };
    let answered = 0;
    let correct = 0;
    quizItems.forEach((q) => {
      if (quizAnswers[q.id] !== undefined) {
        answered += 1;
        if (quizAnswers[q.id] === q.correctAnswer) correct += 1;
      }
    });
    return { answered, correct };
  }, [quizItems, quizAnswers]);

  if (!bridgeData) return null;

  const handleRefreshAI = async () => {
    if (onRefreshLLM) {
      await onRefreshLLM();
      setToastMessage('✨ Đã tạo lại cầu nối AI thành công!');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleGenerateQuizAI = async () => {
    setQuizLoading(true);
    try {
      const result = await llmService.generateBridgeQuiz({ fromDay, toDay });
      const nextQuiz = (result.quiz || []).map((q, idx) => ({
        ...q,
        id: q.id || `ai-q-${idx + 1}`
      }));
      setQuizItems(nextQuiz);
      setQuizAnswers({});
      setToastMessage(`✨ Đã tạo lại ${nextQuiz.length} câu quiz AI!`);
      setTimeout(() => setToastMessage(null), 3500);
      setActiveTab('checklist');
    } catch (err) {
      console.error('Quiz AI error:', err);
      setToastMessage('Không tạo được quiz. Thử lại sau.');
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizSelect = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleChecklist = (ckId) => {
    setChecklistState(prev => ({ ...prev, [ckId]: !prev[ckId] }));
  };

  const handleOpenFeedback = (item, section) => {
    setFeedbackTarget({ ...item, section });
    setIsFeedbackOpen(true);
  };

  const extractSlidePageAndDay = (citationText) => {
    if (!citationText) return { pageNum: null, dayCode: null };
    const pageMatch = citationText.match(/slide\s*(\d+)/i);
    const dayMatch = citationText.match(/(Day\s*\d{1,2})/i);
    return {
      pageNum: pageMatch ? pageMatch[1] : null,
      dayCode: dayMatch ? dayMatch[1] : null
    };
  };

  const getShortPathName = (name) => {
    if (!name) return 'Happy Path';
    if (name.includes('Out of Scope') || name.includes('Boundary')) return 'Out-of-Scope';
    if (name.includes('Low-Confidence')) return 'Low-Confidence';
    if (name.includes('Failure')) return 'Failure';
    return 'Happy Path';
  };

  return (
    <div className="flex flex-col space-y-3 text-[14px] w-full animate-fade-in">
      
      {/* 🔴 HERO HEADER SECTION (TỐI GIẢN - CỰC GỌN GÀNG) */}
      <div className="vlearn-card p-3 space-y-2 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
        
        {/* Top Badges Bar */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded-full text-[12px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 flex items-center gap-1 whitespace-nowrap">
              <Sparkles size={11} className="text-indigo-600 shrink-0" /> AI Bridge
            </span>
            <span className="px-2 py-0.5 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 whitespace-nowrap">
              {getShortPathName(bridgeData.pathName)}
            </span>
          </div>
        </div>

        {/* HERO BRIDGE BANNER */}
        <div className="bg-gradient-to-r from-indigo-50/70 via-slate-50 to-rose-50/70 border border-slate-200/80 p-2.5 rounded-lg flex items-center justify-between shadow-2xs gap-2">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">CẦU NỐI TRI THỨC</div>
            <div className="text-[14px] font-bold text-slate-800 leading-snug whitespace-nowrap">Chuyển tiếp kiến thức</div>
          </div>

          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200/90 shadow-2xs shrink-0 whitespace-nowrap">
            <span className="text-[14px] font-extrabold text-[#0f2b5c]">{fromDay.code}</span>
            <ArrowRight size={13} className="text-indigo-500 shrink-0" />
            <span className="text-[14px] font-extrabold text-rose-600">{toDay.code}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button 
            onClick={onSkipBridge}
            className="btn btn-navy text-[14px] py-1.5 px-3 font-bold flex items-center justify-center gap-1.5 w-full shadow-2xs rounded-lg whitespace-nowrap cursor-pointer hover:bg-slate-800 transition-all"
            title="Chuyển sang VLearn Tutor & mở Slide bài học"
          >
            <span>Học ngay</span>
            <ArrowRight size={14} className="shrink-0" />
          </button>

          <button 
            onClick={handleRefreshAI} 
            disabled={loading}
            className="px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 text-indigo-800 text-[14px] font-semibold hover:bg-indigo-100 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 whitespace-nowrap cursor-pointer"
            title="Tạo lại cây tri thức bằng AI"
          >
            <Sparkles size={13} className={loading ? 'animate-spin text-indigo-600 shrink-0' : 'text-indigo-600 shrink-0'} />
            <span>{loading ? 'Đang tạo...' : 'Tạo lại AI'}</span>
          </button>
        </div>

        {/* 💡 TOAST NOTIFICATION FOR AI REFRESH FEEDBACK */}
        {toastMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-[12px] font-bold px-3 py-1.5 rounded-lg flex items-center justify-between animate-fade-in shadow-2xs">
            <span>{toastMessage}</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded font-mono">AI</span>
          </div>
        )}
      </div>

      {/* 🟢 4 TAB PILL NAVIGATION */}
      <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-4 gap-1 text-[14px] shrink-0">
        <button 
          onClick={() => setActiveTab('recap')}
          className={`py-1.5 rounded-md font-bold text-[13px] text-center whitespace-nowrap transition-all ${
            activeTab === 'recap' ? 'bg-[#0f2b5c] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Recap
        </button>
        
        <button 
          onClick={() => setActiveTab('bridge')}
          className={`py-1.5 rounded-md font-bold text-[13px] text-center whitespace-nowrap transition-all ${
            activeTab === 'bridge' ? 'bg-[#0f2b5c] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Bridge
        </button>

        <button 
          onClick={() => setActiveTab('map')}
          className={`py-1.5 rounded-md font-bold text-[13px] text-center whitespace-nowrap transition-all ${
            activeTab === 'map' ? 'bg-[#0f2b5c] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sơ đồ
        </button>

        <button 
          onClick={() => setActiveTab('checklist')}
          className={`py-1.5 rounded-md font-bold text-[13px] text-center whitespace-nowrap transition-all ${
            activeTab === 'checklist' ? 'bg-[#0f2b5c] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Quiz
        </button>
      </div>

      {/* 📄 TAB 1: RECAP POINTS */}
      {activeTab === 'recap' && (
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-[12px] text-slate-500 px-0.5">
            <span>{bridgeData.recap?.length || 0} ý cốt lõi có trích dẫn</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" /> Grounded G2
            </span>
          </div>

          {bridgeData.recap && bridgeData.recap.length > 0 ? (
            <div className="grid gap-2 max-h-[420px] overflow-y-auto pr-1">
              {bridgeData.recap.map((item) => {
                const { pageNum, dayCode } = extractSlidePageAndDay(item.citation);
                return (
                  <div 
                    key={item.id}
                    className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all space-y-2"
                  >
                    <p className="text-[14px] text-slate-800 font-medium leading-relaxed break-words">
                      {item.text}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      {pageNum && onJumpToSlide ? (
                        <button
                          onClick={() => onJumpToSlide(pageNum, dayCode)}
                          className="px-2.5 py-0.5 rounded bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-800 font-bold text-[12px] border border-indigo-200/80 flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
                          title={`Click để chuyển sang ${dayCode || fromDay.code} và mở Slide trang ${pageNum}`}
                        >
                          <FileText size={11} className="shrink-0" /> {item.citation} <ExternalLink size={10} className="shrink-0" />
                        </button>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[12px] border border-indigo-100 flex items-center gap-1 whitespace-nowrap">
                          <FileText size={11} className="shrink-0" /> {item.citation}
                        </span>
                      )}

                      <button 
                        onClick={() => handleOpenFeedback(item, 'recap')}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors shrink-0"
                        title="Báo lỗi trích dẫn này"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <ThumbsDown size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 text-[14px] italic">
              Không có nội dung recap nào cho kịch bản này.
            </div>
          )}
        </div>
      )}

      {/* 🔗 TAB 2: BRIDGE MAP */}
      {activeTab === 'bridge' && (
        <div className="space-y-2 animate-fade-in">
          {bridgeData.bridgeLinks && bridgeData.bridgeLinks.length > 0 ? (
            <div className="grid gap-2 max-h-[420px] overflow-y-auto pr-1">
              {bridgeData.bridgeLinks.map((link) => {
                const { pageNum: srcPage, dayCode: srcDay } = extractSlidePageAndDay(link.sourceRef);
                const { pageNum: targetPage, dayCode: targetDay } = extractSlidePageAndDay(link.targetRef);

                return (
                  <div 
                    key={link.id}
                    className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
                  >
                    <div className="flex flex-wrap items-center gap-1 text-[13px] font-bold">
                      {srcPage && onJumpToSlide ? (
                        <button 
                          onClick={() => onJumpToSlide(srcPage, srcDay)}
                          className="px-2 py-0.5 rounded bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-900 border border-indigo-200 transition-all cursor-pointer flex items-center gap-1 truncate max-w-[140px]"
                          title={`Bấm để mở ${srcDay ? srcDay + ' - ' : ''}Slide trang ${srcPage}`}
                        >
                          <span className="truncate">{link.sourceConcept}</span> ({link.sourceRef}) <ExternalLink size={10} className="shrink-0" />
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-100 truncate max-w-[140px]">
                          <span className="truncate">{link.sourceConcept}</span> ({link.sourceRef})
                        </span>
                      )}

                      <ArrowRight size={12} className="text-slate-400 shrink-0" />

                      {targetPage && onJumpToSlide ? (
                        <button 
                          onClick={() => onJumpToSlide(targetPage, targetDay)}
                          className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-900 border border-emerald-200 transition-all cursor-pointer flex items-center gap-1 truncate max-w-[140px]"
                          title={`Bấm để mở ${targetDay ? targetDay + ' - ' : ''}Slide trang ${targetPage}`}
                        >
                          <span className="truncate">{link.targetConcept}</span> ({link.targetRef}) <ExternalLink size={10} className="shrink-0" />
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-100 truncate max-w-[140px]">
                          <span className="truncate">{link.targetConcept}</span> ({link.targetRef})
                        </span>
                      )}
                    </div>

                    <p className="text-[14px] text-slate-700 leading-relaxed pt-1 border-t border-slate-100 break-words">
                      {link.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 text-[14px] italic">
              Không có liên kết nào (0% hallucination).
            </div>
          )}
        </div>
      )}

      {/* 🗺️ TAB 3: KNOWLEDGE MAP */}
      {activeTab === 'map' && (
        <KnowledgeMap 
          bridgeLinks={bridgeData.bridgeLinks} 
          fromDayCode={fromDay.code} 
          toDayCode={toDay.code} 
        />
      )}

      {/* ✅ TAB 4: AI QUIZ + CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-3 animate-fade-in max-h-[480px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between gap-2 px-0.5">
            <div>
              <h3 className="text-[14px] font-bold text-slate-900 flex items-center gap-1">
                <HelpCircle size={14} className="text-emerald-700 shrink-0" /> Quiz AI Bridge
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Quiz chuyển tiếp kiến thức Day01 → Day02
                {quizScore.answered > 0 ? ` · Đúng ${quizScore.correct}/${quizScore.answered}` : ''}
              </p>
            </div>
            <button
              onClick={handleGenerateQuizAI}
              disabled={quizLoading || loading}
              className="px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 text-[12px] font-bold hover:bg-indigo-100 transition-all flex items-center gap-1 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              title="Tạo lại bộ câu hỏi quiz bằng AI"
            >
              <Sparkles size={12} className={quizLoading ? 'animate-spin' : ''} />
              {quizLoading ? 'Đang tạo...' : 'Tạo lại AI'}
            </button>
          </div>

          {quizItems.length > 0 ? (
            <div className="space-y-2">
              {quizItems.map((q, qIdx) => {
                const showResult = quizAnswers[q.id] !== undefined;
                const isCorrectAnswer = showResult && quizAnswers[q.id] === q.correctAnswer;
                const { pageNum, dayCode } = extractSlidePageAndDay(q.citation || '');

                return (
                  <div key={q.id} className="p-3 rounded-xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-bold text-slate-900 leading-relaxed">
                        <span className="text-emerald-700 mr-1">Câu {qIdx + 1}.</span>
                        {q.question ? q.question.replace(/\s*\(\s*biến\s*thể\s*\d+\s*\)/gi, '') : ''}
                      </p>
                      {showResult && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          isCorrectAnswer ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {isCorrectAnswer ? 'Đúng' : 'Sai'}
                        </span>
                      )}
                    </div>

                    <div className="grid gap-1.5">
                      {(q.options || []).map((opt, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        const isCorrect = oIdx === q.correctAnswer;
                        let btnStyle = { backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a' };
                        if (showResult) {
                          if (isCorrect) btnStyle = { backgroundColor: '#ecfdf5', border: '1px solid #10b981', color: '#065f46' };
                          else if (isSelected) btnStyle = { backgroundColor: '#fff1f2', border: '1px solid #f43f5e', color: '#9f1239' };
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizSelect(q.id, oIdx)}
                            disabled={showResult}
                            className="text-left text-[13px] p-2 rounded-lg transition-all font-medium leading-relaxed disabled:cursor-default"
                            style={btnStyle}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {showResult && (
                      <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-2 space-y-1">
                        <p className="text-[12px] text-indigo-800 font-medium leading-relaxed flex items-start gap-1">
                          <Bot size={13} className="mt-0.5 shrink-0 text-indigo-600" />
                          <span><strong>Giải thích:</strong> {q.explanation}</span>
                        </p>
                        {q.citation && (
                          pageNum && onJumpToSlide ? (
                            <button
                              onClick={() => onJumpToSlide(pageNum, dayCode)}
                              className="text-[11px] font-bold text-indigo-700 hover:underline flex items-center gap-1"
                            >
                              📍 {q.citation} <ExternalLink size={10} />
                            </button>
                          ) : (
                            <span className="text-[11px] font-semibold text-indigo-600">📍 {q.citation}</span>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-slate-400 text-[13px] italic border border-dashed border-slate-200 rounded-xl">
              Chưa có quiz. Bấm <strong>Tạo lại AI</strong> để sinh câu hỏi.
            </div>
          )}

          {bridgeData.checklist?.length > 0 && (
            <div className="pt-1">
              <h3 className="text-[13px] font-bold text-slate-900 mb-1.5 flex items-center gap-1 px-0.5">
                <CheckSquare size={13} className="text-indigo-700 shrink-0" /> Checklist Chuẩn bị
              </h3>
              <div className="space-y-1.5">
                {bridgeData.checklist.map((ck) => (
                  <label
                    key={ck.id}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <input
                      type="checkbox"
                      checked={!!checklistState[ck.id]}
                      onChange={() => toggleChecklist(ck.id)}
                      className="w-4 h-4 rounded text-indigo-600 shrink-0"
                    />
                    <span className={`text-[13px] leading-relaxed ${checklistState[ck.id] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {ck.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        targetItem={feedbackTarget} 
      />
    </div>
  );
}
