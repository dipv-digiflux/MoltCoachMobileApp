import type { Customer } from '@/types/api.types';

export interface PersistedAuth {
  token: string;
  customer: Customer;
}
