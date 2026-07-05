"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TAddressInput } from "@/lib/types/addresses";
import { TUserAddress } from "@/lib/types/user-address";
import { toAddressRequestBody } from "@/lib/utils/addresses";
import { revalidateTag } from "next/cache";

async function parseAddressResponse(response: Response) {
  const payload = await response.json();

  if (!response.ok || payload?.status === false) {
    const validationMessage = Array.isArray(payload?.errors)
      ? payload.errors
          .map((error: { path?: string; message?: string; messages?: string[] }) => {
            if (error.messages?.length) {
              return `${error.path}: ${error.messages.join(", ")}`;
            }

            return error.message ? `${error.path}: ${error.message}` : "";
          })
          .filter(Boolean)
          .join("; ")
      : "";

    throw new Error(validationMessage || payload?.message || response.statusText || "Address request failed");
  }

  return payload;
}

export async function addUserAddressAction(newAddress: TAddressInput) {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/addresses`, {
    method: "POST",
    body: JSON.stringify(toAddressRequestBody(newAddress)),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload = await parseAddressResponse(response);

  revalidateTag("user-addresses");

  return payload;
}

export async function updateUserAddressAction(updatedAddress: TUserAddress) {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/addresses/${updatedAddress.id}`, {
    method: "PATCH",
    body: JSON.stringify(toAddressRequestBody(updatedAddress)),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload = await parseAddressResponse(response);

  revalidateTag("user-addresses");

  return payload;
}

export async function deleteUserAddressAction(addressId: string) {
  const token = await getDecodedToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const payload = await parseAddressResponse(response);

  revalidateTag("user-addresses");

  return payload;
}
