"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TWishlistItem } from "@/lib/types/wishlist";
import { useLocale, useTranslations } from "next-intl";

type WishlistSummaryProps = {
  items: TWishlistItem[];
};

export default function WishlistSummary({ items }: WishlistSummaryProps) {
  const t = useTranslations("wishlist");
  const locale = useLocale();
  const currency = locale === "ar" ? "ج.م" : "EGP";

  const total = items.reduce((sum, item) => {
    const product = item.product;
    const priceAfterDiscount =
      product.discountType === "PERCENT"
        ? +product.price - (+product.price * +product.discountValue) / 100
        : +product.price - +product.discountValue;

    return sum + priceAfterDiscount;
  }, 0);

  return (
    <aside className="top-28 lg:sticky bg-white dark:bg-zinc-900/40 p-5 md:p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl h-fit">
      <h2 className="mb-5 font-semibold text-zinc-900 dark:text-zinc-50 text-xl">{t("summary")}</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-600 dark:text-zinc-300">{t("items-count", { count: items.length })}</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
            {total.toFixed(2)} {currency}
          </span>
        </div>

        <p className="text-zinc-500 text-sm leading-relaxed">{t("summary-desc")}</p>

        <Button asChild className="rounded-full w-full">
          <Link href="/products">{t("continue-shopping")}</Link>
        </Button>
      </div>
    </aside>
  );
}
