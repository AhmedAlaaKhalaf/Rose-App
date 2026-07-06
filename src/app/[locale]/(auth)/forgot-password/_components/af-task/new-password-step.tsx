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
  token: string;
};

export default function NewPasswordStep({ token }: NewPasswordProps) {
  const router = useRouter();

  const t = useTranslations("forgot-password");

  const { isPending, error, newPassword } = useNewPassword();

  const form = useForm<NewPasswordFields>({
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(newPasswordSchema(t)),
  });

  const onSubmit: SubmitHandler<NewPasswordFields> = (values) => {
    newPassword(values, {
      onSuccess: () => {
        router.replace("/login");
        toast.success(t("new-password-success-toast"));
      },
    });
  };

  return (
    <>
      <header className="mb-5 pb-3 border-zinc-200 border-b w-full">
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50 text-2xl">
          {t("new-password-title")}
        </h1>
        <p className="text-zinc-800 dark:text-zinc-50">{t("new-password-desc")}</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("new-password-field-one-label")}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("new-password-field-two-label")}</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="mt-1 border border-red-600 w-full text-red-600 text-center px-3 py-2">
              {error.message}
            </p>
          )}

          <Button
            type="submit"
            className="mt-9 w-full"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {t("new-password-button")}
          </Button>
        </form>
      </Form>

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
