"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BestSellingHeading() {
  const t = useTranslations("best-selling");

  return (
    <section className="flex flex-col justify-between max-w-80">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-softPink-500 dark:text-maroon-500 uppercase tracking-[.25em]">
          {t("header")}
        </p>
        <div className="font-bold text-maroon-700 dark:text-softPink-200 text-2xl sm:text-3xl lg:text-3xl ltr:capitalize leading-tight lg:leading-none">
          <span className="text-softPink-500 dark:text-maroon-500">{t("title.check-out")}</span>{" "}
          {t("title.what-everyone")}{" "}
          <span className="text-softPink-500 dark:text-maroon-500">{t("title.buying")}</span> <br />
          {t("title.right-now")}
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 leading-tight">{t("description")}</p>
      </div>

      <Link
        href="/products"
        className="flex items-center gap-3 bg-maroon-600 dark:bg-softPink-200 px-4 py-2 rounded-xl w-fit text-white dark:text-zinc-800 ltr:capitalize mt-6 lg:mt-0"
      >
        {t("link")} <ArrowRight className="size-4 rtl:rotate-180" strokeWidth={1.46} />
      </Link>
    </section>
  );
}
