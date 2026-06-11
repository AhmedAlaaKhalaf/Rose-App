import { TCategory } from "../types/category";

export async function getCategories({ limit, pageNumber }: { limit: number; pageNumber: number }) {
  // fetch data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/categories?page=${pageNumber}&limit=${limit}`
  );

  // not success
  if (!res.ok) throw new Error("faild to fetch categories");

  // on success
  const payload: ApiResponse<PaginatedData<[TCategory]>> = await res.json();

  // backend error
  if ("message" in payload) throw new Error(payload.message);

  return payload;
}
