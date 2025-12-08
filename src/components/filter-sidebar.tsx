"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "../components/ui/slider"
import { Checkbox } from "../components/ui/checkbox"
import { Input } from "../components/ui/input"
import { X, Filter, Sparkles, ChevronDown } from "lucide-react"

export interface Filters {
  searchTerm: string
  location: string
  experience: string
  salaryRange: [number, number]
  jobTypes: string[]
  skills: string[]
}

type CollapsibleSection = "experience" | "salary" | "jobType" | "skills"

interface FilterSidebarProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
  onReset: () => void
}

export function FilterSidebar({ filters, onFilterChange, onReset }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<CollapsibleSection, boolean>>({
    experience: true,
    salary: true,
    jobType: true,
    skills: true,
  })

  const availableSkills = ["React", "TypeScript", "Node.js", "Python", "UI/UX", "DevOps", "SQL", "GraphQL"]
  const jobTypes = ["Full-time", "Remote", "Contract", "Part-time"]
  const experienceLevels = ["Internship", "Junior", "Mid-level", "Senior", "Lead"]

  const toggleSection = (key: CollapsibleSection) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill]
    onFilterChange({ ...filters, skills: newSkills })
  }

  const handleJobTypeToggle = (type: string) => {
    const newTypes = filters.jobTypes.includes(type)
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type]
    onFilterChange({ ...filters, jobTypes: newTypes })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full overflow-y-auto sticky top-0"
    >
      <div className="p-6 space-y-6 bg-white/95 backdrop-blur-lg h-full">
        {/* Header with gradient */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-400 rounded-xl text-white shadow-sm">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Filters</h2>
            <p className="text-sm text-slate-500">Refine your search</p>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="text-base font-medium text-slate-700">Job Title / Keywords</label>
          <div className="relative">
            <Input
              placeholder="Search jobs..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
              className="bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-primary/20"
            />
            <Sparkles className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-base font-medium text-slate-700">Location</label>
          <Input
            placeholder="e.g., San Francisco"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-primary focus:ring-primary/20"
          />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => toggleSection("experience")}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-base font-medium text-slate-700 flex items-center gap-2">
              Experience Level
              <span className="text-xs px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-blue-600">
                {filters.experience ? "1" : "All"}
              </span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                openSections.experience ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {openSections.experience && (
            <div className="space-y-2 mt-1">
              {experienceLevels.map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.experience === level}
                    onCheckedChange={() =>
                      onFilterChange({ ...filters, experience: filters.experience === level ? "" : level })
                    }
                    className="border-slate-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-sky-500"
                  />
                  <span className="text-base text-slate-600 group-hover:text-slate-900 transition-colors">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => toggleSection("salary")}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-base font-medium text-slate-700">Salary Range</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                openSections.salary ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {openSections.salary && (
            <div className="space-y-3 mt-1 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Slider
                value={filters.salaryRange}
                onValueChange={(value) => onFilterChange({ ...filters, salaryRange: [value[0], value[1]] })}
                min={0}
                max={300}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Min</p>
                  <p className="text-lg font-semibold text-slate-900">${filters.salaryRange[0]}k</p>
                </div>
                <div className="text-slate-400">→</div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Max</p>
                  <p className="text-lg font-semibold text-slate-900">${filters.salaryRange[1]}k</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => toggleSection("jobType")}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-base font-medium text-slate-700 flex items-center gap-2">
              Job Type
              {filters.jobTypes.length > 0 && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-blue-600">
                  {filters.jobTypes.length}
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                openSections.jobType ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {openSections.jobType && (
            <div className="space-y-2 mt-1">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={filters.jobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeToggle(type)}
                    className="border-slate-300 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-sky-500"
                  />
                  <span className="text-base text-slate-600 group-hover:text-slate-900 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => toggleSection("skills")}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="text-base font-medium text-slate-700 flex items-center gap-2">
              Required Skills
              {filters.skills.length > 0 && (
                <span className="text-xs px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-full text-blue-600">
                  {filters.skills.length}
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform ${
                openSections.skills ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
          {openSections.skills && (
            <div className="flex flex-wrap gap-2 mt-1">
              {availableSkills.map((skill) => (
                <motion.button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filters.skills.includes(skill)
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-100 text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform text-slate-500" />
          Reset Filters
        </motion.button>
      </div>
    </motion.div>
  )
}
