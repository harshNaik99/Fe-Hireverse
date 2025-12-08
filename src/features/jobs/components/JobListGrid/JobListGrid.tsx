"use client";

import { motion } from "framer-motion";
import { JobCard } from "../../../../components/ui/jobCardFeatured/JobCard";
import { Briefcase } from "lucide-react";
import useJobListGrid from "./useJobListGrid"
import type { JobListGridProps } from "./types";
import { containerVariants, itemVariants } from "./consts";

export default function JobListGrid({
  jobs,
  isLoading,
  onJobSelect,
  onApply,
}: JobListGridProps) {
  const {
    hasJobs,
    shimmerCount,
    emptyHeader,
    emptyMessage,
  } = useJobListGrid(jobs, isLoading);

  /** LOADING */
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[...Array(shimmerCount)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="h-64 bg-muted/50 rounded-2xl animate-pulse border border-border/40"
          />
        ))}
      </div>
    );
  }

  /** EMPTY */
  if (!hasJobs) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 shadow-lg">
          <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{emptyHeader}</h3>
        <p className="text-muted-foreground max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  /** GRID LIST */
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="
        
        grid grid-cols-1 sm:grid-cols-2
        gap-y-4 gap-x-2
        justify-between
        mt-6 mb-6 
      "
    >
      {jobs!.map((job, index) => (
  <motion.div
    key={job._id || job.slug}
    variants={itemVariants}
    className={`
      
      ${index % 2 === 0 ? "pl-64" : "pr-64"}
    `}
  >
    <JobCard
      job={job}
      onJobSelect={onJobSelect}
      onApply={onApply}
    />
  </motion.div>
))}

    </motion.div>
  )
  
}
