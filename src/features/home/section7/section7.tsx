// /sections/Section7.tsx
"use client";

import { useNavigate } from "@tanstack/react-router";
import BenefitsList from "../section7/BenefitsList";
import { benefits } from "../../../lib/benefits";

export default function Section7() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="why-hireverse" className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
        <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
            Why Professionals Choose HireVerse
          </h2>
          <p className="text-cyan-300 text-lg">
            We connect talent with opportunities using powerful hiring tools and trusted recruiters.
          </p>
        </div>

        <BenefitsList items={benefits} />

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate({ to: "/recruiter" })}
            className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all"
          >
            Explore top recruiters
          </button>
        </div>
      </div>
    </section>
  );
}
