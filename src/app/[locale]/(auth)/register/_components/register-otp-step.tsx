"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ErrorAlert from "../../_components/error-alert";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import useSendOTP from "../../forgot-password/_hooks/af-task/use-send-otp";
import useVerifyOtp from "../../forgot-password/_hooks/use-verify-otp";

type Props = {
  email: string;
  onNext: () => void;
  onBack: () => void;
};

type OtpForm = { code: string };

export default function RegisterOtpStep({ email, onNext, onBack }: Props) {
  const [timer, setTimer] = useState(getOtpTimeLeft());

  const t = useTranslations("forgot-password");

  const { verifyOtp, isVerifyPending, verifyError } = useVerifyOtp();
  const { isPending, sendOTP } = useSendOTP();

  const form = useForm<OtpForm>({
    defaultValues: { code: "" },
  });

  const codeValue = form.watch("code");

  const onSubmit = (data: OtpForm) => {
    if (data.code.length !== 6) {
      form.setError("code", { message: t("otp-required") });
      return;
    }
    verifyOtp(
      { email, code: data.code },
      {
        onSuccess: () => {
          if (typeof window !== "undefined") localStorage.removeItem("otp_time");
          onNext();
        },
        onError: (err) => {
          form.setError("code", { message: err.message });
        },
      }
    );
  };

  // Auto-submit when 6 digits are typed
  useEffect(() => {
    if (codeValue.length === 6) {
      verifyOtp(
        { email, code: codeValue },
        {
          onSuccess: () => {
            if (typeof window !== "undefined") localStorage.removeItem("otp_time");
            onNext();
          },
          onError: (err) => form.setError("code", { message: err.message }),
        }
      );
    } else {
      form.clearErrors("code");
    }
  }, [codeValue, email]);

  const handleResend = () => {
    if (!email) return;
    sendOTP(
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

          <Controller
            name="code"
            control={form.control}
            render={({ field }) => (
              <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                <InputOTPGroup className="justify-center gap-x-3 mt-4 w-full">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className={cn(
                        form.formState.errors.code && "border-red-500 ring-1 ring-red-500"
                      )}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <div className="flex justify-end w-full">
            <p className="mt-6 text-zinc-700 dark:text-zinc-400 text-sm text-center">
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

          {form.formState.errors.code && (
            <ErrorAlert message={form.formState.errors.code.message} />
          )}
          {!form.formState.errors.code && verifyError && (
            <ErrorAlert message={verifyError.message} />
          )}

          <Button
            type="submit"
            disabled={isVerifyPending}
            className="flex justify-center items-center gap-x-2 mt-4 w-full"
          >
            {isVerifyPending ? (
              <>
                {t("verifying-otp")} <Loader2 className="animate-spin" />
              </>
            ) : (
              t("verify-otp")
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
