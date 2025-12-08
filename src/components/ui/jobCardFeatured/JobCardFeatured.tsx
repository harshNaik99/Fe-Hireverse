"use client"

import JobCard from "./JobCard/JobCard"
import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import type { JobGridVariantsProps } from "./types"
import useJobCardFeatured from "./useJobCardFeatured"
import { containerVariants, itemVariants } from "./consts"



export default function JobCardFeatured({
  jobs,
  onJobSelect,
  onApply,
  isLoading,
}: JobGridVariantsProps) {
  const {
    hasJobs,
    shimmerCount,
    emptyHeader,
    emptyMessage,
    gridCols,
  } = useJobCardFeatured(jobs, isLoading)

  /** ============= LOADING ============= **/
  if (isLoading) {
    return (
      <div className={gridCols}>
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
    )
  }

  /** ============= EMPTY ============= **/
  if (!hasJobs) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 shadow-lg">
          <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          {emptyHeader}
        </h3>
        <p className="text-muted-foreground max-w-md">{emptyMessage}</p>
      </div>
    )
  }

  /** ============= GRID ============= **/
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={gridCols}
    >
      {jobs!.map((job) => (
        <motion.div
          key={job._id || job.slug}
          variants={itemVariants}
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
