"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserCart } from "@/lib/types/cart";
import { revalidateTag } from "next/cache";

export async function AddCartItemAction(itemId: string) {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/cart/${itemId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to add new cart item");
  }

  revalidateTag(itemId);

  const payload: ApiResponse<TUserCart> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function updateCartItemAction(itemId: string, quantity: number) {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/cart/${itemId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart item with this id");
  }

  revalidateTag("user-cart");

  const payload: ApiResponse<TUserCart> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function clearCartAction() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }

  revalidateTag("user-cart");

  const payload: ApiResponse<{ message: string }> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function removeCartItemAction(itemId: string) {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/cart/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove cart item with this id");
  }

  revalidateTag("user-cart");

  const payload: ApiResponse<TUserCart> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
