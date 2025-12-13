// src/pages/auth/forgot-password/useForgotPassword.ts
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../../../api/auth.api";
import type { ForgotPasswordPayload, ForgotPasswordResult } from "../components/ForgetPassword/types";

export const useForgot = () => {
  return useMutation<ForgotPasswordResult, unknown, ForgotPasswordPayload>({
    mutationFn: forgotPasswordAPI,
  });
};