import { httpGet, httpPost } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  AuthenticateRequest,
  AuthenticateResponse,
  BookCallRequest,
  BookCallResponse,
  GetCoachBookingsResponse,
  GetCoachProfileResponse,
  OnboardingRequest,
  OnboardingResponse,
} from '@/types/api.types';

/**
 * Authenticate: Google OAuth, request OTP, or verify OTP.
 * POST /v1/auth/authenticate
 */
export const postAuthenticate = async (
  request: AuthenticateRequest,
): Promise<AuthenticateResponse> => {
  return httpPost<AuthenticateRequest, AuthenticateResponse>(
    ENDPOINTS.AUTH_AUTHENTICATE,
    request,
  );
};

/**
 * Complete onboarding details.
 * POST /v1/auth/onboarding
 */
export const postOnboarding = async (
  request: OnboardingRequest,
): Promise<OnboardingResponse> => {
  return httpPost<OnboardingRequest, OnboardingResponse>(
    ENDPOINTS.AUTH_ONBOARDING,
    request,
  );
};

/**
 * Book a call (Calendly booking store).
 * POST /v1/coach/calendly-booking/store
 */
export const postBookCall = async (
  request: BookCallRequest,
): Promise<BookCallResponse> => {
  console.log('checkRQ 1', request);
  return httpPost<BookCallRequest, BookCallResponse>(
    ENDPOINTS.BOOK_CALL,
    request,
  );
};

export const getCoachBookings = async (): Promise<GetCoachBookingsResponse> => {
  return httpGet<GetCoachBookingsResponse>(ENDPOINTS.COACH_BOOKINGS);
};

export const getCoachProfile = async (): Promise<GetCoachProfileResponse> => {
  return httpGet<GetCoachProfileResponse>(ENDPOINTS.COACH_PROFILE);
};
