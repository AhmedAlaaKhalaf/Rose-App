import { updateCartItemAction } from "@/lib/actions/cart.action";
import { tryNormalizeCartPayload } from "@/lib/utils/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CART_QUERY_KEY,
  optimisticUpdateQuantity,
  patchCartCache,
  restoreCartCache,
  setCartCache,
  snapshotCartCache,
} from "./cart-query";

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
      const payload = await updateCartItemAction(cartItemId, quantity);
      return tryNormalizeCartPayload(payload);
    },
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: CART_QUERY_KEY });

      const snapshots = snapshotCartCache(queryClient);

      patchCartCache(queryClient, (cart) => optimisticUpdateQuantity(cart, cartItemId, quantity));

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
