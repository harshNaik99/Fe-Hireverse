"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { BadgeCheck, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import type { Recruiter } from "../../../lib/recruiters";
import StarRating from "./StarRating";

export default function RecruiterCard({ recruiter }: { recruiter: Recruiter }) {
  const navigate = useNavigate();

  // Micro tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const go = () =>
    navigate({
      to: "/recruiter/$id",
      params: { id: recruiter.id },
    });

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={go}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="
        relative rounded-3xl bg-white border border-gray-200 
        shadow-sm cursor-pointer px-7 py-8 w-full flex flex-col 
        transition-all duration-300 overflow-hidden
      "
    >
      {/* Soft background tint */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.06 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
        }}
      />

      {/* Dribbble-style diagonal shine sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)",
          transform: "skewX(-15deg)",
        }}
      />

      {/* Subtle cursor shine (radial glow) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: useTransform(x, [-0.5, 0.5], ["40%", "-40%"]),
          y: useTransform(y, [-0.5, 0.5], ["40%", "-40%"]),
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 65%)",
        }}
      />

      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500" />

      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center gap-5 relative z-10">
        <motion.div
          className="relative"
          style={{
            translateX: useTransform(x, [-0.5, 0.5], [-5, 5]),
            translateY: useTransform(y, [-0.5, 0.5], [-3, 3]),
          }}
        >
          <img
            src={recruiter.profilePicture}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
          />

          {recruiter.verified && (
            <span className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
              <BadgeCheck className="w-5 h-5 text-sky-500" />
            </span>
          )}
        </motion.div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {recruiter.name}
          </h3>

          <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 text-xs bg-sky-50 text-sky-700 border border-sky-100 rounded-md w-fit">
            <Briefcase className="w-3.5 h-3.5" />
            {recruiter.role === "HR" ? "HR Professional" : "Freelance HR"}
          </div>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-600 truncate">
            <MapPin className="w-3.5 h-3.5" />
            {recruiter.location}
          </div>
        </div>
      </div>

      {/* ---------------- SPECIALIZATIONS ---------------- */}
      <div className="mt-6 relative z-10">
        <h4 className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
          Specializations
        </h4>

        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {recruiter.specializations.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="
                px-3 py-1.5 text-xs rounded-full
                bg-gray-50 border border-gray-200 text-gray-700
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}
      <div
        className="
          mt-6 bg-gradient-to-br from-gray-50 to-slate-100
          border border-gray-200 rounded-xl p-4 flex items-center justify-between
          min-h-[86px] relative z-10
        "
      >
        {/* Rating */}
        <div>
          <p className="text-xs text-gray-500">Rating</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating value={recruiter.rating} size={16} />
            <span className="text-sm font-semibold text-gray-900">
              {recruiter.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Total Hires */}
        <div className="text-right">
          <p className="text-xs text-gray-500">Hires</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 text-transparent bg-clip-text">
            {recruiter.totalHires}
          </p>
        </div>
      </div>

      {/* ---------------- CTA BUTTON ---------------- */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={(e) => {
          e.stopPropagation();
          go();
        }}
        className="
          mt-6 py-3 w-full rounded-xl text-sm font-semibold
          bg-gradient-to-r from-sky-500 to-blue-600 text-white
          shadow-md hover:shadow-xl relative overflow-hidden
        "
      >
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            transform: "translateX(-120%)",
            transition: "transform 0.55s cubic-bezier(.25,.8,.25,1)",
          }}
        />

        <span className="relative z-10">View Profile →</span>
      </motion.button>
    </motion.div>
  );
}
