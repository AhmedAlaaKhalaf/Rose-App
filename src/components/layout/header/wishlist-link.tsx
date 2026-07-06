"use client";

import { Link } from "@/i18n/navigation";
import { useWishlistContext } from "@/components/providers/wishlist/wishlist.provider";
import useUserWishlist from "@/hooks/wishlist/use-user-wishlist";
import { mergeWishlistItems } from "@/lib/utils/wishlist";
import { cn } from "@/lib/utils/tailwind-merge";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function WishlistLink() {
  const { status } = useSession();
  const { items: contextItems } = useWishlistContext();
  const { data } = useUserWishlist();

  const count =
    status === "authenticated"
      ? mergeWishlistItems(data?.items ?? [], contextItems).length
      : contextItems.length;

  return (
    <Link href="/wishlist" className="relative text-zinc-700 dark:text-zinc-50 cursor-pointer">
      <Heart className="w-5 sm:w-6 h-5 sm:h-6" />
      {count > 0 && (
        <span
          className={cn(
            "-top-2 -end-2 absolute flex justify-center items-center bg-maroon-700 rounded-full min-w-5 h-5 px-1",
            "font-semibold text-white text-[10px] leading-none"
          )}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
