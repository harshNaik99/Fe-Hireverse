import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedJobs } from "../../../api/jobs.api";

export const useFeaturedJobs = () =>
  useQuery({
    queryKey: ["featured-jobs"],
    queryFn: fetchFeaturedJobs,
    staleTime: 1000 * 60 * 15, // 15 minutes caching
    retry: 1,
  });
