export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};
