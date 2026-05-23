import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TCategoryStatistics } from "../types/statistics";

export async function getCategoryStatistics() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/statistics/categories`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Get Category Statistics Failed");
  }

  const payload: ApiResponse<TCategoryStatistics> = await response.json();

  if ("error" in payload) throw new Error(payload.error);

  return payload;
}
