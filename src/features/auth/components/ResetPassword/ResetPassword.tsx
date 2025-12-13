// src/pages/auth/reset-password/ResetPassword.tsx
"use client"

import { Lock } from "lucide-react"
import { useResetPassword } from "./useResetPassword"

export default function ResetPassword() {
  const {
    token,
    email,
    msg,
    isSuccess,
    isPending,
    register,
    handleSubmit,
    errors,
    onSubmit,
  } = useResetPassword()

  if (!email || !token) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white">Invalid Link</h1>
        <p className="text-slate-400">
          This reset link is invalid or expired. Please request a new password reset.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email (readonly) */}
        <div className="relative">
          <input
            value={email}
            readOnly
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-slate-400"
          />
        </div>

        {/* New Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="New password"
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg"
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className="mt-2 text-sm text-red-400">{errors.newPassword.message}</p>
          ) : null}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update password"}
        </button>
      </form>

      {msg ? (
        <p className={`text-sm ${isSuccess ? "text-green-400" : "text-red-400"}`}>{msg}</p>
      ) : null}
    </div>
  )
}
