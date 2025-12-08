// /data/benefits.ts
export type BenefitItem = {
  id: string;
  icon: "BadgeCheck" | "Sparkles" | "Timer" | "BarChart3" | "ShieldCheck" | "Star";
  title: string;
  description: string;
};

export const benefits: BenefitItem[] = [
  {
    id: "b1",
    icon: "BadgeCheck",
    title: "Verified Freelance HRs",
    description:
      "Work only with HRs and recruiters verified through strict background checks.",
  },
  {
    id: "b2",
    icon: "Sparkles",
    title: "AI-Powered Job Matching",
    description:
      "Smart recommendations that match your skills and career interests.",
  },
  {
    id: "b3",
    icon: "Timer",
    title: "Fast Hiring Process",
    description: "Streamlined workflows that reduce hiring time by 40%.",
  },
  {
    id: "b4",
    icon: "BarChart3",
    title: "Real-Time Application Tracking",
    description: "Track recruiter actions and application progress instantly.",
  },
  {
    id: "b5",
    icon: "ShieldCheck",
    title: "Secure & Transparent Platform",
    description: "Protected with enterprise-grade encryption.",
  },
  {
    id: "b6",
    icon: "Star",
    title: "Rated & Reviewed Recruiters",
    description: "Choose from recruiters with proven hiring success.",
  },
];
