"use client";

import { SectionHead, SectionTitle } from "@/components/ui/section-header";
import { useTranslations } from "next-intl";

export default function OccasionsPageHeader() {
  const t = useTranslations("occasionsPage");

  return (
    <header className="flex flex-col items-center gap-2 text-center">
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionHead size="sm">{t("subtitle")}</SectionHead>
    </header>
  );
}
