"use client";

import { FeatureHeroSectionData } from "@/lib/constants/features-hero-section.costants";
import { useLocale } from "next-intl";
import React from "react";

export default function Features() {
  const locale = useLocale() as "en" | "ar";

  return (
    <section className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 p-5 sm:p-7 lg:flex lg:flex-wrap lg:justify-between lg:gap-2 lg:p-10 bg-maroon-50 dark:bg-zinc-700 rounded-2xl w-full">
      {FeatureHeroSectionData.map((item, index) => (
        <div key={index} className="flex items-center gap-3 sm:gap-4 lg:gap-4 min-w-0">
          <item.icon
            strokeWidth=""
            className="bg-maroon-600 dark:bg-softPink-200 px-3 py-4 rounded-full size-12 sm:size-14 lg:w-16 lg:h-16 shrink-0 text-white"
          />
          <span className="min-w-0">
            <p className="font-semibold text-maroon-600 dark:text-softPink-200 text-base sm:text-lg lg:text-xl">
              {item.title[locale]}
            </p>
            <p className="text-zinc-500 dark:text-zinc-300 text-xs sm:text-sm lg:text-sm">
              {item.description[locale]}
            </p>
          </span>
        </div>
      ))}
    </section>
  );
}
