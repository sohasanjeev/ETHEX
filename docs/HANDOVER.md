# ETHEX 2026 — FREELANCER TECHNICAL HANDOVER & DEPLOYMENT MANUAL
## Official Scholarship Examination & Student Management Platform
**Prepared for:** EURO Campus Management & IT Administration  
**Project:** ETHEX 2026 (EURO TALENT HUNT EXAM)  
**Academic Year:** 2027–2028  

---

## 1. Handover Overview & Ownership Transfer

This platform was developed as an end-to-end, production-oriented system for EURO Campus. All intellectual property, source code, database architectures, and associated assets are prepared for full legal and technical transfer to EURO Campus-controlled infrastructure.

### Mandatory Company-Owned Production Accounts:
To ensure long-term independence, security, and financial compliance, EURO Campus must establish and control the following accounts:
1. **GitHub Organization / Repository**:
   - Host repository under the company GitHub organization (e.g. `github.com/eurocampus/ethex-2026`).
2. **Vercel Production Team Project**:
   - Connect the GitHub repository to the official EURO Campus Vercel team account.
   - Configure custom domain (e.g. `ethex.eurojeeneet.com` or `ethex.eurocampus.edu.in`).
3. **Supabase Production Organization & Database**:
   - Create a dedicated Supabase production project in the Mumbai (AWS ap-south-1) region for lowest latency to students in Maharashtra and India.
   - Run migrations from `supabase/migrations/001_initial_schema.sql` and `supabase/seed.sql`.
4. **Razorpay Merchant Account**:
   - Register a verified corporate Razorpay merchant account in the legal name of EURO Campus.
   - Generate production API Keys (`rzp_live_...`) and configure the webhook endpoint at `https://your-domain.com/api/payment/webhook`.

---

## 2. Dynamic Administrative CMS (Key Requested Features)

Per the management prompt, the platform includes a dynamic administration engine at `/admin`:

### A. Updating the Examination Date
- **Context**: The past flyer indicated an examination date of 17 October. As that date has passed, the portal defaults the display to **"To Be Announced Soon"**.
- **How to Update**:
  1. Log in to the Admin Portal at `/admin`.
  2. Under the **Site Settings & CMS** tab, locate **Exam Date Display Text**.
  3. Enter the new date (e.g., `Sunday, 29 November 2026` or any upcoming schedule).
  4. Optionally enter an ISO timestamp in `exam_date_iso` and toggle the countdown timer.
  5. Click **"Save All Settings"**. The homepage hero, badge, and `/important-dates` schedule will update immediately across the live website.

### B. Updating Prize Money & Scholarship Amounts
- Administrators can adjust the scholarship pool (e.g. `₹2.5 CRORES`), Stage-2 cash prizes (`₹10 Lacs`), and fee waiver percentages (`Upto 90%`) anytime without developer intervention.

### C. Updating the Official EURO Campus Website Link
- The official company website URL is configured dynamically via the `euro_official_website_url` setting or `.env.local` (`EURO_OFFICIAL_WEBSITE_URL`).
- It renders in the footer as **"Visit Official EURO Campus Website"** with secure `rel="noopener noreferrer"`.

---

## 3. Database Migration & Supabase Setup Guide

### Running Schema on Supabase:
1. Log in to the Supabase Dashboard -> **SQL Editor**.
2. Paste the contents of `supabase/migrations/001_initial_schema.sql` and click **Run**.
   - This provisions all 15 relational tables with foreign keys, checks, timestamps, and Row Level Security (RLS) policies.
3. Paste the contents of `supabase/seed.sql` and click **Run**.
   - This populates the default examination centres (PCMC & Shikrapur), subjects, scholarship rules, and sample questions.

---

## 4. Razorpay Payment Gateway Production Workflow

1. Navigate to the Razorpay Dashboard -> **Settings -> API Keys**.
2. Switch to **Live Mode** and generate `Key ID` and `Key Secret`.
3. Add these credentials to the Vercel Production Environment Variables:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: `rzp_live_...`
   - `RAZORPAY_KEY_ID`: `rzp_live_...`
   - `RAZORPAY_KEY_SECRET`: `your_live_secret`
4. Set up Webhooks:
   - Webhook URL: `https://[your-domain]/api/payment/webhook`
   - Secret: Enter a strong random secret and store it in `RAZORPAY_WEBHOOK_SECRET`.
   - Events to subscribe: `payment.captured`, `payment.failed`, `refund.processed`.

---

## 5. Security & Row Level Security (RLS) Audit

- **Answer Key Privacy**: Questions queried by students during an active examination attempt strip the `is_correct` field on the server. Scoring is strictly performed server-side upon submission.
- **Seat Overbooking Prevention**: Centre allocations enforce capacity boundaries.
- **No Password Exposure**: Auth uses Supabase Auth bcrypt hashing. Passwords are never stored in profile tables.
- **Admit Card Integrity**: Each admit card features a unique cryptographic verification identifier and QR code resolving to `/verify-admit-card?code=...` without exposing private financial records.

---

## 6. Concurrency & High-Capacity Examination Performance

Target capacity: **500 concurrent students** during an examination window.
- **Answer Autosave**: The exam engine utilizes debounced saving to reduce server load.
- **Static Public Pages**: All public informational pages (`/`, `/about`, `/exam-details`, `/exam-pattern`, `/scholarships`, `/centres`) are statically prerendered with Next.js SSG for sub-50ms TTFB across edge CDN nodes.
- **Database Connection Pooling**: Supabase PgBouncer (Transaction mode, port 6543) is recommended in production to handle concurrent connection spikes.

---

## 7. Deliverables Checklist

- [x] Complete Next.js 14 responsive application with TypeScript & Tailwind CSS.
- [x] Official EURO Campus & ETHEX 2026 combined logo branding.
- [x] High-resolution official flyer (`public/branding/ethex_official_poster.jpg`) integration with zoom modal.
- [x] Student registration, login, and profile completion with parental consent.
- [x] Student dashboard with application tracking, admit card generation, and receipts.
- [x] Admin dashboard with dynamic CMS for Exam Dates, Prize Money, and Official Website link.
- [x] Online MCQ examination engine with timer, autosave, palette, and scoring.
- [x] Offline centre and seating allocation for PCMC, Shikrapur, and partner locations.
- [x] Razorpay server-side integration with signature verification.
- [x] Public Scorecard lookup and Admit Card QR authenticator.
- [x] Complete Supabase SQL migrations and seed data.
- [x] Verified production build (`npm run build` passing with 0 errors).
