# ETHEX 2026 — EURO TALENT HUNT EXAM
## Official Scholarship Examination & Student Management Platform for EURO Campus
### Academic Year: 2027–2028 | Target Cohort: Classes 5–12, Foundation, JEE, NEET & MHT-CET

---

## 1. Executive Summary

**ETHEX 2026** is a production-grade scholarship examination, student registration, and examination administration platform engineered specifically for **EURO Campus** (Pune, Maharashtra). 

The platform supports the entire examination lifecycle:
1. **Public Information & Admissions**: High-conversion responsive portal showcasing the official **₹2.5 Crores** scholarship pool, **₹10 Lacs** Stage-2 cash prizes, **ISRO Educational Tour** for top performers, eligibility criteria, centres, and syllabus patterns.
2. **Student Authentication & Portal**: Account creation, class/stream selection (Classes 5 to 12), parental consent, free/paid registration workflows, and downloadable payment receipts.
3. **Admit Card Generation & Authenticity**: Instant generation of official branded admit cards with verified Roll Numbers, reporting times, centre allocations, candidate photo box, and dynamic cryptographic QR verification codes.
4. **Online MCQ Examination Engine**: Server-enforced countdown timer, live autosaving with server sync, distraction-free interface, question palette, marked-for-review tagging, and automatic server-side evaluation with negative marking.
5. **Offline Centre & Seating Management**: Capacity tracking and seating allocation across EURO Campus flagship centres in **PCMC (9112223354)**, **Shikrapur (9607035688)**, and partner regional halls.
6. **Payment Gateway (Razorpay)**: Server-side order creation, HMAC-SHA256 signature verification, webhook processing, idempotent ledger tracking, and refund workflows.
7. **Comprehensive Admin Dashboard & Dynamic CMS**: Centralized control panel allowing authorized EURO Campus administrators to:
   - **Update Examination Dates**: Change dates dynamically (e.g. updating the previous 17 October date to the new upcoming schedule).
   - **Update Prize Money & Scholarships**: Change scholarship pool, cash prizes, and fee waiver percentages.
   - **Configure the Official EURO Campus Website URL**: Dynamically manage the official link (`EURO_OFFICIAL_WEBSITE_URL`) rendered across navigation and footers.
   - **Manage Helplines & Announcements**: Real-time website notice banner updates.
   - **Manage Exams, Question Banks, Applications & Results**.

---

## 2. Technology Architecture

- **Frontend Framework**: Next.js 14 (App Router) with TypeScript & React.
- **Styling**: Tailwind CSS with custom EURO Campus design tokens (Navy Blue, Royal Blue, Gold/Yellow accents).
- **Icons & Components**: Lucide React, Canvas Confetti, QRCode generator.
- **Database**: Supabase PostgreSQL with relational foreign keys, constraints, and Row Level Security (RLS) policies.
- **Server APIs**: Next.js Serverless Route Handlers with server-side validation.
- **Payment Processing**: Razorpay SDK with test/live merchant switching and HMAC verification.
- **Hosting Target**: Vercel Serverless Edge network.

---

## 3. Directory Structure

