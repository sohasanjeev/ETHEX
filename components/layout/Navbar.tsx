'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CompanyNavbarLogo from '../branding/CompanyNavbarLogo';
import {
  Menu,
  X,
  Phone,
  User,
  ChevronDown,
  PlayCircle,
  Sparkles,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  examYear?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ examYear = '2026' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check login state on mount & route change
  useEffect(() => {
    try {
      const sessionStr = localStorage.getItem('ethex_student_session');
      if (sessionStr) {
        setStudent(JSON.parse(sessionStr));
      } else {
        setStudent(null);
      }
    } catch {
      setStudent(null);
    }
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem('ethex_student_session');
    setStudent(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    router.push('/');
  };

  // Ultra-clean streamlined navigation inspired by Allen Tallentex
  const navLinks = [
    { label: 'About ETHEX', href: '/#about' },
    { label: 'Exam Pattern', href: '/exam-pattern' },
    { label: 'Syllabus', href: '/#syllabus' },
    { label: 'Online CBT Mock Test', href: '/student/exam/simulation', highlight: true },
    { label: 'Results', href: '/results' },
    { label: 'Scholarships', href: '/scholarships', badge: 'NEW' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo on Left: EURO CAMPUS Official Company Emblem & Motto */}
          <div className="flex-shrink-0 py-2">
            <CompanyNavbarLogo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-bold transition-all rounded-xl ${
                  link.highlight
                    ? 'bg-blue-50 text-euro-royal font-black border border-blue-200 hover:bg-blue-100 flex items-center gap-1.5 shadow-2xs'
                    : isActive(link.href)
                    ? 'text-euro-royal font-black bg-blue-50/60'
                    : 'text-slate-700 hover:text-euro-royal hover:bg-slate-50'
                }`}
              >
                {link.highlight && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                )}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-black bg-[#EAB308] text-slate-900 rounded-full uppercase tracking-tight shadow-2xs">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-2.5 xl:space-x-3 relative">
            {/* Blue Round Telephone Button */}
            <div className="relative">
              <button
                onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                className="w-9 h-9 rounded-full bg-euro-royal hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-sm focus:outline-none hover:scale-105 active:scale-95"
                title="Call EURO Campus Helplines"
              >
                <Phone className="w-4 h-4" />
              </button>

              {phoneMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-800">EURO Campus Helplines</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">PCMC Campus:</span>
                    <a href="tel:9112223354" className="font-bold text-euro-royal hover:underline text-xs">
                      9112223354
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Shikrapur Campus:</span>
                    <a href="tel:9607035688" className="font-bold text-euro-royal hover:underline text-xs">
                      9607035688
                    </a>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    Mon - Sat: 9:00 AM - 7:00 PM
                  </div>
                </div>
              )}
            </div>

            {/* Candidate Session or Login / Register */}
            {student ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-euro-royal text-xs font-bold transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-euro-royal text-white flex items-center justify-center text-[11px] font-black">
                    {student.full_name ? student.full_name.charAt(0).toUpperCase() : (student.name ? student.name.charAt(0).toUpperCase() : 'S')}
                  </div>
                  <span className="max-w-[110px] truncate text-slate-800 font-extrabold">
                    {student.full_name || student.name || 'Candidate'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-extrabold text-slate-900">{student.full_name || student.name || 'Candidate'}</p>
                      <p className="text-[10px] text-slate-400 truncate">{student.phone || student.email || 'Candidate Account'}</p>
                    </div>

                    <Link
                      href="/student/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-euro-royal rounded-xl font-semibold transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>Exam Dashboard</span>
                    </Link>

                    <Link
                      href="/student/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-euro-royal rounded-xl font-semibold transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/student/login"
                  className="px-3.5 py-2 text-xs sm:text-[13px] font-bold text-slate-700 hover:text-euro-royal transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  href="/student/register"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-euro-royal to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-[13px] font-extrabold transition-all shadow-md hover:shadow-lg active:scale-98"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href="tel:9112223354"
              className="w-8 h-8 rounded-full bg-euro-royal text-white flex items-center justify-center shadow-xs"
              title="Call Helpline"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            {student ? (
              <Link
                href="/student/dashboard"
                className="w-8 h-8 rounded-full bg-euro-royal text-white flex items-center justify-center font-bold text-xs"
                title="My Dashboard"
              >
                {student.full_name ? student.full_name.charAt(0).toUpperCase() : (student.name ? student.name.charAt(0).toUpperCase() : 'S')}
              </Link>
            ) : (
              <Link
                href="/student/login"
                className="px-3 py-1 rounded-full border border-euro-royal text-euro-royal text-xs font-bold"
              >
                Login
              </Link>
            )}
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
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          {student && (
            <div className="bg-blue-50/80 rounded-xl p-3 mb-2 flex items-center justify-between border border-blue-200/80">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-euro-royal text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {student.full_name ? student.full_name.charAt(0).toUpperCase() : (student.name ? student.name.charAt(0).toUpperCase() : 'S')}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-xs">{student.full_name || student.name || 'Candidate'}</p>
                  <p className="text-[10px] text-slate-500">{student.phone || student.email || 'Candidate Account'}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                link.highlight
                  ? 'bg-blue-50 text-euro-royal border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-euro-royal'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[9px] font-black bg-[#EAB308] text-slate-900 rounded-full">
                    {link.badge}
                  </span>
                )}
              </div>
            </Link>
          ))}

          {student ? (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/student/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center bg-euro-royal text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Dashboard
              </Link>
              <Link
                href="/student/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center border-2 border-euro-royal text-euro-royal font-bold text-xs rounded-xl"
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                href="/student/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center border-2 border-euro-royal text-euro-royal font-bold text-xs rounded-xl"
              >
                Student Login
              </Link>
              <Link
                href="/student/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-center bg-euro-royal text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Register for ETHEX
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
export default Navbar;
