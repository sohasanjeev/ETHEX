import React from 'react';

export const metadata = {
  title: 'Terms & Conditions — ETHEX 2026 | EURO Campus',
  description: 'Terms and conditions governing candidate registration, examination rules, and scholarship awards for ETHEX 2026.',
};

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">Terms & Conditions</h1>
          <p className="text-xs text-slate-500 mt-1">Official Candidate Agreement • ETHEX 2026</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">1. Eligibility & Truthfulness</h2>
          <p>
            By registering for ETHEX 2026, the applicant and their guardian affirm that all submitted information regarding age, current class, school, and academic category is accurate and authentic. Supplying false information may result in cancellation of candidature and forfeiture of scholarship awards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">2. Examination Administration</h2>
          <p>
            EURO Campus reserves the right to schedule, reschedule, or format examination slots (online or at offline centres) in the interest of fair administration. Registered candidates will receive advance notifications through the website announcement bar and student dashboard.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">3. Code of Conduct</h2>
          <p>
            Candidates taking the online test agree not to use unauthorized study aids, secondary devices, or proxy assistance. Candidates at offline centres must strictly adhere to invigilator instructions. Any breach will lead to immediate disqualification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">4. Scholarships & Awards Policy</h2>
          <p>
            Scholarship awards (including admission fee waivers, Stage-2 cash prizes, and the ISRO Educational Tour) are subject to document verification and admission enrollment at EURO Campus. Scholarships cannot be exchanged for unconditional cash unless specifically classified under the Stage-2 cash rewards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">5. Jurisdiction</h2>
          <p>
            All matters and disputes arising in connection with ETHEX 2026 shall be governed by the laws of India and subject to the exclusive jurisdiction of courts located in Pune, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}
