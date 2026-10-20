'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is ETHEX 2026 and who organizes it?',
      a: 'ETHEX 2026 stands for EURO TALENT HUNT EXAM. It is the flagship diagnostic and scholarship examination organized by EURO Campus for students in Classes 5 to 12 as well as JEE, NEET, and MHT-CET aspirants for Academic Year 2027–2028.',
    },
    {
      q: 'Is registration for ETHEX 2026 free?',
      a: 'Yes! The standard online and school-level registrations for ETHEX 2026 are completely free of charge. EURO Campus believes every deserving student should have access to scholarship benchmarking regardless of financial standing.',
    },
    {
      q: 'Can I choose between Online and Offline test modes?',
      a: 'Absolutely. Candidates can select either the Online Proctored mode (take from home via laptop/tablet/mobile) or the Offline mode at EURO Campus certified centres in PCMC and Shikrapur during the application step.',
    },
    {
      q: 'What is the ISRO Educational Tour prize and who qualifies?',
      a: 'The highest-ranking performers across eligible grade categories in ETHEX 2026 will be selected for a fully sponsored educational visit to ISRO facilities. EURO Campus will cover travel, accommodation, and curated science mentorship.',
    },
    {
      q: 'How are scholarships awarded at EURO Campus?',
      a: 'Scholarships are awarded based on performance in ETHEX 2026, offering up to 90% fee waiver in tuition for Foundation, JEE Main + Advanced, NEET, and MHT-CET coaching batches. In addition, Stage-2 cash prizes totaling ₹10 Lacs are awarded to top rankers.',
    },
    {
      q: 'When and how can I download my Admit Card?',
      a: 'Admit cards are published 7 days prior to the examination date. Once confirmed, you can log in to your Student Dashboard and download/print your official admit card featuring your photo, roll number, and QR verification code.',
    },
    {
      q: 'When will the new examination date be announced?',
      a: 'The upcoming examination date is being scheduled by the EURO Campus Academic Board and will be published prominently on our website announcement bar and important dates schedule. Registered students will also receive notifications.',
    },
    {
      q: 'Is there negative marking in the examination?',
      a: 'For Classes 9 to 12 (Foundation, JEE, and NEET), there is negative marking (+4 for correct, -1 for incorrect). For Junior Classes 5 to 8, there is NO negative marking (+4 for correct, 0 for incorrect).',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Got Questions?
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm">
            Everything you need to know about ETHEX 2026 registration, examination pattern, scholarships, and results.
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-slate-100 last:border-b-0 pb-4 last:pb-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
                >
                  <span className="font-bold text-sm sm:text-base text-euro-navy group-hover:text-euro-royal transition-colors">
                    {faq.q}
                  </span>
                  <span className="p-1 rounded bg-slate-100 text-slate-600 flex-shrink-0 ml-3">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-euro-navy to-euro-deep rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-base sm:text-lg">Still have questions about ETHEX 2026?</h4>
            <p className="text-xs text-slate-300">
              Our academic counselors at PCMC and Shikrapur are here to assist you.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-euro-dark font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex-shrink-0"
          >
            Contact Helpdesk
          </Link>
        </div>
      </div>
    </div>
  );
}
