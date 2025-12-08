import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../../../api/auth.api";
import { useNavigate } from "@tanstack/react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutAPI,

    onSuccess: () => {
      console.log("🔥 Logout successful");

      // Clear all cached queries
      queryClient.clear();

      // Navigate using TanStack Router
      navigate({ to: "/auth/login", replace: true });
    },

    onError: (err) => {
      console.error("❌ Logout failed:", err);

      // Still clear query cache
      queryClient.clear();

      // Force redirect anyway
      navigate({ to: "/auth/login", replace: true });
    }
  });
};
 