import { TUserCart } from "../types/cart";

export const getUserCart = async () => {
  const response = await fetch("/api/cart");

  if (!response.ok) throw new Error("Failed to fetch user cart");

  const payload: ApiResponse<TUserCart> = await response.json();

  if ("error" in payload) throw new Error(payload.error as string);

  return payload;
};
