// src/lib/apis/orders/orders.api.ts
// API functions for user orders

import { normalizeOrdersResponse } from "@/lib/utils/orders";

export async function getUserOrders(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/orders?page=1&limit=40`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message || "Failed to fetch user orders");
  }

  return normalizeOrdersResponse(payload);
}

// You can add more order-related API functions here as needed
