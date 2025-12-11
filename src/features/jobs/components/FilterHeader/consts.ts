export const WORK_MODE_TAGS = [
  "ONSITE",
  "REMOTE",
  "HYBRID",
  "WORK FROM HOME",
  "FIELD WORK"
] as const

export const JOB_TYPE_TAGS = [
  "FULL_TIME",
  "PART_TIME",
  "FREELANCE",
  "TEMPORARY",
  "CONTRACT",
  "INTERNSHIP"
] as const

export const SKILL_TAGS = [
  "REACT",
  "JAVA",
  "NODE",
] as const

export const FILTER_TAG_STYLES = `
  inline-flex items-center
  px-3 py-[6px]
  rounded-md 
  text-xs font-medium
  bg-gray-50
  text-gray-700 
  border border-gray-300
  shadow-sm
  hover:bg-gray-100 
  hover:shadow-md
  transition-all duration-200
  whitespace-nowrap
  cursor-pointer
`
export const ACTIVE_FILTER_STYLES = `
  inline-flex items-center
  px-3 py-[6px]
  rounded-md
  text-xs font-medium
  bg-blue-50
  text-blue-800 
  border border-blue-300
  shadow-sm
  hover:bg-blue-100
  hover:shadow-md
  transition-all duration-200
  whitespace-nowrap
  cursor-pointer
`
