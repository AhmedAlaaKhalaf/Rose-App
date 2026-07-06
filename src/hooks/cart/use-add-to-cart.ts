import { addToCartAction } from "@/lib/actions/cart.action";
import { tryNormalizeCartPayload } from "@/lib/utils/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY, setCartCache } from "./cart-query";

export default function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const payload = await addToCartAction(productId, quantity);
      return tryNormalizeCartPayload(payload);
    },
    onSuccess: (cart) => {
      if (cart) {
        setCartCache(queryClient, cart);
        return;
      }

      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    },
  });
}
