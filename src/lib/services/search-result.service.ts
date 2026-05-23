import { TProductDetails } from "../types/search";

type TSearchParams = {
  pageParam: number;
  keyword: string;
  limit: number;
  fields: string;
};

export async function getSearchResultService({ pageParam, keyword, limit, fields }: TSearchParams) {
  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/products?page=${pageParam}&keyword=${keyword}&limit=${limit}&fields=${fields}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Products");
  }

  const payload: ApiResponse<TProductDetails> = await res.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
