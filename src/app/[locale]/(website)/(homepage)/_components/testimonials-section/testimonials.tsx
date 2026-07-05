import { testimonialsServices } from "../../_services/testimonials.service";
import TestimonialHeader from "./testimonial-header";
import TestimonialsCarousel from "./testimonials-carousel";
import { homepageContainer } from "@/lib/constants/homepage-spacing";

export default async function Testimonials() {
  const {
    payload: { data: testimonials },
  } = await testimonialsServices();

  return (
    <section className="w-full overflow-hidden">
      <div className={`${homepageContainer} flex flex-col gap-10 sm:gap-12 lg:gap-14 xl:gap-16`}>
        <TestimonialHeader />
        <TestimonialsCarousel userReviews={testimonials} />
      </div>
    </section>
  );
}
