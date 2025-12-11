// src/main.tsx
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// 🚫 Suppress browser extension errors in production
// Filter extension errors globally (production-safe)
window.addEventListener(
  "error",
  (event) => {
    const src = event?.filename || "";
    const msg = event?.message || "";

    const isExtensionError =
      src.includes("chrome-extension") ||
      src.includes("moz-extension") ||
      src.includes("safari-extension") ||
      src.includes("content.bundle.js") ||
      msg.toLowerCase().includes("content.bundle.js");

    if (isExtensionError) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
  },
  true // <-- THIS IS THE CRUCIAL FIX (CAPTURE PHASE)
);

window.addEventListener(
  "unhandledrejection",
  (event) => {
    const reason = String(event.reason || "").toLowerCase();

    const isExtensionPromiseError =
      reason.includes("chrome-extension") ||
      reason.includes("content.bundle.js");

    if (isExtensionPromiseError) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }
  },
  true // <-- CAPTURE phase again
);


// TanStack Router
import { createRouter, RouterProvider } from "@tanstack/react-router";
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
