import { authOptions } from "@/auth";
import { TUserCart } from "../types/cart";
import { getServerSession } from "next-auth";

export async function getUserCart() {
  const token = await getServerSession(authOptions);

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

    if ("message" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } catch (error) {
    throw new Error(
      `Failed to get user cart: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
