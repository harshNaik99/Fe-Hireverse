import type { Job } from "../../../../types/job.types";

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
