import { TOrderStatistics } from "../types/order-statistics";
import { formatApiError } from "../utils/api-error";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as UnknownRecord) : {};
}

function asArray<T = unknown>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function normalizeOrderStatistics(raw: unknown): TOrderStatistics {
  const root = asRecord(raw);
  const rootData = asRecord(root.data);
  const rootPayload = asRecord(root.payload);
  const payloadData = asRecord(rootPayload.data);
  const statistics = asRecord(root.statistics);
  const dataStatistics = asRecord(rootData.statistics);
  const payloadStatistics = asRecord(rootPayload.statistics);
  const payloadDataStatistics = asRecord(payloadData.statistics);

  const source =
    Object.keys(payloadStatistics).length > 0
      ? payloadStatistics
      : Object.keys(payloadDataStatistics).length > 0
        ? payloadDataStatistics
        : Object.keys(dataStatistics).length > 0
          ? dataStatistics
          : statistics;

  return {
    message: String(root.message ?? rootPayload.message ?? ""),
    statistics: {
      ordersByStatus: asArray(source.ordersByStatus),
      dailyRevenue: asArray(source.dailyRevenue),
      monthlyRevenue: asArray(source.monthlyRevenue),
    },
  };
}

function emptyOrderStatistics(): TOrderStatistics {
  return {
    message: "",
    statistics: {
      ordersByStatus: [],
      dailyRevenue: [],
      monthlyRevenue: [],
    },
  };
}

function resolveApiBaseUrl() {
  return process.env.API || process.env.NEXT_PUBLIC_API || "";
}

async function fetchLegacyOrderStatistics(baseUrl: string, token: string): Promise<TOrderStatistics> {
  const fallbackResponse = await fetch(`${baseUrl}/statistics/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const fallbackPayload = await fallbackResponse.json();

  if (!fallbackResponse.ok) {
    const fallbackError = formatApiError(fallbackPayload, "Failed to fetch order statistics");
    if (fallbackResponse.status === 404 || fallbackError.toLowerCase().includes("route not found")) {
      return emptyOrderStatistics();
    }
    throw new Error(fallbackError);
  }

  return normalizeOrderStatistics(fallbackPayload);
}

export async function getOrderStatus(
  token: string,
  role?: "USER" | "ADMIN" | "SUPER_ADMIN"
): Promise<TOrderStatistics> {
  const baseUrl = resolveApiBaseUrl();

  // Avoid noisy 403 for non-admin users by skipping admin endpoint.
  if (role && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return fetchLegacyOrderStatistics(baseUrl, token);
  }

  const response = await fetch(`${baseUrl}/admin/statistics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const payload = await response.json();

  if (!response.ok) {
    // Fallback for non-admin users or environments without /admin/statistics.
    if (response.status === 401 || response.status === 403 || response.status === 404) {
      return fetchLegacyOrderStatistics(baseUrl, token);
    }

    throw new Error(formatApiError(payload, "Failed to fetch order statistics"));
  }

  return normalizeOrderStatistics(payload);
}
