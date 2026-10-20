'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Users, Building, ShieldCheck, ArrowRight } from 'lucide-react';
import { ExamCentre } from '@/lib/types';

export default function CentresPage() {
  const [centres, setCentres] = useState<ExamCentre[]>([]);

  useEffect(() => {
    fetch('/api/centres')
      .then((res) => res.json())
      .then((data) => {
        if (data.centres) setCentres(data.centres);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Offline Testing Locations
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-euro-navy">
            Published Examination Centres
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            EURO Campus provides fully equipped physical examination centres with assigned seating, invigilation staff, and parent waiting facilities.
          </p>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {centres.map((centre) => (
            <div
              key={centre.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-euro-royal border border-blue-200 uppercase">
                    Centre Code: {centre.centre_code}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> Certified
                  </span>
                </div>

                <h3 className="font-bold text-euro-navy text-lg">{centre.name}</h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-euro-gold flex-shrink-0 mt-0.5" />
                    <span>
                      {centre.address}, {centre.city}, {centre.state} - {centre.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Seating Capacity: {centre.total_capacity} Candidates / Slot</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Helpdesk Helpline:</span>
                  <a
                    href={`tel:${centre.contact_phone}`}
                    className="font-bold text-euro-royal hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> {centre.contact_phone}
                  </a>
                </div>
                <Link
                  href={`/student/register?centre=${centre.id}`}
                  className="w-full text-center py-2 px-3 bg-slate-100 hover:bg-euro-navy hover:text-white text-euro-navy rounded-lg text-xs font-bold transition-colors block"
                >
                  Select This Centre In Registration
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* School Collaboration Card */}
        <div className="bg-gradient-to-r from-euro-navy via-slate-900 to-euro-deep rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Want Your School to Become an Official ETHEX Centre?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              School principals and institutional coordinators can invite EURO Campus to conduct ETHEX 2026 on their school premises with full logistics and scholarship benefits for students.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:9112223354"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-euro-dark font-extrabold text-xs rounded-xl shadow text-center"
            >
              Contact School Outreach
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
