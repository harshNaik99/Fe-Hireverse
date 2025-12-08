// src/routes/profile/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import Profile from "../../pages/Profile";
import Protected from "../../components/layout/Protected";

export const Route = createFileRoute("/profile/")({
  component: () => (
    <Protected>
      <Profile />
    </Protected>
  ),
});
