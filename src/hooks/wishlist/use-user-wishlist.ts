import { getUserWishlist } from "@/lib/services/user-wishlist.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getWishlistQueryKey } from "./wishlist-query";

export default function useUserWishlist() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: getWishlistQueryKey(session?.accessToken),
    queryFn: getUserWishlist,
    enabled: status === "authenticated" && !!session?.accessToken,
  });
}
