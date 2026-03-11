/** Central endpoint constants. Paths are relative to API_BASE_URL. */
export const ENDPOINTS = {
  AUTH_AUTHENTICATE: 'v1/coach/authenticate',
  AUTH_ONBOARDING: 'v1/coach/onboarding',
  CALENDLY_BOOKING: 'v1/calendly-booking',
  BOOK_CALL: 'v1/coach/calendly-booking/store',
  COACH_BOOKINGS: 'v1/coach/bookings',
} as const;
