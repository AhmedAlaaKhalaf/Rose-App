import { removeFromCartAction } from "@/lib/actions/cart.action";
import { tryNormalizeCartPayload } from "@/lib/utils/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CART_QUERY_KEY,
  optimisticRemoveItem,
  patchCartCache,
  restoreCartCache,
  setCartCache,
  snapshotCartCache,
} from "./cart-query";

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: string) => {
      const payload = await removeFromCartAction(cartItemId);
      return tryNormalizeCartPayload(payload);
    },
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const snapshots = snapshotCartCache(queryClient);

      patchCartCache(queryClient, (cart) => optimisticRemoveItem(cart, cartItemId));

      return { snapshots };
    },
    onSuccess: (cart) => {
      if (cart) {
        setCartCache(queryClient, cart);
        return;
      }

      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
    onError: (_error, _variables, context) => {
      if (context?.snapshots) {
        restoreCartCache(queryClient, context.snapshots);
      }
    },
  });
}
