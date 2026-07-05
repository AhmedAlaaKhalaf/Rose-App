import type { TAddress } from "../types/addresses";
import { formatApiError } from "../utils/api-error";

type CreateOrderBody = {
  addressId: string;
  paymentMethod: "CASH_ON_DELIVERY" | "CREDIT_CARD";
  couponCode?: string;
  notes?: string;
};

export async function createOrder(
  token: string,
  shippingAddress: TAddress,
  paymentMethod: CreateOrderBody["paymentMethod"]
) {
  const body: CreateOrderBody = {
    addressId: shippingAddress.id,
    paymentMethod,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(formatApiError(payload, "Failed to create order"));
  }

  return payload;
}
