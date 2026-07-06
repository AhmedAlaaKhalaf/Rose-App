"use client";

import { Button } from "@/components/ui/button";
import useAddToCart from "@/hooks/cart/use-add-to-cart";
import { cn } from "@/lib/utils/tailwind-merge";
import { Loader2, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type AddToCartButtonProps = {
  productId: string;
  stock?: number;
  variant?: "icon" | "full";
  className?: string;
  onAdded?: () => void;
};

export default function AddToCartButton({
  productId,
  stock = 1,
  variant = "full",
  className,
  onAdded,
}: AddToCartButtonProps) {
  const t = useTranslations("cart");
  const { status } = useSession();
  const { mutate, isPending } = useAddToCart();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (status !== "authenticated") {
      toast.error(t("login-required"));
      return;
    }

    if (!stock) {
      toast.error(t("out-of-stock"));
      return;
    }

    mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(t("added-success"));
          onAdded?.();
        },
        onError: (error) => {
          toast.error(error.message || t("add-failed"));
        },
      }
    );
  };

  if (variant === "icon") {
    return (
      <Button
        type="button"
        onClick={handleClick}
        disabled={isPending || !stock}
        className={cn("rounded-full size-10", className)}
        aria-label={t("add-to-cart")}
      >
        {isPending ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <ShoppingCart className="size-6 text-maroon-50" strokeWidth={1.48} />
        )}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleClick}
      disabled={isPending || !stock}
      className={cn("flex-1 gap-2 rounded-full h-12", className)}
    >
      {isPending ? <Loader2 className="size-5 animate-spin" /> : <ShoppingCart className="size-5" />}
      {t("add-to-cart")}
    </Button>
  );
}
