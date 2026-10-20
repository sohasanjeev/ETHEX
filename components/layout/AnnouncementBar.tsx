'use client';

import React, { useState } from 'react';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
  link?: string;
  isActive?: boolean;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Registrations for ETHEX 2026 upcoming cycle opening soon! New exam schedule will be announced here.',
  link = '/important-dates',
  isActive = true,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (!isActive || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-euro-navy via-euro-blue to-euro-deep text-white px-4 py-2 text-xs sm:text-sm font-medium relative z-50 border-b border-euro-gold/30 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center text-center">
          <span className="bg-euro-gold text-euro-navy font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-sm flex-shrink-0">
            <Megaphone className="w-3 h-3" /> Notice
          </span>
          <span className="text-slate-100 line-clamp-1">{text}</span>
          {link && (
            <Link
              href={link}
              className="inline-flex items-center gap-1 text-euro-gold hover:text-amber-300 font-semibold underline underline-offset-2 ml-1 flex-shrink-0"
            >
              Details <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-300 hover:text-white p-1 rounded transition-colors focus:outline-none flex-shrink-0"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default AnnouncementBar;
