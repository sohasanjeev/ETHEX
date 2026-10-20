import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Exam Pattern & Marking Scheme — ETHEX 2026 | EURO Campus',
  description:
    'Complete syllabus guidelines, subject-wise weightage, marking scheme, and time duration for ETHEX 2026 examinations.',
};

export default function ExamPatternPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Syllabus & Blueprints
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            Examination Pattern & Marking Scheme
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Detailed subject breakdown, question distributions, and scoring criteria designed to evaluate competitive aptitude.
          </p>
        </div>

        {/* Marking Scheme Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Correct Response
            </span>
            <h3 className="text-2xl font-black text-euro-navy">+4 Marks</h3>
            <p className="text-xs text-slate-600">
              Each correctly answered question awards four positive marks towards the total score.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
              Negative Marking
            </span>
            <h3 className="text-2xl font-black text-euro-navy">-1 Mark</h3>
            <p className="text-xs text-slate-600">
              For Classes 9 to 12 (Foundation, JEE & NEET), 1 mark is deducted for each incorrect option. Middle school (5–8) has <strong>no negative marking</strong>.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Unanswered
            </span>
            <h3 className="text-2xl font-black text-euro-navy">0 Marks</h3>
            <p className="text-xs text-slate-600">
              No penalty or addition is applied for unattempted or skipped questions.
            </p>
          </div>
        </div>

        {/* Subject-Wise Patterns */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-euro-navy">
            Stream-Wise Subject Distribution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foundation Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-euro-navy text-lg">Foundation (Classes 9 & 10)</h3>
                <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded">50 Questions • 200 Marks</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics</span>
                  <span className="font-bold text-slate-900">12 Questions (48 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry</span>
                  <span className="font-bold text-slate-900">12 Questions (48 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Mathematics</span>
                  <span className="font-bold text-slate-900">14 Questions (56 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Mental Ability & Logical Aptitude</span>
                  <span className="font-bold text-slate-900">12 Questions (48 Marks)</span>
                </li>
              </ul>
            </div>

            {/* JEE Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-euro-navy text-lg">IIT-JEE (Classes 11 & 12)</h3>
                <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded">60 Questions • 240 Marks</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics (Mechanics, Waves, Electromagnetism)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry (Physical, Organic & Inorganic)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Mathematics (Algebra, Calculus, Vectors)</span>
                  <span className="font-bold text-slate-900">20 Questions (80 Marks)</span>
                </li>
              </ul>
            </div>

            {/* NEET Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-euro-navy text-lg">NEET Medical (Classes 11 & 12)</h3>
                <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded">60 Questions • 240 Marks</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Physics (Conceptual NEET pattern)</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Chemistry (NCERT Core Fundamentals)</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Biology (Botany + Zoology)</span>
                  <span className="font-bold text-slate-900">30 Questions (120 Marks)</span>
                </li>
              </ul>
            </div>

            {/* Middle School Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-euro-navy text-lg">Junior STEM (Classes 5 to 8)</h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">40 Questions • 160 Marks</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Science & Inquisitiveness</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-50">
                  <span className="font-medium">Mathematics & Logic</span>
                  <span className="font-bold text-slate-900">15 Questions (60 Marks)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium">Puzzles & Visual Reasoning</span>
                  <span className="font-bold text-slate-900">10 Questions (40 Marks)</span>
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
              In negative marking categories, blind guessing is discouraged. Candidates are advised to prioritize accuracy. All questions are standard multiple-choice format with exactly one correct option out of four.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
