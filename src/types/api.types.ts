import type {
  ChronicCondition,
  DailyActivity,
  HeightUnit,
  OnboardingFormValues,
  PrimaryGoal,
  Sex,
  WeightUnit,
} from '@/types/onboarding.types';

export type CustomerStatus = {
  on_boarding_skip: boolean;
  health_connect_skip: boolean;
  on_boarding: boolean;
  health_connect: boolean;
};

export type CustomerBodyMetrics = OnboardingFormValues;

/** Backend customer (auth + profile). */
export type Customer = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country_code: string;
  status?: CustomerStatus;
  body_metrics?: CustomerBodyMetrics;
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
  height_unit: HeightUnit;
  weight: number;
  weight_unit: WeightUnit;
  daily_activity: DailyActivity;
  primary_goal: PrimaryGoal;
  chronic_condition: ChronicCondition;
}

export interface OnboardingResponse {
  status: boolean;
  message: string;
}

/** Response from GET /v1/auth/customer */
export type GetCustomerResponse = {
  status: boolean;
  message: string;
  data: {
    customer: Customer;
  };
};

export type ApiErrorResponse = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
};
