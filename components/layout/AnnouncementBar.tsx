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
  text = 'Last mile offer! Register for Online & Offline exam now at EURO Campus!',
  link = '/student/register',
  isActive = true,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!isActive || dismissed) return null;

  return (
    <div className="relative z-50 bg-[#00875A] text-white px-4 py-2 text-xs sm:text-[13px] font-semibold border-b border-emerald-800/40 shadow-sm overflow-hidden">
      {/* Subtle isometric grid pattern from Allen design */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 flex-1 justify-center text-center flex-wrap">
          <span className="inline-flex items-center gap-1 bg-[#F97316] text-white font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wide uppercase shadow-sm flex-shrink-0 animate-pulse">
            🎉 FINAL CALL: ETHEX 2026 ✨
          </span>
          <span className="text-white font-medium">{text}</span>
          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1 text-amber-200 hover:text-white font-bold underline underline-offset-2 ml-1 flex-shrink-0"
            >
              Register Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-emerald-100 hover:text-white p-1 rounded transition-colors focus:outline-none flex-shrink-0"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default AnnouncementBar;
