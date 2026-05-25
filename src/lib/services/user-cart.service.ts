import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserCart } from "../types/cart";

export async function getUserCart() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/cart`, {
    next: {
      tags: ["user-cart"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: ApiResponse<TUserCart> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
