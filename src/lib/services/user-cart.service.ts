import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserCart } from "../types/cart";

export async function getUserCart() {
  const token = await getDecodedToken();

  const response = await fetch("/api/cart", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch user cart");

  const payload: ApiResponse<TUserCart> = await response.json();

  if (payload.message !== "success") {
    throw new Error(payload.message);
  }

  return payload;
}
