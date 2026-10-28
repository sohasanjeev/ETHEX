'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  PlusCircle,
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  BookOpen,
  Layers,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Send,
  Eye,
  Check,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Exam, ExamTemplate, Question } from '@/lib/types';
import PdfQuestionConverterModal from '@/components/teacher/PdfQuestionConverterModal';
import CompanyNavbarLogo from '@/components/branding/CompanyNavbarLogo';

export default function TeacherPortalPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [templates, setTemplates] = useState<ExamTemplate[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string>('');
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'my_tests' | 'templates' | 'question_bank'>('my_tests');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [examsRes, tplRes] = await Promise.all([
        fetch('/api/exams'),
        fetch('/api/templates'),
      ]);
      const examsData = await examsRes.json();
      const tplData = await tplRes.json();

      if (examsData.exams) {
        setExams(examsData.exams);
        if (examsData.exams.length > 0) {
          setSelectedExamId(examsData.exams[0].id);
        }
      }
      if (tplData.templates) {
        setTemplates(tplData.templates);
      }
    } catch (err) {
      console.warn('Error loading teacher portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSubmitForApproval = async (examId: string) => {
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_approval',
          examId,
          creatorName: 'Authorized Faculty',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Examination submitted to Admin for verification and publishing!');
        fetchData();
      }
    } catch {
      showToast('Error submitting examination');
    }
  };

  const filteredExams = exams.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.class_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.target_stream.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar for Teacher Portal */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CompanyNavbarLogo />
            <div className="hidden sm:block h-7 w-[1.5px] bg-slate-200"></div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 font-extrabold text-xs uppercase tracking-wide border border-indigo-200">
                TEACHER & FACULTY PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-euro-royal hidden md:block"
            >
              Public Website
            </Link>
            <Link
              href="/admin"
              className="text-xs font-bold text-slate-600 hover:text-euro-royal hidden md:block"
            >
              Admin Portal
            </Link>
            <Link
              href="/teacher/exams/create"
              className="px-4 py-2 bg-gradient-to-r from-euro-royal to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Test</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {toastMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Hero Banner for Teacher */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white p-6 sm:p-8 overflow-hidden shadow-lg border border-amber-500/20">
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 font-extrabold text-[11px] tracking-wide uppercase border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Coder Examination Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Create, Upload, and Publish Examinations in Minutes
            </h1>
            <p className="text-xs sm:text-sm text-slate-200">
              Teachers can create tests directly without asking a developer. Upload question PDFs to convert them into CBT questions, use ready-made NEET/JEE templates, and submit papers for admin review.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/teacher/exams/create"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md hover:from-amber-300 hover:to-amber-400 transition-all flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-slate-950" />
                <span>Create New Test Now</span>
              </Link>
              <button
                onClick={() => setShowPdfModal(true)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-amber-300" />
                <span>Upload Question Paper PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('my_tests')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'my_tests'
                  ? 'border-euro-royal text-euro-royal'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>My Examinations ({exams.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'templates'
                  ? 'border-euro-royal text-euro-royal'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Ready-Made Templates ({templates.length})</span>
            </button>
          </div>

          <div className="pb-2 hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal w-48 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: My Examinations */}
        {activeTab === 'my_tests' && (
          <div className="space-y-4">
            {filteredExams.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No examinations found</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Get started by creating your first examination or selecting a ready-made template.
                </p>
                <Link
                  href="/teacher/exams/create"
                  className="px-5 py-2.5 bg-euro-royal text-white font-bold text-xs rounded-xl inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create First Test</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredExams.map((exam) => {
                  const isDraft = exam.status === 'draft';
                  const isReview = exam.status === 'review' || exam.approval_status === 'pending_approval';
                  const isOpen = exam.status === 'open';

                  return (
                    <div
                      key={exam.id}
                      className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                            {exam.class_category} • {exam.target_stream}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isOpen
                                ? 'bg-emerald-100 text-emerald-800'
                                : isReview
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isOpen ? 'Live & Published' : isReview ? 'Pending Approval' : 'Draft'}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-euro-royal transition-colors line-clamp-2">
                            {exam.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{exam.description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center">
                          <div>
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Questions</span>
                            <span className="font-black text-slate-800 text-xs">{exam.total_questions}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Marks</span>
                            <span className="font-black text-slate-800 text-xs">{exam.total_marks}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase">Duration</span>
                            <span className="font-black text-slate-800 text-xs">{exam.duration_minutes}m</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedExamId(exam.id);
                              setShowPdfModal(true);
                            }}
                            className="flex-1 py-2 text-center bg-blue-50 hover:bg-blue-100 text-euro-royal rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>Import PDF</span>
                          </button>

                          <Link
                            href={`/student/exam/${exam.id}?examId=${exam.id}`}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                            title="Preview Student Experience"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>

                        {isDraft && (
                          <button
                            onClick={() => handleSubmitForApproval(exam.id)}
                            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit for Admin Approval</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Ready-Made Examination Templates */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-900">
                      {tpl.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{tpl.duration_minutes} Minutes</span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">{tpl.name}</h3>
                    <p className="text-xs text-slate-600 mt-1">{tpl.description}</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Subjects & Sections</span>
                    {tpl.subjects.map((s) => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{s.name}</span>
                        <span className="font-bold text-euro-royal">{s.questions_count} Qs (+{s.marks_per_correct}/-{s.negative_marking})</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500">Total: <strong>{tpl.total_questions} Questions</strong></span>
                    <span className="text-slate-500">Max Marks: <strong className="text-slate-900">{tpl.total_marks}</strong></span>
                  </div>
                </div>

                <div className="pt-5">
                  <Link
                    href={`/teacher/exams/create?template=${tpl.code}`}
                    className="w-full py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs text-center block shadow-xs transition-colors"
                  >
                    Use This Template to Create Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PDF Question Converter Modal */}
      <PdfQuestionConverterModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        examId={selectedExamId}
        onQuestionsSaved={() => {
          showToast('Questions successfully parsed, verified, and saved!');
          fetchData();
        }}
      />
    </div>
  );
}
