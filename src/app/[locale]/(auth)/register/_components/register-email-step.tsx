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
import { EmailStepField } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailStepSchema } from "@/lib/schemes/af-task-schema/auth.schema";
import useSendOTP from "../../forgot-password/_hooks/af-task/use-send-otp";
import { toast } from "sonner";
import { OTP_COOLDOWN_KEY } from "@/lib/constants/global-constants";
import ErrorAlert from "../../_components/error-alert";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import { Loader2 } from "lucide-react";

type Props = {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
};

export default function RegisterEmailStep({ email, setEmail, onNext }: Props) {
  const t = useTranslations("forgot-password");
  const tReg = useTranslations("auth.register");

  const { isPending, error, sendOTP } = useSendOTP();

  const form = useForm<EmailStepField>({
    defaultValues: { email },
    resolver: zodResolver(emailStepSchema(t)),
  });

  const onSubmit: SubmitHandler<EmailStepField> = (values) => {
    const otpCooldown =
      typeof window !== "undefined" ? localStorage.getItem(OTP_COOLDOWN_KEY) : null;
    const diff = getOtpTimeLeft();

    // If we still have an active cooldown, skip re-sending and go straight to OTP step
    if (otpCooldown && diff > 0) {
      toast.error(t.rich("otp-cooldown-error-toast", { duration: diff }));
      setEmail(values.email);
      onNext();
      return;
    }

    sendOTP(values, {
      onSuccess: () => {
        toast.success(t("sendotp-toast"));
        startOtpTimer();
        setEmail(values.email);
        onNext();
      },
    });
  };

  return (
    <>
      <header className="mb-5 pb-3 border-zinc-200 border-b w-full">
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">
          {tReg("header")}
        </h1>
        <p className="text-zinc-800 dark:text-zinc-50">{t("desc")}</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-9 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("field-lable")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="example@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ErrorAlert message={error.message} />}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                {t("email-form-button")} <Loader2 className="animate-spin" />
              </span>
            ) : (
              t("email-form-button")
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
