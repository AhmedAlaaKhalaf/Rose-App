import { TProduct } from "../types/product";

export async function getRelatedProducts(id: string) {
  // Variables
  const params = new URLSearchParams({
    limit: "10",
    category: id,
  });

  // API Call
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }

  const payload: ApiResponse<PaginatedData<{ products: TProduct[] }>> = await response.json();

  if ("error" in payload) throw new Error(payload.error);

  return payload;
}
