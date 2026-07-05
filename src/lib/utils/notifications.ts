import { TPaginatedNotifications } from "@/lib/types/notifications";

type RawRecord = Record<string, unknown>;

function asRecord(value: unknown): RawRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RawRecord) : {};
}

export function normalizeNotificationsPage(
  raw: unknown,
  page: number,
  limit: number
): TPaginatedNotifications {
  const response = asRecord(raw);
  const payload = asRecord(response.payload);
  const nested = asRecord(payload.data);

  const notifications = (
    Array.isArray(payload.data)
      ? payload.data
      : Array.isArray(nested.notifications)
        ? nested.notifications
        : Array.isArray(payload.notifications)
          ? payload.notifications
          : Array.isArray(response.notifications)
            ? response.notifications
            : []
  ) as TPaginatedNotifications["notifications"];

  const metadataSource = asRecord(
    payload.metadata ?? nested.metadata ?? response.metadata ?? payload
  );

  return {
    message: String(response.message ?? payload.message ?? ""),
    notifications,
    metadata: {
      currentPage: Number(metadataSource.page ?? metadataSource.currentPage ?? page),
      totalPages: Number(metadataSource.totalPages ?? 1),
      limit: Number(metadataSource.limit ?? limit),
      totalItems: Number(metadataSource.total ?? metadataSource.totalItems ?? notifications.length),
      unreadCount: Number(
        metadataSource.unreadCount ?? payload.unreadCount ?? response.unreadCount ?? 0
      ),
    },
  };
}
