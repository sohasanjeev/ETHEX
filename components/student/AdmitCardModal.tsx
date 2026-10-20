'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import CombinedBrandLogo from '../branding/CombinedBrandLogo';
import { Application } from '@/lib/types';
import { Printer, X, Download, ShieldCheck, MapPin, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface AdmitCardModalProps {
  application: Application;
  studentName?: string;
  onClose: () => void;
}

export const AdmitCardModal: React.FC<AdmitCardModalProps> = ({
  application,
  studentName = 'Candidate',
  onClose,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    const verifyUrl = `${window.location.origin}/verify-admit-card?code=${encodeURIComponent(
      application.qr_verification_code || application.roll_number || ''
    )}`;

    QRCode.toDataURL(verifyUrl, { width: 160, margin: 1 })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [application]);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-auto">
        {/* Modal Toolbar (hidden in print) */}
        <div className="no-print bg-slate-900 text-white p-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Admit Card Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-euro-royal hover:bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Admit Card Document */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 bg-white">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-euro-navy/30 pb-4 gap-4">
            <CombinedBrandLogo size="md" />
            <div className="text-center sm:text-right space-y-1">
              <span className="bg-euro-navy text-white text-[11px] font-black px-3 py-0.5 rounded uppercase tracking-wider">
                OFFICIAL ADMIT CARD
              </span>
              <p className="text-xs font-bold text-slate-700">EURO TALENT HUNT EXAM (ETHEX 2026)</p>
              <p className="text-[10px] text-slate-500">For Academic Year 2027–2028</p>
            </div>
          </div>

          {/* Credentials & Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
            {/* Candidate Details (Cols 1-3) */}
            <div className="sm:col-span-3 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Candidate Name</span>
                <span className="font-extrabold text-sm text-euro-navy">{studentName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Roll Number</span>
                <span className="font-extrabold text-sm font-mono text-euro-royal">{application.roll_number || 'ASSIGNED'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Application Number</span>
                <span className="font-bold font-mono text-slate-800">{application.application_number}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Category / Stream</span>
                <span className="font-bold text-slate-800">
                  {application.exam?.class_category} ({application.exam?.target_stream})
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Examination Mode</span>
                <span className="font-bold uppercase text-euro-royal">{application.selected_mode}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Duration</span>
                <span className="font-bold text-slate-800">{application.exam?.duration_minutes || 90} Minutes</span>
              </div>
            </div>

            {/* Candidate Photo Box (Col 4) */}
            <div className="flex flex-col items-center justify-center p-2 border-2 border-dashed border-slate-300 rounded-xl aspect-[3/4] bg-slate-50 text-center">
              <span className="text-[10px] font-semibold text-slate-400">
                Affix Recent Passport Photo Here
              </span>
              <span className="text-[9px] text-slate-400 mt-1">(If not pre-uploaded)</span>
            </div>
          </div>

          {/* Examination Schedule & Venue Card */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-euro-navy flex items-center gap-1.5 text-sm">
              <Calendar className="w-4 h-4 text-euro-royal" />
              Examination Schedule & Venue Allotment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-500 block">Test Timing & Reporting:</span>
                <span className="font-bold text-slate-900">
                  {application.exam?.exam_date
                    ? new Date(application.exam.exam_date).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })
                    : 'Scheduled Slot'} • 10:00 AM IST
                </span>
                <span className="block text-[11px] text-slate-600">Reporting Time: 09:15 AM IST (45 mins prior)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Centre / Testing Venue:</span>
                <span className="font-bold text-slate-900">
                  {application.selected_mode === 'offline'
                    ? application.centre?.name || 'EURO Campus Assigned Centre'
                    : 'Online Examination Portal (Student Dashboard)'}
                </span>
                {application.centre?.address && (
                  <span className="block text-[11px] text-slate-600 mt-0.5">{application.centre.address}</span>
                )}
                {application.seat_number && (
                  <span className="block text-[11px] font-bold text-euro-royal mt-0.5">
                    Hall / Seat No: {application.seat_number}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Verification QR & Security Block */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-4 gap-4 text-xs">
            <div className="flex items-center gap-4">
              {qrDataUrl && (
                <img
                  src={qrDataUrl}
                  alt="Official Verification QR"
                  className="w-20 h-20 border border-slate-300 p-1 rounded-lg bg-white"
                />
              )}
              <div className="space-y-0.5">
                <span className="font-bold text-euro-navy text-[11px] uppercase tracking-wider block">
                  Digital Verification Code
                </span>
                <span className="font-mono text-xs font-bold text-slate-800 block">
                  {application.qr_verification_code}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Scan QR code with smartphone to authenticate at venue
                </span>
              </div>
            </div>

            {/* Signature blocks */}
            <div className="flex items-center gap-8 text-center pt-4 sm:pt-0">
              <div className="space-y-1">
                <div className="w-24 border-b border-slate-400 h-8"></div>
                <span className="text-[10px] text-slate-500 block font-semibold">Candidate Sign</span>
              </div>
              <div className="space-y-1">
                <div className="w-28 border-b border-slate-400 h-8 flex items-end justify-center">
                  <span className="font-serif italic font-bold text-[10px] text-euro-navy">Controller of Exams</span>
                </div>
                <span className="text-[10px] text-slate-500 block font-semibold">EURO Campus Authority</span>
              </div>
            </div>
          </div>

          {/* Footer Candidate Instructions */}
          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-500 space-y-1">
            <p className="font-bold text-slate-700">Important Instructions for Test Day:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Carry a printed copy of this Admit Card and a valid school identity card.</li>
              <li>Electronic gadgets, smartwatches, calculators, and mobile phones are strictly prohibited in the exam hall.</li>
              <li>For online test takers, log in 15 minutes before the scheduled time with a stable internet connection.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdmitCardModal;
