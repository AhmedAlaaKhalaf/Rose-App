import { getCategories } from "@/lib/apis/categories.apis";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGetCategories() {
  const { data, isPending, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam = 1 }) => getCategories({ limit: 6, pageNumber: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.payload.metadata.page < lastPage.payload.metadata.totalPages) {
        return lastPage.payload.metadata.page + 1;
      }
      return null;
    },
  });

  return { data, isPending, error, hasNextPage, fetchNextPage };
}
