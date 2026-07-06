import { getNotifications } from "@/lib/services/notifications-services/notifications.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useNotifications(token: string | undefined) {
  return useInfiniteQuery({
    queryKey: ["notifications", token],
    queryFn: ({ pageParam = 1 }) => getNotifications({ pageParam }),
    initialPageParam: 1,
    enabled: !!token,

    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage < lastPage.metadata.totalPages) {
        return lastPage.metadata.currentPage + 1;
      }

      return undefined;
    },
  });
}
