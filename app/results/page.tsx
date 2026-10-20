'use client';

import React, { useState } from 'react';
import { Search, Award, CheckCircle2, AlertCircle, Printer, Rocket, Sparkles, Building } from 'lucide-react';
import { Result } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function ResultsPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setError(data.error || 'No published result found for the provided Roll / Application Number. Please check and try again.');
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
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Official Merit Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
            ETHEX 2026 Results & Scorecard
          </h1>
          <p className="text-slate-600 text-sm">
            Enter your Roll Number or Application Number to view your marks, percentile, rank, and scholarship qualification status.
          </p>
        </div>

        {/* Lookup Search Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Roll No (e.g. ETHEX26-24101) or App No"
                className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-euro-royal font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Searching...' : 'View Scorecard'}
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            Tip: You can test with sample published roll number: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-euro-navy">ETHEX26-24101</code>
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Official Scorecard Document */}
        {result && (
          <div className="bg-white rounded-2xl border-2 border-euro-navy/20 p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden animate-in fade-in duration-300">
            {/* Header Unit */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200 pb-6 gap-4">
              <CombinedBrandLogo size="md" />
              <div className="text-center sm:text-right">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  OFFICIAL RESULT
                </span>
                <p className="text-[11px] text-slate-500 mt-1">Academic Year 2027–2028</p>
              </div>
            </div>

            {/* Candidate Credentials */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Candidate Name</span>
                <span className="font-bold text-euro-navy text-sm">{result.student_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Roll Number</span>
                <span className="font-bold font-mono text-slate-900 text-sm">{result.roll_number}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Grade / Category</span>
                <span className="font-bold text-slate-900">{result.class_category} ({result.stream})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Published On</span>
                <span className="font-bold text-slate-900">
                  {result.published_at ? new Date(result.published_at).toLocaleDateString('en-IN') : 'Recent'}
                </span>
              </div>
            </div>

            {/* Score & Ranking Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-blue-900">Marks Obtained</span>
                <div className="text-3xl font-black text-euro-navy mt-1">
                  {result.marks_obtained} <span className="text-sm font-semibold text-slate-500">/ {result.max_marks}</span>
                </div>
                <span className="text-xs text-blue-700 font-semibold mt-1 inline-block">
                  {result.percentage}% Aggregate
                </span>
              </div>

              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-amber-900">All-India Merit Rank</span>
                <div className="text-3xl font-black text-amber-600 mt-1">
                  #{result.rank_overall || '—'}
                </div>
                <span className="text-xs text-amber-700 font-semibold mt-1 inline-block">
                  Category Rank: #{result.rank_category || '—'}
                </span>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-900">Qualifying Status</span>
                <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-6 h-6" /> QUALIFIED
                </div>
                <span className="text-xs text-emerald-700 font-semibold mt-1 inline-block">
                  Eligible for Scholarship
                </span>
              </div>
            </div>

            {/* Special Scholarship Banner */}
            {result.scholarship_tier && (
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border-2 border-amber-400 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-sm sm:text-base">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span>Scholarship Award Qualification: {result.scholarship_tier}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
                  {result.isro_tour_eligible && (
                    <div className="flex items-center gap-2 font-bold text-amber-900 bg-amber-100/70 px-3 py-2 rounded-lg border border-amber-300">
                      <Rocket className="w-4 h-4 text-amber-600" />
                      <span>Qualified for Sponsored ISRO Educational Tour</span>
                    </div>
                  )}
                  {result.scholarship_percentage ? (
                    <div className="flex items-center gap-2 font-bold text-euro-navy bg-white px-3 py-2 rounded-lg border border-slate-200">
                      <Award className="w-4 h-4 text-euro-royal" />
                      <span>{result.scholarship_percentage}% Scholarship in EURO Campus Admission</span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {/* Print button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
              <span className="text-[11px] text-slate-500">
                Official document issued by EURO Campus Academic Evaluation Board.
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" /> Print Scorecard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
