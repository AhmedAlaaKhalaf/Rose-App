import { TUserAddress } from "../types/user-address";
import { getDecodedToken } from "@/hooks/shared/use-decoded-token";

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

  const payload: ApiResponse<{ addresses: TUserAddress[] }> = await response.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
