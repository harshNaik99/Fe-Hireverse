// src/pages/auth/forgot-password/types.ts
export type ForgotPasswordPayload = { email: string };

// matches your backend RESULT shape
export type ForgotPasswordResult = {
  STATUS?: number;
  MESSAGE?: string;
  IS_TOKEN_EXPIRE?: number;
};
