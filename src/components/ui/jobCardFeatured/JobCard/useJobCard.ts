"use client"

import React from "react"
import type { Job, UseJobCardResult } from "./types"
import { BRAND_COLORS, DATE_LABEL_RECENT, DATE_LABEL_TODAY, DATE_LABEL_YESTERDAY, DEFAULT_JOB_TYPE, DEFAULT_WORK_MODE, NO_SALARY_TEXT, PLACEHOLDER_LOGO, UNKNOWN_COMPANY } from "./consts"

// --- Helper: initials ---
export const getCompanyInitials = (companyName: string): string => {
  if (!companyName) return "?"
  const words = companyName.trim().split(/\s+/)

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  return words[0].substring(0, 2).toUpperCase()
}

// --- Helper: time ago ---
export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return DATE_LABEL_RECENT

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return DATE_LABEL_TODAY
  if (diffDays === 1) return DATE_LABEL_YESTERDAY
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
  return `${Math.floor(diffDays / 365)}y ago`
}

// --- Helper: brand color ---
export const getRandomBrandColor = (companyName: string): string => {

  let hash = 0
  for (let i = 0; i < companyName.length; i++) {
    hash = ((hash << 5) - hash) + companyName.charCodeAt(i)
    hash = hash & hash
  }

  return BRAND_COLORS[Math.abs(hash) % BRAND_COLORS.length]
}

// ===============================
// 🔥 MAIN HOOK
// ===============================
export function useJobCard(job: Job) : UseJobCardResult {
  const companyName =
    job.companyName ||
    job.companyId?.name ||
    job.company ||
    job.postedBy?.name ||
    UNKNOWN_COMPANY

  const brand = React.useMemo(() => {
    if (job.brandColor) return job.brandColor
    return getRandomBrandColor(companyName)
  }, [companyName, job.brandColor])

  const hasLogo = !!(job.logo && job.logo !== PLACEHOLDER_LOGO)
  const initials = getCompanyInitials(companyName)

  const salaryText = job.minSalary && job.maxSalary
    ? `${job.salaryCurrency || "INR"} ${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()}`
    : NO_SALARY_TEXT

  const typeText = job.jobType?.replace("_", "-") || job.type || DEFAULT_JOB_TYPE

  const locationText = job.location || job.workMode || DEFAULT_WORK_MODE
  const postedTime = formatTimeAgo(
    job.createdAt instanceof Date
      ? job.createdAt.toISOString()
      : job.createdAt ?? ""
  )
  

  return {
    companyName,
    brand,
    initials,
    hasLogo,
    salaryText,
    typeText,
    locationText,
    postedTime,
  }
}
