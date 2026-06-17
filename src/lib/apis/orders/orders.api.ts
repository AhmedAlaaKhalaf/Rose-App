// src/lib/apis/orders/orders.api.ts
// API functions for user orders

export async function getUserOrders(token: string) {
  const response = await fetch(`${process.env.API}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user orders");
  }
  return response.json();
}

// You can add more order-related API functions here as needed
