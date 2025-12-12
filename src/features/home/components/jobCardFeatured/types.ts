// types.ts

import { type Job } from "../../../../types/job.types";

export interface JobGridVariantsProps {
  jobs: Job[] | undefined;
  isLoading?: boolean;
  onJobSelect?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

export interface UseJobCardFeaturedResult {
  hasJobs: boolean;
  shimmerCount: number;
  emptyHeader: string;
  emptyMessage: string;
  gridCols: string;
   
}
