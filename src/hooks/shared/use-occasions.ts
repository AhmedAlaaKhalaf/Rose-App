import { useInfiniteQuery } from "@tanstack/react-query";
import { getOccasions } from "@/lib/apis/occasions.api";

export default function useOccasions() {
  const { isPending, data, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["occasions"],
      queryFn: ({ pageParam = 1 }) => getOccasions({ pageParam, limit: 6 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.payload.metadata.page < lastPage.payload.metadata.totalPages) {
          return lastPage.payload.metadata.page + 1;
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
