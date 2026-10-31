'use client';

import React from 'react';
import Link from 'next/link';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { ExternalLink, Phone, Mail, MapPin, Award, Building } from 'lucide-react';

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Brand & Official EURO Campus Website */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <CombinedBrandLogo size="md" variant="card" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              ETHEX 2026 (EURO TALENT HUNT EXAM) is the flagship talent identification, diagnostic, and
              scholarship examination conducted by EURO CAMPUS for students of Classes 8 to 12.
            </p>

            {/* Visit Official EURO Campus Website */}
            <div className="pt-2">
              <a
                href={officialEuroWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <span>Visit Official EURO Campus Website for More Info</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Campus Test Centres */}
          <div className="lg:col-span-6 space-y-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-7">
            <h4 className="text-white font-black text-sm tracking-wider uppercase border-b border-slate-800 pb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Campus Test Centres</span>
            </h4>
            <div className="space-y-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="text-slate-200 font-bold block">PCMC Campus (Main Examination Centre)</span>
                  <span className="text-xs text-slate-400 block leading-relaxed">
                    4th Floor, above Vijay Sales, Empire Estate Phase-II, Chinchwad, Pune — 411019
                  </span>
                  <a
                    href={`tel:${pcmcPhone}`}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs pt-0.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call PCMC: {pcmcPhone}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-800/80">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <span className="text-slate-200 font-bold block">Shikrapur Campus (Academic Complex)</span>
                  <span className="text-xs text-slate-400 block leading-relaxed">
                    Kalamkar Vasti, Hivare Road, Shikrapur, Pune — 412208
                  </span>
                  <a
                    href={`tel:${shikrapurPhone}`}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold text-xs pt-0.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Shikrapur: {shikrapurPhone}</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Helpline Email: <strong>{officialEmail}</strong></span>
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
