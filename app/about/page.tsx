import React from 'react';
import CombinedBrandLogo from '@/components/branding/CombinedBrandLogo';
import { Award, Compass, GraduationCap, Building, ShieldCheck, CheckCircle2, Rocket, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About ETHEX 2026 & EURO Campus | Premier Coaching & Talent Search',
  description:
    'Learn about EURO Campus, our academic mission, leadership, world-class campuses at PCMC and Shikrapur, and the ETHEX 2026 talent search initiative.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Unit */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            About The Institution & Examination
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            Shaping India’s Future Scientists, Engineers & Doctors
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            EURO Campus is an elite educational institution committed to conceptual rigor, competitive excellence,
            and value-based academic mentorship for Foundation, JEE, NEET, and MHT-CET aspirants.
          </p>
        </div>

        {/* Institution Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-euro-royal flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-euro-navy text-lg">Academic Rigor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curriculum crafted by former IITians and veteran doctor faculties focusing on deep conceptual fundamentals rather than superficial rote memorization.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-euro-navy text-lg">Science Exposure (ISRO)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We believe in inspiring scientific dreams. High performers in ETHEX earn a fully sponsored trip to visit ISRO facilities to observe space science firsthand.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-euro-navy text-lg">Scholarships for Merit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A commitment of ₹2.5 Crores in scholarship opportunities ensures that financial constraints never hinder brilliant students from accessing premier coaching.
            </p>
          </div>
        </div>

        {/* The ETHEX Vision */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              The Genesis of ETHEX
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">
              EURO Talent Hunt Exam (ETHEX 2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              ETHEX was conceived as a non-discriminatory, pan-regional talent search initiative to identify analytical ability, logical acumen, and scientific passion among students across Classes 5 to 12.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Beyond traditional school examinations, ETHEX benchmarks students on competitive aptitude, critical thinking, and speed-accuracy balance required for national entrance examinations like JEE, NEET, and Olympiads.
            </p>
            <div className="pt-2">
              <Link
                href="/student/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
              >
                Register for Free <CheckCircle2 className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h4 className="font-bold text-euro-navy text-base">Key Pillars of EURO Campus</h4>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-euro-royal flex-shrink-0 mt-0.5" />
                <span><strong>Motto:</strong> &quot;मूल्यान्विताः अनुशासनेन उत्कर्षात् !&quot; — Achieving excellence through values and discipline.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-euro-royal flex-shrink-0 mt-0.5" />
                <span><strong>Campuses:</strong> State-of-the-art academic complexes located at PCMC (Pradhikaran) and Shikrapur (Pune-Nagar Road).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-euro-royal flex-shrink-0 mt-0.5" />
                <span><strong>Holistic Development:</strong> Integrated school-plus-coaching models ensuring students excel in board examinations while mastering competitive syllabi.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Campuses & Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-euro-navy text-lg">PCMC Campus (Pradhikaran)</h3>
              <Building className="w-5 h-5 text-euro-gold" />
            </div>
            <p className="text-xs text-slate-600">
              Sector 24, Near Spine Road, Pradhikaran, PCMC, Pune - 411044
            </p>
            <p className="text-xs text-slate-500">
              Specialized coaching hubs for JEE (Main & Advanced), NEET, MHT-CET, and Foundation Classes 8–10. Modern air-conditioned classrooms, testing lab, and library.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-euro-navy">
              <Phone className="w-3.5 h-3.5 text-euro-royal" />
              <span>Helpline: 9112223354</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-euro-navy text-lg">Shikrapur Campus (Academic Complex)</h3>
              <Building className="w-5 h-5 text-euro-gold" />
            </div>
            <p className="text-xs text-slate-600">
              Euro Campus Academic Complex, Pune-Nagar Highway, Shikrapur - 412208
            </p>
            <p className="text-xs text-slate-500">
              Expansive campus offering integrated junior college programs, doubt clearing counters, and Olympiad study cells.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-euro-navy">
              <Phone className="w-3.5 h-3.5 text-euro-royal" />
              <span>Helpline: 9607035688</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
