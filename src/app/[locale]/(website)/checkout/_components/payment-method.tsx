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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/tailwind-merge";

type PaymentMethodProps = {
  selectedAddress: TAddress | null;
  onBack: () => void;
};

type CheckoutStatus = "idle" | "loading" | "success" | "error";

export default function PaymentMethod({ selectedAddress, onBack }: PaymentMethodProps) {
  
  // Translation
  const t = useTranslations("checkout");

  // Router
  const router = useRouter();

  // Session
  const { data: session } = useSession();

  // State
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");

  // Selected Payment ID
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);

  // Payment Methods
  const paymentMethods = [
    {
      id: 1,
      name: "Cash on Delivery",
      image: "/assets/images/cash.png",
      description: "You'll pay in cash when your order is delivered.",
    },
    {
      id: 2,
      name: "Credit Card",
      image: "/assets/images/credit.png",
      description: "You'll be securely redirected to Stripe to complete your payment.",
    },
  ];

  const handleCheckout = async () => {
    if (!selectedAddress || !selectedPaymentId || !session?.accessToken) return;

    setCheckoutStatus("loading");
    try {

      // Cash Order
      if (selectedPaymentId === 1) {
        await cashOrderService(session.accessToken, selectedAddress);
        toast.success(t("checkout-success-cash"));
        setCheckoutStatus("success");
        router.push("/allOrders");
      } else {

        // Credit Order
        const response = await creditOrderService(session.accessToken, selectedAddress);
        toast.success(t("checkout-success-credit"));
        window.location.href = response.session.url;
      }
    } catch {
      setCheckoutStatus("error");
      toast.error(t("checkout-error"));
    }
  };

  const isCheckoutDisabled =
    !selectedAddress || !selectedPaymentId || checkoutStatus === "loading";

  return (
    <div className="flex flex-col gap-5">
      {/* Back button and title */}
      <div className="flex gap-3 items-center">

        {/* Back button */}
        <Button
          variant="secondary"
          className="py-2 px-5 flex items-center justify-center gap-2"
          onClick={onBack}
        >
          <MoveLeft className="size-4" />
          {t("back")}
        </Button>

        <h2 className="text-3xl font-semibold text-black dark:text-white">{t("payment-method")}</h2>
      </div>

      {/* Payment methods */}
      <div className="flex gap-4 payment-methods border-b border-zinc-100 pb-9">
        {paymentMethods.map((paymentMethod) => {

          // Check which payment method is selected
          const isSelected = selectedPaymentId === paymentMethod.id;

          // Return the payment method component
          return (
            <div
              key={paymentMethod.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => setSelectedPaymentId(paymentMethod.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPaymentId(paymentMethod.id);
                }
              }}
              className={cn(
                "w-1/2 flex flex-col gap-2.5 justify-center items-center p-4 border rounded-md cursor-pointer transition-colors text-left",
                isSelected
                  ? "bg-zinc-100"
                  : "border-zinc-100 hover:border-zinc-200"
              )}
            >
              <Image src={paymentMethod.image} alt={paymentMethod.name} width={190} height={190} />
              <h3
                className={cn(
                  "text-2xl font-semibold transition-colors",
                  isSelected ? "text-primary" : "text-black dark:text-white"
                )}
              >
                {paymentMethod.name}
              </h3>
              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-300">{paymentMethod.description}</p>
            </div>
          );
        })}
      </div>

      {/* Checkout button */}
      <div className="flex justify-end mt-3">
        <Button
          variant="default"
          className="py-2 px-5 flex items-center justify-center gap-2"
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
