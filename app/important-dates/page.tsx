'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

export default function ImportantDatesPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const timeline = [
    {
      event: 'Online Registration Commencement',
      date: 'Active & Open Now',
      status: 'active',
      desc: 'Students of Classes 5 to 12 can register online for free or offline via school partners.',
    },
    {
      event: 'Registration Closing Date',
      date: 'To be notified 10 days prior to exam',
      status: 'upcoming',
      desc: 'Candidates are advised to complete profile details and choose exam mode promptly.',
    },
    {
      event: 'Admit Card Release',
      date: '7 Days Prior to Examination',
      status: 'upcoming',
      desc: 'Download verified admit card with Roll Number and examination slot from student dashboard.',
    },
    {
      event: 'ETHEX 2026 Examination Date',
      date: settings?.exam_date_display || 'To Be Announced Soon',
      status: 'highlight',
      desc: 'Both Online Proctored CBT and Offline Centre testing will be conducted simultaneously.',
    },
    {
      event: 'Provisional Answer Key Release',
      date: '24 Hours Post Examination',
      status: 'upcoming',
      desc: 'Candidate question paper and answer key released for verification.',
    },
    {
      event: 'Final Results & Merit Rank Publication',
      date: 'Within 7 Days Post Examination',
      status: 'upcoming',
      desc: 'Individual scorecards, percentiles, and ISRO Tour qualifier list published.',
    },
    {
      event: 'Scholarship Counseling & Campus Admissions',
      date: 'Immediately Following Results',
      status: 'upcoming',
      desc: 'Verification and fee waiver processing at EURO Campus PCMC and Shikrapur.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Official Timeline
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
            Important Dates & Examination Schedule
          </h1>
          <p className="text-slate-600 text-sm">
            Stay updated with official schedules for registration, admit cards, test dates, and scholarship results.
          </p>
        </div>

        {/* Schedule Notice Box */}
        <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Examination Schedule Status
            </span>
            <h3 className="text-2xl font-black text-white">
              {settings?.exam_date_display || 'To Be Announced Soon'}
            </h3>
            <p className="text-xs text-blue-200 max-w-lg">
              The next official test date for ETHEX 2026 is currently being finalized by the EURO Campus Academic Board. Registrations are open.
            </p>
          </div>
          <Link
            href="/student/register"
            className="flex-shrink-0 px-5 py-3 bg-amber-400 hover:bg-amber-500 text-euro-dark font-extrabold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95"
          >
            Register Now (Free)
          </Link>
        </div>

        {/* Timeline List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-euro-navy border-b border-slate-100 pb-3">
            Milestones & Key Deadlines
          </h2>

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 sm:gap-6 group">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.status === 'active'
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : item.status === 'highlight'
                        ? 'bg-amber-500 text-euro-dark ring-4 ring-amber-100'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx !== timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-slate-200 my-1"></div>
                  )}
                </div>

                <div className="flex-1 space-y-1 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h4 className="text-sm sm:text-base font-bold text-euro-navy">{item.event}</h4>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block w-fit ${
                        item.status === 'active'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.status === 'highlight'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
