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
import { OTP_COOLDOWN_KEY } from "@/lib/constants/global-constants";
import { emailStepSchema } from "@/lib/schemes/af-task-schema/auth.schema";
import { EmailStepField } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorAlert from "../../_components/error-alert";
import { getOtpTimeLeft, startOtpTimer } from "../../_utils/otp-timer-presisted";
import useSendEmailVerification from "../_hooks/use-send-email-verification";

type Props = {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
};

export default function RegisterEmailStep({ email, setEmail, onNext }: Props) {
  const t = useTranslations("auth.register");
  const tValidation = useTranslations("forgot-password");

  const { isPending, error, sendEmailVerification } = useSendEmailVerification();

  const form = useForm<EmailStepField>({
    defaultValues: { email },
    resolver: zodResolver(emailStepSchema(tValidation)),
  });

  const onSubmit: SubmitHandler<EmailStepField> = (values) => {
    const otpCooldown =
      typeof window !== "undefined" ? localStorage.getItem(OTP_COOLDOWN_KEY) : null;
    const diff = getOtpTimeLeft();

    if (otpCooldown && diff > 0) {
      toast.error(tValidation.rich("otp-cooldown-error-toast", { duration: diff }));
      setEmail(values.email);
      onNext();
      return;
    }

    sendEmailVerification(values, {
      onSuccess: () => {
        toast.success(t("email-verification.send-success"));
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
          {t("email-verification.title")}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 text-sm">{t("email-verification.desc")}</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email.title")}</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder={t("email.placeholder")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <ErrorAlert message={error.message} />}

          <Button
            type="submit"
            className="gap-2 w-full"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {isPending ? (
              <>
                {t("email-verification.verify-button")}
                <Loader2 className="size-4 animate-spin" />
              </>
            ) : (
              <>
                <MailCheck className="size-4" />
                {t("email-verification.verify-button")}
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
