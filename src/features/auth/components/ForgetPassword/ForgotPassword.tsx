"use client"

import { Mail } from "lucide-react"
import { useForgotPassword } from "./useForgotPassword"

export default function ForgotPassword() {
  const {
    sent,
    msg,
    isPending,
    errors,
    register,
    handleSubmit,
    onSubmit,
    onTryDifferentEmail,
  } = useForgotPassword()

  // After submit -> show "check your email" screen, hide form
  if (sent) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Check your email</h1>
        <p className="text-blue-300/80 text-sm">{msg}</p>

        <p className="text-slate-400 text-sm">
          If you don’t see it, check Spam/Promotions and try again in a minute.
        </p>

        <button
          type="button"
          onClick={onTryDifferentEmail}
          className="text-blue-500 hover:text-accent font-semibold transition-colors"
        >
          Try a different email
        </button>
      </div>
    )
  }

  // Default: show form
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />

          <input
            type="email"
            placeholder="your@email.com"
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg"
            {...register("email")}
          />

          {errors.email ? (
            <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  )
}
