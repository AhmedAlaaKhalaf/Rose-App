"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { formatApiError } from "../utils/api-error";

async function getAuthHeaders() {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("You must be logged in to manage your wishlist");
  }

  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function addToWishlistAction(productId: string) {
  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    body: JSON.stringify({ productId }),
    headers: await getAuthHeaders(),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(formatApiError(payload, "Failed to add product to wishlist"));
  }

  return payload;
}

export async function removeFromWishlistAction(wishlistItemId: string) {
  const response = await fetch(`${process.env.API}/wishlist/${wishlistItemId}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(formatApiError(payload, "Failed to remove product from wishlist"));
  }

  return payload;
}
