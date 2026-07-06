"use client";

import ErrorAlert from "../../_components/error-alert";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import useConfirmEmailVerification from "../_hooks/use-confirm-email-verification";
import useSendEmailVerification from "../_hooks/use-send-email-verification";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils/tailwind-merge";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  email: string;
  onNext: () => void;
  onBack: () => void;
};

type OtpForm = { code: string };

export default function RegisterOtpStep({ email, onNext, onBack }: Props) {
  const [timer, setTimer] = useState(getOtpTimeLeft());
  const t = useTranslations("auth.register.email-verification");

  const { confirmEmailVerification, isPending, error } = useConfirmEmailVerification();
  const { isPending: isResending, sendEmailVerification } = useSendEmailVerification();

  const form = useForm<OtpForm>({
    defaultValues: { code: "" },
  });

  const codeValue = form.watch("code");

  const handleVerify = (code: string) => {
    if (code.length !== 6) {
      form.setError("code", { message: t("otp-required") });
      return;
    }

    confirmEmailVerification(
      { email, code },
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

  const onSubmit = (data: OtpForm) => handleVerify(data.code);

  useEffect(() => {
    if (codeValue.length === 6) {
      handleVerify(codeValue);
    } else {
      form.clearErrors("code");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeValue, email]);

  const handleResend = () => {
    if (!email) return;

    sendEmailVerification(
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
            <h2 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">{t("otp-title")}</h2>
            <div className="flex items-center gap-1 pb-4 border-zinc-200 dark:border-zinc-700 border-b">
              <p className="leading-relaxed text-sm">
                {t.rich("otp-description", {
                  email: email || "user@example.com",
                  span: (chunk) => (
                    <button
                      type="button"
                      onClick={onBack}
                      className="font-medium text-blue-700 hover:text-blue-800 dark:hover:text-blue-300 dark:text-blue-400 underline active:scale-90 transition cursor-pointer"
                    >
                      {chunk}
                    </button>
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
                t.rich("otp-time-left", {
                  time: timer,
                  span: (chunk) => (
                    <span className="font-medium text-primary dark:text-primary">{chunk}</span>
                  ),
                })
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex justify-end items-center gap-1 font-medium text-primary hover:dark:text-softPink-300 hover:text-maroon-800 dark:text-primary text-end active:scale-90 transition cursor-pointer"
                >
                  {isResending ? (
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

          {form.formState.errors.code && <ErrorAlert message={form.formState.errors.code.message} />}
          {!form.formState.errors.code && error && <ErrorAlert message={error.message} />}

          <Button type="submit" disabled={isPending} className="flex justify-center items-center gap-x-2 mt-4 w-full">
            {isPending ? (
              <>
                {t("verifying-otp")} <Loader2 className="animate-spin" />
              </>
            ) : (
              t("confirm-button")
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
