"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TUserAddress, TUserAddressDetails } from "@/lib/types/user-address";
import { revalidateTag } from "next/cache";

export async function addUserAddressAction(newAddress: TUserAddressDetails) {
  const token = await getDecodedToken();

  if (token) {
    const response = await fetch(`${process.env.API}/addresses`, {
      method: "PATCH",
      body: JSON.stringify({
        street: newAddress.street,
        phone: newAddress.phone,
        city: newAddress.city,
        lat: newAddress.lat,
        long: newAddress.long,
        username: newAddress.username,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag("user-addresses");

    const payload: ApiResponse<{ address: TUserAddress[] }> = await response.json();

    if ("error" in payload) {
      console.log(payload.error);
    }

    return payload;
  } else {
    throw new Error("Unauthorized");
  }
}
export async function updateUserAddressAction(updatedAddress: TUserAddress) {
  const token = await getDecodedToken();

  if (token) {
    const response = await fetch(`${process.env.API}/addresses/${updatedAddress._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        street: updatedAddress.street,
        phone: updatedAddress.phone,
        city: updatedAddress.city,
        lat: updatedAddress.lat,
        long: updatedAddress.long,
        username: updatedAddress.username,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag("user-addresses");

    const payload: ApiResponse<{ addresses: TUserAddress[] }> = await response.json();

    if ("error" in payload) {
      console.log(payload.error);
    }

    return payload;
  } else {
    throw new Error("Unauthorized");
  }
}

export async function deleteUserAddressAction(addressId: string) {
  const token = await getDecodedToken();

  if (token) {
    const response = await fetch(`${process.env.API}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    revalidateTag("user-addresses");

    if (!response.ok) {
      throw new Error("Failed to update address");
    }

    const payload: ApiResponse<{ address: TUserAddress[] }> = await response.json();

    if ("error" in payload) {
      console.log(payload.error);
    }

    return payload;
  } else {
    throw new Error("Unauthorized");
  }
}
