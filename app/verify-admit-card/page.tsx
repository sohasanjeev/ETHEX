'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

function VerifyAdmitCardContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [verification, setVerification] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCode) {
      verifyCode(initialCode);
    }
  }, [initialCode]);

  const verifyCode = async (c: string) => {
    if (!c.trim()) return;
    setLoading(true);
    setError(null);
    setVerification(null);

    try {
      const res = await fetch(`/api/admit-card/verify?code=${encodeURIComponent(c.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.verified) {
        setError(data.error || 'The entered code does not correspond to an authentic ETHEX 2026 Admit Card.');
      } else {
        setVerification(data);
      }
    } catch {
      setError('Verification service unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(code);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Admit Card Authenticator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
          Admit Card Verification Portal
        </h1>
        <p className="text-slate-600 text-sm">
          Scan the QR code on your printed admit card or enter the unique verification code / Roll Number below to authenticate.
        </p>
      </div>

      {/* Input box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. ETHEX-VERIFY-24101-SEC99 or ETHEX26-24101"
            className="flex-1 px-4 py-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-euro-royal font-mono uppercase"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? 'Verifying...' : 'Verify Authenticity'}
          </button>
        </form>

        <p className="text-[11px] text-slate-500">
          Demo sample code: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-euro-navy">ETHEX-VERIFY-24101-SEC99</code>
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Authenticated Admit Card Certificate */}
      {verification && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 sm:p-8 shadow-lg space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-950 text-base sm:text-lg">
                  Authentic Verified Admit Card
                </h3>
                <p className="text-xs text-slate-500">EURO TALENT HUNT EXAM (ETHEX 2026)</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
              OFFICIALLY ISSUED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">Examination</span>
              <span className="font-bold text-euro-navy text-sm">{verification.examTitle}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Candidate Roll Number</span>
              <span className="font-bold font-mono text-slate-900 text-sm">{verification.rollNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Application Number</span>
              <span className="font-bold font-mono text-slate-900">{verification.applicationNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Examination Mode</span>
              <span className="font-bold uppercase text-euro-royal">{verification.selectedMode}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block">Authorized Centre / Venue</span>
              <span className="font-bold text-slate-900">{verification.centreName}</span>
              {verification.centreAddress && (
                <span className="block text-slate-500 mt-0.5">{verification.centreAddress}</span>
              )}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center italic">
            Verification confirmed by EURO Campus Academic Administration at {new Date(verification.timestamp).toLocaleString('en-IN')}.
          </p>
        </div>
      )}
    </div>
  );
}

export default function VerifyAdmitCardPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <Suspense fallback={<div className="text-center text-sm py-12">Loading verification portal...</div>}>
        <VerifyAdmitCardContent />
      </Suspense>
    </div>
  );
}
