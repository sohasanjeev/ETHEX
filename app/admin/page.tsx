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
  GraduationCap,
  Send,
  Eye,
  Plus,
  X,
  Edit3,
  Download,
  Trophy,
  Star,
  Image as ImageIcon,
} from 'lucide-react';
import {
  SiteSettings,
  Exam,
  Application,
  ExamCentre,
  Question,
  ExamCategory,
  Batch,
  TeacherAccount,
  ResultChampion,
} from '@/lib/types';
import CompanyNavbarLogo from '@/components/branding/CompanyNavbarLogo';
import PdfQuestionConverterModal from '@/components/teacher/PdfQuestionConverterModal';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'settings' | 'results' | 'exams' | 'tests' | 'categories' | 'batches' | 'centres' | 'applications' | 'teachers' | 'metrics' | 'finance'
  >('settings');

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Champions & Results State (Allen Tallentex Replica Controller)
  const [champions, setChampions] = useState<ResultChampion[]>([]);
  const [resultsPamphletUrl, setResultPamphletUrl] = useState<string>('/posters/ethex_isro_tour_nov29.png');
  const [resultsHeadline, setResultHeadline] = useState<string>('ETHEX Champions — Previous Year Results & Hall of Fame');
  const [showChampionModal, setShowChampionModal] = useState<boolean>(false);
  const [editingChampionId, setEditingChampionId] = useState<string | null>(null);
  const [savingChampion, setSavingChampion] = useState<boolean>(false);
  const [championForm, setChampionForm] = useState({
    student_name: '',
    rank: 'AIR 1',
    exam_name: 'JEE Mains + Advanced',
    target_class: 'Class 10',
    school: '',
    score: '234/240 Marks',
    award: 'Sponsored ISRO Educational Tour + 90% Scholarship',
    quote: '',
    photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    year: '2025–2026',
    is_featured: true,
  });

  // Core Data Lists
  const [exams, setExams] = useState<Exam[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [centres, setCentres] = useState<ExamCentre[]>([]);
  const [categories, setCategories] = useState<ExamCategory[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [teachers, setTeachers] = useState<TeacherAccount[]>([]);
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

  // Question Bank states
  const [selectedExamId, setSelectedExamId] = useState<string>('e1111111-1111-1111-1111-111111111111');
  const [questionsList, setQuestionsList] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

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

  // Dynamic Category modal state
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    badge: '',
    is_active: true,
  });

  // Batch modal state
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchForm, setBatchForm] = useState({
    name: '',
    class_category: 'Class 10',
    target_stream: 'Foundation',
    fee_type: 'free' as 'free' | 'paid',
    fee_amount: 0,
    max_capacity: 100,
    description: '',
  });

  // Centre modal state
  const [showCentreModal, setShowCentreModal] = useState(false);
  const [centreForm, setCentreForm] = useState({
    centre_code: '',
    name: '',
    address: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411044',
    contact_phone: '9112223354',
    total_capacity: 300,
    is_active: true,
  });

  useEffect(() => {
    loadAdminData();
  }, []);

  useEffect(() => {
    if (selectedExamId) {
      loadQuestions(selectedExamId);
    }
  }, [selectedExamId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAdminData = async () => {
    try {
      const [settingsRes, examsRes, appsRes, centresRes, catsRes, batchesRes, teachersRes, champsRes] = await Promise.all([
        fetch('/api/site-settings'),
        fetch('/api/exams'),
        fetch('/api/applications/list'),
        fetch('/api/centres'),
        fetch('/api/categories'),
        fetch('/api/batches'),
        fetch('/api/teachers'),
        fetch('/api/results/champions'),
      ]);

      const [sData, eData, aData, cData, catData, bData, tData, chData] = await Promise.all([
        settingsRes.json(),
        examsRes.json(),
        appsRes.json(),
        centresRes.json(),
        catsRes.json(),
        batchesRes.json(),
        teachersRes.json(),
        champsRes.json(),
      ]);

      if (sData) {
        setSettings(sData);
        if (sData.results_pamphlet_url) setResultPamphletUrl(sData.results_pamphlet_url);
        if (sData.results_headline) setResultHeadline(sData.results_headline);
      }
      if (eData?.exams) setExams(eData.exams);
      if (aData?.applications) setApplications(aData.applications);
      if (cData?.centres) setCentres(cData.centres);
      if (catData?.categories) setCategories(catData.categories);
      if (bData?.batches) setBatches(bData.batches);
      if (tData?.teachers) setTeachers(tData.teachers);
      if (chData?.champions) setChampions(chData.champions);
    } catch (err) {
      console.warn('Error loading admin portal data:', err);
    }
  };

  const handleSaveResultPamphlet = async () => {
    try {
      const res = await fetch('/api/results/champions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results_pamphlet_url: resultsPamphletUrl,
          results_headline: resultsHeadline,
        }),
      });
      if (res.ok) {
        showToast('✓ Result celebration banner & headline saved live!');
      }
    } catch {
      showToast('Error saving result banner settings');
    }
  };

  const handleOpenAddChampion = () => {
    setEditingChampionId(null);
    setChampionForm({
      student_name: '',
      rank: 'AIR 1',
      exam_name: 'JEE Mains + Advanced',
      target_class: 'Class 10',
      school: 'EURO Campus PCMC Centre',
      score: '234/240 Marks',
      award: 'Sponsored ISRO Educational Tour + 90% Scholarship',
      quote: 'ETHEX prepared me with real CBT testing conditions.',
      photo_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
      year: '2025–2026',
      is_featured: true,
    });
    setShowChampionModal(true);
  };

  const handleOpenEditChampion = (champ: ResultChampion) => {
    setEditingChampionId(champ.id);
    setChampionForm({
      student_name: champ.student_name,
      rank: champ.rank,
      exam_name: champ.exam_name,
      target_class: champ.target_class,
      school: champ.school || '',
      score: champ.score || '',
      award: champ.award || '',
      quote: champ.quote || '',
      photo_url: champ.photo_url || '',
      year: champ.year || '2025–2026',
      is_featured: champ.is_featured,
    });
    setShowChampionModal(true);
  };

  const handleSaveChampionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingChampion(true);
    try {
      const res = await fetch('/api/results/champions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingChampionId ? 'update' : 'create',
          id: editingChampionId,
          data: championForm,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(editingChampionId ? '✓ Champion topper updated!' : '✓ New Champion added to Hall of Fame!');
        setShowChampionModal(false);
        // Refresh champions
        const refRes = await fetch('/api/results/champions');
        const refData = await refRes.json();
        if (refData?.champions) setChampions(refData.champions);
      } else {
        alert(data.error || 'Failed to save champion');
      }
    } catch {
      alert('Network error saving champion');
    } finally {
      setSavingChampion(false);
    }
  };

  const handleDeleteChampion = async (champId: string) => {
    if (!confirm('Are you sure you want to remove this topper from Results Hall of Fame?')) return;
    try {
      const res = await fetch('/api/results/champions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id: champId }),
      });
      if (res.ok) {
        setChampions((prev) => prev.filter((c) => c.id !== champId));
        showToast('✓ Champion removed successfully');
      }
    } catch {
      alert('Error deleting champion');
    }
  };

  const loadQuestions = async (examId: string) => {
    setLoadingQuestions(true);
    try {
      const res = await fetch(`/api/exam/questions?examId=${examId}&role=admin`);
      const data = await res.json();
      if (data.questions) setQuestionsList(data.questions);
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSavingSettings(true);
    try {
      const res = await fetch('/api/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        showToast('Site settings and content successfully published!');
      }
    } catch {
      showToast('Error saving settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleExportApplicationsCSV = () => {
    if (!applications || applications.length === 0) {
      alert('No student registrations available to export.');
      return;
    }

    const headers = [
      'Application Number',
      'Roll Number',
      'Student Name',
      'Mobile Number',
      'Target Class',
      'Registration Date',
      'Payment Status',
      'Fee Paid (INR)',
      'Payment Mode',
      'UTR Reference Number',
      'Selected Mode',
    ];

    const rows = applications.map((app) => [
      `"${app.application_number || ''}"`,
      `"${app.roll_number || ''}"`,
      `"${app.student_name || app.student?.full_name || 'Registered Candidate'}"`,
      `"${app.student_phone || app.student?.phone || ''}"`,
      `"${app.student_class || app.student?.student_details?.current_class || 'Class 10'}"`,
      `"${app.created_at ? new Date(app.created_at).toLocaleString() : ''}"`,
      `"${(app.payment_status || 'successful').toUpperCase()}"`,
      `"${app.fee_paid || app.fee_amount || 100}"`,
      `"${app.payment_mode || 'UPI_QR'}"`,
      `"${app.utr_number || 'VERIFIED'}"`,
      `"${(app.selected_mode || 'online').toUpperCase()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ETHEX_2026_Student_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported student registrations to CSV successfully!');
  };

  // Exam Workflow handlers
  const handleApproveExam = async (examId: string) => {
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', examId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Examination approved and published live for students!');
        loadAdminData();
      }
    } catch {
      showToast('Error approving examination');
    }
  };

  const handleDeleteExam = async (examId: string) => {
    if (!confirm('Are you sure you want to delete this examination?')) return;
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', examId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Examination removed successfully.');
        loadAdminData();
      }
    } catch {
      showToast('Error deleting exam');
    }
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', examData: newExamData }),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewExamModal(false);
        showToast('New examination created successfully!');
        loadAdminData();
      }
    } catch {
      showToast('Error creating exam');
    }
  };

  // Category handlers
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowCategoryModal(false);
        showToast('Category updated successfully!');
        setCategoryForm({ name: '', slug: '', description: '', badge: '', is_active: true });
        loadAdminData();
      }
    } catch {
      showToast('Error saving category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to remove this category?')) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      showToast('Category deleted.');
      loadAdminData();
    } catch {
      showToast('Error deleting category');
    }
  };

  // Batch handlers
  const handleSaveBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batchForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowBatchModal(false);
        showToast('Batch successfully registered!');
        setBatchForm({
          name: '',
          class_category: 'Class 10',
          target_stream: 'Foundation',
          fee_type: 'free',
          fee_amount: 0,
          max_capacity: 100,
          description: '',
        });
        loadAdminData();
      }
    } catch {
      showToast('Error saving batch');
    }
  };

  const handleDeleteBatch = async (id: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) return;
    try {
      await fetch(`/api/batches?id=${id}`, { method: 'DELETE' });
      showToast('Batch deleted.');
      loadAdminData();
    } catch {
      showToast('Error deleting batch');
    }
  };

  // Centre handler
  const handleSaveCentre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/centres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_centre', centreData: centreForm }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCentreModal(false);
        showToast('Examination Centre added successfully!');
        loadAdminData();
      }
    } catch {
      showToast('Error saving centre');
    }
  };

  // Question handlers
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionFormData.question_text || !questionFormData.option_a || !questionFormData.option_b) {
      alert('Please fill in question text and at least 2 options.');
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
        showToast('Question added to test bank successfully!');
        loadQuestions(selectedExamId);
        loadAdminData();
      }
    } catch {
      showToast('Error adding question');
    }
  };

  const handleDeleteQuestion = async (qId: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      await fetch(`/api/exam/questions?examId=${selectedExamId}&questionId=${qId}`, { method: 'DELETE' });
      showToast('Question deleted.');
      loadQuestions(selectedExamId);
      loadAdminData();
    } catch {
      showToast('Error deleting question');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ethex_admin_session');
    router.push('/');
  };

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  const sidebarTabs = [
    { id: 'settings', label: 'Website & CMS', icon: Settings, desc: 'Announcements, Logo & Helpline' },
    { id: 'results', label: 'Results & Champions Wall', icon: Trophy, desc: 'Student Ranks, Photos & Result Pamphlet' },
    { id: 'exams', label: 'Exams & Approvals', icon: FileText, desc: 'Approve Teacher Papers & Schedules' },
    { id: 'tests', label: 'Question Bank & PDF', icon: BookOpen, desc: 'AI PDF Extraction & MCQs' },
    { id: 'categories', label: 'Dynamic Categories', icon: Layers, desc: 'Class 5-12, JEE, NEET Modules' },
    { id: 'batches', label: 'Batches & Fees', icon: GraduationCap, desc: 'Course Batches & Seat Limits' },
    { id: 'centres', label: 'Centres & Rooms', icon: Building, desc: 'PCMC, Shikrapur & Seating' },
    { id: 'applications', label: 'Student Applications', icon: Award, desc: 'Roster & Admit Cards' },
    { id: 'teachers', label: 'Teacher Accounts', icon: Users, desc: 'Faculty Roles & Permissions' },
    { id: 'metrics', label: 'Live Analytics', icon: Rocket, desc: 'Registrations & Metrics' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4">
          <CompanyNavbarLogo />
          <div className="h-6 w-px bg-slate-800 hidden sm:block"></div>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider hidden sm:inline-block">
            CENTRAL ADMINISTRATIVE PORTAL
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/teacher"
            className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher Studio</span>
          </Link>
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

      {/* Admin Body Layout with Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation (3 Cols) */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-1.5 sticky top-24">
          <div className="p-3 border-b border-slate-100 mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              System Administration
            </span>
            <span className="font-extrabold text-xs text-euro-navy block mt-0.5">
              EURO Campus Central Admin
            </span>
          </div>

          {sidebarTabs.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-start gap-3 ${
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
            <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-900 rounded-2xl p-4 flex items-center gap-3 text-xs font-bold shadow-md animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* TAB 1: WEBSITE & CMS SETTINGS */}
          {activeTab === 'settings' && settings && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Website CMS & Content Controller
                  </span>
                  <h2 className="text-xl font-black text-euro-navy mt-1">
                    Announcement Banner, Logo & Homepage Texts
                  </h2>
                  <p className="text-xs text-slate-500">
                    Edit banner notifications, countdown dates, prize amounts, and official campus helpline contacts.
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

              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                {/* Announcement Banner Box */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-euro-navy flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Top Announcement Banner (Deep Violet & Gold)
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer font-bold">
                      <input
                        type="checkbox"
                        checked={settings.announcement_bar_active}
                        onChange={(e) =>
                          setSettings({ ...settings, announcement_bar_active: e.target.checked })
                        }
                        className="rounded text-euro-royal focus:ring-euro-royal"
                      />
                      <span>Active on Website</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={settings.announcement_bar_text}
                    onChange={(e) =>
                      setSettings({ ...settings, announcement_bar_text: e.target.value })
                    }
                    placeholder="Enter urgent notification text..."
                    className="w-full text-xs font-semibold p-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  />
                </div>

                {/* Exam Scheduling & Dates */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-euro-navy flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-euro-royal" />
                    Examination Schedule & Display Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Display Date Text</label>
                      <input
                        type="text"
                        value={settings.exam_date_display}
                        onChange={(e) => setSettings({ ...settings, exam_date_display: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Scholarship Pool Amount</label>
                      <input
                        type="text"
                        value={settings.admission_scholarship_pool}
                        onChange={(e) =>
                          setSettings({ ...settings, admission_scholarship_pool: e.target.value })
                        }
                        className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Registration Fee Controller */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-euro-navy flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    ETHEX Registration Fee Controller
                  </h3>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Registration Fee (INR)
                    </label>
                    <input
                      type="number"
                      value={settings.registration_fee || 100}
                      onChange={(e) =>
                        setSettings({ ...settings, registration_fee: Number(e.target.value) })
                      }
                      placeholder="100"
                      className="w-full max-w-xs text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Amount charged during 3-step Allen-style registration.
                    </span>
                  </div>
                </div>

                {/* Helpline Numbers & Support */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-euro-navy flex items-center gap-2">
                    <Phone className="w-4 h-4 text-euro-royal" />
                    Official Helplines & Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">PCMC Campus Helpline</label>
                      <input
                        type="text"
                        value={settings.helpline_pcmc}
                        onChange={(e) => setSettings({ ...settings, helpline_pcmc: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Shikrapur Helpline</label>
                      <input
                        type="text"
                        value={settings.helpline_shikrapur}
                        onChange={(e) => setSettings({ ...settings, helpline_shikrapur: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Admissions Email</label>
                      <input
                        type="email"
                        value={settings.official_email}
                        onChange={(e) => setSettings({ ...settings, official_email: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Official Syllabus PDF / Document URL */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-sm text-euro-navy flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-euro-royal" />
                    Official Syllabus PDF / Document Download Link
                  </h3>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Syllabus Document Link (PDF or Image URL)
                    </label>
                    <input
                      type="url"
                      value={settings.syllabus_pamphlet_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, syllabus_pamphlet_url: e.target.value })
                      }
                      placeholder="https://.../ethex-2026-syllabus.pdf or Google Drive / Cloud URL"
                      className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-white"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      When students or parents click &quot;Download Syllabus&quot; on the homepage or syllabus section, this document will be provided.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB: RESULTS & CHAMPIONS WALL (ALLEN TALLENTEX REPLICA) */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              {/* Results Headline Settings Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      RESULTS & MERIT CONTROLLER
                    </span>
                    <h2 className="text-xl font-black text-euro-navy mt-1">
                      Results Showcase Headline
                    </h2>
                    <p className="text-xs text-slate-500">
                      Set the headline shown at the top of the Results and Hall of Fame portal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveResultPamphlet}
                    className="px-4 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Headline</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Results Showcase Headline Text
                  </label>
                  <input
                    type="text"
                    value={resultsHeadline}
                    onChange={(e) => setResultHeadline(e.target.value)}
                    placeholder="e.g. ETHEX Champions — Previous Year Results & Hall of Fame"
                    className="w-full text-xs font-semibold p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Champions Roster Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-euro-navy flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      <span>ETHEX Champions & Toppers Wall</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      Manage student rankers, photos, marks, and scholarships displayed in the live Wall of Fame.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenAddChampion}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-xs flex items-center gap-1.5 shadow-sm active:scale-98 self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Champion</span>
                  </button>
                </div>

                {/* Champions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {champions.map((champ) => (
                    <div
                      key={champ.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={champ.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face'}
                          alt={champ.student_name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0066FF]/30 shadow-xs flex-shrink-0"
                          onError={(e: any) => {
                            e.target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-2xs">
                              {champ.rank}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {champ.year}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 truncate mt-1">
                            {champ.student_name}
                          </h4>
                          <p className="text-[11px] font-bold text-[#0066FF] truncate">
                            {champ.exam_name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {champ.target_class}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 text-[11px] space-y-1 border border-slate-100">
                        {champ.score && (
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Score:</span>
                            <span className="font-bold text-slate-800">{champ.score}</span>
                          </div>
                        )}
                        {champ.award && (
                          <div className="flex justify-between">
                            <span className="text-slate-500 font-medium">Award:</span>
                            <span className="font-bold text-emerald-700 truncate max-w-[170px]">{champ.award}</span>
                          </div>
                        )}
                        {champ.school && (
                          <div className="text-[10px] text-slate-400 truncate pt-0.5">
                            {champ.school}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => handleOpenEditChampion(champ)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChampion(champ.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXAMS & APPROVALS WORKFLOW */}
          {activeTab === 'exams' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Examinations & Approval Workflow</h2>
                  <p className="text-xs text-slate-500">
                    Review teacher-submitted papers, approve live tests, or create new exam cycles.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/teacher/exams/create"
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-extrabold text-xs shadow-xs"
                  >
                    Template Wizard
                  </Link>
                  <button
                    onClick={() => setShowNewExamModal(true)}
                    className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Quick Create</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {exams.map((exam) => {
                  const isPending = exam.status === 'review' || exam.approval_status === 'pending_approval';
                  const isLive = exam.status === 'open';

                  return (
                    <div
                      key={exam.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isPending
                          ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-euro-royal bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {exam.code}
                          </span>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isLive
                                ? 'bg-emerald-100 text-emerald-800'
                                : isPending
                                ? 'bg-amber-400 text-slate-950 animate-pulse'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isLive ? 'Live & Active' : isPending ? 'Pending Admin Approval' : 'Draft'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-semibold">
                            {exam.class_category} • {exam.target_stream}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-900">{exam.title}</h4>
                        <p className="text-xs text-slate-500">
                          {exam.total_questions} Questions • {exam.total_marks} Marks • {exam.duration_minutes} Mins • Mode: {exam.mode}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {isPending && (
                          <button
                            onClick={() => handleApproveExam(exam.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve & Publish</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setSelectedExamId(exam.id);
                            setActiveTab('tests');
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                        >
                          View Qs
                        </button>

                        <button
                          onClick={() => handleDeleteExam(exam.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                          title="Delete Exam"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: QUESTION BANK & PDF CONVERTER */}
          {activeTab === 'tests' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Question Bank & PDF Studio</h2>
                  <p className="text-xs text-slate-500">
                    Import question paper PDFs with AI, or add questions manually per subject.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowPdfModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-xl font-black text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload PDF Paper</span>
                  </button>
                  <button
                    onClick={() => setShowAddQuestionModal(true)}
                    className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Single Question</span>
                  </button>
                </div>
              </div>

              {/* Exam Selector */}
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Select Exam Bank:</span>
                <select
                  value={selectedExamId}
                  onChange={(e) => setSelectedExamId(e.target.value)}
                  className="text-xs font-extrabold px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {exams.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.code} — {e.title} ({e.total_questions} Qs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Questions List */}
              {loadingQuestions ? (
                <div className="py-12 text-center text-slate-400">Loading questions...</div>
              ) : questionsList.length === 0 ? (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-slate-700">No questions in this test bank.</p>
                  <button
                    onClick={() => setShowPdfModal(true)}
                    className="px-4 py-2 bg-euro-royal text-white rounded-xl font-bold text-xs"
                  >
                    Upload Question Paper PDF
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {questionsList.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-100 text-slate-800 font-bold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                            {q.subject_id}
                          </span>
                          <span className="text-[11px] text-slate-400 uppercase font-semibold">+{q.marks} / -{q.negative_marks}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-slate-900">{q.question_text}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2 rounded-xl text-xs truncate ${
                              opt.is_correct ? 'bg-emerald-50 border border-emerald-500 font-bold text-emerald-900' : 'bg-slate-50 border border-slate-100 text-slate-700'
                            }`}
                          >
                            ({opt.option_label}) {opt.option_text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DYNAMIC CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Dynamic Examination Categories</h2>
                  <p className="text-xs text-slate-500">
                    Add, rename, activate, or reorder test categories without code changes.
                  </p>
                </div>
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 relative group">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900">{cat.name}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                        {cat.badge || 'ACTIVE'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400">{cat.slug}</span>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BATCHES & FEES */}
          {activeTab === 'batches' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Course Batches & Registration Fees</h2>
                  <p className="text-xs text-slate-500">
                    Create exam batches, configure free vs paid entry fees, and seat capacity.
                  </p>
                </div>
                <button
                  onClick={() => setShowBatchModal(true)}
                  className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Batch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {batches.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-euro-royal bg-blue-50 px-2 py-0.5 rounded">
                        {b.code}
                      </span>
                      <span className="text-xs font-black text-emerald-600">
                        {b.fee_type === 'free' ? 'FREE' : `₹${b.fee_amount}`}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{b.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{b.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>Capacity: {b.enrolled_count} / {b.max_capacity}</span>
                      <button
                        onClick={() => handleDeleteBatch(b.id)}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CENTRES & ROOMS */}
          {activeTab === 'centres' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Offline Examination Centres & Rooms</h2>
                  <p className="text-xs text-slate-500">
                    Configure official exam centres (PCMC Chinchwad & Shikrapur), rooms, and seating allocations.
                  </p>
                </div>
                <button
                  onClick={() => setShowCentreModal(true)}
                  className="px-4 py-2 bg-euro-royal hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Centre</span>
                </button>
              </div>

              <div className="space-y-4">
                {centres.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-slate-900">{c.name}</span>
                      <span className="font-mono text-xs font-bold text-euro-royal bg-blue-50 px-2 py-0.5 rounded">
                        {c.centre_code}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{c.address}, {c.city} - {c.pincode}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                      <span>Contact: <strong>{c.contact_phone}</strong></span>
                      <span>Total Capacity: <strong>{c.total_capacity} Students</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Student Registrations & Payment Roster</h2>
                  <p className="text-xs text-slate-500">Live roster of candidates, payment UTR records, and roll allocations.</p>
                </div>
                <button
                  type="button"
                  onClick={handleExportApplicationsCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Registrations (CSV)</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">Candidate</th>
                      <th className="p-3">Mobile & Class</th>
                      <th className="p-3">Roll & App No</th>
                      <th className="p-3">Payment & UTR</th>
                      <th className="p-3">Registered At</th>
                      <th className="p-3">Admit Card</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <span className="font-extrabold text-slate-900 block text-xs">
                            {app.student_name || app.student?.full_name || 'Candidate'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {app.student_id}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-slate-700 block">
                            +91 {app.student_phone || app.student?.phone || '—'}
                          </span>
                          <span className="text-[11px] font-semibold text-[#0066FF] bg-blue-50 px-2 py-0.2 rounded inline-block mt-0.5">
                            {app.student_class || app.student?.student_details?.current_class || 'Class 10'}
                          </span>
                        </td>
                        <td className="p-3 font-mono">
                          <span className="font-bold text-euro-royal block">{app.roll_number || 'Pending'}</span>
                          <span className="text-[10px] text-slate-400">{app.application_number}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              PAID (₹{app.fee_paid || app.fee_amount || 100})
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                            UTR: {app.utr_number || 'VERIFIED'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'Recent'}
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
                            <PlayCircle className="w-3.5 h-3.5" /> Launch CBT
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: TEACHERS & FACULTY */}
          {activeTab === 'teachers' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-euro-navy">Authorized Faculty & Teachers</h2>
                  <p className="text-xs text-slate-500">
                    Teachers can create examinations and import PDF question papers independently.
                  </p>
                </div>
                <Link
                  href="/teacher"
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl text-xs"
                >
                  Open Teacher Portal
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teachers.map((tch) => (
                  <div key={tch.id} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">{tch.name}</h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                        {tch.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{tch.subject_specialization}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Tests Created: <strong>{tch.tests_created_count}</strong></span>
                      <span className="text-euro-royal font-semibold">{tch.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: LIVE METRICS */}
          {activeTab === 'metrics' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-euro-navy">Platform Analytics & Candidate Registrations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-200">
                  <span className="text-xs font-bold text-slate-500">Total Student Profiles</span>
                  <span className="text-2xl font-black text-euro-royal block mt-1">{metrics.totalStudents}</span>
                </div>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200">
                  <span className="text-xs font-bold text-slate-500">Confirmed Exam Applications</span>
                  <span className="text-2xl font-black text-emerald-700 block mt-1">{metrics.confirmedApps}</span>
                </div>
                <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-200">
                  <span className="text-xs font-bold text-slate-500">Online CBT Registrations</span>
                  <span className="text-2xl font-black text-purple-700 block mt-1">{metrics.onlineApps}</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PDF Question Converter Modal for Admin */}
      <PdfQuestionConverterModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        examId={selectedExamId}
        onQuestionsSaved={() => {
          showToast('Questions parsed and saved into examination bank!');
          loadQuestions(selectedExamId);
          loadAdminData();
        }}
      />

      {/* Quick Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-slate-900">Add Examination Category</h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Olympiad Foundation"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input
                  type="text"
                  placeholder="Short description..."
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal text-white rounded-xl font-bold shadow"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Batch Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-slate-900">Create New Course Batch</h3>
            <form onSubmit={handleSaveBatch} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Batch Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Super 30 JEE Batch"
                  value={batchForm.name}
                  onChange={(e) => setBatchForm({ ...batchForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fee Type</label>
                  <select
                    value={batchForm.fee_type}
                    onChange={(e) => setBatchForm({ ...batchForm, fee_type: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fee (INR)</label>
                  <input
                    type="number"
                    value={batchForm.fee_amount}
                    onChange={(e) => setBatchForm({ ...batchForm, fee_amount: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBatchModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal text-white rounded-xl font-bold shadow"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Centre Modal */}
      {showCentreModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-slate-900">Add Examination Centre</h3>
            <form onSubmit={handleSaveCentre} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Centre Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EURO Campus — PCMC Chinchwad Branch"
                  value={centreForm.name}
                  onChange={(e) => setCentreForm({ ...centreForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street / Area..."
                  value={centreForm.address}
                  onChange={(e) => setCentreForm({ ...centreForm, address: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Centre Code</label>
                  <input
                    type="text"
                    required
                    placeholder="EC-KOTH"
                    value={centreForm.centre_code}
                    onChange={(e) => setCentreForm({ ...centreForm, centre_code: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capacity</label>
                  <input
                    type="number"
                    value={centreForm.total_capacity}
                    onChange={(e) => setCentreForm({ ...centreForm, total_capacity: parseInt(e.target.value, 10) || 100 })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCentreModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal text-white rounded-xl font-bold shadow"
                >
                  Save Centre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Single Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-slate-900">Add Question to Test Bank</h3>
            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={questionFormData.subject_id}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, subject_id: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="PHY">Physics</option>
                    <option value="CHE">Chemistry</option>
                    <option value="BIO">Biology</option>
                    <option value="MAT">Mathematics</option>
                    <option value="MAT_APT">Mental Ability</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Correct Answer</label>
                  <select
                    value={questionFormData.correct_option}
                    onChange={(e) => setQuestionFormData({ ...questionFormData, correct_option: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white font-bold text-emerald-700"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Question Statement</label>
                <textarea
                  rows={2}
                  required
                  value={questionFormData.question_text}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, question_text: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Option A"
                  required
                  value={questionFormData.option_a}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, option_a: e.target.value })}
                  className="p-2 border border-slate-300 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Option B"
                  required
                  value={questionFormData.option_b}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, option_b: e.target.value })}
                  className="p-2 border border-slate-300 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Option C"
                  value={questionFormData.option_c}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, option_c: e.target.value })}
                  className="p-2 border border-slate-300 rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Option D"
                  value={questionFormData.option_d}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, option_d: e.target.value })}
                  className="p-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-euro-royal text-white rounded-xl font-bold shadow"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick New Exam Modal */}
      {showNewExamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="font-black text-base text-euro-navy">Create Examination Event</h3>
            <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Code *</label>
                <input
                  type="text"
                  required
                  value={newExamData.code}
                  onChange={(e) => setNewExamData({ ...newExamData, code: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl uppercase font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Exam Title *</label>
                <input
                  type="text"
                  required
                  value={newExamData.title}
                  onChange={(e) => setNewExamData({ ...newExamData, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class Category</label>
                  <select
                    value={newExamData.class_category}
                    onChange={(e) => setNewExamData({ ...newExamData, class_category: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white"
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
                  <label className="font-bold text-slate-700 block mb-1">Fee Type</label>
                  <select
                    value={newExamData.fee_type}
                    onChange={(e) => setNewExamData({ ...newExamData, fee_type: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-xl bg-white"
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

      {/* CHAMPION ADD / EDIT MODAL (ALLEN TALLENTEX REPLICA) */}
      {showChampionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {editingChampionId ? 'Edit Champion Topper' : 'Add New Champion to Hall of Fame'}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-semibold">Allen Tallentex Results Customizer</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowChampionModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChampionSubmit} className="overflow-y-auto py-4 space-y-4 pr-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={championForm.student_name}
                    onChange={(e) => setChampionForm({ ...championForm, student_name: e.target.value })}
                    placeholder="e.g. Aarav Patil"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rank / Position *</label>
                  <input
                    type="text"
                    required
                    value={championForm.rank}
                    onChange={(e) => setChampionForm({ ...championForm, rank: e.target.value })}
                    placeholder="e.g. AIR 1, AIR 4, State Rank 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Class *</label>
                  <select
                    value={championForm.target_class}
                    onChange={(e) => setChampionForm({ ...championForm, target_class: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
                  >
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="JEE Mains + Advanced Class 11">JEE Mains + Advanced Class 11</option>
                    <option value="JEE Mains + Advanced Class 12">JEE Mains + Advanced Class 12</option>
                    <option value="Class 11 NEET">Class 11 NEET</option>
                    <option value="Class 12 NEET">Class 12 NEET</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Examination / Stream *</label>
                  <input
                    type="text"
                    required
                    value={championForm.exam_name}
                    onChange={(e) => setChampionForm({ ...championForm, exam_name: e.target.value })}
                    placeholder="e.g. JEE Mains + Advanced / NEET / Foundation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Score / Percentile</label>
                  <input
                    type="text"
                    value={championForm.score}
                    onChange={(e) => setChampionForm({ ...championForm, score: e.target.value })}
                    placeholder="e.g. 234/240 Marks or 99.9%ile"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Award / Scholarship</label>
                  <input
                    type="text"
                    value={championForm.award}
                    onChange={(e) => setChampionForm({ ...championForm, award: e.target.value })}
                    placeholder="e.g. Sponsored ISRO Tour + 90% Scholarship"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">School or Centre Name</label>
                <input
                  type="text"
                  value={championForm.school}
                  onChange={(e) => setChampionForm({ ...championForm, school: e.target.value })}
                  placeholder="e.g. Podar International School / PCMC Centre"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Photo URL</label>
                <input
                  type="text"
                  value={championForm.photo_url}
                  onChange={(e) => setChampionForm({ ...championForm, photo_url: e.target.value })}
                  placeholder="https://images.unsplash.com/... or paste image URL"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px]"
                />
                {/* Quick Avatar Presets */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-slate-400 font-bold">Quick Presets:</span>
                  {[
                    { label: 'Boy 1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face' },
                    { label: 'Girl 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' },
                    { label: 'Boy 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
                    { label: 'Girl 2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setChampionForm({ ...championForm, photo_url: preset.url })}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Testimonial / Quote</label>
                <textarea
                  rows={2}
                  value={championForm.quote}
                  onChange={(e) => setChampionForm({ ...championForm, quote: e.target.value })}
                  placeholder="e.g. ETHEX gave me the winning confidence before my boards."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowChampionModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingChampion}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  {savingChampion ? 'Saving...' : 'Save & Publish Champion'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
