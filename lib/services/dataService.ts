import fs from 'fs';
import path from 'path';
import {
  SiteSettings,
  Exam,
  ExamCentre,
  ExamRoom,
  Application,
  PaymentTransaction,
  Question,
  ExamAttempt,
  AttemptAnswer,
  Result,
  ResultChampion,
  ScholarshipRule,
  Announcement,
  UserProfile,
  StudentDetails,
  ExamCategory,
  ExamTemplate,
  Batch,
  TeacherAccount,
} from '../types';

// Default initial state matching official EURO Campus ETHEX 2026 specifications
let siteSettingsState: SiteSettings = {
  id: 'current',
  exam_name: 'ETHEX 2026',
  exam_full_form: 'EURO TALENT HUNT EXAM',
  academic_year: '2027–2028',
  exam_edition: '2026',
  exam_date_display: '29th November 2026 (Sunday)',
  exam_date_iso: '2026-11-29T10:00:00+05:30',
  is_countdown_active: true,
  admission_scholarship_pool: '₹2.5 CRORES',
  cash_prize_pool: '₹10 Lakhs (Stage-2)',
  max_scholarship_percentage: 'Up to 90%',
  isro_tour_enabled: true,
  isro_tour_tagline: 'Top Performers Can Earn an ISRO Educational Tour',
  euro_official_website_url: 'https://eurocampus.in/',
  helpline_pcmc: '9112223354 / 9112233995',
  helpline_shikrapur: '9112233995',
  official_email: 'admissions@eurocampus.edu.in',
  announcement_bar_text: 'ETHEX 2026 Examination: 29th November 2026 for Classes 8 to 12 • Win Up to 90% Scholarship & ISRO Tour!',
  announcement_bar_active: true,
  registration_fee: 100,
  hero_banner_desktop_url: '/branding/hero_landscape_banner.png',
  hero_banner_mobile_url: '/branding/hero_mobile_banner.png',
  syllabus_pamphlet_url: '/branding/syllabus/class10.svg',
  syllabus_urls: {
    class8: '/uploads/ethex_2027_class_8_syllabus.png',
    class9: '/uploads/ethex_2027_class_9_syllabus.png',
    class10: '/branding/syllabus/class10.svg',
    jee_class11: '/branding/syllabus/jee_class11.svg',
    neet_class11: '/branding/syllabus/neet_class11.svg',
    jee_class12: '/branding/syllabus/jee_class12.svg',
    neet_class12: '/branding/syllabus/neet_class12.svg',
  },
  sample_paper_urls: {
    class8: '/uploads/ethex_2027_class_8_sample_paper.pdf',
    class9: '/uploads/ethex_2027_class_9_sample_paper.pdf',
    class10: '/uploads/ethex_2027_class_10_sample_paper.pdf',
    jee_class11: '/uploads/ethex_2027_class_11_sample_paper.pdf',
    neet_class11: '/uploads/ethex_2027_class_11_sample_paper.pdf',
    jee_class12: '/branding/syllabus/jee_class12.svg',
    neet_class12: '/branding/syllabus/neet_class12.svg',
  },
  syllabus_images: {
    class8: '/uploads/ethex_2027_class_8_syllabus.png',
    class9: '/uploads/ethex_2027_class_9_syllabus.png',
    class10: '/branding/syllabus/class10.svg',
    jee_class11: '/branding/syllabus/jee_class11.svg',
    neet_class11: '/branding/syllabus/neet_class11.svg',
    jee_class12: '/branding/syllabus/jee_class12.svg',
    neet_class12: '/branding/syllabus/neet_class12.svg',
  },
  results_pamphlet_url: '/branding/euro_result_banner.jpg',
  results_headline: 'EURO CAMPUS Champions — NEET 650+ & National ISRO Tour Qualifiers',
  updated_at: new Date().toISOString(),
};

let centresState: ExamCentre[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    centre_code: 'EC-PCMC',
    name: 'EURO Campus — PCMC Centre (Chinchwad)',
    address: '4th Floor, above Vijay Sales, Empire Estate Phase-II, Chinchwad',
    city: 'Pimpri-Chinchwad, Pune',
    state: 'Maharashtra',
    pincode: '411019',
    contact_phone: '9112223354',
    total_capacity: 400,
    is_active: true,
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    centre_code: 'EC-SHIK',
    name: 'EURO Campus — Shikrapur Centre',
    address: 'Kalamkar Vasti, Hivare Road, Shikrapur',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412208',
    contact_phone: '9112233995',
    total_capacity: 350,
    is_active: true,
  },
];

let roomsState: ExamRoom[] = [
  { id: 'r1', centre_id: 'c1111111-1111-1111-1111-111111111111', room_number: 'Hall A - Galileo', floor: 'Ground Floor', capacity: 80, is_active: true },
  { id: 'r2', centre_id: 'c1111111-1111-1111-1111-111111111111', room_number: 'Hall B - Newton', floor: '1st Floor', capacity: 80, is_active: true },
  { id: 'r3', centre_id: 'c1111111-1111-1111-1111-111111111111', room_number: 'Room 101 - Ramanujan', floor: '1st Floor', capacity: 40, is_active: true },
  { id: 'r4', centre_id: 'c2222222-2222-2222-2222-222222222222', room_number: 'Kalam Auditorium', floor: 'Ground Floor', capacity: 100, is_active: true },
  { id: 'r5', centre_id: 'c2222222-2222-2222-2222-222222222222', room_number: 'Sarabhai Block Room 1', floor: '1st Floor', capacity: 50, is_active: true },
];

