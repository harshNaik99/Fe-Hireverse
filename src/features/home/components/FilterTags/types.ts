import type { JOB_TYPE_TAGS, SKILL_TAGS, WORK_MODE_TAGS } from "./consts"

export type WorkModeTag = typeof WORK_MODE_TAGS[number]
export type JobTypeTag = typeof JOB_TYPE_TAGS[number]
export type SkillTag = typeof SKILL_TAGS[number]

export type FilterTag = WorkModeTag | JobTypeTag | SkillTag

export interface UseFilterTagsResult {
  workModeTags: readonly WorkModeTag[]
  jobTypeTags: readonly JobTypeTag[]
  skillTags: readonly SkillTag[]
}
