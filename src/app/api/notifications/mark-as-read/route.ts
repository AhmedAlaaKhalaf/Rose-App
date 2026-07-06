import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const notificationIds = body?.notificationIds;

    if (!Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json({ message: "notificationIds is required" }, { status: 400 });
    }

    const results = await Promise.all(
      notificationIds.map(async (id: string) => {
        const res = await fetch(`${process.env.API}/notifications/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isRead: true }),
        });

        return res.json();
      })
    );

    const lastResult = results[results.length - 1] as { payload?: { unreadCount?: number } };
    const unreadCount =
      lastResult?.payload?.unreadCount ??
      (results[0] as { unreadCount?: number })?.unreadCount ??
      0;

    return NextResponse.json({
      message: "Notifications marked as read",
      modifiedCount: notificationIds.length,
      unreadCount,
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ error: "Failed to mark notifications as read" }, { status: 500 });
  }
}
