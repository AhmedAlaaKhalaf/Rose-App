import BestSellingCarousel from "@/components/features/best-selling/best-selling-carousel";
import BestSellingHeading from "./best-selling-heading";
import { homepageContainer } from "@/lib/constants/homepage-spacing";
import { Suspense } from "react";
import CarouselFallback from "@/components/shared/carousel-fallback";

export default function BestSellingSection() {
  return (
    <section className="w-full">
      <div className={homepageContainer}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-9 w-full">
          <BestSellingHeading />

          <div className="min-w-0 flex-1 w-full">
            <Suspense fallback={<CarouselFallback />}>
              <BestSellingCarousel />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
