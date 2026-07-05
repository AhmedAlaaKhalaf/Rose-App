import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserCart } from "@/lib/services/user-cart.service";
import { getCartQueryKey } from "./cart-query";

export default function useUserCart() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: getCartQueryKey(session?.accessToken),
    queryFn: getUserCart,
    enabled: status === "authenticated" && !!session?.accessToken,
  });
}
