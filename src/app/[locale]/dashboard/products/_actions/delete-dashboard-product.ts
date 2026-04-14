"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { revalidateTag } from "next/cache";

export async function deleteDashboardProductAction(productId: string) {
  const token = await getDecodedToken();

  if (token) {
    const response = await fetch(`${process.env.API}/products/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const payload: ErrorResponse = await response.json();

      throw new Error(payload.message);
    }

    revalidateTag("dashboard-products");

    const payload: ApiResponse<void> = await response.json();

    if ("message" in payload) {
      throw new Error(payload.message);
    }

    return payload;
  } else {
    throw new Error("Unauthorized");
  }
}
