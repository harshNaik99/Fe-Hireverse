
import { useState, useRef,type MouseEvent,useEffect } from "react";
import { Briefcase, Users, UserRound } from "lucide-react";

const roles = [
  {
    id: 1,
    title: "Employer HR",
    description: "Post jobs, manage hiring pipelines, and collaborate with HR partners.",
    icon: Briefcase,
    glow: "rgba(59,130,246,0.6)",
  },
  {
    id: 2,
    title: "Freelance HR",
    description: "Get hiring projects, submit candidates, and earn commissions.",
    icon: Users,
    glow: "rgba(34,197,94,0.6)",
  },
  {
    id: 3,
    title: "Candidate",
    description: "Explore verified jobs and track your applications easily.",
    icon: UserRound,
    glow: "rgba(249,115,22,0.6)",
  },
];

export default function RoleSection() {
  return (
    <section className="w-full py-20 px-6 md:px-20">
      <div className="max-w-[1200px] mx-auto text-center">

        {/* Apple Title */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
                    Who Are You?
        </h2>

        <p className="text-cyan-300 text-base sm:text-lg">
          Choose your path and get started instantly on HireVerse.
        </p>

        {/* Apple Card Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {roles.map((role) => (
            <AppleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------
   🍎 APPLE-STYLE CINEMATIC GLASS PANEL
--------------------------------------------- */
/* --------------------------------------------
   🍎 APPLE-STYLE CARD + PARALLAX REVEAL
--------------------------------------------- */
function AppleCard({ role }: any) {
  const Icon = role.icon;

  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  /* 🔥 INTERSECTION OBSERVER — REVEAL WHEN VISIBLE */
  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  /* 🔥 PARALLAX SCROLL HANDLER */
  useEffect(() => {
    const handleScroll = () => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      setScrollY(rect.top); // distance from viewport top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔥 MOUSE HOVER LIGHT SPOT */
  const handleMove = (e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setSpot({ x, y });

    card.style.transform = `
      translateY(-6px)
      scale(1.02)
      perspective(1200px)
      rotateX(${(y - 50) / 40}deg)
      rotateY(${(x - 50) / 40}deg)
    `;
  };

  const resetHover = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `
      translateY(0px)
      scale(1)
    `;
  };

  /* 🔥 PARALLAX OFFSET (moves slower than scroll) */
  const parallaxOffset = scrollY * -0.08; // gentle upward float

  return (
    <div
      ref={wrapperRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(${parallaxOffset}px)`
          : "translateY(40px) scale(0.96)",
        transition: "opacity 0.8s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="will-change-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetHover}
        className="
          relative w-[350px] h-[380px]
          rounded-[28px] overflow-hidden
          transition-all duration-300 cursor-pointer
          backdrop-blur-2xl bg-white/5
          border border-white/10
          shadow-[0_40px_80px_rgba(0,0,0,0.35)]
        "
      >
        {/* Dynamic Glow */}
        <div
          className="absolute inset-0 opacity-[0.25] blur-3xl"
          style={{
            background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, ${role.glow}, transparent 60%)`,
          }}
        />

        {/* Apple Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          <div
            className="
              w-20 h-20 rounded-2xl flex items-center justify-center mb-8
              bg-white/10 backdrop-blur-xl border border-white/20
              shadow-[0_0_20px_rgba(255,255,255,0.15)]
            "
          >
            <Icon className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-white text-[26px] font-semibold tracking-tight mb-3">
            {role.title}
          </h2>

          <p className="text-white/80 text-[17px] leading-relaxed">
            {role.description}
          </p>

          <button
            className="
              mt-auto text-black font-semibold
              bg-white rounded-xl h-[46px] px-6
              hover:bg-gray-200 transition
            "
          >
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}
