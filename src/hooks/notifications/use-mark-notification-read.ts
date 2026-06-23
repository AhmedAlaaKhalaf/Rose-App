import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TNotification } from "@/lib/types/notifications";
import { markNotificationAsRead } from "@/lib/actions/notification.action";

export default function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  const { mutate: markRead } = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onMutate: async (id: string) => {
      // cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      // snapshot previous value
      const previousData = queryClient.getQueryData<TNotification[]>(["notifications"]);

      // optimistically update
      queryClient.setQueryData<TNotification[]>(["notifications"], (old) => {
        if (!old) return old;

        return {
          ...old.map((n) => (id.includes(n.id) ? { ...n, isRead: true } : n)),
        };
      });

      return { previousData };
    },
    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notifications"], context.previousData);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<TNotification[]>(["notifications"], (old) => {
        if (!old) return old;

        return [...old, data.payload.notification];
      });
    },
  });

  return { markRead };
}
