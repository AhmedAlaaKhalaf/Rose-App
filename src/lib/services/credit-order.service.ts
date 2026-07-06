import { formatApiError } from "../utils/api-error";
import { extractOrderId } from "../utils/orders";
import { normalizePaymentIntentResponse } from "../utils/payments";
import type { TAddress } from "../types/addresses";
import { createOrder } from "./create-order.service";

async function createPaymentIntent(token: string, orderId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/payments/create-intent`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId }),
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(formatApiError(payload, "Failed to create payment intent"));
  }

  return payload;
}

export async function creditOrderService(token: string, shippingAddress: TAddress) {
  const orderResponse = await createOrder(token, shippingAddress, "CREDIT_CARD");
  const orderId = extractOrderId(orderResponse);

  if (!orderId) {
    throw new Error("Order was created but no order ID was returned");
  }

  const paymentResponse = await createPaymentIntent(token, orderId);

  return normalizePaymentIntentResponse(paymentResponse, orderId);
}
