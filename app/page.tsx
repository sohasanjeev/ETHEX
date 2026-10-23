'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle,
  Users,
  Rocket,
  ChevronDown,
  Building,
  GraduationCap,
  Download,
  MapPin,
  ExternalLink,
  Target,
  BarChart3,
  Trophy,
  Phone,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  BookOpen,
  Award,
  PlayCircle,
  Zap,
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import EthexLogo from '@/components/branding/EthexLogo';

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [samplePaperModalClass, setSamplePaperModalClass] = useState<string | null>(null);

  // Quick Registration Lead State (Exact Allen Tallentex Widget)
  const [quickMobile, setQuickMobile] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickClass, setQuickClass] = useState('10');
  const [quickMode, setQuickMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Mini sample question test state for student engagement
  const [quizSelected, setQuizSelected] = useState<number | null>(null);

  // Accordion FAQ state
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
    if (!agreedTerms) {
      alert('Please accept terms & conditions to proceed');
      return;
    }
    const query = new URLSearchParams({
      name: quickName,
      mobile: quickMobile,
      class: quickClass,
      mode: quickMode,
    }).toString();
    router.push(`/student/register?${query}`);
  };

  const syllabusData = [
    { grade: 'Class 5', tag: 'Middle School', subjects: 'Maths, General Science, Mental Ability', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 6', tag: 'Middle School', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 7', tag: 'Middle School', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 8', tag: 'Foundation', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 9', tag: 'Pre-JEE / Pre-NEET', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 10', tag: 'Pre-JEE / Pre-NEET', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 11 (JEE)', tag: 'Engineering Track', subjects: 'Physics, Chemistry, Mathematics', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 11 (NEET)', tag: 'Medical Track', subjects: 'Physics, Chemistry, Biology', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 12 / Aspirants', tag: 'JEE & NEET Target', subjects: 'Physics, Chemistry, Maths/Bio', pattern: '60 Qs • 240 Marks' },
  ];

  const achievers = [
    {
      name: 'Aarav Patil',
      grade: 'Class 10 (Foundation)',
      rank: 'AIR 4',
      score: '99.8%ile',
      badge: 'ISRO Study Tour Winner',
      quote: 'ETHEX gave me real CBT exam exposure before my actual Class 10 boards and Olympiads. The detailed solution review was invaluable!',
      avatar: '👨‍🎓',
    },
    {
      name: 'Priya Deshmukh',
      grade: 'Class 11 (JEE Main + Adv)',
      rank: 'AIR 12',
      score: '99.4%ile',
      badge: '90% Tuition Scholarship',
      quote: 'The Competitive Success Index (CSI) pinpointed my weak spots in Physics Mechanics. EURO Campus mentors helped me clear my doubts.',
      avatar: '👩‍🎓',
    },
    {
      name: 'Rohan Kulkarni',
      grade: 'Class 9 (Pre-Foundation)',
      rank: 'AIR 19',
      score: '98.9%ile',
      badge: '75% Admission Waiver',
      quote: 'Testing with a real countdown timer and seeing immediate marks (+4/-1) made me super confident for state talent search exams.',
      avatar: '👨‍🎓',
    },
    {
      name: 'Ananya Joshi',
      grade: 'Class 11 (NEET Medical)',
      rank: 'AIR 26',
      score: '98.6%ile',
      badge: 'Cash Award Winner',
      quote: 'The Biology and Chemistry questions closely mirrored NCERT conceptual depth. Highly recommended for every serious medical aspirant!',
      avatar: '👩‍🎓',
    },
  ];

  const faqs = [
    {
      q: 'How do I register for ETHEX 2026?',
      a: 'Click Register Now, enter your mobile number and student details, select your grade and preferred mode (Online Computer-Based or Offline Campus Centre), and hit submit to complete your registration.',
    },
    {
      q: 'What is the registration fee?',
      a: 'Registrations for the upcoming ETHEX 2026 testing cycle are currently free for eligible students across Classes 5 to 12.',
    },
    {
      q: 'Can I take a sample / practice online test before the actual exam?',
      a: 'Yes! ETHEX features a built-in Online CBT Simulator with live countdown timer, 60-question palette, and instant answer evaluations that you can try for free anytime.',
    },
    {
      q: 'What is the duration and medium of the exam?',
      a: 'ETHEX 2026 is an objective test conducted in English comprising multiple-choice questions with marks per correct response (+4) and negative marking (-1).',
    },
    {
      q: 'What is the Competitive Success Index (CSI)?',
      a: 'The Competitive Success Index (CSI) is an advanced diagnostic performance index that benchmarks your speed, accuracy, and conceptual mastery against national competitive metrics for IIT-JEE, NEET, and Olympiads.',
    },
    {
      q: 'How can students qualify for the ISRO Educational Tour?',
      a: 'Top performers across eligible categories who demonstrate outstanding analytical and scientific proficiency will be invited for an all-expense sponsored educational study trip to ISRO facilities.',
    },
    {
      q: 'Where can I download my Admit Card?',
      a: 'Your verified Admit Card with roll number, assigned room/centre, and security QR code will be generated immediately in your Student Dashboard after registration.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. TOP HERO SECTION (ALLEN TALLENTEX BANNER REPLICA) */}
      <section className="px-3 sm:px-6 lg:px-8 pt-4 pb-8 max-w-7xl mx-auto w-full">
        {/* Soft Sky-Blue / Lavender Curved Card Container */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-blue-200/80 bg-gradient-to-r from-[#EFF6FF] via-[#F3F7FF] to-[#E5EDFD] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Subtle Ambient Glowing Orbs */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top-Right Yellow/Gold Ribbon Badge (Exact Allen style) */}
          <div className="absolute top-0 right-6 sm:right-10 bg-[#EAB308] text-slate-900 font-extrabold px-3.5 sm:px-4 pt-2 pb-3 rounded-b-xl shadow-md text-center leading-tight z-20">
            <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-800">FOR CLASS</span>
            <span className="block text-xl sm:text-2xl font-black">5-12</span>
            <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-800">STUDENTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Branding, Headings & Reward Cards */}
            <div className="lg:col-span-7 space-y-5">
              {/* Official Scholarship Portal Accreditation Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-900 font-extrabold text-[11px] sm:text-xs tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="uppercase tracking-wider font-black">OFFICIAL SCHOLARSHIP PORTAL</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0066FF] font-black">AY 2027–2028</span>
              </div>

              {/* ETHEX 2026 Transparent Logo (Hero Scale, High Resolution, Pristine Contrast) */}
              <div className="pt-0.5">
                <EthexLogo size="hero" year={settings?.exam_edition || '2026'} />
              </div>

              {/* Countdown Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  The countdown has begun.
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                  National level talent assessment & scholarship exam for Classes 5 to 12.
                </p>
              </div>

              {/* Blue Pill */}
              <div className="inline-block">
                <span className="bg-[#0066FF] text-white text-xs sm:text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                  Don&apos;t miss your chance to unlock:
                </span>
              </div>

              {/* White Dual Reward Card (Exact Allen Design) */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 card-hover-effect">
                {/* Left Reward: Up to 90% Scholarship */}
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#0066FF] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-sm sm:text-base font-black text-[#0066FF] leading-none uppercase">
                      UP TO 90%
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      scholarship on
                    </span>
                    <span className="block text-xs font-extrabold text-slate-900">
                      EURO Campus courses
                    </span>
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1.5px] h-12 bg-slate-200"></div>

                {/* Right Reward: Cash Rewards */}
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-700">
                      Cash rewards worth
                    </span>
                    <span className="block text-lg sm:text-xl font-black text-[#0066FF] leading-none">
                      {settings?.admission_scholarship_pool || '₹2.5 CR'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      ₹10 Lacs Stage-2 prizes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Register Free & Try Live CBT Simulator */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/student/register"
                  className="px-6 py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group active:scale-98"
                >
                  <span>Register Free Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/student/exam/simulation"
                  className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-sm transition-all flex items-center gap-2 active:scale-98 group"
                >
                  <PlayCircle className="w-4 h-4 text-[#0066FF] transition-transform group-hover:scale-110" />
                  <span>Try Online Mock CBT (Free)</span>
                </Link>
              </div>

              {/* Dashed Border Exam Date Box (Exact Allen Design) */}
              <div className="inline-flex items-center gap-3 bg-white border-2 border-dashed border-[#0066FF]/60 rounded-xl px-4 py-2.5 shadow-sm">
                <div className="p-1.5 rounded-lg bg-blue-50 text-[#0066FF]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#0066FF] text-white text-[10px] font-bold uppercase">
                      Online & Offline
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Exam Date:</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                    {settings?.exam_date_display || 'To Be Announced Soon'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Visual & Engagement Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* 3D Modern Card Unit */}
              <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl p-5 border border-blue-200 shadow-xl space-y-4">
                {/* 3D "LAST FEW DAYS" Calendar Ribbon & Alarm Clock */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-xl p-3.5 text-white flex items-center justify-between shadow-md relative overflow-hidden">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm text-amber-300">
                      <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-blue-200">Admissions Open</span>
                      <h4 className="text-base font-black tracking-wide">LAST FEW DAYS</h4>
                    </div>
                  </div>
                  <span className="text-[11px] font-black bg-amber-400 text-slate-900 px-2.5 py-1 rounded-full uppercase shadow-sm">
                    Free Entry
                  </span>
                </div>

                {/* ISRO Educational Tour High Achievers Highlight - Custom Cosmic Card */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#060D1E] via-[#0B1E44] to-[#122A5E] border border-blue-400/30 shadow-lg text-white p-4 sm:p-5 group">
                  {/* Subtle Cosmic Background Glows & Stars */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-600/25 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

                  <div className="relative z-10 space-y-3">
                    {/* Top Row: Mini Ethex Badge & Golden 100% Sponsored Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Rocket className="w-4 h-4 text-cyan-300" />
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-300">
                          ETHEX 2026 SPECIAL INCENTIVE
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase shadow-sm">
                        100% SPONSORED
                      </span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                        <span>ISRO Space Centre Study Tour</span>
                        <span className="text-lg">🚀</span>
                      </h3>
                      <p className="text-xs text-blue-200/90 font-medium leading-relaxed mt-0.5">
                        Selected national rankers receive an all-expenses-paid educational visit to India&apos;s premier space research laboratories.
                      </p>
                    </div>

                    {/* 2 Key Highlights Pills */}
                    <div className="grid grid-cols-2 gap-2 pt-0.5 text-[11px]">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/10 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                        <span className="font-semibold text-slate-100">Live Satellite Labs</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/10 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-cyan-300 flex-shrink-0" />
                        <span className="font-semibold text-slate-100">Meet ISRO Scientists</span>
                      </div>
                    </div>

                    {/* Bottom strip with Ethex Logo indicator */}
                    <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-bold text-white">Top 50 Rankers</span>
                        <span className="text-slate-400">Classes 5–12</span>
                      </div>
                      <span className="text-amber-300 font-black text-[10px] uppercase tracking-wider">
                        Free Flights & Stay
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Mini Aptitude Teaser */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1 text-[#0066FF]">
                      <Sparkles className="w-3.5 h-3.5" /> Sample Question Preview:
                    </span>
                    <span className="text-slate-400">Class 10 MAT</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">
                    If speed of light in vacuum is 3 × 10⁸ m/s, refractive index in glass (v = 2 × 10⁸ m/s) is?
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {['A) 1.33', 'B) 1.50', 'C) 1.66', 'D) 0.67'].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuizSelected(idx)}
                        className={`py-1 px-2 rounded-lg text-[11px] font-bold text-left border transition-all ${
                          quizSelected === idx
                            ? idx === 1
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                              : 'bg-rose-100 border-rose-500 text-rose-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {quizSelected !== null && (
                    <p className={`text-[10px] font-bold ${quizSelected === 1 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {quizSelected === 1 ? '✓ Correct! n = c / v = 1.50' : '✗ Incorrect. Formula is n = c / v = 1.50'}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
                  <span className="font-semibold">Centres: PCMC & Shikrapur</span>
                  <Link href="/centres" className="font-bold text-[#0066FF] hover:underline flex items-center gap-0.5">
                    View Centre Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION & STICKY REGISTRATION SECTION (EXACT ALLEN LAYOUT) */}
      <section className="bg-[#F8FAFC] py-12 sm:py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Columns: Trust Headline & 4 Feature Blocks */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  ETHEX: Every spark deserves the right start
                </h2>
                <div className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2 rounded-full bg-blue-100 text-[#0066FF] flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="leading-relaxed">
                    Trusted by thousands of ambitious students across Maharashtra as an early step towards <strong>JEE, NEET, Olympiads, and Foundation</strong> excellence. A national-calibre talent hunt exam aimed at recognising talent, encouraging ambition, and rewarding excellence.
                  </p>
                </div>
              </div>

              {/* The 4 Feature Points (Exact Allen Style) */}
              <div className="space-y-6">
                {/* 1. Rankings */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-blue-400 transition-colors card-hover-effect">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <BarChart3 className="w-5 h-5 text-[#0066FF]" />
                    National & State Rankings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    Get your verified All-India and Maharashtra State Rank along with an in-depth subject-wise percentile report to know where you stand across the state and nationwide.
                  </p>
                </div>

                {/* 2. CSI */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-amber-400 transition-colors card-hover-effect">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <Target className="w-5 h-5 text-amber-500" />
                    Competitive Success Index (CSI)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    A breakthrough diagnostic index that gauges your conceptual aptitude, problem-solving speed, and readiness for JEE, NEET, Olympiads, and competitive examinations.
                  </p>
                </div>

                {/* 3. ISRO Tour */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-purple-400 transition-colors card-hover-effect">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <Rocket className="w-5 h-5 text-purple-600" />
                    ISRO Educational Tour (Exclusive EURO Feature)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    Top-ranking performers earn an all-expense sponsored scientific visit to ISRO facilities to experience India&apos;s premier space missions and space science centers.
                  </p>
                </div>

                {/* 4. Rewards */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-emerald-400 transition-colors card-hover-effect">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2.5">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                    Exciting Rewards & Scholarships
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    Up to 90% scholarship on EURO Campus courses and ₹10 Lacs in Stage-2 cash prizes distributed to top performers based on merit.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Sticky Floating Registration Card (Exact Allen Design) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Orange Top Bar */}
                <div className="bg-[#FF6600] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-6 py-2">
                  ONLINE & OFFLINE REGISTRATION
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">
                      Register for ETHEX 2026
                    </h3>
                    <span className="text-xs font-bold text-slate-400">1/3</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-1/3 rounded-full"></div>
                  </div>

                  {/* Value Highlights Mini Strip */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" /> Free Entry
                    </span>
                    <span className="flex items-center gap-1 text-blue-700">
                      <CheckCircle2 className="w-3 h-3" /> Admit Card
                    </span>
                    <span className="flex items-center gap-1 text-amber-700">
                      <CheckCircle2 className="w-3 h-3" /> Scholarships
                    </span>
                  </div>

                  <form onSubmit={handleQuickRegister} className="space-y-4">
                    {/* Mobile Number Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-400">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="Enter 10-digit mobile number"
                          value={quickMobile}
                          onChange={(e) => setQuickMobile(e.target.value.replace(/\D/g, ''))}
                          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-medium"
                        />
                      </div>
                    </div>

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
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-medium"
                      />
                    </div>

                    {/* Select Class */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Class / Goal <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={quickClass}
                        onChange={(e) => setQuickClass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-medium"
                      >
                        <option value="5">Class 5 (Middle School Foundation)</option>
                        <option value="6">Class 6 (Middle School Foundation)</option>
                        <option value="7">Class 7 (Middle School Foundation)</option>
                        <option value="8">Class 8 (Pre-Foundation)</option>
                        <option value="9">Class 9 (Pre-JEE / Pre-NEET)</option>
                        <option value="10">Class 10 (Pre-JEE / Pre-NEET)</option>
                        <option value="11-JEE">Class 11 (JEE Engineering)</option>
                        <option value="11-NEET">Class 11 (NEET Medical)</option>
                        <option value="12-JEE">Class 12 (JEE Engineering)</option>
                        <option value="12-NEET">Class 12 (NEET Medical)</option>
                      </select>
                    </div>

                    {/* Mode Toggle */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Exam Mode <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setQuickMode('ONLINE')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            quickMode === 'ONLINE'
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Online Test (Home)
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuickMode('OFFLINE')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            quickMode === 'OFFLINE'
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Offline (Campus)
                        </button>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-1">
                      <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-500">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                        />
                        <span>
                          By registering you accept our{' '}
                          <Link href="/terms" className="text-[#0066FF] underline">
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      Proceed to Register
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
                    Already registered?{' '}
                    <Link href="/student/login" className="font-bold text-[#0066FF] hover:underline">
                      Use registered mobile number
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACHIEVERS SPOTLIGHT & WALL OF FAME (ALLEN TALLENTEX FEATURE) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              Proven Track Record
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              ETHEX Achievers & ISRO Tour Winners
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Hear from students who converted their ETHEX performance into top ranks and EURO Campus scholarships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievers.map((achiever, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 card-hover-effect"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{achiever.avatar}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-900 uppercase">
                      {achiever.rank}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base">{achiever.name}</h3>
                    <p className="text-[11px] font-bold text-slate-500">{achiever.grade}</p>
                    <span className="text-xs font-black text-[#0066FF]">{achiever.score}</span>
                  </div>

                  <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {achiever.badge}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-200/80 pt-2">
                    &ldquo;{achiever.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified EURO Candidate</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SYLLABUS & SAMPLE PAPERS GRID (EXACT ALLEN LAYOUT) */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200" id="syllabus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Syllabus and Sample Papers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Open to students of Classes 5 to 12. Download the question format and practice tests for your grade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {syllabusData.map((item) => (
              <div
                key={item.grade}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center justify-between card-hover-effect"
              >
                <div>
                  <h3 className="text-lg font-black text-slate-900">{item.grade}</h3>
                  <span className="text-[10px] font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase mt-1 inline-block">
                    {item.tag}
                  </span>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{item.pattern}</p>
                </div>

                <button
                  onClick={() => setSamplePaperModalClass(item.grade)}
                  className="px-4 py-2 rounded-full border border-[#0066FF] text-[#0066FF] hover:bg-blue-50 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEST CENTRES / CITIES (EXACT ALLEN LAYOUT) */}
      <section className="py-16 bg-white border-t border-slate-200" id="centres">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                ETHEX Test Centres
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Authorized offline examination campuses equipped with biometric check-in and AC test halls.
              </p>
            </div>
            <Link
              href="/centres"
              className="px-5 py-2 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            >
              View Cities List
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* PCMC Campus */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 card-hover-effect">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                  Centre: EC-PCMC
                </span>
                <Building className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">EURO Campus — PCMC</h3>
              <p className="text-xs text-slate-600 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                Empire Estate, 4th Floor, Above Vijay Sales, Old Mumbai-Pune Highway, Pimpri-Chinchwad, Pune — 411019
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9112223354" className="font-extrabold text-[#0066FF] hover:underline">
                  9112223354 / 9112233995
                </a>
              </div>
            </div>

            {/* Shikrapur Campus */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 card-hover-effect">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                  Centre: EC-SHIK
                </span>
                <Building className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">EURO Campus — Shikrapur</h3>
              <p className="text-xs text-slate-600 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                Kalamkar Vasti, Near Gunjian Theatre, Hivare Road, Pune-Nagar Highway, Shikrapur, Pune — 412208
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9607035688" className="font-extrabold text-[#0066FF] hover:underline">
                  9607035688
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (EXACT ALLEN ACCORDION) */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-800 hover:text-[#0066FF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-[#0066FF]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYLLABUS & SAMPLE PAPER MODAL */}
      {samplePaperModalClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                  Curriculum Guide
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {samplePaperModalClass} — Practice Test & Syllabus
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
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <p className="font-bold text-[#0066FF]">Exam Specification:</p>
                <p className="text-slate-600 mt-1">60 MCQs • 240 Marks • Duration: 120 Minutes (2 Hours)</p>
                <p className="text-slate-600">Marking: +4 for correct answer, -1 for wrong answer.</p>
              </div>

              <div>
                <p className="font-bold text-slate-800 mb-1">Subjects Covered:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Physics & Chemistry (NCERT guidelines)</li>
                  <li>Mathematics & Mental Ability</li>
                  <li>Logical Reasoning & Aptitude</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  alert(`Sample paper for ${samplePaperModalClass} is downloading.`);
                  setSamplePaperModalClass(null);
                }}
                className="px-4 py-2 bg-[#0066FF] hover:bg-blue-700 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download Practice PDF
              </button>
              <Link
                href={`/student/register?class=${encodeURIComponent(samplePaperModalClass)}`}
                className="px-4 py-2 bg-[#FF6600] text-white rounded-full text-xs font-black shadow-sm hover:bg-orange-600"
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
