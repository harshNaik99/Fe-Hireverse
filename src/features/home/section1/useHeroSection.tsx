import { useState, useEffect } from "react";

import { useDebounce } from "use-debounce";
import type {  Job, JobSelectHandler, SearchParams, UseHeroSectionReturn } from "./types";

export function useHeroSection() : UseHeroSectionReturn {
  const [query, setQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [showSuggest, setShowSuggest] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce<string>(query, 400);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleJobSelect : JobSelectHandler = (job : Job) : void => {
    setSelectedJob(job);
    setIsPanelOpen(true);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const params: SearchParams = {};
    if (query) params.query = query;
    if (location) params.location = location;
  
    const qs = new URLSearchParams(
      params as Record<string, string>   
    );
  
    window.location.href = `/jobs?${qs.toString()}`;
  };

  
  return {
    setQuery,
    debouncedQuery,
    handleSearch,
    handleJobSelect,
    setLocation,
    isVisible,
    selectedJob,
    isPanelOpen,
    showSuggest,
    setShowSuggest,
    query,
    setIsPanelOpen,
    location
  }
}