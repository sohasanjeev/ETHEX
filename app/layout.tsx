import type { Metadata } from 'next';
import './globals.css';
import AppWrapper from '@/components/layout/AppWrapper';

export const metadata: Metadata = {
  title: 'ETHEX 2026 — EURO TALENT HUNT EXAM | EURO Campus',
  description:
    'Official Scholarship Examination & Student Management Platform by EURO Campus for Academic Year 2027–2028. Classes 5–12, Foundation, JEE, NEET & MHT-CET aspirants. ₹2.5 Crores scholarship pool, ₹10 Lacs cash prizes, and fully sponsored ISRO Educational Tour.',
  keywords: [
    'ETHEX 2026',
    'EURO Talent Hunt Exam',
    'EURO Campus',
    'Scholarship Exam Pune',
    'JEE Coaching Scholarship',
    'NEET Scholarship Exam',
    'Foundation Classes 5 to 10',
    'ISRO Educational Tour',
    'EURO Campus PCMC',
    'EURO Campus Shikrapur',
  ],
  authors: [{ name: 'EURO Campus Academic Board' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ETHEX 2026 — EURO TALENT HUNT EXAM | EURO Campus',
    description:
      'Participate in ETHEX 2026 by EURO Campus. Top performers earn an ISRO Educational Tour, cash prizes, and up to 90% admission fee scholarships.',
    url: '/',
    siteName: 'ETHEX 2026',
    images: [
      {
        url: '/branding/ethex_official_poster.jpg',
        width: 1080,
        height: 1080,
        alt: 'ETHEX 2026 EURO Talent Hunt Exam Official Poster',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 overflow-x-hidden w-full max-w-full">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
