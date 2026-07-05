"use client";

import { Button } from "@/components/ui/button";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type StripePaymentFormProps = {
  clientSecret: string;
  publishableKey?: string;
  onSuccess: () => void;
};

function readEnvPublishableKey() {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || "";
}

async function fetchPublishableKeyFromApi() {
  const response = await fetch("/api/stripe/publishable-key");

  if (!response.ok) {
    return "";
  }

  const payload = (await response.json()) as { publishableKey?: string };
  return payload.publishableKey?.trim() || "";
}

function PaymentForm({ clientSecret, onSuccess }: StripePaymentFormProps) {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const returnUrl = `${window.location.origin}/${locale}/orders?payment=success`;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    setIsSubmitting(false);

    if (error) {
      toast.error(error.message || t("checkout-error"));
      return;
    }

    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-zinc-50 dark:bg-zinc-900/40 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl"
    >
      <PaymentElement />
      <Button type="submit" className="w-full" disabled={!stripe || !elements || isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            {t("payment-processing")}
          </>
        ) : (
          t("pay-now")
        )}
      </Button>
    </form>
  );
}

export default function StripePaymentForm({
  clientSecret,
  publishableKey,
  onSuccess,
}: StripePaymentFormProps) {
  const t = useTranslations("checkout");
  const [resolvedKey, setResolvedKey] = useState(publishableKey?.trim() || readEnvPublishableKey());
  const [isResolvingKey, setIsResolvingKey] = useState(!resolvedKey);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function resolvePublishableKey() {
      const directKey = publishableKey?.trim() || readEnvPublishableKey();

      if (directKey) {
        if (isMounted) {
          setResolvedKey(directKey);
          setIsResolvingKey(false);
        }
        return;
      }

      setIsResolvingKey(true);

      const apiKey = await fetchPublishableKeyFromApi();

      if (isMounted) {
        setResolvedKey(apiKey);
        setIsResolvingKey(false);
      }
    }

    void resolvePublishableKey();

    return () => {
      isMounted = false;
    };
  }, [publishableKey]);

  useEffect(() => {
    setStripePromise(resolvedKey ? loadStripe(resolvedKey) : null);
  }, [resolvedKey]);

  const options = useMemo<StripeElementsOptions>(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe",
      },
    }),
    [clientSecret]
  );

  if (isResolvingKey) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <Loader2 className="size-4 animate-spin" />
        {t("checkout-loading")}
      </div>
    );
  }

  if (!stripePromise) {
    return <p className="text-destructive text-sm">{t("stripe-key-missing")}</p>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
}
