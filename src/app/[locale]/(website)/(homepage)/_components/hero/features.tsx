import { FeatureHeroSectionData } from "@/lib/constants/features-hero-section.costants";
import { useLocale } from "next-intl";
import React from "react";

/**
 * Features Component
 * ------------------
 * Displays a list of feature highlights in the hero section.
 * Each feature consists of an icon, a title, and a short description.
 */

export default function Features() {
  const locale = useLocale() as "en" | "ar";

  return (
    <section className="flex flex-wrap justify-between gap-10 bg-maroon-50 dark:bg-zinc-700 p-10 rounded-2xl w-full">
      {FeatureHeroSectionData.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-4">
            {/* Feature icon */}
            <item.icon
              strokeWidth={""}
              className="bg-maroon-600 dark:bg-softPink-200 px-3 py-4 rounded-full w-16 h-16 text-white"
            />
            {/* Feature text */}
            <span>
              <p className="dark:bg-softPink-200 font-semibold text-maroon-600 text-xl">
                {item.title[locale]}
              </p>
              <p className="text-zinc-500 dark:text-zinc-300 text-sm">{item.description[locale]}</p>
            </span>
          </div>
        );
      })}
    </section>
  );
}
