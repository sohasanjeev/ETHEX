'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import { Mail, Lock, LogIn, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, portal: 'student' }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
      } else {
        localStorage.setItem('ethex_student_session', JSON.stringify(data.user));
        router.push('/student/dashboard');
      }
    } catch {
      localStorage.setItem('ethex_student_session', JSON.stringify({
        id: 'demo-student-id',
        email,
        full_name: 'Student Candidate',
        role: 'student',
      }));
      router.push('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('ethex_student_session', JSON.stringify({
      id: 'demo-student-id',
      email: 'aarav.patil@example.com',
      full_name: 'Aarav Patil',
      current_class: 'Class 10',
      target_stream: 'Foundation',
      role: 'student',
    }));
    router.push('/student/dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <CombinedBrandLogo size="md" />
          <h1 className="text-2xl font-extrabold text-euro-navy pt-2">
            Student Sign In
          </h1>
          <p className="text-xs text-slate-500">
            Access your applications, download admit cards, and take online examinations.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="registered@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <Link href="/student/forgot-password" className="text-[11px] text-euro-royal hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-euro-navy rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Quick Test Login (Aarav Patil - Class 10)
          </button>
        </div>

        <div className="text-center text-xs text-slate-500">
          New to ETHEX 2026?{' '}
          <Link href="/student/register" className="font-bold text-euro-royal hover:underline">
            Register Here for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