let examsState: Exam[] = [
  {
    id: 'e1111111-1111-1111-1111-111111111111',
    code: 'ETHEX-FND-10',
    title: 'ETHEX 2026: Class 10 Foundation & Science Exposure',
    class_category: 'Class 10',
    target_stream: 'Foundation',
    description: 'Comprehensive scholarship test for Class 10 students targeting JEE, NEET & MHT-CET. Eligible for ISRO Educational Tour, up to 90% scholarship, and cash awards.',
    mode: 'hybrid',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-11-30T23:59:59Z',
    exam_date: '2026-12-15T10:00:00Z',
    duration_minutes: 90,
    total_questions: 50,
    total_marks: 200,
    marks_per_correct: 4.0,
    negative_marking: 1.0,
    status: 'open',
    admit_card_available_from: '2026-12-08T00:00:00Z',
  },
  {
    id: 'e2222222-2222-2222-2222-222222222222',
    code: 'ETHEX-FND-09',
    title: 'ETHEX 2026: Class 9 Foundation & Talent Hunt',
    class_category: 'Class 9',
    target_stream: 'Foundation',
    description: 'For Class 9 students preparing for Olympiads and early foundation for competitive engineering & medical careers.',
    mode: 'hybrid',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-11-30T23:59:59Z',
    exam_date: '2026-12-15T10:00:00Z',
    duration_minutes: 90,
    total_questions: 50,
    total_marks: 200,
    marks_per_correct: 4.0,
    negative_marking: 1.0,
    status: 'open',
  },
  {
    id: 'e3333333-3333-3333-3333-333333333333',
    code: 'ETHEX-JEE-11',
    title: 'ETHEX 2026: Class 11 JEE (Main + Advanced) Aspirants',
    class_category: 'Class 11',
    target_stream: 'JEE',
    description: 'Specialized competitive diagnostic & scholarship examination for engineering aspirants aiming for premier IITs & NITs.',
    mode: 'hybrid',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-11-30T23:59:59Z',
    exam_date: '2026-12-15T14:00:00Z',
    duration_minutes: 120,
    total_questions: 60,
    total_marks: 240,
    marks_per_correct: 4.0,
    negative_marking: 1.0,
    status: 'open',
  },
  {
    id: 'e4444444-4444-4444-4444-444444444444',
    code: 'ETHEX-NEET-11',
    title: 'ETHEX 2026: Class 11 NEET Medical Aspirants',
    class_category: 'Class 11',
    target_stream: 'NEET',
    description: 'Targeted assessment in Physics, Chemistry, and Biology for pre-medical aspirants seeking admission to top medical colleges.',
    mode: 'hybrid',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-11-30T23:59:59Z',
    exam_date: '2026-12-15T14:00:00Z',
    duration_minutes: 120,
    total_questions: 60,
    total_marks: 240,
    marks_per_correct: 4.0,
    negative_marking: 1.0,
    status: 'open',
  },
  {
    id: 'e5555555-5555-5555-5555-555555555555',
    code: 'ETHEX-MID-8',
    title: 'ETHEX 2026: Middle School Talent Search (Classes 5–8)',
    class_category: 'Class 8',
    target_stream: 'Foundation',
    description: 'Nurturing scientific inquisitiveness, mathematical reasoning, and logical problem solving for young minds.',
    mode: 'hybrid',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-11-30T23:59:59Z',
    exam_date: '2026-12-15T10:00:00Z',
    duration_minutes: 60,
    total_questions: 40,
    total_marks: 160,
    marks_per_correct: 4.0,
    negative_marking: 0.0,
    status: 'open',
  },
];

let questionsState: Record<string, Question[]> = {
  'e1111111-1111-1111-1111-111111111111': [
    {
      id: 'q1',
      subject_id: 'PHY',
      class_category: 'Class 10',
      target_stream: 'Foundation',
      question_text: 'An electric lamp of resistance 20 Ω and a conductor of 4 Ω resistance are connected in series to a 6 V battery. The total current in the circuit is:',
      difficulty: 'easy',
      marks: 4,
      negative_marks: 1,
      explanation: 'Total resistance R = 20 + 4 = 24 Ω. Current I = V / R = 6 / 24 = 0.25 A.',
      options: [
        { id: 'opt1_a', question_id: 'q1', option_label: 'A', option_text: '0.25 A', is_correct: true },
        { id: 'opt1_b', question_id: 'q1', option_label: 'B', option_text: '0.5 A', is_correct: false },
        { id: 'opt1_c', question_id: 'q1', option_label: 'C', option_text: '1.0 A', is_correct: false },
        { id: 'opt1_d', question_id: 'q1', option_label: 'D', option_text: '4.0 A', is_correct: false },
      ],
    },
    {
      id: 'q2',
      subject_id: 'CHE',
      class_category: 'Class 10',
      target_stream: 'Foundation',
      question_text: 'Which of the following compounds turns blue litmus red and gives brisk effervescence with sodium bicarbonate solution?',
      difficulty: 'medium',
      marks: 4,
      negative_marks: 1,
      explanation: 'Ethanoic acid (CH3COOH) is an acid that reacts with NaHCO3 to liberate CO2 gas briskly.',
      options: [
        { id: 'opt2_a', question_id: 'q2', option_label: 'A', option_text: 'Ethanol (C2H5OH)', is_correct: false },
        { id: 'opt2_b', question_id: 'q2', option_label: 'B', option_text: 'Ethanoic acid (CH3COOH)', is_correct: true },
        { id: 'opt2_c', question_id: 'q2', option_label: 'C', option_text: 'Acetone (CH3COCH3)', is_correct: false },
        { id: 'opt2_d', question_id: 'q2', option_label: 'D', option_text: 'Ethyl acetate (CH3COOC2H5)', is_correct: false },
      ],
    },
    {
      id: 'q3',
      subject_id: 'MAT',
      class_category: 'Class 10',
      target_stream: 'Foundation',
      question_text: 'If the roots of the quadratic equation 2x² - 8x + k = 0 are equal, then the value of k is:',
      difficulty: 'easy',
      marks: 4,
      negative_marks: 1,
      explanation: 'For equal roots, discriminant D = b² - 4ac = 0. (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => k = 8.',
      options: [
        { id: 'opt3_a', question_id: 'q3', option_label: 'A', option_text: '4', is_correct: false },
        { id: 'opt3_b', question_id: 'q3', option_label: 'B', option_text: '8', is_correct: true },
        { id: 'opt3_c', question_id: 'q3', option_label: 'C', option_text: '16', is_correct: false },
        { id: 'opt3_d', question_id: 'q3', option_label: 'D', option_text: '2', is_correct: false },
      ],
    },
    {
      id: 'q4',
      subject_id: 'BIO',
      class_category: 'Class 10',
      target_stream: 'Foundation',
      question_text: 'In human beings, the filtration units of kidneys are called:',
      difficulty: 'easy',
      marks: 4,
      negative_marks: 1,
      explanation: 'Nephrons are the functional and filtration units of the human kidney.',
      options: [
        { id: 'opt4_a', question_id: 'q4', option_label: 'A', option_text: 'Neurons', is_correct: false },
        { id: 'opt4_b', question_id: 'q4', option_label: 'B', option_text: 'Alveoli', is_correct: false },
        { id: 'opt4_c', question_id: 'q4', option_label: 'C', option_text: 'Nephrons', is_correct: true },
        { id: 'opt4_d', question_id: 'q4', option_label: 'D', option_text: 'Villi', is_correct: false },
      ],
    },
    {
      id: 'q5',
      subject_id: 'APT',
      class_category: 'Class 10',
      target_stream: 'Foundation',
      question_text: 'Find the next number in the series: 3, 7, 15, 31, 63, ?',
      difficulty: 'medium',
      marks: 4,
      negative_marks: 1,
      explanation: 'The pattern is (2n + 1): 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1=127.',
      options: [
        { id: 'opt5_a', question_id: 'q5', option_label: 'A', option_text: '95', is_correct: false },
        { id: 'opt5_b', question_id: 'q5', option_label: 'B', option_text: '127', is_correct: true },
        { id: 'opt5_c', question_id: 'q5', option_label: 'C', option_text: '126', is_correct: false },
        { id: 'opt5_d', question_id: 'q5', option_label: 'D', option_text: '129', is_correct: false },
      ],
    },
  ],
};

