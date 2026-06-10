import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { TOverAllStatistics } from "@/lib/types/statistics";

export async function getOverAllStatistics() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/statistics/overall`, {
    next: {
      tags: ["over-all-statistics"],
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Get Overall Statistics Failed");
  }

  const payload: ApiResponse<TOverAllStatistics> = await response.json();

  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
