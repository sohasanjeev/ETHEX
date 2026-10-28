'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Plus,
  X,
  Edit3,
  HelpCircle,
  Check,
  Eye,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ExtractedParsedQuestion } from '@/lib/parser/pdfQuestionParser';

interface PdfQuestionConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  examId?: string;
  onQuestionsSaved: (newQuestions: any[]) => void;
}

export const PdfQuestionConverterModal: React.FC<PdfQuestionConverterModalProps> = ({
  isOpen,
  onClose,
  examId,
  onQuestionsSaved,
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'upload' | 'paste'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [subject, setSubject] = useState<string>('PHY');
  const [defaultMarks, setDefaultMarks] = useState<number>(4);
  const [defaultNegativeMarks, setDefaultNegativeMarks] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Review step state
  const [step, setStep] = useState<'input' | 'review'>('input');
  const [extractedQuestions, setExtractedQuestions] = useState<ExtractedParsedQuestion[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [previewFilter, setPreviewFilter] = useState<'all' | 'needs_review'>('all');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setErrorMsg('Please select a valid PDF file (.pdf)');
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setErrorMsg('Please drop a valid PDF document (.pdf)');
        return;
      }
      setSelectedFile(file);
      setErrorMsg(null);
    }
  };

  const handleParse = async () => {
    setErrorMsg(null);
    setIsProcessing(true);

    try {
      let res;
      if (activeInputTab === 'upload') {
        if (!selectedFile) {
          setErrorMsg('Please choose a PDF question paper to upload');
          setIsProcessing(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('subject', subject);
        formData.append('marks', defaultMarks.toString());
        formData.append('negativeMarks', defaultNegativeMarks.toString());

        res = await fetch('/api/exam/parse-pdf', {
          method: 'POST',
          body: formData,
        });
      } else {
        if (!pastedText.trim()) {
          setErrorMsg('Please paste your question paper or test text');
          setIsProcessing(false);
          return;
        }

        res = await fetch('/api/exam/parse-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: pastedText,
            subject,
            marks: defaultMarks,
            negativeMarks: defaultNegativeMarks,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to parse questions');
      }

      if (!data.questions || data.questions.length === 0) {
        // Provide helpful feedback with sample if extraction was empty
        setErrorMsg('No structured questions detected in the uploaded PDF. You can switch to the "Paste Paper Text" tab to review or paste text directly.');
        setIsProcessing(false);
        return;
      }

      setExtractedQuestions(data.questions);
      setStep('review');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error converting PDF into questions. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Editor mutation handlers
  const handleUpdateQuestionText = (index: number, text: string) => {
    const updated = [...extractedQuestions];
    updated[index].question_text = text;
    setExtractedQuestions(updated);
  };

  const handleUpdateOptionText = (qIndex: number, optIndex: number, text: string) => {
    const updated = [...extractedQuestions];
    updated[qIndex].options[optIndex].option_text = text;
    setExtractedQuestions(updated);
  };

  const handleSelectCorrectOption = (qIndex: number, optLabel: 'A' | 'B' | 'C' | 'D') => {
    const updated = [...extractedQuestions];
    updated[qIndex].options.forEach((opt) => {
      opt.is_correct = opt.option_label === optLabel;
    });
    updated[qIndex].missing_answer_key = false;
    updated[qIndex].needs_review = updated[qIndex].missing_options;
    setExtractedQuestions(updated);
  };

  const handleUpdateMarks = (index: number, marks: number, neg: number) => {
    const updated = [...extractedQuestions];
    updated[index].marks = marks;
    updated[index].negative_marks = neg;
    setExtractedQuestions(updated);
  };

  const handleDeleteQuestion = (index: number) => {
    const updated = extractedQuestions.filter((_, i) => i !== index);
    setExtractedQuestions(updated);
  };

  const handleAddOption = (qIndex: number) => {
    const updated = [...extractedQuestions];
    const q = updated[qIndex];
    const nextLabels: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
    const used = q.options.map((o) => o.option_label);
    const available = nextLabels.find((l) => !used.includes(l));
    if (available) {
      q.options.push({
        id: `opt_${Date.now()}_${available.toLowerCase()}`,
        option_label: available,
        option_text: `New Option ${available}`,
        is_correct: false,
      });
      q.missing_options = q.options.length < 4;
      setExtractedQuestions(updated);
    }
  };

  const handleSaveAll = async () => {
    if (extractedQuestions.length === 0) return;
    setIsSaving(true);

    try {
      const targetExamId = examId || 'e1111111-1111-1111-1111-111111111111';

      // Bulk add via API
      const res = await fetch(`/api/exam/questions?examId=${targetExamId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_add',
          questions: extractedQuestions.map((q) => ({
            subject_id: q.subject_id || subject,
            class_category: 'Class 10',
            target_stream: 'Foundation',
            question_text: q.question_text,
            difficulty: q.difficulty || 'medium',
            marks: q.marks || defaultMarks,
            negative_marks: q.negative_marks ?? defaultNegativeMarks,
            explanation: q.explanation || '',
            options: q.options.map((o) => ({
              option_label: o.option_label,
              option_text: o.option_text,
              is_correct: o.is_correct,
            })),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save questions');

      onQuestionsSaved(data.questions || extractedQuestions);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save questions to test');
    } finally {
      setIsSaving(false);
    }
  };

  const missingKeyCount = extractedQuestions.filter((q) => q.missing_answer_key).length;
  const filteredQuestions = previewFilter === 'needs_review'
    ? extractedQuestions.filter((q) => q.needs_review || q.missing_answer_key)
    : extractedQuestions;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>PDF Question Paper to MCQ Converter</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold uppercase">
                  AI-Powered
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                {step === 'input'
                  ? 'Upload question PDF or paste paper text to extract structured MCQs automatically.'
                  : `Review and verify ${extractedQuestions.length} extracted questions before publishing.`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Notice</span>
                <span>{errorMsg}</span>
              </div>
              <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'input' ? (
            <div className="space-y-6">
              {/* Settings Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  >
                    <option value="PHY">Physics</option>
                    <option value="CHE">Chemistry</option>
                    <option value="BIO">Biology (Botany + Zoology)</option>
                    <option value="MAT">Mathematics</option>
                    <option value="MAT_APT">Mental Ability & Aptitude</option>
                    <option value="GEN">General Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marks per Correct (+)</label>
                  <input
                    type="number"
                    value={defaultMarks}
                    onChange={(e) => setDefaultMarks(parseFloat(e.target.value) || 4)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Negative Marking (-)</label>
                  <input
                    type="number"
                    value={defaultNegativeMarks}
                    onChange={(e) => setDefaultNegativeMarks(parseFloat(e.target.value) || 0)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>
              </div>

              {/* Input Switch Tabs */}
              <div className="flex border-b border-slate-200">
                <button
                  onClick={() => setActiveInputTab('upload')}
                  className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                    activeInputTab === 'upload'
                      ? 'border-euro-royal text-euro-royal'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload PDF Document</span>
                </button>
                <button
                  onClick={() => setActiveInputTab('paste')}
                  className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                    activeInputTab === 'paste'
                      ? 'border-euro-royal text-euro-royal'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Paste Question Paper Text</span>
                </button>
              </div>

              {activeInputTab === 'upload' ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-300 hover:border-euro-royal rounded-3xl p-8 text-center transition-all bg-slate-50/50 hover:bg-blue-50/20 cursor-pointer relative"
                >
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-euro-royal flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  {selectedFile ? (
                    <div className="space-y-1">
                      <p className="text-sm font-extrabold text-slate-900">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for AI conversion</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                        Click &quot;Convert to MCQs&quot; below to proceed
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-slate-800">Drag & drop your question paper PDF here, or click to browse</p>
                      <p className="text-xs text-slate-500">Supports NEET, JEE, Foundation, and School objective test question papers.</p>
                      <span className="inline-block mt-1 px-3 py-1 bg-slate-200/80 text-slate-700 rounded-full text-[11px] font-semibold">
                        Format: Question Statements with (A), (B), (C), (D) Options & Answer Keys
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">Paste Question Paper Content / Scanned OCR Text</label>
                    <button
                      onClick={() =>
                        setPastedText(
                          `Q. 1 An electric lamp of resistance 20 ohm is connected to a 6V battery. The current is:\n(A) 0.3 A\n(B) 0.5 A\n(C) 1.2 A\n(D) 2.4 A\nAns: (A)\n\nQ. 2 Which gas is released during photosynthesis?\n(A) Carbon dioxide\n(B) Oxygen\n(C) Nitrogen\n(D) Methane\nAns: (B)`
                        )
                      }
                      className="text-xs font-bold text-euro-royal hover:underline"
                    >
                      Insert Sample Demo Text
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste question text here. Example:&#10;Q. 1 What is the SI unit of electric current?&#10;(A) Volt&#10;(B) Ampere&#10;(C) Ohm&#10;(D) Watt&#10;Ans: (B)"
                    className="w-full text-xs font-mono p-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>
              )}
            </div>
          ) : (
            /* Review and Edit Questions Step */
            <div className="space-y-5">
              {/* Summary Bar */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-euro-royal text-white flex items-center justify-center font-bold text-sm">
                    {extractedQuestions.length}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">Extracted Questions</h4>
                    <p className="text-[11px] text-slate-500">
                      Verify every question before saving. Missing answer keys are highlighted.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      previewFilter === 'all'
                        ? 'bg-euro-royal text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300'
                    }`}
                  >
                    All ({extractedQuestions.length})
                  </button>
                  {missingKeyCount > 0 && (
                    <button
                      onClick={() => setPreviewFilter('needs_review')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        previewFilter === 'needs_review'
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'bg-amber-50 text-amber-800 border border-amber-300'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Missing Answer Key ({missingKeyCount})</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Questions Cards */}
              <div className="space-y-4">
                {filteredQuestions.map((q, idx) => {
                  const globalIdx = extractedQuestions.findIndex((item) => item.id === q.id);
                  return (
                    <div
                      key={q.id || globalIdx}
                      className={`p-5 rounded-2xl border transition-all ${
                        q.missing_answer_key
                          ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 font-extrabold text-xs flex items-center justify-center">
                            #{q.question_number || globalIdx + 1}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                            {q.subject_id}
                          </span>
                          {q.missing_answer_key && (
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950 animate-pulse">
                              Select Correct Option
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-slate-500 font-semibold">Marks:</span>
                            <input
                              type="number"
                              value={q.marks}
                              onChange={(e) =>
                                handleUpdateMarks(globalIdx, parseFloat(e.target.value) || 4, q.negative_marks)
                              }
                              className="w-12 text-xs font-bold px-1.5 py-0.5 border border-slate-300 rounded text-center"
                            />
                            <span className="text-slate-400">/</span>
                            <input
                              type="number"
                              value={q.negative_marks}
                              onChange={(e) =>
                                handleUpdateMarks(globalIdx, q.marks, parseFloat(e.target.value) || 0)
                              }
                              className="w-10 text-xs font-bold px-1.5 py-0.5 border border-slate-300 rounded text-center text-rose-600"
                            />
                          </div>

                          <button
                            onClick={() => handleDeleteQuestion(globalIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Remove Question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <textarea
                        rows={2}
                        value={q.question_text}
                        onChange={(e) => handleUpdateQuestionText(globalIdx, e.target.value)}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal mb-3"
                      />

                      {/* Options List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIdx) => (
                          <div
                            key={opt.option_label}
                            onClick={() => handleSelectCorrectOption(globalIdx, opt.option_label)}
                            className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${
                              opt.is_correct
                                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30'
                                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                opt.is_correct ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border border-slate-300 text-slate-700'
                              }`}
                            >
                              {opt.is_correct ? <Check className="w-3.5 h-3.5" /> : opt.option_label}
                            </div>
                            <input
                              type="text"
                              value={opt.option_text}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleUpdateOptionText(globalIdx, optIdx, e.target.value)}
                              className="w-full text-xs bg-transparent focus:outline-none focus:bg-white px-1.5 py-0.5 rounded"
                            />
                          </div>
                        ))}
                      </div>

                      {q.options.length < 4 && (
                        <button
                          onClick={() => handleAddOption(globalIdx)}
                          className="text-[11px] font-bold text-euro-royal hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Option
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          {step === 'review' ? (
            <button
              onClick={() => setStep('input')}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-all"
            >
              ← Back to Upload
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
            >
              Cancel
            </button>
          )}

          <div className="flex items-center gap-3">
            {step === 'input' ? (
              <button
                onClick={handleParse}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-euro-royal to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Extracting & Parsing Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Convert to MCQs with AI</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleSaveAll}
                disabled={isSaving || extractedQuestions.length === 0}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving to Test Bank...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save {extractedQuestions.length} Questions to Test</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfQuestionConverterModal;
