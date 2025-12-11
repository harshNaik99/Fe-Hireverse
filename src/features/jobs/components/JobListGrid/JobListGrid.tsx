"use client";

import { motion } from "framer-motion";
import JobCard from "../../../home/components/jobCardFeatured/JobCard/JobCard";
import { Briefcase } from "lucide-react";
import useJobListGrid from "./useJobListGrid"
import type { JobListGridProps } from "./types";
import { containerVariants, itemVariants } from "./consts";
import { JobCardSkeleton } from "../../../home/components/jobCardFeatured/JobCardSkeleton/JobCardSkeleton";

export default function JobListGrid({
  jobs,
  isLoading,
  onJobSelect,
  onApply,
}: JobListGridProps) {
  const {
    hasJobs,
    emptyHeader,
    emptyMessage,
  } = useJobListGrid(jobs, isLoading);

  /** LOADING */
  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full space-y-6"
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="w-full"
          >
            <JobCardSkeleton />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  /** EMPTY */
  if (!hasJobs) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center px-4">
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
      className="w-full space-y-6 max-w-2xl"
    >
      {jobs!.filter(Boolean).map((job) => (
        <motion.div
          key={job._id || job.slug}
          variants={itemVariants}
          className="w-full"
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
