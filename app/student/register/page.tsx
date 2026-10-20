'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import { User, Mail, Phone, Lock, School, MapPin, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    currentClass: 'Class 10',
    targetStream: 'Foundation',
    schoolName: '',
    city: 'Pune',
    state: 'Maharashtra',
    consentAgreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from query params if redirected from Quick Lead widget on homepage
  useEffect(() => {
    const qName = searchParams.get('name');
    const qMobile = searchParams.get('mobile');
    const qClass = searchParams.get('class');

    if (qName || qMobile || qClass) {
      setFormData((prev) => ({
        ...prev,
        fullName: qName || prev.fullName,
        phone: qMobile || prev.phone,
        currentClass: qClass ? (qClass.startsWith('Class') ? qClass : `Class ${qClass}`) : prev.currentClass,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.consentAgreed) {
      setError('Please agree to the examination terms and parental consent');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        localStorage.setItem('ethex_student_session', JSON.stringify({
          id: data.studentId || 'demo-student-id',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          currentClass: formData.currentClass,
          stream: formData.targetStream,
        }));
        router.push('/student/dashboard');
      }
    } catch {
      localStorage.setItem('ethex_student_session', JSON.stringify({
        id: 'demo-student-id',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        currentClass: formData.currentClass,
        stream: formData.targetStream,
      }));
      router.push('/student/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <CombinedBrandLogo size="md" />
          <h1 className="text-2xl font-extrabold text-euro-navy pt-2">
            Create Student Account
          </h1>
          <p className="text-xs text-slate-500">
            Register for ETHEX 2026 to apply for examinations, download admit cards, and claim scholarships.
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
            <label className="text-xs font-semibold text-slate-700">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Student Full Name"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Current Class *</label>
              <select
                value={formData.currentClass}
                onChange={(e) => setFormData({ ...formData, currentClass: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
              >
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="JEE Aspirant">JEE Aspirant (12+)</option>
                <option value="NEET Aspirant">NEET Aspirant (12+)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Target Stream *</label>
              <select
                value={formData.targetStream}
                onChange={(e) => setFormData({ ...formData, targetStream: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
              >
                <option value="Foundation">Foundation & Olympiads</option>
                <option value="JEE">Engineering (IIT-JEE Main + Adv)</option>
                <option value="NEET">Medical (NEET-UG)</option>
                <option value="MHT-CET">Maharashtra CET</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Current School Name</label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                placeholder="e.g. Euro School / City Public School"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Confirm Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                required
                checked={formData.consentAgreed}
                onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-euro-royal focus:ring-euro-royal"
              />
              <span>
                I agree to the <Link href="/terms" className="text-euro-royal underline">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-euro-royal underline">Privacy Policy</Link>, and affirm parental/guardian knowledge of this application.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-euro-royal to-blue-700 hover:from-blue-700 hover:to-euro-navy text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Free Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/student/login" className="font-bold text-euro-royal hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function StudentRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-semibold text-slate-500">Loading registration form...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
