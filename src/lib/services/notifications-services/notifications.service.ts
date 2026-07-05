import { TPaginatedNotifications } from "../../types/notifications";

interface GetNotificationsParams {
  pageParam?: number;
  limit?: number;
}

export async function getNotifications({
  pageParam = 1,
  limit = 10,
}: GetNotificationsParams): Promise<TPaginatedNotifications> {
  const res = await fetch(`/api/notifications?page=${pageParam}&limit=${limit}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    let errorMessage = "Error fetching notifications";

    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // ignore parse errors
    }

    throw new Error(errorMessage);
  }

  return res.json();
}
