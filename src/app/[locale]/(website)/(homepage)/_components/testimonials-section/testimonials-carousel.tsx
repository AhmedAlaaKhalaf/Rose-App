"use client";

import { Carousel, CarouselContent } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import TestimonialCard from "./testimonial-card";
import { TTestimonial } from "@/lib/types/testimonials";

type PageProps = {
  userReviews: TTestimonial[];
};

export default function TestimonialsCarousel({ userReviews }: PageProps) {
  const testimonials = [...userReviews, ...userReviews];
  const direction =
    typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "rtl" : "ltr";

  return (
    <Carousel
      className="flex justify-center items-center bg-maroon-50 dark:bg-zinc-700 px-4 sm:px-10 md:px-16 lg:px-28 xl:px-32 min-h-[20rem] sm:min-h-[24rem] lg:min-h-0 lg:h-138 w-full max-w-full"
      plugins={[
        AutoScroll({
          speed: 1,
          startDelay: 200,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
        WheelGesturesPlugin({}),
      ]}
      opts={{
        loop: true,
        dragFree: true,
        direction: direction,
      }}
    >
      <CarouselContent
        className="items-center pt-12 sm:pt-16 lg:pt-20 min-h-[18rem] sm:min-h-[22rem] lg:min-h-0 lg:h-[27.06rem]"
        dir={direction}
      >
        {testimonials.map((item, idx) => (
          <TestimonialCard key={idx} item={item} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
