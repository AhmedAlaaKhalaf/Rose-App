import { TOrderStatistics } from "../types/order-statistics";

export async function getOrderStatus() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/statistics/orders`);

  if (!response.ok) {
    throw new Error("Failed to fetch order statistics");
  }

  const payload: ApiResponse<TOrderStatistics> = await response.json();
}