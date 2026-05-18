import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const body = await req.json();

  if (
    !body?.notificationIds ||
    !Array.isArray(body?.notificationIds) ||
    body?.notificationIds.length === 0
  ) {
    return NextResponse.json({ message: "notificationIds is required" }, { status: 400 });
  }

  const res = await fetch(process.env.NEXT_API_BASE + "/notifications/mark-read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
