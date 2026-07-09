import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TOverAllStatistics } from "@/lib/types/statistics";
import { formatApiError } from "@/lib/utils/api-error";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as UnknownRecord) : {};
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function resolveApiBaseUrl() {
  return process.env.API || process.env.NEXT_PUBLIC_API || "";
}

function normalizeOverAllStatistics(payload: unknown): TOverAllStatistics {
  const root = asRecord(payload);
  const rootData = asRecord(root.data);
  const rootPayload = asRecord(root.payload);
  const payloadData = asRecord(rootPayload.data);
  const stats = asRecord(root.statistics);
  const payloadStats = asRecord(rootPayload.statistics);
  const dataStats = asRecord(rootData.statistics);
  const payloadDataStats = asRecord(payloadData.statistics);

  // New admin statistics endpoint may return overview totals under different keys.
  const source =
    payloadStats.totalProducts !== undefined ||
    payloadDataStats.totalProducts !== undefined ||
    dataStats.totalProducts !== undefined
      ? payloadStats.totalProducts !== undefined
        ? payloadStats
        : payloadDataStats.totalProducts !== undefined
          ? payloadDataStats
          : dataStats
      : stats;

  return {
    statistics: {
      totalProducts: asNumber(source.totalProducts),
      totalOrders: asNumber(source.totalOrders),
      totalCategories: asNumber(source.totalCategories),
      totalRevenue: asNumber(source.totalRevenue),
    },
  };
}

function emptyOverAllStatistics(): TOverAllStatistics {
  return {
    statistics: {
      totalProducts: 0,
      totalOrders: 0,
      totalCategories: 0,
      totalRevenue: 0,
    },
  };
}

export async function getOverAllStatistics() {
  const token = await getDecodedToken();
  const baseUrl = resolveApiBaseUrl();

  if (!token) {
    throw new Error("Unauthorized: missing access token");
  }

  if (!baseUrl) {
    throw new Error("Missing API base URL");
  }

  const response = await fetch(`${baseUrl}/admin/statistics`, {
    next: {
      tags: ["over-all-statistics"],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    // Non-admin users can still open dashboard; fallback to legacy endpoint.
    if (response.status === 401 || response.status === 403 || response.status === 404) {
      const fallbackResponse = await fetch(`${baseUrl}/statistics/overall`, {
        next: {
          tags: ["over-all-statistics"],
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fallbackPayload = await fallbackResponse.json();

      if (!fallbackResponse.ok) {
        const fallbackError = formatApiError(fallbackPayload, "Get Overall Statistics Failed");
        if (fallbackResponse.status === 404 || fallbackError.toLowerCase().includes("route not found")) {
          return emptyOverAllStatistics();
        }
        throw new Error(fallbackError);
      }

      return normalizeOverAllStatistics(fallbackPayload);
    }

    throw new Error(formatApiError(payload, "Get Overall Statistics Failed"));
  }

  return normalizeOverAllStatistics(payload);
}
