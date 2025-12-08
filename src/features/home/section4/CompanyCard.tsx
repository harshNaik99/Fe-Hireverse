import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  rating: number;
  reviews: number;
  openJobs: number;
};

export function CompanyCard({ company }: { company: Company }) {
  const navigate = useNavigate();

  const openCompany = () =>
    navigate({ to: "/company/$id", params: { id: company.id } });

  const viewJobs = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate({ to: "/jobs", search: { companyId: company.id } });
  };

  return (
    <motion.div
      onClick={openCompany}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      }}
      transition={{ duration: 0.25 }}
      className="
        w-full max-w-[300px] h-[270px]
        bg-white rounded-2xl border border-gray-200
        shadow-sm cursor-pointer p-5 flex flex-col
      "
    >
      {/* Top: Logo + Name */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="
            w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100
            flex items-center justify-center border border-blue-200
          "
        >
          <img src={company.logo} className="w-7 h-7 object-contain" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {company.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {company.industry}
          </p>
        </div>
      </div>

      {/* Cool Stats Box */}
      <div
        className="
          rounded-xl bg-gray-50/60 backdrop-blur-sm border border-gray-200 
          px-4 py-3 flex flex-col gap-2 text-sm text-gray-700
        "
      >
        <div className="flex justify-between">
          <span className="text-gray-500">Rating</span>
          <span className="font-semibold flex items-center gap-1">
            {company.rating} <span className="text-yellow-500">★</span>
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Reviews</span>
          <span className="font-medium">
            {company.reviews.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Open Roles</span>
          <span className="text-blue-600 font-semibold">
            {company.openJobs}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA button */}
      <motion.button
  onClick={viewJobs}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  className="
    relative overflow-hidden 
    w-full py-2 rounded-lg 
    text-sm font-medium 
    text-white 
    bg-gradient-to-r from-blue-600 to-blue-700
    shadow-sm hover:shadow-md transition
  "
  style={{ transform: "translateZ(30px)" }}
>
  {/* Shine layer */}
  <span
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
      transform: "translateX(-120%)",
      transition: "transform 0.55s cubic-bezier(.25,.8,.25,1)",
    }}
  />

  {/* Text */}
  <span className="relative z-10 flex items-center justify-center gap-1">
  View Jobs
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
</span>
  <style>{`
    button:hover > span:first-child {
      transform: translateX(120%) !important;
    }
  `}</style>
</motion.button>

    </motion.div>
  );
}
