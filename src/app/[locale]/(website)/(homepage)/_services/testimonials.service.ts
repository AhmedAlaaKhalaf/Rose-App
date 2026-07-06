import { API_CACHE_REVALIDATE } from "@/lib/constants/api-cache";
import { TTestimonial } from "@/lib/types/testimonials";

export async function testimonialsServices() {
  const response = await fetch(`${process.env.API}/testimonials`, {
    next: { revalidate: API_CACHE_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the testimonials");
  }

  const payload: ApiResponse<PaginatedData<TTestimonial[]>> = await response.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
