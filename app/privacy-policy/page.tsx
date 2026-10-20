import React from 'react';

export const metadata = {
  title: 'Privacy Policy — ETHEX 2026 | EURO Campus',
  description: 'Official privacy policy for student registration, parental consent, and data protection on the ETHEX 2026 platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026 • EURO Campus</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">1. Introduction</h2>
          <p>
            EURO Campus (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the ETHEX 2026 examination platform. This Privacy Policy informs students and parents/guardians regarding our policies on the collection, use, and disclosure of personal data when you use our scholarship examination portal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">2. Information Collection & Parental Consent</h2>
          <p>
            For student registration, we collect minimal necessary educational data including student name, date of birth, current class, school name, city, state, and parent/guardian contact details (phone and email). For students under 18 years of age, registration requires parental or guardian knowledge and consent. We do NOT collect sensitive biometric or Aadhaar numbers by default.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">3. Purpose of Processing</h2>
          <p>
            Candidate data is utilized strictly for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>Generating official ETHEX 2026 Admit Cards and assigning roll numbers.</li>
            <li>Conducting online CBT or offline centre invigilated examinations.</li>
            <li>Evaluating scores, publishing merit rankings, and calculating scholarship entitlement.</li>
            <li>Direct academic communication regarding examination dates and EURO Campus counseling.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">4. Data Security & Storage</h2>
          <p>
            All student data and examination answers are transmitted over encrypted HTTPS/TLS protocols and secured using PostgreSQL Row Level Security (RLS). We never sell or share student data with third-party marketing companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">5. Payment Security (Razorpay)</h2>
          <p>
            Paid examination transactions are processed securely through Razorpay in compliance with PCI-DSS standards. EURO Campus does not store credit/debit card numbers or net banking credentials on its servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">6. Grievance Redressal</h2>
          <p>
            For questions or data correction requests, contact our compliance officer at <strong>admissions@eurocampus.edu.in</strong> or call our PCMC Campus helpdesk at <strong>+91 9112223354</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
