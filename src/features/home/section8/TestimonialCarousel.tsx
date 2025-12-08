// components/TestimonialCarousel.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import  TestimonialCard  from './TestimonialCard';
import { type Testimonial } from '../../../lib/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoSlideInterval?: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoSlideInterval = 3000,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials for infinite loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Reset scroll position for infinite loop
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const scrollBy = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative py-4 overflow-hidden w-full">
      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden px-4"
        style={{ overflowX: "hidden" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[350px] md:w-[380px]"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollBy('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 bord"use client";

import React, { useState, useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import { type Testimonial } from "../../../lib/testimonials";

export const TestimonialCarousel: React.FC<{
  testimonials: Testimonial[];
}> = ({ testimonials }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const looped = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isPaused) return;

    let frame: number;
    const speed = 0.7;

    const animate = () => {
      el.scrollLeft += speed;
      const limit = el.scrollWidth / 3;

      if (el.scrollLeft >= limit) {
        el.scrollLeft = 0;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {looped.map((t, i) => (
          <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[330px] md:w-[360px]">
            <TestimonialCard testimonial={t} isDragging={isPaused} />
          </div>
        ))}
      </div>
    </div>
  );
};
er border-gray-200"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </motion.button> */}

      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollBy('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </motion.button> */}

      {/* Pause/Play Button */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePauseToggle}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 border border-gray-200"
        aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
      >
        {isPaused ? (
          <Play size={20} className="text-gray-700" />
        ) : (
          <Pause size={20} className="text-gray-700" />
        )}
      </motion.button> */}

      {/* Hide scrollbar */}
      <style>{`
        .overflow-x-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};