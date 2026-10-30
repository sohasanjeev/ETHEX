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
  CreditCard,
  QrCode,
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import EthexLogo from '@/components/branding/EthexLogo';
import RegistrationPaymentModal from '@/components/payment/RegistrationPaymentModal';

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);

  // Streamlined 8-Class tabs strictly requested by user
  const [activePatternTab, setActivePatternTab] = useState<
    | 'class7'
    | 'class8'
    | 'class9'
    | 'class10'
    | 'jee_class11'
    | 'jee_class12'
    | 'neet_class11'
    | 'neet_class12'
  >('class10');

  // Modal states
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

  // Single featured ISRO pamphlet strictly kept as requested
  const isroPamphlet = {
    title: 'Top Performers Can Earn an ISRO Educational Tour',
    subtitle: 'Centre Details: PCMC & Shikrapur • Academic Year 2027–2028',
    file: '/posters/ethex_isro_tour_nov29.png',
    badge: 'OFFICIAL INITIATIVE',
  };

  // Pattern data strictly for the 8 classes requested
  const patternTabs = {
    class7: {
      name: 'Class 7',
      category: 'Class 7',
      target: 'Science & Mathematical Olympiads, Science Champ Foundation',
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
      name: 'JEE Mains + Advanced Class 11',
      category: 'JEE Mains + Advanced Class 11',
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
      name: 'JEE Mains + Advanced Class 12',
      category: 'JEE Mains + Advanced Class 12',
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
      name: 'Aarav Patil',
      school: 'Podar International School, PCMC',
      grade: 'Class 10',
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
      grade: 'JEE Mains + Advanced Class 11',
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
      grade: 'Class 9',
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
      grade: 'Class 11 NEET',
      rank: 'AIR 26',
      score: '218/240 Marks',
      badge: 'Cash Award Winner',
      quote: 'The Biology and Chemistry questions closely mirrored NCERT conceptual depth. Highly recommended for every serious medical aspirant!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=240&h=240&fit=crop&crop=face',
      initials: 'AJ',
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION: ALLEN TALLENTEX INSPIRED RESPONSIVE HERO & QUICK LEAD CARD */}
      <section className="px-3 sm:px-6 lg:px-8 pt-4 pb-8 max-w-7xl mx-auto w-full">
        {/* Mobile View: High-Impact Square Banner (Allen Tallentex Mobile Phone Style) */}
        <div className="block md:hidden relative rounded-3xl overflow-hidden border border-blue-200/90 shadow-lg bg-gradient-to-b from-[#0B1528] via-[#102447] to-[#0A1120] mb-6 aspect-square">
          <img
            src="/branding/ethex_tallentex_landscape_hero.png"
            alt="ETHEX 2026 Mobile Showcase"
            className="w-full h-full object-cover object-left"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-5 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-xs text-[11px] font-black tracking-wider uppercase w-fit mb-1.5 border border-blue-400/40 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CLASSES 7 TO 12 • JEE / NEET</span>
            </div>
            <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">
              Win Up to 90% Scholarship & ISRO Space Tour
            </h3>
            <div className="flex items-center gap-2 mt-2.5 text-xs">
              <span className="bg-amber-400 text-slate-950 font-black px-3 py-1.5 rounded-xl shadow-xs">
                ₹2.5 CR POOL
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white font-black px-3 py-1.5 rounded-xl border border-white/20">
                29th Nov 2026
              </span>
            </div>
          </div>
        </div>

        {/* Desktop View: Wide Landscape Showcase (Allen Tallentex Laptop Style) */}
        <div className="hidden md:block relative rounded-3xl overflow-hidden border border-blue-200/90 shadow-md bg-white mb-6">
          <img
            src="/branding/ethex_tallentex_landscape_hero.png"
            alt="ETHEX 2026 - Your Talent. Our Support. A Bigger Future."
            className="w-full h-auto object-cover max-h-[480px]"
          />
        </div>

        {/* Live Exam Countdown & Quick Pay Registration Widget (Allen Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 7 Columns: Value Highlights, Countdown & ISRO Incentive */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#EEF4FF] rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-blue-200 text-blue-900 font-extrabold text-xs shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="uppercase tracking-wider font-black">ACADEMIC YEAR 2027–2028</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0066FF] font-black uppercase">OFFICIAL TALENT HUNT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                Win Up to 90% Scholarship & Sponsored <span className="text-[#0066FF]">ISRO Space Tour</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
                Conducted by <strong>EURO CAMPUS</strong> for students of <strong>Classes 7 to 12</strong>. Comprehensive national benchmarking, Competitive Success Index (CSI), and direct fee waivers for JEE, NEET & Foundation.
              </p>
            </div>

            {/* Dashed Countdown Box to 29th November 2026 */}
            <div className="bg-white rounded-2xl p-4 border-2 border-dashed border-[#0066FF]/60 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066FF] flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    EXAM DATE
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    29th November 2026 (Sunday)
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Online CBT & Offline Campuses (PCMC & Shikrapur)</p>
                </div>
              </div>

              {/* Countdown Digits */}
              <div className="flex items-center gap-2 text-center">
                <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1 min-w-[44px]">
                  <span className="block text-base font-black">{timeLeft.days}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Days</span>
                </div>
                <span className="text-slate-400 font-bold">:</span>
                <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1 min-w-[44px]">
                  <span className="block text-base font-black">{timeLeft.hours}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Hrs</span>
                </div>
                <span className="text-slate-400 font-bold">:</span>
                <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1 min-w-[44px]">
                  <span className="block text-base font-black">{timeLeft.minutes}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Min</span>
                </div>
                <span className="text-slate-400 font-bold">:</span>
                <div className="bg-slate-900 text-white rounded-xl px-2.5 py-1 min-w-[44px]">
                  <span className="block text-base font-black">{timeLeft.seconds}</span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400">Sec</span>
                </div>
              </div>
            </div>

            {/* Quick Action Links: Mock CBT, Syllabus & Pamphlet Preview */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/student/exam/simulation"
                className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Try Online Mock CBT</span>
              </Link>

              <a
                href="#syllabus"
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm rounded-xl border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-[#0066FF]" />
                <span>View Syllabus</span>
              </a>

              <button
                onClick={() => setSelectedPoster(isroPamphlet.file)}
                className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs sm:text-sm rounded-xl border border-purple-200 shadow-2xs transition-all flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4 text-purple-600" />
                <span>ISRO Tour Notice</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Super Simple 3-Field Registration & Payment Gateway Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col justify-between">
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-[#0066FF] to-blue-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 flex items-center justify-between">
              <span>REGISTER FOR ETHEX 2026</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] px-2.5 py-0.5 rounded-full font-black">
                FAST REGISTRATION
              </span>
            </div>

            <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Quick Registration & Pay
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  3 simple details to complete registration and generate your admit card.
                </p>
              </div>

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
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="JEE Mains + Advanced Class 11">JEE Mains + Advanced Class 11</option>
                    <option value="JEE Mains + Advanced Class 12">JEE Mains + Advanced Class 12</option>
                    <option value="Class 11 NEET">Class 11 NEET</option>
                    <option value="Class 12 NEET">Class 12 NEET</option>
                  </select>
                </div>

                {/* Terms Consent */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-500">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                    />
                    <span>
                      I agree to terms & to receive exam updates on WhatsApp / SMS.
                    </span>
                  </label>
                </div>

                {/* Direct Pay Now Button (Triggers Instant Payment Gateway Modal) */}
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

      {/* 2. VALUE PROPOSITION: 4 KEY PILLARS */}
      <section className="py-12 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              WHY APPEAR FOR ETHEX 2026?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Recognising Talent, Rewarding Excellence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Flagship talent hunt and scholarship examination organized by <strong>EURO CAMPUS</strong> for students of Classes 7–12.
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
                  KEY ATTRACTION
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  ISRO Educational Tour
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Selected national top performers earn an all-expenses-sponsored scientific study tour to premier ISRO satellite facilities.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-purple-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sponsored Educational Visit</span>
              </div>
            </div>

            {/* Card 2: 90% Scholarships */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-blue-400 transition-all card-hover-effect">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded">
                  ADMISSION FEE WAIVER
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Up to 90% Scholarship
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct fee waiver on EURO CAMPUS classroom coaching programs for Foundation, JEE Main + Advanced, and NEET-UG.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0066FF]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>₹2.5 Crore Scholarship Pool</span>
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
                  Cash prizes and honors awarded directly to high-achieving candidates and state rankers in Stage 2.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                <Award className="w-3.5 h-3.5" />
                <span>Stage-2 Merit Prizes</span>
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
                  Future Science Champ participation certificate, Pune University Certification Support, and deep subject-wise diagnostic report.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Official Certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYLLABUS & EXAM PATTERN BREAKDOWN (THE 8 CLEAN CLASSES) */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200" id="syllabus">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              CURRICULUM & PATTERN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Exam Pattern & Syllabus Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              60 Questions • 240 Marks • 60 Minutes • Marking Scheme: +4 for correct, -1 for incorrect response
            </p>
          </div>

          {/* Interactive Class Tabs: Exactly the 8 choices */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {(
              [
                'class7',
                'class8',
                'class9',
                'class10',
                'jee_class11',
                'jee_class12',
                'neet_class11',
                'neet_class12',
              ] as const
            ).map((tab) => (
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

            {/* Bottom Actions: View Syllabus Pamphlet & Download */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 font-medium">
                Marking Scheme: <strong className="text-slate-800">{currentPattern.marking}</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPoster(isroPamphlet.file)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-purple-600" />
                  <span>View Official Syllabus Pamphlet</span>
                </button>

                <button
                  onClick={() => setSamplePaperModalClass(currentPattern.name)}
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Download {currentPattern.name} PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SINGLE FEATURED ISRO STUDY TOUR PAMPHLET SHOWCASE (STRICTLY KEPT) */}
      <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200" id="isro-pamphlet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-xs font-extrabold text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
                OFFICIAL NOTICE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Official ETHEX ISRO Tour Notification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Authorised notification detailing the sponsored educational tour and scholarship criteria.
              </p>
            </div>

            <button
              onClick={() => setSchoolModalOpen(true)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-2xs flex items-center gap-2 transition-all"
            >
              <Users className="w-4 h-4 text-slate-950" />
              <span>Invite ETHEX in Your School</span>
            </button>
          </div>

          {/* Single Featured ISRO Pamphlet Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg p-4 sm:p-6 space-y-4">
            <div
              className="relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer group border border-slate-200"
              onClick={() => setSelectedPoster(isroPamphlet.file)}
            >
              <img
                src={isroPamphlet.file}
                alt={isroPamphlet.title}
                className="w-full h-auto object-contain max-h-[550px] mx-auto group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 bg-white text-slate-900 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-4 h-4 text-[#0066FF]" /> Click to Zoom Pamphlet
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div>
                <h4 className="font-black text-slate-900 text-base">{isroPamphlet.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{isroPamphlet.subtitle}</p>
              </div>

              <a
                href={isroPamphlet.file}
                download
                className="px-4 py-2 bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" /> Save Notice
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OFFLINE CAMPUSES & "INVITE ETHEX IN YOUR SCHOOL" SECTION */}
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
                <a href="tel:9607035688" className="font-extrabold text-[#0066FF] hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> 9607035688
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
              ETHEX Achievers & ISRO Tour Qualifiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Students who converted their ETHEX performance into top ranks and EURO Campus scholarships.
            </p>
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
                  alert(`Sample paper for ${samplePaperModalClass} is downloaded.`);
                  setSamplePaperModalClass(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Practice PDF
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
