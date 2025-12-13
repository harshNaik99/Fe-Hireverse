// src/pages/auth/reset-password/useReset.ts
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "../../../api/auth.api";
import type { ResetPasswordPayload, ResetPasswordResult } from "../components/ResetPassword/types";

export const useReset = () => {
  return useMutation<ResetPasswordResult, unknown, ResetPasswordPayload>({
    mutationFn: resetPasswordAPI,
  });
};
