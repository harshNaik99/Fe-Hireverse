// types.ts

export interface Job {
  _id: string
  title: string
  description: string

  responsibilities?: string[]
  requirements?: string[]
  skills?: string[]

  company?: string
  experienceLevel?: string

  jobType?: "FULL_TIME" | "PART_TIME" | "REMOTE" | "HYBRID" | "INTERNSHIP"

  location?: string
  workMode?: "ONSITE" | "REMOTE" | "HYBRID"

  minSalary?: number
  maxSalary?: number
  salaryCurrency?: string

  type? :string
  applyType?: "internal" | "external"
  applyUrl?: string | null

  companyId?: {
    name?: string
    logo?: string
    website?: string
    industry?: string
  } | null

  companyName?: string | null
  logo?: string | null

  postedBy?: {
    name?: string
    email?: string
    userType?: string
  } | null

  isActive?: boolean
  isApproved?: boolean
  isFeatured?: boolean

  expiryDate?: string | Date | null

  totalViews?: number
  totalApplications?: number

  createdAt?: string | Date
  updatedAt?: string | Date

  slug?: string
  brandColor?: string
}

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
