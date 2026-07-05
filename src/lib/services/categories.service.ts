import { API_CACHE_REVALIDATE } from "../constants/api-cache";
import { TCategory } from "../types/category";

export async function getCategories(limit = 24) {
  const response = await fetch(`${process.env.API}/categories?limit=${limit}`, {
    next: { revalidate: API_CACHE_REVALIDATE },
  });

  const payload: ApiResponse<PaginatedData<TCategory[]>> = await response.json();

  if (!response.ok || payload.status === false) {
    throw new Error("message" in payload ? payload.message : "Failed to fetch categories");
  }

  return payload;
}
