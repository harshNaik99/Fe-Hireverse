import {
  Briefcase,
  MapPin,
  TrendingUp,
  Zap,
  Users,
  Search,
} from "lucide-react";
//import { JobDetailsPanel } from "../../../components/job-details-panel";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "../../../components/ui/command";
import { useHeroSection } from "./useHeroSection";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { useFeaturedJobs } from "../hooks/useFeaturedJobs";
import { useJobSearchSuggest } from "../hooks/useJobSearchSuggest";
import JobCardFeatured from "../components/jobCardFeatured/JobCardFeatured";
import { HERO_STATS, HERO_TAGLINE, JOBS_PAGE_URL } from "./const";
import { Link } from "@tanstack/react-router";
import FilterTags from "../components/FilterTags/FilterTags";


export default function HeroSection() {
  const {
    isVisible,
    handleSearch,
    showSuggest,
    query,
    setShowSuggest,
    setQuery,
    debouncedQuery,
    setLocation,
    handleJobSelect,
    location,
  } = useHeroSection();

  const { data: featuredJobs, isLoading, isError } = useFeaturedJobs();

  const { data: suggest } = useJobSearchSuggest(query);

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .text-shadow-sm {
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* NO BACKGROUND HERE ANYMORE */}
      <header
        className="relative w-full overflow-hidden pt-[90px] z-10"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Stats Bar */}
          <nav
            className="max-w-6xl mx-auto mb-8 lg:mb-12"
            aria-label="Platform statistics"
          >
            <div
              className={`flex flex-wrap justify-center gap-4 lg:gap-8 text-white transition-all duration-700 ${
                isVisible ? "animate-fadeIn" : "opacity-0"
              }`}
              style={{ animationDelay: "0.1s" } as any}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/10">
                <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-sm lg:text-base">
                  {HERO_STATS.JOBS}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/10">
                <Users className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-sm lg:text-base">
                  {HERO_STATS.COMPANIES}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/10">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-sm lg:text-base">
                  {HERO_STATS.SUCCESS}
                </span>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <section
            className="max-w-6xl mx-auto text-center mb-12 lg:mb-16"
            aria-labelledby="hero-heading"
          >
            <div
              className={`transition-all duration-700 ${
                isVisible ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.2s" } as any}
            >
              <div className="inline-block mb-3 lg:mb-4">
                <span className="bg-blue-500/20 text-blue-300 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold backdrop-blur-sm border border-blue-400/30">
                  <Zap className="inline w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  {HERO_TAGLINE}
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-4 lg:mb-6 text-shadow-sm"
              >
                Find Your Dream Job on{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  HireVerse
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
                Connecting Employers, HR Freelancers and Candidates — All in one
                powerful platform. Discover thousands of job opportunities
                across India.
              </p>
            </div>
          </section>

          {/* Search Form */}
          <section
            className="max-w-4xl mx-auto mb-12 lg:mb-20"
            aria-label="Job search"
          >
            <form
              onSubmit={handleSearch}
              className={`transition-all duration-700 ${
                isVisible ? "animate-scaleIn" : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" } as any}
            >
              <div className="glass-morphism rounded-2xl shadow-2xl p-2 lg:p-3 border border-white/20">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
                  {/* Query Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                    <Input
  id="job-search-query"
  type="text"
  name="query"
  placeholder="Job title, skills, company..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => setShowSuggest(true)}
  autoComplete="off"
  className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 lg:py-8 border-2 border-transparent rounded-xl text-black bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    
/>

{showSuggest && debouncedQuery.length >= 2 && (
  <div className="absolute top-[105%] left-0 right-0 z-50">
    <Command className="rounded-xl border shadow-lg bg-white">
      <CommandList>
        <CommandEmpty>No suggestions found.</CommandEmpty>

        {suggest?.titles?.length > 0 && (
          <CommandGroup heading="Job Titles">
            {suggest.titles.slice(0, 5).map((title :any) => (
              <CommandItem
                key={title}
                onMouseDown={() => {
                  setQuery(title)
                  setShowSuggest(false)
                }}
              >
                {title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {suggest?.skills?.length > 0 && (
          <CommandGroup heading="Skills">
            {suggest.skills.slice(0, 5).map((skill : any) => (
              <CommandItem
                key={skill}
                onMouseDown={() => {
                  setQuery(skill)
                  setShowSuggest(false)
                }}
              >
                {skill}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  </div>
)}

                  </div>

                  {/* Location Input */}
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                    <Input
                      id="job-search-location"
                      type="text"
                      name="location"
                      placeholder="Location (Delhi, Remote, Mumbai...)"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-3 lg:py-8 border-2 border-transparent rounded-xl text-black bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      autoComplete="off"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-[200px]
                    bg-gradient-to-r from-blue-600 to-indigo-600 
                    hover:from-blue-700 hover:to-indigo-700
                    px-6 sm:px-8 
                    py-4 sm:py-8
                    rounded-xl 
                    font-semibold text-white 
                    shadow-lg hover:shadow-xl 
                    transform hover:scale-[1.02] active:scale-[0.98] 
                    transition-all"
                  > 
                    <Search className="inline w-8 h-8 lg:w-5 lg:h-5 mr-2" />
                    Search Jobs
                  </Button>
                </div>
              </div>
            </form>
          </section>
                    
          <FilterTags />
          {/* Featured Jobs */}

          {isLoading && (
            <div className="text-center text-white py-8">
              Loading featured jobs...
            </div>
          )}

          {isError && (
            <div className="text-center text-red-400 py-8">
              Failed to load featured jobs
            </div>
          )}

          <section
            className="max-w-7xl mx-auto"
            aria-labelledby="featured-jobs-heading"
          >
            <header className="text-center mb-8 lg:mb-10">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "animate-slideUp" : "opacity-0"
                }`}
                style={{ animationDelay: "0.5s" } as any}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 lg:mb-3 text-shadow-sm">
                  Featured Job Opportunities
                </h2>
                <p className="text-blue-200 text-base lg:text-lg">
                  Handpicked premium jobs from India's top companies
                </p>
              </div>
            </header>

              <JobCardFeatured
                jobs={featuredJobs}
                onJobSelect={handleJobSelect}
              />

            {/* <JobDetailsPanel
              job={selectedJob}
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
              onSave={(id) => console.log("Save job", id)}
              onApply={(id) => console.log("Apply job", id)}
            /> */}

            <footer className="text-center mt-8 lg:mt-12">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "animate-fadeIn" : "opacity-0"
                }`}
                style={{ animationDelay: "1.2s" } as any}
              >
                <Link
                  to = {JOBS_PAGE_URL}
                  search={{
                    page: 1,
                    limit: 10,
                    query: undefined,
                    location: undefined,
                    jobType: undefined,
                    workMode: undefined,
                    skills: undefined,
                  }}
                  className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all"
                >
                  View All Jobs →
                </Link>
              </div>
            </footer>
          </section>
        </div>
      </header>
    </>
  );
}
