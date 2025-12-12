// ==========================================
// HERO SECTION CONSTANTS
// ==========================================

// ---------- SEARCH & SUGGEST CONFIG ----------
export const MIN_SUGGEST_QUERY_LENGTH = 2;
export const MAX_SUGGEST_ITEMS = 5;
export const DEBOUNCE_MS = 400;

// ---------- HERO TEXT CONTENT ----------
export const HERO_TAGLINE = "India's Fastest Growing Job Platform";
export const HERO_SUBTITLE =
  "Connecting Employers, HR Freelancers and Candidates — All in one powerful platform. Discover thousands of job opportunities across India.";

export const HERO_STATS = {
  JOBS: "50,000+ Active Jobs",
  COMPANIES: "10,000+ Companies",
  SUCCESS: "98% Success Rate",
} as const; // 'as const' makes this read-only

// ---------- ROUTING ----------
export const JOBS_PAGE_URL = "/jobs";

// ---------- DOM IDS (For Accessibility/Focus) ----------
export const INPUT_IDS = {
  QUERY: "job-search-query",
  LOCATION: "job-search-location",
} as const;
