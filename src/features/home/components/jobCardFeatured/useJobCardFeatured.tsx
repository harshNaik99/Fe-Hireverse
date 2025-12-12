// useJobCardFeatured.ts
"use client"

import type {  UseJobCardFeaturedResult } from "./types"
import { type Job } from "../../../../types/job.types"
import {
  FEATURED_GRID_COLS,
  SHIMMER_COUNT,
  EMPTY_HEADER,
  EMPTY_MESSAGE
} from "./consts"


export default function useJobCardFeatured(
  jobs: Job[] | undefined,
  isLoading?: boolean
): UseJobCardFeaturedResult {
  const hasJobs = !isLoading && Array.isArray(jobs) && jobs.length > 0

  return {
    hasJobs,
    shimmerCount: SHIMMER_COUNT,
    emptyHeader: EMPTY_HEADER,
    emptyMessage: EMPTY_MESSAGE,
    gridCols: FEATURED_GRID_COLS,
  }
}
