import { httpGet, httpPost } from '@/services/apiClient';

import { ENDPOINTS } from './endpoints';

import type {
  AuthenticateRequest,
  AuthenticateResponse,
  GetCustomerResponse,
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
 * Get customer data (profile, status, body metrics).
 * GET /v1/auth/customer
 */
export const getCustomer = async (
  include?: string,
): Promise<GetCustomerResponse> => {
  const config = include
    ? {
        params: { include },
      }
    : undefined;

  return httpGet<GetCustomerResponse>(ENDPOINTS.AUTH_CUSTOMER, config);
};
