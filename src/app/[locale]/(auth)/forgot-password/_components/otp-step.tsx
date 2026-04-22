"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import useForgotPassword from "../_hooks/use-forgot-password";

type StepOtpProps = {
  email: string;
  onTokenSubmit: (token: string) => void;
  onBack: () => void;
};

type FormValues = { token: string };

export default function OtpStep({ email, onTokenSubmit, onBack }: StepOtpProps) {
  const [timer, setTimer] = useState(getOtpTimeLeft());

  const t = useTranslations("forgot-password");

  // resending the reset email
  const { isPending, forgotPassword } = useForgotPassword();

  const form = useForm<FormValues>({
    defaultValues: { token: "" },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.token.trim()) {
      form.setError("token", { message: t("token-required") });
      return;
    }
    if (typeof window !== "undefined") localStorage.removeItem("otp_time");
    onTokenSubmit(data.token.trim());
  };

  const handleResend = () => {
    if (!email) return;
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          startOtpTimer();
          setTimer(getOtpTimeLeft());
        },
      }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => setTimer(getOtpTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mb-9 w-full">
          <div className="space-y-1">
            <h2 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">
              {t("otp-title")}
            </h2>
            <div className="flex items-center gap-1 pb-4 border-zinc-200 dark:border-zinc-700 border-b">
              <p className="leading-none">
                {t.rich("otp-description", {
                  email: email ? email : "user@example.com.",
                  span: (chunk) => (
                    <span
                      onClick={() => onBack()}
                      className="font-medium text-blue-700 hover:text-blue-800 dark:hover:text-blue-300 dark:text-blue-400 underline active:scale-90 transition cursor-pointer"
                    >
                      {chunk}
                    </span>
                  ),
                })}
              </p>
            </div>
          </div>

          {/* token field — paste the code from the email */}
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("token-label")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("token-placeholder")}
                    autoComplete="one-time-code"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-full">
            <p className="mt-2 text-zinc-700 dark:text-zinc-400 text-sm text-center">
              {timer > 0 ? (
                <>
                  {t.rich("otp-time-left", {
                    time: timer,
                    span: (chunk) => (
                      <span className="font-medium text-primary dark:text-primary">{chunk}</span>
                    ),
                  })}
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex justify-end items-center gap-1 font-medium text-primary hover:dark:text-softPink-300 hover:text-maroon-800 dark:text-primary text-end active:scale-90 transition cursor-pointer"
                >
                  {isPending ? (
                    <>
                      {t("otp-resending")} <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    t("otp-resend")
                  )}
                </button>
              )}
            </p>
          </div>

          <Button type="submit" className="flex justify-center items-center gap-x-2 mt-4 w-full">
            {t("verify-otp")}
          </Button>
        </form>
      </Form>

      <div className="flex justify-center items-center gap-1 pt-5 border-t border-t-zinc-200 dark:border-t-zinc-700 w-full font-medium text-sm">
        <p className="font-medium text-zinc-800 dark:text-zinc-50 text-sm text-center">
          {t.rich("otp-need-help", {
            a: (chunk) => (
              <Link href={"#"} className="font-bold text-maroon-700 dark:text-softPink-300">
                {chunk}
              </Link>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
