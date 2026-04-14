import React from "react";
import { LoginForm } from "./_components/login-form";
import { useTranslations } from "next-intl";

export default function Page() {
  // Translation
  const t = useTranslations("login");
 
  return (
    <section className="space-y-6">
      {/* Welcome message */}
      <p className="pb-4 dark:border-zinc-600 border-b w-full font-greatVibes text-maroon-700 dark:text-softPink-300 text-5xl text-center">
        {t("title")}
      </p>

      {/* Login form component */}
      <LoginForm />
    </section>
  );
}
