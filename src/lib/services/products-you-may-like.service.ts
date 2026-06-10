import { getSession } from "next-auth/react";
import { TRecommendationResponse } from "../types/search";

export async function getProductsYouMayLike() {
  // Get token & user ID
  const token = await getSession();

  // Fetch Recommendations data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/related/recommendations/${token?.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Products....");
  }

  const payload: ApiResponse<TRecommendationResponse> = await res.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
