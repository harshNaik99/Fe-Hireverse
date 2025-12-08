import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Featured Jobs
export const fetchFeaturedJobs = async () => {
  const res = await axios.get(`${BASE_URL}/jobs/featured?limit=6`);
  return res.data.RESULT.featured || [];
};

// Search Suggest
export const fetchSearchSuggest = async (query: string) => {
  if (!query) return { suggestions: { titles: [], skills: [] } };

  const res = await axios.get(`${BASE_URL}/jobs/search/suggest?q=${query}`);
  return res.data.RESULT.suggestions;
};

export const fetchJobList = async (params: any = {}) => {
  const res = await axios.get(`${BASE_URL}/jobs`, {
    params: {
      page: params.page,
      limit: params.limit,
      q: params.query,
      location: params.location,
      skills: params.skills,
      jobType: params.jobType,
      workMode: params.workMode,
      applyType: params.applyType,
      experienceLevel: params.experienceLevel,
      sort: params.sort,
      minSalary: params.minSalary,
      maxSalary: params.maxSalary,
    }
  });

  const result = res.data.RESULT;

  return {
    page: result.page,
    limit: result.limit,
    total: result.total,
    pages: result.pages,
    jobs: result.results || [],
  };
};