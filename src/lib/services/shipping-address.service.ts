import { TAddressResponse } from "../types/addresses";

export async function getShippingAddress(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch shipping addresses");

  const payload: ApiResponse<TAddressResponse> = await response.json();

  if ("error" in payload) throw new Error(payload.error as string);

  return payload;
}
