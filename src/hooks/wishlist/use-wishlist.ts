import { addToWishlistAction, removeFromWishlistAction } from "@/lib/actions/wishlist.action";
import { mergeWishlistItems, tryNormalizeWishlistPayload } from "@/lib/utils/wishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  optimisticRemoveWishlistItem,
  patchWishlistCache,
  restoreWishlistCache,
  setWishlistCache,
  snapshotWishlistCache,
  WISHLIST_QUERY_KEY,
} from "./wishlist-query";

export function useWishlistToAdd() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addToWishlistAction(productId),
    onSuccess: (payload) => {
      const normalized = tryNormalizeWishlistPayload(payload);
      const current = queryClient.getQueriesData({ queryKey: WISHLIST_QUERY_KEY })[0]?.[1];

      if (normalized?.items.length) {
        const merged = mergeWishlistItems(
          current && typeof current === "object" && "items" in current
            ? (current as { items: typeof normalized.items }).items
            : [],
          normalized.items
        );

        setWishlistCache(queryClient, { items: merged, count: merged.length });
        return;
      }

      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
  });
}

export function useWishlistToRemove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistItemId: string) => removeFromWishlistAction(wishlistItemId),
    onMutate: async (wishlistItemId) => {
      await queryClient.cancelQueries({ queryKey: WISHLIST_QUERY_KEY });

      const snapshots = snapshotWishlistCache(queryClient);

      patchWishlistCache(queryClient, (wishlist) =>
        optimisticRemoveWishlistItem(wishlist, wishlistItemId)
      );

      return { snapshots };
    },
    onSuccess: (payload) => {
      const normalized = tryNormalizeWishlistPayload(payload);

      if (normalized) {
        setWishlistCache(queryClient, normalized);
        return;
      }

      queryClient.invalidateQueries({ queryKey: WISHLIST_QUERY_KEY });
    },
    onError: (_error, _variables, context) => {
      if (context?.snapshots) {
        restoreWishlistCache(queryClient, context.snapshots);
      }
    },
  });
}
