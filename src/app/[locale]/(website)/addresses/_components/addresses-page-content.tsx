"use client";

import { AddAddressModalButton } from "@/app/[locale]/(website)/checkout/_components/add-address-modal-button";
import CheckoutAddressesList from "@/app/[locale]/(website)/checkout/_components/checkout-addresses-list";
import ErrorBoundary from "@/components/shared/error-boundary";
import ShippingAddressSkeleton from "@/components/skeletons/shared/shipping-address.skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getShippingAddress } from "@/lib/services/shipping-address.service";
import { TUserAddress } from "@/lib/types/user-address";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function AddressesPageContent() {
  const t = useTranslations("addresses");
  const tCheckout = useTranslations("checkout");
  const { data: session, status: sessionStatus } = useSession();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["shipping-address", session?.accessToken],
    queryFn: () => {
      if (!session?.accessToken) {
        throw new Error("You must be logged in to view your addresses");
      }
      return getShippingAddress(session.accessToken);
    },
    enabled: sessionStatus === "authenticated" && !!session?.accessToken,
  });

  const addresses = (data?.addresses ?? []) as TUserAddress[];
  const isPending = sessionStatus === "loading" || (sessionStatus === "authenticated" && isLoading);

  if (sessionStatus === "unauthenticated") {
    return (
      <div className="space-y-8">
        <h1 className="font-semibold text-black dark:text-white text-3xl">{t("title")}</h1>
        <div className="flex flex-col justify-center items-center gap-5 bg-white dark:bg-zinc-900/40 px-6 py-16 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-center">
          <div className="space-y-2 max-w-md">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50 text-xl">{t("login-title")}</h2>
            <p className="text-zinc-500 text-sm">{t("login-desc")}</p>
          </div>
          <Button asChild className="rounded-full px-8">
            <Link href="/login">{t("login-button")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 border-zinc-100 pb-9 border-b">
      <h1 className="font-semibold text-black dark:text-white text-3xl">{tCheckout("shipping-address")}</h1>

      {isPending && <ShippingAddressSkeleton />}

      {error && <ErrorBoundary onRetry={refetch} error={error} />}

      {!isPending && !error && (
        <>
          <CheckoutAddressesList userAddresses={addresses} />

          <div className="flex flex-nowrap justify-between items-center gap-2">
            <div className="bg-zinc-100 w-1/2 h-px" />
            <p className="font-semibold text-zinc-500 dark:text-zinc-400 text-lg">{tCheckout("or")}</p>
            <div className="bg-zinc-100 w-1/2 h-px" />
          </div>

          <AddAddressModalButton triggerClassName="w-full" />
        </>
      )}
    </div>
  );
}
