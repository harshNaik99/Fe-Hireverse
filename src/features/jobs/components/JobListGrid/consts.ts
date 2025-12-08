export const SHIMMER_COUNT = 6;

export const EMPTY_HEADER = "No jobs found";

export const EMPTY_MESSAGE =
  "We couldn't find any jobs matching your criteria. Try changing filters or keywords.";

export const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};
