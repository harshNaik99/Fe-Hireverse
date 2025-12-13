// src/pages/auth/reset-password/types.ts
export type ResetPasswordPayload = {
    email: string;
    token: string;
    newPassword: string;
  };
  
  export type ResetPasswordResult = {
    STATUS?: number;
    MESSAGE?: string;
  };
  