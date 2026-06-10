import { testimonialsServices } from "../../_services/testimonials.service";
import TestimonialHeader from "./testimonial-header";
import TestimonialsCarousel from "./testimonials-carousel";

export default async function Testimonials() {
  // variables
  const {
    payload: { data: testimonials },
  } = await testimonialsServices();

  return (
    <section className="flex flex-col gap-10 mx-auto container">
      {/* Section head */}
      <TestimonialHeader />

      {/* Section content */}
      <TestimonialsCarousel userReviews={testimonials} />
    </section>
  );
}
