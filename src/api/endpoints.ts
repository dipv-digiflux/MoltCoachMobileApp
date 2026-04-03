/** Central endpoint constants. Paths are relative to API_BASE_URL. */
export const ENDPOINTS = {
  AUTH_AUTHENTICATE: 'v1/coach/authenticate',
  AUTH_ONBOARDING: 'v1/coach/onboarding',
  CALENDLY_BOOKING: 'v1/calendly-booking',
  BOOK_CALL: 'v1/coach/calendly-booking/store',
  COACH_BOOKINGS: 'v1/coach/bookings',
  COACH_BULK_INVITE: 'v1/coach/invite-link/bulk',
  COACH_INVITE_SMS: 'v1/coach/invite-link/invite-customer-sms',
  COACH_INVITE_STORE: 'v1/coach/invite-link/store',
  COACH_FETCH_LINKS: 'v1/coach/invite-link/fetch-links',
  COACH_USER_RELATIONSHIP: 'v1/coach/user-relationship',
  COACH_NUDGE: 'v1/coach/nudge',
  COACH_WEEKLY_SUMMARY: 'v1/coach/task/weekly-summary',
  COACH_TASK_STORE: 'v1/coach/task/store',
  COACH_FETCH_TASKS: 'v1/coach/task/fetch-tasks',
  COACH_DELETE_TASK: 'v1/coach/task/delete-task',
  COACH_UPDATE_TASK: 'v1/coach/task/update-task',
} as const;
