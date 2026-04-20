"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addReviewAction(
  fields: {
    productId: string;
    rating: number;
    headline: string;
    content: string;
  },
  userToken: string | null
) {
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

  // Add Review
  const res = await fetch(`${process.env.API}/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const payload = await res.json();

  return payload;
}
