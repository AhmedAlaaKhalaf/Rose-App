import { TProduct } from "../types/product";

export async function getRelatedProducts(id: string) {
  // Variables
  const params = new URLSearchParams({
    limit: "10",
    categoryId: id,
  });

  // API Call
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }

  const payload: ApiResponse<PaginatedData<TProduct[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
