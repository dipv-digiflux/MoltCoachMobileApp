/** Common response wrapper used by many endpoints. */
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  code: number;
  data: T;
}

/** Pagination metadata in list responses. */
export interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends PaginationInfo {
  list: T[];
}

/** Error response body returned by the API. */
export interface ApiErrorResponse {
  message: string;
  status?: boolean;
  code?: number;
}

export interface BaseResponse {
  status: boolean;
  message: string;
  code: number;
}

// ── Auth ───────────────────────────────────────────────

export interface AuthenticateRequest {
  type: 'google_web' | 'email_otp' | 'phone_otp' | 'normal';
  token?: string;
  email?: string;
  phone_number?: string;
  otp?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  token: string;
  show_otp?: boolean;
  customer?: Customer;
}

export interface OnboardingRequest {
  full_name: string;
  email: string;
  phone_number: string;
  country_code: string;
}

export type OnboardingResponse = BaseResponse;

// ── User / Customer ────────────────────────────────────

export interface Customer {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country_code: string;
  profile_picture?: string;
  body_metrics?: unknown;
  status?: unknown;
}

// ── Coach ──────────────────────────────────────────────

export interface CoachProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  country_code: string;
  phone_number: string;
  status: 'reject' | 'pending' | 'approve';
  is_request_access?: boolean;
  is_booking_confirmed?: boolean;
  is_verified?: boolean;
}

/** Request payload for `COACH_REQUEST_ACCESS` */
export interface RequestAccessPayload {
  full_name: string;
  email: string;
  phone_number: string;
  country_code: string;
}

// ── Bookings ───────────────────────────────────────────

export interface Booking {
  _id: string;
  coach_id: string;
  customer_id: string;
  start_time: string;
  end_time: string;
  location?: string;
  status: 'scheduled' | 'cancelled' | 'completed';
  calendly_url?: string;
}

export interface GetCoachBookingsResponse extends BaseResponse {
  data: {
    coach: CoachProfile;
    bookings: Booking[];
  };
}

export interface CalendarSyncRequest {
  provider: 'google' | 'outlook' | 'apple';
}

export interface BookCallRequest {
  name: string;
  email: string;
  phone_number: string;
}

export type BookCallResponse = BaseResponse & {
  data?: {
    url: string;
  };
};

export interface ConfirmBookingPayload {
  booking_id: string;
  status: 'scheduled';
}

// ── Clients / Invites / Relationships ──────────────────

export type ClientType = 'Lead' | 'Client';

export type ClientStatus =
  | 'Approved'
  | 'approved'
  | 'Accepted'
  | 'accepted'
  | 'Plan Approved'
  | 'Invite Send'
  | 'Invite Sent'
  | 'In Progress'
  | 'Profile Created';

export interface NutritionPlan {
  target_calories: number;
  protein: number;
  carb: number;
  fat: number;
  type: string;
  goal: string;
  water_intake_liters: number;
  steps: number;
  active_calorie_burn: number;
}

export interface UserRelationship {
  _id: string;
  customer_id: string;
  coach_id: string;
  role: string;
  status: string;
  mode: string;
  health_status: string;
  updatedAt: string;
  session_package?: {
    total_sessions: number;
    sessions_left: number;
  };
}

export interface InviteLink {
  _id: string;
  inviter_id: string;
  invitee_id: string;
  referral_code: string;
  status: ClientStatus;
  mode?: string;
  type?: ClientType;
  subscription?: {
    number_of_month: number;
    start_date: string;
  };
  session_package?: {
    total_sessions: number;
    sessions_left: number;
  };
  user_relationship?: UserRelationship;
  nutrition_draft?: NutritionPlan;
  createdAt: string;
  updatedAt: string;
  invitee: {
    _id: string;
    first_name?: string;
    last_name?: string;
    phone_number: string;
    country_code: string;
  };
}

export interface ClientItem {
  type: string;
  phone_number: string;
  country_code: string;
  name: string;
  mode?: string;
  total_sessions?: number | string;
  sessions_left?: number | string;
  number_of_month?: number | string;
  start_date?: string;
  status?: string;
}

export interface InviteBulkClientsPayload {
  items: ClientItem[];
}

export interface InviteWithOnboarding {
  invite: InviteLink;
  onboarding: {
    first_name: string;
    last_name: string;
    body_metrics: unknown;
    nutrients: NutritionPlan;
  };
}

export interface InviteSmsPayload {
  name?: string;
  phone_numbers: string[];
  country_code: string;
}

export interface AddClientPayload {
  type: ClientType;
  name: string;
  email?: string;
  phone_number?: string;
  country_code?: string;
  mode?: string;
  number_of_month?: number;
  start_date?: string;
  total_sessions?: number;
  sessions_left?: number;
  sex?: string;
  birth_date?: string;
  height?: number;
  height_unit?: string;
  weight?: number;
  weight_unit?: string;
  daily_activity?: string;
  primary_goal?: string;
  chronic_condition?: string;
  status?: string;
}

export type FetchInviteLinksResponse = ApiResponse<
  PaginatedResponse<InviteLink>
>;

export type NudgeType = 'text' | 'task';

export interface SendNudgePayload {
  customer_id: string;
  text?: string[];
  task_title?: string[];
}
