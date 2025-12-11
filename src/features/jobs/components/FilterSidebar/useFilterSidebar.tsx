// src/features/jobs/components/FilterSidebar/useFilterSidebar.ts
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useNavigate, useSearch } from "@tanstack/react-router"
import type { FilterForm } from "./types"

const DEFAULT_FILTERS: FilterForm = {
  query: "",
  location: "",
  experienceLevel: "any",
  applyType: "any",
  sort: "recent",
  minSalary: 0,
  maxSalary: 50,
  skills: [],
}


export function useFilterSidebar() {
  const search = useSearch({ from: "/jobs/" })
  const navigate = useNavigate()
  const isInitialMount = useRef(true);


  // Parse URL params into form state
  const initialForm: FilterForm = {
    query: search.query ?? DEFAULT_FILTERS.query,
    location: search.location ?? DEFAULT_FILTERS.location,
    experienceLevel: search.experienceLevel ?? DEFAULT_FILTERS.experienceLevel,
    applyType: search.applyType ?? DEFAULT_FILTERS.applyType,
    sort: search.sort ?? DEFAULT_FILTERS.sort,
    minSalary:
  typeof search.minSalary === "number"
    ? search.minSalary /100000
    : DEFAULT_FILTERS.minSalary,

maxSalary:
  typeof search.maxSalary === "number"
    ? search.maxSalary / 100000
    : DEFAULT_FILTERS.maxSalary,


    skills: search.skills ? search.skills.split(",").filter(Boolean) : DEFAULT_FILTERS.skills,
  }

  const [form, setForm] = useState<FilterForm>(initialForm)

  // Debounced URL sync to avoid excessive navigation
  useEffect(() => {
    // Skip sync on initial mount to avoid duplicate navigation
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      const searchParams: Record<string, any> = {
        page: 1,
      };
      
      if (form.query) searchParams.query = form.query;
      if (form.location) searchParams.location = form.location;
      
      if (form.experienceLevel !== DEFAULT_FILTERS.experienceLevel)
        searchParams.experienceLevel = form.experienceLevel;
      
      if (form.applyType !== DEFAULT_FILTERS.applyType)
        searchParams.applyType = form.applyType;
      
      if (form.sort !== DEFAULT_FILTERS.sort)
        searchParams.sort = form.sort;
      
      // ALWAYS send these – otherwise slider will never work
      searchParams.minSalary = form.minSalary * 100000;
      searchParams.maxSalary = form.maxSalary * 100000;
      
      
      if (form.skills.length > 0)
        searchParams.skills = form.skills.join(",");
      

      

      navigate({
        to: "/jobs",
        search: searchParams,
        replace: true,
      })
    }, 300) // 300ms debounce for text inputs

    return () => clearTimeout(timeoutId)
  }, [form, navigate])

  // Memoized update handlers
  const handleInputChange = useCallback((key: keyof FilterForm, value: any) => {
    setForm((prev) => {
      // Skip update if value hasn't changed
      if (prev[key] === value) return prev
      return { ...prev, [key]: value }
    })
  }, [])


// -------------------- SALARY HANDLER (SMOOTH + CORRECT) --------------------
const handleSalaryChange = useCallback(
  ([min, max]: number[], commit: boolean) => {
    // always update UI smoothly
    setForm((prev) => ({ ...prev, minSalary: min, maxSalary: max }));

    // if user is still dragging slider → do NOT update URL
    if (!commit) return;

    // user released thumb → update URL
    navigate({
      to: "/jobs",
      replace: true,
      search: (prev) => ({
        ...prev,
        page: 1,
        minSalary: min * 100000, // convert LPA → rupees
        maxSalary: max * 100000,
      }),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  [navigate]
);



  const toggleSkill = useCallback((skill: string) => {
    const normalized = skill.trim().toLowerCase()
    if (!normalized) return

    setForm((prev) => {
      const exists = prev.skills.includes(normalized)
      return {
        ...prev,
        skills: exists
          ? prev.skills.filter((s) => s !== normalized)
          : [...prev.skills, normalized],
      }
    })
  }, [])

  const resetFilters = useCallback(() => {
    setForm(DEFAULT_FILTERS)
  }, [])

  // Computed value: check if any filters are active
  const hasActiveFilters = 
    form.query !== DEFAULT_FILTERS.query ||
    form.location !== DEFAULT_FILTERS.location ||
    form.experienceLevel !== DEFAULT_FILTERS.experienceLevel ||
    form.applyType !== DEFAULT_FILTERS.applyType ||
    form.sort !== DEFAULT_FILTERS.sort ||
    form.minSalary !== DEFAULT_FILTERS.minSalary ||
    form.maxSalary !== DEFAULT_FILTERS.maxSalary ||
    form.skills.length > 0

  return {
    form,
    hasActiveFilters,
    handleInputChange,
    handleSalaryChange,
    toggleSkill,
    resetFilters,
  }
}