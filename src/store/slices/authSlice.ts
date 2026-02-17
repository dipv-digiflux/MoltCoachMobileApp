import { createSlice } from '@reduxjs/toolkit';

import { setAccessToken } from '@/services/authTokenHolder';

import type { AuthenticateResponse, Customer } from '@/types/api.types';

/** Status for a single async operation (API call). */
export type OperationStatus = 'idle' | 'loading' | 'success' | 'error';

/** Per-operation state: loading flag + error message. */
export type OperationState = {
  status: OperationStatus;
  error: string | null;
};

/** Auth-related operations. Each has its own status for independent loading/error handling. */
export type AuthOperationKey = 'googleSignIn' | 'requestOTP' | 'verifyOTP';

const createInitialOperation = (): OperationState => ({
  status: 'idle',
  error: null,
});

const initialOperations: Record<AuthOperationKey, OperationState> = {
  googleSignIn: createInitialOperation(),
  requestOTP: createInitialOperation(),
  verifyOTP: createInitialOperation(),
};

export type AuthState = {
  /** Auth data — set on successful auth. */
  customer: Customer | null;
  token: string | null;
  /** Overall auth state for routing (idle, authenticated, or error). */
  authStatus: 'idle' | 'authenticated' | 'error';
  /** Last global error message (e.g. from setAuthenticated failure). */
  errorMessage: string | null;
  /** Per-operation status for each API. Enables independent loaders and error handling. */
  operations: Record<AuthOperationKey, OperationState>;
};

const initialState: AuthState = {
  customer: null,
  token: null,
  authStatus: 'idle',
  errorMessage: null,
  operations: initialOperations,
};

const applyOperationLoading = (
  state: AuthState,
  operation: AuthOperationKey,
): void => {
  state.operations[operation] = { status: 'loading', error: null };
};

const applyOperationSuccess = (
  state: AuthState,
  operation: AuthOperationKey,
): void => {
  state.operations[operation] = { status: 'success', error: null };
};

const applyOperationError = (
  state: AuthState,
  operation: AuthOperationKey,
  message: string,
): void => {
  state.operations[operation] = { status: 'error', error: message };
};

const applyOperationIdle = (
  state: AuthState,
  operation: AuthOperationKey,
): void => {
  state.operations[operation] = { status: 'idle', error: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOperationLoading: (state, action: { payload: AuthOperationKey }) => {
      applyOperationLoading(state, action.payload);
    },
    setOperationSuccess: (state, action: { payload: AuthOperationKey }) => {
      applyOperationSuccess(state, action.payload);
    },
    setOperationError: (
      state,
      action: { payload: { operation: AuthOperationKey; message: string } },
    ) => {
      applyOperationError(
        state,
        action.payload.operation,
        action.payload.message,
      );
    },
    setOperationIdle: (state, action: { payload: AuthOperationKey }) => {
      applyOperationIdle(state, action.payload);
    },
    setAuthenticated: (state, action: { payload: AuthenticateResponse }) => {
      state.authStatus = 'authenticated';
      state.customer = action.payload.customer;
      state.token = action.payload.token;
      state.errorMessage = null;
      setAccessToken(
        action.payload.token && action.payload.token.length > 0
          ? action.payload.token
          : null,
      );
    },
    setAuthError: (state, action: { payload: string }) => {
      state.authStatus = 'error';
      state.errorMessage = action.payload;
    },
    logout: () => {
      setAccessToken(null);
      return initialState;
    },
  },
});

export const {
  setOperationLoading,
  setOperationSuccess,
  setOperationError,
  setOperationIdle,
  setAuthenticated,
  setAuthError,
  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
