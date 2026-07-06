import { normalizeAddressesResponse } from "../utils/addresses";
import { TAddressResponse } from "../types/addresses";

export async function getShippingAddress(token: string): Promise<TAddressResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message || "Failed to fetch shipping addresses");
  }

  return {
    message: String(payload?.message ?? ""),
    ...normalizeAddressesResponse(payload),
  };
}
