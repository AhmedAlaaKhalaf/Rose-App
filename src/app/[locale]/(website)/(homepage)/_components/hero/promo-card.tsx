import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/**
 * PromoCard Component
 */

export default function PromoCard() {
  const t = useTranslations("promo-card-hero-section");
  return (
    <div className="relative bg-black/10 rounded-2xl w-full md:max-w-[18.8125rem] h-[27.5rem] aspect-[301/439] overflow-hidden">
      {/* Image Background */}
      <Link href={"/products"}>
        <Image
          sizes="auto"
          className="object-cover"
          src={"/assets/images/promo-card.png"}
          fill
          alt="promoCard"
          priority
        />
      </Link>

      {/* Content Overlay */}
      <div className="bottom-0 absolute space-y-2.5 p-6">
        {/* Badge */}
        <Badge className="rounded-full" variant="secondary">
          {t("badge")}
        </Badge>

        {/* Heading / Title */}
        <p className="h-20 font-semibold text-white text-2xl leading-6">{t("title")}</p>

        {/* Move to Shop Now Page */}
        <Link href={"/products"}>
          <Button className="rounded-xl" variant="secondary">
            {t("button")}
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
