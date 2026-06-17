"use client";

import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/cart/use-add-to-cart";
import { Loader2, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type AddToCartProps = {
  outOfStock: boolean;
  product: string;
};

export default function AddToCartButton({ outOfStock, product }: AddToCartProps) {
  // translation
  const t = useTranslations("product-page");

  // hooks
  const { mutate: addToCart, isPending } = useAddToCart();

  // functions
  const handleAddToCart = () => {
    addToCart(
      { product, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(t("added-to-cart-success"), {
            duration: 3000,
          });
        },
        onError: () => {
          toast.error(t("added-to-cart-error"), {
            duration: 3000,
          });
        },
      }
    );
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={outOfStock || isPending}
      className="flex items-center justify-center gap-2 text-zinc-50 dark:text-zinc-800 font-medium flex-grow"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <Loader2 size={20} className="animate-spin" /> {t("Adding-to-Cart")}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingCart size={25} className="text-zinc-50 dark:text-zinc-800" />
          {t("Add-to-Cart")}
        </span>
      )}
    </Button>
  );
}
