"use client";

import { SectionHead, SectionTitle } from "@/components/ui/section-header";
import { useTranslations } from "next-intl";

export default function TestimonialHeader() {
  // Translation
  const t = useTranslations("testimonials");

  return (
    <header className="flex flex-col items-center gap-3 lg:gap-4">
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionHead>{t("description")}</SectionHead>
    </header>
  );
}
