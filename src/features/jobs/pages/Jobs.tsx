"use client"

import { useEffect } from "react"
import { useSearch, useLocation } from "@tanstack/react-router"
import { useJobList } from "../hooks/useJobList"
import JobListGrid from "../components/JobListGrid/JobListGrid"

export default function JobsPage() {
  // ⭐ GET validated search params from route
  const search = useSearch({ from: "/jobs/" })

  // ⭐ we use location search to detect changes
  const location = useLocation()

  // ⭐ SCROLL TO TOP WHENEVER FILTER / PAGE CHANGES
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.search])

  // ⭐ CALL BE with ALL FILTERS
  const { jobs, isLoading } = useJobList({
    page: search.page,
    limit: search.limit,
    query: search.query,              // TEXT SEARCH
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

  return (
    <JobListGrid
      jobs={jobs}
      isLoading={isLoading}
    />
  )
}
