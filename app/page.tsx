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
  ChevronRight
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
    { grade: 'Class 5', tag: 'Middle School', subjects: 'Maths, Science, Mental Ability', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 6', tag: 'Middle School', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 7', tag: 'Middle School', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 8', tag: 'Foundation', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 9', tag: 'Pre-JEE / Pre-NEET', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 10', tag: 'Pre-JEE / Pre-NEET', subjects: 'Physics, Chem, Bio, Maths, MAT', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 11 (JEE)', tag: 'Engineering Track', subjects: 'Physics, Chemistry, Mathematics', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 11 (NEET)', tag: 'Medical Track', subjects: 'Physics, Chemistry, Biology', pattern: '60 Qs • 240 Marks' },
    { grade: 'Class 12 / Aspirants', tag: 'JEE & NEET Target', subjects: 'Physics, Chemistry, Maths/Bio', pattern: '60 Qs • 240 Marks' },
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
      q: 'What is the duration and medium of the exam?',
      a: 'ETHEX 2026 is a 2-hour (120 minutes) objective test conducted in English comprising 60 multiple-choice questions for 240 marks.',
    },
    {
      q: 'What is the marking scheme?',
      a: 'Each correct response carries +4 marks, while -1 mark is deducted for each incorrect answer. Unattempted questions carry zero penalty.',
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
        <div className="relative rounded-2xl sm:rounded-3xl border border-blue-200/70 bg-gradient-to-r from-[#EFF6FF] via-[#F2F6FE] to-[#E6EEFB] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Top-Right Yellow/Gold Ribbon Badge (Exact Allen style) */}
          <div className="absolute top-0 right-6 sm:right-10 bg-[#EAB308] text-slate-900 font-extrabold px-3 sm:px-4 pt-2 pb-3 rounded-b-xl shadow-md text-center leading-tight z-20">
            <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-800">FOR CLASS</span>
            <span className="block text-xl sm:text-2xl font-black">5-12</span>
            <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-slate-800">STUDENTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Branding, Headings & Reward Cards */}
            <div className="lg:col-span-7 space-y-5">
              {/* ETHEX 2026 Logo */}
              <div className="pt-2">
                <EthexLogo size="lg" year={settings?.exam_edition || '2026'} />
              </div>

              {/* Countdown Tagline */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                The countdown has begun.
              </h1>

              {/* Blue Pill */}
              <div className="inline-block">
                <span className="bg-[#0066FF] text-white text-xs sm:text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm">
                  Don&apos;t miss your chance to unlock:
                </span>
              </div>

              {/* White Dual Reward Card (Exact Allen Design) */}
              <div className="bg-white/95 rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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

              {/* Dashed Border Exam Date Box (Exact Allen Design) */}
              <div className="inline-flex items-center gap-3 bg-white/90 border-2 border-dashed border-[#0066FF]/60 rounded-xl px-4 py-2.5 shadow-sm">
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

            {/* Right Column: High-Impact Visual Composition (Students & Floating Badge) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* 3D Floating "LAST FEW DAYS" Badge */}
              <div className="relative w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-blue-200 shadow-xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-black text-[#0066FF] uppercase tracking-wider">Admissions Open</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Academic Year {settings?.academic_year || '2027–2028'}
                  </span>
                </div>

                {/* ISRO Educational Tour Showcase */}
                <div className="relative rounded-xl overflow-hidden aspect-video border border-blue-100 shadow-inner group">
                  <Image
                    src="/branding/isro_tour_instagram_flyer.jpg"
                    alt="ETHEX ISRO Educational Tour"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                    <div>
                      <span className="bg-[#0066FF] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                        Exclusive Reward
                      </span>
                      <p className="text-white text-xs font-bold mt-1">
                        Top Performers Earn an ISRO Educational Tour 🚀
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Centre: PCMC & Shikrapur</span>
                  <Link href="/centres" className="font-bold text-[#0066FF] hover:underline flex items-center gap-0.5">
                    View Centres <ChevronRight className="w-3.5 h-3.5" />
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
                    Trusted by ambitious students across Maharashtra as an early step towards <strong>JEE, NEET, Olympiads, and Foundation</strong> excellence. A talent search exam aimed at recognising talent, encouraging ambition, and rewarding excellence.
                  </p>
                </div>
              </div>

              {/* The 4 Feature Points (Exact Allen Style) */}
              <div className="space-y-6">
                {/* 1. Rankings */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-blue-400 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#0066FF]" />
                    National & State Rankings
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    Get your verified All-India and Maharashtra State Rank along with an in-depth subject-wise percentile report to know where you stand across the state and nationwide.
                  </p>
                </div>

                {/* 2. CSI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-amber-400 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-500" />
                    Competitive Success Index (CSI)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    A breakthrough diagnostic index that gauges your conceptual aptitude, problem-solving speed, and readiness for JEE, NEET, Olympiads, and competitive examinations.
                  </p>
                </div>

                {/* 3. ISRO Tour */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-purple-400 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-purple-600" />
                    ISRO Educational Tour (Exclusive EURO Feature)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                    Top-ranking performers earn an all-expense sponsored scientific visit to ISRO facilities to experience India&apos;s premier space missions and space science centers.
                  </p>
                </div>

                {/* 4. Rewards */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 hover:border-emerald-400 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
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
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
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

      {/* 3. SYLLABUS & SAMPLE PAPERS GRID (EXACT ALLEN LAYOUT) */}
      <section className="py-16 bg-white border-t border-slate-200" id="syllabus">
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
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center justify-between"
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

      {/* 4. TEST CENTRES / CITIES (EXACT ALLEN LAYOUT) */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200" id="centres">
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
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
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9112223354" className="font-extrabold text-[#0066FF] hover:underline">
                  9112223354 / 9112233995
                </a>
              </div>
            </div>

            {/* Shikrapur Campus */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
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
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Helpline:</span>
                <a href="tel:9607035688" className="font-extrabold text-[#0066FF] hover:underline">
                  9607035688
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (EXACT ALLEN ACCORDION) */}
      <section className="py-16 bg-white border-t border-slate-200" id="faqs">
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
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
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
