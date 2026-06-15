import { TProductDetails } from "../types/product";

export async function productDetailsServices(id: string) {
  const response = await fetch(`${process.env.API}/products/${id}`, {});

  if (!response.ok) {
    throw new Error("Failed to fetch the product details");
  }

  const payload: ApiResponse<TProductDetails> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
