-- =============================================================================
-- ETHEX 2026: EURO TALENT HUNT EXAM — COMPREHENSIVE SUPABASE DATABASE SCHEMA
-- Organising Institution: EURO Campus
-- Target: Classes 5-12 & JEE/NEET/MHT-CET Aspirants
-- =============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE CONFIGURATION & CMS SETTINGS
-- Allows Super Admin to dynamically update Exam Date, Year, Prize Money, Helplines, and EURO Campus Website URL
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
    exam_name VARCHAR(100) NOT NULL DEFAULT 'ETHEX 2026',
    exam_full_form VARCHAR(150) NOT NULL DEFAULT 'EURO TALENT HUNT EXAM',
    academic_year VARCHAR(50) NOT NULL DEFAULT '2027–2028',
    exam_edition VARCHAR(50) NOT NULL DEFAULT '2026',
    exam_date_display VARCHAR(100) NOT NULL DEFAULT 'To Be Announced Soon',
    exam_date_iso TIMESTAMPTZ,
    is_countdown_active BOOLEAN NOT NULL DEFAULT FALSE,
    admission_scholarship_pool VARCHAR(100) NOT NULL DEFAULT '₹2.5 CRORES',
    cash_prize_pool VARCHAR(100) NOT NULL DEFAULT '₹10 Lacs (Stage-2)',
    max_scholarship_percentage VARCHAR(50) NOT NULL DEFAULT 'Upto 90%',
    isro_tour_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    isro_tour_tagline VARCHAR(200) NOT NULL DEFAULT 'Top Performers Can Earn an ISRO Educational Tour',
    euro_official_website_url VARCHAR(255) DEFAULT 'https://www.eurojeeneet.com',
    helpline_pcmc VARCHAR(50) NOT NULL DEFAULT '9112223354',
    helpline_shikrapur VARCHAR(50) NOT NULL DEFAULT '9607035688',
    official_email VARCHAR(100) NOT NULL DEFAULT 'admissions@eurocampus.edu.in',
    announcement_bar_text VARCHAR(500) DEFAULT 'Registrations for ETHEX 2026 opening soon! New exam schedule will be notified here.',
    announcement_bar_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (
    id, exam_name, exam_full_form, academic_year, exam_edition, exam_date_display,
    admission_scholarship_pool, cash_prize_pool, max_scholarship_percentage, isro_tour_enabled,
    euro_official_website_url, helpline_pcmc, helpline_shikrapur, official_email
) VALUES (
    'current', 'ETHEX 2026', 'EURO TALENT HUNT EXAM', '2027–2028', '2026', 'To Be Announced Soon',
    '₹2.5 CRORES', '₹10 Lacs (Stage-2)', 'Upto 90%', TRUE,
    'https://www.eurojeeneet.com', '9112223354', '9607035688', 'admissions@eurocampus.edu.in'
) ON CONFLICT (id) DO NOTHING;

