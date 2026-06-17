import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecodedToken() {
  // cookies name
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const token = cookies().get(cookieName)?.value || "";
  if (!token) {
    return null;
  }

  const secret = process.env.NEXTAUTH_SECRET;

  const decodedToken = await decode({
    token,
    secret: secret as string,
  });

  return decodedToken?.accessToken ?? null;
}
