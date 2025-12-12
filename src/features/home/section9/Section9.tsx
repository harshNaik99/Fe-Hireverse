import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I apply for a job on HireVerse?",
    answer:
      "You can browse jobs, open any listing, and click Apply. Upload your resume and submit directly.",
    icon: "🚀",
  },
  {
    question: "Is creating an account free?",
    answer: "Yes. Both candidates and freelance HRs can register for free.",
    icon: "💎",
  },
  {
    question: "How does freelance HR hiring work?",
    answer:
      "Freelance HRs can create companies, post jobs, manage candidate pipelines, and submit directly.",
    icon: "🎯",
  },
  {
    question: "Can I track my job application status?",
    answer:
      "Yes. You can view realtime application progress on your dashboard.",
    icon: "📊",
  },
  {
    question: "How do companies verify my profile?",
    answer:
      "Companies manually review your resume and decide qualification.",
    icon: "✅",
  },
  {
    question: "Can I delete my account anytime?",
    answer:
      "Yes. You can delete your account from settings, including all linked data.",
    icon: "🔒",
  },
  {
    question: "Will my data remain private?",
    answer:
      "HireVerse follows strict privacy rules. Nothing is shared without permission.",
    icon: "🛡️",
  },
];

export default function Section9() {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <section className="px-4 -mt-2">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
        <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
            Frequently Asked Questions
          </h2>
          <p className="text-cyan-300 text-lg">
            Everything you need to know before you start
          </p>
        </div>

        {/* LIST */}
        <div className="space-y-5">
          {faqs.map((item, i) => {
            const isOpen = open.includes(i);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className={`
                    relative rounded-2xl border transition-all cursor-pointer
                    ${isOpen
                      ? "border-blue-500 bg-blue-50 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.15)]"
                      : "border-gray-200 bg-white hover:shadow-lg hover:-translate-y-[2px]"
                    }
                  `}
                  onClick={() => toggle(i)}
                >
                  {/* LEFT ACCENT BAR */}
                  {/* <motion.div
                    className="absolute left-0 top-0 h-full w-[4px] rounded-l-2xl"
                    animate={{
                      backgroundColor: isOpen ? "#3b82f6" : "#ffffff",
                    }}
                  /> */}

                  {/* HEADER */}
                  <div className="flex items-center gap-4 px-6 py-5">
                    <motion.div
                      className={`flex-shrink-0 w-11 h-11 text-xl flex items-center justify-center rounded-xl transition-all ${
                        isOpen ? "bg-blue-600 text-white" : "bg-gray-100"
                      }`}
                      whileHover={!isOpen ? { scale: 1.11 } : {}}
                    >
                      {item.icon}
                    </motion.div>

                    <p
                      className={`flex-1 text-base font-medium ${
                        isOpen ? "text-blue-800" : "text-gray-900"
                      }`}
                    >
                      {item.question}
                    </p>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`
                        w-9 h-9 flex items-center justify-center rounded-full text-gray-600
                        ${isOpen ? "bg-blue-600 text-white" : "bg-gray-100"}
                      `}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* ANSWER */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <p className="text-base text-gray-700 leading-relaxed pl-[2.9rem]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
