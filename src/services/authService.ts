import { Platform } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  type SignInResponse,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

/**
 * Configures Google Sign-In. Call once at app startup (e.g. in App.tsx).
 * Requires GOOGLE_WEB_CLIENT_ID in .env (Web client ID from Firebase/Google Cloud).
 * On iOS, also requires GOOGLE_IOS_CLIENT_ID — must be an iOS OAuth client ID from
 * Google Cloud (not the Web client). Using the Web client on iOS causes "Custom scheme
 * URIs are not allowed for 'WEB' client type". See GOOGLE_SIGNIN_SETUP.md.
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

  // iOS requires a dedicated iOS OAuth client ID. Do NOT use webClientId here —
  // Google rejects custom URL schemes for WEB client type (Error 400: invalid_request).
  const iosClientId =
    Platform.OS === 'ios' ? Config.GOOGLE_IOS_CLIENT_ID : undefined;

  if (
    Platform.OS === 'ios' &&
    (!iosClientId || iosClientId === '') &&
    __DEV__
  ) {
    console.warn(
      '[authService] GOOGLE_IOS_CLIENT_ID not set. iOS Google Sign-In requires an iOS OAuth client (not Web). Add it in .env and set Info.plist URL scheme to its reversed ID. See GOOGLE_SIGNIN_SETUP.md.',
    );
  }

  GoogleSignin.configure({
    webClientId,
    ...(iosClientId ? { iosClientId } : {}),
    offlineAccess: false,
  });
};

/**
 * Initiates Google Sign-In flow. Returns idToken for backend exchange.
 * Throws GoogleSignInCancelledError when user cancels; GoogleSignInError otherwise.
 */
export const getGoogleIdToken = async (): Promise<string> => {
  await GoogleSignin.hasPlayServices();

  const result: SignInResponse = await GoogleSignin.signIn();
  if (result.type === 'cancelled' || result.data === null) {
    throw new GoogleSignInCancelledError('User cancelled sign-in');
  }
  const idToken = result.data.idToken;
  if (!idToken) {
    throw new GoogleSignInError('No idToken received from Google');
  }

  return idToken;
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
