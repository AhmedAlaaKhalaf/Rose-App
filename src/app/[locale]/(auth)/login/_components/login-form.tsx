"use client";

import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Icons
import { Loader2Icon } from "lucide-react";

// Navigation & i18n
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Logic
import { loginSchema } from "@/lib/schemes/login";

// Components
import ErrorAlert from "../../_components/error-alert";
import RememberMe from "../../_components/remember-me";
import { signIn } from "next-auth/react";

export function LoginForm() {
  // Translation
  const t = useTranslations("login");

  // Router for client-side navigation (doesn't trigger beforeunload)
  const router = useRouter();

  // State
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Remember Me
  const [rememberMe, setRememberMe] = useState(false);

  // Form & validation
  const form = useForm<z.infer<ReturnType<typeof loginSchema>>>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Functions
  async function onSubmit(data: z.infer<ReturnType<typeof loginSchema>>) {
    setIsPending(true);
    setError(null);

    try {
      const response = await signIn("login", {
        username: data.username,
        password: data.password,
        rememberMe: rememberMe ? "true" : "false",
        redirect: false,
      });

      if (!response?.ok) {
        setError(response?.error || "Login failed");
        setIsPending(false);
        return;
      }

      // Handle cookie based on Remember Me preference
      // Remember Me = TRUE: httpOnly cookie (30 days) + persistent rememberMe cookie
      // Remember Me = FALSE: non-httpOnly cookie + SESSION rememberMe cookie (expires on browser close)
      await fetch("/api/auth/session-type", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rememberMe }),
      });

      // Redirect to dashboard
      router.push("/products");
    } catch (err) {
      void err;
      setError("An unexpected error occurred");
      setIsPending(false);
    }
  }

  return (
    <form className="w-full" id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-email">{t("email.label")}</FieldLabel>

              <Input
                {...field}
                id="form-rhf-demo-email"
                placeholder="username"
                autoComplete="username"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="relative gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t("password.label")}</FieldLabel>

              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex flex-col mt-2.5 w-full">
        <Link
          href="forgot-password"
          className="font-semibold text-maroon-700 dark:text-softPink-300 text-sm text-end"
        >
          {t("forgotPassword")}
        </Link>

        <Field className="gap-2.5 mt-6" orientation="horizontal">
          <RememberMe value={rememberMe} onChange={setRememberMe} />
        </Field>

        {error && <ErrorAlert message={error} />}

        <Button type="submit" disabled={isPending} className="space-x-2 mt-9 w-full">
          {t("submit")}
          <Loader2Icon className={isPending ? "animate-spin" : "hidden"} />
        </Button>

        <span className="mt-7 pt-4 dark:border-zinc-600 border-t text-sm text-center">
          {t("noAccount")}
          <Link href="/register" className="text-maroon-700 dark:text-softPink-300">
            {" "}
            {t("createAccount")}
          </Link>
        </span>
      </div>
    </form>
  );
}
