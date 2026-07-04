"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/tailwind-merge";
import { imagesCarouselHeroSectionData } from "@/lib/constants/carousel-hero-section.costants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

/**
 * CarouselSection Component
 * -------------------------
 * This component displays a hero carousel with images, navigation dots,
 * and overlay text/buttons.
 *
 */

export default function CarouselSection() {
  // Translate
  const t = useTranslations("carousel-hero-section");
  const locale = useLocale() as "en" | "ar";

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);

  /**
   * Updates the current active slide
   */
  const updateCurrent = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  /**
   * Register carousel event listener for 'select' event
   */
  useEffect(() => {
    if (!api) return;
    updateCurrent();
    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api, updateCurrent]);

  return (
    <div className="relative flex flex-col mx-auto rounded-2xl w-full max-w-full h-full overflow-hidden">
      {/* Carousel*/}
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent dir={locale === "ar" ? "rtl" : "ltr"}>
          {imagesCarouselHeroSectionData.map((item, index) => (
            <CarouselItem className="relative w-full h-[27.5rem] aspect-[955/440]" key={index}>
              <Image
                priority
                sizes="auto"
                src={`/assets/${item}`}
                fill
                alt={item}
                className="rounded-2xl object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Overlay content */}
      <div className="absolute flex flex-col justify-between bg-gradient-to-r from-black/80 to-transparent p-9 w-full h-full">
        {/* Dots navigation */}
        <div className="flex justify-end items-center gap-2">
          {imagesCarouselHeroSectionData.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn("bg-white rounded-full w-2.5 h-2.5", {
                "bg-maroon-600 w-9": current === index + 1,
              })}
            />
          ))}
        </div>

        {/* Hero text and buttons */}
        <section className="flex flex-col justify-end w-full text-white">
          <p className="font-semibold text-4xl">{t("heading")}</p>
          <p className="h-12 text-base">{t("sub-heading")}</p>
          <div className="flex justify-between items-center">
            {/* Primary CTA */}
            <Link href={"/products"}>
              <Button
                className="bg-maroon-50 py-2.5 rounded-xl text-maroon-700"
                variant="secondary"
              >
                {t("cta")}
              </Button>
            </Link>

            {/* Manual navigation arrows */}
            <div className="flex items-center gap-3.5 bg-maroon-50 rounded-full w-fit text-gray-500">
              <ChevronLeft
                className={`size-8 ${locale == "ar" ? "rotate-180" : ""}  cursor-pointer hover:text-maroon-700`}
                onClick={() => api?.scrollPrev()}
              />
              <ChevronRight
                className={`size-8  ${locale == "ar" ? "rotate-180" : ""} cursor-pointer hover:text-maroon-700`}
                onClick={() => api?.scrollNext()}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
