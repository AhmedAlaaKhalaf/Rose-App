"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { VerifyOtpFields } from "@/lib/types/auth-types/forgot-password";
import useVerifyOtp from "../_hooks/use-verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import { useEffect, useState } from "react";
import { verifyOtpSchema } from "@/lib/schemes/auth.schemes";
import { Link } from "@/i18n/navigation";
import ErrorAlert from "../../_components/error-alert";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import useSendOTP from "../_hooks/af-task/use-send-otp";

type StepOtpProps = {
  email: string;
  onNext: () => void;
  onBack: () => void;
};

export default function OtpStep({ email, onNext, onBack }: StepOtpProps) {
  //state
  const [timer, setTimer] = useState(getOtpTimeLeft || 0);

  // translation
  const t = useTranslations("forgot-password");

  // hooks
  const { verifyOtp, isVerifyPending, verifyError } = useVerifyOtp();
  const { isPending, error, sendOTP } = useSendOTP();

  // react hook form
  const form = useForm<VerifyOtpFields>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyOtpSchema(t)),
  });

  // otp value
  const otpValue = form.watch("resetCode");
  const onSubmit = (data: VerifyOtpFields) => {
    verifyOtp(data, {
      onSuccess: () => {
        localStorage.removeItem("otp_time");
        onNext();
      },
      onError: (err) => {
        form.setError("resetCode", { message: err.message });
      },
    });
  };

  // auto send
  useEffect(() => {
    if (otpValue.length === 6) {
      verifyOtp(
        { resetCode: otpValue },
        {
          onSuccess: () => {
            localStorage.removeItem("otp_time");
          },
          onError: (err) => {
            form.setError("resetCode", { message: err.message });
          },
        }
      );
    } else {
      form.clearErrors("resetCode");
    }
  }, [otpValue]);

  // resend otp
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

  // timer count down
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getOtpTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col justify-center items-center">
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

          {/* otp field */}
          <Controller
            name="resetCode"
            control={form.control}
            render={({ field }) => (
              <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                <InputOTPGroup className="justify-center gap-x-3 mt-4 w-full">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className={cn(
                        form.formState.errors.resetCode && "border-red-500 ring-1 ring-red-500"
                      )}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {/* timer */}
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
                    <>{t("otp-resend")}</>
                  )}
                </button>
              )}
            </p>
          </div>

          {/* Form validation error */}
          {form.formState.errors.resetCode && (
            <ErrorAlert message={form.formState.errors.resetCode.message} />
          )}

          {/* Server error (only if no form error) */}
          {!form.formState.errors.resetCode && verifyError && (
            <ErrorAlert message={verifyError.message} />
          )}

          {/* Submit button */}
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
              <>{t("verify-otp")} </>
            )}
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
