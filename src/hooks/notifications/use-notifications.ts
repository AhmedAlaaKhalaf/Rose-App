import { getNotifications } from "@/lib/services/notifications-services/notifications.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useNotifications(token: string | undefined) {
  return useInfiniteQuery({
    queryKey: ["notifications", token],
    queryFn: ({ pageParam = 1 }) => getNotifications({ pageParam }),
    initialPageParam: 1,
    enabled: !!token,

    getNextPageParam: (lastPage) => {
      if (lastPage.payload.metadata.page < lastPage.payload.metadata.totalPages) {
        return lastPage.payload.metadata.page + 1;
      }

      return undefined;
    },
  });
}
