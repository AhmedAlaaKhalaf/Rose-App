"use client";

import { Button } from "@/components/ui/button";
import { clearCartAction } from "../_actions/user-cart.action";
import { ReactNode, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { toast } from "sonner";

export default function ClearUserCartButton({ children }: { children: ReactNode }) {
  // Translations
  const t = useTranslations("cart.toast-messages");

  // Hooks
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  // Functions
  const handleClearCart = () => {
    try {
      startTransition(async () => {
        await clearCartAction();

        toast.success(t("success.clear"), {
          className: cn(
            locale === "ar" ? "font-tajawal" : "font-inter",
            "font-semibold text-sm text-zinc-800 capitalize"
          ),
        });
      });
    } catch (error) {
      void error;
      toast.error(t("fail.clear"), {
        className: cn(
          locale === "ar" ? "font-tajawal" : "font-inter",
          "font-semibold text-sm text-zinc-800 capitalize"
        ),
      });
    }
  };

  return (
    <Button
      disabled={isPending}
      variant={"secondary"}
      className="w-[7.930625rem] font-mulish font-semibold text-sm"
      onClick={handleClearCart}
    >
      {isPending ? <Spinner /> : children}
    </Button>
  );
}
