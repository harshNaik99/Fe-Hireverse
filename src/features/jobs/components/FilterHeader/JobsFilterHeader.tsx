"use client"

import { Link, useSearch } from "@tanstack/react-router"
import { FILTER_TAG_STYLES, ACTIVE_FILTER_STYLES } from "./consts"

import {
  WORK_MODE_TAGS,
  JOB_TYPE_TAGS,
  SKILL_TAGS,
} from "./consts"

export default function JobsFilterHeader() {
  const search = useSearch({ from: "/jobs/" })

  const GROUPS = [
    { tags: WORK_MODE_TAGS as readonly string[], key: "workMode" },
    { tags: JOB_TYPE_TAGS as readonly string[], key: "jobType" },
    { tags: SKILL_TAGS as readonly string[], key: "skills" },
  ]

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-[80px] z-40">
      <div className="max-w-7xl mx-auto px-6 py-3">

        <div className="flex items-center flex-wrap justify-center gap-4">

          {/* ================== GROUPS ================== */}
          {GROUPS.map((group, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-2 flex-wrap">

              {group.tags.map((tag) => {
                const active =
                  String((search as any)?.[group.key] ?? "").toLowerCase() ===
                  tag.toLowerCase()

                /** ⭐ Correct toggle logic:
                 *    If active → remove filter
                 *    If inactive → apply filter
                 */
                const newSearch = active
                  ? { ...search, [group.key]: undefined, page: 1 }
                  : { ...search, [group.key]: tag.toLowerCase(), page: 1 }

                return (
                  <Link
                    key={tag}
                    to="/jobs"
                    search={newSearch}
                    className={active ? ACTIVE_FILTER_STYLES : FILTER_TAG_STYLES}
                  >
                    {tag}
                  </Link>
                )
              })}

              {/* DIVIDER (between groups, not last) */}
              {groupIndex < GROUPS.length - 1 && (
                <div className="text-gray-300 font-medium px-1">|</div>
              )}
            </div>
          ))}

          
        </div>

      </div>
    </div>
  )
}
