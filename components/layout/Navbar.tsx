'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { Menu, X, Phone, User, ChevronDown } from 'lucide-react';

interface NavbarProps {
  examYear?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ examYear = '2026' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Classroom Courses', href: '/about' },
    { label: 'Online Courses', href: '/exam-details' },
    { label: 'CBT Test Series', href: '/exam-pattern' },
    { label: 'Results', href: '/results' },
    { label: 'Study Materials', href: '/#syllabus' },
    { label: 'Scholarships', href: '/scholarships', badge: 'NEW' },
    { label: 'Centres', href: '/centres' },
    { label: 'More', href: '/faqs' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo on Left */}
          <div className="flex-shrink-0 py-2">
            <CombinedBrandLogo size="md" year={examYear} />
          </div>

          {/* Desktop Navigation Links (Exact Allen Style) */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 font-bold'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-extrabold bg-[#EAB308] text-slate-900 rounded-full uppercase tracking-tighter">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Buttons (Exact Allen Style) */}
          <div className="hidden md:flex items-center space-x-3 relative">
            {/* Blue Round Telephone Button */}
            <div className="relative">
              <button
                onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                className="w-9 h-9 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm focus:outline-none"
                title="Call EURO Campus Helplines"
              >
                <Phone className="w-4 h-4" />
              </button>

              {phoneMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs space-y-2">
                  <p className="font-bold text-slate-800 border-b border-slate-100 pb-1">EURO Campus Helplines</p>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">PCMC Campus:</span>
                    <a href="tel:9112223354" className="block font-bold text-blue-600 hover:underline">
                      9112223354 / 9112233995
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Shikrapur Campus:</span>
                    <a href="tel:9607035688" className="block font-bold text-blue-600 hover:underline">
                      9607035688
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* White Pill Login Button with Blue Border */}
            <Link
              href="/student/login"
              className="px-6 py-1.5 rounded-full border-2 border-[#0066FF] text-[#0066FF] hover:bg-blue-50 text-xs sm:text-[13px] font-bold transition-all shadow-sm"
            >
              Login
            </Link>

            {/* Register Now Pill */}
            <Link
              href="/student/register"
              className="px-5 py-2 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white text-xs sm:text-[13px] font-bold transition-all shadow-sm"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="tel:9112223354"
              className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/student/login"
              className="px-3 py-1 rounded-full border border-[#0066FF] text-[#0066FF] text-xs font-bold"
            >
              Login
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              {link.label}
              {link.badge && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-[#EAB308] text-slate-900 rounded-full">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              href="/student/register"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center bg-[#0066FF] text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Register for ETHEX 2026
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
