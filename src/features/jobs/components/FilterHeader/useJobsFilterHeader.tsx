import {
    WORK_MODE_TAGS,
    JOB_TYPE_TAGS,
    SKILL_TAGS
  } from "./consts"
  import type { UseJobsFilterHeader } from "./types"
  
  export function useJobsFilterHeader(): UseJobsFilterHeader {
    return {
      workModeTags: WORK_MODE_TAGS,
      jobTypeTags: JOB_TYPE_TAGS,
      skillTags: SKILL_TAGS
    }
  }
  