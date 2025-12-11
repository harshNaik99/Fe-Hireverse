// src/features/jobs/components/FilterSidebar/consts.ts

export const EXPERIENCE_OPTIONS = [
    { label: "Any", value: "any" },
    { label: "Fresher", value: "fresher" },
    { label: "1–3 Years", value: "1-3" },
    { label: "3–6 Years", value: "3-6" },
    { label: "Senior", value: "senior" },
  ] as const;
  
  export const APPLY_TYPE_OPTIONS = [
    { label: "Any", value: "any" },
    { label: "Direct Apply", value: "direct" },
    { label: "External Apply", value: "external" },
  ] as const;
  
  export const SORT_OPTIONS = [
    { label: "Most Recent", value: "recent" },
    { label: "Highest Salary", value: "salary" },
    { label: "Title A-Z", value: "title" },
  ] as const;
  
  // same 3 header filters
  export const WORK_MODE_TAGS = [
    "onsite",
    "remote",
    "hybrid",
    "work from home",
    "field work"
  ] as const;
  
  export const JOB_TYPE_TAGS = [
    "full_time",
    "part_time",
    "freelance",
    "temporary",
    "contract",
    "internship"
  ] as const;
  
  export const SKILL_TAGS = ["react", "java", "node", "mongo", "ux"] as const;
  
  // UI classes
  export const FILTER_CARD_CLASSES =
    "shadow-sm border rounded-2xl p-5 bg-white space-y-6";
  
  export const FILTER_SECTION_TITLE_CLASSES =
    "text-sm font-semibold text-gray-900 -mt-1 mb-1";
  
  export const FILTER_LABEL_CLASSES =
    "text-xs font-medium text-gray-600 mb-1 ";
  
  export const FILTER_HELPER_TEXT_CLASSES =
    "text-[11px] text-gray-500";
  
  export const FILTER_SKILL_TAG_ACTIVE =
    "px-2.5 py-1 text-xs rounded-full bg-black text-white cursor-pointer";
  
  export const FILTER_SKILL_TAG_INACTIVE =
    "px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer";
  