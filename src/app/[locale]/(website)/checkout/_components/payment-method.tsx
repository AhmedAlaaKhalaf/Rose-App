"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { TAddress } from "@/lib/types/addresses";
import { cashOrderService } from "@/lib/services/cash-order.service";
import { creditOrderService } from "@/lib/services/credit-order.service";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import useUserCart from "@/hooks/cart/use-user-cart";
import { getCartItems } from "@/lib/utils/cart";
import { useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "@/hooks/cart/cart-query";
import StripePaymentForm from "./stripe-payment-form";

type PaymentMethodProps = {
  selectedAddress: TAddress | null;
  onBack: () => void;
};

type CheckoutStatus = "idle" | "loading" | "success" | "error";

type PendingPayment = {
  clientSecret: string;
  publishableKey?: string;
};

export default function PaymentMethod({ selectedAddress, onBack }: PaymentMethodProps) {
  const t = useTranslations("checkout");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: cartData } = useUserCart();

  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);

  const paymentMethods = [
    {
      id: 1,
      name: "Cash on Delivery",
      image: "/assets/images/cash.png",
      description: t("cash-description"),
    },
    {
      id: 2,
      name: "Credit Card",
      image: "/assets/images/credit.png",
      description: t("credit-description"),
    },
  ];

  const cartItems = getCartItems(cartData);

  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
  };

  const completeCheckout = () => {
    invalidateCart();
    router.push("/orders");
  };

  const handleCheckout = async () => {
    if (!selectedAddress?.id || !selectedPaymentId || !session?.accessToken) return;

    if (cartItems.length === 0) {
      toast.error(t("cart-empty-checkout"));
      return;
    }

    setCheckoutStatus("loading");
    setPendingPayment(null);

    try {
      if (selectedPaymentId === 1) {
        await cashOrderService(session.accessToken, selectedAddress);
        toast.success(t("checkout-success-cash"));
        setCheckoutStatus("success");
        completeCheckout();
        return;
      }

      const response = await creditOrderService(session.accessToken, selectedAddress);

      if (response.checkoutUrl) {
        toast.success(t("checkout-success-credit"));
        window.location.href = response.checkoutUrl;
        return;
      }

      if (response.clientSecret) {
        setPendingPayment({
          clientSecret: response.clientSecret,
          publishableKey: response.publishableKey,
        });
        setCheckoutStatus("idle");
        toast.success(t("checkout-success-credit"));
        return;
      }

      toast.success(t("checkout-success-credit"));
      setCheckoutStatus("success");
      completeCheckout();
    } catch (error) {
      setCheckoutStatus("error");
      toast.error(error instanceof Error ? error.message : t("checkout-error"));
    }
  };

  const isCheckoutDisabled =
    !selectedAddress?.id ||
    !selectedPaymentId ||
    checkoutStatus === "loading" ||
    cartItems.length === 0 ||
    !!pendingPayment;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          className="flex justify-center items-center gap-2 px-5 py-2"
          onClick={onBack}
          disabled={checkoutStatus === "loading"}
        >
          <MoveLeft className="size-4" />
          {t("back")}
        </Button>

        <h2 className="font-semibold text-black dark:text-white text-3xl">{t("payment-method")}</h2>
      </div>

      {cartItems.length === 0 && (
        <p className="text-destructive text-sm">{t("cart-empty-checkout")}</p>
      )}

      <div className="flex gap-4 pb-9 border-zinc-100 border-b payment-methods">
        {paymentMethods.map((paymentMethod) => {
          const isSelected = selectedPaymentId === paymentMethod.id;

          return (
            <div
              key={paymentMethod.id}
              role="button"
              tabIndex={pendingPayment ? -1 : 0}
              aria-pressed={isSelected}
              aria-disabled={!!pendingPayment}
              onClick={() => {
                if (pendingPayment) return;
                setSelectedPaymentId(paymentMethod.id);
              }}
              onKeyDown={(e) => {
                if (pendingPayment) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPaymentId(paymentMethod.id);
                }
              }}
              className={cn(
                "flex flex-col justify-center items-center gap-2.5 p-4 border rounded-md w-1/2 text-left transition-colors",
                pendingPayment ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                isSelected ? "bg-zinc-100" : "border-zinc-100 hover:border-zinc-200"
              )}
            >
              <Image
                sizes="auto"
                src={paymentMethod.image}
                alt={paymentMethod.name}
                width={190}
                height={190}
              />
              <h3
                className={cn(
                  "font-semibold text-2xl transition-colors",
                  isSelected ? "text-primary" : "text-black dark:text-white"
                )}
              >
                {paymentMethod.name}
              </h3>
              <p className="font-semibold text-zinc-500 dark:text-zinc-300 text-sm">
                {paymentMethod.description}
              </p>
            </div>
          );
        })}
      </div>

      {pendingPayment && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">{t("complete-card-payment")}</h3>
          <StripePaymentForm
            clientSecret={pendingPayment.clientSecret}
            publishableKey={pendingPayment.publishableKey}
            onSuccess={() => {
              toast.success(t("checkout-success-credit"));
              completeCheckout();
            }}
          />
        </div>
      )}

      <div className="flex justify-end mt-3">
        <Button
          variant="default"
          className="flex justify-center items-center gap-2 px-5 py-2"
          disabled={isCheckoutDisabled}
          aria-busy={checkoutStatus === "loading"}
          onClick={handleCheckout}
        >
          {checkoutStatus === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("checkout-loading")}
            </>
          ) : (
            <>
              {t("checkout-button")}
              <MoveRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
