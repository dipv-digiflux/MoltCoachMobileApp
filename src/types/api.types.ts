import type { User, AuthTokens } from '@/types/models.types';
import type {
  ChronicCondition,
  DailyActivity,
  PrimaryGoal,
  Sex,
} from '@/types/onboarding.types';

export type LoginRequest = {
  identifier: string;
  password: string;
};

/** Sent to backend after Google Sign-In; backend verifies idToken and returns LoginResponse. */
export type GoogleAuthRequest = {
  idToken: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};

/** Backend customer from POST /v1/auth/authenticate */
export type Customer = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country_code: string;
  user_register_flag: string;
};

/** Request for POST /v1/auth/authenticate */
export type AuthenticateRequest =
  | { type: 'google_mobile'; token: string }
  | {
      type: 'normal';
      email?: string;
      phone_number?: string;
      country_code?: string;
      otp?: string;
    };

/** Response from POST /v1/auth/authenticate */
export type AuthenticateResponse = {
  status: boolean;
  message: string;
  token: string;
  customer: Customer | null;
  show_otp: boolean;
};

export interface OnboardingRequest {
  name: string;
  sex: Sex;
  birth_date: string;
  height: number;
  height_unit: 'cm' | 'ft';
  weight: number;
  weight_unit: 'kg' | 'lbs';
  daily_activity: DailyActivity;
  primary_goal: PrimaryGoal;
  chronic_condition: ChronicCondition;
}

export interface OnboardingResponse {
  status: boolean;
  message: string;
}

export type ApiErrorResponse = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
};
