'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Settings,
  Calendar,
  Award,
  Users,
  CreditCard,
  Building,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  LogOut,
  PlusCircle,
  ExternalLink,
  Phone,
  Mail,
  Sparkles,
  Rocket,
  RefreshCw,
  BookOpen,
  Trash2,
  PlayCircle,
  UploadCloud,
  Check,
  HelpCircle,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { SiteSettings, Exam, Application, ExamCentre, Question } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'settings' | 'metrics' | 'exams' | 'tests' | 'applications' | 'centres' | 'finance'>('settings');
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Additional admin data
  const [exams, setExams] = useState<Exam[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [centres, setCentres] = useState<ExamCentre[]>([]);
  const [metrics, setMetrics] = useState<any>({
    totalStudents: 1420,
    totalApplications: 842,
    confirmedApps: 785,
    onlineApps: 480,
    offlineApps: 305,
    centresCount: 3,
    revenueCollected: 142500,
  });

  // New exam form state
  const [showNewExamModal, setShowNewExamModal] = useState(false);
  const [newExamData, setNewExamData] = useState({
    code: 'ETHEX-NEW',
    title: 'ETHEX 2026: Special Scholarship Test',
    class_category: 'Class 10',
    target_stream: 'Foundation' as const,
    description: 'Special diagnostic and scholarship examination.',
    mode: 'hybrid' as const,
    fee_type: 'free' as const,
    fee_amount: 0,
    currency: 'INR',
    registration_start: new Date().toISOString(),
    registration_end: new Date(Date.now() + 86400000 * 30).toISOString(),
    exam_date: new Date(Date.now() + 86400000 * 45).toISOString(),
    duration_minutes: 90,
    total_questions: 50,
    total_marks: 200,
    marks_per_correct: 4,
    negative_marking: 1,
    status: 'open' as const,
  });

  // Question Bank & Online Test states
  const [selectedExamId, setSelectedExamId] = useState<string>('e1111111-1111-1111-1111-111111111111');
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState<boolean>(false);

  const [questionFormData, setQuestionFormData] = useState({
    subject_id: 'MAT',
    class_category: 'Class 10',
    target_stream: 'Foundation',
    question_text: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    marks: 4,
    negative_marks: 1,
    explanation: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_option: 'A' as 'A' | 'B' | 'C' | 'D',
  });

  const [bulkQuestionsJson, setBulkQuestionsJson] = useState<string>('');

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem('ethex_admin_session');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }

    loadAdminData();
  }, [router]);

  const loadAdminData = async () => {
    try {
      const [settingsRes, examsRes, appsRes, centresRes] = await Promise.all([
        fetch('/api/site-settings').then((r) => r.json()),
        fetch('/api/exams').then((r) => r.json()),
        fetch('/api/applications/list').then((r) => r.json()),
        fetch('/api/centres').then((r) => r.json()),
      ]);

      if (settingsRes) setSettings(settingsRes);
      if (examsRes.exams) {
        setExams(examsRes.exams);
        if (examsRes.exams.length > 0 && !selectedExamId) {
          setSelectedExamId(examsRes.exams[0].id);
        }
      }
      if (appsRes.applications) setApplications(appsRes.applications);
      if (centresRes.centres) setCentres(centresRes.centres);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    }
  };

  const loadQuestions = async (examId: string) => {
    setLoadingQuestions(true);
    try {
      const res = await fetch(`/api/exam/questions?examId=${examId}&isAdmin=true`);
      const data = await res.json();
      if (data.questions) {
        setQuestionsList(data.questions);
      }
    } catch (err) {
      console.warn('Error loading questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'tests' && selectedExamId) {
      loadQuestions(selectedExamId);
    }
  }, [activeTab, selectedExamId]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSavingSettings(true);
    setToastMessage(null);

    try {
      const res = await fetch('/api/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setToastMessage('Site settings & examination configuration updated successfully!');
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExamData),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewExamModal(false);
        setToastMessage('New examination created successfully!');
        loadAdminData();
      }
    } catch (err) {
      console.error('Error creating exam:', err);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionFormData.question_text || !questionFormData.option_a || !questionFormData.option_b) {
      alert('Please fill in the question statement and at least Option A and Option B.');
      return;
    }

    try {
      const res = await fetch('/api/exam/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: selectedExamId,
          question: {
            subject_id: questionFormData.subject_id,
            class_category: questionFormData.class_category,
            target_stream: questionFormData.target_stream,
            question_text: questionFormData.question_text,
            difficulty: questionFormData.difficulty,
            marks: Number(questionFormData.marks),
            negative_marks: Number(questionFormData.negative_marks),
            explanation: questionFormData.explanation,
            options: [
              { option_label: 'A', option_text: questionFormData.option_a, is_correct: questionFormData.correct_option === 'A' },
              { option_label: 'B', option_text: questionFormData.option_b, is_correct: questionFormData.correct_option === 'B' },
              { option_label: 'C', option_text: questionFormData.option_c, is_correct: questionFormData.correct_option === 'C' },
              { option_label: 'D', option_text: questionFormData.option_d, is_correct: questionFormData.correct_option === 'D' },
            ],
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowAddQuestionModal(false);
        setToastMessage('Question added to test bank successfully!');
        setQuestionFormData({
          subject_id: 'MAT',
          class_category: 'Class 10',
          target_stream: 'Foundation',
          question_text: '',
          difficulty: 'medium',
          marks: 4,
          negative_marks: 1,
          explanation: '',
          option_a: '',
          option_b: '',
          option_c: '',
          option_d: '',
          correct_option: 'A',
        });
        loadQuestions(selectedExamId);
        loadAdminData();
      }
    } catch (err) {
      console.error('Error adding question:', err);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(bulkQuestionsJson);
      if (!Array.isArray(parsed)) {
        alert('JSON must be an array of questions. Click "Load Sample Template" to see the correct format.');
        return;
      }

      const res = await fetch('/api/exam/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examId: selectedExamId,
          bulkQuestions: parsed,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setShowBulkUploadModal(false);
        setToastMessage(`Bulk uploaded ${data.count || parsed.length} questions successfully!`);
        loadQuestions(selectedExamId);
        loadAdminData();
      }
    } catch (err) {
      alert('Invalid JSON format. Please verify braces and quotes.');
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`/api/exam/questions?examId=${selectedExamId}&questionId=${qId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setToastMessage('Question removed from test bank.');
        loadQuestions(selectedExamId);
        loadAdminData();
      }
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const handleLoadSampleTemplate = () => {
    const sample = [
      {
        subject_id: 'PHY',
        question_text: 'What is the SI unit of electric potential difference (voltage)?',
        difficulty: 'easy',
        marks: 4,
        negative_marks: 1,
        explanation: 'Volt (V) is the SI unit of electric potential difference, named after Alessandro Volta.',
        options: [
          { option_label: 'A', option_text: 'Ampere', is_correct: false },
          { option_label: 'B', option_text: 'Volt', is_correct: true },
          { option_label: 'C', option_text: 'Ohm', is_correct: false },
          { option_label: 'D', option_text: 'Coulomb', is_correct: false }
        ]
      },
      {
        subject_id: 'CHE',
        question_text: 'Which gas is evolved when zinc metal reacts with dilute hydrochloric acid?',
        difficulty: 'easy',
        marks: 4,
        negative_marks: 1,
        explanation: 'Zn + 2HCl -> ZnCl2 + H2 (Hydrogen gas evolves with a pop sound).',
        options: [
          { option_label: 'A', option_text: 'Oxygen (O2)', is_correct: false },
          { option_label: 'B', option_text: 'Carbon dioxide (CO2)', is_correct: false },
          { option_label: 'C', option_text: 'Hydrogen (H2)', is_correct: true },
          { option_label: 'D', option_text: 'Chlorine (Cl2)', is_correct: false }
        ]
      },
      {
        subject_id: 'MAT',
        question_text: 'The discriminant of the quadratic equation x² - 5x + 6 = 0 is:',
        difficulty: 'easy',
        marks: 4,
        negative_marks: 1,
        explanation: 'D = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1.',
        options: [
          { option_label: 'A', option_text: '1', is_correct: true },
          { option_label: 'B', option_text: '0', is_correct: false },
          { option_label: 'C', option_text: '5', is_correct: false },
          { option_label: 'D', option_text: '25', is_correct: false }
        ]
      }
    ];
    setBulkQuestionsJson(JSON.stringify(sample, null, 2));
  };

  const handleLogout = () => {
    localStorage.removeItem('ethex_admin_session');
    router.push('/admin/login');
  };

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* 1. Admin Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <CombinedBrandLogo size="sm" theme="dark" />
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider hidden sm:inline-block">
            ADMINISTRATOR PORTAL
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-900 hover:bg-rose-950/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* 2. Admin Body Layout with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation (3 Cols) */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1.5">
          <div className="p-3 border-b border-slate-100 mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Control Center
            </span>
            <span className="font-bold text-xs text-euro-navy block mt-0.5">
              EURO Campus Central Admin
            </span>
          </div>

          {[
            { id: 'settings', label: 'Site Settings & CMS', icon: Settings, desc: 'Dates, Prize Money & URLs' },
            { id: 'metrics', label: 'Live Metrics & Stats', icon: Users, desc: 'Students & Applications' },
            { id: 'exams', label: 'Exam Categories', icon: FileText, desc: 'Categories, Fees & Modes' },
            { id: 'tests', label: 'Online Tests & Question Bank', icon: BookOpen, desc: 'Upload Questions, Answers & CBT' },
            { id: 'applications', label: 'Student Applications', icon: Award, desc: 'Roll Numbers & Admit Cards' },
            { id: 'centres', label: 'Centres & Rooms', icon: Building, desc: 'PCMC, Shikrapur & Seating' },
            { id: 'finance', label: 'Financial Ledger', icon: CreditCard, desc: 'Razorpay Reconciliation' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-euro-navy text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <div className="space-y-0.5">
                  <span className="font-bold text-xs block leading-tight">{item.label}</span>
                  <span className={`text-[10px] block leading-tight ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {item.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Right Main Work Area (9 Cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 rounded-xl p-4 flex items-center gap-3 text-xs font-bold shadow-md animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: SITE SETTINGS & CMS */}
          {activeTab === 'settings' && settings && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Configurable Portal Engine
                  </span>
                  <h2 className="text-xl font-bold text-euro-navy mt-1">
                    Site Configuration, Prize Money & Scheduling
                  </h2>
                  <p className="text-xs text-slate-500">
                    Update prize pools, exam years, new exam dates, official EURO Campus website URL, and announcements.
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="px-5 py-2.5 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingSettings ? 'Saving...' : 'Save Configuration'}</span>
                </button>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* 1. Exam Scheduling & Date Display */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-euro-royal" />
                    Examination Schedule & Display Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Exam Date Display Text</label>
                      <input
                        type="text"
                        value={settings.exam_date_display}
                        onChange={(e) => setSettings({ ...settings, exam_date_display: e.target.value })}
                        placeholder="To Be Announced Soon"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">ISO Date (For Timer Countdown)</label>
                      <input
                        type="datetime-local"
                        value={settings.exam_date_iso || ''}
                        onChange={(e) => setSettings({ ...settings, exam_date_iso: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Academic Year</label>
                      <input
                        type="text"
                        value={settings.academic_year}
                        onChange={(e) => setSettings({ ...settings, academic_year: e.target.value })}
                        placeholder="2027–2028"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Exam Title Branding</label>
                      <input
                        type="text"
                        value={settings.exam_name}
                        onChange={(e) => setSettings({ ...settings, exam_name: e.target.value })}
                        placeholder="ETHEX 2026"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Prize Money & Scholarships */}
                <div className="bg-amber-50/60 p-5 rounded-xl border border-amber-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    Prize Money & Scholarship Pool Controls
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Admission Scholarship Pool *</label>
                      <input
                        type="text"
                        value={settings.admission_scholarship_pool}
                        onChange={(e) => setSettings({ ...settings, admission_scholarship_pool: e.target.value })}
                        placeholder="₹2.5 CRORES"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Stage-2 Cash Prizes *</label>
                      <input
                        type="text"
                        value={settings.cash_prize_pool}
                        onChange={(e) => setSettings({ ...settings, cash_prize_pool: e.target.value })}
                        placeholder="₹10 Lacs (Stage-2)"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Max Admission Fee Waiver</label>
                      <input
                        type="text"
                        value={settings.max_scholarship_percentage}
                        onChange={(e) => setSettings({ ...settings, max_scholarship_percentage: e.target.value })}
                        placeholder="Upto 90%"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.isro_tour_enabled}
                        onChange={(e) => setSettings({ ...settings, isro_tour_enabled: e.target.checked })}
                        className="rounded border-slate-300 text-euro-royal focus:ring-euro-royal"
                      />
                      <span>Enable ISRO Educational Science Tour Incentive for Top Scorers</span>
                    </label>
                  </div>
                </div>

                {/* 3. Official Links & Helplines */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Building className="w-4 h-4 text-euro-royal" />
                    Institutional Links & Helplines
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Official EURO Campus Website URL
                    </label>
                    <input
                      type="url"
                      value={settings.euro_official_website_url}
                      onChange={(e) => setSettings({ ...settings, euro_official_website_url: e.target.value })}
                      placeholder="https://eurocampus.in/"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">PCMC Campus Helpline</label>
                      <input
                        type="text"
                        value={settings.helpline_pcmc}
                        onChange={(e) => setSettings({ ...settings, helpline_pcmc: e.target.value })}
                        placeholder="9112223354 / 9112233995"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Shikrapur Campus Helpline</label>
                      <input
                        type="text"
                        value={settings.helpline_shikrapur}
                        onChange={(e) => setSettings({ ...settings, helpline_shikrapur: e.target.value })}
                        placeholder="9607035688"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 block">Total Registrations</span>
                  <div className="text-2xl font-black text-euro-navy mt-1">{metrics.totalStudents}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 block">Confirmed Applications</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">{metrics.confirmedApps}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 block">Online CBT Tests</span>
                  <div className="text-2xl font-black text-euro-royal mt-1">{metrics.onlineApps}</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-500 block">Exam Centres Active</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">{centres.length}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM CATEGORIES */}
          {activeTab === 'exams' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-euro-navy">Examination Events & Categories</h2>
                  <p className="text-xs text-slate-500">Configure exams, fee structures, duration, and question counts.</p>
                </div>
                <button
                  onClick={() => setShowNewExamModal(true)}
                  className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" /> Create New Exam
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">Exam Code</th>
                      <th className="p-3">Title & Grade</th>
                      <th className="p-3">Stream</th>
                      <th className="p-3">Fee Type</th>
                      <th className="p-3">Duration & Marks</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {exams.map((ex) => (
                      <tr key={ex.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-euro-royal">{ex.code}</td>
                        <td className="p-3">
                          <span className="font-bold text-euro-navy block">{ex.title}</span>
                          <span className="text-[10px] text-slate-500">{ex.class_category}</span>
                        </td>
                        <td className="p-3 font-semibold">{ex.target_stream}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-slate-100">
                            {ex.fee_type === 'free' ? 'FREE' : `₹${ex.fee_amount}`}
                          </span>
                        </td>
                        <td className="p-3">
                          {ex.duration_minutes} Mins • {ex.total_questions || 5} Questions
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setSelectedExamId(ex.id);
                              setActiveTab('tests');
                            }}
                            className="px-2.5 py-1 bg-blue-50 text-euro-royal border border-blue-200 hover:bg-blue-100 rounded-lg font-bold text-[11px] flex items-center gap-1"
                          >
                            <BookOpen className="w-3 h-3" /> Manage Questions
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ONLINE TESTS & QUESTION BANK (REQUESTED FEATURE) */}
          {activeTab === 'tests' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              {/* Header with Exam Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Test Management Engine
                  </span>
                  <h2 className="text-xl font-bold text-euro-navy mt-1">
                    Question Bank & Live CBT Simulator
                  </h2>
                  <p className="text-xs text-slate-500">
                    Upload questions, set options (A–D), mark correct keys, and test the student experience with real timer.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowAddQuestionModal(true)}
                    className="px-3.5 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Single Question
                  </button>

                  <button
                    onClick={() => setShowBulkUploadModal(true)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <UploadCloud className="w-4 h-4 text-euro-gold" /> Bulk Upload (JSON)
                  </button>

                  <Link
                    href={`/student/exam/simulation?examId=${selectedExamId}`}
                    target="_blank"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" /> Simulate Test
                  </Link>
                </div>
              </div>

              {/* Selected Exam Control Bar */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-euro-royal flex-shrink-0" />
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block">Active Test Event</label>
                    <select
                      value={selectedExamId}
                      onChange={(e) => setSelectedExamId(e.target.value)}
                      className="font-bold text-xs text-euro-navy bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-euro-royal"
                    >
                      {exams.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.code} — {e.title} ({e.class_category})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">QUESTIONS</span>
                    <strong className="text-euro-navy text-sm font-black">{questionsList.length}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">DURATION</span>
                    <strong className="text-euro-navy text-sm font-black">{selectedExam?.duration_minutes || 90} Mins</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TOTAL MARKS</span>
                    <strong className="text-euro-gold text-sm font-black">
                      {questionsList.reduce((acc, q) => acc + q.marks, 0) || selectedExam?.total_marks || 200}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              {loadingQuestions ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <div className="w-8 h-8 border-3 border-euro-royal border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs">Loading questions for this exam...</p>
                </div>
              ) : questionsList.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-10 text-center space-y-3">
                  <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="font-bold text-sm text-slate-700">No Questions In This Exam Bank Yet</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click &quot;Add Single Question&quot; or &quot;Bulk Upload (JSON)&quot; to populate this test bank.
                  </p>
                  <button
                    onClick={() => setShowAddQuestionModal(true)}
                    className="px-4 py-2 bg-euro-royal text-white rounded-xl text-xs font-bold"
                  >
                    Add First Question
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {questionsList.map((q, idx) => (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 hover:border-slate-300 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-euro-navy text-white flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-euro-royal bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {q.subject_id}
                          </span>
                          <span className="text-slate-400 text-[10px] font-semibold uppercase">
                            Difficulty: {q.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-emerald-700 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                            +{q.marks} / -{q.negative_marks}
                          </span>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        {q.question_text}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                              opt.is_correct
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                                : 'border-slate-200 bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                opt.is_correct ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {opt.option_label}
                            </span>
                            <span className="flex-1 truncate">{opt.option_text}</span>
                            {opt.is_correct && (
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                                <Check className="w-3.5 h-3.5" /> Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                          <strong className="text-euro-navy block">Explanation / Solution:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-euro-navy">Student Applications & Roll Allocation</h2>
                <p className="text-xs text-slate-500">Live roster of submitted candidate applications across categories.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">App Number</th>
                      <th className="p-3">Roll Number</th>
                      <th className="p-3">Mode</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Admit Card</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-800">{app.application_number}</td>
                        <td className="p-3 font-mono font-bold text-euro-royal">{app.roll_number || 'Pending'}</td>
                        <td className="p-3 font-semibold uppercase">{app.selected_mode}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {app.application_status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3">
                          {app.admit_card_published ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Published
                            </span>
                          ) : (
                            <span className="text-slate-400">Draft</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Link
                            href={`/student/exam/${app.id}?examId=${app.exam_id}`}
                            target="_blank"
                            className="text-euro-royal font-bold hover:underline flex items-center gap-1"
                          >
                            <PlayCircle className="w-3.5 h-3.5" /> Launch Test
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CENTRES */}
          {activeTab === 'centres' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-euro-navy">Offline Examination Centres</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {centres.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <span className="font-bold text-sm text-euro-navy block">{c.name}</span>
                    <p className="text-xs text-slate-500">{c.address}</p>
                    <div className="text-xs font-semibold text-slate-700 flex justify-between pt-2 border-t border-slate-200">
                      <span>Helpline: {c.contact_phone}</span>
                      <span>Capacity: {c.total_capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FINANCE */}
          {activeTab === 'finance' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-euro-navy">Financial Ledger & Razorpay Reconciliation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Total Processed</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">₹{metrics.revenueCollected.toLocaleString('en-IN')}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Gateway Fee (2% + GST)</span>
                  <div className="text-2xl font-black text-slate-700 mt-1">₹3,363</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Free Candidate Count</span>
                  <div className="text-2xl font-black text-euro-royal mt-1">842 Students</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: ADD SINGLE QUESTION */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-euro-navy text-base">Add Question to Test Bank</h3>
                <p className="text-[11px] text-slate-500">
                  Target Exam: {selectedExam?.code} — {selectedExam?.title}
                </p>
              </div>
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Subject *</label>
                  <select
                    value={questionFormData.subject_id}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, subject_id: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="PHY">Physics (PHY)</option>
                    <option value="CHE">Chemistry (CHE)</option>
                    <option value="MAT">Mathematics (MAT)</option>
                    <option value="BIO">Biology (BIO)</option>
                    <option value="APT">Mental Ability / Aptitude (APT)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Marks (+Correct)</label>
                  <input
                    type="number"
                    value={questionFormData.marks}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, marks: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Negative Marks (-Incorrect)</label>
                  <input
                    type="number"
                    value={questionFormData.negative_marks}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, negative_marks: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question Statement *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the full question text here..."
                  value={questionFormData.question_text}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, question_text: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg font-medium text-xs"
                />
              </div>

              {/* 4 Options and Correct Selector */}
              <div className="space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="font-bold text-slate-800 block text-xs">
                  Options & Correct Answer Key (Choose one correct option)
                </label>

                {[
                  { label: 'A', field: 'option_a' },
                  { label: 'B', field: 'option_b' },
                  { label: 'C', field: 'option_c' },
                  { label: 'D', field: 'option_d' },
                ].map(({ label, field }) => (
                  <div key={label} className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer flex-shrink-0">
                      <input
                        type="radio"
                        name="correct_option"
                        checked={questionFormData.correct_option === label}
                        onChange={() => setQuestionFormData({ ...questionFormData, correct_option: label as any })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          questionFormData.correct_option === label
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {label}
                      </span>
                    </label>

                    <input
                      type="text"
                      required={label === 'A' || label === 'B'}
                      placeholder={`Option ${label} text...`}
                      value={(questionFormData as any)[field]}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, [field]: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Explanation / Solution Rationale</label>
                <textarea
                  rows={2}
                  placeholder="Step-by-step reasoning shown to students after test completion..."
                  value={questionFormData.explanation}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, explanation: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold shadow"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BULK UPLOAD (JSON) */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-euro-navy text-base">Bulk Upload Questions via JSON</h3>
                <p className="text-[11px] text-slate-500">
                  Target Exam: {selectedExam?.code} — {selectedExam?.title}
                </p>
              </div>
              <button
                onClick={() => setShowBulkUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Paste an array of questions or use our template:</span>
              <button
                type="button"
                onClick={handleLoadSampleTemplate}
                className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-lg font-bold text-[11px] hover:bg-amber-100"
              >
                Load Sample Template (3 Qs)
              </button>
            </div>

            <form onSubmit={handleBulkUpload} className="space-y-4 text-xs">
              <textarea
                rows={10}
                required
                placeholder='[{"subject_id":"PHY","question_text":"...","marks":4,"negative_marks":1,"options":[{"option_label":"A","option_text":"...","is_correct":true}]}]'
                value={bulkQuestionsJson}
                onChange={(e) => setBulkQuestionsJson(e.target.value)}
                className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl bg-slate-50"
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowBulkUploadModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold shadow"
                >
                  Import Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW EXAM */}
      {showNewExamModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-euro-navy text-base">Create Examination Event</h3>
            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block">Exam Code *</label>
                <input
                  type="text"
                  required
                  value={newExamData.code}
                  onChange={(e) => setNewExamData({ ...newExamData, code: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg uppercase font-mono"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block">Exam Title *</label>
                <input
                  type="text"
                  required
                  value={newExamData.title}
                  onChange={(e) => setNewExamData({ ...newExamData, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block">Class Category</label>
                  <select
                    value={newExamData.class_category}
                    onChange={(e) => setNewExamData({ ...newExamData, class_category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block">Fee Type</label>
                  <select
                    value={newExamData.fee_type}
                    onChange={(e) => setNewExamData({ ...newExamData, fee_type: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="free">Free Registration</option>
                    <option value="paid">Paid (Razorpay)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewExamModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold shadow"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
