import { TProduct } from "../types/product";
import { TProductDetails } from "../types/search";

type TSearchParams = {
  pageParam: number;
  keyword: string;
  limit: number;
  fields: string;
};

export async function getSearchResultService({ pageParam, keyword, limit, fields }: TSearchParams) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: pageParam.toString(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch Products");
  }

  const payload: ApiResponse<PaginatedData<TProduct>> = await res.json();

  if ("message" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
