import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserCart } from "@/lib/services/user-cart.service";

export default function useUserCart() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["user-cart", session?.accessToken],
    queryFn: () => {
      if (!session?.accessToken) {
        throw new Error("You must be logged in to view your cart");
      }

      return getUserCart();
    },
    enabled: !!session?.accessToken,
  });
}

