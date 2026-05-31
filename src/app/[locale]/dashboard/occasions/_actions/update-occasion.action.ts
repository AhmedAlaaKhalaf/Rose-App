"use server";

import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { revalidateTag } from "next/cache";

export async function updateOccasionAction(
  occasionId: string,
  fields: {
    name: string;
    image: string;
  }
) {
  const token = await getDecodedToken();

  if (token) {
    try {
      const response = await fetch(`${process.env.API}/occasions/${occasionId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const payload = await response.json();

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      revalidateTag("occasions");

      return payload;
    } catch (error) {
      console.error(error);
      throw error instanceof Error ? error : new Error("Failed to update occasion");
    }
  } else {
    throw new Error("Unauthorized: No access token found.");
  }
}
