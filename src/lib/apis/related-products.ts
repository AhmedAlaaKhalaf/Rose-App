import { TProductCard } from "../types/product";

export async function getRelatedProducts(categoryId: string) {
  const params = new URLSearchParams({
    limit: "10",
    categoryId,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }

  const payload: ApiResponse<PaginatedData<TProductCard[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
