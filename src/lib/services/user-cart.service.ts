import { TUserCart } from "../types/cart";
import { normalizeCartPayload } from "../utils/cart";

export const getUserCart = async () => {
  const response = await fetch("/api/cart", {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user cart");
  }

  const payload = await response.json();

  if (payload?.status === false) {
    throw new Error(payload.message || "Failed to fetch user cart");
  }

  return normalizeCartPayload(payload);
};

export type { TUserCart };
