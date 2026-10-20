import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Monitor, Building, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Candidate Instructions & Rules — ETHEX 2026 | EURO Campus',
  description:
    'Comprehensive code of conduct, testing guidelines, and exam day protocol for both online proctored and offline centre candidates.',
};

export default function InstructionsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Official Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
            Candidate Code of Conduct & Instructions
          </h1>
          <p className="text-slate-600 text-sm">
            Read carefully prior to the examination date. Adherence to all testing rules is mandatory.
          </p>
        </div>

        {/* Online Candidate Guidelines */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <Monitor className="w-6 h-6 text-euro-royal" />
            <h2 className="text-xl font-bold text-euro-navy">
              Part A: Online Examination Rules
            </h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>System Readiness:</strong> Candidates may use a laptop, desktop PC, or mobile device with a modern browser (Google Chrome, Microsoft Edge, or Safari). Stable internet of at least 1 Mbps is recommended.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Full Screen & Integrity:</strong> Once the test begins, the browser enters fullscreen mode. Switching tabs, opening secondary search windows, or running background communication software will generate automatic proctor alerts.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Live Autosave:</strong> Your answers are saved on the server immediately upon selecting an option. In case of unexpected power failure or brief internet drop, you can resume your session within the stipulated duration.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Server-Enforced Timer:</strong> The examination deadline is tracked and enforced by the server. When the timer hits 00:00, the system automatically submits your attempted answers.
              </span>
            </li>
          </ul>
        </div>

        {/* Offline Candidate Guidelines */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <Building className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-bold text-euro-navy">
              Part B: Offline Centre Rules (PCMC & Shikrapur)
            </h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Reporting Time:</strong> Candidates must report to their assigned centre at least <strong>45 minutes prior</strong> to the scheduled start time for verification and biometric attendance.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Admit Card Printout:</strong> Carry a clear printed copy of the official Admit Card with a recent passport-sized photograph pasted in the designated box, plus any valid school ID.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Stationery:</strong> Bring black/blue ballpoint pens. Calculators, smartwatches, logarithmic tables, and mobile phones are strictly prohibited in the exam hall.
              </span>
            </li>
          </ul>
        </div>

        {/* Disqualification warning */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex items-start gap-4 text-xs sm:text-sm text-rose-900">
          <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Zero Tolerance for Malpractice:</p>
            <p className="text-rose-800 text-xs leading-relaxed">
              Any candidate found impersonating, communicating with others during the test, or using unfair means will be disqualified immediately and debarred from scholarship consideration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
