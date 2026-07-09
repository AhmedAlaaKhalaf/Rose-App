import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TCategoryStatistics } from "../types/statistics";
import { formatApiError } from "../utils/api-error";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as UnknownRecord) : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function resolveApiBaseUrl() {
  return process.env.API || process.env.NEXT_PUBLIC_API || "";
}

function normalizeCategoryStatistics(payload: unknown): TCategoryStatistics {
  const root = asRecord(payload);
  const rootData = asRecord(root.data);
  const rootPayload = asRecord(root.payload);
  const payloadData = asRecord(rootPayload.data);
  const stats = asArray(root.statistics);
  const payloadStats = asArray(rootPayload.statistics);
  const dataStats = asArray(rootData.statistics);
  const payloadDataStats = asArray(payloadData.statistics);
  const categories = asArray(root.topCategories);
  const payloadCategories = asArray(rootPayload.topCategories);
  const dataCategories = asArray(rootData.topCategories);
  const payloadDataCategories = asArray(payloadData.topCategories);

  const source =
    payloadStats.length > 0
      ? payloadStats
      : payloadDataStats.length > 0
        ? payloadDataStats
        : dataStats.length > 0
          ? dataStats
          : stats.length > 0
            ? stats
            : payloadCategories.length > 0
              ? payloadCategories
              : payloadDataCategories.length > 0
                ? payloadDataCategories
                : dataCategories.length > 0
                  ? dataCategories
                  : categories;

  return {
    statistics: source.map((item, index) => {
      const row = asRecord(item);

      return {
        _id: asString(row._id) || asString(row.id) || `category-${index}`,
        name: asString(row.name) || asString(row.title),
        totalProducts: asNumber(row.totalProducts) || asNumber(row.productsCount),
        totalRevenue: asNumber(row.totalRevenue) || asNumber(row.revenue),
      };
    }),
  };
}

function emptyCategoryStatistics(): TCategoryStatistics {
  return { statistics: [] };
}

export async function getCategoryStatistics() {
  const token = await getDecodedToken();
  const baseUrl = resolveApiBaseUrl();

  if (!token) {
    throw new Error("Unauthorized: missing access token");
  }

  if (!baseUrl) {
    throw new Error("Missing API base URL");
  }

  const response = await fetch(`${baseUrl}/admin/statistics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    // Non-admin users can still open dashboard; fallback to legacy endpoint.
    if (response.status === 401 || response.status === 403 || response.status === 404) {
      const fallbackResponse = await fetch(`${baseUrl}/statistics/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fallbackPayload = await fallbackResponse.json();

      if (!fallbackResponse.ok) {
        const fallbackError = formatApiError(fallbackPayload, "Get Category Statistics Failed");
        if (fallbackResponse.status === 404 || fallbackError.toLowerCase().includes("route not found")) {
          return emptyCategoryStatistics();
        }
        throw new Error(fallbackError);
      }

      return normalizeCategoryStatistics(fallbackPayload);
    }

    throw new Error(formatApiError(payload, "Get Category Statistics Failed"));
  }

  return normalizeCategoryStatistics(payload);
}
