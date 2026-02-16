import type { User, AuthTokens } from '@/types/models.types';

export type LoginRequest = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  tokens: AuthTokens;
};

export type ApiErrorResponse = {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
};
