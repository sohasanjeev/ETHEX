import React from 'react';

export const metadata = {
  title: 'Refund & Cancellation Policy — ETHEX 2026 | EURO Campus',
  description: 'Official refund and fee cancellation guidelines for paid examination registrations on ETHEX 2026.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-euro-navy">Refund & Cancellation Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Payment & Refund Regulations • Razorpay Integrated</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">1. Free Examination Categories</h2>
          <p>
            Standard student registration for ETHEX 2026 is free of charge. No payment is collected or required for free registration categories.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">2. Paid Registrations & Fees</h2>
          <p>
            Where a specific specialized category, hard-copy study kit, or premium test series involves a nominal fee, payment is processed securely via Razorpay.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">3. Cancellation Window & Refund Requests</h2>
          <p>
            A candidate may request a cancellation and refund of an eligible paid registration fee up to <strong>7 days before</strong> the scheduled examination date by submitting a formal request through the student dashboard or emailing admissions@eurocampus.edu.in with their Application Number and Razorpay Payment ID.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">4. Duplicate Transactions</h2>
          <p>
            In the event of accidental duplicate debit due to technical glitch or network interruption during payment checkout, the duplicate amount will be refunded automatically to the original source account within 5–7 working days post reconciliation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-euro-navy">5. Non-Refundable Scenarios</h2>
          <p>
            No refunds will be granted once the Admit Card has been generated and the examination session has commenced, or in cases where a candidate fails to appear (absenteeism) on the examination date.
          </p>
        </section>
      </div>
    </div>
  );
}
