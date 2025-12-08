"use client"

import {  MapPin, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "../../card"
import { Badge } from "../../badge"
import { useJobCard } from "./useJobCard"
import type { Job } from "./types"
import { APPLY_NOW_TEXT, FEATURED_TEXT, VIEW_DETAILS_TEXT } from "./consts"

export default function JobCard({
  job,
  onJobSelect,
  onApply,
}: {
  job: Job
  onJobSelect?: (j: Job) => void
  onApply?: (j: Job) => void
}) {
  const {
    companyName,
    brand,
    initials,
    hasLogo,
    salaryText,
    typeText,
    locationText,
    postedTime,
  } = useJobCard(job)

  return (
    <div className="relative group  w-full !m-0 !p-0">
      {/* Aura background effect */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px 200px at 10% 20%, ${brand}18 0%, transparent 22%),
                       radial-gradient(400px 160px at 85% 80%, ${brand}12 0%, transparent 20%)`,
          filter: "blur(32px)",
        }}
      />

      <Card className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-border w-full !m-0">
        <CardHeader className="p-4 pb-3 -mt-6">
          <div className="flex items-start justify-between gap-4">
            {/* Logo + Company Info */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-105 overflow-hidden">
                {hasLogo ? (
                  <div className="w-full h-full bg-white rounded-xl p-2.5 flex items-center justify-center shadow-sm border border-gray-100">
                    <img
                      src={job.logo ?? undefined}
                      alt={`${companyName} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        const wrapper = target.parentElement
                        if (wrapper) {
                          wrapper.innerHTML = ''
                          const initialsDiv = document.createElement('div')
                          initialsDiv.className = 'w-full h-full rounded-xl flex items-center justify-center font-bold text-xl'
                          initialsDiv.style.background = `linear-gradient(135deg, ${brand}, ${brand}dd)`
                          initialsDiv.style.color = 'white'
                          initialsDiv.style.boxShadow = `0 8px 24px ${brand}40`
                          initialsDiv.textContent = initials
                          wrapper.appendChild(initialsDiv)
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl flex items-center justify-center font-bold text-xl"
                    style={{
                      background: `linear-gradient(135deg, ${brand}, ${brand}dd)`,
                      color: brand,
                      boxShadow: `0 8px 24px ${brand}40`,
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  {companyName}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-1.5 leading-tight line-clamp-2">
                  {job.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {locationText}
                  </span>
                  <span>•</span>
                  <span>{typeText}</span>
                  {job.isFeatured && (
                    <>
                      <span>•</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-amber-500/10 text-amber-600 border-amber-500/20">
                        {FEATURED_TEXT}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Posted time */}
            <div className="flex flex-col items-end gap-1.5 text-xs text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{postedTime}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-5 pb-4 pt-0 space-y-4 -mt-6">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {job.description}
          </p>

          {/* Salary */}
          <div className="flex items-center gap-2 px-3 py-2 -mt-1 rounded-lg bg-primary/5 border border-primary/10">
            <span className="font-semibold text-sm text-foreground">{salaryText}</span>
          </div>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 5).map((skill: any, idx: number) => (
                <span
                  key={`${skill}-${idx}`}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-secondary-foreground border border-secondary/20 transition-colors hover:bg-secondary/70"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  +{job.skills.length - 5} more
                </span>
              )}
            </div>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="px-5 pb-5 pt-0 flex items-center gap-3 -mt-6 -mb-6">
          {/* View Details Button */}
          <button
            onClick={() => onJobSelect?.(job)}
            className="flex-1 relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group/details"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover/details:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
                animation: "shimmer 2s infinite",
              }}
            />
            <span className="relative z-10">{VIEW_DETAILS_TEXT}</span>
          </button>

          {/* Apply Button */}
          <button
            onClick={() => {
              if (job.applyType === "external" && job.applyUrl) {
                window.open(job.applyUrl, "_blank", "noopener,noreferrer")
                return
              }
              if (onApply) return onApply(job)
              else onJobSelect?.(job)
            }}
            className="flex-1 relative overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary to-indigo-600 text-primary-foreground px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg group/btn"
            style={{
              boxShadow: `0 4px 12px ${brand}40`,
            }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                animation: "shimmer 2s infinite",
              }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {job.applyType === "external" ? (
                <>
                  {APPLY_NOW_TEXT}
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              ) : (
                "Apply Now"
              )}
            </span>
          </button>
        </CardFooter>
      </Card>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}