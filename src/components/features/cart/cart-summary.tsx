"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { TCartItem } from "@/lib/types/cart";
import { TicketPercent } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type CartSummaryProps = {
  items: TCartItem[];
  totalPrice: number;
  appliedCoupons: string[];
};

export default function CartSummary({ items, totalPrice, appliedCoupons }: CartSummaryProps) {
  const t = useTranslations("cart");
  const tCheckout = useTranslations("checkout");
  const locale = useLocale();
  const currency = locale === "ar" ? "ج.م" : "EGP";

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = totalPrice || subtotal;
  const discount = subtotal > total ? subtotal - total : 0;

  return (
    <aside className="top-28 lg:sticky bg-white dark:bg-zinc-900/40 p-5 md:p-6 border border-zinc-100 dark:border-zinc-800 rounded-2xl h-fit">
      <h2 className="mb-5 font-semibold text-zinc-900 dark:text-zinc-50 text-xl">
        {t("order-summary")}
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-stretch gap-2">
          <Input type="text" placeholder={tCheckout("coupon-code")} className="h-11" />
          <Button variant="default" className="gap-2 h-11 px-4">
            <TicketPercent className="size-4" />
            <span className="hidden sm:inline">{tCheckout("apply-coupon")}</span>
          </Button>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl min-h-20">
          {appliedCoupons.length === 0 ? (
            <p className="text-zinc-400 text-sm italic">{tCheckout("no-coupons-applied")}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {appliedCoupons.map((code) => (
                <span
                  key={code}
                  className="bg-primary/10 px-3 py-1 border border-primary/20 rounded-full font-medium text-primary text-sm"
                >
                  {code}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-600 dark:text-zinc-300">{tCheckout("subtotal")}</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              {subtotal.toFixed(2)} {currency}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-emerald-600">{t("discount")}</span>
              <span className="font-medium text-emerald-600">
                -{discount.toFixed(2)} {currency}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-3 border-zinc-100 dark:border-zinc-800 border-t">
            <span className="font-semibold text-zinc-900 dark:text-zinc-50 text-lg">
              {tCheckout("total")}
            </span>
            <span className="font-bold text-maroon-700 dark:text-softPink-200 text-2xl">
              {total.toFixed(2)} {currency}
            </span>
          </div>
        </div>

        <Button asChild className="rounded-full w-full h-12">
          <Link href="/checkout">{t("checkout")}</Link>
        </Button>

        <Button asChild variant="outline" className="rounded-full w-full h-11">
          <Link href="/products">{t("continue-shopping")}</Link>
        </Button>
      </div>
    </aside>
  );
}
