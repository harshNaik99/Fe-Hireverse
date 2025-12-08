// src/routes/auth.tsx
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AuthLayout from "../../features/auth/components/AuthLayout";
import { useAuthStore } from "../../context/authStore";

export const Route = createFileRoute("/auth")({
  // Redirect authenticated users away from auth pages
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    
    if (user) {
      // User is already logged in, redirect to dashboard
      throw redirect({
        to: "/",
      });
    }
  },
  component: AuthLayoutWrapper,
});

function AuthLayoutWrapper() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}