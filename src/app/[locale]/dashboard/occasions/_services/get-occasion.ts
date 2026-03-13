import { TOccasionDetailsResponse } from "@/lib/types/dashboard/occasions-db";

export async function getOccasionData(id: string) {
  console.log(id);

  const response = await fetch(`${process.env.API}/occasions/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch occasion details");
  }

  const payload: ApiResponse<TOccasionDetailsResponse> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error as string);
  }

  console.log(payload);

  return payload;
}
