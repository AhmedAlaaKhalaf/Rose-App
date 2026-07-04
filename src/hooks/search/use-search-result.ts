import { getSearchResultService } from "@/lib/services/search-result.service";
import { useInfiniteQuery } from "@tanstack/react-query";

type TSearchParams = {
  keyword: string;
  limit: number;
  fields: string;
  open: boolean;
};

export function useSearchResult({ keyword, limit, fields, open }: TSearchParams) {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ["searchResult", keyword, limit, fields],
    queryFn: async ({ pageParam = 1 }) =>
      await getSearchResultService({ pageParam, keyword, limit, fields }),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.payload.metadata.page === lastPage.payload.metadata.totalPages) return undefined;

      return lastPage.payload.metadata.page + 1;
    },
    enabled: open,
  });

  return { result: data, error, fetchNextPage, hasNextPage, isFetching, isLoading };
}
