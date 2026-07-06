"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import useRemoveFromCart from "@/hooks/cart/use-remove-from-cart";
import useUpdateCartItem from "@/hooks/cart/use-update-cart-item";
import { TCartItem } from "@/lib/types/cart";
import { resolveProductCover } from "@/lib/utils/product-image";
import { cn } from "@/lib/utils/tailwind-merge";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

type CartItemProps = {
  item: TCartItem;
};

export default function CartItem({ item }: CartItemProps) {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { mutate: updateItem } = useUpdateCartItem();
  const { mutate: removeItem } = useRemoveFromCart();

  const productId = item.product.id;
  const cartItemId = item.id;
  const cover = resolveProductCover(item.product.cover);
  const currency = locale === "ar" ? "ج.م" : "EGP";
  const lineTotal = item.price * item.quantity;

  const handleQuantityChange = (quantity: number) => {
    if (quantity < 1) return;

    updateItem(
      { cartItemId, quantity },
      {
        onError: (error) => toast.error(error.message || t("update-failed")),
      }
    );
  };

  const handleRemove = () => {
    removeItem(cartItemId, {
      onSuccess: () => toast.success(t("removed-success")),
      onError: (error) => toast.error(error.message || t("remove-failed")),
    });
  };

  return (
    <article className="flex sm:items-center gap-4 bg-white dark:bg-zinc-900/40 p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
      <Link
        href={`/products/${productId}`}
        className="relative flex-shrink-0 rounded-xl w-24 sm:w-28 h-24 sm:h-28 overflow-hidden"
      >
        <Image src={cover} alt={item.product.title} fill sizes="112px" className="object-cover" />
      </Link>

      <div className="flex flex-col flex-1 gap-3 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${productId}`}
              className={cn(
                "font-semibold text-zinc-900 dark:text-zinc-50 text-base hover:text-maroon-700 line-clamp-2",
                locale === "ar" && "font-tajawal"
              )}
            >
              {item.product.title}
            </Link>
            <p className="mt-1 font-medium text-zinc-500 text-sm">
              {item.price.toFixed(2)} {currency}
            </p>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="flex-shrink-0 text-zinc-400 hover:text-red-600"
            aria-label={t("remove-item")}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="inline-flex items-center border border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-none size-9"
              disabled={item.quantity <= 1}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <Minus className="size-4" />
            </Button>
            <span className="px-3 min-w-10 font-semibold text-zinc-800 dark:text-zinc-100 text-sm text-center">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-none size-9"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus className="size-4" />
            </Button>
          </div>

          <p className="font-bold text-maroon-700 dark:text-softPink-200 text-lg whitespace-nowrap">
            {lineTotal.toFixed(2)} {currency}
          </p>
        </div>
      </div>
    </article>
  );
}
