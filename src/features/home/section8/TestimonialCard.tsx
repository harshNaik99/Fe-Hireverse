// components/TestimonialCard.tsx

"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { type Testimonial } from "../../../lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isDragging?: boolean;
}

export default function TestimonialCard({ testimonial, isDragging }: TestimonialCardProps) {
  // motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-7, 7]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // badge colors
  const getRoleBadgeColor = (role: string): string => {
    switch (role) {
      case "Candidate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "HR":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Freelance HR":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // rating logic
  const rounded = Math.round(testimonial.rating * 2) / 2;
  const starTypes = Array.from({ length: 5 }).map((_, i) => {
    const n = i + 1;
    if (rounded >= n) return "full";
    if (rounded >= n - 0.5) return "half";
    return "empty";
  });

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        isDragging
          ? {}
          : { rotateX, rotateY, perspective: 1100 }
      }
      // whileHover={
      //   isDragging
      //     ? {}
      //     : {
      //         scale: 1.03,
      //         boxShadow:
      //           "0 25px 35px -8px rgba(0,0,0,0.08), 0 10px 15px -5px rgba(0,0,0,0.04)",
      //       }
      // }
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        bg-white rounded-2xl shadow-md p-6 h-full flex flex-col
        relative overflow-hidden group border border-gray-100
      "
    >
      {/* SHINE (always mounted) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: isDragging ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          opacity: isDragging ? 0 : 1,
          x: useTransform(x, [-0.5, 0.5], ["-65%", "65%"]),
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
        }}
      />

      {/* GRADIENT (always mounted) */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl"
        initial={{ opacity: 0.2 }}
        whileHover={{ opacity: isDragging ? 0.2 : 0.55 }}
        transition={{ duration: 0.4 }}
        style={{
          opacity: isDragging ? 0.2 : 0.55,
          background:
            "radial-gradient(circle at 70% 30%, rgba(219,234,254,0.55), rgba(248,250,252,0))",
        }}
      />

      {/* QUOTE ICON (always mounted) */}
      <motion.div
        className="absolute top-4 right-4 text-gray-200"
        style={
          isDragging
            ? { opacity: 0.4 }
            : {
                translateX: useTransform(x, [-0.5, 0.5], [8, -8]),
                translateY: useTransform(y, [-0.5, 0.5], [6, -6]),
              }
        }
      >
        <Quote size={50} strokeWidth={1.3} />
      </motion.div>

      {/* HEADER */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        <motion.div
          className="relative"
          style={
            isDragging
              ? {}
              : {
                  translateX: useTransform(x, [-0.5, 0.5], [-6, 6]),
                  translateY: useTransform(y, [-0.5, 0.5], [-4, 4]),
                }
          }
        >
          <img
            src={testimonial.profileImage}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-100"
          />

          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-lg truncate">
            {testimonial.name}
          </h4>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 border ${getRoleBadgeColor(
              testimonial.role
            )}`}
          >
            {testimonial.role}
          </span>

          {testimonial.company && (
            <p className="text-sm text-gray-600 mt-1.5 font-medium truncate">
              {testimonial.company}
            </p>
          )}
        </div>
      </div>

      {/* RATING */}
      <div className="flex items-center gap-1 mb-4 relative z-10">
        {starTypes.map((type, i) => {
          if (type === "full")
            return (
              <Star
                key={i}
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
            );

          if (type === "half")
            return (
              <div key={i} className="relative" style={{ width: 18, height: 18 }}>
                <Star size={18} className="text-gray-200" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            );

          return <Star key={i} size={18} className="text-gray-200" />;
        })}

        <span className="ml-2 text-sm font-semibold text-gray-700">
          {rounded.toFixed(1)}
        </span>
      </div>

      {/* MESSAGE */}
      <p className="text-gray-700 leading-relaxed mb-4 flex-1 relative z-10 text-[15px]">
        "{testimonial.message}"
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
        <span className="text-sm text-gray-500 font-medium">
          {testimonial.date}
        </span>

        {testimonial.date.includes("Hired") && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-semibold">
            ✓ Hired
          </span>
        )}
      </div>
    </motion.div>
  );
}
