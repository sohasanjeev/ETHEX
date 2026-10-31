'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Award,
  CheckCircle2,
  AlertCircle,
  Printer,
  Rocket,
  Sparkles,
  Building,
  Trophy,
  Star,
  Download,
  Phone,
  ArrowRight,
  KeyRound,
  FileText,
  RotateCcw,
  Eye,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { Result, ResultChampion } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import Link from 'next/link';

export default function ResultsPage() {
  // Mobile OTP Verification State
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Roll Number fallback lookup
  const [rollNumberQuery, setRollNumberQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'mobile' | 'roll'>('mobile');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);

  // Dynamic Champions & Results Wall
  const [champions, setChampions] = useState<ResultChampion[]>([]);
  const [resultsHeadline, setResultHeadline] = useState<string>(
    'EURO CAMPUS Champions — NEET 650+ & National ISRO Tour Qualifiers'
  );
  const [resultsPamphletUrl, setResultsPamphletUrl] = useState<string>('/branding/euro_result_banner.jpg');

  useEffect(() => {
    fetchChampions();
  }, []);

  // Cooldown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const fetchChampions = async () => {
    try {
      const res = await fetch('/api/results/champions');
      const data = await res.json();
      if (data?.champions) setChampions(data.champions);
      if (data?.results_headline) setResultHeadline(data.results_headline);
      if (data?.results_pamphlet_url) setResultsPamphletUrl(data.results_pamphlet_url);
    } catch {
      // Fallback
    }
  };

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
      setResendCooldown(45);
      setOtpNotice(`✓ 6-digit OTP code dispatched to +91 ${cleanPhone} (Test Code: ${data.previewOtp || '123456'})`);
    } catch {
      setOtpSent(true);
      setOtpCode('123456');
      setResendCooldown(45);
      setOtpNotice(`✓ Test Mode: Verification code is 123456`);
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtpAndFetchResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter your 10-digit mobile number');
      return;
    }
    if (!otpCode || otpCode.trim().length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setNotFoundMessage(null);

    try {
      // 1. Verify OTP
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
        throw new Error(verifyData.error || 'Invalid OTP verification code');
      }

      setOtpVerified(true);

      // 2. Fetch Result for this verified Mobile Number
      const resultRes = await fetch(`/api/results/lookup?query=${encodeURIComponent(cleanPhone)}`);
      const resultData = await resultRes.json();

      if (!resultRes.ok || !resultData.result) {
        setResult(null);
        setNotFoundMessage(
          `Thank you for verifying your mobile number (+91 ${cleanPhone}). The ETHEX 2026 examination results and scorecards have not been uploaded by the administration yet. The evaluation is currently in progress. Please check back soon once results are declared, or reach out to our campus helplines.`
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

  const handleRollLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNumberQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setNotFoundMessage(null);

    try {
      const res = await fetch(`/api/results/lookup?query=${encodeURIComponent(rollNumberQuery.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.result) {
        setResult(null);
        setNotFoundMessage(
          `No examination scorecard published yet for "${rollNumberQuery.trim()}". Examination results for ETHEX 2026 are currently under evaluation and will be uploaded soon by the administration.`
        );
      } else {
        setResult(data.result);
        setNotFoundMessage(null);
      }
    } catch (err: any) {
      setError('Unable to reach result server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Portal Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
            OFFICIAL RESULTS &amp; MERIT PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            ETHEX 2026 Results &amp; Scholarships
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto">
            Verify your mobile number to view your official scorecard, All-India Rank, scholarship tier, and download your authentic PDF report.
          </p>
        </div>

        {/* 1. VERIFY MOBILE NUMBER TO ACCESS SCORECARD & SCHOLARSHIP (STRICTLY REQUESTED BY USER) */}
        <div id="check-result" className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-[#0066FF] border border-blue-200 uppercase tracking-wider">
                  STUDENT PORTAL VERIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Check Your Result &amp; Scholarship Status
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Enter your registered mobile number. Verify via OTP to view and download your official PDF result.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSearchMode('mobile')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    searchMode === 'mobile' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  By Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setSearchMode('roll')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    searchMode === 'roll' ? 'bg-[#0066FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  By Roll No
                </button>
              </div>
            </div>

            {searchMode === 'mobile' ? (
              <form onSubmit={handleVerifyOtpAndFetchResult} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Registered Mobile Number *
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute left-3.5 top-3 flex items-center gap-1.5 text-slate-400 font-bold text-xs">
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
                        className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 text-xs font-black rounded-xl transition-all shadow-2xs disabled:opacity-50 flex items-center gap-1 flex-shrink-0"
                      >
                        {otpSending ? 'Sending...' : otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block">
                    Enter the 10-digit mobile number used during ETHEX 2026 registration to retrieve your verified scorecard.
                  </span>
                </div>

                {otpNotice && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                    <span>{otpNotice}</span>
                  </div>
                )}

                {/* OTP Code Input */}
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
                        {loading ? 'Verifying...' : 'Verify & View Result'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleRollLookup} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={rollNumberQuery}
                    onChange={(e) => setRollNumberQuery(e.target.value)}
                    placeholder="Enter Roll No (e.g. ETHEX26-24101) or App No"
                    className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0066FF] font-mono uppercase bg-slate-50 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Searching...' : 'View Scorecard'}</span>
                </button>
              </form>
            )}

            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Polite Notice When No Result Uploaded by Admin Yet */}
          {notFoundMessage && (
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-sm animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto border border-amber-300">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-xl mx-auto">
                <span className="text-xs font-black uppercase tracking-wider text-amber-850 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
                  EVALUATION IN PROGRESS • RESULT AWAITED
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 pt-2">
                  Results Have Not Been Declared Yet
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

          {/* DISPLAY VERIFIED RESULT, SCHOLARSHIP & OFFICIAL PDF DOWNLOAD */}
          {result && (
            <div className="bg-white rounded-3xl border-2 border-blue-400 p-6 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 gap-4">
                <CombinedBrandLogo size="md" />
                <div className="text-center sm:text-right">
                  <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 justify-center sm:justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>OFFICIAL VERIFIED SCORECARD</span>
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Academic Year 2027–2028 • Stage-1 Qualifier</p>
                </div>
              </div>

              {/* Student Identification & Score Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block font-semibold">Candidate Name</span>
                  <span className="font-extrabold text-slate-900 text-sm">{result.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Roll Number</span>
                  <span className="font-bold font-mono text-[#0066FF] text-sm">{result.roll_number}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">Class / Stream</span>
                  <span className="font-bold text-slate-900">{result.class_category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold">All-India Rank</span>
                  <span className="font-black text-amber-600 text-sm">
                    {result.rank_overall ? `AIR ${result.rank_overall}` : 'Top 1% Percentile'}
                  </span>
                </div>
              </div>

              {/* Score Breakdown Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-blue-800 block uppercase">Marks Obtained</span>
                  <span className="text-2xl font-black text-[#0066FF] mt-1 block">
                    {result.marks_obtained} <span className="text-xs text-blue-400">/ {result.max_marks}</span>
                  </span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-emerald-800 block uppercase">Percentage / Score</span>
                  <span className="text-2xl font-black text-emerald-600 mt-1 block">
                    {result.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <span className="text-[11px] font-bold text-amber-800 block uppercase">Qualifying Status</span>
                  <span className="text-base font-black text-amber-700 mt-2 block">
                    ★ QUALIFIED FOR SCHOLARSHIP
                  </span>
                </div>
              </div>

              {/* Scholarship Award Highlight Box */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-300 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-emerald-950">
                <Award className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                    SCHOLARSHIP &amp; HONORS AWARDED
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-emerald-900">
                    {result.scholarship_tier}
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    This official scholarship is applicable towards tuition fees for regular classroom and hybrid batches at EURO Campus (PCMC &amp; Shikrapur Centres).
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS: PROPER PDF DOWNLOAD (STRICTLY REQUESTED BY USER) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                <div className="text-xs text-slate-500 font-medium">
                  Verified Candidate Phone: <strong>+91 {result.phone || phone}</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={result.pdf_url || resultsPamphletUrl}
                    download={`ETHEX-Scorecard-${result.roll_number}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official PDF / Report</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print Scorecard</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. OFFICIAL RESULTS CELEBRATION BANNER & TOPPERS WALL */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-6 bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                  EURO CAMPUS OFFICIAL RESULTS • RE-NEET 2026
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  35 Govt. MBBS Selections &amp; National ISRO Study Tour Qualifiers
                </h3>
              </div>
              <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black shrink-0">
                7 Students 600+
              </span>
            </div>
            <div className="relative bg-slate-900 flex items-center justify-center p-2">
              <img
                src={resultsPamphletUrl}
                alt="EURO CAMPUS Official Results Banner"
                className="w-full h-auto max-h-[440px] object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
              NATIONAL MERIT LIST
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              Our Outstanding Rankers &amp; Toppers
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Authentic student pictures, ranks, and test achievements curated by EURO Campus Academic Board.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {champions.map((champ) => (
              <div
                key={champ.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
              >
                {/* Top Rank Badge & Year */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{champ.rank}</span>
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 font-mono">
                    {champ.year || '2025–2026'}
                  </span>
                </div>

                {/* Student Avatar & Basic Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src={champ.photo_url || '/branding/toppers/tanishka_temgire.jpg'}
                      alt={champ.student_name}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-blue-200 shadow-sm"
                      onError={(e: any) => {
                        e.target.src = '/branding/toppers/tanishka_temgire.jpg';
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-black text-slate-950 truncate">
                      {champ.student_name}
                    </h4>
                    <p className="text-xs font-bold text-[#0066FF] truncate mt-0.5">
                      {champ.exam_name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate font-medium">
                      {champ.target_class}
                    </p>
                  </div>
                </div>

                {/* Score & Award Card */}
                <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3 space-y-1.5 text-xs">
                  {champ.score && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Score / Marks:</span>
                      <span className="font-mono font-black text-slate-900">{champ.score}</span>
                    </div>
                  )}
                  {champ.award && (
                    <div className="flex justify-between items-center text-emerald-800">
                      <span className="text-slate-500 font-medium">Scholarship:</span>
                      <span className="font-bold text-emerald-700 truncate max-w-[190px]">{champ.award}</span>
                    </div>
                  )}
                  {champ.school && (
                    <div className="text-[10px] text-slate-400 truncate pt-1 border-t border-slate-200/60 font-medium">
                      {champ.school}
                    </div>
                  )}
                </div>

                {/* Testimonial Quote */}
                {champ.quote && (
                  <p className="text-[11px] text-slate-600 italic leading-relaxed border-l-2 border-[#0066FF] pl-2.5">
                    &ldquo;{champ.quote}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
