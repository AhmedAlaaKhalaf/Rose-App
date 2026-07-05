"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserCart } from "../types/cart";

async function getAuthHeaders() {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("You must be logged in to manage your cart");
  }

  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function addToCartAction(productId: string, quantity = 1) {
  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
    headers: await getAuthHeaders(),
  });

  const payload: ApiResponse<TUserCart> = await response.json();

  if (!response.ok || payload.status === false) {
    throw new Error("message" in payload ? payload.message : "Failed to add product to cart");
  }

  return payload;
}

export async function updateCartItemAction(cartItemId: string, quantity: number) {
  const response = await fetch(`${process.env.API}/cart/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
    headers: await getAuthHeaders(),
  });

  const payload: ApiResponse<TUserCart> = await response.json();

  if (!response.ok || payload.status === false) {
    throw new Error("message" in payload ? payload.message : "Failed to update cart item");
  }

  return payload;
}

export async function removeFromCartAction(cartItemId: string) {
  const response = await fetch(`${process.env.API}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: await getAuthHeaders(),
  });

  const payload: ApiResponse<TUserCart> = await response.json();

  if (!response.ok || payload.status === false) {
    throw new Error("message" in payload ? payload.message : "Failed to remove product from cart");
  }

  return payload;
}
