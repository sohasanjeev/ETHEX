'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <CombinedBrandLogo size="md" />
          <h1 className="text-xl font-bold text-euro-navy pt-2">Password Recovery</h1>
          <p className="text-xs text-slate-500">
            Enter your registered email address and we will send you secure password reset instructions.
          </p>
        </div>

        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-950 text-sm">Reset Link Dispatched</h4>
            <p className="text-xs text-emerald-800">
              We have dispatched recovery instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
            <Link
              href="/student/login"
              className="inline-block text-xs font-bold text-emerald-900 underline mt-2"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Registered Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            href="/student/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-euro-navy font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
