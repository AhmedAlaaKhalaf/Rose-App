"use client";

import { Link } from "@/i18n/navigation";
import useUserCart from "@/hooks/cart/use-user-cart";
import { cn } from "@/lib/utils/tailwind-merge";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CartLink() {
  const { status } = useSession();
  const { data } = useUserCart();
  const count = data?.numOfCartItems ?? 0;

  return (
    <Link href="/cart" className="relative text-zinc-700 dark:text-zinc-50 cursor-pointer">
      <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6" />
      {status === "authenticated" && count > 0 && (
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
