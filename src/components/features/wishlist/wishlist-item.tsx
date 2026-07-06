"use client";

import AddToCartButton from "@/components/features/cart/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useWishlistToRemove } from "@/hooks/wishlist/use-wishlist";
import { TWishlistItem } from "@/lib/types/wishlist";
import { resolveProductCover } from "@/lib/utils/product-image";
import { cn } from "@/lib/utils/tailwind-merge";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

type WishlistItemProps = {
  item: TWishlistItem;
  onRemoved?: () => void;
};

export default function WishlistItem({ item, onRemoved }: WishlistItemProps) {
  const t = useTranslations("wishlist");
  const locale = useLocale();
  const { mutate: removeItem, isPending } = useWishlistToRemove();

  const { product } = item;
  const cover = resolveProductCover(product.cover);
  const currency = locale === "ar" ? "ج.م" : "EGP";
  const priceAfterDiscount =
    product.discountType === "PERCENT"
      ? +product.price - (+product.price * +product.discountValue) / 100
      : +product.price - +product.discountValue;

  const handleRemove = () => {
    if (item.id.startsWith("local-")) {
      onRemoved?.();
      return;
    }

    removeItem(item.id, {
      onSuccess: () => {
        toast.success(t("removed-success"));
        onRemoved?.();
      },
      onError: (error) => toast.error(error.message || t("remove-failed")),
    });
  };

  return (
    <article className="flex sm:items-center gap-4 bg-white dark:bg-zinc-900/40 p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
      <Link
        href={`/products/${product.id}`}
        className="relative flex-shrink-0 rounded-xl w-24 sm:w-28 h-24 sm:h-28 overflow-hidden"
      >
        <Image src={cover} alt={product.title} fill sizes="112px" className="object-cover" />
      </Link>

      <div className="flex flex-col flex-1 gap-3 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${product.id}`}
              className={cn(
                "font-semibold text-zinc-900 dark:text-zinc-50 text-base hover:text-maroon-700 line-clamp-2",
                locale === "ar" && "font-tajawal"
              )}
            >
              {product.title}
            </Link>
            <p className="mt-1 font-bold text-maroon-700 dark:text-softPink-200 text-lg">
              {priceAfterDiscount.toFixed(2)} {currency}
            </p>
            {product.discountValue && Number(product.discountValue) > 0 && (
              <p className="font-medium text-zinc-400 text-sm line-through">
                {Number(product.price).toFixed(2)} {currency}
              </p>
            )}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            disabled={isPending}
            className="flex-shrink-0 text-zinc-400 hover:text-red-600"
            aria-label={t("remove-item")}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="flex justify-end">
          <AddToCartButton
            productId={product.id}
            stock={product.stock}
            variant="full"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </article>
  );
}
