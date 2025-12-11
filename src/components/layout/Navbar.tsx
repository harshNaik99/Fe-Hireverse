"use client";

import { motion } from "framer-motion";
import { Briefcase, LogOut, User, Settings, Search, X } from "lucide-react";
import { useAuthStore } from "../../context/authStore";
import { router } from "../../main";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";


export default function Navbar() {
  // ------------------ SEARCH STATE ------------------
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showExpandedSearch, setShowExpandedSearch] = useState(false);

  const popupRef = useRef<HTMLFormElement | null>(null);
  const routerState = useRouterState();
const currentPath = routerState.location.pathname;

const showSearch = currentPath.startsWith("/jobs");


  // Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    router.navigate({
      to: "/jobs",
      search: { query, location },
    });

    setShowExpandedSearch(false);
  };

  const { user } = useAuthStore();
  const { mutate: logout, isPending } = useLogout();

  const goHome = () => router.navigate({ to: "/" });

  // ---------------- CLOSE ON CLICK OUTSIDE ----------------
  useEffect(() => {
    if (!showExpandedSearch) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowExpandedSearch(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowExpandedSearch(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showExpandedSearch]);

  return (
    <>
      {/* ========================= NAVBAR ========================= */}
      <nav
        className="
          sticky top-0 z-50 w-full
          backdrop-blur-xl bg-white/90 border-b border-gray-200 shadow-md
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO + NAV */}
          <div className="flex items-center gap-8">

            {/* LOGO */}
            <div
              onClick={goHome}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-indigo-300/40"
              >
                <Briefcase className="w-7 h-7 text-white" />
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

            {/* LINKS */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => router.navigate({ to: "/jobs" })}
                className="text-gray-700 font-medium hover:text-blue-600 transition-all"
              >
                Find Jobs
              </button>
              <button
                onClick={() => router.navigate({ to: "/blogs" })}
                className="text-gray-700 font-medium hover:text-blue-600 transition-all"
              >
                Blogs
              </button>
            </div>
          </div>

          {/* SEARCH TRIGGER BUTTON */}
        {showSearch && <button
          onClick={() => setShowExpandedSearch(true)}
          className="
            flex items-center gap-2 px-4 py-2 rounded-full
            border border-gray-300 bg-white shadow-sm
            hover:bg-gray-100 transition-all
          "
        >
          <Search className="w-5 h-5 text-gray-600" />
          <span className="text-gray-600 text-sm">Search jobs...</span>
        </button>}

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4">
            {!user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.navigate({ to: "/auth/login" })}
                className="
                  px-6 py-2 rounded-full font-medium
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white shadow-md hover:shadow-lg hover:brightness-110
                "
              >
                Login / Register
              </motion.button>
            ) : (
              <>
                <button
                  onClick={() => router.navigate({ to: "/profile" })}
                  className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-5 h-5 inline-block mr-2" /> {user.name}
                </button>

                <button
                  onClick={() => router.navigate({ to: "/jobs" })}
                  className="px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5 inline-block mr-2" /> Settings
                </button>

                <button
                  onClick={() => logout()}
                  className="px-5 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100"
                >
                  <LogOut className="w-5 h-5 inline-block mr-2" />
                  {isPending ? "…" : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ========================= FULLSCREEN SEARCH OVERLAY ========================= */}
      {showExpandedSearch && (
        <div
          className="
            fixed inset-0 bg-black/40 backdrop-blur-sm
            flex items-center justify-center z-[999]
            animate-in fade-in duration-200
          "
        >
          {/* SEARCH BAR */}
          <form
            ref={popupRef}
            onSubmit={handleSearch}
            className="
              w-full max-w-3xl
              bg-white border border-gray-300 rounded-full
              shadow-2xl px-8 py-5
              flex items-center gap-5
              animate-in zoom-in duration-200
            "
          >
            {/* BIGGER SEARCH ICON */}
            <Search className="w-7 h-7 text-gray-600 flex-shrink-0" />

            {/* QUERY INPUT */}
            <input
              autoFocus
              type="text"
              placeholder="Job title, skills, keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-2 py-2 outline-none text-gray-800 text-lg"
            />

            {/* DIVIDER */}
            <div className="h-8 w-px bg-gray-300" />

            {/* LOCATION INPUT */}
            <input
              type="text"
              placeholder="Location (Remote, Mumbai...)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-48 px-2 py-2 outline-none text-gray-800 text-lg"
            />

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="
                px-7 py-2 rounded-full text-white font-semibold
                bg-gradient-to-r from-blue-600 to-indigo-600
                shadow-md hover:brightness-110 transition
              "
            >
              Search
            </button>

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setShowExpandedSearch(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
