import { TAllOccasions } from "@/lib/types/all-occasions";

export async function getDbOccasions({
  pageParam,
  limit = 6,
  keyword, // will use in case the endpoint support the search tec.
}: { pageParam?: number; limit?: number; keyword?: string } = {}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/occasions?page=${pageParam}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch occasions");
  }

  const payload: ApiResponse<TAllOccasions> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error as string);
  }

  const sortedOccasions = [...payload.occasions].sort((a, b) => b.productsCount - a.productsCount);

  return { ...payload, occasions: sortedOccasions };
}