```
ethex-2026/
├── app/
│   ├── (public pages)/
│   │   ├── page.tsx                     # ETHEX 2026 Homepage
│   │   ├── about/page.tsx               # About ETHEX & EURO Campus
│   │   ├── exam-details/page.tsx        # Structure & Eligibility (Classes 5-12)
│   │   ├── exam-pattern/page.tsx        # Syllabus & Marking Schemes (+4 / -1)
│   │   ├── scholarships/page.tsx        # ISRO Tour & Scholarship Tiers
│   │   ├── important-dates/page.tsx     # Dynamic Schedule & Deadlines
│   │   ├── instructions/page.tsx        # Code of Conduct (Online & Offline)
│   │   ├── centres/page.tsx             # Published Centres (PCMC & Shikrapur)
│   │   ├── faqs/page.tsx                # Categorized FAQs Accordion
│   │   ├── contact/page.tsx             # Campus Helplines & Inquiry Form
│   │   ├── privacy-policy/page.tsx      # Privacy Policy & Parental Consent
│   │   ├── terms/page.tsx               # Candidate Terms & Conditions
│   │   ├── refund-policy/page.tsx       # Refund & Cancellation Policy
│   │   ├── results/page.tsx             # Scorecard Lookup & Merit List
│   │   └── verify-admit-card/page.tsx   # QR Code Authenticator
│   ├── student/
│   │   ├── register/page.tsx            # Student Account Registration
│   │   ├── login/page.tsx               # Student Login
│   │   ├── forgot-password/page.tsx     # Password Recovery
│   │   ├── dashboard/page.tsx           # Student Management Dashboard
│   │   └── exam/[attemptId]/page.tsx    # Proctored Online MCQ Examination Engine
│   ├── admin/
│   │   ├── login/page.tsx               # Administrator Authentication
│   │   └── page.tsx                     # Admin Portal & Dynamic CMS
│   ├── api/                             # Serverless API Handlers
│   │   ├── site-settings/route.ts       # Dynamic CMS & Scheduling API
│   │   ├── exams/route.ts               # Exam Management API
│   │   ├── centres/route.ts             # Centre Management API
│   │   ├── applications/                # Application submission & listing
│   │   ├── payment/                     # Razorpay create-order & verify
│   │   ├── exam/                        # Exam start, autosave & submit
│   │   ├── results/                     # Public scorecard search
│   │   ├── scholarships/                # Scholarship rules API
│   │   └── auth/                        # Student & Admin authentication
│   └── globals.css                      # Global design system & print styles
├── components/
│   ├── branding/                        # EuroCampusLogo, EthexLogo, CombinedBrandLogo
│   ├── layout/                          # Navbar, Footer, AnnouncementBar, AppWrapper
│   └── student/                         # AdmitCardModal, PaymentReceiptModal
├── lib/
│   ├── services/dataService.ts          # Central data layer with mock/live fallback
│   ├── razorpay/server.ts               # Server Razorpay order & signature verifier
│   ├── supabase/                        # Client and Server Supabase helpers
│   └── types/index.ts                   # Domain TypeScript models
├── public/
│   └── branding/ethex_official_poster.jpg # High-resolution official flyer
├── supabase/
│   ├── migrations/001_initial_schema.sql  # Complete schema & RLS policies
│   └── seed.sql                           # Seed data for centres, exams & rules
├── .env.example                         # Documented environment template
└── README.md
```

---

## 4. Environment Configuration

Create `.env.local` using `.env.example` as reference:

```env
# Application Base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Credentials (from Supabase Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Payment Gateway (Test or Live)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourKeyId
RAZORPAY_KEY_ID=rzp_test_yourKeyId
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Official EURO Campus Website URL
# Configurable link for footer and navigation
EURO_OFFICIAL_WEBSITE_URL=https://www.eurojeeneet.com
NEXT_PUBLIC_EURO_OFFICIAL_WEBSITE_URL=https://www.eurojeeneet.com
```

---

## 5. Local Development & Testing

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production build check**:
   ```bash
   npm run build
   ```

---

## 6. Key Demo Logins for Testing

- **Student Portal**:
  - URL: `/student/login`
  - Demo Account: Click **"Quick Test Login"** button or sign in with:
    - Email: `aarav.patil@example.com`
    - Class: Class 10 (Foundation)
  - Features: Download Admit Card, Review Receipts, Start Online Exam, View Verified Result.
- **Admin Portal**:
  - URL: `/admin/login`
  - Demo Account: Click **"Quick Demo Login (Super Admin)"** button or sign in with:
    - Email: `admin@eurocampus.edu.in`
  - Features: Change Exam Date from 17 Oct to new schedule, Edit Prize Money (₹2.5 Cr / ₹10 Lacs / 90%), update EURO Campus Website URL, change Announcements, monitor Live Metrics, and manage Centres.
- **Scorecard Lookup**:
  - URL: `/results`
  - Query: `ETHEX26-24101`
- **Admit Card Authenticator**:
  - URL: `/verify-admit-card`
  - Code: `ETHEX-VERIFY-24101-SEC99`

---

## 7. Deployment Instructions (Vercel)

1. Push code to the company GitHub repository.
2. Link the repository to your company Vercel project.
3. Configure the environment variables in Vercel Project Settings.
4. Deploy with automatic CI/CD.
