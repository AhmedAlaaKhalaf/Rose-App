import { TOrderStatistics } from "../types/order-statistics";

export async function getOrderStatus(token: string): Promise<TOrderStatistics> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/statistics/orders`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order statistics");
  }

  const payload: ApiResponse<TOrderStatistics> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error as string);
  }

  return payload;
}