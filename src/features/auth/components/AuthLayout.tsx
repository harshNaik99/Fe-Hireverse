"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { router } from "../../../main"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 overflow-hidden relative bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-right glowing orb */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-500/30 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{ top: "-20%", right: "-10%" }}
        />
        {/* Bottom-left glowing orb */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-blue-400/20 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          style={{ bottom: "-15%", left: "-10%" }}
        />
      </div>

      {/* Left Side - Premium Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-col items-center justify-center bg-white p-8 relative z-10 overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="space-y-10 text-center max-w-md relative z-20">
          {/* 3D Logo Card */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="perspective"
          >
            <motion.div
              className="inline-flex p-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl"
              animate={{
                rotateY: [0, 15, -15, 0],
                rotateX: [0, -10, 10, 0],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-5xl font-bold text-black">HireVerse</h1>
            <p className="text-3xl font-light text-blue-600">The Future of Recruiting</p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed"
          >
            Connect with opportunities through AI-powered matching and meaningful professional relationships.
          </motion.p>

          {/* Feature Cards */}
          <div className="space-y-3 pt-6">
            {[
              { icon: "⚡", text: "Lightning Fast", desc: "Instant matching" },
              { icon: "🎯", text: "AI-Powered", desc: "Smart intelligence" },
              { icon: "💼", text: "Professional", desc: "Quality network" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold text-black">{item.text}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating accent dots */}
          <motion.div
            className="absolute top-20 left-8 w-3 h-3 bg-blue-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute bottom-32 right-12 w-2 h-2 bg-blue-600 rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Right Side - Form Container */}
      <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-blue-950 to-black relative overflow-hidden">
        {/* Animated grid background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            backgroundImage:
              "linear-gradient(45deg, transparent 24%, rgba(79, 172, 254, .05) 25%, rgba(79, 172, 254, .05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, .05) 75%, rgba(79, 172, 254, .05) 76%, transparent 77%, transparent), linear-gradient(45deg, transparent 24%, rgba(79, 172, 254, .05) 25%, rgba(79, 172, 254, .05) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, .05) 75%, rgba(79, 172, 254, .05) 76%, transparent 77%, transparent)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* 3D Rotating rings */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-80 h-80 border border-blue-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-blue-400/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 border border-blue-500/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Form wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md relative z-20"
        >
          {/* Back button */}
          <motion.button
            onClick={() => router.navigate({ to: "/" })}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-10 group text-sm font-medium"
            whileHover={{ x: -5 }}
          >
            <span className="text-lg">←</span>
            Back to Home
          </motion.button>

          {/* Form content slot */}
          {children}
        </motion.div>
      </div>
    </div>
  )
}
