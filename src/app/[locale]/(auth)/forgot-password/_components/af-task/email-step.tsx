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
import useForgotPassword from "../../_hooks/use-forgot-password";
import { toast } from "sonner";
import { OTP_COOLDOWN_KEY } from "@/lib/constants/global-constants";
import ErrorAlert from "../../../_components/error-alert";
import { getOtpTimeLeft, startOtpTimer } from "../../../_utils/otp-timer-presisted";

type EmailStepProps = {
  email: string;
  setEmail: (email: string) => void;
  onNext: () => void;
};

export default function EmailStep({ email, setEmail, onNext }: EmailStepProps) {
  const t = useTranslations("forgot-password");

  const { isPending, error, forgotPassword } = useForgotPassword();

  const form = useForm<EmailStepField>({
    defaultValues: { email: email || "" },
    resolver: zodResolver(emailStepSchema(t)),
  });

  const onSubmit: SubmitHandler<EmailStepField> = (values) => {
    const otpCooldown =
      typeof window !== "undefined" ? localStorage.getItem(OTP_COOLDOWN_KEY) : null;
    const diff = getOtpTimeLeft();

    if (otpCooldown && diff > 0) {
      toast.error(t.rich("otp-cooldown-error-toast", { duration: diff }));
      setEmail(values.email);
      onNext();
      return;
    }

    forgotPassword(values, {
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
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">{t("title")}</h1>
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
            {t("email-form-button")}
          </Button>
        </form>
      </Form>

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
