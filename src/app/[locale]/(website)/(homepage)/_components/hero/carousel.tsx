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

export default function CarouselSection() {
  const t = useTranslations("carouselheroSection");
  const locale = useLocale() as "en" | "ar";

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);

  const updateCurrent = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    updateCurrent();
    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api, updateCurrent]);

  return (
    <div className="relative flex flex-col mx-auto rounded-2xl w-full max-w-full min-w-0 min-h-[16rem] sm:min-h-[20rem] lg:min-h-0 lg:h-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent dir={locale === "ar" ? "rtl" : "ltr"}>
          {imagesCarouselHeroSectionData.map((item, index) => (
            <CarouselItem
              className="relative w-full min-h-[16rem] sm:min-h-[20rem] lg:h-[27.5rem] lg:aspect-[955/440]"
              key={index}
            >
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

      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-r from-black/80 to-transparent p-5 sm:p-6 lg:p-9 xl:p-10 w-full h-full">
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

        <section className="flex flex-col justify-end gap-3 lg:gap-4 w-full text-white">
          <p className="font-semibold text-2xl sm:text-3xl lg:text-4xl">{t("heading")}</p>
          <p className="text-sm sm:text-base lg:h-12 lg:text-base line-clamp-2 lg:line-clamp-none">
            {t("subheading")}
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
            <Link href={"#"}>
              <Button
                className="bg-maroon-50 py-2.5 rounded-xl text-maroon-700"
                variant="secondary"
              >
                {t("cta")}
              </Button>
            </Link>

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
