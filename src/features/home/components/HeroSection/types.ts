import { type Job } from "../../../../types/job.types";
import type { FormEvent } from "react";

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface SuggestResponse {
  success: boolean;
  titles: string[];
  skills: string[];
}

export interface FeaturedJobsResponse {
  success: boolean;
  featured: Job[];
}

// ==========================================
// COMPONENT STATE & PROPS
// ==========================================

export interface HeroSectionState {
  query: string;
  location: string;
  isVisible: boolean;
  showSuggest: boolean;
}

export interface SearchParams {
  query?: string;
  location?: string;
}

// ==========================================
// HOOK RETURN TYPES
// ==========================================

export interface UseHeroSectionReturn {
  // Search State
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;

  // Location State
  location: string;
  setLocation: (value: string) => void;

  // UI Visibility State
  isVisible: boolean;
  showSuggest: boolean;
  setShowSuggest: (value: boolean) => void;

  // Event Handlers
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}

// ==========================================
// SHARED ENTITY TYPES
// (Only keep these if used in Hero components, otherwise move to global types)
// ==========================================

export interface CompanyDetails {
  _id: string;
  name: string;
  logo?: string;
  website?: string;
  industry?: string;
}

export interface PostedByUser {
  _id: string;
  name: string;
  email: string;
  userType: "hr" | "candidate" | "admin";
}
