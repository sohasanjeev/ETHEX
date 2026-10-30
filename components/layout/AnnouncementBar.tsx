'use client';

import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
  link?: string;
  isActive?: boolean;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Start premier coaching for JEE, NEET & MHT CET @EURO Campus • ETHEX 2026 Registration Open for Classes 7 to 12!',
  link = '/student/register',
  isActive = true,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!isActive || dismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#1E1B4B] via-[#2E1065] to-[#1E1B4B] text-white px-3 py-1.5 text-xs font-semibold border-b border-amber-500/30 shadow-sm overflow-hidden">
      {/* Subtle geometric pattern & gold ambient glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #F59E0B 1px, transparent 1px), linear-gradient(to bottom, #F59E0B 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>
      <div className="absolute -top-10 left-1/4 w-40 h-20 bg-amber-400/10 blur-xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2.5 flex-1 justify-center text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] tracking-wide uppercase shadow-sm flex-shrink-0 animate-pulse border border-amber-300">
            <span>✨</span> IMPORTANT ANNOUNCEMENT
          </span>
          <span className="text-slate-100 font-medium tracking-normal">{text}</span>
          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-300 hover:text-white px-3 py-0.5 rounded-full font-bold text-xs transition-all shadow-xs ml-1 flex-shrink-0"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none flex-shrink-0"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
