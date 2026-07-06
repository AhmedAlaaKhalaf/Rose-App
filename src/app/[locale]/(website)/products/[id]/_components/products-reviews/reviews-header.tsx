"use client";

import { SectionHead } from "@/components/ui/section-header";
import { useFormatter, useTranslations } from "next-intl";
import { Rating } from "@/components/ui/star-rating";
import { Star } from "lucide-react";

type HeaderProps = {
  rateAvg: number;
  rateCount: number;
};

export default function ReviewsHeader({ rateAvg, rateCount }: HeaderProps) {
  const t = useTranslations("product-reviews");
  const format = useFormatter();

  return (
    <header className="space-y-4">
      <SectionHead size="sm">{t("header")}</SectionHead>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 px-5 py-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
        <div className="space-y-1">
          <p className="font-medium text-zinc-500 text-sm">{t("second-head")}</p>
          <p className="font-bold text-zinc-900 dark:text-zinc-50 text-2xl">
            {t.rich("general-rate", {
              rate: format.number(rateAvg, "numbers-only"),
              count: format.number(rateCount, "numbers-only"),
              span: (chunk) => <span className="font-medium text-zinc-500 text-base">{chunk}</span>,
            })}
          </p>
        </div>
        <Rating value={rateAvg} variant="yellow" Icon={<Star strokeWidth={0} size={22} />} />
      </div>
    </header>
  );
}
