// ---------- HERO SECTION CORE STATE ----------
export interface HeroSectionState {
  query: string;
  location: string;
  isVisible: boolean;
  isPanelOpen: boolean;
  showSuggest: boolean;
}

// ---------- SEARCH PARAMS ----------
export interface SearchParams {
  query?: string;
  location?: string;
}

// ---------- SUGGEST API RESPONSE ----------
export interface SuggestResponse {
  success: boolean;
  titles: string[];
  skills: string[];
}

// ---------- FEATURED JOB API RESPONSE ----------
export interface FeaturedJobsResponse {
  success: boolean;
  featured: Job[];
}

// ---------- JOB DETAILS (FULL MODEL) ----------
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

// ---------- COMPANY DETAILS ----------
export interface CompanyDetails {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  industry?: string;
}

// ---------- POSTED BY USER ----------
export interface PostedByUser {
  _id: string;
  name: string;
  email: string;
  userType: "hr" | "candidate" | "admin";
}

// ---------- JOB SELECT HANDLER ----------
export type JobSelectHandler = (job: Job) => void;

// ---------- HOOK RETURN TYPE ----------
export interface UseHeroSectionReturn {
  query: string;
  setQuery: (v: string) => void;

  location: string;
  setLocation: (v: string) => void;

  isVisible: boolean;
  showSuggest: boolean;
  setShowSuggest: (v: boolean) => void;

  selectedJob?: Job | null;
  isPanelOpen: boolean;
  setIsPanelOpen: (v: boolean) => void;

  debouncedQuery: string;

  handleSearch: (e: any) => void;
  handleJobSelect: JobSelectHandler;
}
