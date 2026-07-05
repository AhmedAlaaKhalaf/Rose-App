"use client";

import { Badge } from "@/components/ui/badge";
import { OccasionsHeroSectionData } from "@/lib/constants/occasions-hero-section.costants";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

export default function Occasions() {
  const locale = useLocale() as "en" | "ar";

  return (
    <section className="gap-5 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none w-full lg:[grid-template-columns:repeat(auto-fit,minmax(16.94rem,1fr))]">
      {OccasionsHeroSectionData.map((item, index) => (
        <div key={index} className="relative rounded-2xl w-full aspect-[410/271] overflow-hidden">
          <Image
            sizes="auto"
            src={`/assets/images/${item.image}`}
            fill
            alt={item.title[locale]}
            className="object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-end gap-2 lg:gap-2.5 bg-gradient-to-r from-black/50 to-transparent p-4 sm:p-6 lg:p-6 w-full">
            <Badge className="rounded-full w-fit" variant="secondary">
              {item.category[locale]}
            </Badge>

            <p className="font-semibold text-white text-base sm:text-lg lg:text-2xl leading-snug lg:leading-none line-clamp-3 lg:line-clamp-none">
              {item.title[locale]}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
