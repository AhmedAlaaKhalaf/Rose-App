import { API_CACHE_REVALIDATE } from "../constants/api-cache";
import { TProductDetails } from "@/lib/types/product";

export async function productDetailsServices(id: string) {
  const response = await fetch(`${process.env.API}/products/${id}`, {
    next: { revalidate: API_CACHE_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the product details");
  }

  const payload: ApiResponse<TProductDetails> = await response.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
