import { TOccasion } from "../types/occasion";

export async function getOccasions(limit = 4) {
  const response = await fetch(`${process.env.API}/occasions?limit=${limit}`);

  const payload: ApiResponse<PaginatedData<TOccasion[]>> = await response.json();

  if ("error" in payload) throw new Error(payload.error as string);

  return payload;
}
