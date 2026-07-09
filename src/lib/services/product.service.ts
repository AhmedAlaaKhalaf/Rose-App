import { API_DASHBOARD_PRODUCTS_LIMIT } from "../constants/global-constants";
import { API_CACHE_REVALIDATE } from "../constants/api-cache";
import { TDashboardProduct } from "../types/dashboard";
import { SearchParams } from "../types/global";
import { TProductCard } from "../types/product";
import { buildProductQueryParams } from "../utils/product-filters";
import { formatApiError } from "../utils/api-error";

export async function getProducts(searchParams?: SearchParams) {
  const params = new URLSearchParams(buildProductQueryParams(searchParams));

  const response = await fetch(`${process.env.API}/products?${params.toString()}`, {
    next: { revalidate: API_CACHE_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const payload: ApiResponse<PaginatedData<TProductCard[]>> = await response.json();

  if (payload.status === false) {
    throw new Error("message" in payload ? payload.message : "Failed to fetch products");
  }

  return payload;
}

export async function getProductsWithOccasionFallback(occasionId?: string) {
  if (!occasionId) {
    return getProducts();
  }

  const filtered = await getProducts({ occasionId });

  if (filtered.payload.data.length > 0) {
    return filtered;
  }

  return getProducts();
}

export async function getDashboardProducts(searchParams?: SearchParams) {
  const params = new URLSearchParams({
    limit: API_DASHBOARD_PRODUCTS_LIMIT.toString(),
    ...searchParams,
  });

  const response = await fetch(`${process.env.API}/products?${params.toString()}`, {
    next: {
      tags: ["dashboard-products"],
    },
  });

  const payload: ApiResponse<PaginatedData<TDashboardProduct[]>> = await response.json();

  if (!response.ok || "message" in payload) {
    throw new Error(formatApiError(payload, "Failed to fetch dashboard products"));
  }

  return payload;
}
