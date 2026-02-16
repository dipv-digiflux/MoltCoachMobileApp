import {
  GoogleSignin,
  statusCodes,
  type SignInResponse,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import type { LoginResponse } from '@/types/api.types';

/**
 * Configures Google Sign-In. Call once at app startup (e.g. in App.tsx).
 * Requires GOOGLE_WEB_CLIENT_ID in .env (Web client ID from Firebase/Google Cloud).
 */
export const configureGoogleSignIn = (): void => {
  const webClientId = Config.GOOGLE_WEB_CLIENT_ID;

  if (!webClientId || webClientId === '') {
    if (__DEV__) {
      console.warn(
        '[authService] GOOGLE_WEB_CLIENT_ID not set. Google Sign-In will fail.',
      );
    }
    return;
  }

  GoogleSignin.configure({
    webClientId,
    offlineAccess: false,
  });
};

/**
 * Initiates Google Sign-In flow and exchanges the idToken with the backend.
 * Returns LoginResponse on success (login or signup).
 * Throws GoogleSignInCancelledError when user cancels; throw GoogleSignInError otherwise.
 */
export const signInWithGoogle = async (): Promise<LoginResponse> => {
  await GoogleSignin.hasPlayServices();

  const result: SignInResponse = await GoogleSignin.signIn();

  if (result.type === 'cancelled' || result.data === null) {
    throw new GoogleSignInCancelledError('User cancelled sign-in');
  }
  console.log('result', result);
  const idToken = result.data.idToken;
  if (!idToken) {
    throw new GoogleSignInError('No idToken received from Google');
  }

  // const request: GoogleAuthRequest = {
  //   idToken,
  // };

  // const response = await httpPost<GoogleAuthRequest, LoginResponse>(
  //   GOOGLE_AUTH_ENDPOINT,
  //   request,
  // );

  return {
    tokens: { accessToken: result?.data?.idToken || '' },
    user: {
      id: result?.data?.user?.id || '',
      name: result?.data?.user?.name || '',
      email: result?.data?.user?.email || '',
    },
  };
};

/**
 * Whether the given error is a user-initiated cancel (no action needed).
 */
export const isGoogleSignInCancelled = (error: unknown): boolean => {
  if (error instanceof GoogleSignInCancelledError) {
    return true;
  }
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code: string }).code;
    return code === statusCodes.SIGN_IN_CANCELLED;
  }
  return false;
};

export class GoogleSignInError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoogleSignInError';
  }
}

export class GoogleSignInCancelledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoogleSignInCancelledError';
  }
}
