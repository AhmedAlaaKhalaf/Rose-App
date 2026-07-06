"use server";

import { authOptions } from "@/auth";
import { TNotification } from "@/lib/types/notifications";
import { getServerSession } from "next-auth";

export async function markNotificationAsRead(id: string) {
  const token = await getServerSession(authOptions);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notifications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isRead: true,
    }),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark this notification id");
  }

  const payload: ApiResponse<DataResponse<{ notification: TNotification }>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function markAllNotificationsAsRead() {
  const token = await getServerSession(authOptions);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/notifications/mark-all-read`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark all notification as read");
  }

  const payload: ApiResponse<{ message: string }> = await response.json();

  if (!payload.status) {
    const message = "message" in payload ? payload.message : undefined;
    throw new Error(message || "Failed to mark all notification as read");
  }

  return payload;
}
