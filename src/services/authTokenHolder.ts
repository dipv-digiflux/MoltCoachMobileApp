/**
 * Holder for the current access token. Updated when auth state changes.
 * Used by apiClient to attach Authorization header. Avoids circular deps.
 */
let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};
