"use client";

import { useMergeGuestCart } from "@/hooks/cart/use-merge-guest-cart";

export default function MergeGuestCartProvider({ children }: { children: React.ReactNode }) {
  // merge guest cart
  useMergeGuestCart();

  return <>{children}</>;
}
