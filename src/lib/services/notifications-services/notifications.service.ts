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

export async function getNotifications(searchParams: GetNotificationsParams) {
  const token = await getServerSession(authOptions);

  const { pageParam = 1, limit = API_NOTIFICATIONS_LIMIT } = searchParams;

  const params = new URLSearchParams({
    page: pageParam.toString(),
    limit: limit.toString(),
  });

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

  const payload: ApiResponse<PaginatedData<TNotification[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
