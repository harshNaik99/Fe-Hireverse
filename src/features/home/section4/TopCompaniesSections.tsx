// File: sections/TopCompanies.tsx

import { CompanyGrid } from "../section4/CompanyGrid";
import type { Company } from "../section4/CompanyCard";

export default function TopCompanies() {
  const companies: Company[] = [
    {
      id: "1",
      name: "TechVision AI",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=techvision",
      industry: "Artificial Intelligence",
      rating: 4.8,
      reviews: 1247,
      openJobs: 23,
    },
    {
      id: "2",
      name: "CloudScale",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=cloudscale",
      industry: "Cloud Computing",
      rating: 4.6,
      reviews: 892,
      openJobs: 15,
    },
    {
      id: "3",
      name: "DataFlow Labs",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=dataflow",
      industry: "Big Data Analytics",
      rating: 4.9,
      reviews: 2103,
      openJobs: 31,
    },
    {
      id: "4",
      name: "CyberGuard",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=cyberguard",
      industry: "Cybersecurity",
      rating: 4.7,
      reviews: 1456,
      openJobs: 19,
    },
    {
      id: "5",
      name: "QuantumLeap",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=quantum",
      industry: "Quantum Computing",
      rating: 4.9,
      reviews: 789,
      openJobs: 12,
    },
    {
      id: "6",
      name: "NeuralNet Co",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=neuralnet",
      industry: "Machine Learning",
      rating: 4.8,
      reviews: 1678,
      openJobs: 27,
    },
    {
      id: "7",
      name: "BlockChain Pro",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=blockchain",
      industry: "Blockchain",
      rating: 4.5,
      reviews: 934,
      openJobs: 18,
    },
    {
      id: "8",
      name: "RoboTech Inc",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=robotech",
      industry: "Robotics",
      rating: 4.7,
      reviews: 1234,
      openJobs: 22,
    },
  ];

  return (
    <section
      
    >
      <div className="text-center mb-12">
        <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
          Top Companies Hiring
        </h2>

        <p className="text-cyan-300 text-lg">
          Explore top companies actively posting jobs
        </p>
      </div>

      <CompanyGrid companies={companies} />
    </section>
  );
}
