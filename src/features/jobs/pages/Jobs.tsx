"use client"

import { useRef, useEffect } from "react"
import { useSearch } from "@tanstack/react-router"
import { useInfiniteJobList } from "../hooks/useInfiniteJobList"
import JobsFilterHeader from "../components/FilterHeader/JobsFilterHeader"
import FilterSidebar from "../components/FilterSidebar/FilterSidebar"
import JobListGrid from "../components/JobListGrid/JobListGrid"

export default function JobsPage() {
  const search = useSearch({ from: "/jobs/" })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  },[
    search.query,
    search.location,
    search.jobType,
    search.workMode,
    search.skills,
    search.applyType,
    search.experienceLevel,
    search.sort,
    search.minSalary,
    search.maxSalary
  ])

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteJobList({
    limit: search.limit ?? 10,
    query: search.query,
    location: search.location,
    jobType: search.jobType,
    workMode: search.workMode,
    skills: search.skills,
    applyType: search.applyType,
    experienceLevel: search.experienceLevel,
    sort: search.sort,
    minSalary: search.minSalary,
    maxSalary: search.maxSalary,
  })

  const jobs =
    data?.pages.flatMap((p: any) =>
      Array.isArray(p?.results) ? p.results : []
    ) ?? []

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bottomRef.current) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="min-h-screen bg-background">
      <JobsFilterHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-11 lg:pt-13 pb-12 sm:pb-16 lg:pb-20">
        {/* Mobile filter is now inside FilterSidebar component */}
        
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          
          {/* LEFT SIDEBAR – Fixed width, hidden on mobile */}
          <aside className="hidden md:block w-64 lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-60">
              <FilterSidebar />
            </div>
          </aside>

          {/* JOB LIST – Takes remaining space */}
          <main className="flex-1 min-w-0">
            <JobListGrid
              jobs={jobs}
              isLoading={isLoading && jobs.length === 0}
            />

            <div ref={bottomRef} className="h-2" />

            {hasNextPage && (
              <div className="flex justify-center py-6 sm:py-8">
                {isFetchingNextPage && (
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}