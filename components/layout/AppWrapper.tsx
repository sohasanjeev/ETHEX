'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import { SiteSettings } from '@/lib/types';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/site-settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSettings(data);
        }
      })
      .catch((err) => console.warn('Could not fetch dynamic site settings:', err));
  }, [pathname]);

  const isExamRoom = pathname.startsWith('/student/exam/');
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  // In full-screen exam mode, strip headers and footers to ensure security & focus
  if (isExamRoom) {
    return <main className="min-h-screen bg-slate-900 text-white">{children}</main>;
  }

  // Admin dashboard has its own specialized shell
  if (isAdminRoute) {
    return <div className="min-h-screen bg-slate-100 flex flex-col">{children}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar examYear={settings?.exam_edition || '2026'} />
      <AnnouncementBar
        text={settings?.announcement_bar_text}
        isActive={settings?.announcement_bar_active ?? true}
      />
      <main className="flex-grow">{children}</main>
      <Footer
        officialEuroWebsiteUrl={settings?.euro_official_website_url}
        pcmcPhone={settings?.helpline_pcmc}
        shikrapurPhone={settings?.helpline_shikrapur}
        officialEmail={settings?.official_email}
      />
    </div>
  );
};
export default AppWrapper;
