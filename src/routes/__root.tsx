import { createRootRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const matchRoute = useMatchRoute();
  const isAuthRoute = matchRoute({ to: '/auth', fuzzy: true });

  return (
    <>
      {!isAuthRoute && <Navbar />}
      
        <Outlet />
      
      {!isAuthRoute && <Footer />}
    </>
  );
}