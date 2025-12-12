// /pages/home/Section6.tsx
"use client";


import RecruiterList from "../../home/section6/RecruiterList";
import { recruiters } from "../../../lib/recruiters";


export default function Section6() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="text-center mb-14">
        <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
            Top Recruiters You Can Trust
          </h2>
          <p className="text-cyan-300 text-lg">
            Verified HRs & Freelance Recruiters helping candidates get hired
            faster.
          </p>
        </div>

        <div>
          <RecruiterList data={recruiters} />
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              // placeholder action: maybe navigate to full recruiters page later
              // using window.location or router depending on your router
              window.location.href = "/recruiter";
            }}
            className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all"
          >
            View all recruiters
          </button>
        </div>
      </div>
    </section>
  );
}
