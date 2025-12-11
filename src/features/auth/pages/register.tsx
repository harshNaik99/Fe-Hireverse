"use client"
import type React from "react"
import { useState } from "react"
import { router } from "../../../main"
import { motion, type Variants } from "framer-motion"
import { Mail, Lock, User, Eye, EyeOff, Briefcase, Heart, ArrowRight, MapPin, BriefcaseIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../../../api/auth.api";
import { useAuthStore } from "../../../context/authStore"
import { setAccessToken } from "../../../utils/tokenManager"

export default function Register() {
  const [userType, setUserType] = useState<"hr" | "candidate">("candidate")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    designation: "",
  })

  const registerMutation = useMutation({
    mutationFn: registerAPI,
  
    onSuccess: (result) => {
      // result = { user, accessToken }
  
      setAccessToken(result.accessToken);
      useAuthStore.getState().setUser(result.user);
      router.navigate({ to: "/jobs" });
    },
  
    onError: (err: any) => {
      alert(err.response?.data?.MESSAGE || err.message);
    },
  });
  

  const loading = registerMutation.isPending;


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      address: formData.address,
      userType,
      designation: formData.designation,
    };
  
    registerMutation.mutate(payload);
  };

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Get Started</h1>
        <p className="text-blue-300/80 text-sm">Join HireVerse and discover opportunities</p>
      </motion.div>

      {/* Role Selection */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        {[
          { type: "candidate" as const, icon: Heart, label: "Job Seeker", desc: "Looking for work" },
          { type: "hr" as const, icon: Briefcase, label: "Recruiter", desc: "Looking to hire" },
        ].map((option) => (
          <motion.button
            key={option.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUserType(option.type)}
            type="button"
            className={`relative p-4 rounded-xl border-2 transition-all overflow-hidden group ${
              userType === option.type
                ? "border-blue-500 bg-gradient-to-br from-blue-600/20 to-blue-500/10"
                : "border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/30"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-500/0 group-hover:from-blue-600/10 group-hover:to-blue-500/5 transition-all" />
            <div className="relative space-y-2">
              <option.icon className="w-5 h-5 mx-auto text-blue-400" />
              <div>
                <p className="font-semibold text-sm text-white">{option.label}</p>
                <p className="text-xs text-slate-400">{option.desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Form */}
      <motion.form onSubmit={handleRegister} className="space-y-4" variants={containerVariants}>
        {/* Name Input */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Email Input */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                required
              />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          {/* Gender Select */}
          <div className="group">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Input */}
          <div className="group">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
                <input
                  type="text"
                  placeholder="City/Country"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>

        {userType === "hr" && (
          <motion.div variants={itemVariants} className="group">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
                animate={{ opacity: [0, 0.05, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
                <BriefcaseIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
                <input
                  type="text"
                  placeholder="e.g., HR Executive, Recruiter"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Password Input */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-12 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                required
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Confirm Password Input */}
        <motion.div variants={itemVariants} className="group">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden group-hover:border-blue-500/50 transition-all">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-12 pr-12 py-3.5 bg-transparent focus:outline-none text-white placeholder:text-slate-500 transition-all text-sm"
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Terms */}
        <motion.label variants={itemVariants} className="flex items-start gap-2 cursor-pointer group text-xs pt-2">
          <input
            type="checkbox"
            required
            className="w-4 h-4 rounded bg-slate-800 border-slate-600 accent-blue-500 cursor-pointer mt-0.5"
          />
          <span className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
            I agree to the Terms of Service and Privacy Policy
          </span>
        </motion.label>

        {/* Create Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-lg hover:shadow-blue-600/50"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
              Creating Account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </motion.form>

      {/* Divider */}
      <motion.div variants={itemVariants} className="relative pt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-xs uppercase text-slate-500 tracking-wider">
            Have an account?
          </span>
        </div>
      </motion.div>

      {/* Sign In Link */}
      <motion.div variants={itemVariants} className="text-center text-slate-400 text-sm">
        <motion.button
          onClick={() => router.navigate({ to: "/auth/login" })}
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          whileHover={{ x: 2 }}
        >
          Sign in instead
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
