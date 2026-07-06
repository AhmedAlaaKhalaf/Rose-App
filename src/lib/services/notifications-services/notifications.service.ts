import { API_NOTIFICATIONS_LIMIT } from "@/lib/constants/global-constants";
import { TNotification } from "../../types/notifications";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface GetNotificationsParams {
  pageParam?: number;
  limit?: number;
  type?: "ORDER" | "PROMOTION" | "SYSTEM" | "REVIEW" | "OTHER";
  isRead?: boolean;
}

export async function getNotifications({
  pageParam = 1,
  limit = 10,
}: GetNotificationsParams): Promise<TPaginatedNotifications> {
  const res = await fetch(`/api/notifications?page=${pageParam}&limit=${limit}`, {
    cache: "no-store",
    credentials: "include",
  });

  const { pageParam = 1, limit = API_NOTIFICATIONS_LIMIT } = searchParams;

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // ignore parse errors
    }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/notifications?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
}
