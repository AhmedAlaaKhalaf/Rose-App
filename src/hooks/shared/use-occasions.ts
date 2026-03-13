import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getOccasions } from "@/lib/apis/occasions.api";

export default function useOccasions() {
  const { isPending, data, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["occasions"],
      queryFn: ({ pageParam = 1 }) => getOccasions({ pageParam, limit: 6 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.metadata.currentPage < lastPage.metadata.totalPages) {
          return lastPage.metadata.currentPage + 1;
        }
        return undefined;
      },
    });

  return {
    isPending,
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
