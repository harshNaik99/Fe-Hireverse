"use client"

import { useState } from "react"
import { router } from "../../../main"
import { motion, type Variants } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import  { useLogin } from "../hooks/useLogin"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation (optional but recommended)
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }
  
    // Payload for loginAPI
    const payload = {
      email,
      password,
    };
  
    // Call mutation
    login(payload);
  };
  

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
        <p className="text-blue-300/80 text-sm">Sign in to your HireVerse account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <motion.div variants={itemVariants}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            required
          />
        </motion.div>

        {/* Password Input */}
        <motion.div variants={itemVariants}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </motion.div>

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-border bg-input accent-primary" />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <button type="button" className="text-blue-500 hover:text-accent transition-colors">
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <motion.button variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 shadow-lg hover:shadow-blue-600/50"
        >
          {isPending ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
             Signing in...
            </>
          ) : (
            <>
             Sign In
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-3 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-xs uppercase text-slate-500 tracking-wider">Or continue with</span>
        </div>
      </div>

      {/* Social Login */}
      <div  className="grid grid-cols-2 gap-4">
        <button className="py-2 px-4 border border-border rounded-lg hover:bg-primary transition-colors font-medium text-sm text-white">
          Google
        </button>
        <button className="py-2 px-4 border border-border rounded-lg hover:bg-primary transition-colors font-medium text-sm text-white">
          LinkedIn
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-muted-foreground text-sm">
        Don't have an account?{" "}
        <button
          onClick={() => router.navigate({ to: "/auth/register" })}
          className="text-blue-500 hover:text-accent font-semibold transition-colors"
        >
          Sign up
        </button>
      </p>
    </motion.div>
  )
}
