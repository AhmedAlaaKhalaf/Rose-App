import { TReview } from "../types/reviews";

export async function getProductReviews(productId: string) {
  const params = new URLSearchParams({
    productId: productId,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Reviews");
  }

  const payload: ApiResponse<PaginatedData<TReview[]>> = await response.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
