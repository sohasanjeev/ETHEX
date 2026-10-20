'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Building } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentClass: 'Class 10',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-euro-royal bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-euro-navy">
            Contact EURO Campus Academic Admissions
          </h1>
          <p className="text-slate-600 text-sm">
            Have queries about ETHEX 2026, syllabus, scholarships, or offline centres? Connect with our dedicated counselor desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Campus Cards & Phones */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-euro-royal font-bold text-sm">
                <Building className="w-4 h-4 text-euro-gold" />
                <span>PCMC Campus & Help Desk</span>
              </div>
              <p className="text-xs text-slate-600">
                Sector 24, Near Spine Road, Pradhikaran, PCMC, Pune, Maharashtra - 411044
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-euro-royal" />
                <a href="tel:9112223354" className="font-bold text-xs text-slate-800 hover:text-euro-royal">
                  +91 9112223354
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-euro-royal font-bold text-sm">
                <Building className="w-4 h-4 text-euro-gold" />
                <span>Shikrapur Academic Complex</span>
              </div>
              <p className="text-xs text-slate-600">
                Euro Campus Academic Complex, Pune-Nagar Highway, Shikrapur, Maharashtra - 412208
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-euro-royal" />
                <a href="tel:9607035688" className="font-bold text-xs text-slate-800 hover:text-euro-royal">
                  +91 9607035688
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-euro-royal font-bold text-sm">
                <Mail className="w-4 h-4 text-euro-gold" />
                <span>Admissions & General Inquiries</span>
              </div>
              <a
                href="mailto:admissions@eurocampus.edu.in"
                className="font-medium text-xs text-slate-700 hover:text-euro-royal block"
              >
                admissions@eurocampus.edu.in
              </a>
              <p className="text-[11px] text-slate-500">
                Queries are answered within 24 hours during working days (Mon–Sat, 9:00 AM – 7:00 PM IST).
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-euro-navy text-lg border-b border-slate-100 pb-3">
                Send an Admission Inquiry
              </h3>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-base">Inquiry Submitted Successfully</h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    Thank you for contacting EURO Campus. Our academic counselor will reach out to your mobile number shortly with ETHEX 2026 details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-800 underline mt-2"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Student / Parent Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Current Class *</label>
                      <select
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal bg-white"
                      >
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9 (Foundation)</option>
                        <option value="Class 10">Class 10 (Foundation)</option>
                        <option value="Class 11 JEE">Class 11 (JEE Main + Adv)</option>
                        <option value="Class 11 NEET">Class 11 (NEET Medical)</option>
                        <option value="Class 12 JEE">Class 12 (JEE Main + Adv)</option>
                        <option value="Class 12 NEET">Class 12 (NEET Medical)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Your Question or Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask about test centres, scholarship criteria, or batch details..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-euro-royal"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-euro-royal hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
