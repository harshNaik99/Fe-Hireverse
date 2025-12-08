// /components/BenefitCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Sparkles,
  Timer,
  BarChart3,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { BenefitItem } from "../../../lib/benefits";

const iconMap: Record<string, React.ElementType> = {
  BadgeCheck,
  Sparkles,
  Timer,
  BarChart3,
  ShieldCheck,
  Star,
};

type Props = {
  item: BenefitItem;
  index?: number;
};

export default function BenefitCard({ item, index = 0 }: Props) {
  const Icon = iconMap[item.icon] || Star;

  return (
    <motion.article
      role="group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -6 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay: index * 0.04 }}
      className="relative overflow-hidden rounded-2xl border border-gray-200/40 bg-gradient-to-br from-white to-slate-50 p-6 shadow-md"
    >
      {/* subtle halo behind icon */}
      <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-gradient-to-tr from-sky-50 to-indigo-50 opacity-70 blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 border border-gray-100 shadow-sm">
            <Icon size={22} className="text-sky-600" aria-hidden />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-2 text-sm text-gray-600 leading-snug">
            {item.description}
          </p>
        </div>
      </div>

      {/* focus ring for keyboard users */}
      <style>{`
        article:focus-within {
          outline: none;
        }
      `}</style>
    </motion.article>
  );
}
