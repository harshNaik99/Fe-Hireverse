// src/context/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAccessToken, clearAccessToken } from "../utils/tokenManager";

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

interface AuthState {
  user: User | null;
  login: (user: User, token: string) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      
      login: (user, token) => {
        console.log("✅ Login called:", { user, token });
        setAccessToken(token);
        set({ user });
      },
      
      setUser: (user) => {
        console.log("✅ SetUser called:", user);
        set({ user });
      },
      
      clearUser: () => {
        console.log("✅ ClearUser called");
        clearAccessToken();
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);