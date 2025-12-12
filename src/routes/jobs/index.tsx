// routes/jobs/index.tsx
import { createFileRoute } from "@tanstack/react-router"

// ❌ Removed the import of Jobs

export const Route = createFileRoute("/jobs/")({
  // ❌ Removed 'component' property

  validateSearch: (search) => {
    return {
      page: search.page ? Number(search.page) : undefined,
      limit: search.limit ? Number(search.limit) : undefined,
      query: typeof search.query === "string" ? search.query : undefined,
      location: typeof search.location === "string" ? search.location : undefined,
      jobType: typeof search.jobType === "string" ? search.jobType : undefined,
      workMode: typeof search.workMode === "string" ? search.workMode : undefined,
      skills: typeof search.skills === "string" ? search.skills : undefined,
      applyType: typeof search.applyType === "string" ? search.applyType : undefined,
      experienceLevel: typeof search.experienceLevel === "string" ? search.experienceLevel : undefined,
      sort: typeof search.sort === "string" ? search.sort : undefined,
      minSalary: typeof search.minSalary === "string" ? Number(search.minSalary) : typeof search.minSalary === "number" ? search.minSalary : undefined,
      maxSalary: typeof search.maxSalary === "string" ? Number(search.maxSalary) : typeof search.maxSalary === "number" ? search.maxSalary : undefined,
    } as {
      page?: number
      limit?: number
      query?: string
      location?: string
      jobType?: string
      workMode?: string
      skills?: string
      applyType? :string
      experienceLevel? : string
      sort? : string
      minSalary? : number
      maxSalary?: number
    }
  }
})
