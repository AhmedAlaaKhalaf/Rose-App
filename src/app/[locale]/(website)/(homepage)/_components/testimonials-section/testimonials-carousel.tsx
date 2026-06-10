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
  // Variables
  // this variable for increasing the length for testimonials array to make the carousel autoplay work
  const testimonials = [...userReviews, ...userReviews];
  const direction =
    typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "rtl" : "ltr";

  return (
    <Carousel
      className="flex justify-center items-center bg-maroon-50 dark:bg-zinc-700 px-0 h-138"
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
      <CarouselContent className="items-center pt-20 h-[27.06rem]" dir={direction}>
        {testimonials.map((item, idx) => (
          <TestimonialCard key={idx} item={item} />
        ))}
      </CarouselContent>
    </Carousel>
  );
}
