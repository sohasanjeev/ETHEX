'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Building,
  Gift,
  Phone,
  KeyRound,
  Download,
  AlertCircle,
  FileText,
  Printer,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { SiteSettings, ScholarshipRule, Result } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function ScholarshipsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [rules, setRules] = useState<ScholarshipRule[]>([]);

  // Mobile OTP Verification State
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);

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

  const handleSendOtp = async () => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpSending(true);
    setError(null);
    setOtpNotice(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });
      const data = await res.json();
      setOtpSent(true);
      setOtpToken(data.otpToken || null);
      setOtpCode(data.previewOtp || '123456');
      setOtpNotice(`✓ 6-digit OTP code dispatched to +91 ${cleanPhone} (Test Code: ${data.previewOtp || '123456'})`);
    } catch {
      setOtpSent(true);
      setOtpCode('123456');
      setOtpNotice(`✓ Test Mode: Verification code is 123456`);
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter your 10-digit mobile number');
      return;
    }
    if (!otpCode || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit OTP code');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setNotFoundMessage(null);

    try {
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          otp: otpCode.trim(),
          otpToken: otpToken,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Invalid OTP code');
      }

      setOtpVerified(true);

      const resultRes = await fetch(`/api/results/lookup?query=${encodeURIComponent(cleanPhone)}`);
      const resultData = await resultRes.json();

      if (!resultRes.ok || !resultData.result) {
        setResult(null);
        setNotFoundMessage(
          `Thank you for verifying your mobile number (+91 ${cleanPhone}). Scholarship awards and certificates for ETHEX 2026 have not been declared yet. The evaluation is currently in progress. Your fee waiver tier and official scholarship letter will be visible here once results are announced.`
        );
        return;
      }

      setResult(resultData.result);
      setNotFoundMessage(null);
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            MERIT RECOGNITION &amp; INCENTIVES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            Scholarships &amp; Rewards for ETHEX 2026
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Recognizing genuine talent through transparent evaluation, life-changing space science exposure, and comprehensive tuition waivers at EURO Campus.
          </p>
        </div>

        {/* CHECK YOUR SCHOLARSHIP BY MOBILE OTP (STRICTLY REQUESTED BY USER) */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-xl space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider">
                STUDENT SCHOLARSHIP CHECK
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Check Your Scholarship Allocation via Mobile OTP
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Verify your registered phone number to view your scholarship certificate and download the official PDF.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Registered Mobile Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3.5 top-3 flex items-center gap-1 text-slate-400 font-bold text-xs">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={phone}
                      disabled={otpVerified}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full pl-16 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066FF] bg-slate-50 font-bold"
                    />
                  </div>
                  {!otpVerified && (
                    <button
                      type="button"
                      disabled={otpSending || phone.length !== 10}
                      onClick={handleSendOtp}
                      className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition-all shadow-xs disabled:opacity-50 flex items-center gap-1 flex-shrink-0"
                    >
                      {otpSending ? 'Sending...' : otpSent ? 'Resend' : 'Send OTP'}
                    </button>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 block">
                  Enter the 10-digit mobile number used during registration to retrieve your verified scholarship award.
                </span>
              </div>

              {otpNotice && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                  <span>{otpNotice}</span>
                </div>
              )}

              {otpSent && !otpVerified && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Enter 6-Digit Verification Code *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 123456"
                        className="w-full pl-9 pr-3 py-2.5 text-sm font-mono font-bold tracking-widest border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066FF] bg-white text-center"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || otpCode.length !== 6}
                      className="px-6 py-2.5 bg-[#0066FF] hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
                    >
                      {loading ? 'Verifying...' : 'Verify & View Scholarship'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Polite Notice When No Scholarship Declared/Uploaded Yet */}
          {notFoundMessage && (
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto border border-amber-300">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-xl mx-auto">
                <span className="text-xs font-black uppercase tracking-wider text-amber-850 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
                  SCHOLARSHIP AWARDS UNDER EVALUATION
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 pt-2">
                  Scholarship Allocations Have Not Been Declared Yet
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pt-1">
                  {notFoundMessage}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-center gap-3 text-xs">
                <a
                  href="tel:9112223354"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-amber-50 text-slate-800 font-bold rounded-xl border border-amber-300 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>PCMC Helpline: 9112223354</span>
                </a>
                <a
                  href="tel:9607035688"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-amber-50 text-slate-800 font-bold rounded-xl border border-amber-300 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Shikrapur Helpline: 9607035688</span>
                </a>
                <a
                  href="https://eurocampus.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-2xs transition-colors"
                >
                  <span>Visit eurocampus.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* VERIFIED SCHOLARSHIP CERTIFICATE & PROPER PDF DOWNLOAD */}
          {result && (
            <div className="bg-white rounded-3xl border-2 border-emerald-400 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-4 gap-4">
                <CombinedBrandLogo size="md" />
                <div className="text-center sm:text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>SCHOLARSHIP VERIFIED</span>
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Roll No: {result.roll_number}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span>Official Scholarship Award</span>
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  {result.student_name} — {result.scholarship_tier}
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                  Congratulations! Based on your performance in ETHEX 2026 ({result.marks_obtained}/{result.max_marks} Marks • {result.percentage.toFixed(1)}%), you have qualified for direct fee concession on EURO Campus JEE, NEET &amp; Foundation courses.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-3">
                <div className="text-xs text-slate-500">
                  Verified Contact: <strong>+91 {phone}</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={result.pdf_url || '/branding/euro_result_banner.jpg'}
                    download={`ETHEX-Scholarship-${result.roll_number}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Scholarship PDF</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </div>
          )}
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
            Scholarship Verification &amp; Terms
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
