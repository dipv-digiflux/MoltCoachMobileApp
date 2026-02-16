import { createSlice } from '@reduxjs/toolkit';

import type { LoginResponse } from '@/types/api.types';

export type AuthStateStatus = 'idle' | 'loading' | 'authenticated' | 'error';

export type AuthState = {
  status: AuthStateStatus;
  user: LoginResponse['user'] | null;
  tokens: LoginResponse['tokens'] | null;
  errorMessage: string | null;
};

const initialState: AuthState = {
  status: 'idle',
  user: null,
  tokens: null,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
