import { TUserWishlist } from "../types/wishlist";
import { normalizeWishlistPayload } from "../utils/wishlist";

export async function getUserWishlist(): Promise<TUserWishlist> {
  const response = await fetch("/api/wishlist", {
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const payload = await response.json();

  if (payload?.status === false) {
    throw new Error(payload.message || "Failed to fetch wishlist");
  }

  return normalizeWishlistPayload(payload);
}
