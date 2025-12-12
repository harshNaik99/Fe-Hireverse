"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink,
  Eye,
  User,
  Star,
  Timer,
  CheckCircle,
  Building2,
} from "lucide-react";

import { panelVariants, overlayVariants } from "./consts";
import type { JobDetailsPanelProps } from "./types";

export default function JobDetailsPanel({
  job,
  open,
  onClose,
}: JobDetailsPanelProps) {
  if (!job) return null;

  const postedDate = new Date(job.createdAt).toLocaleDateString();
  const expiryDate = new Date(job.expiryDate).toLocaleDateString();
  const salaryText = `${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} ${job.salaryCurrency.toUpperCase()}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[98]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.div
            className="
              fixed top-0 right-0 h-full w-[50vw]
              bg-white shadow-2xl z-[99]
              border-l border-gray-200
              flex flex-col
            "
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* HEADER (non‑scrolling) */}
            <div className="px-8 py-7 bg-gradient-to-br from-blue-50 via-white to-blue-100 border-b border-gray-200">
              <div className="flex items-start justify-between">
                {/* Title Section */}
                <div className="flex-1">
                  <motion.h2
                    className="text-[28px] font-bold text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {job.title}
                  </motion.h2>

                  <motion.div
                    className="flex items-center gap-2 mt-2 text-blue-700"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-[15px] font-medium">
                      {job.companyName}
                    </span>
                  </motion.div>
                </div>

                {/* CLOSE BUTTON */}
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-all"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <X className="w-6 h-6 text-gray-800" />
                </motion.button>
              </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10">
              {/* GRID */}
              <section className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-blue-600" />,
                    label: "Location",
                    value: job.location,
                  },
                  {
                    icon: <Briefcase className="w-5 h-5 text-indigo-600" />,
                    label: "Type",
                    value: `${job.jobType.toUpperCase()} • ${job.workMode.toUpperCase()}`,
                  },
                  {
                    icon: <Timer className="w-5 h-5 text-orange-600" />,
                    label: "Experience",
                    value: `${job.experienceLevel} years`,
                  },
                  {
                    icon: <Calendar className="w-5 h-5 text-green-600" />,
                    label: "Posted",
                    value: postedDate,
                  },
                  {
                    icon: <Calendar className="w-5 h-5 text-red-600" />,
                    label: "Expires",
                    value: expiryDate,
                  },
                  {
                    icon: <User className="w-5 h-5 text-gray-700" />,
                    label: "Posted By",
                    value: job.postedBy?.name ?? "Unknown",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-cyan-600" />,
                    label: "Views",
                    value: job.totalViews,
                  },
                  {
                    icon: <Star className="w-5 h-5 text-amber-600" />,
                    label: "Applications",
                    value: job.totalApplications,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>

              {/* SALARY */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Salary Range
                </h3>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 border border-blue-300 shadow-sm">
                  <p className="text-2xl font-bold text-blue-900">
                    {salaryText}
                  </p>
                  <p className="text-sm text-blue-800 mt-1">
                    Annual compensation
                  </p>
                </div>
              </section>

              {/* DESCRIPTION */}
              <section className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </section>

              {/* RESPONSIBILITIES */}
              {job.responsibilities?.length > 0 && (
                <section className="p-6 rounded-xl bg-blue-50 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Responsibilities
                  </h3>

                  <ul className="space-y-3">
                    {job.responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-800 text-base"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* REQUIREMENTS */}
              {job.requirements?.length > 0 && (
                <section className="p-6 rounded-xl bg-indigo-50 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Requirements
                  </h3>

                  <ul className="space-y-3">
                    {job.requirements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-800 text-base"
                      >
                        <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* SKILLS */}
              {job.skills?.length > 0 && (
                <section className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Required Skills
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-blue-100 border border-blue-300 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* APPLY BUTTON (scrolls with content) */}
              <section className="pt-4 pb-6 bg-white border-t border-gray-200">
                {job.applyType === "external" ? (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full block text-center bg-black text-white py-4
                      rounded-xl font-semibold text-lg shadow-md
                      hover:bg-blue-700 transition
                    "
                  >
                    Apply on Company Site
                    <ExternalLink className="inline-block ml-2 w-5 h-5" />
                  </a>
                ) : (
                  <button
                    className="
                      w-full bg-blue-600 text-white py-4 rounded-xl
                      font-semibold text-lg shadow-md
                      hover:bg-blue-700 transition
                    "
                  >
                    Apply Now
                  </button>
                )}
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
