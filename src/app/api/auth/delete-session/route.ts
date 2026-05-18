import { NextResponse } from "next/server";

/**
 * This endpoint deletes the NextAuth session cookie.
 * Called when a user without "Remember Me" opens a new tab after closing the previous one.
 */
export async function POST() {
  try {
    const isSecure = process.env.NODE_ENV === "production";
    const cookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";

    const response = NextResponse.json({ success: true });

    // Delete the session cookie
    response.cookies.set(cookieName, "", {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Expire immediately
    });

    // Also delete CSRF token cookie
    const csrfCookieName = isSecure ? "__Host-next-auth.csrf-token" : "next-auth.csrf-token";
    response.cookies.set(csrfCookieName, "", {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    // Delete callback URL cookie
    const callbackCookieName = isSecure
      ? "__Secure-next-auth.callback-url"
      : "next-auth.callback-url";
    response.cookies.set(callbackCookieName, "", {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Error deleting session:", error);
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}
