"use client"

import type { Job } from "../../../home/components/jobCardFeatured/types";
import type { UseJobListGridResult } from "./types"
import {
  SHIMMER_COUNT,
  EMPTY_HEADER,
  EMPTY_MESSAGE,
} from "./consts"

export default function useJobListGrid(
  jobs: Job[] | undefined,
  isLoading?: boolean
): UseJobListGridResult {
  const hasJobs = !isLoading && Array.isArray(jobs) && jobs.length > 0

  return {
    hasJobs,
    shimmerCount: SHIMMER_COUNT,
    emptyHeader: EMPTY_HEADER,
    emptyMessage: EMPTY_MESSAGE,
  }
}
