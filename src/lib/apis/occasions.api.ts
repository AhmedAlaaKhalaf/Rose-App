import { TOccasion } from "../types/occasion";

export async function getOccasions({
  pageParam = 1,
  limit = 6,
}: { pageParam?: number; limit?: number } = {}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/occasions?page=${pageParam}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch occasions");
  }

  const payload: ApiResponse<PaginatedData<TOccasion[]>> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  const sortedOccasions = [...payload.payload.data].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  return { ...payload, occasions: sortedOccasions };
}
