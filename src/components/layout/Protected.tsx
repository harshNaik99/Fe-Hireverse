// src/components/layout/Protected.tsx
"use client";

import { useAuthStore } from "../../context/authStore";
import { Navigate } from "@tanstack/react-router";

export default function Protected({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}
