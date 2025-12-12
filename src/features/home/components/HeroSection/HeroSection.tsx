import {
  Briefcase,
  MapPin,
  TrendingUp,
  Zap,
  Users,
  Search,
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "../../../../components/ui/command";
import { useHeroSection } from "./useHeroSection";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

import { useFeaturedJobs } from "../../hooks/useFeaturedJobs";
import { useJobSearchSuggest } from "../../hooks/useJobSearchSuggest";
import JobCardFeatured from "../jobCardFeatured/JobCardFeatured";
import { HERO_STATS, HERO_TAGLINE, JOBS_PAGE_URL } from "./const";
import { Link } from "@tanstack/react-router";
import FilterTags from "../FilterTags/FilterTags";
import JobDetailsPanel from "../jobCardFeatured/JobDetailsPanel/JobDetailsPanel";
import { useJobDetailsPanel } from "../jobCardFeatured/JobDetailsPanel/useJobDetailsPanel";

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
    location,
  } = useHeroSection();

  const { data: featuredJobs, isLoading, isError } = useFeaturedJobs();
  const { job, isOpen, openPanel, closePanel } = useJobDetailsPanel();

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
        className="relative w-full overflow-hidden pt-[80px] md:pt-[90px] z-10"
        role="banner"
        itemScope
        itemType="https://schema.org/WPHeader"
      >
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {/* Stats Bar */}
          <nav
            className="max-w-6xl mx-auto mb-8 lg:mb-12"
            aria-label="Platform statistics"
          >
            <div
              className={`flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8 text-white ${
                isVisible ? "animate" : "opacity-0"
              }`}
              style={{ animationDelay: "0.1s" } as any}
            >
              {/* Stat 1 */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full border border-white/10">
                <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap">
                  {HERO_STATS.JOBS}
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full border border-white/10">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap">
                  {HERO_STATS.COMPANIES}
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full border border-white/10">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap">
                  {HERO_STATS.SUCCESS}
                </span>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <section
            className="max-w-6xl mx-auto text-center mb-10 md:mb-12 lg:mb-16"
            aria-labelledby="hero-heading"
          >
            <div
              className={`${
                isVisible ? "animate" : "opacity-0"
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white mb-4 lg:mb-6 text-shadow-sm px-2"
              >
                Find Your Dream Job on{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  HireVerse
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4">
                Connecting Employers, HR Freelancers and Candidates — All in one
                powerful platform. Discover thousands of job opportunities across
                India.
              </p>
            </div>
          </section>

          {/* Search Form */}
          <section
            className="max-w-4xl mx-auto mb-10 md:mb-12 lg:mb-20 px-4 sm:px-6 lg:px-0"
            aria-label="Job search"
          >
            <form
              onSubmit={handleSearch}
              className={`${
                isVisible ? "animate" : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" } as any}
            >
              <div className="w-full glass-morphism rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-3 border border-white/20 bg-white/5 backdrop-blur-md">
                
                {/* Responsive Layout: Column on mobile, Row on Desktop */}
                <div className="flex flex-col lg:flex-row gap-3 w-full">
                  
                  {/* Query Input */}
                  <div className="w-full lg:flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <Input
                      id="job-search-query"
                      type="text"
                      name="query"
                      placeholder="Job title, skills..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setShowSuggest(true)}
                      autoComplete="off"
                      // ✅ FIX: Fixed Height (h-12 mobile, h-14 desktop)
                      className="w-full pl-12 pr-4 h-12 lg:h-14 border-2 border-transparent rounded-xl text-black bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                    />

                    {showSuggest && debouncedQuery.length >= 2 && (
                      <div className="absolute top-[110%] left-0 right-0 z-50">
                        <Command className="rounded-xl border shadow-lg bg-white">
                          <CommandList>
                            <CommandEmpty>No suggestions found.</CommandEmpty>
                            {suggest?.titles?.length > 0 && (
                              <CommandGroup heading="Job Titles">
                                {suggest.titles.slice(0, 5).map((title: any) => (
                                  <CommandItem
                                    key={title}
                                    onMouseDown={() => {
                                      setQuery(title);
                                      setShowSuggest(false);
                                    }}
                                  >
                                    {title}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            )}
                            {suggest?.skills?.length > 0 && (
                              <CommandGroup heading="Skills">
                                {suggest.skills.slice(0, 5).map((skill: any) => (
                                  <CommandItem
                                    key={skill}
                                    onMouseDown={() => {
                                      setQuery(skill);
                                      setShowSuggest(false);
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
                  <div className="w-full lg:flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <Input
                      id="job-search-location"
                      type="text"
                      name="location"
                      placeholder="Location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      // ✅ FIX: Fixed Height
                      className="w-full pl-12 pr-4 h-12 lg:h-14 border-2 border-transparent rounded-xl text-black bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-base"
                      autoComplete="off"
                    />
                  </div>

                  {/* Search Button */}
                  <Button
                    type="submit"
                    // ✅ FIX: Match height, w-full on mobile, auto width on desktop
                    className="w-full lg:w-auto lg:min-w-[160px]
                    h-12 lg:h-14
                    bg-gradient-to-r from-blue-600 to-indigo-600 
                    hover:from-blue-700 hover:to-indigo-700
                    rounded-xl 
                    font-semibold text-white 
                    shadow-lg hover:shadow-xl 
                    transform hover:scale-[1.02] active:scale-[0.98] 
                    transition-all
                    text-base
                    px-6"
                  >
                    <Search className="inline w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </section>

          <FilterTags />
          
          {/* Featured Jobs Loading/Error States */}
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

          {/* Featured Jobs Section */}
          <section
            className="max-w-7xl mx-auto"
            aria-labelledby="featured-jobs-heading"
          >
            <header className="text-center mb-8 lg:mb-10">
              <div
                className={`${
                  isVisible ? "animate" : "opacity-0"
                }`}
                style={{ animationDelay: "0.5s" } as any}
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
                  style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
                >
                  Featured Job Opportunities
                </h2>
                <p className="text-cyan-300 text-base sm:text-lg">
                  Handpicked premium jobs from India's top companies
                </p>
              </div>
            </header>

            <JobCardFeatured jobs={featuredJobs} onJobSelect={openPanel} />

            <JobDetailsPanel job={job} open={isOpen} onClose={closePanel} />

            <footer className="text-center mt-8 lg:mt-12">
              <div
                className={`${
                  isVisible ? "animate-fadeIn" : "opacity-0"
                }`}
                style={{ animationDelay: "1.2s" } as any}
              >
                <Link
                  to={JOBS_PAGE_URL}
                  search={{
                    page: 1,
                    limit: 10,
                  }}
                  className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all text-sm sm:text-base"
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
