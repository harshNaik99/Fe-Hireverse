// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { refreshAccessToken } from "../../../api/axiosInstance";
import { useAuthStore } from "../../../context/authStore";

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Only try refresh if we have a user in storage
        // (indicates they were logged in before)
        if (user) {
          console.log("Restoring session...");
          await refreshAccessToken();
          console.log("Session restored");
        }
      } catch (error) {
        console.log("Session restore failed");
        useAuthStore.getState().clearUser();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []); // Only run once on mount

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};