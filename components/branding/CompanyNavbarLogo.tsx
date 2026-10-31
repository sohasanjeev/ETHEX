'use client';

import React from 'react';
import Link from 'next/link';

interface CompanyNavbarLogoProps {
  className?: string;
  href?: string;
}

export const CompanyNavbarLogo: React.FC<CompanyNavbarLogoProps> = ({
  className = '',
  href = '/',
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none transition-all py-1 ${className}`}
      title="EURO CAMPUS - मूल्यनिष्ठाः अनुशासनेन उत्कर्षाय!"
    >
      <img
        src="/branding/euro_campus_official_logo.png"
        alt="EURO CAMPUS Logo"
        className="h-7 sm:h-8 w-auto max-w-[135px] sm:max-w-[170px] object-contain filter contrast-105 drop-shadow-xs group-hover:scale-[1.02] transition-transform"
      />
    </Link>
  );
};

export default CompanyNavbarLogo;
