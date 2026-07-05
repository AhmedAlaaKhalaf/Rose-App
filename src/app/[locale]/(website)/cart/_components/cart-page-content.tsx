"use client";

import CartEmpty from "@/components/features/cart/cart-empty";
import CartItem from "@/components/features/cart/cart-item";
import CartSummary from "@/components/features/cart/cart-summary";
import ErrorBoundary from "@/components/shared/error-boundary";
import LogoSpinner from "@/components/shared/logo-spinner";
import { SectionHead } from "@/components/ui/section-header";
import useUserCart from "@/hooks/cart/use-user-cart";
import { getCartItems } from "@/lib/utils/cart";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function CartPageContent() {
  const t = useTranslations("cart");
  const { status: sessionStatus } = useSession();
  const { data, isLoading, error, refetch } = useUserCart();

  if (sessionStatus === "loading" || (sessionStatus === "authenticated" && isLoading)) {
    return <LogoSpinner fullScreen size={88} />;
  }

  if (error) {
    return <ErrorBoundary onRetry={refetch} error={error} />;
  }

  const cart = data?.cart;
  const items = getCartItems(data);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4">
        <SectionHead size="sm">{t("title")}</SectionHead>
        {items.length > 0 && (
          <p className="font-medium text-zinc-500 text-sm">
            {t("items-count", { count: data?.numOfCartItems ?? items.length })}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="gap-8 grid lg:grid-cols-[minmax(0,1fr)_380px] items-start">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CartSummary
            items={items}
            totalPrice={cart?.totalPrice ?? 0}
            appliedCoupons={cart?.appliedCoupons ?? []}
          />
        </div>
      )}
    </div>
  );
}
