import { Badge } from "@/components/ui/badge";
import { OccasionsHeroSectionData } from "@/lib/constants/occasions-hero-section.costants";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

/**
 * Occasions Component
 * ------------------
 * Renders a responsive grid of occasion cards (Wedding, Engagement, Anniversary, etc.)
 * Each card displays a background image with an overlay containing a category badge
 * and a title.
 *
 */

export default function Occasions() {
  const locale = useLocale() as "en" | "ar";

  return (
    <section className="gap-6 grid w-full [grid-template-columns:repeat(auto-fit,minmax(16.94rem,1fr))]">
      {OccasionsHeroSectionData.map((item, index) => (
        <div key={index} className="relative rounded-2xl w-full aspect-[410/271] overflow-hidden">
          {/* Background image */}
          <Image
            sizes="auto"
            src={`/assets/images/${item.image}`}
            fill
            alt={item.title[locale]}
            className="object-cover"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-end gap-2.5 bg-gradient-to-r from-black/50 to-transparent p-6 w-full">
            {/* Category badge */}
            <Badge className="rounded-full w-fit" variant="secondary">
              {item.category[locale]}
            </Badge>

            {/* Card title */}
            <p className="font-semibold text-white text-2xl leading-none">{item.title[locale]}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
