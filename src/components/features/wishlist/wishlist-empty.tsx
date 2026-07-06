"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function WishlistEmpty() {
  const t = useTranslations("wishlist");

  return (
    <div className="flex flex-col justify-center items-center gap-5 bg-white dark:bg-zinc-900/40 px-6 py-16 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-center">
      <div className="flex justify-center items-center bg-maroon-50 dark:bg-maroon-950/30 rounded-full size-20">
        <Heart className="size-10 text-maroon-700 dark:text-softPink-200" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 text-xl">{t("empty-title")}</h2>
        <p className="text-zinc-500 text-sm">{t("empty-desc")}</p>
      </div>
      <Button asChild className="rounded-full px-8">
        <Link href="/products">{t("continue-shopping")}</Link>
      </Button>
    </div>
  );
}
