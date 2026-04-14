import BestSellingCarousel from "@/components/features/best-selling/best-selling-carousel";
import BestSellingHeading from "./best-selling-heading";
import { Suspense } from "react";
import CarouselFallback from "@/components/shared/carousel-fallback";

export default function BestSellingSection() {
  return (
    <section className="flex gap-9">
      {/* Text  */}
      <BestSellingHeading />

      {/* Products  */}
      <Suspense fallback={<CarouselFallback />}>
        <BestSellingCarousel />
      </Suspense>
    </section>
  );
}
