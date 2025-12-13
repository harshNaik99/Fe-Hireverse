// src/pages/auth/reset-password/useResetPassword.ts
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch, useNavigate } from "@tanstack/react-router";

import { useReset } from "../../hooks/useReset";
import { RESET_PASSWORD_SUCCESS_MESSAGE, RESET_PASSWORD_ERROR_MESSAGE } from "./consts";

// Zod schema with password confirmation [web:774]
const schema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function useResetPassword() {
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Read search params (token, email) from URL [web:604]
  const search = useSearch({ strict: false }) as { token?: string; email?: string };
  const token = search?.token || "";
  const email = search?.email || "";

  const navigate = useNavigate();
  const resetMutation = useReset();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: FormValues) => {
    setMsg("");

    try {
      const result = await resetMutation.mutateAsync({
        email,
        token,
        newPassword: values.newPassword,
      });

      if (result?.STATUS === 0) {
        setMsg(result?.MESSAGE || RESET_PASSWORD_ERROR_MESSAGE);
        return;
      }

      setMsg(result?.MESSAGE || RESET_PASSWORD_SUCCESS_MESSAGE);
      setIsSuccess(true);
      reset();

      // Redirect to login after 1 second
      setTimeout(() => navigate({ to: "/auth/login" }), 1000);
    } catch {
      setMsg(RESET_PASSWORD_ERROR_MESSAGE);
    }
  };

  return {
    // URL params
    token,
    email,

    // UI state
    msg,
    isSuccess,
    isPending: resetMutation.isPending,

    // RHF
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
