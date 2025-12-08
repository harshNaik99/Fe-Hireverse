"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import type { CategoryItem } from "../../../lib/categories";

export default function CategoryGrid({ items }: { items: CategoryItem[] }) {
  return (
    <motion.div
      className="
        grid grid-cols-2 gap-6
        md:grid-cols-4 
        lg:grid-cols-6
        place-items-center
      "
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.08, // smooth stagger
          },
        },
      }}
    >
      {items.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </motion.div>
  );
}
