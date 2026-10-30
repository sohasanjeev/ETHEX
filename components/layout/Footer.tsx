'use client';

import React from 'react';
import Link from 'next/link';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { ExternalLink, Phone, Mail, MapPin, Shield, Award, CheckCircle2, Building, GraduationCap, HelpCircle } from 'lucide-react';

interface FooterProps {
  officialEuroWebsiteUrl?: string;
  pcmcPhone?: string;
  shikrapurPhone?: string;
  officialEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  officialEuroWebsiteUrl = process.env.NEXT_PUBLIC_EURO_OFFICIAL_WEBSITE_URL || 'https://eurocampus.in/',
  pcmcPhone = '9112223354',
  shikrapurPhone = '9607035688',
  officialEmail = 'admissions@eurocampus.edu.in',
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Banner for School Collaboration */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 border-b border-amber-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-400/20 text-amber-400 rounded-xl border border-amber-400/30">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <p className="text-white font-extrabold text-sm sm:text-base">
                Invite ETHEX 2026 to Your School or Junior College
              </p>
              <p className="text-slate-400 text-xs">
                For institutional collaborations, student participation & on-campus exam hosting
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${pcmcPhone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              PCMC: {pcmcPhone}
            </a>
            <a
              href={`tel:${shikrapurPhone}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Shikrapur: {shikrapurPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <CombinedBrandLogo size="md" variant="card" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              ETHEX 2026 (EURO TALENT HUNT EXAM) is the flagship talent identification, diagnostic, and
              scholarship examination organized by EURO CAMPUS for students of Classes 7 to 12.
            </p>

            {/* Official EURO Campus Website Pill */}
            <div className="pt-2">
              <a
                href={officialEuroWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <span>Visit Official EURO Campus Website</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
              Examination
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exam-pattern" className="hover:text-amber-400 transition-colors font-medium">
                  Exam Pattern & Marking (+4/-1)
                </Link>
              </li>
              <li>
                <Link href="/#syllabus" className="hover:text-amber-400 transition-colors font-medium">
                  Syllabus Breakdown
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-amber-400 transition-colors font-medium">
                  Scholarships & Awards
                </Link>
              </li>
              <li>
                <Link href="/student/exam/simulation" className="hover:text-amber-400 transition-colors font-medium">
                  Online CBT Mock Simulator
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-amber-400 transition-colors font-medium">
                  Results & Scorecard
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-400 transition-colors font-medium">
                  Frequently Asked Questions (FAQs)
                </Link>
              </li>
            </ul>
          </div>

          {/* Student & Faculty Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
              Portals & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/student/register" className="hover:text-amber-400 transition-colors font-medium">
                  Register for ETHEX
                </Link>
              </li>
              <li>
                <Link href="/student/login" className="hover:text-amber-400 transition-colors font-medium">
                  Student Sign In (via OTP)
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  Download Admit Card
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>Examination Centres (PCMC & Shikrapur)</span>
                </Link>
              </li>
              <li>
                <Link href="/teacher" className="hover:text-amber-400 transition-colors font-medium flex items-center gap-1.5 text-slate-400">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Teacher Portal & Question Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Control Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Centres */}
          <div className="space-y-3">
            <h4 className="text-white font-black text-xs tracking-wider uppercase border-b border-slate-800 pb-2">
              Campus Test Centres
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">PCMC Centre:</strong> 4th Floor, above Vijay Sales, Empire Estate Phase-II, Chinchwad, Pune — 411019
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Shikrapur Centre:</strong> Kalamkar Vasti, Hivare Road, Shikrapur, Pune — 412208
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{officialEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policies Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} EURO CAMPUS. All rights reserved. ETHEX 2026 (Euro Talent Hunt Exam).
          </p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center font-medium">
            <Link href="/privacy-policy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-200 transition-colors">
              Refund & Cancellation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
