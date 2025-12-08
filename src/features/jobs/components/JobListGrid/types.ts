import type { Job } from "../../../../components/ui/jobCardFeatured/types"; // or your local type

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
