"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormFields } from "@/lib/types/auth";
import { registerSchema } from "@/lib/schemas/auth.schema";
import useRegister from "../_hooks/use-register";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Link } from "@/i18n/navigation";
import SubmittingErrorForm from "../../_components/submitting-error-form";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

type Props = {
  email?: string;
};

export default function RegisterForm({ email = "" }: Props) {
  // Translation
  const t = useTranslations("auth.register");
  const tZod = useTranslations("auth.validation");

  // Mutation
  const { isPending, error, register } = useRegister();

  // Form
  const form = useForm<RegisterFormFields>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email,
      password: "",
      confirmPassword: "",
      phone: "",
      gender: undefined,
    },
    resolver: zodResolver(registerSchema(tZod)),
  });

  // Functions
  const onSubmit: SubmitHandler<RegisterFormFields> = async (values) => {
    register(values);
  };

  return (
    <section className="flex flex-col gap-5">
      {/* Header */}
      <header className="pb-4 border-b border-b-zinc-200 font-greatVibes text-maroon-700 dark:text-softPink-300 text-5xl text-center">
        {t("header")}
      </header>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="register-form"
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <div className="gap-5 grid grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label>{t("name.first.title")}</Label>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.firstName}
                      {...field}
                      placeholder={t("name.first.placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Label>{t("name.last.title")}</Label>
                  <FormControl>
                    <Input
                      aria-invalid={!!form.formState.errors.lastName}
                      {...field}
                      placeholder={t("name.last.placeholder")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label>{t("username.title")}</Label>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.username}
                    {...field}
                    autoComplete="username"
                    placeholder={t("username.placeholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>{t("email.title")}</Label>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.email}
                    type="email"
                    {...field}
                    readOnly={!!email}
                    placeholder={t("email.placeholder")}
                    className={cn(
                      email && "bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed select-none"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone (optional) */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label>{t("phone.title")}</Label>
                <FormControl>
                  <div className="relative">
                    <PhoneInput
                      {...field}
                      aria-invalid={!!form.formState.errors.phone}
                      value={field.value}
                      onChange={field.onChange}
                      className="peer"
                      defaultCountry="EG"
                      initialValueFormat="national"
                      international
                    />
                    <span
                      className={cn(
                        "top-4 left-1/3 absolute text-zinc-500 text-sm",
                        field.value ? "hidden" : "block"
                      )}
                    >
                      {t("phone.placeholder")}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender (optional) */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("gender.title")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  aria-invalid={!!form.formState.errors.gender}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize w-full">
                      <SelectValue placeholder={t("gender.placeholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">{t("gender.options.male")}</SelectItem>
                    <SelectItem value="FEMALE">{t("gender.options.female")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>{t("password.title")}</Label>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.password}
                    type="password"
                    placeholder={t("password.placeholder")}
                    {...field}
                  />
                </FormControl>
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
                <Label>{t("confirm-password.title")}</Label>
                <FormControl>
                  <Input
                    aria-invalid={!!form.formState.errors.confirmPassword}
                    type="password"
                    placeholder={t("confirm-password.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        {/* Button */}
        <footer className="flex flex-col gap-2">
          {error && <SubmittingErrorForm errorMsg={error.message} />}
          <Button
            type="submit"
            form="register-form"
            className="rounded-xl capitalize"
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {isPending ? `${t("button")} ...` : t("button")}
          </Button>
        </footer>

        <p className="pt-5 border-t border-t-zinc-200 font-medium text-zinc-800 dark:text-zinc-50 text-sm text-center">
          {t("user-question")}{" "}
          <Link
            href={"/login"}
            className="font-bold text-maroon-700 dark:text-softPink-300 text-sm capitalize"
          >
            {t("link")}
          </Link>
        </p>
      </Form>
    </section>
  );
}
