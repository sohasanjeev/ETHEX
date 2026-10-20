'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ShieldCheck,
  Building,
  GraduationCap,
} from 'lucide-react';
import { SiteSettings, Exam } from '@/lib/types';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';

export default function HomePage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [activeTab, setActiveTab] = useState<'foundation' | 'jee' | 'neet' | 'junior'>('foundation');
  const [posterModalOpen, setPosterModalOpen] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-euro-navy via-slate-900 to-euro-deep text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle background decorative grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Academic Year & Initiative Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-xs font-semibold text-blue-200">
                <span className="text-amber-400 font-bold">
                  For Academic Year {settings?.academic_year || '2027–2028'}
                </span>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="hidden sm:inline">A Prestigious School-Level Talent & Science Initiative</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Discover Your Potential.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                    Earn Your Opportunity.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Participate in <strong>{settings?.exam_name || 'ETHEX 2026'}</strong>, the official{' '}
                  <span className="text-amber-300 font-medium">EURO TALENT HUNT EXAM</span> by{' '}
                  <strong>EURO Campus</strong>. Take the decisive step towards academic excellence with guaranteed
                  mentorship and admissions scholarships.
                </p>
              </div>

              {/* ISRO Educational Tour Highlight Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-blue-900/40 to-amber-500/10 border-l-4 border-amber-400 p-4 rounded-r-xl backdrop-blur-sm shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-400 text-euro-dark rounded-lg flex-shrink-0">
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-amber-300 text-base sm:text-lg tracking-wide uppercase">
                      {settings?.isro_tour_tagline || 'Top Performers Can Earn an ISRO Educational Tour'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200">
                      Fully sponsored science exposure trip for high achievers to visit India’s premier space agency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prize & Scholarship Metric Cards (Directly derived from the Flyer) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center shadow-md hover:border-amber-400/50 transition-colors">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Admission Scholarships</p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {settings?.admission_scholarship_pool || '₹2.5 CRORES'}
                  </p>
                  <p className="text-[10px] text-slate-400">Total Scholarship Pool</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center shadow-md hover:border-amber-400/50 transition-colors">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Cash Prizes</p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {settings?.cash_prize_pool || '₹10 Lacs'}
                  </p>
                  <p className="text-[10px] text-slate-400">Stage-2 Cash Rewards</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 text-center shadow-md hover:border-amber-400/50 transition-colors">
                  <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Fee Waivers</p>
                  <p className="text-2xl font-black text-white mt-0.5">
                    {settings?.max_scholarship_percentage || 'Upto 90%'}
                  </p>
                  <p className="text-[10px] text-slate-400">In EURO Campus Admission</p>
                </div>
              </div>

              {/* Exam Date Notification Badge */}
              <div className="bg-slate-800/90 border border-blue-400/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-euro-gold" />
                  <span className="font-semibold text-slate-200">
                    Exam Date Status:
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-900 text-blue-200 font-bold border border-blue-600">
                    {settings?.exam_date_display || 'To Be Announced Soon'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 italic">
                  Registrations actively accepted across all categories
                </span>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href="/student/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-euro-dark font-extrabold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                >
                  Register for ETHEX 2026
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/scholarships"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 hover:border-slate-500 transition-all"
                >
                  Explore Scholarships
                </Link>
                <Link
                  href="/exam-details"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-blue-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  Exam Pattern & Syllabus
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Poster & Flyer Asset */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-sm sm:max-w-md bg-slate-800/90 p-2 sm:p-3 rounded-2xl border-2 border-amber-400/30 shadow-2xl overflow-hidden hover:border-amber-400 transition-all">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden cursor-pointer" onClick={() => setPosterModalOpen(true)}>
                  <Image
                    src="/branding/ethex_official_poster.jpg"
                    alt="ETHEX 2026 EURO Talent Hunt Exam Official Flyer"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-amber-300 bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-400/40">
                      Click to view full official flyer
                    </span>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <p className="text-xs text-slate-300 font-medium">
                    Official Announcement Flyer for Academic Year {settings?.academic_year || '2027–2028'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Foundation • JEE • NEET • MHT-CET
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY HIGHLIGHTS STRIP */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-euro-royal font-extrabold text-2xl sm:text-3xl">5th–12th</span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Eligible School Classes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-euro-gold font-extrabold text-2xl sm:text-3xl">Online & Offline</span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Flexible Exam Modes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-euro-royal font-extrabold text-2xl sm:text-3xl">Free Registration</span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Accessible to Every Student</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-600 font-extrabold text-2xl sm:text-3xl">ISRO Tour</span>
            <span className="text-xs font-semibold text-slate-600 mt-1">Top Achievers Incentive</span>
          </div>
        </div>
      </section>

      {/* 3. EXAMINATION CATEGORIES & STREAMS */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Targeted Academic Streams
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-euro-navy">
              Tailored Examinations for Every Aspirant
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              ETHEX 2026 provides scientifically designed question papers calibrated to the curriculum and future aspirations of each age cohort.
            </p>
          </div>

          {/* Stream Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'foundation', label: 'Classes 9 & 10 Foundation' },
              { id: 'junior', label: 'Classes 5 to 8 Middle School' },
              { id: 'jee', label: 'Class 11 & 12 JEE (Engineering)' },
              { id: 'neet', label: 'Class 11 & 12 NEET (Medical)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-euro-navy text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content Card */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
            {activeTab === 'foundation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-euro-navy">Foundation (Classes 9 & 10)</h3>
                    <p className="text-xs text-slate-500">Preparing future toppers for competitive engineering, medical, and NTSE streams</p>
                  </div>
                  <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    90 Mins • 50 MCQs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">Subjects Tested:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Physics (Motion, Forces, Gravitation, Electricity)</li>
                      <li>Chemistry (Matter, Chemical Reactions, Acids & Bases)</li>
                      <li>Mathematics (Algebra, Geometry, Trigonometry)</li>
                      <li>Mental Ability & Logical Reasoning</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-900">Scholarship Privileges:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Upto 90% Scholarship in 2-Year Foundation Course
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Selection for ISRO Educational Science Visit
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Stage-2 Cash Awards for Top 10 Rankers
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'junior' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-euro-navy">Middle School Talent Search (Classes 5 to 8)</h3>
                    <p className="text-xs text-slate-500">Nurturing curiosity, foundational math acumen, and scientific analytical temperament</p>
                  </div>
                  <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    60 Mins • 40 MCQs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">Subjects Tested:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>General Science (Everyday Physics, Nature, Living Organisms)</li>
                      <li>Basic Mathematics & Number Sense</li>
                      <li>Visual & Non-Verbal Puzzles</li>
                      <li>Curiosity & Aptitude Assessment</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-900">Junior Benefits:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Young Scientist Certificates of Merit
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Up to 90% Fee Waiver in EURO Campus Junior Batches
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Direct Invitation to ISRO Exposure Tour
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jee' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-euro-navy">JEE Main + Advanced (Classes 11 & 12)</h3>
                    <p className="text-xs text-slate-500">Engineered for IIT-JEE aspirants seeking elite batch placement and scholarships</p>
                  </div>
                  <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    120 Mins • 60 MCQs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">Subjects & Pattern:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Physics (Mechanics, Thermodynamics, Electrostatics)</li>
                      <li>Chemistry (Physical, Organic, Inorganic)</li>
                      <li>Mathematics (Calculus, Coordinate Geometry, Vectors)</li>
                      <li>Marking: +4 for correct, -1 for incorrect</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-900">JEE Scholarship Package:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Admission to EURO Campus Super-30 Intensive JEE Batch
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> 90% Scholarship in Comprehensive Coaching
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Special Mentorship by IIT Alumni Faculty
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'neet' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-euro-navy">NEET Medical Aspirants (Classes 11 & 12)</h3>
                    <p className="text-xs text-slate-500">Targeting top national medical colleges (AIIMS, JIPMER, Government Medical Colleges)</p>
                  </div>
                  <span className="text-xs font-bold text-euro-royal bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    120 Mins • 60 MCQs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">Subjects & Pattern:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Physics (Kinematics, Optics, Modern Physics)</li>
                      <li>Chemistry (Equilibrium, Biomolecules, Coordination)</li>
                      <li>Biology (Botany & Zoology NCERT Conceptual Questions)</li>
                      <li>Marking: +4 for correct, -1 for incorrect</li>
                    </ul>
                  </div>
                  <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-900">NEET Scholarship Package:</p>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> 90% Admission Scholarship for NEET Yearlong Batches
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Dedicated NCERT Speed-Booster Sessions
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Medical Doctor Guidance & Doubts Clinics
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <Link
                href="/student/register"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-euro-royal hover:text-euro-navy"
              >
                Apply for this category now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW ETHEX WORKS (Step-by-Step Journey) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Candidate Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-euro-navy">
              Simple 5-Step Examination Journey
            </h2>
            <p className="text-slate-600 text-sm">
              From online registration to admit cards, testing, and scholarship admissions at EURO Campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12 relative">
            {[
              {
                step: '01',
                title: 'Register Profile',
                desc: 'Create student account with name, current class, contact details, and school.',
              },
              {
                step: '02',
                title: 'Choose Exam & Mode',
                desc: 'Select your grade category and choose convenient Online or Offline centre mode.',
              },
              {
                step: '03',
                title: 'Download Admit Card',
                desc: 'Generate official admit card with photo, verified roll number, QR code & venue.',
              },
              {
                step: '04',
                title: 'Take Examination',
                desc: 'Appear for the MCQ test via our proctored engine or at authorized EURO Campus centres.',
              },
              {
                step: '05',
                title: 'Results & Award',
                desc: 'Access verified scorecards, national rankings, ISRO Tour eligibility, and fee waivers.',
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-euro-royal/30 font-mono">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-euro-navy mt-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center text-[11px] font-semibold text-euro-royal">
                  <span>Step {index + 1} of 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAMPUS CENTRES & HELPLINES */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-euro-gold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700/50">
                Official Examination Centres
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Appear Offline at Premier EURO Campus Facilities
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Experience world-class testing infrastructure with biometric attendance, verified invigilation, and student assistance at our flagship campuses in Maharashtra.
              </p>
              <div className="pt-2">
                <Link
                  href="/centres"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition-colors"
                >
                  View All Test Centres <ArrowRight className="w-3.5 h-3.5 text-euro-gold" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PCMC Campus Card */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-blue-200 uppercase">
                    Centre Code: EC-PCMC
                  </span>
                  <Building className="w-4 h-4 text-euro-gold" />
                </div>
                <h3 className="font-bold text-white text-base">EURO Campus — PCMC</h3>
                <p className="text-xs text-slate-400">
                  Sector 24, Near Spine Road, Pradhikaran, PCMC, Pune - 411044
                </p>
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Direct Helpline:</span>
                  <a
                    href={`tel:${settings?.helpline_pcmc || '9112223354'}`}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    {settings?.helpline_pcmc || '9112223354'}
                  </a>
                </div>
              </div>

              {/* Shikrapur Campus Card */}
              <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-900 text-blue-200 uppercase">
                    Centre Code: EC-SHIK
                  </span>
                  <Building className="w-4 h-4 text-euro-gold" />
                </div>
                <h3 className="font-bold text-white text-base">EURO Campus — Shikrapur</h3>
                <p className="text-xs text-slate-400">
                  Euro Campus Academic Complex, Pune-Nagar Highway, Shikrapur - 412208
                </p>
                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Direct Helpline:</span>
                  <a
                    href={`tel:${settings?.helpline_shikrapur || '9607035688'}`}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    {settings?.helpline_shikrapur || '9607035688'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION STRIP */}
      <section className="bg-gradient-to-r from-euro-royal to-blue-800 py-12 px-4 sm:px-6 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Ready to Begin Your ETHEX 2026 Journey?
          </h2>
          <p className="text-blue-100 text-sm max-w-2xl mx-auto">
            Registrations are open for students of Classes 5 to 12. Complete your application now to secure your admit card and scholarship eligibility.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/student/register"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-euro-dark font-extrabold text-sm rounded-xl shadow-lg transition-transform active:scale-95"
            >
              Start Free Registration
            </Link>
            <Link
              href="/faqs"
              className="px-6 py-3 bg-blue-900/60 hover:bg-blue-900 text-white font-semibold text-sm rounded-xl border border-blue-400/30 transition-colors"
            >
              Read Frequently Asked Questions
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for full flyer inspection */}
      {posterModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPosterModalOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-slate-200">
              <span className="font-bold text-sm text-euro-navy">
                ETHEX 2026 — Official Examination Poster
              </span>
              <button
                onClick={() => setPosterModalOpen(false)}
                className="text-slate-500 hover:text-slate-800 text-xs font-bold px-2.5 py-1 rounded bg-slate-100"
              >
                Close ✕
              </button>
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src="/branding/ethex_official_poster.jpg"
                alt="ETHEX 2026 Official Poster Full"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
