"use client";

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import type { CategoryItem } from "../../../lib/categories";

import {
  Laptop,
  BarChart,
  Brush,
  Megaphone,
  Users,
  Settings,
  Briefcase,
  Shield,
  Wallet,
  Cloud,
  PenTool,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  BarChart,
  Brush,
  Megaphone,
  Users,
  Settings,
  Briefcase,
  Shield,
  Wallet,
  Cloud,
  PenTool,
};

export default function CategoryCard({ category }: { category: CategoryItem }) {
  const navigate = useNavigate();
  const Icon = iconMap[category.icon];

  const onClick = () =>
    navigate({
      to: "/",
      search: { categoryId: category.id },
    });

  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="
        relative w-[180px] h-[180px]
        rounded-xl 
        border border-transparent 
        shadow-sm 
        hover:shadow-[0_0_18px_rgba(59,130,246,0.15)]
        flex flex-col items-center justify-center gap-3
        cursor-pointer overflow-hidden
        transition-all
      "
      style={{
        // ⭐ Premium white → gray gradient surface
        backgroundImage: `
          linear-gradient(to bottom right, white, rgb(243 244 246)),
          linear-gradient(135deg, #e5e5e5, #ffffff)
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",

        // ⭐ Apple-style inner shadow
        boxShadow: "inset 0 0 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* ⭐ Shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          rest: { opacity: 0, x: "-200%" },
          hover: { opacity: 1, x: "200%" },
        }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(220,225,235,0.8) 45%, rgba(255,255,255,0.9) 50%, rgba(220,225,235,0.8) 55%, rgba(255,255,255,0) 100%)",
          width: "180%",
          height: "180%",
          transform: "rotate(15deg)",
        }}
      />

      {/* ⭐ Slight hover tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.12 },
        }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            "linear-gradient(135deg, rgba(240,240,240,0.25), rgba(225,225,225,0.18))",
        }}
      />

      {/* ⭐ ICON */}
      <motion.div
        variants={{
          rest: { scale: 1, opacity: 0.9 },
          hover: { scale: 1.12, opacity: 1 },
        }}
        transition={{ duration: 0.25 }}
        className="
          w-12 h-12 flex items-center justify-center
          rounded-lg bg-gray-50 border border-gray-200
        "
      >
        <Icon size={36} className="text-blue-600" />
      </motion.div>

      {/* ⭐ TEXT */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">{category.name}</p>
        <p className="text-xs text-gray-500">{category.totalJobs} Jobs</p>
      </div>

      {/* ⭐ ARROW */}
      <motion.span
        className="absolute bottom-3 right-3 text-blue-600 text-sm font-semibold"
        variants={{
          rest: { opacity: 0, x: 6 },
          hover: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.25 }}
      >
        →
      </motion.span>
    </motion.button>
  );
}
