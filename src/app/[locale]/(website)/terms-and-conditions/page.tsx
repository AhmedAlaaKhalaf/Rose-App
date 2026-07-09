import { getTranslations } from "next-intl/server";

export default async function TermsAndConditionsPage() {
  const t = await getTranslations("termsPage");

  const sections = [
    "acceptance",
    "orders",
    "delivery",
    "returns",
  ] as const;

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full max-w-5xl">
      <h1 className="font-bold text-3xl md:text-4xl text-zinc-900 dark:text-zinc-50">
        {t("title")}
      </h1>
      <p className="mt-2 text-sm text-zinc-500">{t("updated")}: 2026-07-09</p>

      <section className="mt-8 space-y-6">
        {sections.map((key) => (
          <article key={key} className="space-y-2">
            <h2 className="font-semibold text-xl text-zinc-800 dark:text-zinc-100">
              {t(`sections.${key}.title`)}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-7">
              {t(`sections.${key}.body`)}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
