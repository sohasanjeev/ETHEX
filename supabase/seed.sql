-- =============================================================================
-- ETHEX 2026: SEED DATA SCRIPT
-- Organising Institution: EURO Campus
-- Target: Classes 5-12, JEE, NEET, MHT-CET
-- =============================================================================

-- 1. SEED EXAM CENTRES (PCMC & Shikrapur as shown on flyer)
INSERT INTO exam_centres (id, centre_code, name, address, city, state, pincode, contact_phone, total_capacity, is_active)
VALUES 
    ('c1111111-1111-1111-1111-111111111111', 'EC-PCMC', 'EURO Campus — PCMC Centre', 'Sector 24, Near Spine Road, Pradhikaran, PCMC', 'Pimpri-Chinchwad', 'Maharashtra', '411044', '9112223354', 400, true),
    ('c2222222-2222-2222-2222-222222222222', 'EC-SHIK', 'EURO Campus — Shikrapur Centre', 'Euro Campus Academic Complex, Pune-Nagar Highway, Shikrapur', 'Pune', 'Maharashtra', '412208', '9607035688', 350, true),
    ('c3333333-3333-3333-3333-333333333333', 'EC-KOTH', 'EURO Campus Partner — Kothrud Regional Centre', 'Near MIT World Peace University, Paud Road, Kothrud', 'Pune', 'Maharashtra', '411038', '9112223354', 250, true)
ON CONFLICT (centre_code) DO NOTHING;

-- 2. SEED ROOMS FOR CENTRES
INSERT INTO exam_rooms (centre_id, room_number, floor, capacity, is_active)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Hall A - Galileo', 'Ground Floor', 80, true),
    ('c1111111-1111-1111-1111-111111111111', 'Hall B - Newton', '1st Floor', 80, true),
    ('c1111111-1111-1111-1111-111111111111', 'Room 101 - Ramanujan', '1st Floor', 40, true),
    ('c1111111-1111-1111-1111-111111111111', 'Room 102 - Aryabhata', '1st Floor', 40, true),
    ('c2222222-2222-2222-2222-222222222222', 'Kalam Auditorium', 'Ground Floor', 100, true),
    ('c2222222-2222-2222-2222-222222222222', 'Sarabhai Block Room 1', '1st Floor', 50, true),
    ('c2222222-2222-2222-2222-222222222222', 'Sarabhai Block Room 2', '1st Floor', 50, true)
ON CONFLICT DO NOTHING;

-- 3. SEED SUBJECTS
INSERT INTO subjects (id, code, name)
VALUES
    ('s1111111-1111-1111-1111-111111111111', 'PHY', 'Physics'),
    ('s2222222-2222-2222-2222-222222222222', 'CHE', 'Chemistry'),
    ('s3333333-3333-3333-3333-333333333333', 'MAT', 'Mathematics'),
    ('s4444444-4444-4444-4444-444444444444', 'BIO', 'Biology'),
    ('s5555555-5555-5555-5555-555555555555', 'APT', 'Mental Ability & Science Aptitude')
ON CONFLICT (code) DO NOTHING;

-- 4. SEED SCHOLARSHIP RULES
INSERT INTO scholarship_rules (id, title, min_percentage, rank_range_start, rank_range_end, award_percentage, cash_prize, includes_isro_tour, description, is_active)
VALUES
    ('r1111111-1111-1111-1111-111111111111', 'Platinum Star — ISRO Tour & 90% Waiver', 85.0, 1, 10, 90.0, 25000.00, true, 'Top 10 Performers receive fully sponsored ISRO Educational Tour, Stage-2 Cash Prize, and 90% scholarship in EURO Campus admission fee.', true),
    ('r2222222-2222-2222-2222-222222222222', 'Diamond Scholar — 90% Admission Scholarship', 80.0, 11, 50, 90.0, 10000.00, false, 'Ranks 11–50 earn 90% tuition fee scholarship at EURO Campus and Stage-2 cash prize.', true),
    ('r3333333-3333-3333-3333-333333333333', 'Gold Scholar — 75% Admission Scholarship', 70.0, 51, 150, 75.0, 5000.00, false, 'Ranks 51–150 receive 75% scholarship in admission fee for Foundation/JEE/NEET batches.', true),
    ('r4444444-4444-4444-4444-444444444444', 'Silver Scholar — 50% Admission Scholarship', 60.0, 151, 350, 50.0, 0.00, false, 'Ranks 151–350 earn 50% admission scholarship.', true),
    ('r5555555-5555-5555-5555-555555555555', 'Bronze Achiever — 25% Admission Scholarship', 50.0, 351, 1000, 25.0, 0.00, false, 'Qualifying participants scoring >= 50% earn 25% fee waiver.', true)
