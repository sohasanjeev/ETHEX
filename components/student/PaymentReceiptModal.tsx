'use client';

import React from 'react';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { Application } from '@/lib/types';
import { Printer, X, CheckCircle2, ShieldCheck } from 'lucide-react';

interface PaymentReceiptModalProps {
  application: Application;
  studentName?: string;
  onClose: () => void;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  application,
  studentName = 'Candidate',
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-auto">
        {/* Toolbar */}
        <div className="no-print bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Fee Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-euro-royal hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <CombinedBrandLogo size="md" />
            <div className="text-right">
              <span className="font-bold text-xs text-euro-navy block">PAYMENT RECEIPT</span>
              <span className="font-mono text-xs text-slate-500">
                RCP-{application.application_number}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-xs text-emerald-900">
              <span className="font-bold block text-sm">Payment Verified Successfully</span>
              <span>Transaction processed through official Razorpay Payment Gateway.</span>
            </div>
          </div>

          <div className="space-y-3 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Student Name:</span>
              <span className="font-bold text-slate-900">{studentName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Application Number:</span>
              <span className="font-mono font-bold text-slate-900">{application.application_number}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Examination Code:</span>
              <span className="font-bold text-slate-900">{application.exam?.code || 'ETHEX 2026'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-bold text-emerald-700 uppercase">Successful</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-medium text-slate-900">Razorpay Secured (UPI / Card / NetBanking)</span>
            </div>
            <div className="flex justify-between py-2 text-sm bg-slate-50 px-2 rounded-lg font-bold border border-slate-200">
              <span className="text-euro-navy">Total Amount Paid:</span>
              <span className="text-emerald-700 font-mono">
                ₹{application.fee_paid || application.fee_amount || 0}.00 INR
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-500 space-y-1">
            <p>This is a computer-generated official receipt. No physical signature is required.</p>
            <p>EURO Campus • Academic Admissions Office • Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentReceiptModal;
