"use client";

import { SectionHead } from "@/components/ui/section-header";
import { useTranslations } from "next-intl";
import RelatedCarousel from "./related-carousel";

export default function RelatedProducts({ id }: { id: string }) {
  const t = useTranslations("related-products");

  return (
    <section className="space-y-6">
      <SectionHead size="sm">{t("header")}</SectionHead>
      <RelatedCarousel id={id} />
    </section>
  );
}
