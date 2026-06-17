"use client";

import { addToCartAction } from "@/app/[locale]/(website)/products/_actions/add-to-cart.action";
import { clearGuestCart, getGuestCart } from "@/lib/utils/cart/guest-cart";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const GUEST_MERGED_KEY = "guest_cart_merged";

export function useMergeGuestCart() {
  const { status } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status !== "authenticated") return;

    const merged = localStorage.getItem(GUEST_MERGED_KEY);
    const guestCart = getGuestCart();

    if (!merged && guestCart.length > 0) {
      (async () => {
        for (const item of guestCart) {
          await addToCartAction(item);
        }

        localStorage.setItem(GUEST_MERGED_KEY, "true");
        clearGuestCart();

        queryClient.invalidateQueries({ queryKey: ["cart"] });
      })();
    }
  }, [status, queryClient]);
}
