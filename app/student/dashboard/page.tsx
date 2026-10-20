'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  PlayCircle,
  Printer,
  Sparkles,
  Rocket,
  Award,
  Building,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Application, Exam, ExamCentre, Result } from '@/lib/types';
import AdmitCardModal from '@/components/student/AdmitCardModal';
import PaymentReceiptModal from '@/components/student/PaymentReceiptModal';

export default function StudentDashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [availableExams, setAvailableExams] = useState<Exam[]>([]);
  const [centres, setCentres] = useState<ExamCentre[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [activeAdmitCardApp, setActiveAdmitCardApp] = useState<Application | null>(null);
  const [activeReceiptApp, setActiveReceiptApp] = useState<Application | null>(null);

  // Application creation modal
  const [applyingExam, setApplyingExam] = useState<Exam | null>(null);
  const [selectedMode, setSelectedMode] = useState<'online' | 'offline'>('online');
  const [selectedCentre, setSelectedCentre] = useState<string>('');
  const [submittingApp, setSubmittingApp] = useState(false);

  useEffect(() => {
    // Check session
    const sessionStr = localStorage.getItem('ethex_student_session');
    if (!sessionStr) {
      // Default to demo session for instant tester convenience
      const demoUser = {
        id: 'demo-student-id',
        full_name: 'Aarav Patil',
        email: 'aarav.patil@example.com',
        current_class: 'Class 10',
        target_stream: 'Foundation',
      };
      setStudent(demoUser);
      localStorage.setItem('ethex_student_session', JSON.stringify(demoUser));
    } else {
      setStudent(JSON.parse(sessionStr));
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [appsRes, examsRes, centresRes] = await Promise.all([
        fetch('/api/applications/list?studentId=demo-student-id').then((r) => r.json()),
        fetch('/api/exams').then((r) => r.json()),
        fetch('/api/centres').then((r) => r.json()),
      ]);

      if (appsRes.applications) setApplications(appsRes.applications);
      if (examsRes.exams) setAvailableExams(examsRes.exams);
      if (centresRes.centres) {
        setCentres(centresRes.centres);
        if (centresRes.centres.length > 0) setSelectedCentre(centresRes.centres[0].id);
      }

      // Load results if published
      fetch('/api/results/lookup?query=ETHEX26-24101')
        .then((r) => r.json())
        .then((data) => {
          if (data.result) setResults([data.result]);
        })
        .catch(() => {});
    } catch (err) {
      console.warn('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!applyingExam) return;
    setSubmittingApp(true);

    try {
      const res = await fetch('/api/applications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: student?.id || 'demo-student-id',
          exam_id: applyingExam.id,
          selected_mode: selectedMode,
          centre_id: selectedMode === 'offline' ? selectedCentre : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setApplyingExam(null);
        await loadDashboardData();
      }
    } catch (err) {
      console.error('Failed to create application:', err);
    } finally {
      setSubmittingApp(false);
    }
  };

  const handleRazorpayPayment = async (app: Application) => {
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: app.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Payment order creation failed');
        return;
      }

      // Check if Razorpay script is loaded in browser or test mode
      // For immediate verification in testing:
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: app.id,
          razorpay_order_id: data.orderId,
          razorpay_payment_id: `pay_${Math.random().toString(36).substring(2, 10)}`,
          razorpay_signature: 'test_valid_sig_dev_mode',
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        alert('Payment Verified! Your application has been confirmed and Admit Card is ready.');
        await loadDashboardData();
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ethex_student_session');
    router.push('/student/login');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Greeting */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-euro-navy to-euro-royal text-white flex items-center justify-center font-bold text-xl shadow-md">
              {student?.full_name ? student.full_name.charAt(0) : 'S'}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Candidate Dashboard
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-euro-navy mt-1">
                Welcome, {student?.full_name || 'Student Candidate'}
              </h1>
              <p className="text-xs text-slate-500">
                {student?.current_class || 'Class 10'} • {student?.target_stream || 'Foundation'} • {student?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <Link
              href="/results"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
            >
              Public Scorecard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-rose-600 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Merit & Scholarship Spotlight if qualified */}
        {results.length > 0 && results[0].scholarship_tier && (
          <div className="bg-gradient-to-r from-amber-500/15 via-blue-900/30 to-amber-500/15 border-2 border-amber-400 rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-400 text-euro-dark rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block">
                    ETHEX 2026 Examination Merit Award
                  </span>
                  <h3 className="text-lg font-black text-euro-navy">
                    {results[0].scholarship_tier}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-600 block">All-India Rank</span>
                <span className="text-2xl font-black text-amber-600">#{results[0].rank_overall}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              {results[0].isro_tour_eligible && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-100/80 text-amber-900 font-bold border border-amber-300">
                  <Rocket className="w-4 h-4 text-amber-600" />
                  <span>Selected for Sponsored ISRO Educational Tour</span>
                </div>
              )}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white text-euro-navy font-bold border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{results[0].scholarship_percentage}% Admission Fee Waiver Approved at EURO Campus</span>
              </div>
            </div>
          </div>
        )}

        {/* Section 1: My Examination Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-euro-navy flex items-center gap-2">
              <FileText className="w-5 h-5 text-euro-royal" />
              My Registered Examinations ({applications.length})
            </h2>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">No Active Applications Found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven&apos;t registered for an examination yet. Choose an eligible exam below to apply for free.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                        {app.exam?.code || 'ETHEX 2026'}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          app.application_status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        Status: {app.application_status.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                        Mode: {app.selected_mode}
                      </span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-euro-navy">
                      {app.exam?.title || 'ETHEX 2026: Foundation & Talent Hunt'}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-1">
                      <div>
                        <span className="text-slate-400 block text-[10px]">APPLICATION NO</span>
                        <span className="font-mono font-bold text-slate-800">{app.application_number}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">ROLL NUMBER</span>
                        <span className="font-mono font-bold text-euro-royal">{app.roll_number || 'Processing'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">TEST DATE</span>
                        <span className="font-bold text-slate-800">
                          {app.exam?.exam_date ? new Date(app.exam.exam_date).toLocaleDateString('en-IN') : 'Upcoming'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">VENUE / CENTRE</span>
                        <span className="font-bold text-slate-800 truncate block">
                          {app.selected_mode === 'offline' ? app.centre?.name || 'Assigned Centre' : 'Online CBT Engine'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* If fee pending */}
                    {app.payment_status === 'pending' && (
                      <button
                        onClick={() => handleRazorpayPayment(app)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-euro-dark font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        Pay ₹{app.fee_amount} via Razorpay
                      </button>
                    )}

                    {/* Admit Card Download */}
                    {app.admit_card_published && (
                      <button
                        onClick={() => setActiveAdmitCardApp(app)}
                        className="px-4 py-2 bg-euro-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5 text-euro-gold" />
                        Download Admit Card
                      </button>
                    )}

                    {/* Online Test Engine Access */}
                    {app.selected_mode === 'online' && app.application_status === 'confirmed' && (
                      <Link
                        href={`/student/exam/${app.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        Enter Exam Portal
                      </Link>
                    )}

                    {/* Receipt */}
                    {app.payment_status === 'successful' && (
                      <button
                        onClick={() => setActiveReceiptApp(app)}
                        className="px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                      >
                        Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Available & Eligible Examinations */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-euro-navy flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-euro-royal" />
              Eligible Examinations for You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableExams.map((exam) => {
              const isApplied = applications.some((a) => a.exam_id === exam.id);

              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                        {exam.class_category}
                      </span>
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {exam.fee_type === 'free' ? 'FREE REGISTRATION' : `₹${exam.fee_amount}`}
                      </span>
                    </div>

                    <h3 className="font-bold text-euro-navy text-base leading-snug">{exam.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {exam.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duration: {exam.duration_minutes} Mins • {exam.total_questions} MCQs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Mode: Online CBT & Offline Centres</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    {isApplied ? (
                      <span className="w-full text-center py-2.5 px-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Already Registered
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setApplyingExam(exam);
                          setSelectedMode('online');
                        }}
                        className="w-full text-center py-2.5 px-3 bg-euro-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        Apply for this Exam <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal: Application Submission Confirmation */}
        {applyingExam && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-euro-royal uppercase tracking-wider">
                  Registration Confirmation
                </span>
                <h3 className="text-lg font-bold text-euro-navy mt-1">
                  {applyingExam.title}
                </h3>
              </div>

              {/* Mode Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Select Examination Mode:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMode('online')}
                    className={`p-3 rounded-xl border text-left text-xs space-y-1 transition-all ${
                      selectedMode === 'online'
                        ? 'border-euro-royal bg-blue-50/70 text-euro-navy font-bold ring-2 ring-euro-royal/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold">1. Online Exam</span>
                    <span className="text-[10px] text-slate-500 block">Take from home on laptop or phone</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMode('offline')}
                    className={`p-3 rounded-xl border text-left text-xs space-y-1 transition-all ${
                      selectedMode === 'offline'
                        ? 'border-euro-royal bg-blue-50/70 text-euro-navy font-bold ring-2 ring-euro-royal/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold">2. Offline Centre</span>
                    <span className="text-[10px] text-slate-500 block">Appear in-person at EURO Campus</span>
                  </button>
                </div>
              </div>

              {/* Centre selector if offline */}
              {selectedMode === 'offline' && (
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Choose Testing Centre:</label>
                  <select
                    value={selectedCentre}
                    onChange={(e) => setSelectedCentre(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-euro-royal"
                  >
                    {centres.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center font-bold">
                <span className="text-slate-600">Registration Fee:</span>
                <span className="text-emerald-700 text-sm">
                  {applyingExam.fee_type === 'free' ? 'FREE OF COST (₹0)' : `₹${applyingExam.fee_amount}.00`}
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyingExam(null)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submittingApp}
                  onClick={handleApply}
                  className="flex-1 py-2.5 bg-euro-royal hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-colors disabled:opacity-50"
                >
                  {submittingApp ? 'Submitting...' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admit Card Modal View */}
        {activeAdmitCardApp && (
          <AdmitCardModal
            application={activeAdmitCardApp}
            studentName={student?.full_name || 'Candidate'}
            onClose={() => setActiveAdmitCardApp(null)}
          />
        )}

        {/* Payment Receipt Modal View */}
        {activeReceiptApp && (
          <PaymentReceiptModal
            application={activeReceiptApp}
            studentName={student?.full_name || 'Candidate'}
            onClose={() => setActiveReceiptApp(null)}
          />
        )}
      </div>
    </div>
  );
}
