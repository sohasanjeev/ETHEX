'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  CheckCircle2,
  FileText,
  Award,
  ArrowLeft,
  LogOut,
  Download,
  Clock,
  MapPin,
  PlayCircle,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Application, Exam } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import AdmitCardModal from '@/components/student/AdmitCardModal';

export default function StudentProfilePage() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAdmitCardApp, setActiveAdmitCardApp] = useState<Application | null>(null);

  useEffect(() => {
    try {
      const sessionStr = localStorage.getItem('ethex_student_session');
      if (!sessionStr) {
        router.push('/student/login');
        return;
      }
      const parsed = JSON.parse(sessionStr);
      setStudent(parsed);

      // Load student's enrolled applications
      fetch(`/api/applications/list?studentId=${parsed.id || 'demo-student-id'}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.applications) setApplications(data.applications);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } catch {
      router.push('/student/login');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('ethex_student_session');
    router.push('/');
  };

  const getInitials = (name: string) => {
    if (!name) return 'S';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-euro-royal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="px-3.5 py-1.5 border border-slate-300 hover:bg-rose-50 hover:border-rose-200 text-rose-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Student Avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-euro-navy via-euro-royal to-blue-500 text-white flex items-center justify-center font-black text-4xl shadow-xl border-4 border-white">
                {getInitials(student?.full_name || student?.name)}
              </div>
              <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Candidate Account">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-euro-royal text-[11px] font-extrabold border border-blue-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-euro-royal" />
                <span>OFFICIAL VERIFIED CANDIDATE</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {student?.full_name || student?.name || 'Registered Student'}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{student?.email || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{student?.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{student?.current_class || 'Class 10'} • {student?.target_stream || 'Foundation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>AY 2027–2028 Academic Cycle</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Enrolled Examinations */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-euro-royal" />
                <span>Enrolled Examinations ({applications.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Active examination registrations and official roll numbers for this candidate.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-euro-royal border border-blue-200">
              {applications.length} Enrolled
            </span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">Loading enrollment records...</div>
          ) : applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {(app as any).status || app.application_status || 'CONFIRMED'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-900 border border-blue-200">
                        MODE: {app.selected_mode ? String(app.selected_mode).toUpperCase() : 'ONLINE'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {app.exam?.title || (app as any).exam_name || 'ETHEX 2026: Talent Hunt Examination'}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                      <span>Roll No: <strong className="font-mono text-euro-royal">{app.roll_number || 'Pending Assignment'}</strong></span>
                      <span>•</span>
                      <span>App No: <strong className="font-mono text-slate-800">{app.application_number}</strong></span>
                      <span>•</span>
                      <span>Date: <strong className="text-slate-800">{app.exam?.exam_date ? new Date(app.exam.exam_date).toLocaleDateString('en-IN') : ((app as any).test_date || 'To Be Announced')}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <button
                      onClick={() => setActiveAdmitCardApp(app)}
                      className="px-4 py-2.5 bg-euro-navy hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Admit Card</span>
                    </button>
                    {app.selected_mode === 'online' && (
                      <Link
                        href="/student/exam/simulation"
                        className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-euro-royal" />
                        <span>Try Mock CBT</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-600">No examination enrollments found yet</p>
              <Link
                href="/student/dashboard"
                className="inline-block px-5 py-2 bg-euro-royal text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Enroll in an Examination
              </Link>
            </div>
          )}
        </div>

        {/* Section 2: Previous Year Marks & Academic Performance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Academic Performance & Previous Year Marks</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Verified score history, percentiles, and merit rankings on record.
              </p>
            </div>
          </div>

          {/* Clean Real Empty State (No Fake Demo Values) */}
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 mx-auto flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                0 Previous Examination Attempts on Record
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                You have not participated in previous editions of the talent hunt exam. Official marks breakdown, All-India Rank, and scholarship awards for <strong>ETHEX 2026</strong> will be published here upon result declaration.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/student/exam/simulation"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs"
              >
                <PlayCircle className="w-4 h-4 text-euro-royal" />
                <span>Practice with Free CBT Online Mock Test</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Admit Card Modal */}
      {activeAdmitCardApp && (
        <AdmitCardModal
          application={activeAdmitCardApp}
          studentName={student?.full_name || student?.name || 'Candidate'}
          onClose={() => setActiveAdmitCardApp(null)}
        />
      )}
    </div>
  );
}
