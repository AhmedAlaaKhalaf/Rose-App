import { useInfiniteQuery } from "@tanstack/react-query";
import { getDbOccasions } from "../_api/get-occasions";

export default function useGetOccasions(page: number) {
  const { data, error, isLoading, refetch } = useInfiniteQuery({
    queryKey: ["occasions", page],
    queryFn: ({ pageParam }) => getDbOccasions({ pageParam, limit: 6 }),
    initialPageParam: page,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage === lastPage.metadata.totalPages) return undefined;

      return lastPage.metadata.currentPage + 1;
    },
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
}

// this code Will use in case if occasions endpoint support the search but it not  support

// export default function useGetOccasions({ keyword, page }: TSearchParams) {
//   const { data, error, isLoading, refetch } = useInfiniteQuery({
//     queryKey: ["occasions", page, keyword],
//     queryFn: ({ pageParam }) => getDbOccasions({ pageParam, limit: 6, keyword }),
//     initialPageParam: page,
//     getNextPageParam: (lastPage) => {
//       if (lastPage.metadata.currentPage === lastPage.metadata.totalPages) return undefined;

//       return lastPage.metadata.currentPage + 1;
//     },
//   });

//   return {
//     data,
//     error,
//     isLoading,
//     refetch,
//   };
// }
