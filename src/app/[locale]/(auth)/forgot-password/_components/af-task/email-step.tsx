"use client";

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
import { EmailStepField } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema } from "@/lib/schemes/af-task-schema/auth.schema";
import useSendOTP from "../../_hooks/af-task/use-send-otp";
import { toast } from "sonner";
import { OTP_COOLDOWN_KEY } from "@/lib/constants/global-constants";
import ErrorAlert from "../../../_components/error-alert";
import { getOtpTimeLeft, startOtpTimer } from "../../../_utils/otp-timer-presisted";

type EmailStepProps = {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
};

export default function EmailStep({ setEmail, onNext }: EmailStepProps) {
  // Translation
  const t = useTranslations("forgot-password");

  // Mutation
  const { isPending, error, sendOTP } = useSendOTP();

  // React Hook Form
  const form = useForm<EmailStepField>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailStepSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<EmailStepField> = (values) => {
    // Variable
    const otpCooldown = localStorage.getItem(OTP_COOLDOWN_KEY);

    const diff = getOtpTimeLeft();

    // Check OTP time start to don't resend another OTPCode
    if (otpCooldown && diff > 0) {
      toast.error(
        t.rich("otp-cooldown-error-toast", {
          duration: diff,
        })
      );

      onNext();

      return;
    }

    sendOTP(values, {
      onSuccess: () => {
        toast.success(t("send-otp-toast"));

        startOtpTimer();
        setEmail(values.email);
        onNext();
      },
    });
  };

  return (
    <>
      {/* Header */}
      <header className="mb-5 pb-3 border-zinc-200 border-b w-full">
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">{t("title")}</h1>
        <p className="text-zinc-800 dark:text-zinc-50">{t("desc")}</p>
      </header>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 w-full">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel>{t("field-label")}</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} type="email" placeholder="example@gmail.com" />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FeedBack */}
          {error && <ErrorAlert message={error.message} />}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {t("email-form-button")}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <footer className="mt-9 pt-5 border-zinc-200 border-t w-full">
        <p className="font-medium text-zinc-800 dark:text-zinc-50 text-sm text-center">
          {t.rich("footer", {
            a: (chunk) => (
              <Link href={"/register"} className="font-bold text-maroon-700 dark:text-pink-300">
                {chunk}
              </Link>
            ),
          })}
        </p>
      </footer>
    </>
  );
}
