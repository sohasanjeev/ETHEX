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
  Eye,
  X,
  Send,
  FileCheck2,
  HelpCircle,
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import EthexLogo from '@/components/branding/EthexLogo';

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);

  // Interactive Tab for Exam Pattern Breakdown: STRICTLY Class 7 to 12
  const [activePatternTab, setActivePatternTab] = useState<'class7' | 'class8' | 'class9' | 'class10' | 'class11_jee' | 'class11_neet'>('class10');

  // Modal states
  const [samplePaperModalClass, setSamplePaperModalClass] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [schoolFormSubmitted, setSchoolFormSubmitted] = useState(false);

  // Quick Registration Lead State (PWSAT / Allen style high-conversion card)
  const [quickMobile, setQuickMobile] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickClass, setQuickClass] = useState('Class 10');
  const [quickMode, setQuickMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Countdown Timer to 29th November 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => {});

    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => {
        if (data.exams) setExams(data.exams);
      })
      .catch(() => {});

    // Target Exam Date: 29th November 2026 at 10:00 AM IST
    const targetDate = new Date('2026-11-29T10:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
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

  // Official Brochures / Pamphlets data
  const officialPosters = [
    {
      title: 'ETHEX 2026 Phase 2 Official Announcement',
      subtitle: '29th Nov 2026 • Up to 90% Scholarship & ISRO Tour',
      file: '/posters/ethex_poster_phase2_nov29.png',
      badge: 'OFFICIAL PAMPHLET',
    },
    {
      title: 'ISRO Educational Tour Initiative',
      subtitle: 'Centre Details: PCMC & Shikrapur • Academic Year 2027–2028',
      file: '/posters/ethex_isro_tour_nov29.png',
      badge: 'TOP ATTRACTION',
    },
    {
      title: 'Future Science Champ & Pune University Support',
      subtitle: 'School-Level Talent & Science Exposure Initiative',
      file: '/posters/ethex_isro_students_initiative.png',
      badge: 'CERTIFICATION',
    },
    {
      title: 'Scholarships & Stage-2 Cash Prizes',
      subtitle: '₹2.5 Crores Scholarships • ₹10 Lakhs Cash Prizes',
      file: '/posters/ethex_classroom_benefits.png',
      badge: 'REWARDS',
    },
  ];

  // Pattern data strictly for Class 7 to 12
  const patternTabs = {
    class7: {
      name: 'Class 7',
      category: 'Middle School Foundation',
      target: 'Science & Mathematical Olympiads, NTSE Foundation',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Motion and Time, Heat, Light, Electric Current & Effects' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Acids, Bases & Salts, Physical & Chemical Changes, Water' },
        { name: 'Biology & Math', qs: 15, marks: 60, syllabus: 'Nutrition in Plants/Animals, Integers, Fractions, Simple Equations' },
        { name: 'Mental Ability & Astronomy', qs: 15, marks: 60, syllabus: 'Pattern Series, Coding-Decoding, Space Science Basics, ISRO Missions' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    class8: {
      name: 'Class 8',
      category: 'Foundation & Science Champ',
      target: 'Pre-Olympiads, Science Talent Search, Foundation',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Force and Pressure, Friction, Sound, Chemical Effects of Current, Light' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Synthetic Fibres, Metals and Non-Metals, Combustion & Flame' },
        { name: 'Biology & Math', qs: 15, marks: 60, syllabus: 'Cell Structure, Microorganisms, Rational Numbers, Linear Equations' },
        { name: 'Mental Ability & Astronomy', qs: 15, marks: 60, syllabus: 'Venn Diagrams, Cube & Dice, Blood Relations, Solar System & Satellites' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    class9: {
      name: 'Class 9',
      category: 'Pre-JEE / Pre-NEET Track',
      target: 'NSEJS, IJSO, State NTSE, Pre-JEE & Pre-NEET',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Motion, Force and Laws of Motion, Gravitation, Work & Energy' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Matter in Our Surroundings, Is Matter Around Us Pure, Atoms & Molecules' },
        { name: 'Biology & Math', qs: 15, marks: 60, syllabus: 'The Fundamental Unit of Life, Tissues, Polynomials, Coordinate Geometry' },
        { name: 'Mental Ability & Space Science', qs: 15, marks: 60, syllabus: 'Analytical Reasoning, Series Completion, Orbital Mechanics Basics' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    class10: {
      name: 'Class 10',
      category: 'Pre-JEE / Pre-NEET Target',
      target: 'Board Exam Mastery, NTSE, Early JEE/NEET Acceleration',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Light (Reflection & Refraction), Human Eye, Electricity, Magnetic Effects' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Chemical Reactions, Acids Bases Salts, Metals & Non-metals, Carbon Compounds' },
        { name: 'Biology & Math', qs: 15, marks: 60, syllabus: 'Life Processes, Control & Coordination, Quadratic Equations, Triangles, Trigonometry' },
        { name: 'Mental Ability & Science Aptitude', qs: 15, marks: 60, syllabus: 'Data Interpretation, Logical Deduction, Space Science & ISRO Highlights' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    class11_jee: {
      name: 'Class 11 / 12 (JEE)',
      category: 'Engineering Track',
      target: 'IIT-JEE Main + Advanced, MHT-CET Engineering, BITSAT',
      subjects: [
        { name: 'Physics', qs: 20, marks: 80, syllabus: 'Kinematics, Laws of Motion, Work Energy Power, Rotational Motion, Thermodynamics' },
        { name: 'Chemistry', qs: 20, marks: 80, syllabus: 'Atomic Structure, Chemical Bonding, Thermodynamics, Equilibrium, Organic Basics' },
        { name: 'Mathematics', qs: 20, marks: 80, syllabus: 'Sets & Relations, Trigonometric Functions, Complex Numbers, Permutations, Calculus' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    class11_neet: {
      name: 'Class 11 / 12 (NEET)',
      category: 'Medical Track',
      target: 'NEET-UG, AIIMS, State Medical Merit Seats',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Units & Measurements, Motion in 1D/2D, Newton’s Laws, Gravitation, Oscillations' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Structure of Atom, Periodic Classification, Chemical Bonding, Organic Chemistry' },
        { name: 'Biology (Botany & Zoology)', qs: 30, marks: 120, syllabus: 'Diversity in Living World, Cell Biology, Plant Physiology, Human Physiology' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
  };

  const currentPattern = patternTabs[activePatternTab];

  const achievers = [
    {
      name: 'Aarav Patil',
      school: 'Podar International School, PCMC',
      grade: 'Class 10 (Foundation)',
      rank: 'AIR 4',
      score: '234/240 Marks',
      badge: 'ISRO Study Tour Winner',
      quote: 'ETHEX gave me real CBT exam exposure before my actual Class 10 boards and Olympiads. The detailed solution review was invaluable!',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&h=240&fit=crop&crop=face',
      initials: 'AP',
    },
    {
      name: 'Priya Deshmukh',
      school: 'St. Ursula High School, Akurdi',
      grade: 'Class 11 (JEE Main + Adv)',
      rank: 'AIR 12',
      score: '228/240 Marks',
      badge: '90% Tuition Scholarship',
      quote: 'The Competitive Success Index (CSI) pinpointed my weak spots in Physics Mechanics. EURO Campus mentors helped me clear my doubts.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=240&fit=crop&crop=face',
      initials: 'PD',
    },
    {
      name: 'Rohan Kulkarni',
      school: "The Bishop's School, Pune",
      grade: 'Class 9 (Foundation)',
      rank: 'AIR 19',
      score: '222/240 Marks',
      badge: '75% Admission Waiver',
      quote: 'Testing with a real countdown timer and seeing immediate marks (+4/-1) made me super confident for state talent search exams.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=face',
      initials: 'RK',
    },
    {
      name: 'Ananya Joshi',
      school: 'City International School, Pune',
      grade: 'Class 11 (NEET Medical)',
      rank: 'AIR 26',
      score: '218/240 Marks',
      badge: 'Cash Award Winner',
      quote: 'The Biology and Chemistry questions closely mirrored NCERT conceptual depth. Highly recommended for every serious medical aspirant!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&h=240&fit=crop&crop=face',
      initials: 'AJ',
    },
  ];

  const faqs = [
    {
      q: 'Who is eligible to appear for ETHEX 2026 (Phase 2)?',
      a: 'ETHEX 2026 is strictly designed for students currently studying in Class 7, Class 8, Class 9, Class 10, Class 11, and Class 12 (as well as 12th pass/dropper aspirants) targeting JEE, NEET, MHT-CET, Olympiads, and Foundation excellence.',
    },
    {
      q: 'What is the date and mode of the upcoming examination?',
      a: 'The upcoming Phase 2 exam is on Sunday, 29th November 2026. Students can choose either: 1) Online CBT Mode from home on any smartphone, tablet, or laptop, or 2) Offline Paper Mode at authorized EURO Campus centres (PCMC or Shikrapur).',
    },
    {
      q: 'How can students qualify for the ISRO Educational Tour?',
      a: 'Top performers across eligible categories who demonstrate outstanding analytical and scientific proficiency will be invited for an all-expenses-sponsored educational study trip to ISRO space facilities to interact with scientists and explore real satellite research.',
    },
    {
      q: 'What is the examination pattern and marking scheme?',
      a: 'The test consists of 60 multiple-choice questions (MCQs) for 240 total marks with a 60-minute duration. Marking: +4 marks for every correct answer, -1 negative mark for incorrect answer, and 0 for unattempted questions.',
    },
    {
      q: 'Is registration free for students?',
      a: 'Yes! Registrations for the upcoming ETHEX 2026 Phase 2 examination are 100% free for students across India when registering online.',
    },
    {
      q: 'How does the mobile OTP login work?',
      a: 'There is no password to memorize and no Google sign-in required. Simply enter your registered 10-digit mobile number, receive a 6-digit OTP, and instantly access your student dashboard, mock tests, and admit cards.',
    },
    {
      q: 'What certifications do participants receive?',
      a: 'All participating students receive an official Participation Certificate through Future Science Champ along with Pune University Certification Support and a detailed Competitive Success Index (CSI) diagnostic report.',
    },
    {
      q: 'Can schools collaborate to conduct ETHEX on their campus?',
      a: 'Yes! Under our "Invite ETHEX in Your School" initiative, school principals and science coordinators can host ETHEX for their students with full logistical and scholarship support from EURO Campus.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION: ULTRA-CLEAN, HIGH CONVERSION, PWSAT & TALENTEX INSPIRED */}
      <section className="px-3 sm:px-6 lg:px-8 pt-4 pb-10 max-w-7xl mx-auto w-full">
        <div className="relative rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#EEF4FF] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Subtle glowing ambient lights */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top-Right Yellow Ribbon Badge: Strictly Class 7-12 */}
          <div className="absolute top-0 right-6 sm:right-12 bg-[#F59E0B] text-slate-950 font-black px-4 pt-2.5 pb-3.5 rounded-b-2xl shadow-md text-center leading-tight z-20">
            <span className="block text-[10px] tracking-widest uppercase font-extrabold text-slate-900">FOR CLASSES</span>
            <span className="block text-xl sm:text-2xl font-black">7 to 12</span>
            <span className="block text-[9px] tracking-wider uppercase font-bold text-slate-800">STUDENTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left 7 Columns: Branding, Live Countdown & Selling Points */}
            <div className="lg:col-span-7 space-y-5">
              {/* Official Academic Session Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-blue-200 text-blue-900 font-extrabold text-xs shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="uppercase tracking-wider font-black">ACADEMIC YEAR 2027–2028</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0066FF] font-black uppercase">PHASE 2</span>
              </div>

              {/* Main Headline & Exam Logo */}
              <div className="space-y-2">
                <div className="inline-block p-2 rounded-2xl bg-white/80 border border-blue-100 shadow-xs mb-1">
                  <EthexLogo size="hero" height={125} year="2026" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                  Win Up to 90% Scholarship + Sponsored <span className="text-[#0066FF]">ISRO Tour</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                  National-level talent hunt & scholarship examination conducted by <strong>EURO CAMPUS</strong> for ambitious students of <strong>Classes 7 to 12</strong> targeting JEE, NEET, MHT-CET & Foundation.
                </p>
              </div>

              {/* Live Exam Date & Countdown Box */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-dashed border-[#0066FF]/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-50 text-[#0066FF] flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      OFFICIAL EXAM DATE
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                      29th November 2026
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Online CBT & Offline Campuses</p>
                  </div>
                </div>

                {/* Countdown Numbers */}
                <div className="flex items-center gap-2 text-center">
                  <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1.5 min-w-[48px]">
                    <span className="block text-base sm:text-lg font-black">{timeLeft.days}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400">Days</span>
                  </div>
                  <span className="text-slate-400 font-bold">:</span>
                  <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1.5 min-w-[48px]">
                    <span className="block text-base sm:text-lg font-black">{timeLeft.hours}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400">Hrs</span>
                  </div>
                  <span className="text-slate-400 font-bold">:</span>
                  <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1.5 min-w-[48px]">
                    <span className="block text-base sm:text-lg font-black">{timeLeft.minutes}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400">Min</span>
                  </div>
                  <span className="text-slate-400 font-bold">:</span>
                  <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1.5 min-w-[48px]">
                    <span className="block text-base sm:text-lg font-black">{timeLeft.seconds}</span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400">Sec</span>
                  </div>
                </div>
              </div>

              {/* 4 Core Pillars Mini Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs font-bold text-slate-800">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>ISRO Space Tour</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
                  <span>90% Scholarships</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>₹10L Cash Prizes</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>₹2.5 Cr Pool</span>
                </div>
              </div>

              {/* Action Buttons: Register Free, Online Mock CBT & View Brochures */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/student/register"
                  className="px-6 py-3.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group active:scale-98"
                >
                  <span>Register for ETHEX Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/student/exam/simulation"
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-sm transition-all flex items-center gap-2 active:scale-98"
                >
                  <PlayCircle className="w-4 h-4 text-[#0066FF]" />
                  <span>Try Online Mock CBT</span>
                </Link>

                <button
                  onClick={() => setSelectedPoster('/posters/ethex_poster_phase2_nov29.png')}
                  className="px-4 py-3.5 bg-blue-50/80 hover:bg-blue-100 text-[#0066FF] font-bold text-xs sm:text-sm rounded-xl border border-blue-200 shadow-2xs transition-all flex items-center gap-1.5 active:scale-98"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Official Pamphlets</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: Sticky High-Conversion Quick Registration Card (PWSAT Style) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Header Tag */}
                <div className="bg-gradient-to-r from-[#0066FF] to-blue-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 flex items-center justify-between">
                  <span>QUICK REGISTRATION</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black">
                    FREE ENTRY
                  </span>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Enroll for ETHEX 2026
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Fill 3 details to get instant admit card & test syllabus.
                    </p>
                  </div>

                  <form onSubmit={handleQuickRegister} className="space-y-3.5">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="10-digit mobile number"
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
                        placeholder="Student name"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-medium"
                      />
                    </div>

                    {/* Select Class: STRICTLY Class 7 to 12 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Target Class <span className="text-rose-500">*</span> (Class 7 to 12)
                      </label>
                      <select
                        value={quickClass}
                        onChange={(e) => setQuickClass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-bold text-slate-800"
                      >
                        <option value="Class 7">Class 7 (Middle School Foundation)</option>
                        <option value="Class 8">Class 8 (Foundation & Science Champ)</option>
                        <option value="Class 9">Class 9 (Pre-JEE / Pre-NEET)</option>
                        <option value="Class 10">Class 10 (Pre-JEE / Pre-NEET Target)</option>
                        <option value="Class 11 JEE">Class 11 (JEE Engineering Track)</option>
                        <option value="Class 11 NEET">Class 11 (NEET Medical Track)</option>
                        <option value="Class 12 JEE">Class 12 (JEE Main + Advanced)</option>
                        <option value="Class 12 NEET">Class 12 (NEET-UG Medical)</option>
                      </select>
                    </div>

                    {/* Exam Mode Toggle */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Exam Mode <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setQuickMode('ONLINE')}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            quickMode === 'ONLINE'
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
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
                              ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          Offline (Campus)
                        </button>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="pt-0.5">
                      <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-500">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="mt-0.5 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                        />
                        <span>
                          I agree to terms and to receive examination admit card via SMS/WhatsApp.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform transform active:scale-98 flex items-center justify-center gap-2"
                    >
                      Proceed to Free Registration
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
                    Already registered?{' '}
                    <Link href="/student/login" className="font-extrabold text-[#0066FF] hover:underline">
                      Sign In with Mobile OTP
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: 4 KEY PILLARS (ISRO TOUR, SCHOLARSHIPS, CASH PRIZES, RANKINGS) */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              WHY APPEAR FOR ETHEX 2026?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Recognising Talent, Rewarding Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Conducted by <strong>EURO CAMPUS</strong>, ETHEX provides students of Classes 7–12 a competitive benchmark and life-changing scholarship opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: ISRO Tour */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-purple-400 transition-all card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  EXCLUSIVE HIGHLIGHT
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  ISRO Educational Tour
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Selected top performers earn an all-expenses-sponsored visit to premier ISRO satellite research facilities and labs to meet space scientists.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-purple-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Sponsored Visit</span>
              </div>
            </div>

            {/* Card 2: 90% Scholarships */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded">
                  UP TO 90% WAIVER
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Admission Scholarships
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Substantial admission fee waivers across EURO CAMPUS Foundation, IIT-JEE, NEET-UG, and MHT-CET coaching batches.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0066FF]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Total Pool: ₹2.5 Crores</span>
              </div>
            </div>

            {/* Card 3: ₹10 Lakhs Cash Prizes */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  STAGE-2 REWARDS
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  ₹10 Lakh Cash Prizes
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct cash awards and medals distributed to state and national rankers based on their outstanding performance in Stage 2.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <Award className="w-3.5 h-3.5" />
                <span>Merit Cash Rewards</span>
              </div>
            </div>

            {/* Card 4: Certifications & CSI */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-400 transition-all card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  DIAGNOSTIC REPORT
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  National Ranking & CSI
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Future Science Champ participation certificate and Pune University Certification Support with deep subject-wise diagnostic report.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Verified Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXAM DETAILS & PATTERN BREAKDOWN (INTERACTIVE TABBED VIEW: STRICTLY CLASS 7-12) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              EXAMINATION BLUEPRINT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Exam Pattern & Syllabus Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              60 Questions • 240 Marks • 60 Minutes • Marking Scheme: +4 / -1
            </p>
          </div>

          {/* Interactive Class Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {(['class7', 'class8', 'class9', 'class10', 'class11_jee', 'class11_neet'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActivePatternTab(tab)}
                className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
                  activePatternTab === tab
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {patternTabs[tab].name}
              </button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-[#0066FF] uppercase">
                  {currentPattern.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {currentPattern.name} Syllabus & Format
                </h3>
                <p className="text-xs text-slate-600 font-medium">Target: {currentPattern.target}</p>
              </div>

              {/* Stat Badges */}
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-400 block text-[10px]">TOTAL MARKS</span>
                  <span className="text-[#0066FF] text-sm font-black">{currentPattern.totalMarks} M</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-400 block text-[10px]">QUESTIONS</span>
                  <span className="text-slate-900 text-sm font-black">{currentPattern.totalQs} MCQs</span>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-slate-400 block text-[10px]">DURATION</span>
                  <span className="text-slate-900 text-sm font-black">{currentPattern.duration}</span>
                </div>
              </div>
            </div>

            {/* Subject Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">Subject Section</th>
                    <th className="py-3 px-4">Questions</th>
                    <th className="py-3 px-4">Marks</th>
                    <th className="py-3 px-4">Syllabus Overview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {currentPattern.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{sub.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{sub.qs} MCQs</td>
                      <td className="py-3.5 px-4 font-bold text-[#0066FF]">{sub.marks} Marks</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">{sub.syllabus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Actions: Download Syllabus & Try Mock */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 font-medium">
                Marking Scheme: <strong className="text-slate-800">{currentPattern.marking}</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSamplePaperModalClass(currentPattern.name)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Download {currentPattern.name} PDF</span>
                </button>

                <Link
                  href="/student/register"
                  className="px-4 py-2 bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                >
                  Register for this Class
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEAMLESS 3-STEP REGISTRATION FLOW (PWSAT STYLE) */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              3 Simple Steps to Register
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Quick, frictionless mobile OTP verification without passwords or Google accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3 relative card-hover-effect">
              <span className="w-9 h-9 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center font-black text-sm">
                1
              </span>
              <h3 className="text-lg font-black text-slate-900">Enter Student Details</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide student name, mobile number, current class (Class 7 to 12), and target stream (Foundation, JEE, NEET, or MHT-CET).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3 relative card-hover-effect">
              <span className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                2
              </span>
              <h3 className="text-lg font-black text-slate-900">Choose Mode & Centre</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your convenient mode: take the Online CBT exam from home on 29 Nov 2026, or choose our offline PCMC or Shikrapur campus.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3 relative card-hover-effect">
              <span className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                3
              </span>
              <h3 className="text-lg font-black text-slate-900">Instant OTP & Admit Card</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify via 6-digit mobile OTP code. Instantly download your verified Admit Card with roll number and syllabus materials.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/student/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all"
            >
              <span>Start Free Registration Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. OFFICIAL BROCHURES & POSTERS GALLERY (EXTRACTED FROM USER PAMPHLETS) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="posters">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
                OFFICIAL NOTIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Official ETHEX Posters & Brochures
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Click any poster to view full-resolution notice or download official material.
              </p>
            </div>

            <button
              onClick={() => setSchoolModalOpen(true)}
              className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-extrabold text-xs sm:text-sm rounded-xl border border-purple-200 shadow-2xs flex items-center gap-2 transition-all"
            >
              <Users className="w-4 h-4 text-purple-600" />
              <span>Invite ETHEX in Your School</span>
            </button>
          </div>

          {/* Posters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officialPosters.map((poster, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => setSelectedPoster(poster.file)}
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200">
                  <img
                    src={poster.file}
                    alt={poster.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                    {poster.badge}
                  </div>
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 bg-white text-slate-900 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" /> Tap to Preview
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-black text-slate-900 text-sm leading-tight line-clamp-2">
                    {poster.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium line-clamp-1">
                    {poster.subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0066FF]">
                    <span>View Poster</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OFFLINE CAMPUSES & "INVITE ETHEX IN YOUR SCHOOL" SECTION */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200" id="centres">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              AUTHORISED CENTRES & COLLABORATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              EURO Campus Test Locations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Visit our premier centres in PCMC and Shikrapur, or invite ETHEX directly to your school.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* PCMC Campus */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 card-hover-effect">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                  CENTRE: PCMC (CHINCHWAD)
                </span>
                <Building className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">EURO CAMPUS — PCMC</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>4th Floor, above Vijay Sales, Empire Estate Phase-II, Chinchwad, Pune — 411019</span>
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Direct Helpline:</span>
                <a href="tel:9112223354" className="font-extrabold text-[#0066FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9112223354
                </a>
              </div>
            </div>

            {/* Shikrapur Campus */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 card-hover-effect">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 uppercase">
                  CENTRE: SHIKRAPUR
                </span>
                <Building className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">EURO CAMPUS — Shikrapur</h3>
                <p className="text-xs text-slate-600 flex items-start gap-1.5 mt-1 leading-relaxed">
                  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>Kalamkar Vasti, Hivare Road, Shikrapur, Pune — 412208, Maharashtra</span>
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Direct Helpline:</span>
                <a href="tel:9607035688" className="font-extrabold text-[#0066FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9607035688
                </a>
              </div>
            </div>
          </div>

          {/* Invite ETHEX in Your School Banner (From Pamphlet) */}
          <div className="bg-gradient-to-r from-[#2E1065] via-[#1E1B4B] to-[#111827] rounded-3xl p-6 sm:p-8 text-white max-w-4xl mx-auto shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                <Users className="w-3 h-3" /> SCHOOL COLLABORATION
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Invite ETHEX in Your School
              </h3>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                For school collaboration, student participation, and on-campus exam hosting, connect with EURO Campus. We provide full logistical, paper, and certification support.
              </p>
            </div>

            <button
              onClick={() => setSchoolModalOpen(true)}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 flex-shrink-0 active:scale-98"
            >
              <span>Collaborate with Us</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. PROVEN ACHIEVERS / WALL OF FAME */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              SUCCESS STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              ETHEX Achievers & ISRO Tour Qualifiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Real students who benchmarked their knowledge and won EURO Campus scholarships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievers.map((achiever, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 card-hover-effect"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md flex-shrink-0 bg-blue-100">
                      <img
                        src={achiever.image}
                        alt={achiever.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 uppercase shadow-2xs">
                        {achiever.rank}
                      </span>
                      <span className="block text-xs font-extrabold text-[#0066FF] mt-1">
                        {achiever.score}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base leading-tight">{achiever.name}</h4>
                    <p className="text-[11px] font-semibold text-slate-600 mt-0.5">{achiever.school}</p>
                    <p className="text-[10px] font-bold text-slate-400">{achiever.grade}</p>
                  </div>

                  <span className="inline-block text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    ★ {achiever.badge}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-200/80 pt-2.5">
                    &ldquo;{achiever.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-1.5 text-[11px] text-slate-500 font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Top Ranker</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              CLEAR DOUBTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white shadow-2xs"
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

      {/* 9. MOBILE-FIRST STICKY BOTTOM REGISTRATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black text-[#0066FF] uppercase">
            ETHEX 2026 • PHASE 2
          </span>
          <span className="block text-xs font-black text-slate-900">
            Exam: 29 Nov 2026
          </span>
        </div>
        <Link
          href="/student/register"
          className="px-5 py-2.5 bg-[#0066FF] text-white font-extrabold text-xs rounded-xl shadow-md active:scale-98"
        >
          Register Free
        </Link>
      </div>

      {/* MODAL: OFFICIAL BROCHURE / POSTER FULL-SCREEN PREVIEW */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700">Official ETHEX Notice / Pamphlet</span>
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
              <img
                src={selectedPoster}
                alt="Official ETHEX Brochure"
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <a
                href={selectedPoster}
                download
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Save Image
              </a>
              <Link
                href="/student/register"
                className="px-5 py-2 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm"
              >
                Register for Free
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SYLLABUS & SAMPLE PAPER */}
      {samplePaperModalClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase">
                  OFFICIAL CURRICULUM
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  {samplePaperModalClass} — Syllabus & Blueprint
                </h3>
              </div>
              <button
                onClick={() => setSamplePaperModalClass(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <p className="font-bold text-[#0066FF]">Exam Specification:</p>
                <p className="text-slate-600 mt-1">60 MCQs • 240 Marks • Duration: 60 Minutes</p>
                <p className="text-slate-600">Marking: +4 for correct answer, -1 for wrong answer.</p>
              </div>

              <div>
                <p className="font-bold text-slate-800 mb-1">Subjects Covered:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>Physics & Chemistry (Conceptual NCERT standard)</li>
                  <li>Mathematics / Biology (Specialized track)</li>
                  <li>Mental Ability, Logical Reasoning & Space Science Aptitude</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  alert(`Sample paper for ${samplePaperModalClass} is downloaded.`);
                  setSamplePaperModalClass(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Practice PDF
              </button>
              <Link
                href={`/student/register?class=${encodeURIComponent(samplePaperModalClass)}`}
                className="px-4 py-2 bg-[#0066FF] text-white rounded-xl text-xs font-black shadow-sm hover:bg-blue-700"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INVITE ETHEX IN YOUR SCHOOL */}
      {schoolModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-800 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 uppercase">
                  INSTITUTIONAL COLLABORATION
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Invite ETHEX in Your School
                </h3>
              </div>
              <button
                onClick={() => {
                  setSchoolModalOpen(false);
                  setSchoolFormSubmitted(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {schoolFormSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-slate-900">
                  Inquiry Received Successfully!
                </h4>
                <p className="text-xs text-slate-600">
                  Our EURO Campus school relationship team will get in touch with your principal/coordinator within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSchoolModalOpen(false);
                    setSchoolFormSubmitted(false);
                  }}
                  className="px-5 py-2 bg-[#0066FF] text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSchoolFormSubmitted(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    School / College Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Euro International School"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Person & Designation *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Principal / Academic Head"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune, PCMC, Shirur"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Students (Classes 7–12)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 250"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-600 bg-slate-50 font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit School Collaboration Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
