import { httpPost } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  AuthenticateRequest,
  AuthenticateResponse,
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
