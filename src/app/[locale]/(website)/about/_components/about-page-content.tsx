"use client";

import AboutSection from "@/app/[locale]/(website)/_components/about-section/about-section";
import { Button } from "@/components/ui/button";
import { SectionHead, SectionTitle } from "@/components/ui/section-header";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPageContent() {
  const t = useTranslations("aboutPage");
  const tAbout = useTranslations("about");

  const features = [
    tAbout("features.competitive-prices"),
    tAbout("features.premium-quality"),
    tAbout("features.perfect-occasion"),
    tAbout("features.fast-delivery"),
  ];

  return (
    <div className="space-y-16">
      <header className="flex flex-col items-center gap-2 text-center">
        <SectionTitle>{t("title")}</SectionTitle>
        <SectionHead size="sm">{t("subtitle")}</SectionHead>
      </header>

      <AboutSection />

      <section className="gap-10 grid lg:grid-cols-2">
        <div className="bg-maroon-700/5 dark:bg-zinc-900/50 p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
          <h2 className="mb-4 font-semibold text-maroon-700 dark:text-softPink-200 text-2xl">
            {t("mission-title")}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{t("mission-text")}</p>
        </div>

        <div className="bg-white dark:bg-zinc-900/40 p-8 border border-zinc-100 dark:border-zinc-800 rounded-3xl">
          <h2 className="mb-6 font-semibold text-maroon-700 dark:text-softPink-200 text-2xl">
            {t("values-title")}
          </h2>
          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex justify-center items-center bg-maroon-700 rounded-full size-8 shrink-0">
                  <Check className="size-4 text-white" strokeWidth={3} />
                </span>
                <span className="text-zinc-700 dark:text-zinc-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex justify-center">
        <Button asChild className="rounded-full px-8">
          <Link href="/products">{t("cta")}</Link>
        </Button>
      </div>
    </div>
  );
}
