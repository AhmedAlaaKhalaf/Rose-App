import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const authPages = ["/login", "/register", "/forgot-password"];
const publicPages = ["/", "/products", "/products/[^/]+"];

// Matches product detail paths: /products/:id or /:locale/products/:id
const productDetailRegex = (locales: readonly string[]) =>
  RegExp(`^(/(${locales.join("|")}))?/products/[^/]+/?$`, "i");

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default function middleware(req: NextRequest) {
  const { locales } = routing;
  const pathname = req.nextUrl.pathname;

  const buildRegex = (pages: string[]) =>
    RegExp(
      `^(/(${locales.join("|")}))?(${pages
        .flatMap((p) => (p === "/" ? ["", "/"] : p))
        .join("|")})/?$`,
      "i"
    );

  const isPublicPage =
    buildRegex(publicPages).test(pathname) || productDetailRegex(locales).test(pathname);
  const isAuthPage = buildRegex(authPages).test(pathname);

  // Check for session token
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  // Check for rememberMe cookie (session cookie that expires when browser closes)
  const rememberMeCookie = req.cookies.get("rememberMe")?.value;

  // If session token exists but rememberMe cookie is missing:
  // This means the browser was closed and the session cookie expired
  // But the token cookie still exists because it had maxAge
  // This indicates user logged in WITHOUT "Remember Me" and closed browser
  // We should clear the session and redirect to login
  if (sessionToken && !rememberMeCookie) {
    console.log("Session token exists but rememberMe cookie is missing - clearing session");

    const isSecure = process.env.NODE_ENV === "production";
    const cookieName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";

    // Redirect to login and clear the session cookie
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const response = NextResponse.redirect(url);

    // Delete the session cookie
    response.cookies.set(cookieName, "", {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  }

  if (sessionToken && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = `/products`;
    return NextResponse.redirect(url);
  }

  if (isPublicPage) {
    return handleI18nRouting(req);
  }

  if (isAuthPage) {
    return handleI18nRouting(req);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
