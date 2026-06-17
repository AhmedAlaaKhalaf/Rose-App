"use client";

import { HeartMinus, HeartPlus } from "lucide-react";

export default function AddToWishlist(wishlist: { wishlist: boolean }) {
  return (
    <span className="bg-zinc-100 dark:bg-zinc-800 dark:border dark:border-zinc-500 rounded-lg flex justify-center items-center px-3 py-2 cursor-pointer group">
      {wishlist ? (
        <HeartPlus
          size={25}
          className="text-zinc-800 dark:text-zinc-50 group-hover:text-primary group-dark:hover:text-primary transition-colors duration-300"
        />
      ) : (
        <HeartMinus
          size={25}
          className="text-zinc-800 dark:text-zinc-50 group-hover:text-primary group-dark:hover:text-primary transition-colors duration-300"
        />
      )}
    </span>
  );
}
