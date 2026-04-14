"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TWishlist } from "../types/wishlist";

export async function addToWishlistAction(productId: string) {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    body: JSON.stringify({
      productId,
    }),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to save products in your wishlist");
  }

  const payload: ApiResponse<TWishlist> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function removeFromWishlistAction(productId: string) {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product from your wishlist");
  }

  const payload: ApiResponse<TWishlist> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
