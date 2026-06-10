import BestSellingCarousel from "@/components/features/best-selling/best-selling-carousel";
import BestSellingHeading from "./best-selling-heading";
import { Suspense } from "react";
import CarouselFallback from "@/components/shared/carousel-fallback";
import { TLocale } from "@/lib/types/global";

type BestSellingSectionProps = {
  locale: TLocale;
};
export default function BestSellingSection({ locale }: BestSellingSectionProps) {
  return (
    <section className="flex lg:flex-row flex-col gap-9 mx-auto container">
      {/* Text  */}
      <BestSellingHeading />

      {/* Products  */}
      <Suspense fallback={<CarouselFallback />}>
        <BestSellingCarousel locale={locale} />
      </Suspense>
    </section>
  );
}
