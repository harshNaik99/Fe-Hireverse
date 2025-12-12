"use client";

import { useRef, useEffect, useState } from "react";
import { Briefcase, Users, UserRound } from "lucide-react";

/* -----------------------------------
   WORKFLOW DATA
----------------------------------- */
const steps = [
  {
    id: 1,
    title: "Employers",
    description:
      "Post jobs and instantly share hiring needs with verified HR professionals.",
    icon: Briefcase,
    side: "left",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Freelance HR",
    description:
      "Source, screen, and forward only the strongest profiles to employers.",
    icon: Users,
    side: "right",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Candidates",
    description:
      "Discover great opportunities, apply instantly, and track your hiring journey.",
    icon: UserRound,
    side: "left",
    color: "from-orange-500 to-red-500",
  },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* -----------------------------------
     PARALLAX MOUSE MOVEMENT
  ----------------------------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* -----------------------------------
     SMOOTH SCROLL PROGRESS TRACKING
  ----------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled through
      const scrollStart = -rect.top;
      const scrollEnd = sectionHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -----------------------------------
     SCROLL ANIMATION OBSERVER
  ----------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setTimeout(() => setActiveStep(index), 100);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen px-4 md:px-8 overflow-hidden -mt-4"
    >
      {/* ANIMATED BACKGROUND PARTICLES - Removed, using parent background */}

      {/* 3D PERSPECTIVE BACKGROUND GRID */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          transform: `perspective(1000px) rotateX(60deg) translateZ(-200px) translateY(${mousePos.y * 20}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* TITLE WITH SPARKLE EFFECT */}
      <div className="relative text-center max-w-4xl mx-auto mb-16 z-10">
        <div className="inline-block relative">
          <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
                  style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
                >
            How HireVerse Works
          </h2>
        </div>
        <p className="text-cyan-300 text-base sm:text-lg">
          A connected workflow powering Employers, HR Partners & Candidates in perfect harmony.
        </p>
      </div>

      {/* CENTRAL CONNECTING LINE WITH SMOOTH PULSE */}
      <div className="hidden md:block absolute left-1/2 top-2/8 bottom-1/8 w-1 -translate-x-1/2">
        {/* Background line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent rounded-full" />
        
        {/* Animated progress line */}
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${scrollProgress * 100}%`,
          }}
        />
        
        {/* Glowing pulse dot */}
        <div 
          className="absolute w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-[0_0_30px_10px_rgba(59,130,246,0.5)] left-1/2 -translate-x-1/2"
          style={{
            top: `${scrollProgress * 100}%`,
            transition: 'top 0.1s linear',
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-white" />
        </div>
      </div>

      {/* WORKFLOW CARDS */}
      <div className="relative max-w-7xl mx-auto space-y-32 z-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLeft = step.side === "left";
          const isActive = activeStep === i;

          return (
            <div
              key={step.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`flex ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}
            >
              {/* 3D CARD WITH TILT EFFECT */}
              <div
                className={`
                  group relative w-full max-w-lg transition-all duration-700 ease-out
                  ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'}
                `}
                style={{
                  transform: isActive 
                    ? `perspective(1000px) rotateY(${mousePos.x * (isLeft ? 5 : -5)}deg) rotateX(${-mousePos.y * 5}deg) translateZ(20px)`
                    : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
                  transition: 'transform 0.3s ease-out, scale 0.7s ease-out, opacity 0.7s ease-out',
                }}
              >
                {/* GLOW EFFECT */}
                <div 
                  className={`absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r ${step.color}`}
                  style={{ transform: 'translateZ(-20px)' }}
                />

                {/* CARD CONTENT */}
                <div className="relative p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* ANIMATED GRADIENT BORDER */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${step.color} p-[2px]`}>
                    <div className="w-full h-full rounded-3xl bg-slate-900/95" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">
                    {/* ICON WITH 3D EFFECT */}
                    <div 
                      className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                      style={{
                        transform: isActive 
                          ? `translateZ(30px) scale(1.1) rotate(6deg)`
                          : 'translateZ(10px)',
                      }}
                    >
                      <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>

                    {/* STEP NUMBER */}
                    <div className="absolute top-4 right-4 text-6xl font-black text-white/5">
                      {step.id}
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-blue-100/90 text-lg leading-relaxed">
                      {step.description}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}