-- 2. USER PROFILES & ROLES
CREATE TYPE user_role AS ENUM (
    'student',
    'super_admin',
    'exam_manager',
    'finance_manager',
    'centre_coordinator',
    'evaluator'
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS student_details (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    dob DATE,
    gender VARCHAR(20),
    parent_name VARCHAR(150),
    parent_phone VARCHAR(20),
    parent_email VARCHAR(255),
    current_class VARCHAR(10) NOT NULL, -- '5', '6', '7', '8', '9', '10', '11', '12'
    target_stream VARCHAR(50) NOT NULL, -- 'Foundation', 'JEE', 'NEET', 'MHT-CET'
    school_name VARCHAR(255),
    board VARCHAR(50) DEFAULT 'CBSE', -- 'CBSE', 'ICSE', 'State Board', 'Other'
    address_line TEXT,
    city VARCHAR(100) NOT NULL DEFAULT 'Pune',
    state VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
    pincode VARCHAR(20),
    photo_url TEXT,
    is_profile_completed BOOLEAN NOT NULL DEFAULT FALSE,
    consent_agreed BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EXAMS CONFIGURATION
CREATE TYPE exam_mode AS ENUM ('online', 'offline', 'hybrid');
CREATE TYPE exam_status AS ENUM ('draft', 'upcoming', 'open', 'closed', 'in_progress', 'completed', 'results_published');

CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    class_category VARCHAR(20) NOT NULL, -- 'Class 5', 'Class 6', ..., 'Class 10', 'Class 11 (JEE)', 'Class 11 (NEET)', 'Class 12 (JEE)', 'Class 12 (NEET)'
    target_stream VARCHAR(50) NOT NULL, -- 'Foundation', 'JEE', 'NEET', 'MHT-CET'
    description TEXT,
    mode exam_mode NOT NULL DEFAULT 'hybrid',
    fee_type VARCHAR(20) NOT NULL DEFAULT 'free', -- 'free' or 'paid'
    fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    registration_start TIMESTAMPTZ NOT NULL,
    registration_end TIMESTAMPTZ NOT NULL,
    exam_date TIMESTAMPTZ NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 90,
    total_questions INT NOT NULL DEFAULT 50,
    total_marks INT NOT NULL DEFAULT 200,
    marks_per_correct NUMERIC(4, 2) NOT NULL DEFAULT 4.00,
    negative_marking NUMERIC(4, 2) NOT NULL DEFAULT 1.00,
    status exam_status NOT NULL DEFAULT 'open',
    admit_card_available_from TIMESTAMPTZ,
    result_published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. OFFLINE CENTRES & ROOMS
CREATE TABLE IF NOT EXISTS exam_centres (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    centre_code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    contact_phone VARCHAR(50),
    total_capacity INT NOT NULL DEFAULT 200,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exam_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    centre_id UUID NOT NULL REFERENCES exam_centres(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    floor VARCHAR(20),
    capacity INT NOT NULL DEFAULT 40,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(centre_id, room_number)
);

-- 5. CANDIDATE APPLICATIONS
CREATE TYPE application_status AS ENUM (
    'draft',
    'pending_payment',
    'submitted',
    'confirmed',
    'under_review',
    'cancelled',
    'rejected'
);

CREATE TYPE payment_status AS ENUM (
    'not_required',
    'pending',
    'successful',
    'failed',
    'refunded'
);

CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(50) NOT NULL UNIQUE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
    selected_mode exam_mode NOT NULL DEFAULT 'online',
    centre_id UUID REFERENCES exam_centres(id) ON DELETE SET NULL,
    room_id UUID REFERENCES exam_rooms(id) ON DELETE SET NULL,
    seat_number VARCHAR(30),
    roll_number VARCHAR(50) UNIQUE,
    admit_card_number VARCHAR(50) UNIQUE,
    application_status application_status NOT NULL DEFAULT 'submitted',
    payment_status payment_status NOT NULL DEFAULT 'not_required',
    fee_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    fee_paid NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    admit_card_published BOOLEAN NOT NULL DEFAULT FALSE,
    qr_verification_code VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    UNIQUE(student_id, exam_id) -- Prevent duplicate application for the same exam
);

-- 6. RAZORPAY PAYMENT TRANSACTIONS
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receipt_number VARCHAR(100) NOT NULL UNIQUE,
    razorpay_order_id VARCHAR(100) NOT NULL UNIQUE,
    razorpay_payment_id VARCHAR(100) UNIQUE,
    razorpay_signature VARCHAR(255),
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'INR',
    status VARCHAR(50) NOT NULL DEFAULT 'created', -- 'created', 'pending', 'successful', 'failed', 'refunded'
    payment_method VARCHAR(50),
    error_code VARCHAR(100),
    error_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. REFUNDS MANAGEMENT
CREATE TABLE IF NOT EXISTS refund_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_transaction_id UUID NOT NULL REFERENCES payment_transactions(id) ON DELETE CASCADE,
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'processed', 'rejected'
    razorpay_refund_id VARCHAR(100),
    processed_by UUID REFERENCES profiles(id),
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. QUESTION BANK & QUESTIONS
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
    class_category VARCHAR(30) NOT NULL,
    target_stream VARCHAR(50) NOT NULL,
    question_text TEXT NOT NULL,
    image_url TEXT,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'medium', -- 'easy', 'medium', 'hard'
    marks NUMERIC(4, 2) NOT NULL DEFAULT 4.00,
    negative_marks NUMERIC(4, 2) NOT NULL DEFAULT 1.00,
    explanation TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_label VARCHAR(5) NOT NULL, -- 'A', 'B', 'C', 'D'
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(question_id, option_label)
);

CREATE TABLE IF NOT EXISTS exam_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    section_name VARCHAR(100) NOT NULL DEFAULT 'General',
    order_index INT NOT NULL DEFAULT 1,
    UNIQUE(exam_id, question_id)
);

-- 9. ONLINE EXAM ATTEMPTS & LIVE ANSWERS
CREATE TABLE IF NOT EXISTS exam_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    server_deadline TIMESTAMPTZ NOT NULL,
    submitted_at TIMESTAMPTZ,
    status VARCHAR(30) NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'submitted', 'auto_submitted', 'evaluated'
    total_score NUMERIC(8, 2) DEFAULT 0.00,
    total_correct INT DEFAULT 0,
    total_incorrect INT DEFAULT 0,
    total_unattempted INT DEFAULT 0,
    percentage NUMERIC(5, 2) DEFAULT 0.00,
    qualifying_status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES question_options(id) ON DELETE SET NULL,
    is_marked_for_review BOOLEAN NOT NULL DEFAULT FALSE,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(attempt_id, question_id)
);

