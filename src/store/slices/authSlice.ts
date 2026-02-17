import { createSlice } from '@reduxjs/toolkit';

import {
  isGoogleSignInCancelled,
  signInWithGoogle,
} from '@/services/authService';
import { setAccessToken } from '@/services/authTokenHolder';

import type { AppDispatch } from '@/store/store';
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
    setLoading: state => {
      state.status = 'loading';
      state.errorMessage = null;
    },
    setAuthenticated: (state, action: { payload: LoginResponse }) => {
      state.status = 'authenticated';
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.errorMessage = null;
      setAccessToken(action.payload.tokens.accessToken);
    },
    setError: (state, action: { payload: string }) => {
      state.status = 'error';
      state.errorMessage = action.payload;
    },
    setIdle: state => {
      state.status = 'idle';
      state.errorMessage = null;
    },
    logout: () => {
      setAccessToken(null);
      return initialState;
    },
  },
});

export const { setLoading, setAuthenticated, setError, setIdle, logout } =
  authSlice.actions;
export const authReducer = authSlice.reducer;

/**
 * Thunk: Sign in with Google. On success, stores user + tokens.
 * Does nothing on user cancel; dispatches setError on other failures.
 */
export const signInWithGoogleThunk =
  () =>
  async (dispatch: AppDispatch): Promise<LoginResponse | null> => {
    dispatch(setLoading());

    try {
      const response = await signInWithGoogle();
      dispatch(setAuthenticated(response));
      return response;
    } catch (error) {
      if (isGoogleSignInCancelled(error)) {
        dispatch(setIdle());
        return null;
      }
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed';
      dispatch(setError(message));
      throw error;
    }
  };
