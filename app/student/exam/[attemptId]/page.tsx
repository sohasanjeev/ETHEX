'use client';

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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
  RotateCcw,
  BookOpen,
  Check,
  X,
  ArrowLeft,
  BarChart3,
  Percent,
  ShieldAlert,
  AlertOctagon,
  EyeOff,
  Maximize2,
  Ban,
} from 'lucide-react';
import { Question, ExamAttempt, AttemptAnswer } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

function OnlineExamContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = (params?.attemptId as string) || 'app-sample-1';
  const queryExamId = searchParams.get('examId');

  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { optionId: string | null; isMarked: boolean }>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(90 * 60);
  const [savingStatus, setSavingStatus] = useState<string>('Ready');
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState<ExamAttempt | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  const [showSolutionsView, setShowSolutionsView] = useState(false);
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>('ALL');

  // Anti-Cheat & Malpractice Proctoring States (Strict 3-Strike System)
  const [strikesCount, setStrikesCount] = useState<number>(0);
  const [strikeModalOpen, setStrikeModalOpen] = useState<boolean>(false);
  const [strikeTitle, setStrikeTitle] = useState<string>('');
  const [strikeMessage, setStrikeMessage] = useState<string>('');
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [banTimestamp, setBanTimestamp] = useState<string>('');
  const [banReason, setBanReason] = useState<string>('');

  const strikesRef = useRef(0);
  strikesRef.current = strikesCount;

  useEffect(() => {
    initiateExamSession();
  }, [applicationId, queryExamId]);

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
          examId: queryExamId || 'e1111111-1111-1111-1111-111111111111',
        }),
      });
      const startData = await startRes.json();

      let activeExamId = queryExamId || 'e1111111-1111-1111-1111-111111111111';

      if (startData.attempt) {
        setAttempt(startData.attempt);
        activeExamId = startData.attempt.exam_id || activeExamId;

        // Check if previously banned
        if (startData.attempt.status === 'disqualified' || startData.attempt.status === 'banned') {
          setIsBanned(true);
          setBanReason(startData.attempt.disqualification_reason || 'Proctoring violation');
          setBanTimestamp(startData.attempt.submitted_at || new Date().toISOString());
        }

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

      // 2. Fetch questions for this exact exam (candidate view)
      const qRes = await fetch(`/api/exam/questions?examId=${activeExamId}`);
      const qData = await qRes.json();
      if (qData.questions && qData.questions.length > 0) {
        setQuestions(qData.questions);
      }
    } catch (err) {
      console.error('Exam session initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Anti-Cheat Proctoring: Window Departure & Tab Switch Detection (3-Strikes Auto-Close & Ban)
  useEffect(() => {
    if (submittedAttempt || isBanned || loading) return;

    let debounceViolation = false;

    const handleViolation = (type: string) => {
      if (submittedAttempt || isBanned || debounceViolation) return;
      debounceViolation = true;
      setTimeout(() => {
        debounceViolation = false;
      }, 1500);

      const currentStrikes = strikesRef.current + 1;
      setStrikesCount(currentStrikes);

      if (currentStrikes === 1) {
        setStrikeTitle('⚠️ MALPRACTICE WARNING (Strike 1 of 3)');
        setStrikeMessage(
          'Tab switch or window departure detected! You are NOT permitted to leave this test tab, open browser search engines, or switch applications during the proctored exam. 2 strikes remaining before immediate automatic disqualification.'
        );
        setStrikeModalOpen(true);
      } else if (currentStrikes === 2) {
        setStrikeTitle('🚨 CRITICAL FINAL WARNING (Strike 2 of 3)');
        setStrikeMessage(
          'You have departed the examination window twice. If you leave or switch this window ONE MORE TIME, your test will AUTOMATICALLY CLOSE IMMEDIATELY and you will be PERMANENTLY BANNED from this test for Unfair Means (UFM).'
        );
        setStrikeModalOpen(true);
      } else if (currentStrikes >= 3) {
        // Strike 3: Automatic Test Termination & Permanent Ban
        setStrikeModalOpen(false);
        triggerDisqualification(
          'Automated Proctoring Ban: Candidate departed examination tab 3 times. Immediate test termination enforced.'
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation('Tab Switch');
      }
    };

    const handleWindowBlur = () => {
      handleViolation('Window Focus Lost');
    };

    // Block keyboard shortcuts (Ctrl+C, Ctrl+V, F12, Ctrl+U, Ctrl+Shift+I, Alt+Tab)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 'a' || e.key === 'p' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [submittedAttempt, isBanned, loading]);

  const triggerDisqualification = async (reason: string) => {
    setIsBanned(true);
    setBanReason(reason);
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setBanTimestamp(timeStr);

    try {
      if (attempt) {
        await fetch('/api/exam/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attemptId: attempt.id,
            isDisqualified: true,
            reason: reason,
          }),
        });
      }
    } catch (err) {
      console.error('Error reporting exam disqualification:', err);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (submittedAttempt || isBanned || timeLeftSeconds <= 0) return;

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
  }, [timeLeftSeconds, submittedAttempt, isBanned]);

  const currentQ = questions[currentIndex];
  const currentAnswer = currentQ ? answers[currentQ.id] : undefined;

  const handleSelectOption = async (optionId: string) => {
    if (!currentQ || !attempt || isBanned) return;

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

  const handleClearResponse = async () => {
    if (!currentQ || !attempt || isBanned) return;
    const isMarked = currentAnswer?.isMarked || false;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: { optionId: null, isMarked },
    }));

    try {
      await fetch('/api/exam/save-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: attempt.id,
          questionId: currentQ.id,
          selectedOptionId: null,
          isMarkedForReview: isMarked,
        }),
      });
      setSavingStatus('Response cleared');
    } catch {}
  };

  const handleToggleMarkForReview = async () => {
    if (!currentQ || !attempt || isBanned) return;
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
    if (!attempt || isBanned) return;
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
        if (data.reviewQuestions) {
          setReviewQuestions(data.reviewQuestions);
        }
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

  // Available subjects for filtering
  const subjectsList = ['ALL', ...Array.from(new Set(questions.map((q) => q.subject_id).filter(Boolean)))];

  if (loading && !attempt) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-euro-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold tracking-wide">Preparing your proctored CBT test environment...</p>
        </div>
      </div>
    );
  }

  // 1. DISQUALIFIED & BANNED SCREEN (STRIKE 3 AUTOMATIC TERMINATION)
  if (isBanned) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 select-none">
        <div className="max-w-md w-full bg-slate-900 border-2 border-rose-600 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto border-2 border-rose-500/40">
            <Ban className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Unfair Means (UFM) Detected
            </span>
            <h2 className="text-2xl font-black text-white">TEST TERMINATED & BANNED</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your test session was automatically closed because you exceeded the maximum allowed window departures (3/3 strikes).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left space-y-2">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Violation Type:</span>
              <span className="font-bold text-rose-400">Tab Switching / Window Departure</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Total Malpractice Strikes:</span>
              <span className="font-bold text-rose-500">3 of 3 (Limit Exceeded)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Disqualification Time:</span>
              <span className="font-mono text-slate-200">{banTimestamp || 'Just now'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Final Award / Marks:</span>
              <span className="font-black text-rose-500">0 / DISQUALIFIED</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 leading-relaxed">
            This incident has been logged on the central examination server. To request a review or contest this action, please contact the Exam Controller at EURO Campus with your Application Number.
          </div>

          <div className="pt-2">
            <button
              onClick={() => router.push('/student/dashboard')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              Return to Student Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. NORMAL SUBMISSION COMPLETE VIEW (SCORECARD + REVIEW SOLUTIONS)
  if (submittedAttempt) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 flex flex-col items-center justify-center">
        {!showSolutionsView ? (
          <div className="max-w-xl w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header Badge */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-white">Test Submitted & Evaluated!</h2>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Your responses have been successfully recorded and processed by the ETHEX 2026 scoring engine.
              </p>
            </div>

            {/* Scorecard metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                <span className="text-xl font-black text-euro-gold">{submittedAttempt.total_score}</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-xl font-black text-emerald-400">{submittedAttempt.percentage}%</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Correct (+4)</span>
                <span className="text-xl font-black text-emerald-400">{submittedAttempt.total_correct}</span>
              </div>
              <div className="bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-2xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Incorrect (-1)</span>
                <span className="text-xl font-black text-rose-400">{submittedAttempt.total_incorrect}</span>
              </div>
            </div>

            {/* Performance status breakdown */}
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Questions in Exam:</span>
                <span className="font-bold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Total Attempted:</span>
                <span className="font-bold text-emerald-400">
                  {submittedAttempt.total_correct + submittedAttempt.total_incorrect}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Unattempted / Left:</span>
                <span className="font-bold text-slate-300">{submittedAttempt.total_unattempted}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Scholarship Eligibility:</span>
                <span className="font-bold text-euro-gold">
                  {submittedAttempt.percentage >= 50 ? 'Eligible for Stage-2 & Scholarships' : 'Evaluated Participation'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {reviewQuestions.length > 0 && (
                <button
                  onClick={() => setShowSolutionsView(true)}
                  className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-euro-gold" />
                  Review Answers & Explanations
                </button>
              )}
              <button
                onClick={() => router.push('/student/dashboard')}
                className="flex-1 py-3 bg-euro-royal hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* DETAILED REVIEW & SOLUTIONS MODE */
          <div className="max-w-4xl w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSolutionsView(false)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="font-bold text-lg text-white">Answer Key & Step-by-Step Solutions</h3>
                  <p className="text-xs text-slate-400">Review every question, your selected option, and official rationale</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-euro-royal/30 text-euro-gold border border-euro-gold/40 rounded-full text-xs font-bold">
                Score: {submittedAttempt.total_score} Marks
              </span>
            </div>

            {/* Questions list */}
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              {reviewQuestions.map((q, idx) => {
                const userAns = answers[q.id]?.optionId;
                const correctOpt = q.options.find((o) => o.is_correct);
                const isUserCorrect = userAns && correctOpt && userAns === correctOpt.id;
                const isUserAttempted = Boolean(userAns);

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border ${
                      isUserCorrect
                        ? 'border-emerald-500/50 bg-emerald-950/20'
                        : isUserAttempted
                        ? 'border-rose-500/50 bg-rose-950/20'
                        : 'border-slate-700 bg-slate-900/60'
                    } space-y-4`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white bg-slate-700 px-2.5 py-0.5 rounded-lg">
                          Question {idx + 1}
                        </span>
                        <span className="font-bold text-euro-gold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {q.subject_id}
                        </span>
                      </div>
                      <div className="font-bold text-xs">
                        {isUserCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> +{q.marks} Marks (Correct)
                          </span>
                        ) : isUserAttempted ? (
                          <span className="text-rose-400 flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> -{q.negative_marks} Mark (Incorrect)
                          </span>
                        ) : (
                          <span className="text-slate-400">0 Marks (Unattempted)</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-100 leading-relaxed">{q.question_text}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt) => {
                        const isStudentChoice = userAns === opt.id;
                        const isTheCorrectOne = opt.is_correct;

                        let cardStyle = 'border-slate-700 bg-slate-850 text-slate-300';
                        if (isTheCorrectOne) {
                          cardStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold ring-1 ring-emerald-500';
                        } else if (isStudentChoice && !isTheCorrectOne) {
                          cardStyle = 'border-rose-500 bg-rose-950/60 text-rose-200 font-bold ring-1 ring-rose-500';
                        }

                        return (
                          <div key={opt.id} className={`p-3 rounded-xl border flex items-center gap-2.5 ${cardStyle}`}>
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                isTheCorrectOne
                                  ? 'bg-emerald-600 text-white'
                                  : isStudentChoice
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-700 text-slate-400'
                              }`}
                            >
                              {opt.option_label}
                            </span>
                            <span className="flex-1">{opt.option_text}</span>
                            {isTheCorrectOne && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Correct Answer
                              </span>
                            )}
                            {isStudentChoice && !isTheCorrectOne && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 text-xs text-slate-300">
                        <span className="font-bold text-euro-gold block mb-1">Explanation / Solution:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => router.push('/student/dashboard')}
                className="px-6 py-2.5 bg-euro-royal hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                Return to Student Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. LIVE PROCTORED EXAM INTERACTION VIEW (ALLEN CBT SPECIFICATION)
  const isTimeCritical = timeLeftSeconds < 5 * 60;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* 1. Exam Top Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CombinedBrandLogo size="sm" theme="dark" />
          <span className="h-5 w-px bg-slate-800 hidden sm:inline-block"></span>
          <span className="text-xs font-bold text-slate-300 hidden sm:inline-block">
            Online CBT Examination Engine
          </span>
        </div>

        {/* Live Proctoring Status & Timer */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Proctored Anti-Cheat Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-bold ${
              strikesCount === 0
                ? 'bg-slate-800/80 border-slate-700 text-emerald-400'
                : strikesCount === 1
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anti-Cheat:</span>
            <span>Strikes {strikesCount}/3</span>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
              isTimeCritical
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-euro-gold'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-euro-gold'}`} />
            <span>Time Left: {formatTimer(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setSubmitModalOpen(true)}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Test</span>
            <span className="sm:hidden">Submit</span>
          </button>
        </div>
      </header>

      {/* 2. Secondary Subject Ribbon */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-slate-400 font-semibold text-[11px] mr-1">Section:</span>
          {subjectsList.map((subj) => (
            <button
              key={subj}
              onClick={() => setActiveSubjectFilter(subj)}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors whitespace-nowrap ${
                activeSubjectFilter === subj
                  ? 'bg-euro-royal text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {subj === 'ALL' ? 'All Subjects' : subj}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 font-semibold hidden md:flex items-center gap-3">
          <span>Candidate: <strong className="text-slate-200">Aarav Patil</strong></span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> AI Monitored
          </span>
        </div>
      </div>

      {/* 3. Main CBT Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current Question Area (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-800/80 rounded-2xl border border-slate-700 p-5 sm:p-7 flex flex-col justify-between shadow-xl">
          {currentQ ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white bg-euro-royal px-2.5 py-1 rounded-lg">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="font-bold text-euro-gold bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                    Subject: {currentQ.subject_id}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">+{currentQ.marks} Marks</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-rose-400 font-bold">-{currentQ.negative_marks} Negative</span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                  {currentQ.question_text}
                </p>
              </div>

              {/* 4 Interactive Options (A, B, C, D) */}
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
            <div className="py-12 text-center text-slate-400 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-500" />
              <p>No questions currently loaded in this test. Admin can upload questions from the Admin Portal.</p>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="pt-5 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
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

              {currentAnswer?.optionId && (
                <button
                  type="button"
                  onClick={handleClearResponse}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-950/70 border border-rose-800/60 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear Response
                </button>
              )}

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
                Save & Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Palette & Counts (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <h3 className="font-bold text-sm text-slate-100">Question Palette</h3>
              <p className="text-[11px] text-slate-400">Click any question number to navigate</p>
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
            <div className="grid grid-cols-5 gap-2 pt-1 max-h-72 overflow-y-auto pr-1">
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
          </div>

          <div className="pt-3 border-t border-slate-700 text-[11px] text-slate-400 space-y-1.5">
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

      {/* PROCTORING MALPRACTICE WARNING MODAL (STRIKE 1 & 2) */}
      {strikeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
          <div className="bg-slate-900 border-2 border-amber-500 max-w-md w-full rounded-3xl p-6 sm:p-7 space-y-5 text-white shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-amber-400 border-b border-slate-800 pb-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <h3 className="font-black text-sm sm:text-base text-amber-300">{strikeTitle}</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Proctored Anti-Cheat System
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium bg-amber-950/30 p-3.5 rounded-2xl border border-amber-900/60">
              {strikeMessage}
            </p>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-semibold">Your Strike Status:</span>
              <span className="font-black text-amber-400 text-sm">
                {strikesCount} of 3 Strikes Used
              </span>
            </div>

            <button
              type="button"
              onClick={() => setStrikeModalOpen(false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-98"
            >
              I Understand — Return to Proctored Test
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal before final submit */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 max-w-md w-full rounded-2xl p-6 space-y-5 text-white shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-base">Confirm Final Submission?</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Once submitted, your answers will be evaluated immediately. You cannot resume this test session.
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

export default function OnlineExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-euro-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <OnlineExamContent />
    </Suspense>
  );
}
