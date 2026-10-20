'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  HelpCircle,
  Award,
  Sparkles,
} from 'lucide-react';
import { Question, ExamAttempt, AttemptAnswer } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function OnlineExamPage() {
  const params = useParams();
  const router = useRouter();
  const applicationId = (params?.attemptId as string) || 'app-sample-1';

  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { optionId: string | null; isMarked: boolean }>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(90 * 60);
  const [savingStatus, setSavingStatus] = useState<string>('Ready');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState<ExamAttempt | null>(null);

  useEffect(() => {
    initiateExamSession();
  }, [applicationId]);

  const initiateExamSession = async () => {
    setLoading(true);
    try {
      // 1. Start or fetch attempt
      const startRes = await fetch('/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          studentId: 'demo-student-id',
          examId: 'e1111111-1111-1111-1111-111111111111',
        }),
      });
      const startData = await startRes.json();

      if (startData.attempt) {
        setAttempt(startData.attempt);

        // Calculate remaining seconds based on server deadline
        const deadline = new Date(startData.attempt.server_deadline).getTime();
        const now = Date.now();
        const diffSec = Math.max(0, Math.floor((deadline - now) / 1000));
        setTimeLeftSeconds(diffSec || 90 * 60);

        // Populate existing answers if any
        if (startData.answers) {
          const loaded: Record<string, { optionId: string | null; isMarked: boolean }> = {};
          Object.values(startData.answers as Record<string, AttemptAnswer>).forEach((a) => {
            loaded[a.question_id] = {
              optionId: a.selected_option_id || null,
              isMarked: a.is_marked_for_review,
            };
          });
          setAnswers(loaded);
        }
      }

      // 2. Fetch questions (safe, no answers exposed)
      const qRes = await fetch('/api/exam/questions?examId=e1111111-1111-1111-1111-111111111111');
      const qData = await qRes.json();
      if (qData.questions) {
        setQuestions(qData.questions);
      }
    } catch (err) {
      console.error('Exam session initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (submittedAttempt || timeLeftSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinalSubmit(); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeftSeconds, submittedAttempt]);

  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = async (optionId: string) => {
    if (!currentQ || !attempt) return;

    const newOptionId = currentAnswer?.optionId === optionId ? null : optionId;
    const isMarked = currentAnswer?.isMarked || false;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { optionId: newOptionId, isMarked },
    }));

    // Save to server
    setSavingStatus('Saving...');
    try {
      await fetch('/api/exam/save-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: attempt.id,
          questionId: currentQ.id,
          selectedOptionId: newOptionId,
          isMarkedForReview: isMarked,
        }),
      });
      setSavingStatus('Saved');
    } catch {
      setSavingStatus('Offline (will sync)');
    }
  };

  const handleToggleMarkForReview = async () => {
    if (!currentQ || !attempt) return;
    const isMarked = !currentAnswer?.isMarked;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { optionId: currentAnswer?.optionId || null, isMarked },
    }));

    try {
      await fetch('/api/exam/save-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: attempt.id,
          questionId: currentQ.id,
          selectedOptionId: currentAnswer?.optionId || null,
          isMarkedForReview: isMarked,
        }),
      });
    } catch {}
  };

  const handleFinalSubmit = async () => {
    if (!attempt) return;
    setLoading(true);
    setSubmitModalOpen(false);

    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: attempt.id }),
      });
      const data = await res.json();
      if (data.attempt) {
        setSubmittedAttempt(data.attempt);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Stats
  const answeredCount = Object.values(answers).filter((a) => Boolean(a.optionId)).length;
  const markedCount = Object.values(answers).filter((a) => a.isMarked).length;
  const unansweredCount = Math.max(0, questions.length - answeredCount);

  if (loading && !attempt) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-euro-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold">Preparing your proctored test environment...</p>
        </div>
      </div>
    );
  }

  // Submission Complete View
  if (submittedAttempt) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">Test Submitted!</h2>
            <p className="text-xs text-slate-300">
              Your responses have been successfully recorded and evaluated on the official server.
            </p>
          </div>

          {/* Quick Score Preview */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Total Questions:</span>
              <span className="font-bold">{questions.length}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Questions Answered:</span>
              <span className="font-bold text-emerald-400">{submittedAttempt.total_correct + submittedAttempt.total_incorrect}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800">
              <span className="text-slate-400">Calculated Score:</span>
              <span className="font-bold text-euro-gold text-sm">{submittedAttempt.total_score} Marks</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Percentage:</span>
              <span className="font-bold text-emerald-400">{submittedAttempt.percentage}%</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => router.push('/student/dashboard')}
              className="w-full py-3 bg-euro-royal hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Return to Student Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* 1. Exam Top Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CombinedBrandLogo size="sm" />
          <div className="hidden sm:block h-6 w-px bg-slate-800"></div>
          <span className="hidden sm:inline text-xs font-bold text-slate-300">
            ETHEX 2026 Online Examination
          </span>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-xl border border-slate-700 shadow-inner">
            <Clock className={`w-4 h-4 ${timeLeftSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-euro-gold'}`} />
            <span className="text-xs text-slate-400 font-semibold">Time Remaining:</span>
            <span className={`font-mono text-base font-black ${timeLeftSeconds < 300 ? 'text-rose-400' : 'text-white'}`}>
              {formatTimer(timeLeftSeconds)}
            </span>
          </div>

          <button
            onClick={() => setSubmitModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Submit Test
          </button>
        </div>
      </header>

      {/* 2. Main Exam Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Question Area (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-800/90 rounded-2xl border border-slate-700 p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between min-h-[520px]">
          {currentQ ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-black bg-euro-royal text-white">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Subject: {currentQ.subject_id}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400 font-bold">+{currentQ.marks} Marks</span>
                  {currentQ.negative_marks > 0 && (
                    <span className="text-rose-400 font-bold">-{currentQ.negative_marks} Neg</span>
                  )}
                </div>
              </div>

              {/* Question Text */}
              <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                {currentQ.question_text}
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isSelected = currentAnswer?.optionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-euro-royal bg-blue-900/50 text-white ring-2 ring-euro-royal/50'
                          : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-700/60'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          isSelected ? 'bg-euro-royal text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.option_label}
                      </span>
                      <span>{opt.option_text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No question loaded</p>
          )}

          {/* Bottom Action Controls */}
          <div className="pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMarkForReview}
                className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  currentAnswer?.isMarked
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-500'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {currentAnswer?.isMarked ? 'Marked for Review' : 'Mark for Review'}
              </button>
              <span className="text-[11px] text-slate-500 italic hidden sm:inline">
                Status: {savingStatus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                disabled={currentIndex === questions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="px-4 py-2 bg-euro-royal hover:bg-blue-600 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette & Counts (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-5 shadow-xl">
          <div className="border-b border-slate-700 pb-3">
            <h3 className="font-bold text-sm text-slate-100">Question Palette</h3>
            <p className="text-[11px] text-slate-400">Click any number to jump directly</p>
          </div>

          {/* Status Counts Legend */}
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-bold">
            <div className="bg-emerald-950/60 border border-emerald-700/60 p-2 rounded-lg text-emerald-300">
              <span className="block text-base font-black">{answeredCount}</span>
              <span>Answered</span>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-slate-400">
              <span className="block text-base font-black">{unansweredCount}</span>
              <span>Unattempted</span>
            </div>
            <div className="bg-purple-950/60 border border-purple-700/60 p-2 rounded-lg text-purple-300">
              <span className="block text-base font-black">{markedCount}</span>
              <span>Review</span>
            </div>
          </div>

          {/* Grid of question buttons */}
          <div className="grid grid-cols-5 gap-2 pt-1 max-h-64 overflow-y-auto pr-1">
            {questions.map((q, idx) => {
              const ans = answers[q.id];
              const isAnswered = Boolean(ans?.optionId);
              const isMarked = ans?.isMarked;
              const isCurrent = idx === currentIndex;

              let btnBg = 'bg-slate-900 text-slate-400 border border-slate-700 hover:bg-slate-700';
              if (isMarked) {
                btnBg = 'bg-purple-600 text-white border-purple-400';
              } else if (isAnswered) {
                btnBg = 'bg-emerald-600 text-white border-emerald-400';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg text-xs font-bold transition-all ${btnBg} ${
                    isCurrent ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
              <span>Green: Option Selected (Saved)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span>Purple: Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
              <span>Dark: Not Attempted Yet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal before final submit */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 max-w-md w-full rounded-2xl p-6 space-y-5 text-white shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base">Confirm Final Submission?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Once submitted, your answers will be finalized and you cannot re-enter this examination attempt.
            </p>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Total Answered:</span>
                <span className="font-bold text-emerald-400 text-base">{answeredCount}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Unanswered / Skipped:</span>
                <span className="font-bold text-rose-400 text-base">{unansweredCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold text-white transition-colors"
              >
                Resume Examination
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs font-bold text-white shadow transition-colors"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
