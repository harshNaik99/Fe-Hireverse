import type { Job } from "../../../home/components/jobCardFeatured/types";

export interface JobListGridProps {
  jobs?: Job[] | undefined;
  isLoading?: boolean;
  onJobSelect?: (job: Job) => void;
  onApply?: (job: Job) => void;
}

export interface UseJobListGridResult {
  hasJobs: boolean;
  shimmerCount: number;
  emptyHeader: string;
  emptyMessage: string;
}
