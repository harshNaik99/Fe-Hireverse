import { Link } from "@tanstack/react-router"
import { useFilterTags } from "./useFilterTags"

export default function FilterTags() {
  const { workModeTags, jobTypeTags, skillTags } = useFilterTags();

  return (
    <div className="max-w-7xl mx-auto mb-10 space-y-6 -mt-8">

      {/* WORK MODE */}
      <div className="flex flex-wrap gap-2 justify-center">
        {workModeTags.map(tag => (
          <Link
            key={tag}
            to="/jobs"
            search={{ workMode: tag.toLowerCase(), page: 1 }}
            className="px-4 py-2 rounded-full bg-white/10 text-white"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* JOB TYPE */}
      <div className="flex flex-wrap gap-2 justify-center">
        {jobTypeTags.map(tag => (
          <Link
            key={tag}
            to="/jobs"
            search={{ jobType: tag.toLowerCase(), page: 1 }}
            className="px-4 py-2 rounded-full bg-white/10 text-white"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* SKILLS */}
      <div className="flex flex-wrap gap-2 justify-center">
        {skillTags.map(tag => (
          <Link
            key={tag}
            to="/jobs"
            search={{ skills: tag.toLowerCase(), page: 1 }}
            className="px-4 py-2 rounded-full bg-white/10 text-white"
          >
            {tag}
          </Link>
        ))}
      </div>

    </div>
  )
}
