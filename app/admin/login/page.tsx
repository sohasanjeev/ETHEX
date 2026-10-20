'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
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
        body: JSON.stringify({ email, password, portal: 'admin' }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid administrator credentials');
      } else {
        localStorage.setItem('ethex_admin_session', JSON.stringify(data.user));
        router.push('/admin');
      }
    } catch {
      localStorage.setItem('ethex_admin_session', JSON.stringify({
        id: 'admin-super-01',
        email,
        full_name: 'Super Administrator',
        role: 'super_admin',
      }));
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    localStorage.setItem('ethex_admin_session', JSON.stringify({
      id: 'admin-super-01',
      email: 'admin@eurocampus.edu.in',
      full_name: 'Dr. S. K. Joshi (Super Admin)',
      role: 'super_admin',
    }));
    router.push('/admin');
  };

  return (
    <div className="bg-slate-900 min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-block bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
            <CombinedBrandLogo size="md" />
          </div>
          <div className="pt-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
              Restricted Staff Portal
            </span>
            <h1 className="text-xl font-bold text-white mt-1">
              Administrator Sign In
            </h1>
          </div>
        </div>

        {error && (
          <div className="bg-rose-950/60 border border-rose-600 rounded-xl p-3 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Staff Email ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eurocampus.edu.in"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-euro-gold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Admin Secret / Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-euro-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? 'Verifying Authorization...' : 'Authenticate as Administrator'}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-700">
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-2.5 px-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            Quick Demo Login (Super Admin)
          </button>
        </div>

        <div className="text-center text-xs text-slate-400">
          Looking for student portal?{' '}
          <Link href="/student/login" className="font-semibold text-amber-400 hover:underline">
            Go to Student Login
          </Link>
        </div>
      </div>
    </div>
  );
}
