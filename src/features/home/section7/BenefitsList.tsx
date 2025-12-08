// /components/BenefitsList.tsx
"use client";

import { motion } from "framer-motion";
import BenefitCard from "./BenefitCard";
import type { BenefitItem } from "../../../lib/benefits";

type Props = {
  items: BenefitItem[];
};

export default function BenefitsList({ items }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((it, idx) => (
        <BenefitCard key={it.id} item={it} index={idx} />
      ))}
    </motion.div>
  );
}
