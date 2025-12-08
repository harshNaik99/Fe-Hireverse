// src/main.tsx
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// TanStack Router
import {  createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";


// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Error Boundary
import { ErrorBoundary } from "react-error-boundary";

// Toast (Sonner)
import { Toaster } from "sonner";

export const router = createRouter({ routeTree });

// Register router globally
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
          <Toaster richColors position="top-right" />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
);
