import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { getCustomer, postAuthenticate } from '@/api/authApi';
import {
  getGoogleIdToken,
  isGoogleSignInCancelled,
} from '@/services/authService';
import { clearAuth, saveAuth } from '@/services/authStorage';
import { getAccessToken, setAccessToken } from '@/services/authTokenHolder';
import {
  logout,
  setCustomer,
  setOperationError,
  setOperationIdle,
  setOperationLoading,
} from '@/store/slices/authSlice';
import { getApiErrorMessage } from '@/utils/apiError';
import { showErrorToast } from '@/utils/toast';

import type { AppDispatch } from '@/store/store';
import type {
  AuthenticateRequest,
  AuthenticateResponse,
} from '@/types/api.types';

/**
 * Thunk: Sign in with Google. Gets idToken via SDK, exchanges with backend.
 * On success, stores token + customer. Does nothing on user cancel; dispatches setOperationError on other failures.
 */
export const signInWithGoogleThunk =
  () =>
  async (dispatch: AppDispatch): Promise<AuthenticateResponse | null> => {
    dispatch(setOperationLoading('googleSignIn'));

    try {
      const idToken = await getGoogleIdToken();
      const response = await postAuthenticate({
        type: 'google_mobile',
        token: idToken,
      });

      if (response.status && response.token) {
        setAccessToken(response.token);
        const response2 = await getCustomer();
        const customer = response2.data?.customer;
        if (customer) {
          dispatch(setCustomer(customer));
          const token = getAccessToken();
          if (token) {
            await saveAuth({ token, customer });
          }
        }
        dispatch(setOperationIdle('googleSignIn'));
        return {
          ...response,
          customer: response2.data?.customer ?? null,
        };
      }
      await GoogleSignin.clearCachedAccessToken(idToken);
      await GoogleSignin.signOut();
      const errorMsg = response.message || 'Google sign-in failed';
      dispatch(
        setOperationError({ operation: 'googleSignIn', message: errorMsg }),
      );
      showErrorToast(errorMsg);
      return null;
    } catch (error) {
      if (isGoogleSignInCancelled(error)) {
        dispatch(setOperationIdle('googleSignIn'));
        return null;
      }
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'googleSignIn', message: errorMsg }),
      );
      showErrorToast(errorMsg);
      throw error;
    }
  };

/**
 * Thunk: Request OTP (email or phone). Returns response; caller navigates to OTP screen if show_otp.
 */
export const requestOTPThunk =
  (request: Extract<AuthenticateRequest, { type: 'normal' }>) =>
  async (dispatch: AppDispatch): Promise<AuthenticateResponse> => {
    dispatch(setOperationLoading('requestOTP'));

    try {
      const response = await postAuthenticate(request);
      dispatch(setOperationIdle('requestOTP'));
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'requestOTP', message: errorMsg }),
      );
      throw error;
    }
  };

/**
 * Thunk: Verify OTP. On success, stores token + customer.
 */
export const verifyOTPThunk =
  (
    request: Extract<AuthenticateRequest, { type: 'normal' }> & { otp: string },
  ) =>
  async (dispatch: AppDispatch): Promise<AuthenticateResponse> => {
    dispatch(setOperationLoading('verifyOTP'));

    try {
      const response = await postAuthenticate(request);
      if (response.status && response.token) {
        setAccessToken(response.token);
        const response2 = await getCustomer();
        const customer = response2.data?.customer;
        if (customer) {
          dispatch(setCustomer(customer));
          const token = getAccessToken();
          if (token) {
            await saveAuth({ token, customer });
          }
        }
        dispatch(setOperationIdle('verifyOTP'));
        return {
          ...response,
          customer: response2.data?.customer ?? null,
        };
      }
      const errorMsg = response.message || 'Invalid OTP';
      dispatch(
        setOperationError({ operation: 'verifyOTP', message: errorMsg }),
      );
      throw new Error(response.message);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'verifyOTP', message: errorMsg }),
      );
      throw error;
    }
  };

/**
 * Thunk: Fetch customer data from backend (source of truth).
 * Requires Bearer token. On success, stores customer in auth slice.
 */
export const getCustomerThunk =
  (include?: string) => async (dispatch: AppDispatch) => {
    dispatch(setOperationLoading('getCustomer'));
    try {
      const response = await getCustomer(include);

      if (response.status && response.data?.customer) {
        const customer = response.data.customer;
        dispatch(setCustomer(customer));
        const token = getAccessToken();
        if (token) {
          await saveAuth({ token, customer });
        }
        dispatch(setOperationIdle('getCustomer'));
        return customer;
      }
      dispatch(
        setOperationError({
          operation: 'getCustomer',
          message: response.message || 'Failed to load customer',
        }),
      );
      return null;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'getCustomer', message: errorMsg }),
      );
      throw error;
    }
  };

/**
 * Thunk: Log out and clear persisted auth.
 */
export const logoutThunk =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(logout());
    await clearAuth();
  };
