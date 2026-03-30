import type { Customer } from '@/types/api.types';

const hasNonEmptyObject = (value: object | undefined): boolean =>
  value != null && Object.keys(value).length > 0;

/**
 * Determines whether a customer has completed onboarding, based on
 * status/body_metrics, with a legacy fallback to user_register_flag.
 */
export const hasCompletedOnboarding = (customer: Customer): boolean => {
  if (hasNonEmptyObject(customer.body_metrics as object)) {
    return true;
  }

  if (hasNonEmptyObject(customer.status as object)) {
    return true;
  }

  return false;
};
