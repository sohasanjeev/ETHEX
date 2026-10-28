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
      title="EURO CAMPUS - मूल्यनिष्ठा: अनुशासनेन उत्कर्षाय!"
    >
      {/* Official Shield Emblem */}
      <img
        src="/branding/euro_campus_logo_horizontal.png"
        alt="EURO CAMPUS Logo"
        className="h-10 sm:h-12 w-auto object-contain filter contrast-105 drop-shadow-xs group-hover:scale-[1.02] transition-transform"
      />
    </Link>
  );
};

export default CompanyNavbarLogo;
