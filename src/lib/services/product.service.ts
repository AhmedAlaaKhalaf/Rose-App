import { API_DASHBOARD_PRODUCTS_LIMIT, API_PRODUCTS_LIMIT } from "../constants/global-constants";
import { TDashboardProduct } from "../types/dashboard";
import { SearchParams } from "../types/global";
import { TProduct } from "../types/product";

export async function getProducts(searchParams?: SearchParams) {
  const params = new URLSearchParams({
    limit: API_PRODUCTS_LIMIT.toString(),
    // fields: "cover,title,rating,price,discountType,createdAt,stock",
    // sort: "-sold",
    ...searchParams,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const payload: ApiResponse<PaginatedData<TProduct[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}

export async function getDashboardProducts(searchParams?: SearchParams) {
  const params = new URLSearchParams({
    limit: API_DASHBOARD_PRODUCTS_LIMIT.toString(),
    fields: "title,rateAvg,rateCount,price,sold,quantity",
    ...searchParams,
  });

  const response = await fetch(`${process.env.API}/products?${params.toString()}`, {
    next: {
      tags: ["dashboard-products"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard products");
  }

  const payload: ApiResponse<PaginatedData<TDashboardProduct[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
