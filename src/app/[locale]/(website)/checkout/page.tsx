"use client";

import { useState } from "react";
import type { TAddress } from "@/lib/types/addresses";
import ShippingAddress from "./_components/shipping-address";
import PaymentMethod from "./_components/payment-method";
import { Progress } from "@/components/ui/progress";

export default function CheckoutSteps() {
  const [step, setStep] = useState<"shipping-address" | "payment-method">("shipping-address");
  const [selectedAddress, setSelectedAddress] = useState<TAddress | null>(null);

  // Render the checkout steps
  return (
    <div className="w-full">
      {/* Step progress bar with numbered circles */}
      <div className="relative w-full mb-6">
        <Progress value={step === "shipping-address" ? 33 : 100} className="w-full h-2" />
        {/* Step 1 */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-primary text-white`}
          style={{ left: "33%", transform: "translate(-50%, -50%)" }}
        >
          1
        </span>
        {/* Step 2 */}
        <span
          className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step === "payment-method" ? "bg-primary text-primary-foreground" : "bg-zinc-200 text-zinc-500"}`}
          style={{ left: "66%", transform: "translate(-50%, -50%)" }}
        >
          2
        </span>
      </div>

      {step === "shipping-address" && (
        <ShippingAddress
          selectedAddress={selectedAddress}
          onSelectAddress={setSelectedAddress}
          onNext={() => setStep("payment-method")}
        />
      )}
      {step === "payment-method" && (
        <PaymentMethod selectedAddress={selectedAddress} onBack={() => setStep("shipping-address")} />
      )}
    </div>
  );
}
