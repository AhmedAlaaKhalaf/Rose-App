"use client";

import { useWishlistContext } from "@/components/providers/wishlist/wishlist.provider";
import { useWishlistToAdd, useWishlistToRemove } from "@/hooks/wishlist/use-wishlist";
import { TProductCard } from "@/lib/types/product";
import { productToWishlistItem, mergeWishlistItems, tryNormalizeWishlistPayload } from "@/lib/utils/wishlist";
import { cn } from "@/lib/utils/tailwind-merge";
import { HeartMinus, HeartPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type WishlistButtonProp = { productId: string };

export default function WishlistButton({ product }: WishlistButtonProp) {
  const t = useTranslations("product-listing.wishlist-button");
  const { items, toggleWishlist, setItems, isWishlisted } = useWishlistContext();
  const { status } = useSession();
  const { mutateAsync: addToWishlist, isPending: isAdding } = useWishlistToAdd();
  const { mutateAsync: removeFromWishlist, isPending: isRemoving } = useWishlistToRemove();

  const isLoggedIn = status === "authenticated";
  const wishlisted = isWishlisted(product.id);
  const isLoading = isAdding || isRemoving;

  const toggleUserWishlist = async () => {
    if (!isLoggedIn) {
      toggleWishlist(productId);
      return;
    }

    try {
      if (wishlisted) {
        const wishlistItem = items.find((item) => item.product.id === product.id);

        if (!wishlistItem) return;

        await removeFromWishlist(wishlistItem.id);
        setItems((prev) => prev.filter((item) => item.product.id !== product.id));
      } else {
        const payload = await addToWishlist(product.id);
        const fromResponse = tryNormalizeWishlistPayload(payload);
        const createdItem =
          fromResponse?.items.find((item) => item.product.id === product.id) ??
          productToWishlistItem(product);

        setItems((prev) => mergeWishlistItems(prev, [createdItem]));
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update wishlist");
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void toggleUserWishlist();
      }}
      disabled={isLoading}
      className={cn(
        "group flex justify-center items-center gap-1 px-2 py-2 rounded-full font-medium text-xs transition-all",
        isLoading && "opacity-50 cursor-not-allowed",
        wishlisted ? "bg-zinc-800 text-zinc-100" : "bg-white text-maroon-600"
      )}
    >
      {wishlisted ? (
        <HeartMinus className="size-4" strokeWidth={1.48} />
      ) : (
        <HeartPlus className="size-4" strokeWidth={1.48} />
      )}

      <span className="opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[150px] whitespace-nowrap transition-all translate-x-[-8px] group-hover:translate-x-0 duration-300 ease-out">
        {wishlisted ? t("remove") : t("add")}
      </span>
    </button>
  );
}