-- 10. OFFLINE ATTENDANCE RECORDS
CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    centre_id UUID NOT NULL REFERENCES exam_centres(id) ON DELETE RESTRICT,
    room_id UUID REFERENCES exam_rooms(id) ON DELETE SET NULL,
    roll_number VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'present', -- 'present', 'absent', 'late', 'disqualified'
    remarks TEXT,
    marked_by UUID REFERENCES profiles(id),
    marked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. RESULTS & RANKINGS
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE RESTRICT,
    roll_number VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    class_category VARCHAR(30) NOT NULL,
    stream VARCHAR(50) NOT NULL,
    marks_obtained NUMERIC(8, 2) NOT NULL,
    max_marks NUMERIC(8, 2) NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    section_scores JSONB DEFAULT '{}'::jsonb,
    rank_overall INT,
    rank_category INT,
    is_qualified BOOLEAN NOT NULL DEFAULT TRUE,
    scholarship_tier VARCHAR(100),
    scholarship_percentage NUMERIC(5, 2) DEFAULT 0,
    cash_prize_eligible BOOLEAN NOT NULL DEFAULT FALSE,
    isro_tour_eligible BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. SCHOLARSHIP RULES & AWARDS
CREATE TABLE IF NOT EXISTS scholarship_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    min_percentage NUMERIC(5, 2) NOT NULL,
    rank_range_start INT,
    rank_range_end INT,
    award_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0,
    cash_prize NUMERIC(10, 2) DEFAULT 0,
    includes_isro_tour BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scholarship_awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    result_id UUID REFERENCES results(id) ON DELETE CASCADE,
    scholarship_rule_id UUID REFERENCES scholarship_rules(id) ON DELETE RESTRICT,
    award_type VARCHAR(100) NOT NULL, -- 'Admission Scholarship', 'Cash Prize Stage-2', 'ISRO Educational Tour'
    benefit_description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'eligible', -- 'eligible', 'awaiting_verification', 'approved', 'awarded', 'revoked'
    approved_by UUID REFERENCES profiles(id),
    approved_at TIMESTAMPTZ,
    certificate_code VARCHAR(100) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. ANNOUNCEMENTS & NOTIFICATIONS
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'info',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    payload JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE refund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attempt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarship_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Site Settings: Anyone can read, only super_admin can update
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Super admin can update site settings" ON site_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Profiles: Users can read and update their own, super_admin can view all
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'finance_manager', 'centre_coordinator'))
);

-- Student Details: Student can access own, staff can view
CREATE POLICY "Students can access own details" ON student_details FOR ALL USING (auth.uid() = profile_id);
CREATE POLICY "Admins can access student details" ON student_details FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'centre_coordinator'))
);

-- Exams: Anyone can view active exams, managers can edit
CREATE POLICY "Public can view open exams" ON exams FOR SELECT USING (status != 'draft');
CREATE POLICY "Exam managers full exam access" ON exams FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager'))
);

-- Centres & Rooms: Public can view active centres, staff can manage
CREATE POLICY "Public can view active centres" ON exam_centres FOR SELECT USING (is_active = true);
CREATE POLICY "Staff can view rooms" ON exam_rooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage centres and rooms" ON exam_centres FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'centre_coordinator'))
);

-- Applications: Students can see their own, admins see all
CREATE POLICY "Students see own applications" ON applications FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students insert own application" ON applications FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Staff full applications access" ON applications FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'finance_manager', 'centre_coordinator'))
);

-- Payments: Students see own payments, finance and super_admin see all
CREATE POLICY "Students view own payments" ON payment_transactions FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Finance managers view all payments" ON payment_transactions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'finance_manager'))
);

-- Questions & Options: Prevent students from querying correct answers directly!
-- Only exam managers and super admins can view is_correct = true
CREATE POLICY "Public can view active questions without answer key" ON questions FOR SELECT USING (is_active = true);
CREATE POLICY "Managers full question access" ON questions FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'evaluator'))
);

-- Attempts & Answers: Students access their own attempt
CREATE POLICY "Students can access own attempts" ON exam_attempts FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Students can save own answers" ON attempt_answers FOR ALL USING (
    EXISTS (SELECT 1 FROM exam_attempts WHERE id = attempt_id AND student_id = auth.uid())
);

-- Results: Published results visible to the candidate, admins see all
CREATE POLICY "Students see own published result" ON results FOR SELECT USING (
    auth.uid() = student_id AND is_published = true
);
CREATE POLICY "Admins full result access" ON results FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'exam_manager', 'evaluator'))
);

-- Announcements & Notifications
CREATE POLICY "Public can read active announcements" ON announcements FOR SELECT USING (is_active = true);
CREATE POLICY "Users read own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- Audit logs: Super admin only
CREATE POLICY "Super admin can view audit logs" ON audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);
