'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  UploadCloud,
  Plus,
  Trash2,
  AlertTriangle,
  Send,
  Eye,
  Calendar,
  Clock,
  Award,
  BookOpen,
} from 'lucide-react';
import { ExamTemplate } from '@/lib/types';
import PdfQuestionConverterModal from '@/components/teacher/PdfQuestionConverterModal';
import CompanyNavbarLogo from '@/components/branding/CompanyNavbarLogo';

function CreateExamWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateCodeParam = searchParams.get('template');

  const [step, setStep] = useState<number>(1);
  const [templates, setTemplates] = useState<ExamTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templateCodeParam || 'ETHEX-FND');

  // Step 1 & 2: Test Details
  const [title, setTitle] = useState<string>('ETHEX 2026: Foundation & Talent Assessment');
  const [classCategory, setClassCategory] = useState<string>('Class 10');
  const [targetStream, setTargetStream] = useState<'Foundation' | 'JEE' | 'NEET' | 'MHT-CET'>('Foundation');
  const [description, setDescription] = useState<string>('Scholarship diagnostic assessment conducted by EURO Campus.');
  const [mode, setMode] = useState<'online' | 'offline' | 'hybrid'>('hybrid');
  const [examDate, setExamDate] = useState<string>('2026-12-15T10:00');
  const [durationMinutes, setDurationMinutes] = useState<number>(90);
  const [marksPerCorrect, setMarksPerCorrect] = useState<number>(4);
  const [negativeMarking, setNegativeMarking] = useState<number>(1);

  // Step 3: Subject-wise questions
  const [activeSubject, setActiveSubject] = useState<string>('PHY');
  const [subjectsList, setSubjectsList] = useState<string[]>(['PHY', 'CHE', 'BIO', 'MAT']);
  const [questions, setQuestions] = useState<any[]>([]);

  // Manual Question state
  const [manualQText, setManualQText] = useState<string>('');
  const [optA, setOptA] = useState<string>('');
  const [optB, setOptB] = useState<string>('');
  const [optC, setOptC] = useState<string>('');
  const [optD, setOptD] = useState<string>('');
  const [correctOpt, setCorrectOpt] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // Modal for PDF import
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/templates')
      .then((res) => res.json())
      .then((data) => {
        if (data.templates) {
          setTemplates(data.templates);
          if (templateCodeParam) {
            const found = data.templates.find((t: ExamTemplate) => t.code === templateCodeParam);
            if (found) applyTemplate(found);
          }
        }
      })
      .catch(() => {});
  }, [templateCodeParam]);

  const applyTemplate = (tpl: ExamTemplate) => {
    setSelectedTemplate(tpl.code);
    setTitle(`ETHEX 2026: ${tpl.name}`);
    setTargetStream(tpl.target_stream);
    setDurationMinutes(tpl.duration_minutes);
    setMarksPerCorrect(tpl.subjects[0]?.marks_per_correct || 4);
    setNegativeMarking(tpl.subjects[0]?.negative_marking ?? 1);
    const codes = tpl.subjects.map((s) => s.code);
    setSubjectsList(codes);
    if (codes.length > 0) setActiveSubject(codes[0]);
  };

  const handleAddManualQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQText.trim()) return;

    const newQ = {
      id: `manual_q_${Date.now()}`,
      subject_id: activeSubject,
      question_text: manualQText,
      marks: marksPerCorrect,
      negative_marks: negativeMarking,
      difficulty: 'medium',
      options: [
        { option_label: 'A', option_text: optA || 'Option A', is_correct: correctOpt === 'A' },
        { option_label: 'B', option_text: optB || 'Option B', is_correct: correctOpt === 'B' },
        { option_label: 'C', option_text: optC || 'Option C', is_correct: correctOpt === 'C' },
        { option_label: 'D', option_text: optD || 'Option D', is_correct: correctOpt === 'D' },
      ],
    };

    setQuestions([...questions, newQ]);
    setManualQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setToastMsg(`Question added to ${activeSubject}!`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleFinishAndSubmit = async (status: 'draft' | 'pending_approval') => {
    setIsSubmitting(true);
    try {
      const examData = {
        code: `ETHEX-${Date.now().toString().slice(-4)}`,
        title,
        class_category: classCategory,
        target_stream: targetStream,
        description,
        mode,
        fee_type: 'free',
        fee_amount: 0,
        currency: 'INR',
        registration_start: new Date().toISOString(),
        registration_end: new Date(Date.now() + 86400000 * 30).toISOString(),
        exam_date: new Date(examDate).toISOString(),
        duration_minutes: durationMinutes,
        total_questions: questions.length,
        total_marks: questions.reduce((acc, q) => acc + (q.marks || 4), 0),
        marks_per_correct: marksPerCorrect,
        negative_marking: negativeMarking,
        status: status === 'pending_approval' ? 'review' : 'draft',
        approval_status: status === 'pending_approval' ? 'pending_approval' : 'draft',
        creator_role: 'teacher',
        creator_name: 'Faculty Educator',
        template_code: selectedTemplate,
      };

      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          examData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create exam');

      const createdExamId = data.exam?.id;

      // Also bulk add questions if any
      if (questions.length > 0 && createdExamId) {
        await fetch(`/api/exam/questions?examId=${createdExamId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'bulk_add',
            questions,
          }),
        });
      }

      router.push('/teacher');
    } catch (err: any) {
      alert(err.message || 'Error saving examination');
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Test Pattern & Template' },
    { num: 2, label: 'Schedule & Settings' },
    { num: 3, label: 'Subject Questions & PDF' },
    { num: 4, label: 'Review & Verify' },
    { num: 5, label: 'Publish / Submit' },
  ];

  const totalCalculatedMarks = questions.reduce((acc, q) => acc + (q.marks || marksPerCorrect), 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/teacher"
              className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <CompanyNavbarLogo />
            <div className="hidden sm:block h-6 w-[1.5px] bg-slate-200"></div>
            <span className="font-extrabold text-xs text-indigo-900 uppercase tracking-wide bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              CREATE EXAMINATION WIZARD
            </span>
          </div>

          <Link
            href="/teacher"
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            Cancel & Exit
          </Link>
        </div>
      </header>

      {/* Main Wizard */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-5 gap-2 text-center">
            {steps.map((s) => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isActive
                        ? 'bg-euro-royal text-white ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold mt-1.5 hidden sm:block ${
                      isActive ? 'text-euro-royal' : isDone ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {toastMsg && (
          <div className="p-3 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* STEP 1: Select Template Pattern */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 1: Select Examination Pattern</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pick a ready-made entrance examination template (NEET, JEE, Foundation) or choose a custom pattern.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {templates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.code;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => applyTemplate(tpl)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-euro-royal bg-blue-50/50 shadow-md ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                          {tpl.code}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-euro-royal" />}
                      </div>
                      <h3 className="font-extrabold text-sm text-slate-900">{tpl.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{tpl.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-600 font-bold">
                      <span>{tpl.total_questions} Questions</span>
                      <span className="text-euro-royal">{tpl.duration_minutes} mins</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Continue to Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Schedule & Settings */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 2: Test Details & Schedule</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Specify examination name, eligible grades, examination mode, and start time.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Examination Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Eligible Class / Grade</label>
                  <select
                    value={classCategory}
                    onChange={(e) => setClassCategory(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Competitive Stream</label>
                  <select
                    value={targetStream}
                    onChange={(e) => setTargetStream(e.target.value as any)}
                    className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  >
                    <option value="Foundation">Foundation & Olympiad</option>
                    <option value="JEE">IIT-JEE (Main + Advanced)</option>
                    <option value="NEET">NEET-UG Medical</option>
                    <option value="MHT-CET">MHT-CET Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Examination Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as any)}
                    className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  >
                    <option value="hybrid">Hybrid (Online CBT + Offline Centre)</option>
                    <option value="online">Online CBT Only</option>
                    <option value="offline">Offline Campus Centre Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Exam Date & Time</label>
                  <input
                    type="datetime-local"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10) || 60)}
                    className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marking Scheme (+ / -)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={marksPerCorrect}
                      onChange={(e) => setMarksPerCorrect(parseFloat(e.target.value) || 4)}
                      className="w-full text-xs font-bold px-2 py-2.5 rounded-xl border border-slate-300 text-center"
                      placeholder="+4"
                    />
                    <span className="text-slate-400">/</span>
                    <input
                      type="number"
                      value={negativeMarking}
                      onChange={(e) => setNegativeMarking(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs font-bold px-2 py-2.5 rounded-xl border border-slate-300 text-center text-rose-600"
                      placeholder="-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Add Questions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Easy Subject-Wise Question Builder */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 3: Subject-Wise Question Builder</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add questions per subject or import questions directly from your PDF question papers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-xs hover:from-amber-300 hover:to-amber-400 transition-all flex items-center gap-1.5"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Import from PDF Paper</span>
                </button>
              </div>
            </div>

            {/* Subject Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {subjectsList.map((subj) => {
                const count = questions.filter((q) => q.subject_id === subj).length;
                const isCurrent = activeSubject === subj;
                return (
                  <button
                    key={subj}
                    onClick={() => setActiveSubject(subj)}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                      isCurrent
                        ? 'bg-euro-royal text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>
                      {subj === 'PHY'
                        ? 'Physics'
                        : subj === 'CHE'
                        ? 'Chemistry'
                        : subj === 'BIO'
                        ? 'Biology'
                        : subj === 'MAT'
                        ? 'Mathematics'
                        : subj}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Question Stats Bar */}
            <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200/80 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-900">
                Total Exam Questions: <strong>{questions.length}</strong> | Total Marks: <strong>{totalCalculatedMarks}</strong>
              </span>
              <span className="text-slate-600">
                Active Subject: <strong>{activeSubject}</strong> ({questions.filter((q) => q.subject_id === activeSubject).length} added)
              </span>
            </div>

            {/* Question Creation Form */}
            <form onSubmit={handleAddManualQuestion} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wide text-slate-700 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-euro-royal" />
                  <span>Add Question to {activeSubject}</span>
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">Marks: +{marksPerCorrect} / -{negativeMarking}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Question Statement / Problem</label>
                <textarea
                  rows={3}
                  value={manualQText}
                  onChange={(e) => setManualQText(e.target.value)}
                  placeholder="Enter the question here (supports equations, symbols, and formatting)..."
                  className="w-full text-xs font-semibold p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  required
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'A', val: optA, setVal: setOptA },
                  { label: 'B', val: optB, setVal: setOptB },
                  { label: 'C', val: optC, setVal: setOptC },
                  { label: 'D', val: optD, setVal: setOptD },
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => setCorrectOpt(item.label as any)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                      correctOpt === item.label
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        correctOpt === item.label
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {correctOpt === item.label ? <Check className="w-3.5 h-3.5" /> : item.label}
                    </div>
                    <input
                      type="text"
                      placeholder={`Option ${item.label} text`}
                      value={item.val}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => item.setVal(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none focus:bg-white px-1.5 py-0.5 rounded font-medium"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Click on an option above to mark it as the <strong>Correct Answer</strong>.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save Question to {activeSubject}</span>
                </button>
              </div>
            </form>

            {/* List of Added Questions in Active Subject */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                Added Questions in {activeSubject} ({questions.filter((q) => q.subject_id === activeSubject).length})
              </h4>

              {questions.filter((q) => q.subject_id === activeSubject).length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                  No questions added for {activeSubject} yet. Type a question above or click &quot;Import from PDF Paper&quot;.
                </div>
              ) : (
                questions
                  .filter((q) => q.subject_id === activeSubject)
                  .map((q, idx) => (
                    <div key={q.id || idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-800">Q{idx + 1}.</span>
                          <span className="text-xs font-semibold text-slate-900">{q.question_text}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                          {q.options?.map((opt: any) => (
                            <span
                              key={opt.option_label}
                              className={`text-[11px] px-2 py-1 rounded-lg truncate ${
                                opt.is_correct
                                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              ({opt.option_label}) {opt.option_text}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Review Examination ({questions.length} Qs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Review and Verify */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 4: Examination Review & Integrity Check</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Verify complete paper structure, total marks, subject question counts, and answer key integrity.
              </p>
            </div>

            {/* Integrity Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Questions</span>
                <span className="text-xl font-black text-slate-900">{questions.length}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Total Marks</span>
                <span className="text-xl font-black text-slate-900">{totalCalculatedMarks}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Duration</span>
                <span className="text-xl font-black text-slate-900">{durationMinutes} mins</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Integrity Status</span>
                <span className="text-xs font-black text-emerald-600 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-4 h-4" /> Verified Ready
                </span>
              </div>
            </div>

            {/* Subject Distribution */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-700">Subject Distribution</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {subjectsList.map((s) => (
                  <div key={s} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{s}</span>
                    <span className="font-extrabold text-euro-royal">
                      {questions.filter((q) => q.subject_id === s).length} Qs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                ← Back to Questions
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
              >
                <span>Proceed to Publishing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Publish or Save as Draft */}
        {step === 5 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Step 5: Publish or Submit for Approval</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Choose how you want to save this examination in the ETHEX Campus management system.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl border-2 border-emerald-500 bg-emerald-50/40 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-900">Submit for Admin Approval</h3>
                <p className="text-xs text-slate-600">
                  Submits the complete paper to the head administrator for final verification and one-click publishing to students.
                </p>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleFinishAndSubmit('pending_approval')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit to Admin Portal'}
                </button>
              </div>

              <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-700 text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-black text-base text-slate-900">Save as Draft</h3>
                <p className="text-xs text-slate-600">
                  Saves the examination in your private workspace. You can edit, add more questions, or import more PDFs anytime.
                </p>
                <button
                  disabled={isSubmitting}
                  onClick={() => handleFinishAndSubmit('draft')}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs transition-all"
                >
                  {isSubmitting ? 'Saving...' : 'Save as Draft'}
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-start">
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                ← Back to Review
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PDF Converter Modal */}
      <PdfQuestionConverterModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        onQuestionsSaved={(newQs) => {
          setQuestions([...questions, ...newQs]);
          setToastMsg(`Successfully added ${newQs.length} questions from PDF!`);
          setTimeout(() => setToastMsg(null), 3000);
        }}
      />
    </div>
  );
}

export default function CreateExamWizardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">Loading Test Creator...</div>}>
      <CreateExamWizardContent />
    </Suspense>
  );
}
