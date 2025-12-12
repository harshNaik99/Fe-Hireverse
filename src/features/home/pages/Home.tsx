import RoleSection from "../section2/RoleSection";
import HeroSection from "../components/HeroSection/HeroSection";
import HowItWorksSection from "../section3/HowItsWorksSection";
import TopCompaniesSection from "../section4/TopCompaniesSections";
import PopularCategories from "../section5/PopularCategories";
import Section6 from "../section6/Section6";
import Section7 from "../section7/section7";
import Section8 from "../section8/section8";
import Section9 from "../section9/Section9";

export default function Home() {
  return (
    <div
  className=" w-full min-h-screen text-white 
    bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -mt-30
  "
>

      {/* GLOBAL BACKGROUND DECORATIONS */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* GRID PATTERN */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* FLOATING ORBS */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "10%",
            left: "5%",
            width: "280px",
            height: "280px",
            backgroundColor: "#3b82f6",
            opacity: 0.15,
            animation: "floatOrb 8s ease-in-out infinite",
          }}
        />

        <div
          className="absolute rounded-full blur-3xl"
          style={{
            bottom: "15%",
            right: "8%",
            width: "320px",
            height: "320px",
            backgroundColor: "#6366f1",
            opacity: 0.15,
            animation: "floatOrb 8s ease-in-out infinite",
            animationDelay: "2.5s",
          } as any}
        />

        <div
          className="absolute rounded-full blur-3xl"
          style={{
            top: "50%",
            left: "50%",
            width: "360px",
            height: "360px",
            backgroundColor: "#8b5cf6",
            opacity: 0.15,
            animation: "floatOrb 8s ease-in-out infinite",
            animationDelay: "5s",
          }as any} 
        />
      </div>

      {/* FLOAT ANIMATION KEYFRAME */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-15px, -20px) scale(0.9); }
          75% { transform: translate(10px, -40px) scale(1.05); }
        }
      `}</style>

      {/* SECTION 1 */}
      
  <HeroSection />


      {/* SECTION 2 */}
    <div className="-mt-24">
  <RoleSection />
    </div>

      <HowItWorksSection />
        <TopCompaniesSection />
        <PopularCategories />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
    </div>
  );
}