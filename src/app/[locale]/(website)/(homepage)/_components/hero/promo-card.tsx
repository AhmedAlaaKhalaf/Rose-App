"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PromoCard() {
  const t = useTranslations("promoCardheroSection");

  return (
    <div className="relative bg-black/10 rounded-2xl w-full lg:max-w-[18.8125rem] lg:shrink-0 h-[18rem] sm:h-[22rem] lg:h-[27.5rem] lg:aspect-[301/439] overflow-hidden">
      <Image
        sizes="(max-width: 1024px) 100vw, 301px"
        className="object-cover"
        src="/assets/images/promo-card.png"
        fill
        alt="promoCard"
        priority
      />

      <div className="bottom-0 absolute space-y-2.5 lg:space-y-3 p-5 sm:p-6 lg:p-6 xl:p-8">
        <Badge className="rounded-full" variant="secondary">
          {t("badge")}
        </Badge>

        <p className="min-h-[3.5rem] lg:h-20 font-semibold text-white text-lg sm:text-xl lg:text-2xl lg:leading-6 leading-snug line-clamp-3 lg:line-clamp-none">
          {t("title")}
        </p>

        <Link href="/products">
          <Button className="rounded-xl lg:text-base" variant="secondary" size="sm">
            {t("button")}
            <ArrowRight className="size-4 lg:size-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
