import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { postAuthenticate, postBookCall } from '@/api/authApi';
import { rootNavigationRef } from '@/navigation/navigationRef';
import {
  getGoogleAccessToken,
  isGoogleSignInCancelled,
} from '@/services/authService';
import { clearAuth, saveAuth } from '@/services/authStorage';
import { setAccessToken } from '@/services/authTokenHolder';
import {
  logout,
  setOperationError,
  setOperationIdle,
  setOperationLoading,
  setOperationSuccess,
} from '@/store/slices/authSlice';
import { getCoachBookingsThunk } from '@/store/thunks/bookingThunks';
import { getApiErrorMessage } from '@/utils/apiError';
import { showErrorToast } from '@/utils/toast';

import type { AppDispatch } from '@/store/store';
import type {
  AuthenticateRequest,
  AuthenticateResponse,
  BookCallRequest,
  BookCallResponse,
} from '@/types/api.types';

/**
 * Thunk: Sign in with Google. Gets idToken via SDK, exchanges with backend.
 * On success, stores token + customer. Does nothing on user cancel; dispatches setOperationError on other failures.
 */
export const signInWithGoogleThunk =
  () =>
  async (dispatch: AppDispatch): Promise<AuthenticateResponse | null> => {
    dispatch(setOperationLoading('googleSignIn'));
    console.log('handleGoogleSignIn 0');

    try {
      const accessToken = await getGoogleAccessToken();
      console.log('handleGoogleSignIn 1', accessToken);
      const response = await postAuthenticate({
        type: 'google_web',
        token: accessToken,
      });

      if (response.status && response.token) {
        setAccessToken(response.token);
        dispatch(setOperationIdle('googleSignIn'));
        await dispatch(getCoachBookingsThunk());
        return response;
      }
      console.log('handleGoogleSignIn 2', { response });
      await GoogleSignin.clearCachedAccessToken(accessToken);
      await GoogleSignin.signOut();
      const errorMsg = response.message || 'Google sign-in failed';
      dispatch(
        setOperationError({ operation: 'googleSignIn', message: errorMsg }),
      );
      showErrorToast(errorMsg);
      return null;
    } catch (error) {
      console.log('handleGoogleSignIn 3', error);
      if (isGoogleSignInCancelled(error)) {
        dispatch(setOperationIdle('googleSignIn'));
        return null;
      }
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'googleSignIn', message: errorMsg }),
      );
      console.log('handleGoogleSignIn 4');
      showErrorToast(errorMsg);
      throw error;
    }
  };

/**
 * Thunk: Request OTP (email or phone).
 */
export const requestOTPThunk =
  (request: AuthenticateRequest) =>
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
 * Thunk: Verify OTP.
 */
export const verifyOTPThunk =
  (request: AuthenticateRequest & { otp: string }) =>
  async (dispatch: AppDispatch): Promise<AuthenticateResponse> => {
    dispatch(setOperationLoading('verifyOTP'));

    try {
      const response = await postAuthenticate(request);
      if (response.status && response.token) {
        setAccessToken(response.token);
        await saveAuth({ token: response.token });
        dispatch(setOperationIdle('verifyOTP'));
        await dispatch(getCoachBookingsThunk());
        return response;
      }

      const errorMsg = response.message || 'Verification failed';
      dispatch(
        setOperationError({ operation: 'verifyOTP', message: errorMsg }),
      );
      throw new Error(errorMsg);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(
        setOperationError({ operation: 'verifyOTP', message: errorMsg }),
      );
      throw error;
    }
  };

/**
 * Thunk: Log out, clear persisted auth, clear Redux user data, and reset
 * navigation to IntroCarousel (onboarding). Removes all stack history.
 */
export const logoutThunk =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(logout());
    await clearAuth();

    if (rootNavigationRef.isReady()) {
      rootNavigationRef.reset({
        index: 0,
        routes: [
          {
            name: 'OnboardingStack',
            state: {
              index: 0,
              routes: [{ name: 'IntroCarousel' }],
            },
          },
        ],
      });
    }
  };

/**
 * Thunk: Book a call (Calendly booking store).
 */
export const bookCallThunk =
  (request: BookCallRequest) =>
  async (dispatch: AppDispatch): Promise<BookCallResponse> => {
    dispatch(setOperationLoading('bookCall'));

    try {
      const response = await postBookCall(request);
      if (response.status) {
        dispatch(setOperationSuccess('bookCall'));
      } else {
        dispatch(setOperationIdle('bookCall'));
      }
      return response;
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      dispatch(setOperationError({ operation: 'bookCall', message: errorMsg }));
      throw error;
    }
  };
