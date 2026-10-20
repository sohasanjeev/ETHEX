'use client';

import React from 'react';
import Link from 'next/link';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { ExternalLink, Phone, Mail, MapPin, Shield, Award, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  officialEuroWebsiteUrl?: string;
  pcmcPhone?: string;
  shikrapurPhone?: string;
  officialEmail?: string;
}

export const Footer: React.FC<FooterProps> = ({
  officialEuroWebsiteUrl = process.env.NEXT_PUBLIC_EURO_OFFICIAL_WEBSITE_URL || 'https://www.eurojeeneet.com',
  pcmcPhone = '9112223354',
  shikrapurPhone = '9607035688',
  officialEmail = 'admissions@eurocampus.edu.in',
}) => {
  return (
    <footer className="bg-euro-dark text-slate-300 border-t border-slate-800">
      {/* Top Banner for School Collaboration */}
      <div className="bg-gradient-to-r from-euro-navy via-euro-deep to-euro-navy border-b border-euro-gold/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-euro-gold/20 text-euro-gold rounded-lg border border-euro-gold/30">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">
                Invite ETHEX 2026 to Your School or Junior College
              </p>
              <p className="text-slate-400 text-xs">
                For institutional collaborations, student registrations & talent identification workshops
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${pcmcPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-md text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-euro-gold" />
              PCMC: {pcmcPhone}
            </a>
            <a
              href={`tel:${shikrapurPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-md text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-euro-gold" />
              Shikrapur: {shikrapurPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-3 rounded-xl inline-block backdrop-blur-sm border border-white/10">
              <CombinedBrandLogo size="md" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              ETHEX 2026 (EURO TALENT HUNT EXAM) is the flagship talent identification, diagnostic, and
              scholarship examination organized by EURO Campus for students of Classes 5 to 12 and JEE/NEET/MHT-CET aspirants.
            </p>

            {/* Official EURO Campus Website Pill / Link */}
            <div className="pt-2">
              {officialEuroWebsiteUrl ? (
                <a
                  href={officialEuroWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-euro-dark font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all group"
                >
                  <span>Visit Official EURO Campus Website</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-500 italic">
                  Official EURO Campus website link is configurable by administration.
                </span>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Examination
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/exam-details" className="hover:text-euro-gold transition-colors">
                  Exam Structure & Eligibility
                </Link>
              </li>
              <li>
                <Link href="/exam-pattern" className="hover:text-euro-gold transition-colors">
                  Syllabus & Marking Scheme
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-euro-gold transition-colors">
                  Scholarships & Awards
                </Link>
              </li>
              <li>
                <Link href="/important-dates" className="hover:text-euro-gold transition-colors">
                  Schedule & Deadlines
                </Link>
              </li>
              <li>
                <Link href="/instructions" className="hover:text-euro-gold transition-colors">
                  Candidate Instructions
                </Link>
              </li>
              <li>
                <Link href="/centres" className="hover:text-euro-gold transition-colors">
                  Examination Centres
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Student Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/student/register" className="hover:text-euro-gold transition-colors">
                  Register Online (Free / Paid)
                </Link>
              </li>
              <li>
                <Link href="/student/login" className="hover:text-euro-gold transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-euro-gold transition-colors">
                  Download Admit Card
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-euro-gold transition-colors">
                  Scorecard & Merit Ranking
                </Link>
              </li>
              <li>
                <Link href="/verify-admit-card" className="hover:text-euro-gold transition-colors">
                  Admit Card QR Verification
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Admin & Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Centres */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase border-b border-slate-800 pb-2">
              Campus Helplines
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-euro-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong>PCMC Campus:</strong> Sector 24, Pradhikaran, PCMC, Pune - 411044
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-euro-gold flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Shikrapur Campus:</strong> Academic Complex, Pune-Nagar Road, Shikrapur - 412208
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-euro-gold flex-shrink-0" />
                <span>{officialEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Policies Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} EURO Campus. All rights reserved. ETHEX 2026 is an official trademark of EURO Campus.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
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
