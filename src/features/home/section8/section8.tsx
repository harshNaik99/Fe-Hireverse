// sections/Section8.tsx

import  { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { type Variants  } from "framer-motion"
import  {TestimonialCarousel}  from './TestimonialCarousel';
import { testimonials } from '../../../lib/testimonials';
import { Users, TrendingUp, Award, Briefcase } from 'lucide-react';

export default function Section8 () {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants : Variants= {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1], // easeOut bezier curve
      },
    },
  };

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Successful Placements",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      value: "500+",
      label: "Partner Companies",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "Average Rating",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
       className="relative w-full py-16 overflow-hidden -mt-12"

    >
      {/* Background Decorations */}
      {/* <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
       */}
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-2 lg:py-3 rounded-full border border-white/10">
                <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                <span className="font-semibold text-sm lg:text-base">
                  Success Stories
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <h2
          className="
            text-4xl md:text-5xl font-bold text-white mb-3
          "
          style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.6)" }}
        >
              Success Stories from Our Community
          
            </h2>

            {/* Subtitle */}
            <p className="text-cyan-300 text-lg">
              Real experiences shared by candidates, companies, and freelance HRs using HireVerse.
            </p>
          </motion.div>

          {/* Carousel */}
          <motion.div variants={itemVariants}>
            <TestimonialCarousel testimonials={testimonials} autoSlideInterval={5000} />
          </motion.div>

          {/* Stats Section */}
          <motion.div
  variants={itemVariants}
  className="mt-16 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
>
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ duration: 0.25 }}
      className="
        bg-white border border-gray-200 shadow-sm hover:shadow-md 
        rounded-xl p-4 flex items-center gap-4 transition-all duration-200
      "
    >
      {/* ICON */}
      <div
        className={`
          flex items-center justify-center 
          w-12 h-12 rounded-full bg-gradient-to-r ${stat.color}
        `}
      >
        <stat.icon size={20} className="text-white" />
      </div>

      {/* TEXT */}
      <div className="flex flex-col leading-none">
        <span
          className={`text-2xl font-semibold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
        >
          {stat.value}
        </span>

        <span className="text-gray-800 font-medium text-sm mt-1">
          {stat.label}
        </span>
      </div>
    </motion.div>
  ))}
</motion.div>




          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all"
            >
              Share Your Success Story
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

