// src/pages/auth/forgot-password/useForgotPassword.ts
"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // zod resolver [web:685]

import { useForgot } from "../../hooks/useForgot";
import { GENERIC_FORGOT_PASSWORD_MESSAGE } from "./consts";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export type ForgotPasswordFormValues = z.infer<typeof schema>;

export function useForgotPassword() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");

  const forgotMutation = useForgot();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setMsg("");

    try {
      const result = await forgotMutation.mutateAsync({ email: values.email });
      setSent(true);
      setMsg(result?.MESSAGE || GENERIC_FORGOT_PASSWORD_MESSAGE);
      reset();
    } catch {
      // Security: same message always
      setSent(true);
      setMsg(GENERIC_FORGOT_PASSWORD_MESSAGE);
    }
  };

  const onTryDifferentEmail = () => {
    setSent(false);
    setMsg("");
    reset({ email: "" });
  };

  return {
    sent,
    msg,
    isPending: forgotMutation.isPending,
    register,
    handleSubmit,
    errors,
    onSubmit,
    onTryDifferentEmail,
  };
}