ON CONFLICT DO NOTHING;

-- 5. SEED EXAMS FOR UPCOMING CYCLE
INSERT INTO exams (
    id, code, title, class_category, target_stream, description,
    mode, fee_type, fee_amount, currency,
    registration_start, registration_end, exam_date,
    duration_minutes, total_questions, total_marks,
    marks_per_correct, negative_marking, status
)
VALUES
    (
        'e1111111-1111-1111-1111-111111111111',
        'ETHEX-FND-10',
        'ETHEX 2026: Class 10 Foundation & Talent Hunt',
        'Class 10',
        'Foundation',
        'Comprehensive assessment for Class 10 students targeting JEE, NEET, and MHT-CET foundations. Eligible for ISRO tour, up to 90% scholarship, and cash awards.',
        'hybrid',
        'free',
        0.00,
        'INR',
        NOW(),
        NOW() + INTERVAL '45 days',
        NOW() + INTERVAL '50 days',
        90,
        50,
        200,
        4.00,
        1.00,
        'open'
    ),
    (
        'e2222222-2222-2222-2222-222222222222',
        'ETHEX-FND-09',
        'ETHEX 2026: Class 9 Science & Math Talent Hunt',
        'Class 9',
        'Foundation',
        'For Class 9 students preparing for early Olympiad and Foundation rigor. Eligible for admission scholarships and ISRO visit selection.',
        'hybrid',
        'free',
        0.00,
        'INR',
        NOW(),
        NOW() + INTERVAL '45 days',
        NOW() + INTERVAL '50 days',
        90,
        50,
        200,
        4.00,
        1.00,
        'open'
    ),
    (
        'e3333333-3333-3333-3333-333333333333',
        'ETHEX-JEE-11',
        'ETHEX 2026: Class 11 JEE (Main + Advanced) Aspirants',
        'Class 11',
        'JEE',
        'Specialized entrance scholarship exam for JEE aspirants entering 11th standard or currently in 11th standard seeking top coaching batches at EURO Campus.',
        'hybrid',
        'free',
        0.00,
        'INR',
        NOW(),
        NOW() + INTERVAL '45 days',
        NOW() + INTERVAL '50 days',
        120,
        60,
        240,
        4.00,
        1.00,
        'open'
    ),
    (
        'e4444444-4444-4444-4444-444444444444',
        'ETHEX-NEET-11',
        'ETHEX 2026: Class 11 NEET Medical Aspirants',
        'Class 11',
        'NEET',
        'Targeted diagnostic test covering Physics, Chemistry, and Biology for pre-medical aspirants aiming for premier medical colleges.',
        'hybrid',
        'free',
        0.00,
        'INR',
        NOW(),
        NOW() + INTERVAL '45 days',
        NOW() + INTERVAL '50 days',
        120,
        60,
        240,
        4.00,
        1.00,
        'open'
    ),
    (
        'e5555555-5555-5555-5555-555555555555',
        'ETHEX-JUNIOR-8',
        'ETHEX 2026: Middle School Talent Search (Classes 5-8)',
        'Class 8',
        'Foundation',
        'Nurturing scientific temperament, logic, mental agility, and mathematical acumen from an early age.',
        'hybrid',
        'free',
        0.00,
        'INR',
        NOW(),
        NOW() + INTERVAL '45 days',
        NOW() + INTERVAL '50 days',
        60,
        40,
        160,
        4.00,
        0.00,
        'open'
    )
ON CONFLICT (code) DO NOTHING;

-- 6. SEED ANNOUNCEMENTS
INSERT INTO announcements (title, content, category, is_pinned, is_active)
VALUES
    (
        'ETHEX 2026 Registration Announcement',
        'EURO Campus is proud to announce registrations for ETHEX 2026 for Academic Year 2027–2028. Students from Classes 5 to 12 can participate online or at our certified offline centres.',
        'General',
        true,
        true
    ),
    (
        'ISRO Educational Tour Incentive for Top Scorers',
        'The highest achievers in ETHEX 2026 will earn a fully sponsored educational visit to ISRO facilities to experience India’s space science achievements firsthand.',
        'Scholarships',
        true,
        true
    ),
    (
        'Admit Cards & Centre Allotment Notice',
        'Admit cards will be released 7 days prior to the examination date. Candidates can verify credentials using the online verification portal or QR scanner.',
        'Examination',
        false,
        true
    )
ON CONFLICT DO NOTHING;
