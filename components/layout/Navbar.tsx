'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { Menu, X, User, ChevronRight, Award, Calendar, BookOpen, MapPin, Shield } from 'lucide-react';

interface NavbarProps {
  examYear?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ examYear = '2026' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Exam Details', href: '/exam-details' },
    { label: 'Exam Pattern', href: '/exam-pattern' },
    { label: 'Scholarships', href: '/scholarships', badge: 'ISRO Tour' },
    { label: 'Important Dates', href: '/important-dates' },
    { label: 'Centres', href: '/centres' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Unit */}
          <div className="flex-shrink-0 py-2">
            <CombinedBrandLogo size="md" year={examYear} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs lg:text-[13px] font-semibold rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'text-euro-royal bg-blue-50/80'
                    : 'text-slate-700 hover:text-euro-royal hover:bg-slate-50'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/results"
              className="text-xs font-semibold text-slate-700 hover:text-euro-royal px-2.5 py-1.5 rounded-md transition-colors border border-slate-200 hover:border-slate-300"
            >
              Results
            </Link>

            <Link
              href="/student/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-euro-navy hover:text-euro-royal px-3 py-2 rounded-lg transition-colors border border-euro-navy/20 hover:bg-slate-50"
            >
              <User className="w-3.5 h-3.5" />
              Student Login
            </Link>

            <Link
              href="/student/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-euro-royal to-blue-700 hover:from-blue-700 hover:to-euro-navy px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95"
            >
              Register Now
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center space-x-2">
            <Link
              href="/student/login"
              className="p-2 text-euro-navy hover:text-euro-royal rounded-lg md:hidden"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-euro-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive(link.href)
                    ? 'text-euro-royal bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>View Results & Merit List</span>
            </Link>
            <Link
              href="/verify-admit-card"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>Verify Admit Card</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <Link
              href="/student/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 bg-euro-royal hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-sm"
            >
              Register for ETHEX 2026
            </Link>
            <Link
              href="/student/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 border border-slate-300 text-euro-navy rounded-lg font-semibold text-sm hover:bg-slate-50"
            >
              Student Portal Login
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 px-4 text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" /> Staff & Administrator Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
