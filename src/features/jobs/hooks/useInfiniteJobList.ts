"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchJobList } from "../../../api/jobs.api"

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


export function useInfiniteJobList(params?: JobListParams) {
  // ⭐ NORMALIZED FILTERS WITHOUT PAGE/limit
  const filterParams = {
    query: params?.query?.toLowerCase(),
    location: params?.location?.toLowerCase(),
    skills: params?.skills?.toLowerCase(),
    jobType: params?.jobType?.toLowerCase(),
    workMode: params?.workMode?.toLowerCase(),
    companyId: params?.companyId?.toLowerCase(),
    applyType: params?.applyType?.toLowerCase(),
    experienceLevel: params?.experienceLevel?.toLowerCase(),
    sort: params?.sort,
    minSalary: params?.minSalary,
    maxSalary: params?.maxSalary,
  }

  return useInfiniteQuery({
    // ⭐ SAFE QUERY KEY — NO PAGE INFO INSIDE
    queryKey: ["job-list-infinite", filterParams],

    initialPageParam: 1,

    queryFn: async ({ pageParam }) => {
      const data = await fetchJobList({
        ...filterParams,
        page: pageParam,
        limit: 10,
      })

      return {
        results : data.jobs,
        page: pageParam,
        pages: data.pages,
      }
    },

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages
        ? lastPage.page + 1
        : undefined,

    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  })
}
