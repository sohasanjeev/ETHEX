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
} from 'lucide-react';
import { Result, ResultChampion } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import Link from 'next/link';

export default function ResultsPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dynamic Champions & Results Wall (Customized by Admin)
  const [champions, setChampions] = useState<ResultChampion[]>([]);
  const [resultsPamphletUrl, setResultPamphletUrl] = useState<string>('/posters/ethex_isro_tour_nov29.png');
  const [resultsHeadline, setResultHeadline] = useState<string>(
    'ETHEX Champions — Previous Year Results & Hall of Fame'
  );

  useEffect(() => {
    fetchChampions();
  }, []);

  const fetchChampions = async () => {
    try {
      const res = await fetch('/api/results/champions');
      const data = await res.json();
      if (data?.champions) setChampions(data.champions);
      if (data?.results_pamphlet_url) setResultPamphletUrl(data.results_pamphlet_url);
      if (data?.results_headline) setResultHeadline(data.results_headline);
    } catch {
      // Fallback
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/results/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.result) {
        setError(
          data.error ||
            'No published result found for the provided Roll / Application Number. Please check and try again.'
        );
      } else {
        setResult(data.result);
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
            OFFICIAL RESULTS & MERIT PORTAL
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            ETHEX 2026 Results & Hall of Fame
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium max-w-xl mx-auto">
            Celebrating our top rankers, scholarship awardees, and ISRO educational visit winners across Maharashtra.
          </p>
        </div>

        {/* 1. ADMIN-CUSTOMIZED RESULT CELEBRATION PAMPHLET / BANNER */}
        {resultsPamphletUrl && (
          <div className="bg-white rounded-3xl border border-blue-200/80 shadow-md p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6 overflow-hidden">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-slate-200 shadow-inner max-h-[380px] bg-slate-900 flex items-center justify-center">
              <img
                src={resultsPamphletUrl}
                alt="ETHEX Results Celebration Poster"
                className="w-full h-auto max-h-[380px] object-contain"
                onError={(e: any) => {
                  e.target.src = '/posters/ethex_isro_tour_nov29.png';
                }}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>OFFICIAL RESULT PUBLICATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
                {resultsHeadline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                EURO Campus salutes the extraordinary academic talent displayed by our candidates. Over <strong>₹2.5 Crores in scholarships</strong> and sponsored <strong>ISRO Educational Tours</strong> awarded to top performers!
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#individual-scorecard"
                  className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Individual Scorecard</span>
                </a>
                <Link
                  href="/student/register"
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  Register for Next Exam
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. ALLEN TALLENTEX-STYLE CHAMPIONS WALL / TOPPERS SHOWCASE */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200">
              NATIONAL MERIT LIST
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
              Our Outstanding Rankers & Toppers
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Student pictures, ranks, and test achievements curated by EURO Campus Academic Board.
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
                      src={champ.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face'}
                      alt={champ.student_name}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-blue-200 shadow-sm"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face';
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
                      <span className="text-slate-500 font-medium">Score / Percentile:</span>
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

        {/* 3. INDIVIDUAL SCORECARD LOOKUP FORM */}
        <div id="individual-scorecard" className="pt-6 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-950">
              Candidate Scorecard Lookup
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Enter your Roll Number or Application Number to download your official mark sheet.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 max-w-3xl mx-auto">
            <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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

            <p className="text-[11px] text-slate-500 text-center sm:text-left">
              Tip: You can test with sample published roll number:{' '}
              <button
                type="button"
                onClick={() => setQuery('ETHEX26-24101')}
                className="bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold text-[#0066FF] transition-all"
              >
                ETHEX26-24101
              </button>
            </p>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Official Scorecard Document Output */}
          {result && (
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 gap-4">
                <CombinedBrandLogo size="md" />
                <div className="text-center sm:text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                    OFFICIAL SCORECARD
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Academic Year 2027–2028</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block">Candidate Name</span>
                  <span className="font-bold text-slate-900 text-sm">{result.student_name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Roll Number</span>
                  <span className="font-bold font-mono text-[#0066FF] text-sm">{result.roll_number}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Grade & Category</span>
                  <span className="font-bold text-slate-900">{result.class_category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">All-India Rank</span>
                  <span className="font-black text-amber-600 text-sm">AIR {result.rank_overall || 'Top 1%'}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900">
                <Award className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-sm block">{result.scholarship_tier}</span>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Eligible for fee waiver on EURO Campus JEE / NEET / Foundation regular classroom batches.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
