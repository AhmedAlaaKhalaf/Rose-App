import { API_PRODUCTS_LIMIT } from "../constants/global-constants";
import { SearchParams } from "../types/global";
import { TProductCard } from "../types/product";

export async function getProducts(searchParams?: SearchParams) {
  const params = new URLSearchParams({
    limit: API_PRODUCTS_LIMIT.toString(),
    fields: "imgCover,title,rateAvg,price,priceAfterDiscount,createdAt,sold,quantity",
    sort: "-sold",
    ...searchParams,
  });

  const response = await fetch(`${process.env.API}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const payload: ApiResponse<PaginatedData<TProductCard[]>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error as string);
  }

  return payload;
}
