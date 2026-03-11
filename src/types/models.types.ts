export type UserId = string;

export interface User {
  id: UserId;
  name: string;
  email: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}
