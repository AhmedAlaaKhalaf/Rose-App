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
import { Link, useRouter } from "@/i18n/navigation";
import { newPasswordSchema } from "@/lib/schemes/af-task-schema/auth.schema";
import { NewPasswordFields } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import useNewPassword from "../../_hooks/af-task/use-new-password";
import { toast } from "sonner";

type NewPasswordProps = {
  email: string;
};

export default function NewPasswordStep({ email }: NewPasswordProps) {
  // navigate
  const router = useRouter();

  // Translation
  const t = useTranslations("forgot-password");

  // Mutation
  const { isPending, error, newPassword } = useNewPassword();

  // React Hook Form
  const form = useForm<NewPasswordFields>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<NewPasswordFields> = (values) => {
    newPassword(
      {
        ...values,
        email,
      },
      {
        onSuccess: () => {
          router.replace("/login");
          toast.success(t("new-password-success-toast"));
        },
      }
    );
  };

  return (
    <>
      {/* Header */}
      <header className="mb-5 pb-3 border-zinc-200 border-b w-full">
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">
          {t("new-password-title")}
        </h1>
        <p className="text-zinc-800 dark:text-zinc-50">{t("new-password-desc")}</p>
      </header>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3">
                {/* Lable */}
                <FormLabel>{t("new-password-field-one-label")}</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                {/* Lable */}
                <FormLabel>{t("new-password-field-two-label")}</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>

                {/* Validation Message */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FeedBack */}
          {error && (
            <p className="mt-1 border border-red-600 w-full text-red-600 text-center">
              {error.message}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="mt-9 w-full"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {t("new-password-button")}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <footer className="mt-9 pt-5 border-zinc-200 border-t w-full">
        <p className="font-medium text-zinc-800 dark:text-zinc-50 text-sm text-center">
          {t.rich("new-password-footer", {
            a: (chunk) => (
              <Link href={"/login"} className="font-bold text-maroon-700 dark:text-pink-300">
                {chunk}
              </Link>
            ),
          })}
        </p>
      </footer>
    </>
  );
}
