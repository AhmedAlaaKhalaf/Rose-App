import { getTranslations } from "next-intl/server";

export default async function FaqsPage() {
  const t = await getTranslations("faqsPage");

  const faqIndices = [0, 1, 2, 3] as const;

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full max-w-5xl">
      <h1 className="font-bold text-3xl md:text-4xl text-zinc-900 dark:text-zinc-50">
        {t("title")}
      </h1>

      <section className="mt-8 space-y-4">
        {faqIndices.map((idx) => (
          <article key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-5">
            <h2 className="font-semibold text-lg text-zinc-800 dark:text-zinc-100">
              {t(`faqs.${idx}.q`)}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300 leading-7">
              {t(`faqs.${idx}.a`)}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
