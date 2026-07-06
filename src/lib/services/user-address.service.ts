import { TUserAddress } from "../types/user-address";
import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { normalizeAddressesResponse } from "../utils/addresses";

export async function getUserAddresses() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/addresses`, {
    next: {
      tags: ["user-addresses"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message || "Failed to fetch addresses");
  }

  return normalizeAddressesResponse(payload) as { addresses: TUserAddress[] };
}
