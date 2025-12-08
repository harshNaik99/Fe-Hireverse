// src/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../../api/auth.api";
import { useAuthStore } from "../../../context/authStore";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerAPI,
    onSuccess: (res) => {
      const { user, accessToken } = res.data;
      useAuthStore.getState().login(user, accessToken);
    },
  });
};
