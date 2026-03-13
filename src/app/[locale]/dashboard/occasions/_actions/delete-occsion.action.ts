"use server";

import { DeleteResponse } from "@/lib/types/dashboard/occasions-db";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteOccasionAction(occasionId: string, userToken: string | null) {
  let accessToken;

  // Build a minimal "req" object for getToken using cookies
  const cookieStore = cookies();
  const isSecure = process.env.NODE_ENV === "production";
  const cookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
  const rawToken = cookieStore.get(cookieName)?.value;

  // Get Token
  const token = await getToken({
    req: {
      cookies: {
        [cookieName]: rawToken,
      },
    } as any,
  });

  if (!userToken) {
    accessToken = token?.accessToken;
  } else {
    accessToken = userToken;
  }

  if (!accessToken) {
    return { error: "Unauthorized: No access token found." };
  }

  // Update Occasion
  const response = await fetch(`${process.env.API}/occasions/${occasionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload: ApiResponse<DeleteResponse> = await response.json();

  return payload;
}
