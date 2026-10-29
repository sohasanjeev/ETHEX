import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, ArrowRight, Download, PlayCircle } from 'lucide-react';

export const metadata = {
  title: 'Exam Pattern & Marking Scheme — ETHEX 2026 | EURO Campus',
  description:
    'Complete syllabus guidelines, subject-wise weightage, marking scheme, and time duration for ETHEX 2026 examinations (Classes 7 to 12).',
};

export default function ExamPatternPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            OFFICIAL SYLLABUS & BLUEPRINT
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
            Examination Pattern & Marking Scheme
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Standardized blueprint designed for <strong>Classes 7 to 12</strong> targeting JEE, NEET, MHT-CET, Science Olympiads & Foundation excellence.
          </p>
        </div>

        {/* Marking Scheme Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Correct Response
            </span>
            <h3 className="text-3xl font-black text-slate-900">+4 Marks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Each correctly marked response earns 4 positive marks towards your total score.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Incorrect Response
            </span>
            <h3 className="text-3xl font-black text-slate-900">-1 Mark</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              1 mark is deducted for each incorrect answer to benchmark real competitive examination accuracy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Unanswered Questions
            </span>
            <h3 className="text-3xl font-black text-slate-900">0 Marks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No marks are awarded or deducted for skipped questions.
            </p>
          </div>
        </div>

        {/* Global Blueprint Metrics */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#0066FF] uppercase">UNIVERSAL EXAM FORMAT</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              60 Questions • 240 Total Marks • 60 Minutes
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Objective Multiple-Choice Questions (MCQs) with single correct answer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/exam/simulation"
              className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] font-bold text-xs rounded-xl border border-blue-200 transition-all flex items-center gap-1.5"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Try CBT Simulator</span>
            </Link>
            <Link
              href="/student/register"
              className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
            >
              Register for Free
            </Link>
          </div>
        </div>

        {/* Subject-Wise Patterns */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Stream-Wise Subject Breakdown (Classes 7 to 12)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class 7 & 8 Foundation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Foundation (Classes 7 & 8)</h3>
                  <p className="text-[11px] text-slate-500">Future Science Champ & Olympiad Foundation</p>
                </div>
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded">
                  60 Qs • 240 Marks
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Biology & Mathematics</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Mental Ability & Space Science</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
              </ul>
            </div>

            {/* Class 9 & 10 Pre-JEE / Pre-NEET */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Pre-JEE & Pre-NEET (Classes 9 & 10)</h3>
                  <p className="text-[11px] text-slate-500">NTSE, State Olympiads & Advanced Science</p>
                </div>
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded">
                  60 Qs • 240 Marks
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Mathematics / Biology</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Mental Ability & Aptitude</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
              </ul>
            </div>

            {/* IIT-JEE (Classes 11 & 12) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">IIT-JEE Track (Classes 11 & 12)</h3>
                  <p className="text-[11px] text-slate-500">JEE Main + Advanced, MHT-CET Engineering</p>
                </div>
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded">
                  60 Qs • 240 Marks
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics (Mechanics, Electrodynamics, Modern Physics)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry (Physical, Organic & Inorganic)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Mathematics (Calculus, Algebra, Coordinate)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
              </ul>
            </div>

            {/* NEET-UG (Classes 11 & 12) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">NEET-UG Medical (Classes 11 & 12)</h3>
                  <p className="text-[11px] text-slate-500">Medical Entrance, AIIMS, State Merit</p>
                </div>
                <span className="text-xs font-bold text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded">
                  60 Qs • 240 Marks
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics (NCERT Core NEET Pattern)</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry (NCERT Core NEET Pattern)</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Biology (Botany + Zoology)</span>
                  <span className="font-bold text-slate-900">30 Questions (120 Marks)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Candidate Advice Box */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 text-xs sm:text-sm text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Important Instructions for Candidates:</p>
            <p className="text-amber-800 text-xs leading-relaxed">
              In negative marking categories, blind guessing is discouraged. Candidates are advised to prioritize conceptual accuracy. All questions are standard multiple-choice format with exactly one correct option out of four.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
