import { TUserWishlist } from "@/lib/types/wishlist";
import { QueryClient } from "@tanstack/react-query";

export const WISHLIST_QUERY_KEY = ["user-wishlist"] as const;

export function getWishlistQueryKey(accessToken?: string) {
  return [...WISHLIST_QUERY_KEY, accessToken] as const;
}

export function setWishlistCache(queryClient: QueryClient, data: TUserWishlist) {
  queryClient.setQueriesData<TUserWishlist>({ queryKey: WISHLIST_QUERY_KEY }, data);
}

export function patchWishlistCache(
  queryClient: QueryClient,
  updater: (wishlist: TUserWishlist) => TUserWishlist
) {
  queryClient.setQueriesData<TUserWishlist>({ queryKey: WISHLIST_QUERY_KEY }, (old) =>
    old ? updater(old) : old
  );
}

export function snapshotWishlistCache(queryClient: QueryClient) {
  return queryClient.getQueriesData<TUserWishlist>({ queryKey: WISHLIST_QUERY_KEY });
}

export function restoreWishlistCache(
  queryClient: QueryClient,
  snapshots: ReturnType<typeof snapshotWishlistCache>
) {
  snapshots.forEach(([key, data]) => queryClient.setQueryData(key, data));
}

export function optimisticRemoveWishlistItem(
  wishlist: TUserWishlist,
  wishlistItemId: string
): TUserWishlist {
  const items = wishlist.items.filter((item) => item.id !== wishlistItemId);

  return {
    items,
    count: items.length,
  };
}
