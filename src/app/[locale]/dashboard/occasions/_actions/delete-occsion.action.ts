"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { DeleteResponse } from "@/lib/types/dashboard/occasions-db";
import { revalidateTag } from "next/cache";

export async function deleteOccasionAction(occasionId: string) {
  const token = await getDecodedToken();

  if (token) {
    try {
      const response = await fetch(`${process.env.API}/occasions/${occasionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const payload: ApiResponse<DeleteResponse> = await response.json();

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      revalidateTag("occasions");

      return payload;
    } catch (error) {
      console.log(error);
    }
  } else {
    throw new Error("Unauthorized: No access token found.");
  }
}
