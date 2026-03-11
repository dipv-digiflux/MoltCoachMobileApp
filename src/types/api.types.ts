import type {
  ChronicCondition,
  DailyActivity,
  HeightUnit,
  OnboardingFormValues,
  PrimaryGoal,
  Sex,
  WeightUnit,
} from '@/types/onboarding.types';

export interface CustomerStatus {
  on_boarding_skip: boolean;
  health_connect_skip: boolean;
  on_boarding: boolean;
  health_connect: boolean;
}

export type CustomerBodyMetrics = OnboardingFormValues;

/** Backend customer (auth + profile). */
export interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country_code: string;
  status?: CustomerStatus;
  body_metrics?: CustomerBodyMetrics;
}

export type AuthType = 'normal' | 'google_web' | 'google_mobile';

export interface AuthPayload {
  type: AuthType;
  email: string;
  phone_number: string;
  country_code: string;
  otp: string;
  token: string;
}

/** Request for POST /v1/auth/authenticate */
export type AuthenticateRequest = Partial<AuthPayload> & { type: AuthType };

/** Response from POST /v1/auth/authenticate */
export interface AuthenticateResponse {
  status: boolean;
  message: string;
  token: string;
  customer?: Customer | null;
  show_otp: boolean;
  coach_id?: string;
  show_calendly?: boolean;
}

export interface OnboardingRequest {
  name: string;
  sex: Sex;
  birth_date: string;
  height: number;
  height_unit: HeightUnit;
  weight: number;
  weight_unit: WeightUnit;
  daily_activity: DailyActivity;
  primary_goal: PrimaryGoal;
  chronic_condition: ChronicCondition;
}

export interface BookCallRequest {
  coach_id: string;
  email: string;
  name: string;
  phone_number: string;
  timezone?: string;
  event_uuid?: string;
  invitee_uuid?: string;
  date?: string;
  url?: string;
  start_time?: string;
  end_time?: string;
  status?: string;
  cancel_reason?: string;
  canceled_by?: string;
}

export interface Booking {
  coach_id: string;
  email: string;
  phone_number: string;
  name: string;
  status: string;
  url?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookCallResponse {
  status: boolean;
  message: string;
  data: Booking;
}

export interface OnboardingResponse {
  status: boolean;
  message: string;
}

/** Response from GET /v1/auth/customer */
export interface GetCustomerResponse {
  status: boolean;
  message: string;
  data: {
    customer: Customer;
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface CoachProfile {
  _id: string;
  email?: string;
  phone_number?: string;
  country_code?: string;
  is_verified: boolean;
  is_request_access: boolean;
  is_booking_confirmed: boolean;
  first_name?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetCoachBookingsResponse {
  status: boolean;
  message: string;
  data: {
    coach: CoachProfile;
    bookings: Booking[];
  };
}
