import { TProduct } from "../types/product";

export async function getRelatedProducts(id: string) {
  // Variables
  const params = new URLSearchParams({
    limit: "10",
    fields: "imgCover,title,rateAvg,price,priceAfterDiscount,createdAt,sold,quantity",
    category: id,
  });

  // API Call
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

  const payload: ApiResponse<PaginatedData<TProduct[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message as string);

  return payload;
}
