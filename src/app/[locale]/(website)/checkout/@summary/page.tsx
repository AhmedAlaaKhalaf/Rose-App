"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketPercent } from "lucide-react";
import { useTranslations } from "next-intl";
import useUserCart from "@/hooks/cart/use-user-cart";

export default function CartSummary() {
    // Translation
    const t = useTranslations("checkout");

    // Get user cart
    const { data } = useUserCart();

    // User cart data
    const userCart = data?.cart ?? null;
    const userCartItems = userCart?.cartItems ?? [];
    const userCartTotalPrice = userCart?.totalPrice ?? 0;
    const userCartAppliedCoupons = userCart?.appliedCoupons ?? [];

    // Calculate subtotal from cart items (price * quantity)
    const subtotal = userCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Derive discount and total from API response
    const total = userCartTotalPrice || subtotal;
    const discount = subtotal > total ? subtotal - total : 0;

    return <div className="flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-black dark:text-white">{t("summary")}</h2>
        <div className="flex flex-col gap-3 bg-zinc-50 p-4 rounded-sm">

            {/* Apply Coupon Input*/}
            <div className="flex justify-between items-stretch gap-2">
                <div className="flex-1">
                    <Input type="text" placeholder={t("coupon-code")} className="w-full h-12"/>
                </div>
                <Button variant="default" className="flex items-center gap-2 h-12 px-5">
                    <TicketPercent className="size-5" />
                    {t("apply-coupon")}</Button>
            </div>

            {/* Applied Coupons */}
            <div className="flex flex-col gap-3 border border-zinc-300 rounded-sm p-4 min-h-[120px]">
                {userCartAppliedCoupons.length === 0 ? (
                    <p className="text-zinc-400 italic">
                        {t("no-coupons-applied")}
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {userCartAppliedCoupons.map((code) => (
                            <span
                                key={code}
                                className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                                {code}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center">
                <p className="text-lg text-black dark:text-white">{t("subtotal")}</p>
                <p className="text-lg text-black dark:text-white">
                    {subtotal.toLocaleString()} {t("currency")}
                </p>
            </div>

             {/* Discount Applied */}
            <div className="flex items-center justify-between gap-2 flex-nowrap">
                <div className="w-1/3 h-[1px] bg-zinc-300"></div>
                <p className="text-zinc-500 font-semibold dark:text-zinc-400">
                    {discount > 0
                        ? t("discount-applied", { amount: discount.toLocaleString() })
                        : t("no-coupons-applied")}
                </p>
                <div className="w-1/3 h-[1px] bg-zinc-300"></div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold text-black dark:text-white">{t("total")}</p>
                <p className="text-2xl font-semibold text-black dark:text-white">
                    {total.toLocaleString()} {t("currency")}
                </p>
            </div>

        </div>
    </div>
}