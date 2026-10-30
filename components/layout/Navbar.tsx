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
  const [syllabusDropdownOpen, setSyllabusDropdownOpen] = useState(false);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false);
  const [student, setStudent] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Standardized classes for ETHEX Syllabus (Classes 6 to 12)
  const syllabusClasses = [
    { label: 'Class 6', tab: 'class6', tag: 'Junior Foundation' },
    { label: 'Class 7', tab: 'class7', tag: 'Foundation' },
    { label: 'Class 8', tab: 'class8', tag: 'Foundation' },
    { label: 'Class 9', tab: 'class9', tag: 'Olympiad & Foundation' },
    { label: 'Class 10', tab: 'class10', tag: 'Boards & Foundation' },
    { label: 'Class 11 JEE', tab: 'jee_class11', tag: 'Engineering' },
    { label: 'Class 11 NEET', tab: 'neet_class11', tag: 'Medical' },
    { label: 'Class 12 JEE', tab: 'jee_class12', tag: 'Engineering' },
    { label: 'Class 12 NEET', tab: 'neet_class12', tag: 'Medical' },
  ];

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

  const handleSelectClass = (tab: string) => {
    setSyllabusDropdownOpen(false);
    setMobileMenuOpen(false);
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('ethex-select-pattern', { detail: tab }));
      const el = document.getElementById('syllabus');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/?tab=${tab}#syllabus`);
    }
  };

  // Ultra-clean streamlined navigation inspired by Allen Tallentex
  const navLinks = [
    { label: 'About ETHEX', href: '/#about' },
    { label: 'Exam Pattern', href: '/exam-pattern' },
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
        {/* ROW 1: TOP LINE (EURO LOGO ON LEFT; ONLY CALL & LOGIN OPTIONS ON RIGHT) */}
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Official EURO CAMPUS Logo */}
          <div className="flex-shrink-0 py-1.5">
            <CompanyNavbarLogo />
          </div>

          {/* Right: ONLY Call Option and Login Option (Strictly as Requested) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Call Option */}
            <div className="relative">
              <a
                href="tel:9112223354"
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-xs transition-transform hover:scale-102"
                title="Call EURO Campus Helpline: 9112223354"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us: 9112223354</span>
              </a>
            </div>

            {/* Login Option */}
            {student ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-euro-royal text-xs font-bold transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-euro-royal text-white flex items-center justify-center text-[11px] font-black">
                    {student.full_name ? student.full_name.charAt(0).toUpperCase() : (student.name ? student.name.charAt(0).toUpperCase() : 'S')}
                  </div>
                  <span className="max-w-[100px] truncate text-slate-800 font-extrabold hidden sm:inline">
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
              <Link
                href="/student/login"
                className="px-4 sm:px-5 py-1.5 rounded-full bg-euro-royal hover:bg-blue-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ROW 2: SUB-OPTIONS (EXACTLY 4 OPTIONS: ABOUT US, SYLLABUS, RESULT, SCHOLARSHIP) */}
        <div className="hidden lg:flex items-center justify-between border-t border-slate-100 py-2.5">
          <nav className="flex items-center space-x-2 xl:space-x-4 text-xs xl:text-sm font-bold">
            <a
              href="/#about"
              className="px-3.5 py-1.5 text-slate-700 hover:text-euro-royal hover:bg-slate-50 rounded-xl transition-colors"
            >
              About Us
            </a>

            {/* Syllabus Dropdown with Classes 6 to 12 */}
            <div
              className="relative"
              onMouseEnter={() => setSyllabusDropdownOpen(true)}
              onMouseLeave={() => setSyllabusDropdownOpen(false)}
            >
              <button
                onClick={() => handleSelectClass('class10')}
                className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                  syllabusDropdownOpen ? 'text-euro-royal bg-blue-50' : 'text-slate-700 hover:text-euro-royal hover:bg-slate-50'
                }`}
              >
                <span>Syllabus</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    syllabusDropdownOpen ? 'rotate-180 text-euro-royal' : 'text-slate-400'
                  }`}
                />
              </button>

              {syllabusDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      ETHEX CLASS SYLLABUS
                    </span>
                    <span className="text-[9px] font-bold text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-full">
                      CLASSES 6–12
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {syllabusClasses.map((item) => (
                      <button
                        key={item.tab}
                        onClick={() => handleSelectClass(item.tab)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-euro-royal hover:bg-blue-50/80 flex items-center justify-between group transition-colors"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">{item.label}</span>
                        <span className="text-[10px] font-semibold text-slate-400 group-hover:text-euro-royal bg-slate-100 group-hover:bg-blue-100 px-2 py-0.5 rounded-md transition-colors">
                          {item.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/results"
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                pathname === '/results' ? 'text-euro-royal font-black bg-blue-50/80' : 'text-slate-700 hover:text-euro-royal hover:bg-slate-50'
              }`}
            >
              Result
            </Link>

            <Link
              href="/scholarships"
              className={`px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 ${
                pathname === '/scholarships' ? 'text-euro-royal font-black bg-blue-50/80' : 'text-slate-700 hover:text-euro-royal hover:bg-slate-50'
              }`}
            >
              <span>Scholarship</span>
              <span className="px-1.5 py-0.2 text-[9px] font-black bg-[#EAB308] text-slate-900 rounded-full uppercase tracking-tight">
                NEW
              </span>
            </Link>
          </nav>

          <Link
            href="/student/register"
            className="px-4 py-1.5 rounded-xl bg-euro-royal hover:bg-blue-700 text-white text-xs font-extrabold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Register for ETHEX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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

          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50 hover:text-euro-royal"
          >
            About Us
          </a>

          <div>
            <button
              onClick={() => setMobileSyllabusOpen(!mobileSyllabusOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50 hover:text-euro-royal"
            >
              <span>Syllabus (Classes 6–12)</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSyllabusOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileSyllabusOpen && (
              <div className="pl-3 pr-1 py-1 space-y-1 bg-slate-50 rounded-xl mt-1 border border-slate-100">
                {syllabusClasses.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleSelectClass(item.tab)}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-euro-royal flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-400">{item.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/results"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50 hover:text-euro-royal"
          >
            Result
          </Link>

          <Link
            href="/scholarships"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50 hover:text-euro-royal"
          >
            <div className="flex items-center justify-between">
              <span>Scholarship</span>
              <span className="px-2 py-0.5 text-[9px] font-black bg-[#EAB308] text-slate-900 rounded-full">
                NEW
              </span>
            </div>
          </Link>

          <div className="pt-2">
            <Link
              href="/student/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-euro-royal text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Register for ETHEX</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
