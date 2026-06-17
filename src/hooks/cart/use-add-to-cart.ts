import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { addToCartAction } from "@/app/[locale]/(website)/products/_actions/add-to-cart.action";
import { TAddToCartPayload } from "@/lib/types/add-to-cart";
import { addToGuestCart } from "@/lib/utils/cart/guest-cart";
export function useAddToCart() {
  const queryClient = useQueryClient();
  const { status } = useSession();

  return useMutation({
    mutationFn: async (payload: TAddToCartPayload) => {
      //  Guest
      if (status === "unauthenticated") {
        return addToGuestCart(payload);
      }

      // Authenticated
      if (status === "authenticated") {
        return await addToCartAction(payload);
      }

      // loading
      throw new Error("Please wait...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
