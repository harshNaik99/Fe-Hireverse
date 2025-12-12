import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useNavigate } from "@tanstack/react-router";

// Config & Types
import { JOBS_PAGE_URL, DEBOUNCE_MS } from "./const";
import type { UseHeroSectionReturn } from "./types";

export function useHeroSection(): UseHeroSectionReturn {
  const navigate = useNavigate();

  // State
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  
  // Debounce Search Query
  const [debouncedQuery] = useDebounce(query, DEBOUNCE_MS);

  // Trigger Fade-in Animation on Mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side navigation (No page reload)
    navigate({
      to: JOBS_PAGE_URL,
      search: {
        // Only include params if they exist
        query: query || undefined,
        location: location || undefined,
        page: 1, // Reset to page 1 for new searches
      },
    });
  };

  return {
    query,
    setQuery,
    location,
    setLocation,
    debouncedQuery,
    isVisible,
    showSuggest,
    setShowSuggest,
    handleSearch,
  };
}