let applicationsState: Application[] = [
  {
    id: 'app-sample-1',
    application_number: 'ETHEX26-100234',
    student_id: 'demo-student-id',
    exam_id: 'e1111111-1111-1111-1111-111111111111',
    selected_mode: 'offline',
    centre_id: 'c1111111-1111-1111-1111-111111111111',
    room_id: 'r1',
    seat_number: 'H-A-042',
    roll_number: 'ETHEX26-24101',
    admit_card_number: 'AC-2026-88091',
    application_status: 'confirmed',
    payment_status: 'not_required',
    fee_amount: 0,
    fee_paid: 0,
    admit_card_published: true,
    qr_verification_code: 'ETHEX-VERIFY-24101-SEC99',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    confirmed_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

let attemptsState: Record<string, ExamAttempt> = {};
let answersState: Record<string, Record<string, AttemptAnswer>> = {};

let scholarshipRulesState: ScholarshipRule[] = [
  {
    id: 'r1',
    title: 'Top Performers ISRO Educational Tour & 90% Waiver',
    min_percentage: 85.0,
    rank_range_start: 1,
    rank_range_end: 10,
    award_percentage: 90.0,
    cash_prize: 25000,
    includes_isro_tour: true,
    description: 'Top 10 Performers receive fully sponsored ISRO Educational Tour, Stage-2 Cash Prize, and 90% scholarship in EURO Campus admission fee.',
    is_active: true,
  },
  {
    id: 'r2',
    title: 'Diamond Scholar — 90% Admission Scholarship',
    min_percentage: 80.0,
    rank_range_start: 11,
    rank_range_end: 50,
    award_percentage: 90.0,
    cash_prize: 10000,
    includes_isro_tour: false,
    description: 'Ranks 11–50 earn 90% tuition fee scholarship at EURO Campus and Stage-2 cash prize.',
    is_active: true,
  },
  {
    id: 'r3',
    title: 'Gold Scholar — 75% Admission Scholarship',
    min_percentage: 70.0,
    rank_range_start: 51,
    rank_range_end: 150,
    award_percentage: 75.0,
    cash_prize: 5000,
    includes_isro_tour: false,
    description: 'Ranks 51–150 receive 75% scholarship in admission fee for Foundation/JEE/NEET batches.',
    is_active: true,
  },
  {
    id: 'r4',
    title: 'Silver Scholar — 50% Admission Scholarship',
    min_percentage: 60.0,
    rank_range_start: 151,
    rank_range_end: 350,
    award_percentage: 50.0,
    cash_prize: 0,
    includes_isro_tour: false,
    description: 'Ranks 151–350 earn 50% admission scholarship.',
    is_active: true,
  },
];

let announcementsState: Announcement[] = [
  {
    id: 'ann-1',
    title: 'ETHEX 2026 Registrations Announced',
    content: 'EURO Campus invites school students from Classes 5 to 12 to participate in ETHEX 2026. Explore up to 90% scholarships and ISRO Educational Tour opportunities.',
    category: 'General',
    is_pinned: true,
    is_active: true,
    published_at: new Date().toISOString(),
  },
  {
    id: 'ann-2',
    title: 'ISRO Educational Tour Announcement',
    content: 'All top performers across Classes 5 to 12 in the upcoming ETHEX 2026 examination will earn an all-expenses-covered Educational Science Tour to ISRO facilities.',
    category: 'Scholarships',
    is_pinned: true,
    is_active: true,
    published_at: new Date().toISOString(),
  },
  {
    id: 'ann-3',
    title: 'Offline Centres Active in PCMC & Shikrapur',
    content: 'EURO Campus offline exam centres at PCMC (9112223354) and Shikrapur (9112233995) are equipped with full seating arrangements, invigilation, and student help desks.',
    category: 'Centres',
    is_pinned: false,
    is_active: true,
    published_at: new Date().toISOString(),
  },
];

let resultsState: Result[] = [];

let championsState: ResultChampion[] = [
  {
    id: 'champ-1',
    student_name: 'Tanishka Temgire',
    rank: 'AIR 1 (ISRO Tour)',
    exam_name: 'ETHEX Space Science & Foundation',
    target_class: 'Class 10 Foundation',
    school: 'EURO Campus Pune',
    score: '238/240 Marks',
    award: 'Sponsored ISRO Educational Study Tour + 90% Scholarship',
    quote: 'EURO Campus gave me the platform to pursue space science and achieve the dream ISRO visit!',
    photo_url: '/branding/toppers/tanishka_temgire.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-2',
    student_name: 'Mithilesh Shimpi',
    rank: 'Score 650/720',
    exam_name: 'NEET-UG Medical',
    target_class: 'NEET 2026 Topper',
    school: 'EURO Campus Medical Division',
    score: '650/720 Marks',
    award: 'Govt. Medical College (MBBS) Selection',
    quote: 'The rigorous mock test series and individual doubt sessions at EURO Campus helped me score 650 in NEET!',
    photo_url: '/branding/toppers/atharv_gaikwad.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-3',
    student_name: 'Sulagna Triathy',
    rank: 'Score 632/720',
    exam_name: 'NEET-UG Medical',
    target_class: 'NEET 2026 Merit List',
    school: 'EURO Campus PCMC Centre',
    score: '632/720 Marks',
    award: 'Govt. Medical College (MBBS) Selection',
    quote: 'Concept clarity in NCERT Biology and Chemistry tests at EURO Campus was the key to crossing 630.',
    photo_url: '/branding/toppers/vedant_ithape.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-4',
    student_name: 'Aryan Bhujbal',
    rank: 'AIR 3 (ISRO Tour)',
    exam_name: 'ETHEX Pre-JEE & NTSE',
    target_class: 'Class 9 Foundation',
    school: 'EURO Campus Scholar',
    score: '234/240 Marks',
    award: 'National ISRO Study Tour + 90% Scholarship',
    quote: 'The questions tested deep analytical ability. EURO Campus teachers made complex concepts simple.',
    photo_url: '/branding/toppers/aryan_bhujbal.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-5',
    student_name: 'Shoaib Shaikh',
    rank: 'Score 627/720',
    exam_name: 'NEET-UG Medical',
    target_class: 'NEET 2026 Merit List',
    school: 'EURO Campus Shikrapur Centre',
    score: '627/720 Marks',
    award: 'Govt. Medical College (MBBS) Selection',
    quote: 'EURO Campus faculty provided round-the-clock mentorship and high-yield problem solving sessions.',
    photo_url: '/branding/toppers/shivam_bargal.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-6',
    student_name: 'Shardul Gawari',
    rank: 'AIR 5 (ISRO Tour)',
    exam_name: 'ETHEX Math & Science Olympiad',
    target_class: 'Class 8 Foundation',
    school: 'EURO Campus Shikrapur',
    score: '231/240 Marks',
    award: 'ISRO Educational Visit Qualifier',
    quote: 'Preparing for ETHEX gave me immense confidence in Mental Ability and Physics.',
    photo_url: '/branding/toppers/shardul_gawari.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-7',
    student_name: 'Siddharth Bhosale',
    rank: 'AIR 8 (ISRO Tour)',
    exam_name: 'ETHEX JEE Foundation',
    target_class: 'Class 10 Foundation',
    school: 'EURO Campus PCMC',
    score: '228/240 Marks',
    award: 'ISRO Educational Visit Qualifier',
    quote: 'EURO Campus mock tests mirror the exact national competitive standard!',
    photo_url: '/branding/toppers/siddharth_bhosale.jpg',
    year: '2025–2026',
    is_featured: true,
  },
  {
    id: 'champ-8',
    student_name: 'Harsh Dhumal',
    rank: 'ISRO Tour Winner',
    exam_name: 'ETHEX Science Talent',
    target_class: 'Class 8 Foundation',
    school: 'EURO Campus Pune',
    score: '225/240 Marks',
    award: 'National Space Research Visit Winner',
    quote: 'Preparing for ETHEX gave me the confidence to compete at a national level. Thank you EURO Campus!',
    photo_url: '/branding/toppers/harsh_dhumal.jpg',
    year: '2025–2026',
    is_featured: true,
  },
];

let examCategoriesState: ExamCategory[] = [
  {
    id: 'cat-1',
    name: 'Class 9 & 10 (Foundation & Olympiad)',
    slug: 'class-9-10-foundation',
    description: 'Pre-JEE / Pre-NEET advanced conceptual training and Olympiad diagnostics',
    icon: 'GraduationCap',
    badge: 'POPULAR',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'cat-2',
    name: 'Class 11 & 12 (JEE Main + Advanced)',
    slug: 'class-11-12-jee',
    description: 'Engineering entrance diagnostic targeting premier IITs and NITs',
    icon: 'Rocket',
    badge: 'IIT TRACK',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'cat-3',
    name: 'Class 11 & 12 (NEET-UG Medical)',
    slug: 'class-11-12-neet',
    description: 'Specialized pre-medical assessment in Physics, Chemistry, and NCERT Biology',
    icon: 'Award',
    badge: 'MEDICAL',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'cat-4',
    name: 'Class 5 to 8 (Middle School Talent Search)',
    slug: 'class-5-8-middle-school',
    description: 'Building strong mathematical reasoning and scientific fundamentals',
    icon: 'Sparkles',
    badge: 'DISCOVERY',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'cat-5',
    name: 'MHT-CET (State Engineering & Pharmacy)',
    slug: 'mht-cet',
    description: 'Maharashtra state competitive entrance test assessment',
    icon: 'Target',
    is_active: true,
    sort_order: 5,
  },
];

let examTemplatesState: ExamTemplate[] = [
  {
    id: 'tpl-neet',
    code: 'NEET-UG',
    name: 'NEET-UG Standard Examination Template',
    description: 'Official NTA pattern with Physics, Chemistry, and Biology sections (+4 / -1)',
    category: 'Class 11 & 12 (NEET-UG Medical)',
    target_stream: 'NEET',
    duration_minutes: 180,
    total_questions: 180,
    total_marks: 720,
    subjects: [
      { name: 'Physics', code: 'PHY', questions_count: 45, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Chemistry', code: 'CHE', questions_count: 45, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Biology (Botany + Zoology)', code: 'BIO', questions_count: 90, marks_per_correct: 4, negative_marking: 1 },
    ],
    instructions: '1. Each correct answer carries 4 marks.\n2. For each wrong answer, 1 mark will be deducted.\n3. Unattempted questions yield 0 marks.\n4. Scientific calculators are strictly not permitted.',
    is_active: true,
  },
  {
    id: 'tpl-jee-main',
    code: 'JEE-MAIN',
    name: 'JEE Main Standard Examination Template',
    description: 'NTA JEE Main pattern with Physics, Chemistry, and Mathematics (+4 / -1)',
    category: 'Class 11 & 12 (JEE Main + Advanced)',
    target_stream: 'JEE',
    duration_minutes: 180,
    total_questions: 75,
    total_marks: 300,
    subjects: [
      { name: 'Physics', code: 'PHY', questions_count: 25, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Chemistry', code: 'CHE', questions_count: 25, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Mathematics', code: 'MAT', questions_count: 25, marks_per_correct: 4, negative_marking: 1 },
    ],
    instructions: '1. Test duration is 180 minutes.\n2. Correct answer: +4 marks, Incorrect answer: -1 mark.\n3. Negative marking applies to all objective questions.',
    is_active: true,
  },
  {
    id: 'tpl-jee-adv',
    code: 'JEE-ADV',
    name: 'JEE Advanced Diagnostic Pattern',
    description: 'High rigor conceptual pattern with single & multi-correct questions',
    category: 'Class 11 & 12 (JEE Main + Advanced)',
    target_stream: 'JEE',
    duration_minutes: 180,
    total_questions: 54,
    total_marks: 180,
    subjects: [
      { name: 'Physics', code: 'PHY', questions_count: 18, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Chemistry', code: 'CHE', questions_count: 18, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Mathematics', code: 'MAT', questions_count: 18, marks_per_correct: 4, negative_marking: 1 },
    ],
    instructions: '1. Multi-correct and single-correct objective questions.\n2. Strict negative marking applies.',
    is_active: true,
  },
  {
    id: 'tpl-foundation',
    code: 'ETHEX-FND',
    name: 'ETHEX Foundation & Talent Hunt Template',
    description: 'Standard EURO Campus diagnostic test covering Science, Maths & Mental Ability',
    category: 'Class 9 & 10 (Foundation & Olympiad)',
    target_stream: 'Foundation',
    duration_minutes: 90,
    total_questions: 50,
    total_marks: 200,
    subjects: [
      { name: 'Physics', code: 'PHY', questions_count: 12, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Chemistry', code: 'CHE', questions_count: 12, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Biology', code: 'BIO', questions_count: 12, marks_per_correct: 4, negative_marking: 1 },
      { name: 'Mathematics', code: 'MAT', questions_count: 14, marks_per_correct: 4, negative_marking: 1 },
    ],
    instructions: '1. Complete test has 50 questions across Science and Mathematics.\n2. Each correct answer carries +4 marks, with -1 negative marking.',
    is_active: true,
  },
  {
    id: 'tpl-school',
    code: 'SCHOOL-CBT',
    name: 'Custom School / Institutional Assessment',
    description: 'Flexible template for regular school term tests, unit tests, and quizzes',
    category: 'School Examination',
    target_stream: 'Foundation',
    duration_minutes: 60,
    total_questions: 40,
    total_marks: 160,
    subjects: [
      { name: 'General Science', code: 'GEN', questions_count: 20, marks_per_correct: 4, negative_marking: 0 },
      { name: 'Mathematics', code: 'MAT', questions_count: 20, marks_per_correct: 4, negative_marking: 0 },
    ],
    instructions: '1. No negative marking for school assessment tests.\n2. Attempt all questions within 60 minutes.',
    is_active: true,
  },
];

let batchesState: Batch[] = [
  {
    id: 'b-1',
    name: 'ETHEX 2026 — Foundation Star Batch (PCMC)',
    code: 'FND-PCMC-26',
    description: 'Intensive foundation batch for Class 9 & 10 students aiming for NTSE, Olympiads & early IIT-JEE.',
    class_category: 'Class 10',
    target_stream: 'Foundation',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-12-05T23:59:59Z',
    batch_start_date: '2026-12-20T09:00:00Z',
    exam_id: 'e1111111-1111-1111-1111-111111111111',
    max_capacity: 150,
    enrolled_count: 98,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'b-2',
    name: 'ETHEX 2026 — Shikrapur Campus Batch',
    code: 'SHIK-CAMP-26',
    description: 'Comprehensive campus batch with offline lab access and mock tests at Shikrapur Academic Complex.',
    class_category: 'Class 9',
    target_stream: 'Foundation',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-12-05T23:59:59Z',
    batch_start_date: '2026-12-20T09:00:00Z',
    exam_id: 'e2222222-2222-2222-2222-222222222222',
    max_capacity: 120,
    enrolled_count: 74,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'b-3',
    name: 'ETHEX 2026 — Super 30 JEE Aspirants Batch',
    code: 'SUP30-JEE-26',
    description: 'Special merit batch for top percentile scorers with 100% scholarship on coaching fees.',
    class_category: 'Class 11',
    target_stream: 'JEE',
    fee_type: 'free',
    fee_amount: 0,
    currency: 'INR',
    registration_start: '2026-09-01T00:00:00Z',
    registration_end: '2026-12-10T23:59:59Z',
    batch_start_date: '2026-12-22T08:30:00Z',
    exam_id: 'e3333333-3333-3333-3333-333333333333',
    max_capacity: 60,
    enrolled_count: 42,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

let teachersState: TeacherAccount[] = [
  {
    id: 'tch-1',
    name: 'Prof. Rajesh Sharma',
    email: 'rajesh.sharma@eurocampus.in',
    phone: '9112223354',
    subject_specialization: 'Physics (JEE Advanced)',
    assigned_classes: ['Class 11', 'Class 12'],
    role: 'lead_evaluator',
    tests_created_count: 8,
    is_active: true,
    created_at: '2026-08-15T00:00:00Z',
  },
  {
    id: 'tch-2',
    name: 'Dr. Snehal Patil',
    email: 'snehal.patil@eurocampus.in',
    phone: '9112233995',
    subject_specialization: 'Biology (Botany & Zoology)',
    assigned_classes: ['Class 11', 'Class 12'],
    role: 'teacher',
    tests_created_count: 5,
    is_active: true,
    created_at: '2026-08-18T00:00:00Z',
  },
  {
    id: 'tch-3',
    name: 'Prof. Amit Deshmukh',
    email: 'amit.deshmukh@eurocampus.in',
    phone: '9112233995',
    subject_specialization: 'Mathematics & Mental Ability',
    assigned_classes: ['Class 9', 'Class 10', 'Class 11'],
    role: 'teacher',
    tests_created_count: 12,
    is_active: true,
    created_at: '2026-09-01T00:00:00Z',
  },
  {
    id: 'tch-4',
    name: 'Prof. Kavita Rao',
    email: 'kavita.rao@eurocampus.in',
    phone: '9822011223',
    subject_specialization: 'Chemistry (Physical & Organic)',
    assigned_classes: ['Class 10', 'Class 11', 'Class 12'],
    role: 'teacher',
    tests_created_count: 7,
    is_active: true,
    created_at: '2026-09-05T00:00:00Z',
  },
];

// Data Service API
export const dataService = {
  // Site Settings & CMS (with persistent disk backup)
  getSiteSettings: async (): Promise<SiteSettings> => {
    try {
      const filePath = path.join(process.cwd(), 'data', 'site_settings.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const diskSettings = JSON.parse(raw);
        siteSettingsState = {
          ...siteSettingsState,
          ...diskSettings,
          sample_paper_urls: {
            ...siteSettingsState.sample_paper_urls,
            ...(diskSettings.sample_paper_urls || {}),
          },
          syllabus_urls: {
            ...siteSettingsState.syllabus_urls,
            ...(diskSettings.syllabus_urls || {}),
          },
        };
      }
    } catch (e) {
      // Fallback to in-memory state
    }
    return { ...siteSettingsState };
  },

  updateSiteSettings: async (updates: Partial<SiteSettings>): Promise<SiteSettings> => {
    siteSettingsState = {
      ...siteSettingsState,
      ...updates,
      sample_paper_urls: {
        ...siteSettingsState.sample_paper_urls,
        ...(updates.sample_paper_urls || {}),
      },
      syllabus_urls: {
        ...siteSettingsState.syllabus_urls,
        ...(updates.syllabus_urls || {}),
      },
      updated_at: new Date().toISOString(),
    };

    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'site_settings.json');
      fs.writeFileSync(filePath, JSON.stringify(siteSettingsState, null, 2), 'utf-8');
    } catch (e) {
      console.warn('Could not persist site_settings to disk:', e);
    }

    return { ...siteSettingsState };
  },

  // Exams
  getExams: async (): Promise<Exam[]> => {
    return [...examsState];
  },

  getExamById: async (id: string): Promise<Exam | undefined> => {
    return examsState.find((e) => e.id === id);
  },

  createExam: async (examData: Omit<Exam, 'id'>): Promise<Exam> => {
    const newExam: Exam = {
      ...examData,
      id: `e-${Date.now()}`,
    };
    examsState.push(newExam);
    return newExam;
  },

  updateExam: async (id: string, updates: Partial<Exam>): Promise<Exam | null> => {
    const idx = examsState.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    examsState[idx] = { ...examsState[idx], ...updates };
    return examsState[idx];
  },

  // Centres & Rooms
  getCentres: async (): Promise<ExamCentre[]> => {
    return [...centresState];
  },

  getRooms: async (centreId?: string): Promise<ExamRoom[]> => {
    if (!centreId) return [...roomsState];
    return roomsState.filter((r) => r.centre_id === centreId);
  },

  createCentre: async (centre: Omit<ExamCentre, 'id'>): Promise<ExamCentre> => {
    const newCentre: ExamCentre = {
      ...centre,
      id: `c-${Date.now()}`,
    };
    centresState.push(newCentre);
    return newCentre;
  },

  // Applications
  getApplications: async (studentId?: string): Promise<Application[]> => {
    const apps = studentId
      ? applicationsState.filter((a) => a.student_id === studentId)
      : applicationsState;

    return apps.map((app) => ({
      ...app,
      exam: examsState.find((e) => e.id === app.exam_id),
      centre: centresState.find((c) => c.id === app.centre_id),
      room: roomsState.find((r) => r.id === app.room_id),
    }));
  },

  getApplicationById: async (id: string): Promise<Application | undefined> => {
    const app = applicationsState.find((a) => a.id === id);
    if (!app) return undefined;
    return {
      ...app,
      exam: examsState.find((e) => e.id === app.exam_id),
      centre: centresState.find((c) => c.id === app.centre_id),
      room: roomsState.find((r) => r.id === app.room_id),
    };
  },

  createApplication: async (data: {
    student_id: string;
    exam_id: string;
    selected_mode: 'online' | 'offline';
    centre_id?: string;
    student_name?: string;
    student_phone?: string;
    student_class?: string;
    payment_status?: 'not_required' | 'pending' | 'successful' | 'failed' | 'refunded';
    payment_mode?: 'UPI_QR' | 'UPI_VPA' | 'CARD' | 'NETBANKING' | 'CASH';
    utr_number?: string;
    fee_amount?: number;
    fee_paid?: number;
  }): Promise<Application> => {
    const exam = examsState.find((e) => e.id === data.exam_id);
    const appNum = `ETHEX26-${Math.floor(100000 + Math.random() * 900000)}`;
    const rollNum = `ETHEX26-R${Math.floor(10000 + Math.random() * 90000)}`;
    const qrCode = `ETHEX-VERIFY-${rollNum}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const isPaid = data.payment_status === 'successful';
    const amount = data.fee_amount !== undefined ? data.fee_amount : (exam?.fee_amount || 100);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      application_number: appNum,
      student_id: data.student_id,
      student_name: data.student_name,
      student_phone: data.student_phone,
      student_class: data.student_class,
      exam_id: data.exam_id,
      selected_mode: data.selected_mode,
      centre_id: data.centre_id || null,
      roll_number: rollNum,
      admit_card_number: `AC-${rollNum}`,
      application_status: isPaid ? 'confirmed' : (exam?.fee_type === 'paid' ? 'pending_payment' : 'confirmed'),
      payment_status: data.payment_status || (exam?.fee_type === 'paid' ? 'pending' : 'successful'),
      payment_mode: data.payment_mode || 'UPI_QR',
      utr_number: data.utr_number || (isPaid ? `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}` : undefined),
      fee_amount: amount,
      fee_paid: isPaid ? (data.fee_paid || amount) : 0,
      admit_card_published: true,
      qr_verification_code: qrCode,
      created_at: new Date().toISOString(),
      confirmed_at: isPaid ? new Date().toISOString() : null,
    };

    applicationsState.unshift(newApp);
    return newApp;
  },

  confirmPayment: async (applicationId: string, paymentDetails: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    amount: number;
  }): Promise<Application | null> => {
    const app = applicationsState.find((a) => a.id === applicationId);
    if (!app) return null;

    app.application_status = 'confirmed';
    app.payment_status = 'successful';
    app.fee_paid = paymentDetails.amount;
    app.confirmed_at = new Date().toISOString();
    app.admit_card_published = true;
    return app;
  },

  // Admit Card Verification
  verifyAdmitCard: async (code: string): Promise<Application | null> => {
    const app = applicationsState.find(
      (a) => a.qr_verification_code === code || a.roll_number === code || a.application_number === code
    );
    if (!app) return null;
    return {
      ...app,
      exam: examsState.find((e) => e.id === app.exam_id),
      centre: centresState.find((c) => c.id === app.centre_id),
      room: roomsState.find((r) => r.id === app.room_id),
    };
  },

  // Online Questions & Exam Engine
  getQuestionsForExam: async (examId: string): Promise<Question[]> => {
    const questions = questionsState[examId] || questionsState['e1111111-1111-1111-1111-111111111111'] || [];
    return questions.map((q) => ({
      ...q,
      options: q.options.map((opt) => ({
        id: opt.id,
        question_id: opt.question_id,
        option_label: opt.option_label,
        option_text: opt.option_text,
        // Strip is_correct for candidate view!
      })),
    }));
  },

  getQuestionsForAdmin: async (examId: string): Promise<Question[]> => {
    if (!questionsState[examId]) {
      questionsState[examId] = examId === 'e1111111-1111-1111-1111-111111111111'
        ? [...(questionsState['e1111111-1111-1111-1111-111111111111'] || [])]
        : [];
    }
    return [...questionsState[examId]];
  },

  addQuestionToExam: async (examId: string, questionData: {
    subject_id: string;
    class_category?: string;
    target_stream?: string;
    question_text: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    marks?: number;
    negative_marks?: number;
    explanation?: string;
    options: Array<{
      option_label: 'A' | 'B' | 'C' | 'D';
      option_text: string;
      is_correct: boolean;
    }>;
  }): Promise<Question> => {
    if (!questionsState[examId]) {
      questionsState[examId] = [];
    }

    const qId = `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newQuestion: Question = {
      id: qId,
      subject_id: questionData.subject_id || 'GEN',
      class_category: questionData.class_category || 'Class 10',
      target_stream: questionData.target_stream || 'Foundation',
      question_text: questionData.question_text,
      difficulty: questionData.difficulty || 'medium',
      marks: questionData.marks ?? 4,
      negative_marks: questionData.negative_marks ?? 1,
      explanation: questionData.explanation || '',
      options: questionData.options.map((opt) => ({
        id: `opt_${qId}_${opt.option_label.toLowerCase()}`,
        question_id: qId,
        option_label: opt.option_label,
        option_text: opt.option_text,
        is_correct: opt.is_correct,
      })),
    };

    questionsState[examId].push(newQuestion);

    // Update exam total questions & marks
    const exam = examsState.find((e) => e.id === examId);
    if (exam) {
      exam.total_questions = questionsState[examId].length;
      exam.total_marks = questionsState[examId].reduce((acc, q) => acc + q.marks, 0);
    }

    return newQuestion;
  },

  bulkAddQuestions: async (examId: string, questionsList: any[]): Promise<Question[]> => {
    if (!questionsState[examId]) {
      questionsState[examId] = [];
    }

    const created: Question[] = [];

    for (const q of questionsList) {
      const qId = `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const options = (q.options || []).map((opt: any) => ({
        id: `opt_${qId}_${(opt.option_label || 'A').toLowerCase()}`,
        question_id: qId,
        option_label: opt.option_label,
        option_text: opt.option_text,
        is_correct: !!opt.is_correct,
      }));

      const newQ: Question = {
        id: qId,
        subject_id: q.subject_id || 'GEN',
        class_category: q.class_category || 'Class 10',
        target_stream: q.target_stream || 'Foundation',
        question_text: q.question_text,
        difficulty: q.difficulty || 'medium',
        marks: q.marks !== undefined ? Number(q.marks) : 4,
        negative_marks: q.negative_marks !== undefined ? Number(q.negative_marks) : 1,
        explanation: q.explanation || '',
        options,
      };

      questionsState[examId].push(newQ);
      created.push(newQ);
    }

    // Update exam total questions & marks
    const exam = examsState.find((e) => e.id === examId);
    if (exam) {
      exam.total_questions = questionsState[examId].length;
      exam.total_marks = questionsState[examId].reduce((acc, q) => acc + q.marks, 0);
    }

    return created;
  },

  deleteQuestion: async (examId: string, questionId: string): Promise<boolean> => {
    if (!questionsState[examId]) return false;
    const initialLen = questionsState[examId].length;
    questionsState[examId] = questionsState[examId].filter((q) => q.id !== questionId);

    // Update exam total questions & marks
    const exam = examsState.find((e) => e.id === examId);
    if (exam) {
      exam.total_questions = questionsState[examId].length;
      exam.total_marks = questionsState[examId].reduce((acc, q) => acc + q.marks, 0);
    }

    return questionsState[examId].length < initialLen;
  },

  startExamAttempt: async (applicationId: string, studentId: string, examId: string): Promise<ExamAttempt> => {
    const existing = Object.values(attemptsState).find(
      (a) => a.application_id === applicationId && a.student_id === studentId
    );
    if (existing) return existing;

    const app = applicationsState.find((a) => a.id === applicationId);
    const resolvedExamId = examId || app?.exam_id || examsState[0]?.id;

    const exam = examsState.find((e) => e.id === resolvedExamId);
    const durationMin = exam?.duration_minutes || 90;
    const deadline = new Date(Date.now() + durationMin * 60 * 1000).toISOString();

    const questions = questionsState[resolvedExamId] || questionsState['e1111111-1111-1111-1111-111111111111'] || [];

    const attempt: ExamAttempt = {
      id: `att-${Date.now()}`,
      application_id: applicationId,
      student_id: studentId,
      exam_id: resolvedExamId,
      start_time: new Date().toISOString(),
      server_deadline: deadline,
      status: 'in_progress',
      total_score: 0,
      total_correct: 0,
      total_incorrect: 0,
      total_unattempted: questions.length,
      percentage: 0,
      qualifying_status: 'pending',
    };

    attemptsState[attempt.id] = attempt;
    answersState[attempt.id] = {};
    return attempt;
  },

  saveAnswer: async (attemptId: string, questionId: string, optionId: string | null, isMarkedForReview: boolean): Promise<boolean> => {
    if (!answersState[attemptId]) {
      answersState[attemptId] = {};
    }
    answersState[attemptId][questionId] = {
      id: `ans-${Date.now()}`,
      attempt_id: attemptId,
      question_id: questionId,
      selected_option_id: optionId,
      is_marked_for_review: isMarkedForReview,
      saved_at: new Date().toISOString(),
    };
    return true;
  },

  getAttemptAnswers: async (attemptId: string): Promise<Record<string, AttemptAnswer>> => {
    return answersState[attemptId] || {};
  },

  submitExamAttempt: async (attemptId: string): Promise<ExamAttempt | null> => {
    const attempt = attemptsState[attemptId];
    if (!attempt) return null;

    const questions = questionsState[attempt.exam_id] || questionsState['e1111111-1111-1111-1111-111111111111'] || [];
    const savedAnswers = answersState[attemptId] || {};

    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let score = 0;

    questions.forEach((q) => {
      const ans = savedAnswers[q.id];
      if (!ans || !ans.selected_option_id) {
        unattempted++;
      } else {
        const correctOpt = q.options.find((o) => o.is_correct);
        if (correctOpt && correctOpt.id === ans.selected_option_id) {
          correct++;
          score += q.marks;
        } else {
          incorrect++;
          score -= q.negative_marks;
        }
      }
    });

    const maxMarks = questions.reduce((acc, q) => acc + q.marks, 0) || 200;
    const percentage = Math.max(0, parseFloat(((score / maxMarks) * 100).toFixed(2)));

    attempt.status = 'submitted';
    attempt.submitted_at = new Date().toISOString();
    attempt.total_score = Math.max(0, score);
    attempt.total_correct = correct;
    attempt.total_incorrect = incorrect;
    attempt.total_unattempted = unattempted;
    attempt.percentage = percentage;
    attempt.qualifying_status = percentage >= 50 ? 'qualified' : 'not_qualified';

    return attempt;
  },

  disqualifyAttempt: async (attemptId: string, reason: string): Promise<ExamAttempt | null> => {
    const attempt = attemptsState[attemptId];
    if (!attempt) return null;

    attempt.status = 'disqualified';
    attempt.submitted_at = new Date().toISOString();
    attempt.total_score = 0;
    attempt.percentage = 0;
    attempt.qualifying_status = 'disqualified_unfair_means';
    attempt.disqualification_reason = reason || '3 Tab switch / Window departure violations recorded during proctoring.';
    attempt.violations_count = 3;

    return attempt;
  },

  // Results & Rankings
  getResultsForStudent: async (studentId: string): Promise<Result[]> => {
    return resultsState.filter((r) => r.student_id === studentId && r.is_published);
  },

  getAllResults: async (): Promise<Result[]> => {
    return [...resultsState];
  },

  lookupResult: async (query: string): Promise<Result | null> => {
    const raw = query.trim().toLowerCase();
    const digitsOnly = query.replace(/\D/g, '');

    const found = resultsState.find((r) => {
      if (!r.is_published) return false;
      // Match by phone number
      if (digitsOnly.length >= 10 && r.phone) {
        const resultPhoneDigits = r.phone.replace(/\D/g, '');
        if (resultPhoneDigits.includes(digitsOnly) || digitsOnly.includes(resultPhoneDigits)) {
          return true;
        }
      }
      // Match by roll number or application id
      if (r.roll_number.toLowerCase() === raw) return true;
      if (r.application_id.toLowerCase() === raw) return true;
      if (r.student_name.toLowerCase() === raw) return true;
      return false;
    });

    if (found) return found;

    return null;
  },

  createResult: async (data: Omit<Result, 'id'>): Promise<Result> => {
    const newResult: Result = {
      ...data,
      id: `res-${Date.now()}`,
    };
    resultsState.unshift(newResult);
    return newResult;
  },

  updateResult: async (id: string, data: Partial<Result>): Promise<Result | null> => {
    const idx = resultsState.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    resultsState[idx] = { ...resultsState[idx], ...data };
    return resultsState[idx];
  },

  deleteResult: async (id: string): Promise<boolean> => {
    const initLen = resultsState.length;
    resultsState = resultsState.filter((r) => r.id !== id);
    return resultsState.length < initLen;
  },

  // Champions & Results Wall (Admin Configurable)
  getChampions: async (): Promise<ResultChampion[]> => {
    return [...championsState];
  },

  createChampion: async (data: Omit<ResultChampion, 'id'>): Promise<ResultChampion> => {
    const newChampion: ResultChampion = {
      ...data,
      id: `champ-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    championsState.unshift(newChampion);
    return newChampion;
  },

  updateChampion: async (id: string, data: Partial<ResultChampion>): Promise<ResultChampion | null> => {
    const idx = championsState.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    championsState[idx] = { ...championsState[idx], ...data };
    return championsState[idx];
  },

  deleteChampion: async (id: string): Promise<boolean> => {
    const initialLen = championsState.length;
    championsState = championsState.filter((c) => c.id !== id);
    return championsState.length < initialLen;
  },

  // Scholarships & Announcements
  getScholarshipRules: async (): Promise<ScholarshipRule[]> => {
    return [...scholarshipRulesState];
  },

  getAnnouncements: async (): Promise<Announcement[]> => {
    return [...announcementsState];
  },

  // Admin Metrics
  getAdminMetrics: async () => {
    const totalStudents = 1420;
    const totalApplications = applicationsState.length + 840;
    const confirmedApps = applicationsState.filter((a) => a.application_status === 'confirmed').length + 780;
    const onlineApps = Math.round(confirmedApps * 0.58);
    const offlineApps = confirmedApps - onlineApps;
    const centresCount = centresState.length;
    const revenueCollected = 142500;

    return {
      totalStudents,
      totalApplications,
      confirmedApps,
      onlineApps,
      offlineApps,
      centresCount,
      revenueCollected,
      activeExams: examsState.filter((e) => e.status === 'open').length,
      publishedResultsCount: resultsState.length,
    };
  },

  // Categories Management
  getCategories: async (): Promise<ExamCategory[]> => {
    return [...examCategoriesState].sort((a, b) => a.sort_order - b.sort_order);
  },

  saveCategory: async (categoryData: Partial<ExamCategory>): Promise<ExamCategory> => {
    if (categoryData.id) {
      const idx = examCategoriesState.findIndex((c) => c.id === categoryData.id);
      if (idx !== -1) {
        examCategoriesState[idx] = { ...examCategoriesState[idx], ...categoryData } as ExamCategory;
        return examCategoriesState[idx];
      }
    }
    const newCat: ExamCategory = {
      id: `cat-${Date.now()}`,
      name: categoryData.name || 'New Category',
      slug: categoryData.slug || (categoryData.name || 'new-category').toLowerCase().replace(/\s+/g, '-'),
      description: categoryData.description || '',
      icon: categoryData.icon || 'BookOpen',
      badge: categoryData.badge || '',
      is_active: categoryData.is_active ?? true,
      sort_order: categoryData.sort_order ?? (examCategoriesState.length + 1),
    };
    examCategoriesState.push(newCat);
    return newCat;
  },

  deleteCategory: async (id: string): Promise<boolean> => {
    const initialLen = examCategoriesState.length;
    examCategoriesState = examCategoriesState.filter((c) => c.id !== id);
    return examCategoriesState.length < initialLen;
  },

  // Examination Templates
  getTemplates: async (): Promise<ExamTemplate[]> => {
    return [...examTemplatesState];
  },

  saveTemplate: async (templateData: Partial<ExamTemplate>): Promise<ExamTemplate> => {
    if (templateData.id) {
      const idx = examTemplatesState.findIndex((t) => t.id === templateData.id);
      if (idx !== -1) {
        examTemplatesState[idx] = { ...examTemplatesState[idx], ...templateData } as ExamTemplate;
        return examTemplatesState[idx];
      }
    }
    const newTpl: ExamTemplate = {
      id: `tpl-${Date.now()}`,
      code: templateData.code || 'CUSTOM',
      name: templateData.name || 'New Template',
      description: templateData.description || '',
      category: templateData.category || 'General',
      target_stream: templateData.target_stream || 'Foundation',
      duration_minutes: templateData.duration_minutes || 120,
      total_questions: templateData.total_questions || 50,
      total_marks: templateData.total_marks || 200,
      subjects: templateData.subjects || [],
      instructions: templateData.instructions || '',
      is_active: templateData.is_active ?? true,
    };
    examTemplatesState.push(newTpl);
    return newTpl;
  },

  // Batches & Courses Management
  getBatches: async (): Promise<Batch[]> => {
    return [...batchesState];
  },

  saveBatch: async (batchData: Partial<Batch>): Promise<Batch> => {
    if (batchData.id) {
      const idx = batchesState.findIndex((b) => b.id === batchData.id);
      if (idx !== -1) {
        batchesState[idx] = { ...batchesState[idx], ...batchData } as Batch;
        return batchesState[idx];
      }
    }
    const newBatch: Batch = {
      id: `b-${Date.now()}`,
      name: batchData.name || 'New Batch',
      code: batchData.code || `BAT-${Date.now().toString().slice(-4)}`,
      description: batchData.description || '',
      class_category: batchData.class_category || 'Class 10',
      target_stream: batchData.target_stream || 'Foundation',
      fee_type: batchData.fee_type || 'free',
      fee_amount: batchData.fee_amount || 0,
      currency: batchData.currency || 'INR',
      registration_start: batchData.registration_start || new Date().toISOString(),
      registration_end: batchData.registration_end || new Date(Date.now() + 86400000 * 30).toISOString(),
      batch_start_date: batchData.batch_start_date || new Date(Date.now() + 86400000 * 45).toISOString(),
      exam_id: batchData.exam_id,
      max_capacity: batchData.max_capacity || 100,
      enrolled_count: 0,
      is_active: batchData.is_active ?? true,
      created_at: new Date().toISOString(),
    };
    batchesState.push(newBatch);
    return newBatch;
  },

  deleteBatch: async (id: string): Promise<boolean> => {
    const initialLen = batchesState.length;
    batchesState = batchesState.filter((b) => b.id !== id);
    return batchesState.length < initialLen;
  },

  // Teachers Management
  getTeachers: async (): Promise<TeacherAccount[]> => {
    return [...teachersState];
  },

  saveTeacher: async (teacherData: Partial<TeacherAccount>): Promise<TeacherAccount> => {
    if (teacherData.id) {
      const idx = teachersState.findIndex((t) => t.id === teacherData.id);
      if (idx !== -1) {
        teachersState[idx] = { ...teachersState[idx], ...teacherData } as TeacherAccount;
        return teachersState[idx];
      }
    }
    const newTeacher: TeacherAccount = {
      id: `tch-${Date.now()}`,
      name: teacherData.name || 'New Teacher',
      email: teacherData.email || `teacher-${Date.now()}@eurocampus.in`,
      phone: teacherData.phone || '',
      subject_specialization: teacherData.subject_specialization || 'Science',
      assigned_classes: teacherData.assigned_classes || ['Class 10'],
      role: teacherData.role || 'teacher',
      tests_created_count: 0,
      is_active: teacherData.is_active ?? true,
      created_at: new Date().toISOString(),
    };
    teachersState.push(newTeacher);
    return newTeacher;
  },

  // Extended Exam Management & Approval Workflow
  deleteExam: async (id: string): Promise<boolean> => {
    const initialLen = examsState.length;
    examsState = examsState.filter((e) => e.id !== id);
    delete questionsState[id];
    return examsState.length < initialLen;
  },

  submitExamForApproval: async (id: string, creatorName: string): Promise<Exam | null> => {
    const exam = examsState.find((e) => e.id === id);
    if (!exam) return null;
    exam.status = 'review';
    exam.approval_status = 'pending_approval';
    exam.creator_role = 'teacher';
    exam.creator_name = creatorName;
    return exam;
  },

  approveExam: async (id: string): Promise<Exam | null> => {
    const exam = examsState.find((e) => e.id === id);
    if (!exam) return null;
    exam.status = 'open';
    exam.approval_status = 'approved';
    return exam;
  },

  rejectExam: async (id: string, reason?: string): Promise<Exam | null> => {
    const exam = examsState.find((e) => e.id === id);
    if (!exam) return null;
    exam.status = 'draft';
    exam.approval_status = 'rejected';
    return exam;
  },

  // Rooms and Centres
  saveRoom: async (roomData: Partial<ExamRoom>): Promise<ExamRoom> => {
    if (roomData.id) {
      const idx = roomsState.findIndex((r) => r.id === roomData.id);
      if (idx !== -1) {
        roomsState[idx] = { ...roomsState[idx], ...roomData } as ExamRoom;
        return roomsState[idx];
      }
    }
    const newRoom: ExamRoom = {
      id: `r-${Date.now()}`,
      centre_id: roomData.centre_id || centresState[0]?.id || 'c1',
      room_number: roomData.room_number || 'Room 101',
      floor: roomData.floor || 'Ground Floor',
      capacity: roomData.capacity || 40,
      is_active: roomData.is_active ?? true,
    };
    roomsState.push(newRoom);
    return newRoom;
  },

  deleteRoom: async (id: string): Promise<boolean> => {
    const initialLen = roomsState.length;
    roomsState = roomsState.filter((r) => r.id !== id);
    return roomsState.length < initialLen;
  },

  deleteCentre: async (id: string): Promise<boolean> => {
    const initialLen = centresState.length;
    centresState = centresState.filter((c) => c.id !== id);
    roomsState = roomsState.filter((r) => r.centre_id !== id);
    return centresState.length < initialLen;
  },
};
