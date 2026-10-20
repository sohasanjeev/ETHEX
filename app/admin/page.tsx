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
} from 'lucide-react';
import { SiteSettings, Exam, Application, ExamCentre } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'settings' | 'metrics' | 'exams' | 'applications' | 'centres' | 'finance'>('settings');
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
      if (examsRes.exams) setExams(examsRes.exams);
      if (appsRes.applications) setApplications(appsRes.applications);
      if (centresRes.centres) setCentres(centresRes.centres);
    } catch (err) {
      console.warn('Error loading admin data:', err);
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('ethex_admin_session');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* 1. Admin Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <CombinedBrandLogo size="sm" />
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
            { id: 'exams', label: 'Exam Management', icon: FileText, desc: 'Categories, Fees & Modes' },
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

          {/* TAB 1: SITE SETTINGS & CMS (PRIMARY FEATURE REQUESTED) */}
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
                  {savingSettings ? 'Saving Changes...' : 'Save All Changes'}
                </button>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* 1. Exam Dates & Schedule (Requested) */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-euro-royal" />
                    Examination Dates & Scheduling
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Exam Date Display Text *
                      </label>
                      <input
                        type="text"
                        value={settings.exam_date_display}
                        onChange={(e) => setSettings({ ...settings, exam_date_display: e.target.value })}
                        placeholder="e.g. To Be Announced Soon, or 29 November 2026"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      />
                      <span className="text-[10px] text-slate-500 block">
                        Displayed in hero section, badges, and important dates schedule.
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Exam Year / Edition *
                      </label>
                      <input
                        type="text"
                        value={settings.exam_edition}
                        onChange={(e) => setSettings({ ...settings, exam_edition: e.target.value })}
                        placeholder="2026"
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

                {/* 2. Prize Money & Scholarships (Requested) */}
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

                {/* 3. Official EURO Campus Website & Helpline Links */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Building className="w-4 h-4 text-euro-royal" />
                    Institutional Links & Helplines
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Official EURO Campus Website URL (`EURO_OFFICIAL_WEBSITE_URL`)
                    </label>
                    <input
                      type="url"
                      value={settings.euro_official_website_url}
                      onChange={(e) => setSettings({ ...settings, euro_official_website_url: e.target.value })}
                      placeholder="https://www.eurojeeneet.com"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white font-mono"
                    />
                    <span className="text-[10px] text-slate-500 block">
                      Rendered in footer as &quot;Visit Official EURO Campus Website&quot;. Configurable at any time.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">PCMC Campus Helpline</label>
                      <input
                        type="text"
                        value={settings.helpline_pcmc}
                        onChange={(e) => setSettings({ ...settings, helpline_pcmc: e.target.value })}
                        placeholder="9112223354"
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

                {/* 4. Top Announcement Bar */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="font-bold text-sm text-euro-navy flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-euro-royal" />
                    Top Announcement Bar
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Notice Banner Message</label>
                    <textarea
                      rows={2}
                      value={settings.announcement_bar_text}
                      onChange={(e) => setSettings({ ...settings, announcement_bar_text: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                    ></textarea>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.announcement_bar_active}
                      onChange={(e) => setSettings({ ...settings, announcement_bar_active: e.target.checked })}
                      className="rounded border-slate-300 text-euro-royal focus:ring-euro-royal"
                    />
                    <span>Display Announcement Bar on Public Website</span>
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={savingSettings}
                    className="px-6 py-3 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {savingSettings ? 'Saving...' : 'Save All Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: LIVE METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Total Registered Students</span>
                  <p className="text-2xl sm:text-3xl font-black text-euro-navy mt-1">{metrics.totalStudents}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Confirmed Applications</span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{metrics.confirmedApps}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Online Candidates</span>
                  <p className="text-2xl sm:text-3xl font-black text-euro-royal mt-1">{metrics.onlineApps}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Offline Centre Candidates</span>
                  <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{metrics.offlineApps}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-euro-navy text-sm">Offline Centre Occupancy Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {centres.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="font-bold text-euro-navy block">{c.name}</span>
                      <span className="text-slate-500 block">Code: {c.centre_code} • {c.city}</span>
                      <div className="pt-2 flex justify-between font-bold text-slate-700">
                        <span>Allocated: 140</span>
                        <span>Capacity: {c.total_capacity}</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-euro-royal h-full rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM MANAGEMENT */}
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
                      <th className="p-3">Status</th>
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
                          {ex.duration_minutes} Mins • {ex.total_marks} Marks
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {ex.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATIONS */}
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
                      <th className="p-3">Verification QR</th>
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
                        <td className="p-3 font-mono text-[10px] text-slate-500">
                          {app.qr_verification_code}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CENTRES */}
          {activeTab === 'centres' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-euro-navy border-b border-slate-100 pb-3">
                Official Examination Centres
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {centres.map((c) => (
                  <div key={c.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-euro-navy">{c.name}</span>
                      <span className="font-mono text-euro-royal font-bold">{c.centre_code}</span>
                    </div>
                    <p className="text-slate-600">{c.address}, {c.city} - {c.pincode}</p>
                    <div className="pt-2 flex justify-between text-slate-500 border-t border-slate-200">
                      <span>Helpline: {c.contact_phone}</span>
                      <span className="font-bold text-slate-700">Capacity: {c.total_capacity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FINANCE & RAZORPAY */}
          {activeTab === 'finance' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-euro-navy">Financial Ledger & Razorpay Reconcile</h2>
                  <p className="text-xs text-slate-500">Track paid transactions, test mode receipts, and merchant ledger.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  Razorpay Mode: Test / Merchant Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Total Collections</span>
                  <div className="text-2xl font-black text-euro-navy mt-1">₹{metrics.revenueCollected}.00</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold">Successful Transactions</span>
                  <div className="text-2xl font-black text-emerald-700 mt-1">712</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Refund Rate</span>
                  <div className="text-2xl font-black text-slate-700 mt-1">0.0%</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create New Exam Modal */}
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
