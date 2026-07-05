import { API_PRODUCTS_LIMIT } from "../constants/global-constants";
import { SearchParams } from "../types/global";

const PRODUCT_FILTER_KEYS = ["occasionId", "minPrice", "maxPrice", "page", "sort"] as const;

function getSingleParam(
  searchParams: SearchParams | undefined,
  key: (typeof PRODUCT_FILTER_KEYS)[number]
): string | undefined {
  const value = searchParams?.[key];
  if (!value) return undefined;

  const normalized = Array.isArray(value) ? value[0] : value;
  const trimmed = normalized?.trim();
  return trimmed || undefined;
}

export function buildProductQueryParams(searchParams?: SearchParams): Record<string, string> {
  const params: Record<string, string> = {
    limit: API_PRODUCTS_LIMIT.toString(),
  };

  for (const key of PRODUCT_FILTER_KEYS) {
    const value = getSingleParam(searchParams, key);
    if (value) params[key] = value;
  }

  return params;
}

export function serializeProductFiltersKey(searchParams?: SearchParams): string {
  const params = buildProductQueryParams(searchParams);
  return new URLSearchParams(params).toString();
}
