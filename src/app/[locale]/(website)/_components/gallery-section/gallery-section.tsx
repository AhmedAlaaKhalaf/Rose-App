"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHead, SectionTitle } from "@/components/ui/section-header";

export default function GallerySection() {
  const t = useTranslations("gallery");

  return (
    <section id="gallery" className="px-4 py-8 w-full">
      {/* Gallery Header */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <SectionTitle>{t("badge")}</SectionTitle>
        <SectionHead>{t("heading")}</SectionHead>
      </div>

      {/* Gallery Grid */}
      <div className="relative mx-auto w-full max-w-[1281px] h-[1147px]">
        {/* Image 1 - Large Left */}
        <div className="top-0 left-0 absolute w-[418px] h-[617px] overflow-hidden">
          <Image
            priority
            sizes="auto"
            src="/assets/images/gallery-1.png"
            alt="Wedding and anniversary gift boxes"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 2 - Top Middle */}
        <div className="top-0 left-[431px] absolute w-[419px] h-[411px] overflow-hidden">
          <Image
            sizes="auto"
            src="/assets/images/gallery-2.png"
            alt="Birthday gift box with red ribbon"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 3 - Top Right */}
        <div className="top-0 left-[863px] absolute w-[418px] h-[411px] overflow-hidden">
          <Image
            sizes="auto"
            src="/assets/images/gallery-3.png"
            alt="Engagement ring box"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 4 - Bottom Left */}
        <div className="top-[631px] left-0 absolute w-[418px] h-[406px] overflow-hidden">
          <Image
            sizes="auto"
            src="/assets/images/gallery-4.png"
            alt="Roses and chocolates"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 5 - Bottom Middle */}
        <div className="top-[426px] left-[431px] absolute w-[419px] h-[611px] overflow-hidden">
          <Image
            sizes="auto"
            src="/assets/images/gallery-5.png"
            alt="Ring box with flowers"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 6 - Bottom Right */}
        <div className="top-[426px] left-[863px] absolute w-[418px] h-[611px] overflow-hidden">
          <Image
            sizes="auto"
            src="/assets/images/gallery-6.png"
            alt="Engagement congratulations card"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
