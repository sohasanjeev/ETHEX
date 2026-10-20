'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Award,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  Compass,
  Rocket,
  Percent,
  Sparkles,
  Phone,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Building,
  GraduationCap,
  BookOpen,
  Download,
  HelpCircle,
  MapPin,
  ExternalLink,
  Target,
  BarChart3,
  Trophy
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [posterModalOpen, setPosterModalOpen] = useState(false);
  const [samplePaperModalClass, setSamplePaperModalClass] = useState<string | null>(null);

  // Quick Registration Lead State (Tallentex Hero Widget)
  const [quickName, setQuickName] = useState('');
  const [quickMobile, setQuickMobile] = useState('');
  const [quickClass, setQuickClass] = useState('10');
  const [quickMode, setQuickMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.warn('Error fetching settings:', err));

    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => {
        if (data.exams) setExams(data.exams);
      })
      .catch(() => {});
  }, []);

  const handleQuickRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      name: quickName,
      mobile: quickMobile,
      class: quickClass,
      mode: quickMode,
    }).toString();
    router.push(`/student/register?${query}`);
  };

  const syllabusData = [
    {
      grade: 'Class 5',
      tag: 'Middle School',
      subjects: 'Maths, General Science, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Foundational concepts in arithmetic, nature study, observation tests, and logical patterns.',
    },
    {
      grade: 'Class 6',
      tag: 'Middle School',
      subjects: 'Physics, Chemistry, Biology, Maths, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'NCERT based fundamentals of numbers, physical matter, living world, and visual reasoning.',
    },
    {
      grade: 'Class 7',
      tag: 'Middle School',
      subjects: 'Physics, Chemistry, Biology, Maths, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Heat, motion, acids & bases, fractions, algebraic expressions, and logical puzzles.',
    },
    {
      grade: 'Class 8',
      tag: 'Secondary Foundation',
      subjects: 'Physics, Chemistry, Biology, Maths, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Force, sound, synthetic fibres, rational numbers, linear equations, and verbal logic.',
    },
    {
      grade: 'Class 9',
      tag: 'Pre-JEE / Pre-NEET',
      subjects: 'Physics, Chemistry, Biology, Maths, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Laws of motion, gravitation, atoms & molecules, polynomials, coordinate geometry, and aptitude.',
    },
    {
      grade: 'Class 10',
      tag: 'Pre-JEE / Pre-NEET',
      subjects: 'Physics, Chemistry, Biology, Maths, Mental Ability',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Electricity, light, chemical reactions, periodic trends, trigonometry, quadratic equations, and reasoning.',
    },
    {
      grade: 'Class 11 (JEE)',
      tag: 'Engineering Track',
      subjects: 'Physics, Chemistry, Mathematics',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Mechanics, stoichiometry, thermodynamics, calculus foundations, coordinate geometry, and sequences.',
    },
    {
      grade: 'Class 11 (NEET)',
      tag: 'Medical Track',
      subjects: 'Physics, Chemistry, Biology (Botany & Zoology)',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Kinematics, atomic structure, chemical bonding, plant & animal diversity, human physiology.',
    },
    {
      grade: 'Class 12 / Aspirants',
      tag: 'JEE & NEET Target',
      subjects: 'Full Senior Secondary Syllabus',
      pattern: '60 Questions • 240 Marks • 120 Mins',
      desc: 'Comprehensive syllabus for IIT-JEE Main/Advanced and NEET UG with national percentile benchmarking.',
    },
  ];

  const faqs = [
    {
      q: 'How do I register for ETHEX 2026?',
      a: 'You can register in minutes right on this page or through the Student Registration portal. Select your target class, fill in candidate details, and choose between the Online computer-based test or an Offline test at our PCMC or Shikrapur campus centres.',
    },
    {
      q: 'What is the examination pattern and duration?',
      a: 'ETHEX 2026 is a 2-hour (120 minutes) objective test comprising 60 multiple-choice questions (MCQs) for 240 total marks. Each correct answer awards +4 marks, while an incorrect answer carries a -1 mark penalty.',
    },
    {
      q: 'What is the Competitive Success Index (CSI)?',
      a: 'The Competitive Success Index (CSI) is an advanced analytical assessment generated for each ETHEX participant. It benchmarks your conceptual mastery, subject-wise speed, and problem-solving aptitude against competitive standards for IIT-JEE, NEET, and Olympiads.',
    },
    {
      q: 'How are candidates selected for the ISRO Educational Tour?',
      a: 'The top-ranking students across eligible categories who demonstrate exceptional scientific and analytical prowess will be invited for a fully sponsored educational science tour to ISRO space research facilities, subject to institutional criteria and parental consent.',
    },
    {
      q: 'Where can I download my Admit Card?',
      a: 'Once your registration is verified, your official Admit Card with candidate photo, roll number, QR code verification, and assigned test room/centre will be instantly downloadable from your Student Dashboard.',
    },
    {
      q: 'Can I choose between Online and Offline exam modes?',
      a: 'Yes! ETHEX offers both an online browser-based testing engine with autosave and question navigation, as well as offline pen-and-paper OMR testing at EURO Campus PCMC and Shikrapur centres.',
    },
    {
      q: 'How can I contact the examination desk for assistance?',
      a: 'You can reach the EURO Campus PCMC Desk at 9112223354 / 9112233995, the Shikrapur Desk at 9607035688, or email admissions@eurocampus.edu.in.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (TALLENTEX BENCHMARK STYLE) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-euro-navy via-[#0B1736] to-euro-deep text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top National Announcement Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-blue-950/70 border border-blue-400/30 rounded-xl px-4 py-2 text-xs backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-amber-400">EURO TALENT HUNT EXAM (ETHEX 2026)</span>
              <span className="hidden sm:inline text-slate-300">• Academic Year {settings?.academic_year || '2027–2028'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300">Exam Status:</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                {settings?.exam_date_display || 'To Be Announced Soon'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Copy & Rewards Bar */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="space-y-3">
                <span className="inline-block text-xs uppercase font-extrabold tracking-widest text-euro-gold bg-amber-500/10 px-3 py-1 rounded-md border border-amber-400/30">
                  Maharashtra’s Premier Talent Search Exam
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Discover Your Potential.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                    Earn Your Opportunity.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Participate in <strong>ETHEX 2026</strong>, the flagship talent hunt examination by <strong>EURO Campus</strong>. 
                  Designed for students of <strong>Classes 5 to 12 and JEE/NEET aspirants</strong> to assess aptitude, earn up to 
                  <strong> 90% admission scholarships</strong>, compete for <strong>₹10 Lacs in cash rewards</strong>, and qualify for 
                  an <strong>ISRO Educational Science Tour</strong>.
                </p>
              </div>

              {/* Exclusive ISRO Educational Tour Pill */}
              <div className="bg-gradient-to-r from-amber-500/20 via-blue-900/40 to-amber-500/10 border-l-4 border-amber-400 p-3.5 rounded-r-xl backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-400 text-euro-dark rounded-lg flex-shrink-0">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-300 text-sm sm:text-base tracking-wide uppercase">
                      {settings?.isro_tour_tagline || 'Top Performers Can Earn an ISRO Educational Tour'}
                    </h3>
                    <p className="text-xs text-slate-200">
                      All-expense sponsored science exposure trip for high achievers to visit India’s premier space agency.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 text-center shadow-md">
                  <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase">Scholarships</p>
                  <p className="text-lg sm:text-2xl font-black text-white mt-0.5">
                    {settings?.admission_scholarship_pool || '₹2.5 CRORES'}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">Total Pool</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 text-center shadow-md">
                  <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase">Cash Prizes</p>
                  <p className="text-lg sm:text-2xl font-black text-white mt-0.5">
                    {settings?.cash_prize_pool || '₹10 Lacs'}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">Stage-2 Rewards</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 text-center shadow-md">
                  <p className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase">Fee Waivers</p>
                  <p className="text-lg sm:text-2xl font-black text-white mt-0.5">
                    {settings?.max_scholarship_percentage || 'Upto 90%'}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400">In EURO Campus</p>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-300 pt-2">
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> About EURO Campus
                </Link>
                <Link href="/centres" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> PCMC & Shikrapur Centres
                </Link>
                <Link href="/results" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" /> Safe Result Portal
                </Link>
              </div>
            </div>

            {/* Right Column: Tallentex-Style Fast Registration Lead Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-800 border-2 border-amber-400/40 relative">
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      Step 1 of 3
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-euro-navy mt-1">
                      Register for ETHEX 2026
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Free Entry
                    </span>
                  </div>
                </div>

                <form onSubmit={handleQuickRegister} className="space-y-4 mt-4">
                  {/* Student Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Student Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal text-sm bg-slate-50"
                    />
                  </div>

                  {/* WhatsApp / Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        value={quickMobile}
                        onChange={(e) => setQuickMobile(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal text-sm bg-slate-50"
                      />
                    </div>
                  </div>

                  {/* Target Class Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Current Class / Target <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={quickClass}
                      onChange={(e) => setQuickClass(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-euro-royal text-sm bg-slate-50 font-medium"
                    >
                      <option value="5">Class 5 (Middle School Foundation)</option>
                      <option value="6">Class 6 (Middle School Foundation)</option>
                      <option value="7">Class 7 (Middle School Foundation)</option>
                      <option value="8">Class 8 (Pre-Foundation)</option>
                      <option value="9">Class 9 (Pre-JEE / Pre-NEET)</option>
                      <option value="10">Class 10 (Pre-JEE / Pre-NEET)</option>
                      <option value="11-JEE">Class 11 — Engineering (JEE Main+Adv)</option>
                      <option value="11-NEET">Class 11 — Medical (NEET UG)</option>
                      <option value="12-JEE">Class 12 — Engineering (JEE Target)</option>
                      <option value="12-NEET">Class 12 — Medical (NEET Target)</option>
                    </select>
                  </div>

                  {/* Preferred Mode Selection (Online vs Offline) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Examination Mode <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setQuickMode('ONLINE')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all text-center ${
                          quickMode === 'ONLINE'
                            ? 'bg-euro-navy text-white border-euro-navy shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Online Test (At Home)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickMode('OFFLINE')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all text-center ${
                          quickMode === 'OFFLINE'
                            ? 'bg-euro-navy text-white border-euro-navy shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        Offline Centre (Campus)
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-euro-dark font-black text-sm rounded-xl shadow-lg transition-transform transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    Proceed to Registration
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Already registered?</span>
                  <Link href="/student/login" className="font-bold text-euro-royal hover:underline">
                    Student Login →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF ETHEX (TALLENTEX REWARDS & RECOGNITION SHOWCASE) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Why Appear for ETHEX 2026?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">
              More Than an Exam. A Gateway to Academic Prominence.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Modelled on premier national scholarship benchmarks to give students unmatched diagnostic clarity, rewards, and coaching access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Rankings */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-euro-royal flex items-center justify-center">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">State & Zonal Rankings</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive your verified All-India and Maharashtra Zonal Rank along with an in-depth subject-wise percentile scorecard.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-euro-royal">
                Official Scorecard & Analytics
              </div>
            </div>

            {/* Pillar 2: CSI */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">Competitive Success Index (CSI)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A breakthrough diagnostic index that evaluates conceptual strengths and gauges readiness for JEE, NEET, and Olympiads.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-amber-700">
                AI & Diagnostic Insights
              </div>
            </div>

            {/* Pillar 3: ISRO Tour */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-purple-400 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">ISRO Educational Tour</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Top performers in ETHEX 2026 can earn an exclusive, all-expense sponsored study visit to ISRO space science establishments.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-purple-700">
                Exclusive EURO Incentive
              </div>
            </div>

            {/* Pillar 4: Scholarships & Cash Prizes */}
            <div className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">Scholarships & Cash Rewards</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Up to 90% coaching fee waivers across all EURO Campus classroom batches, plus ₹10 Lacs in Stage-2 cash prizes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-bold text-emerald-700">
                ₹2.5 Cr. Overall Pool
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLASS-WISE SYLLABUS & SAMPLE PAPERS (EXACT TALLENTEX FEATURE) */}
      <section className="py-16 bg-slate-50" id="syllabus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
                Official Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-euro-navy mt-1">
                Syllabus & Sample Papers
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore the class-wise question breakdown, syllabus topics, and download practice papers.
              </p>
            </div>
            <Link
              href="/exam-pattern"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-colors"
            >
              Detailed Exam Pattern <ChevronRight className="w-3.5 h-3.5 text-euro-royal" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {syllabusData.map((item) => (
              <div
                key={item.grade}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-euro-royal hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <h3 className="font-black text-lg text-euro-navy">{item.grade}</h3>
                    <span className="text-[10px] font-bold text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{item.subjects}</p>
                  <p className="text-[11px] font-semibold text-amber-600 mt-1">{item.pattern}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSamplePaperModalClass(item.grade)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-euro-royal text-xs font-bold rounded-lg border border-blue-200 transition-colors"
                  >
                    <Download className="w-3 h-3" /> View & Download
                  </button>
                  <Link
                    href={`/student/register?class=${encodeURIComponent(item.grade)}`}
                    className="text-xs font-bold text-slate-700 hover:text-euro-navy flex items-center gap-1"
                  >
                    Enroll <ArrowRight className="w-3 h-3 text-euro-gold" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXAM PATTERN & MARKING SCHEME STRIP */}
      <section className="py-12 bg-euro-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/80 border border-blue-400/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-euro-gold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-600/40">
                  Standardized Test Architecture
                </span>
                <h2 className="text-2xl font-black text-white">
                  ETHEX 2026 Examination Blueprint
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Structured to measure conceptual aptitude, logical acumen, and accuracy under timed conditions across all grades.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400">Total Questions</p>
                  <p className="text-2xl font-black text-amber-400 mt-1">60 MCQs</p>
                  <p className="text-[10px] text-slate-500">Single Option Correct</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400">Total Marks</p>
                  <p className="text-2xl font-black text-white mt-1">240 Marks</p>
                  <p className="text-[10px] text-slate-500">Standard Grading</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400">Marking Scheme</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">+4 / -1</p>
                  <p className="text-[10px] text-slate-500">-1 for incorrect</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="text-2xl font-black text-blue-300 mt-1">120 Mins</p>
                  <p className="text-[10px] text-slate-500">2 Full Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED OFFLINE CENTRES & CONTACT CHANNELS */}
      <section className="py-16 bg-white" id="centres">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Authorized Test Centres
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">
              Appear at EURO Campus Flagship Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              For candidates choosing offline mode, examinations are administered under strict invigilation at our state-of-the-art academic complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* PCMC Centre */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-euro-royal transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-euro-navy text-white uppercase">
                    Centre Code: EC-PCMC
                  </span>
                  <Building className="w-5 h-5 text-euro-gold" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">EURO Campus — PCMC Centre</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Empire Estate</strong>, 4th Floor, Above Vijay Sales, Old Mumbai-Pune Highway, Pimpri-Chinchwad, Pune — 411019
                  </span>
                </p>
                <div className="text-xs space-y-1 text-slate-600 pt-2 border-t border-slate-200">
                  <p><strong>Campus Facilities:</strong> Air-conditioned test halls, verified biometric check-in, parking & parent lounge.</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9112223354" className="font-extrabold text-euro-royal hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9112223354 / 9112233995
                </a>
              </div>
            </div>

            {/* Shikrapur Centre */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-euro-royal transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-euro-navy text-white uppercase">
                    Centre Code: EC-SHIK
                  </span>
                  <Building className="w-5 h-5 text-euro-gold" />
                </div>
                <h3 className="text-lg font-bold text-euro-navy">EURO Campus — Shikrapur Centre</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Kalamkar Vasti</strong>, Near Gunjian Theatre, Hivare Road, Pune-Nagar Highway, Shikrapur, Pune — 412208
                  </span>
                </p>
                <div className="text-xs space-y-1 text-slate-600 pt-2 border-t border-slate-200">
                  <p><strong>Campus Facilities:</strong> Integrated senior secondary campus, examination auditoriums, student bus transit support.</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9607035688" className="font-extrabold text-euro-royal hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9607035688
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (TALLENTEX ACCORDION) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Everything you need to know about ETHEX 2026 registration, test rules, and scholarship distribution.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-euro-navy hover:text-euro-royal transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-euro-royal' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Have a question not listed here? Visit our <Link href="/faqs" className="text-euro-royal font-bold hover:underline">Full FAQs Page</Link> or contact our admissions desk.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="py-14 bg-gradient-to-r from-euro-navy to-euro-deep text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Ready to Take Your First Step Towards Academic Excellence?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            Join thousands of ambitious students across Maharashtra appearing for ETHEX 2026. Free registrations are currently open.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/student/register"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-euro-dark font-black text-sm rounded-xl shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2"
            >
              Register for ETHEX 2026 Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/scholarships"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Explore Scholarship Details
            </Link>
          </div>
        </div>
      </section>

      {/* SYLLABUS & SAMPLE PAPER PREVIEW MODAL */}
      {samplePaperModalClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 text-slate-800 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-euro-royal bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                  Curriculum Guide
                </span>
                <h3 className="text-lg font-black text-euro-navy mt-1">
                  {samplePaperModalClass} — Syllabus & Sample Paper
                </h3>
              </div>
              <button
                onClick={() => setSamplePaperModalClass(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="font-bold text-euro-navy">Exam Specification:</p>
                <p className="text-slate-600 mt-1">60 MCQs • 240 Marks • Duration: 120 Minutes • Medium: English</p>
                <p className="text-slate-600">Marking: +4 for correct answer, -1 for wrong answer, 0 for unattempted.</p>
              </div>

              <div>
                <p className="font-bold text-euro-navy mb-1">Prescribed Syllabus Breakdown:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Physics & Chemistry: Conceptual fundamentals based on NCERT guidelines.</li>
                  <li>Mathematics: Problem-solving speed, numerical logic, and arithmetic acumen.</li>
                  <li>Mental Ability & Aptitude: Analytical pattern recognition, series, and logical reasoning.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  alert(`Sample paper for ${samplePaperModalClass} has been initiated for download.`);
                  setSamplePaperModalClass(null);
                }}
                className="px-4 py-2 bg-euro-navy hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Practice PDF
              </button>
              <Link
                href={`/student/register?class=${encodeURIComponent(samplePaperModalClass)}`}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-euro-dark rounded-xl text-xs font-black shadow-sm"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
