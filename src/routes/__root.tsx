import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobDetailsPanel from "../features/home/components/jobCardFeatured/JobDetailsPanel/JobDetailsPanel";
import { useJobDetailsPanel } from "../features/home/components/jobCardFeatured/JobDetailsPanel/useJobDetailsPanel";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const matchRoute = useMatchRoute();
  const isAuthRoute = matchRoute({ to: "/auth", fuzzy: true });

  const { job, isOpen, closePanel } = useJobDetailsPanel();

  return (
    <>
      {!isAuthRoute && <Navbar />}

      <Outlet />

      {/* Global job details panel, above all pages */}
      <JobDetailsPanel job={job} open={isOpen} onClose={closePanel} />

      {!isAuthRoute && <Footer />}
    </>
  );
}
