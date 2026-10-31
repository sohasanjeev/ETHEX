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
  FileText,
  Award,
  PlayCircle,
  Zap,
  Eye,
  X,
  Send,
  FileCheck2,
  HelpCircle,
  CreditCard,
  QrCode,
  Share2,
  Copy,
  MessageCircle,
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import EthexLogo from '@/components/branding/EthexLogo';
import RegistrationPaymentModal from '@/components/payment/RegistrationPaymentModal';

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);

  // Target classes for ETHEX 2026 (Classes 8 to 12 only)
  const [activePatternTab, setActivePatternTab] = useState<
    | 'class8'
    | 'class9'
    | 'class10'
    | 'jee_class11'
    | 'neet_class11'
    | 'jee_class12'
    | 'neet_class12'
  >('class10');

  // Modal states
  const [syllabusModalImage, setSyllabusModalImage] = useState<string | null>(null);
  const [samplePaperModalClass, setSamplePaperModalClass] = useState<string | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [schoolModalOpen, setSchoolModalOpen] = useState(false);
  const [schoolFormSubmitted, setSchoolFormSubmitted] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Quick 3-Field Registration State (Allen Tallentex Style)
  const [quickMobile, setQuickMobile] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickClass, setQuickClass] = useState('Class 10');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

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

    // Listen to custom syllabus class selection events from Navbar dropdown
    const handleSelectPattern = (e: any) => {
      if (
        e.detail &&
        [
          'class7',
          'class8',
          'class9',
          'class10',
          'jee_class11',
          'jee_class12',
          'neet_class11',
          'neet_class12',
        ].includes(e.detail)
      ) {
        setActivePatternTab(e.detail);
        const el = document.getElementById('syllabus');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('ethex-select-pattern', handleSelectPattern);

    // Also check query params if arrived from external page with ?tab=...
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (
        tabParam &&
        [
          'class7',
          'class8',
          'class9',
          'class10',
          'jee_class11',
          'jee_class12',
          'neet_class11',
          'neet_class12',
        ].includes(tabParam)
      ) {
        setActivePatternTab(tabParam as any);
        setTimeout(() => {
          const el = document.getElementById('syllabus');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('ethex-select-pattern', handleSelectPattern);
    };
  }, []);

  const handleQuickPaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      alert('Please accept terms & conditions to proceed');
      return;
    }
    if (!quickMobile || quickMobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!quickName.trim()) {
      alert('Please enter student full name');
      return;
    }
    // Open instant payment gateway modal
    setPaymentModalOpen(true);
  };

  const handleShareWhatsApp = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ethex2026.vercel.app';
    const text = `🎯 Appear for ETHEX 2026 (Euro Talent Hunt Exam) conducted by EURO CAMPUS!\n\n✨ Win up to 90% Scholarship on JEE / NEET / MHT-CET Coaching\n🚀 All-Expenses Sponsored ISRO Educational Tour\n🏆 ₹2.5 Crore Scholarship Pool & ₹10 Lakh Cash Prizes\n📅 Exam Date: Sunday, 29th November 2026\n\nRegister online in 2 minutes: ${origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyShareLink = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ethex2026.vercel.app';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(origin).then(() => {
        setCopiedShareLink(true);
        setTimeout(() => setCopiedShareLink(false), 3000);
      });
    }
  };

  const handleNativeShare = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ethex2026.vercel.app';
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'ETHEX 2026 - EURO Talent Hunt Examination',
        text: 'Appear for ETHEX 2026 by EURO CAMPUS! Win up to 90% Scholarship and an ISRO Educational Tour.',
        url: origin,
      }).catch(() => {});
    } else {
      handleCopyShareLink();
    }
  };

  const handleDownloadSyllabus = (className?: string) => {
    if (settings?.syllabus_pamphlet_url) {
      window.open(settings.syllabus_pamphlet_url, '_blank');
    } else {
      setSamplePaperModalClass(className || currentPattern.name);
    }
  };

  // Pattern data for target classes (Classes 8 to 12 only)
  const patternTabs = {
    class8: {
      name: 'Class 8',
      category: 'Class 8',
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
      category: 'Class 9',
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
      category: 'Class 10',
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
    jee_class11: {
      name: 'Class 11 JEE (Main + Advanced)',
      category: 'Class 11 JEE (Main + Advanced)',
      target: 'IIT-JEE Main + Advanced 2028, MHT-CET Engineering, BITSAT',
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
    jee_class12: {
      name: 'Class 12 JEE (Main + Advanced)',
      category: 'Class 12 JEE (Main + Advanced)',
      target: 'IIT-JEE Main + Advanced 2027, Engineering Ranks & Scholarships',
      subjects: [
        { name: 'Physics', qs: 20, marks: 80, syllabus: 'Electrostatics, Current Electricity, Magnetism, Optics, Modern Physics' },
        { name: 'Chemistry', qs: 20, marks: 80, syllabus: 'Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, Organic Reactions' },
        { name: 'Mathematics', qs: 20, marks: 80, syllabus: 'Integrals, Differential Equations, Vectors & 3D Geometry, Probability, Matrices' },
      ],
      totalQs: 60,
      totalMarks: 240,
      duration: '60 Minutes',
      marking: '+4 for correct, -1 for wrong response',
    },
    neet_class11: {
      name: 'Class 11 NEET',
      category: 'Class 11 NEET',
      target: 'NEET-UG 2028, AIIMS, Medical Merit Seats',
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
    neet_class12: {
      name: 'Class 12 NEET',
      category: 'Class 12 NEET',
      target: 'NEET-UG 2027, Top Medical Colleges & EURO Scholarships',
      subjects: [
        { name: 'Physics', qs: 15, marks: 60, syllabus: 'Electromagnetism, Optics, Dual Nature of Matter, Atoms & Nuclei, Semiconductor Electronics' },
        { name: 'Chemistry', qs: 15, marks: 60, syllabus: 'Solid State, Solutions, Biomolecules, Polymers, Organic Chemistry Synthesis' },
        { name: 'Biology (Botany & Zoology)', qs: 30, marks: 120, syllabus: 'Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, Ecology' },
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
      name: 'Tanishka Temgire',
      school: 'EURO Campus Pune',
      grade: 'Class 10 Foundation',
      rank: 'AIR 1 (ISRO Tour)',
      score: '238/240 Marks',
      badge: 'ISRO Study Tour Winner',
      quote: 'EURO Campus gave me the platform to pursue space science and achieve the dream ISRO visit!',
      image: '/branding/toppers/tanishka_temgire.jpg',
      initials: 'TT',
    },
    {
      name: 'Aryan Bhujbal',
      school: 'EURO Campus Scholar',
      grade: 'Class 9 Foundation',
      rank: 'AIR 3 (ISRO Tour)',
      score: '234/240 Marks',
      badge: '90% Tuition Scholarship',
      quote: 'The questions tested deep analytical ability. EURO Campus teachers made complex concepts simple.',
      image: '/branding/toppers/aryan_bhujbal.jpg',
      initials: 'AB',
    },
    {
      name: 'Shardul Gawari',
      school: 'EURO Campus Shikrapur',
      grade: 'Class 8 Foundation',
      rank: 'AIR 5 (ISRO Tour)',
      score: '231/240 Marks',
      badge: 'ISRO Educational Visit Qualifier',
      quote: 'Preparing for ETHEX gave me immense confidence in Mental Ability and Physics.',
      image: '/branding/toppers/shardul_gawari.jpg',
      initials: 'SG',
    },
    {
      name: 'Siddharth Bhosale',
      school: 'EURO Campus PCMC',
      grade: 'Class 10 Foundation',
      rank: 'AIR 8 (ISRO Tour)',
      score: '228/240 Marks',
      badge: 'ISRO Educational Visit Qualifier',
      quote: 'EURO Campus mock tests mirror the exact national competitive standard!',
      image: '/branding/toppers/siddharth_bhosale.jpg',
      initials: 'SB',
    },
  ];

  const [championsList, setChampionsList] = useState(achievers);

  useEffect(() => {
    fetch('/api/results/champions')
      .then((r) => r.json())
      .then((data) => {
        if (data?.champions && data.champions.length > 0) {
          setChampionsList(
            data.champions.map((c: any) => ({
              name: c.student_name,
              school: c.school || 'EURO Campus Scholar',
              grade: c.target_class || c.exam_name,
              rank: c.rank,
              score: c.score || '230/240 Marks',
              badge: c.award || 'Scholarship Awardee',
              quote: c.quote || 'EURO Campus mentors gave me the winning competitive edge.',
              image:
                c.photo_url ||
                'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&h=240&fit=crop&crop=face',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const faqs = [
    {
      q: 'Who is eligible to appear for ETHEX 2026?',
      a: 'ETHEX 2026 is strictly conducted for students of Class 7, Class 8, Class 9, Class 10, JEE Mains + Advanced Class 11/12, and Class 11/12 NEET.',
    },
    {
      q: 'What is the date and mode of the examination?',
      a: 'The examination is scheduled on Sunday, 29th November 2026. Students can appear either Online (CBT from home on laptop/phone) or Offline at authorized EURO Campus centres (PCMC or Shikrapur).',
    },
    {
      q: 'How does the registration process work?',
      a: 'Registration is extremely simple just like Allen Tallentex: enter your 10-digit mobile number, student name, and target class, then click Pay Now to complete registration via UPI QR, Card, or NetBanking. You receive instant admit card access.',
    },
    {
      q: 'What are the rewards and scholarships?',
      a: 'Top performers qualify for an all-expenses-sponsored educational ISRO Study Tour, up to 90% admission scholarships on EURO Campus courses from a ₹2.5 Crore scholarship pool, and ₹10 Lakhs in Stage-2 cash prizes.',
    },
    {
      q: 'What is the examination pattern and marking scheme?',
      a: '60 Questions | 240 Marks | 60 Minutes Duration. Marking scheme: +4 marks for each correct response, -1 mark penalty for incorrect response, and 0 for unattempted questions.',
    },
    {
      q: 'How can schools collaborate to host ETHEX on campus?',
      a: 'Under our "Invite ETHEX in Your School" program, school principals and institutional coordinators can invite EURO Campus to conduct the test on their premises with complete logistical and certification support.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white w-full max-w-full overflow-x-hidden">
      {/* 1. FRONT BANNER: DESKTOP LANDSCAPE & MOBILE SQUARE (100% REAL SIZE, FULL FLAGS, NO CUT-OFF) */}
      <section className="bg-gradient-to-b from-[#060D1E] via-[#09152E] to-[#0D1D3A] pt-4 pb-6 px-3 sm:px-6 lg:px-8 border-b border-blue-900/40 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-blue-500/30 bg-slate-900 cursor-pointer group w-full">
            {/* Desktop Landscape Banner (Real Size Display, 100% Full Flags, No Cut-off) */}
            <img
              src={settings?.hero_banner_desktop_url || "/branding/hero_landscape_banner.png"}
              alt="ETHEX 2026 - EURO Talent Hunt Examination"
              className="hidden md:block w-full h-auto object-contain group-hover:scale-[1.004] transition-transform duration-300"
              onClick={() => {
                const reg = document.getElementById("register");
                if (reg) reg.scrollIntoView({ behavior: "smooth" });
                else setPaymentModalOpen(true);
              }}
            />
            {/* Mobile Phone Square Banner (Real Size Display, No Cut-off) */}
            <img
              src={settings?.hero_banner_mobile_url || "/branding/ethex_tallentex_square_hero.png"}
              alt="ETHEX 2026 - EURO Talent Hunt Examination"
              className="block md:hidden w-full h-auto max-w-full object-contain group-hover:scale-[1.005] transition-transform duration-300"
              onClick={() => {
                const reg = document.getElementById("register");
                if (reg) reg.scrollIntoView({ behavior: "smooth" });
                else setPaymentModalOpen(true);
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. EURO • ETHEX: WHAT IS ETHEX & WHY TO PARTICIPATE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D1D3A] via-[#09152E] to-[#060D1E] text-white py-12 sm:py-16 border-b border-blue-900/40" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>EURO TALENT HUNT EXAMINATION • ETHEX 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              ETHEX 2026 <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                Euro Talent Hunt Examination
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              Flagship national talent examination conducted by <strong className="text-white">EURO CAMPUS</strong> for ambitious students of <strong className="text-amber-300">Classes 8 to 12</strong>. Comprehensive benchmarking, Competitive Success Index (CSI), and up to 90% fee waivers for JEE, NEET & Foundation.
            </p>
          </div>

          {/* 4 Allen Tallentex Benefit Badges (Why to Participate) */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-xs font-black text-amber-300 tracking-wider uppercase">
                ★ WHY TO PARTICIPATE IN ETHEX 2026? ★
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl space-y-2 hover:border-amber-400/50 transition-all card-hover-effect">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-black">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-amber-400 font-black text-xl">Up to 90% Scholarship</div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  Direct admission fee waivers across all EURO Campus classroom courses from a ₹2.5 Cr pool.
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl space-y-2 hover:border-purple-400/50 transition-all card-hover-effect">
                <div className="w-10 h-10 rounded-xl bg-purple-400/20 text-purple-300 flex items-center justify-center font-black">
                  <Rocket className="w-5 h-5" />
                </div>
                <div className="text-purple-300 font-black text-xl">ISRO Educational Tour</div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  National top performers qualify for an all-expenses-sponsored educational tour to ISRO satellite centres.
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl space-y-2 hover:border-emerald-400/50 transition-all card-hover-effect">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-black">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-emerald-400 font-black text-xl">₹10 Lakh Cash Prizes</div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  State rankers and merit toppers earn direct monetary honors and academic excellence awards.
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-5 rounded-2xl space-y-2 hover:border-blue-400/50 transition-all card-hover-effect">
                <div className="w-10 h-10 rounded-xl bg-sky-400/20 text-sky-300 flex items-center justify-center font-black">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div className="text-sky-400 font-black text-xl">CSI Diagnostic Report</div>
                <div className="text-xs text-slate-300 leading-relaxed font-medium">
                  Detailed subject-wise Competitive Success Index, time analysis, and Pune University Certification support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ONLINE REGISTRATIONS ONLY: REGISTER FOR ETHEX (3-FIELD QUICK PORTAL + LIVE COUNTDOWN) */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200" id="register">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              ONLINE REGISTRATIONS ONLY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Register for ETHEX 2026
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Join thousands of students across India. Instant admit card and roll number generation in 2 minutes.
            </p>
          </div>

          {/* Dynamic Live Countdown Box */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/40 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded w-fit border border-amber-400/30">
                  EXAM DATE
                </div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">
                  Sunday, 29th November 2026
                </div>
                <div className="text-xs text-slate-300">
                  Online CBT & Offline Test Centres (PCMC & Shikrapur)
                </div>
              </div>
            </div>

            {/* 4 Animated Digits */}
            <div className="flex items-center gap-2 text-center">
              <div className="bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3 py-1.5 min-w-[50px] shadow-inner">
                <span className="block text-lg font-black text-amber-300">{timeLeft.days}</span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400">Days</span>
              </div>
              <span className="text-amber-300 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3 py-1.5 min-w-[50px] shadow-inner">
                <span className="block text-lg font-black text-amber-300">{timeLeft.hours}</span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400">Hrs</span>
              </div>
              <span className="text-amber-300 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3 py-1.5 min-w-[50px] shadow-inner">
                <span className="block text-lg font-black text-amber-300">{timeLeft.minutes}</span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400">Min</span>
              </div>
              <span className="text-amber-300 font-bold">:</span>
              <div className="bg-slate-900/90 border border-slate-700 text-white rounded-xl px-3 py-1.5 min-w-[50px] shadow-inner">
                <span className="block text-lg font-black text-amber-300">{timeLeft.seconds}</span>
                <span className="block text-[8px] uppercase tracking-wider text-slate-400">Sec</span>
              </div>
            </div>
          </div>

          {/* Center 3-Field Quick Registration Box */}
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden text-slate-900">
            <div className="bg-gradient-to-r from-[#0066FF] to-blue-700 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-200">
                  FAST REGISTRATION PORTAL
                </div>
                <div className="text-base font-black">Register for ETHEX 2026</div>
              </div>
              <span className="bg-amber-400 text-slate-950 text-xs px-3 py-1 rounded-full font-black shadow-xs">
                FEE: ₹100
              </span>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <form onSubmit={handleQuickPaySubmit} className="space-y-4">
                {/* 1. Mobile Number */}
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

                {/* 2. Student Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate name"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-medium"
                  />
                </div>

                {/* 3. Target Class (Strictly the 8 Clean Choices Requested) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Class <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={quickClass}
                    onChange={(e) => setQuickClass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0066FF] text-sm bg-slate-50 font-bold text-slate-800"
                  >
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11 JEE (Main + Advanced)">Class 11 JEE (Main + Advanced)</option>
                    <option value="Class 11 NEET">Class 11 NEET</option>
                    <option value="Class 12 JEE (Main + Advanced)">Class 12 JEE (Main + Advanced)</option>
                    <option value="Class 12 NEET">Class 12 NEET</option>
                  </select>
                </div>

                {/* Direct Pay Now Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-transform transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now & Register (₹100)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
                <span>Already registered?</span>
                <Link href="/student/login" className="font-extrabold text-[#0066FF] hover:underline">
                  Sign In via OTP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. SPREAD THE WORD: INVITE FRIENDS & INVITE EURO TO YOUR SCHOOL */}
      <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-100/70 px-2.5 py-0.5 rounded-full border border-blue-300">
                SPREAD THE WORD
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Invite Your Friends to Experience ETHEX
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-medium leading-relaxed">
                Empower your peers to benchmark their preparation nationally, compete for up to 90% scholarship, and qualify for an ISRO Educational Tour!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0">
              <button
                onClick={handleShareWhatsApp}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleCopyShareLink}
                className={"px-4 py-2.5 font-bold text-xs rounded-xl border transition-all flex items-center gap-2 " + (copiedShareLink ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs")}
              >
                {copiedShareLink ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNativeShare}
                className="p-2.5 bg-blue-100 hover:bg-blue-200 text-euro-royal rounded-xl border border-blue-200 transition-colors"
                title="Share via device options"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Institutional Collaboration Card: Invite EURO to Your School */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 rounded-3xl p-6 sm:p-8 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-amber-400">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white px-2.5 py-0.5 rounded-full">
                INSTITUTIONAL COLLABORATION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                Invite EURO to Your School
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-900/90 max-w-xl">
                Are you a School Principal or Coordinator? Invite EURO CAMPUS to host ETHEX 2026 on your campus with full logistical support, student rank analysis &amp; institutional recognition.
              </p>
            </div>
            <button
              onClick={() => setSchoolModalOpen(true)}
              className="px-6 py-3 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl flex items-center gap-2 flex-shrink-0 transition-transform active:scale-98"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Invite EURO to Your School</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2C. 4-STEP REGISTRATION PROCESS (EXACT ALLEN TALLENTEX REPLICA INFOGRAPHIC) */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              SIMPLE & FAST ONBOARDING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
              How to Register in 4 Easy Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              A hassle-free registration process designed so parents and students can register in less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0066FF] font-black text-sm flex items-center justify-center border border-blue-200">
                  01
                </div>
                <h4 className="font-black text-slate-900 text-base">Fill 3 Basic Details</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Enter your 10-digit mobile number, student full name, and select your target class from Classes 8 to 12.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-[#0066FF] flex items-center gap-1">
                <span>No lengthy forms</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 font-black text-sm flex items-center justify-center border border-purple-200">
                  02
                </div>
                <h4 className="font-black text-slate-900 text-base">Pay Nominal Fee</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Pay ₹100 registration fee using UPI QR code, Google Pay, PhonePe, Paytm, or Debit/Credit Card.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-purple-600 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Instant 1-Click Pay</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-sm flex items-center justify-center border border-emerald-200">
                  03
                </div>
                <h4 className="font-black text-slate-900 text-base">Get Admit Card</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Immediately receive your official ETHEX Roll Number and instant download access to your Admit Card.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Instant Download</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 font-black text-sm flex items-center justify-center border border-amber-200">
                  04
                </div>
                <h4 className="font-black text-slate-900 text-base">Appear for Exam</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Appear on 29th November 2026 Offline at EURO Campus (PCMC / Shikrapur) or Online CBT from home.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-amber-700 flex items-center gap-1.5 leading-snug">
                <Trophy className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <span>Get an ISRO educational trip as well as up to 90% scholarship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYLLABUS SECTION (CLASSES 8 TO 12 ONLY - OPENS IN NEW TAB ON CHROME) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="syllabus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              OFFICIAL SYLLABUS (CLASSES 8–12)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Exam Syllabus &amp; Template Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your class below. The complete official syllabus document / template will open directly in a new tab on your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { key: 'class8', label: 'Class 8', tag: 'Foundation', desc: 'Physics, Chemistry, Biology, Math & Mental Ability', color: 'blue' },
              { key: 'class9', label: 'Class 9', tag: 'Olympiad & Foundation', desc: 'Pre-Olympiad aptitude, NCERT foundations & Mental Ability', color: 'blue' },
              { key: 'class10', label: 'Class 10', tag: 'Boards & Foundation', desc: 'Board mastery, NTSE/Olympiad & early competitive prep', color: 'blue' },
              { key: 'jee_class11', label: 'Class 11 JEE (Main + Advanced)', tag: 'Engineering', desc: 'PCM curriculum mapped to JEE Main & Advanced patterns', color: 'indigo' },
              { key: 'neet_class11', label: 'Class 11 NEET', tag: 'Medical', desc: 'NCERT line-by-line Biology, Physics & Chemistry syllabus', color: 'emerald' },
              { key: 'jee_class12', label: 'Class 12 JEE (Main + Advanced)', tag: 'Engineering', desc: 'Complete 11th + 12th PCM concepts with advanced drills', color: 'indigo' },
              { key: 'neet_class12', label: 'Class 12 NEET', tag: 'Medical', desc: 'High-yield PCB topics, Botany, Zoology & mock patterns', color: 'emerald' },
            ].map((item) => {
              const defaultSyllabusMap: Record<string, string> = {
                class8: '/uploads/ethex_2027_class_8_syllabus.png',
                class9: '/uploads/ethex_2027_class_9_syllabus.png',
              };
              const fileUrl =
                settings?.syllabus_urls?.[item.key] ||
                settings?.syllabus_images?.[item.key] ||
                defaultSyllabusMap[item.key] ||
                `/branding/syllabus/${item.key}.svg`;
              return (
                <a
                  key={item.key}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-500 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer block text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ETHEX 2026</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100/70 text-euro-royal">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-euro-royal transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-200/60">
                    <div className="w-full py-2.5 px-3 rounded-xl bg-euro-royal group-hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Syllabus</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SAMPLE PAPER SECTION (CLASSES 8 TO 12 ONLY - OPENS IN NEW TAB ON CHROME) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200" id="sample-papers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
              OFFICIAL SAMPLE PAPERS (CLASSES 8–12)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              ETHEX Official Model Question Papers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Practice authentic question papers with actual exam marking scheme. Click below to open or download in a new tab.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { key: 'class8', label: 'Class 8', tag: 'Foundation', desc: 'Sample question paper covering Physics, Chemistry, Biology & IQ' },
              { key: 'class9', label: 'Class 9', tag: 'Olympiad & Foundation', desc: 'Model test paper for Pre-Olympiad, Science & Math' },
              { key: 'class10', label: 'Class 10', tag: 'Boards & Foundation', desc: 'ETHEX Class 10 full length model paper & answer keys' },
              { key: 'jee_class11', label: 'Class 11 JEE (Main + Advanced)', tag: 'Engineering', desc: 'Model paper based on JEE Main & Advanced difficulty' },
              { key: 'neet_class11', label: 'Class 11 NEET', tag: 'Medical', desc: 'Full length mock paper with 60 questions for NEET aspirants' },
              { key: 'jee_class12', label: 'Class 12 JEE (Main + Advanced)', tag: 'Engineering', desc: 'Intensive JEE paper covering complete 11th & 12th syllabus' },
              { key: 'neet_class12', label: 'Class 12 NEET', tag: 'Medical', desc: 'Actual NEET-UG format sample paper with Botany & Zoology' },
            ].map((item) => {
              const defaultSampleMap: Record<string, string> = {
                class8: '/uploads/ethex_2027_class_8_sample_paper.pdf',
                class9: '/uploads/ethex_2027_class_9_sample_paper.pdf',
                class10: '/uploads/ethex_2027_class_10_sample_paper.pdf',
                jee_class11: '/uploads/ethex_2027_class_11_sample_paper.pdf',
                neet_class11: '/uploads/ethex_2027_class_11_sample_paper.pdf',
              };
              const fileUrl =
                settings?.sample_paper_urls?.[item.key] ||
                defaultSampleMap[item.key] ||
                settings?.syllabus_urls?.[item.key] ||
                `/branding/syllabus/${item.key}.svg`;
              return (
                <a
                  key={item.key}
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-emerald-50/50 rounded-2xl border border-slate-200 hover:border-emerald-500 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer block text-left"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SAMPLE PAPER</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-200/60">
                    <div className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Sample Paper</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COURSES WE OFFER AT EURO CAMPUS (ALLEN CLASSROOM & ONLINE COURSES) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200" id="courses">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              PROGRAMS & ACADEMICS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Courses We Offer at EURO CAMPUS
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Flagship classroom coaching programs for Engineering, Medical & Foundation aspirants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course 1: JEE Main + Advanced */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all card-hover-effect flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    ENGINEERING
                  </span>
                  <span className="text-xs font-bold text-slate-400">Class 11, 12 & Droppers</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  JEE (Main & Advanced) Classroom Program
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Rigorous preparation covering Physics, Chemistry, and Advanced Mathematics. Daily practice problems (DPP), Computer-Based Testing (CBT), and faculty mentorship.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>2-Year Integrated / 1-Year Intensive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>All India Test Series with Percentile Ranks</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setQuickClass('JEE Mains + Advanced Class 11');
                  const reg = document.getElementById('register');
                  if (reg) reg.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] font-bold text-xs rounded-xl border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enrol via ETHEX Scholarship</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Course 2: NEET-UG */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 hover:border-emerald-400 transition-all card-hover-effect flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    MEDICAL
                  </span>
                  <span className="text-xs font-bold text-slate-400">Class 11, 12 & Repeaters</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  NEET-UG Medical Entrance Program
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  NCERT line-by-line decoding in Biology, formula application in Physics & Chemistry. Regular error-analysis sessions targeting 650+ in NEET.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Clinical NCERT-based question banks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>OMR & Online CBT Full-Length Mock Exams</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setQuickClass('Class 11 NEET');
                  const reg = document.getElementById('register');
                  if (reg) reg.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enrol via ETHEX Scholarship</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Course 3: MHT-CET */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 hover:border-purple-400 transition-all card-hover-effect flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    STATE PREMIER
                  </span>
                  <span className="text-xs font-bold text-slate-400">Class 12 & Droppers</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  MHT-CET & State Board Comprehensive
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Target COEP Tech, VJTI, and top Maharashtra government colleges with 99.5+ percentile speed-accuracy drills and State Textbook mastery.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>PCM & PCB Specialised Batches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>20+ Years Past MHT-CET Solved Papers</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setQuickClass('JEE Mains + Advanced Class 12');
                  const reg = document.getElementById('register');
                  if (reg) reg.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enrol via ETHEX Scholarship</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Course 4: Pre-Foundation */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all card-hover-effect flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    PRE-FOUNDATION
                  </span>
                  <span className="text-xs font-bold text-slate-400">Classes 8, 9 & 10</span>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  Pre-Foundation & Olympiad Program
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Early competitive aptitude, critical thinking, and Olympiad training (NSEJS, PRMO, NSO, IMO) along with strong school board foundations.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>School Curriculum + Olympiad Level Depth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Mental Ability & IQ Development</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setQuickClass('Class 10');
                  const reg = document.getElementById('register');
                  if (reg) reg.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Enrol via ETHEX Scholarship</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFLINE CAMPUSES & "INVITE ETHEX IN YOUR SCHOOL" SECTION */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="centres">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              AUTHORISED TEST CENTRES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              EURO Campus Offline Examination Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              AC exam halls with biometric check-in, verified invigilation, and student counselling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* PCMC Campus */}
            <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 card-hover-effect">
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
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Direct Helpline:</span>
                <a href="tel:9112223354" className="font-extrabold text-[#0066FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9112223354
                </a>
              </div>
            </div>

            {/* Shikrapur Campus */}
            <div className="bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-4 card-hover-effect">
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
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Direct Helpline:</span>
                <a href="tel:9112233995" className="font-extrabold text-[#0066FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +91 91122 33995
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROVEN ACHIEVERS / WALL OF FAME */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              SUCCESS STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              EURO CAMPUS Champions & ISRO Tour Qualifiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Students who converted their ETHEX performance and EURO Campus training into top ranks, NEET 650+ scores, and sponsored ISRO visits.
            </p>
          </div>

          {/* Featured Official Result Banner from eurocampus.in */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-500/20 flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                OFFICIAL NEET & ISRO SELECTIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                35 Govt. MBBS Selections & National ISRO Tour Qualifiers
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Celebrating outstanding excellence across Maharashtra! 7 students scored 600+ in NEET led by Mithilesh Shimpi (650/720) and Sulagna Triathy (632/720), alongside our national ISRO/NASA Educational Tour winners from Classes 8 to 10.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl font-black text-amber-300">35</span>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-semibold mt-0.5">Govt. MBBS</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl font-black text-amber-300">7</span>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-semibold mt-0.5">NEET 600+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 text-center">
                  <span className="text-2xl font-black text-amber-300">12+</span>
                  <p className="text-[10px] sm:text-xs text-blue-200 font-semibold mt-0.5">ISRO Winners</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950">
                <img
                  src="/branding/euro_result_banner.jpg"
                  alt="EURO CAMPUS NEET & ISRO Results Banner"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {championsList.map((achiever, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 card-hover-effect"
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

      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="faqs">
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
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50 shadow-2xs"
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
                  <div className="px-5 pb-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-200 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. MOBILE-FIRST STICKY BOTTOM REGISTRATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black text-[#0066FF] uppercase">
            ETHEX 2026
          </span>
          <span className="block text-xs font-black text-slate-900">
            29 Nov 2026 • Cl 7–12
          </span>
        </div>
        <button
          onClick={() => {
            const widget = document.querySelector('form');
            if (widget) widget.scrollIntoView({ behavior: 'smooth' });
            else setPaymentModalOpen(true);
          }}
          className="px-5 py-2.5 bg-[#0066FF] text-white font-extrabold text-xs rounded-xl shadow-md active:scale-98 flex items-center gap-1.5"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pay & Register</span>
        </button>
      </div>

      {/* MODAL: PAYMENT GATEWAY (UPI QR, CARD, NETBANKING) */}
      <RegistrationPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        studentName={quickName || 'Candidate'}
        studentPhone={quickMobile}
        studentClass={quickClass}
        amount={100}
        onSuccess={(app) => {
          // Success callback
        }}
      />

      {/* MODAL: ISRO TOUR PAMPHLET FULL-SCREEN PREVIEW */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 text-slate-800 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700">Official ETHEX ISRO Notice</span>
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
              <button
                onClick={() => {
                  setSelectedPoster(null);
                  setPaymentModalOpen(true);
                }}
                className="px-5 py-2 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm"
              >
                Register for ETHEX
              </button>
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
                  if (settings?.syllabus_pamphlet_url) {
                    window.open(settings.syllabus_pamphlet_url, '_blank');
                  } else {
                    alert(`Official syllabus and blueprint for ${samplePaperModalClass} is downloaded.`);
                  }
                  setSamplePaperModalClass(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#0066FF]" /> Download Official PDF
              </button>
              <button
                onClick={() => {
                  setSamplePaperModalClass(null);
                  setPaymentModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0066FF] text-white rounded-xl text-xs font-black shadow-sm hover:bg-blue-700"
              >
                Register Now
              </button>
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
                  Invite EURO to Your School
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
                      Estimated Students (Classes 8–12)
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

      {/* TEMPORARY FLOATING BADGE: INVITE EURO TO YOUR SCHOOL */}
      <button
        onClick={() => setSchoolModalOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-40 group flex items-center gap-2 px-3 sm:px-3.5 py-2 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 hover:from-blue-900 hover:to-indigo-900 text-white rounded-full shadow-2xl border border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-bold"
        title="Invite EURO to Your School"
      >
        <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px] shadow-xs flex-shrink-0">
          🏫
        </span>
        <span className="hidden sm:inline font-extrabold text-[11px] text-amber-300 tracking-tight">
          Invite EURO to your school
        </span>
        <span className="sm:hidden font-extrabold text-[10px] text-amber-300 tracking-tight">
          Invite EURO
        </span>
      </button>

      {/* MOBILE STICKY BOTTOM REGISTRATION BAR (ALLEN TALLENTEX MOBILE APP/WEB UX) */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060D1E]/95 backdrop-blur-md border-t border-blue-900/60 p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
              ETHEX 2026 • 29 NOV
            </div>
            <div className="text-xs font-black text-white">
              Fee: ₹100 <span className="text-slate-400 font-normal">| Up to 90% Scholarship</span>
            </div>
          </div>
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 flex-shrink-0 animate-bounce"
          >
            <span>Register Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
