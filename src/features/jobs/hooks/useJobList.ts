"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchJobList } from "../../../api/jobs.api"
import type { Job } from "../../home/components/jobCardFeatured/types"

export type JobListParams = {
  page?: number
  limit?: number
  query?: string
  location?: string
  skills?: string
  jobType?: string
  workMode?: string
  companyId?: string
  applyType?: string
  experienceLevel?: string
  sort?: string
  minSalary? : number
  maxSalary? : number
}

export function useJobList(params?: JobListParams) {
  // ⭐ NORMALIZE ALL STRING FILTERS TO LOWERCASE (CRITICAL!)
  const normalizedParams: JobListParams = {
    ...params,
    query: params?.query?.toLowerCase(),
    location: params?.location?.toLowerCase(),
    skills: params?.skills?.toLowerCase(),
    jobType: params?.jobType?.toLowerCase(),
    workMode: params?.workMode?.toLowerCase(),
    companyId: params?.companyId?.toLowerCase(),
    applyType: params?.applyType?.toLowerCase(),
    experienceLevel: params?.experienceLevel?.toLowerCase(),
    sort: params?.sort, // sorting is OK as-is
    minSalary: params?.minSalary,
    maxSalary: params?.maxSalary,
  }

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["job-list", normalizedParams], // ⭐ Will refetch when filters change
    queryFn: () => fetchJobList(normalizedParams),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  })

  return {
    jobs: data?.jobs as Job[] | undefined,
    total: data?.total,
    pages: data?.pages,
    page: data?.page,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  }
}