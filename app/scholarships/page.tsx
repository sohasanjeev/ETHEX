'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, Rocket, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Building, Gift } from 'lucide-react';
import { SiteSettings, ScholarshipRule } from '@/lib/types';

export default function ScholarshipsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [rules, setRules] = useState<ScholarshipRule[]>([]);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});

    fetch('/api/scholarships/rules')
      .then((res) => res.json())
      .then((data) => {
        if (data.rules) setRules(data.rules);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Merit Recognition & Incentives
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            Scholarships & Rewards for ETHEX 2026
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Recognizing genuine talent through transparent evaluation, life-changing space science exposure, and comprehensive tuition waivers at EURO Campus.
          </p>
        </div>

        {/* 3 Major Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border-2 border-amber-400 shadow-md relative overflow-hidden space-y-3">
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center opacity-60">
              <Rocket className="w-8 h-8 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
              Grand Science Tour
            </span>
            <h3 className="text-xl font-black text-euro-navy">ISRO Educational Tour</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Top performers in ETHEX 2026 across eligible categories will be awarded a fully sponsored educational visit to ISRO facilities to interact with scientists and observe rocket technology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded-full uppercase">
              Financial Commitment
            </span>
            <h3 className="text-xl font-black text-euro-navy">
              {settings?.admission_scholarship_pool || '₹2.5 CRORES'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total scholarship pool allocated for academic fee waivers in 1-Year and 2-Year Foundation, JEE, NEET, and MHT-CET coaching batches at EURO Campus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
              Cash Rewards
            </span>
            <h3 className="text-xl font-black text-euro-navy">
              {settings?.cash_prize_pool || '₹10 Lacs (Stage-2)'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct cash prizes and academic merit certificates awarded to top rankers qualifying through the Stage-2 final benchmark round.
            </p>
          </div>
        </div>

        {/* Scholarship Tiers Matrix */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-euro-navy">
            Scholarship Award Tiers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-amber-400 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-amber-400 text-euro-dark uppercase tracking-wider">
                Rank 1 – 10
              </span>
              <h4 className="text-lg font-bold text-euro-navy">Platinum Star</h4>
              <div className="text-2xl font-black text-amber-600">90% Waiver</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5 text-amber-800 font-semibold">
                  <Rocket className="w-3.5 h-3.5" /> ISRO Educational Tour
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ₹25,000 Cash Prize
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Super-30 Batch Access
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-blue-100 text-blue-900 uppercase tracking-wider">
                Rank 11 – 50
              </span>
              <h4 className="text-lg font-bold text-euro-navy">Diamond Scholar</h4>
              <div className="text-2xl font-black text-euro-royal">90% Waiver</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ₹10,000 Cash Prize
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Comprehensive Mentorship
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Merit Certificate
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-slate-100 text-slate-800 uppercase tracking-wider">
                Rank 51 – 150
              </span>
              <h4 className="text-lg font-bold text-euro-navy">Gold Scholar</h4>
              <div className="text-2xl font-black text-euro-royal">75% Waiver</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ₹5,000 Cash Prize
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 75% Admission Fee Waiver
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Test Series Access
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
              <span className="px-2.5 py-1 rounded text-xs font-extrabold bg-slate-100 text-slate-800 uppercase tracking-wider">
                Rank 151 – 350
              </span>
              <h4 className="text-lg font-bold text-euro-navy">Silver Scholar</h4>
              <div className="text-2xl font-black text-euro-royal">50% Waiver</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 50% Admission Fee Waiver
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Study Material Kit
                </li>
                <li className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Performance Analysis
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verification & Award Policy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs text-slate-600">
          <h3 className="text-base font-bold text-euro-navy">
            Scholarship Verification & Terms
          </h3>
          <p className="leading-relaxed">
            1. All scholarship allocations are strictly merit-based and calculated using the candidate’s official score and percentile in ETHEX 2026.
          </p>
          <p className="leading-relaxed">
            2. Candidates must present proof of school enrollment and photo ID verification at the time of claiming the admission fee scholarship at EURO Campus PCMC or Shikrapur campus.
          </p>
          <p className="leading-relaxed">
            3. The ISRO Educational Tour will be conducted in coordination with official educational outreach schedules. Eligible students will be accompanied by EURO Campus academic mentors.
          </p>
        </div>
      </div>
    </div>
  );
}
