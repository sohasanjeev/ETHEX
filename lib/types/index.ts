export type UserRole =
  | 'student'
  | 'super_admin'
  | 'exam_manager'
  | 'finance_manager'
  | 'centre_coordinator'
  | 'evaluator';

export type ExamMode = 'online' | 'offline' | 'hybrid';
export type ExamStatus = 'draft' | 'upcoming' | 'open' | 'closed' | 'in_progress' | 'completed' | 'results_published';
export type ApplicationStatus = 'draft' | 'pending_payment' | 'submitted' | 'confirmed' | 'under_review' | 'cancelled' | 'rejected';
export type PaymentStatus = 'not_required' | 'pending' | 'successful' | 'failed' | 'refunded';

export interface SiteSettings {
  id: string;
  exam_name: string;
  exam_full_form: string;
  academic_year: string;
  exam_edition: string;
  exam_date_display: string;
  exam_date_iso?: string | null;
  is_countdown_active: boolean;
  admission_scholarship_pool: string;
  cash_prize_pool: string;
  max_scholarship_percentage: string;
  isro_tour_enabled: boolean;
  isro_tour_tagline: string;
  euro_official_website_url: string;
  helpline_pcmc: string;
  helpline_shikrapur: string;
  official_email: string;
  announcement_bar_text: string;
  announcement_bar_active: boolean;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentDetails {
  profile_id: string;
  dob?: string;
  gender?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  current_class: string;
  target_stream: 'Foundation' | 'JEE' | 'NEET' | 'MHT-CET';
  school_name?: string;
  board?: string;
  address_line?: string;
  city: string;
  state: string;
  pincode?: string;
  photo_url?: string;
  is_profile_completed: boolean;
  consent_agreed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Exam {
  id: string;
  code: string;
  title: string;
  class_category: string;
  target_stream: 'Foundation' | 'JEE' | 'NEET' | 'MHT-CET';
  description: string;
  mode: ExamMode;
  fee_type: 'free' | 'paid';
  fee_amount: number;
  currency: string;
  registration_start: string;
  registration_end: string;
  exam_date: string;
  duration_minutes: number;
  total_questions: number;
  total_marks: number;
  marks_per_correct: number;
  negative_marking: number;
  status: ExamStatus;
  admit_card_available_from?: string;
  result_published_at?: string;
}

export interface ExamCentre {
  id: string;
  centre_code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contact_phone: string;
  total_capacity: number;
  is_active: boolean;
}

export interface ExamRoom {
  id: string;
  centre_id: string;
  room_number: string;
  floor?: string;
  capacity: number;
  is_active: boolean;
}

export interface Application {
  id: string;
  application_number: string;
  student_id: string;
  exam_id: string;
  selected_mode: ExamMode;
  centre_id?: string | null;
  room_id?: string | null;
  seat_number?: string | null;
  roll_number?: string | null;
  admit_card_number?: string | null;
  application_status: ApplicationStatus;
  payment_status: PaymentStatus;
  fee_amount: number;
  fee_paid: number;
  admit_card_published: boolean;
  qr_verification_code: string;
  created_at: string;
  confirmed_at?: string | null;
  // Joined fields for display
  exam?: Exam;
  centre?: ExamCentre;
  room?: ExamRoom;
  student?: UserProfile & { student_details?: StudentDetails };
}

export interface PaymentTransaction {
  id: string;
  application_id: string;
  student_id: string;
  receipt_number: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number;
  currency: string;
  status: 'created' | 'pending' | 'successful' | 'failed' | 'refunded';
  payment_method?: string;
  error_code?: string;
  error_description?: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_label: 'A' | 'B' | 'C' | 'D';
  option_text: string;
  is_correct?: boolean; // Only visible on admin / evaluator role
}

export interface Question {
  id: string;
  subject_id: string;
  class_category: string;
  target_stream: string;
  question_text: string;
  image_url?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  negative_marks: number;
  explanation?: string;
  options: QuestionOption[];
}

export interface ExamAttempt {
  id: string;
  application_id: string;
  student_id: string;
  exam_id: string;
  start_time: string;
  server_deadline: string;
  submitted_at?: string;
  status: 'in_progress' | 'submitted' | 'auto_submitted' | 'evaluated';
  total_score: number;
  total_correct: number;
  total_incorrect: number;
  total_unattempted: number;
  percentage: number;
  qualifying_status: string;
}

export interface AttemptAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option_id?: string | null;
  is_marked_for_review: boolean;
  saved_at: string;
}

export interface Result {
  id: string;
  application_id: string;
  student_id: string;
  exam_id: string;
  roll_number: string;
  student_name: string;
  class_category: string;
  stream: string;
  marks_obtained: number;
  max_marks: number;
  percentage: number;
  section_scores?: Record<string, number>;
  rank_overall?: number;
  rank_category?: number;
  is_qualified: boolean;
  scholarship_tier?: string;
  scholarship_percentage?: number;
  cash_prize_eligible: boolean;
  isro_tour_eligible: boolean;
  is_published: boolean;
  published_at?: string;
}

export interface ScholarshipRule {
  id: string;
  title: string;
  min_percentage: number;
  rank_range_start?: number;
  rank_range_end?: number;
  award_percentage: number;
  cash_prize?: number;
  includes_isro_tour: boolean;
  description: string;
  is_active: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  is_pinned: boolean;
  is_active: boolean;
  published_at: string;
}
