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
  ScholarshipRule,
  Announcement,
  UserProfile,
  StudentDetails
} from '../types';

// Default initial state matching official EURO Campus ETHEX 2026 specifications
let siteSettingsState: SiteSettings = {
  id: 'current',
  exam_name: 'ETHEX 2026',
  exam_full_form: 'EURO TALENT HUNT EXAM',
  academic_year: '2027–2028',
  exam_edition: '2026',
  exam_date_display: 'To Be Announced Soon',
  exam_date_iso: null,
  is_countdown_active: false,
  admission_scholarship_pool: '₹2.5 CRORES',
  cash_prize_pool: '₹10 Lacs (Stage-2)',
  max_scholarship_percentage: 'Upto 90%',
  isro_tour_enabled: true,
  isro_tour_tagline: 'Top Performers Can Earn an ISRO Educational Tour',
  euro_official_website_url: process.env.EURO_OFFICIAL_WEBSITE_URL || 'https://eurocampus.in/',
  helpline_pcmc: '9112223354 / 9112233995',
  helpline_shikrapur: '9607035688',
  official_email: 'admissions@eurocampus.edu.in',
  announcement_bar_text: 'Registrations for ETHEX 2026 upcoming cycle opening soon! New exam schedule will be announced here.',
  announcement_bar_active: true,
  updated_at: new Date().toISOString(),
};

let centresState: ExamCentre[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    centre_code: 'EC-PCMC',
    name: 'EURO Campus — PCMC Centre',
    address: 'Sector 24, Near Spine Road, Pradhikaran, PCMC',
    city: 'Pimpri-Chinchwad',
    state: 'Maharashtra',
    pincode: '411044',
    contact_phone: '9112223354',
    total_capacity: 400,
    is_active: true,
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    centre_code: 'EC-SHIK',
    name: 'EURO Campus — Shikrapur Centre',
    address: 'Euro Campus Academic Complex, Pune-Nagar Highway, Shikrapur',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412208',
    contact_phone: '9607035688',
    total_capacity: 350,
    is_active: true,
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    centre_code: 'EC-KOTH',
    name: 'EURO Campus Partner — Kothrud Regional Centre',
    address: 'Near MIT World Peace University, Paud Road, Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411038',
    contact_phone: '9112223354',
    total_capacity: 250,
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
    content: 'EURO Campus offline exam centres at PCMC (9112223354) and Shikrapur (9607035688) are equipped with full seating arrangements, invigilation, and student help desks.',
    category: 'Centres',
    is_pinned: false,
    is_active: true,
    published_at: new Date().toISOString(),
  },
];

let resultsState: Result[] = [
  {
    id: 'res-demo-1',
    application_id: 'app-sample-1',
    student_id: 'demo-student-id',
    exam_id: 'e1111111-1111-1111-1111-111111111111',
    roll_number: 'ETHEX26-24101',
    student_name: 'Aarav Patil',
    class_category: 'Class 10',
    stream: 'Foundation',
    marks_obtained: 184,
    max_marks: 200,
    percentage: 92.0,
    section_scores: {
      Physics: 48,
      Chemistry: 44,
      Mathematics: 52,
      Aptitude: 40,
    },
    rank_overall: 4,
    rank_category: 1,
    is_qualified: true,
    scholarship_tier: 'Platinum Star — ISRO Tour & 90% Waiver',
    scholarship_percentage: 90,
    cash_prize_eligible: true,
    isro_tour_eligible: true,
    is_published: true,
    published_at: '2026-10-18T10:00:00Z',
  },
];

// Data Service API
export const dataService = {
  // Site Settings & CMS
  getSiteSettings: async (): Promise<SiteSettings> => {
    return { ...siteSettingsState };
  },

  updateSiteSettings: async (updates: Partial<SiteSettings>): Promise<SiteSettings> => {
    siteSettingsState = {
      ...siteSettingsState,
      ...updates,
      updated_at: new Date().toISOString(),
    };
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
  }): Promise<Application> => {
    const exam = examsState.find((e) => e.id === data.exam_id);
    const appNum = `ETHEX26-${Math.floor(100000 + Math.random() * 900000)}`;
    const rollNum = `ETHEX26-R${Math.floor(10000 + Math.random() * 90000)}`;
    const qrCode = `ETHEX-VERIFY-${rollNum}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      application_number: appNum,
      student_id: data.student_id,
      exam_id: data.exam_id,
      selected_mode: data.selected_mode,
      centre_id: data.centre_id || null,
      roll_number: rollNum,
      admit_card_number: `AC-${rollNum}`,
      application_status: exam?.fee_type === 'paid' ? 'pending_payment' : 'confirmed',
      payment_status: exam?.fee_type === 'paid' ? 'pending' : 'not_required',
      fee_amount: exam?.fee_amount || 0,
      fee_paid: exam?.fee_type === 'free' ? 0 : 0,
      admit_card_published: true,
      qr_verification_code: qrCode,
      created_at: new Date().toISOString(),
      confirmed_at: exam?.fee_type === 'free' ? new Date().toISOString() : null,
    };

    applicationsState.push(newApp);
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

  lookupResult: async (rollOrAppNumber: string): Promise<Result | null> => {
    const found = resultsState.find(
      (r) => (r.roll_number.toLowerCase() === rollOrAppNumber.trim().toLowerCase() ||
              r.application_id.toLowerCase() === rollOrAppNumber.trim().toLowerCase()) &&
              r.is_published
    );
    return found || null;
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
};
