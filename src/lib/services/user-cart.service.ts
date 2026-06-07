import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserCart } from "../types/cart";

export async function getUserCart() {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("Authentication token is required");
  }

  try {
    const response = await fetch(`${process.env.API}/cart`, {
      next: {
        tags: ["user-cart"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status} ${response.statusText}`);
    }

    const payload: ApiResponse<TUserCart> = await response.json();

    if ("error" in payload) {
      throw new Error(payload.error);
    }

    return payload;
  } catch (error) {
    throw new Error(
      `Failed to get user cart: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
