import { type Job } from "../../../types/job.types";

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
