"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMediaQuery from "@/hooks/shared/use-media-query";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import OccasionFilter from "./occasion-filter";
import PriceFilter from "./price-filter";
import RatingFilter from "./rating";
import ResetAllQueryParams from "./reset-all-query-params";

function FiltersContent() {
  return (
    <>
      {/* Occasion filter */}
      <OccasionFilter />

      {/* Rating filter */}
      <RatingFilter />

      {/* Price filter */}
      <PriceFilter />

      {/* Reset all filters button */}
      <ResetAllQueryParams />
    </>
  );
}

export default function FiltersSidebar() {
  const t = useTranslations("products");

  // Single render target: duplicating the filters (CSS show/hide) breaks the
  // occasions infinite scroll, so we mount only one instance per breakpoint.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop === undefined) {
    return (
      <aside className="hidden md:block border-e border-zinc-100 dark:border-zinc-700 pe-5 w-72 lg:w-80 shrink-0" />
    );
  }

  if (isDesktop) {
    return (
      <aside className="flex flex-col border-e border-zinc-100 dark:border-zinc-700 pe-5 w-72 lg:w-80 shrink-0 h-full">
        <FiltersContent />
      </aside>
    );
  }

  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        className="border border-zinc-200 dark:border-zinc-700 rounded-lg px-4"
      >
        <AccordionItem value="filters" className="border-b-0">
          <AccordionTrigger className="hover:no-underline gap-2 text-zinc-800 dark:text-zinc-50">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="size-4" />
              {t("filters")}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <FiltersContent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
