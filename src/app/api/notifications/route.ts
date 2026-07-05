import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { normalizeNotificationsPage } from "@/lib/utils/notifications";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const res = await fetch(`${process.env.API}/notifications?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(
      normalizeNotificationsPage(data, Number(page), Number(limit)),
      { status: res.status }
    );
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}
