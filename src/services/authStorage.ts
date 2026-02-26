import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Customer } from '@/types/api.types';

const AUTH_STORAGE_KEY = 'auth/persisted';

export type PersistedAuth = {
  token: string;
  customer: Customer;
};

export const saveAuth = async (auth: PersistedAuth): Promise<void> => {
  try {
    const payload = JSON.stringify(auth);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, payload);
  } catch {
    // Storage failures should not block auth flows. Intentionally swallowed.
  }
};

export const loadAuth = async (): Promise<PersistedAuth | null> => {
  try {
    const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<PersistedAuth>;

    if (!parsed.token || !parsed.customer) {
      return null;
    }

    return {
      token: parsed.token,
      customer: parsed.customer,
    };
  } catch {
    return null;
  }
};

export const clearAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore clear failures; user can still log out logically.
  }
};
