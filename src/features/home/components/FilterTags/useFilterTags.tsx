import {
  WORK_MODE_TAGS,
  JOB_TYPE_TAGS,
  SKILL_TAGS
} from "./consts"
import type { UseFilterTagsResult } from "./types"

export function useFilterTags(): UseFilterTagsResult {
  return {
    workModeTags: WORK_MODE_TAGS,
    jobTypeTags: JOB_TYPE_TAGS,
    skillTags: SKILL_TAGS
  }
}
