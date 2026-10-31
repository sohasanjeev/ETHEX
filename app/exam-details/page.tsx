import React from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, ArrowRight, Clock, HelpCircle, Monitor, Building } from 'lucide-react';

export const metadata = {
  title: 'Exam Details & Eligibility — ETHEX 2026 | EURO Campus',
  description:
    'Detailed examination breakdown, eligible classes (8 to 12), online and offline examination modes, and registration procedures for ETHEX 2026.',
};

export default function ExamDetailsPage() {
  const categories = [
    {
      grade: 'Class 8',
      stream: 'Foundation & STEM Olympiad Search',
      duration: '60 Minutes',
      questions: '60 Questions',
      marking: '+4 / -1',
      eligibility: 'Students currently enrolled in Class 8 preparing for science Olympiads and pre-foundation courses.',
    },
    {
      grade: 'Classes 9 & 10',
      stream: 'Pre-Foundation & NTSE Benchmark',
      duration: '90 Minutes',
      questions: '50 Questions',
      marking: '+4 / -1 (Negative marking for incorrect answer)',
      eligibility: 'Class 9 or 10 students targeting 2-year Foundation, JEE Main, NEET, and MHT-CET coaching.',
    },
    {
      grade: 'Class 11 & 12 (JEE)',
      stream: 'Engineering Aspirants (IIT-JEE)',
      duration: '120 Minutes',
      questions: '60 Questions (PCM)',
      marking: '+4 / -1',
      eligibility: 'Class 11 or 12 Science (PCM) students aspiring for IITs, NITs, IIITs, and premier engineering institutes.',
    },
    {
      grade: 'Class 11 & 12 (NEET)',
      stream: 'Medical Aspirants (NEET-UG)',
      duration: '120 Minutes',
      questions: '60 Questions (PCB)',
      marking: '+4 / -1',
      eligibility: 'Class 11 or 12 Science (PCB) students targeting AIIMS, Government Medical Colleges, and MBBS/BDS admissions.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Official Exam Structure
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            ETHEX 2026 Examination Details
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Understand eligibility requirements, dual examination modes, and curriculum coverage designed for each grade level.
          </p>
        </div>

        {/* Online vs Offline Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-euro-royal">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-euro-navy text-lg">Mode 1: Online Examination</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Take from Anywhere
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Candidates can take the examination from home on a desktop, laptop, or tablet with internet connectivity.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Browser-based interface with automatic timer & live answer-saving
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Randomized question and option order to maintain testing integrity
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                Instant submission confirmation and diagnostic scorecard availability
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-euro-navy text-lg">Mode 2: Offline Exam Centre</h3>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  EURO Campus Centres
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Appear in-person at EURO Campus certified testing centres located at PCMC, Shikrapur, and partner institutions.
            </p>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                Real competitive examination simulation with OMR/CBT infrastructure
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                Verified invigilation, assigned halls, and seating allocation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                On-spot guidance and parent counseling sessions by academic mentors
              </li>
            </ul>
          </div>
        </div>

        {/* Grade-wise Structure Table */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-euro-navy">
            Grade-Wise Structure & Eligibility
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="p-4">Grade & Category</th>
                    <th className="p-4">Target Stream</th>
                    <th className="p-4">Format</th>
                    <th className="p-4">Marking Scheme</th>
                    <th className="p-4">Eligibility Requirements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {categories.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-euro-navy whitespace-nowrap">
                        {c.grade}
                      </td>
                      <td className="p-4 font-semibold text-euro-royal whitespace-nowrap">
                        {c.stream}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="block font-medium text-slate-900">{c.duration}</span>
                        <span className="text-[11px] text-slate-500">{c.questions}</span>
                      </td>
                      <td className="p-4 whitespace-nowrap font-medium text-slate-800">
                        {c.marking}
                      </td>
                      <td className="p-4 text-xs leading-relaxed max-w-xs sm:max-w-sm">
                        {c.eligibility}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Registration CTA */}
        <div className="bg-gradient-to-r from-euro-navy to-euro-deep rounded-2xl p-8 text-white text-center space-y-4">
          <h3 className="text-2xl font-bold">Secure Your Spot in ETHEX 2026</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Choose your class, select your preferred examination mode, and obtain your official admit card.
          </p>
          <div className="pt-2">
            <Link
              href="/student/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-euro-dark font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              Start Free Registration <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
