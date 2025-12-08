// /components/RecruiterList.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecruiterCard from "./RecruiterCard";
import type { Recruiter } from "../../../lib/recruiters";

type Props = {
  data?: Recruiter[]; // optional override
  simulateError?: boolean;
};

function SkeletonCard() {
  return (
    <div className="w-full h-56 rounded-2xl border border-gray-200 bg-white shadow-sm p-5 animate-pulse" />
  );
}

export default function RecruiterList({ data, simulateError = false }: Props) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Recruiter[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const t = setTimeout(() => {
      if (simulateError) {
        setError("Failed to load recruiters. Please try again.");
        setItems(null);
        setLoading(false);
        return;
      }

      if (data && data.length) {
        setItems(data);
      } else {
        // lazy import default data to avoid bundling issues if needed
        import("../../../lib/recruiters").then((mod) => {
          setItems(mod.recruiters);
        });
      }
      setLoading(false);
    }, 700);

    return () => clearTimeout(t);
  }, [data, simulateError]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl border border-red-100 bg-red-50 text-red-700">
        <h4 className="font-semibold mb-2">Unable to load recruiters</h4>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-6 rounded-2xl border border-gray-200 bg-white">
        <p className="text-gray-700">No recruiters available at the moment.</p>
      </div>
    );
  }

  return (
    <motion.div
    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.07 },
      },
    }}
  >
  
      <AnimatePresence>
        {items.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.36 }}
          >
            <RecruiterCard recruiter={r} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
