"use server";

import { getDecodedToken } from "@/lib/services/get-token.service";
import { TAddToCartPayload } from "@/lib/types/add-to-cart";

export async function addToCartAction(payload: TAddToCartPayload) {
  const token = await getDecodedToken();

  const res = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.message ?? "Failed to add product to cart");
  }

  return res.json();
}
