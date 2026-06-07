"use client";

import { Button } from "@/components/ui/button";
import { removeCartItemAction } from "../_actions/user-cart.action";
import { ReactNode, useTransition } from "react";
import { cn } from "@/lib/utils/tailwind-merge";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type RemoveCartItemButton = {
  children: ReactNode;
  itemId: string;
};

export default function RemoveCartItemButton({ children, itemId }: RemoveCartItemButton) {
  // Translations
  const t = useTranslations("cart.toast-messages");

  // Hooks
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  // Functions
  const handleRemoveItem = () => {
    startTransition(async () => {
      try {
        await removeCartItemAction(itemId);

        toast.success(t("success.delete"), {
          className: cn(
            locale === "ar" ? "font-tajawal" : "font-inter",
            "font-semibold text-sm text-zinc-800 capitalize"
          ),
        });
      } catch (error) {
        void error;
        toast.error(t("fail.delete"), {
          className: cn(
            locale === "ar" ? "font-tajawal" : "font-inter",
            "font-semibold text-sm text-zinc-800 capitalize"
          ),
        });
      }
    });
  };
  return (
    <Button
      disabled={isPending}
      className="ms-auto w-full lg:w-[5.8203125rem] font-medium text-sm capitalize leading-none"
      onClick={handleRemoveItem}
    >
      {isPending ? <Spinner /> : children}
    </Button>
  );
}
