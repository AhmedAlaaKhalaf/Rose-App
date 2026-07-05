"use server";

import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

type AddReviewBody = {
  productId: string;
  rating: number;
  headline: string;
  content: string;
};

export async function addReviewAction(fields: AddReviewBody, userToken: string | null) {
  const cookieStore = cookies();
  const isSecure = process.env.NODE_ENV === "production";
  const cookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
  const rawToken = cookieStore.get(cookieName)?.value;

  const token = await getToken({
    req: {
      cookies: {
        [cookieName]: rawToken,
      },
    } as any,
  });

  const accessToken = userToken ?? token?.accessToken;

  if (!accessToken) {
    return { status: false, message: "Unauthorized: No access token found." };
  }

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
