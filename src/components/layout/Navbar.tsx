"use client";

import { motion } from "framer-motion";
import { Briefcase, LogOut, User, Settings } from "lucide-react";
import { useAuthStore } from "../../context/authStore";
import { router } from "../../main";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  const goHome = () => router.navigate({ to: "/" });

  /** -------------------------
   *  STICKY + SCROLL HIDE
   * ------------------------*/
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Hide navbar when scrolling down
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? -55 : 0,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
      className="
        sticky top-0 z-[9999] w-full
        backdrop-blur-xl
        bg-white/90
        border-b border-gray-200/40
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        transition-all duration-300
        font-[Poppins]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ========================== LEFT: LOGO + NAV LINKS ========================== */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <div
            onClick={goHome}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="
                p-3 rounded-xl 
                bg-gradient-to-br from-blue-600 to-indigo-600
                shadow-lg shadow-indigo-300/40
              "
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>

            <div>
              <h1 className="text-[21px] font-semibold text-[#1E1E2F] leading-none">
                HireVerse
              </h1>
              <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase">
                Job Marketplace
              </p>
            </div>
          </div>

          {/* NAVIGATION LINKS (LEFT) */}
          <div className="hidden md:flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.navigate({ to: "/jobs" })}
              className="text-gray-700 font-medium hover:text-blue-600 transition-all"
            >
              Find Jobs
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.navigate({ to: "/blogs" })}
              className="text-gray-700 font-medium hover:text-blue-600 transition-all"
            >
              Blogs
            </motion.button>
          </div>
        </div>

        {/* ========================== RIGHT SIDE: AUTH ========================== */}
        <div className="flex items-center gap-4">

          {/* GUEST USER */}
          {!user && (
            <motion.button
              whileHover={{ scale: 1.05, translateY: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.navigate({ to: "/auth/login" })}
              className="
                px-6 py-2 
                rounded-full 
                font-medium 
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white 
                shadow-md 
                hover:shadow-lg hover:brightness-110
                transition-all duration-300
                whitespace-nowrap
              "
            >
              Login / Register
            </motion.button>
          )}

          {/* LOGGED IN USER */}
          {user && (
            <>
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100"
                onClick={() => router.navigate({ to: "/profile" })}
              >
                <User className="w-5 h-5 inline-block mr-2" />
                {user.name}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100"
                onClick={() => router.navigate({ to: "/jobs" })}
              >
                <Settings className="w-5 h-5 inline-block mr-2" />
                Settings
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="px-5 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100"
                onClick={() => logout()}
              >
                <LogOut className="w-5 h-5 inline-block mr-2" />
                {isPending ? "…" : "Logout"}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
