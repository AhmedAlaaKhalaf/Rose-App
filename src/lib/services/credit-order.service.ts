import type { TAddress } from "../types/addresses";
import { TPayCreditResponse } from "../types/pay-credit";

export async function creditOrderService(token: string, shippingAddress: TAddress) {
  const body = {
    shippingAddress: {
      street: shippingAddress.street,
      phone: shippingAddress.phone,
      city: shippingAddress.city,
      lat: shippingAddress.lat,
      long: shippingAddress.long,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/checkout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Failed to create cash order");

  const payload: ApiResponse<TPayCreditResponse> = await response.json();

  if ("error" in payload) throw new Error(payload.error as string);

  return payload;
}