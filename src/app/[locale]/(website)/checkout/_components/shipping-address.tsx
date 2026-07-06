"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { getShippingAddress } from "@/lib/services/shipping-address.service";
import type { TAddress } from "@/lib/types/addresses";
import { MoveRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShippingAddressSkeleton from "@/components/skeletons/shared/shipping-address.skeleton";
import { AddAddressModalButton } from "./add-address-modal-button";

type ShippingAddressProps = {
  selectedAddress: TAddress | null;
  onSelectAddress: (address: TAddress) => void;
  onNext: () => void;
};

export default function ShippingAddress({
  selectedAddress,
  onSelectAddress,
  onNext,
}: ShippingAddressProps) {
  // Translation
  const t = useTranslations("checkout");
  const { data: session } = useSession();

  // Get shipping addresses
  const { data, isLoading, error } = useQuery({
    queryKey: ["shipping-address", session?.accessToken],
    queryFn: () => {
      if (!session?.accessToken) {
        throw new Error("You must be logged in to view your shipping addresses");
      }
      return getShippingAddress(session.accessToken);
    },
    enabled: !!session?.accessToken,
  });

  // Get addresses
  const addresses = data?.addresses ?? [];
  const isPending = !session?.accessToken || isLoading;

  return (
    <>
      <div className="flex flex-col gap-6 pb-9 border-zinc-100 border-b">
        {/* Title  */}
        <h2 className="font-semibold text-black dark:text-white text-3xl">
          {t("shipping-address")}
        </h2>

        {/* Loading skeleton */}
        {isPending && <ShippingAddressSkeleton />}

        {/* Error */}
        {error && <div className="text-destructive">Error: {error.message}</div>}

        {/* No addresses */}
        {!isPending && !error && addresses.length === 0 && (
          <p className="text-muted-foreground">No shipping addresses yet.</p>
        )}

        {/* Addresses */}
        {!isPending && addresses.length > 0 && (
          <div className="flex flex-col gap-3 h-[320px] overflow-y-auto scrollbar-primary">
            {addresses.map((address) => {
              // Check if the address is selected
              const isSelected = selectedAddress?.id === address.id;

              return (
                <button
                  key={address.id}
                  type="button"
                  onClick={() => onSelectAddress(address)}
                  className={`border p-4 rounded-lg py-3 px-4 flex justify-between items-start text-left transition-colors ${
                    isSelected ? "border-primary bg-primary text-white" : "border-zinc-300"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {/* City */}
                    <h3 className={`text-2xl font-semibold ${isSelected ? "text-white" : "text-black dark:text-white"}`}>
                      {address.title} · {address.city}
                    </h3>

                    {/* Street */}
                    <div
                      className={`py-1 px-3 rounded-full text-center ${
                        isSelected ? "bg-black" : "bg-zinc-100"
                      }`}
                    >
                      <p
                        className={`text-sm ${isSelected ? "text-white" : "text-black dark:text-white"}`}
                      >
                        {address.street}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center p-1 w-9 h-9 rounded-full ${
                        isSelected ? "bg-white" : "bg-primary"
                      }`}
                    >
                      <Phone className={`size-4 ${isSelected ? "text-primary" : "text-white"}`} />
                    </div>
                    <p
                      className={`text-lg font-medium ${isSelected ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`}
                    >
                      {address.phone}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* OR */}
        <div className="flex flex-nowrap justify-between items-center gap-2">
          <div className="bg-zinc-100 w-1/2 h-[1px]"></div>
          <p className="font-semibold text-zinc-500 dark:text-zinc-400 text-lg">{t("or")}</p>
          <div className="bg-zinc-100 w-1/2 h-[1px]"></div>
        </div>

        {/* Add address button */}
        <AddAddressModalButton triggerClassName="w-full" />
      </div>

      {/* Next button */}
      <div className="flex justify-end mt-3">
        <Button
          variant="default"
          className="flex justify-center items-center gap-2 px-5 py-2"
          onClick={onNext}
          disabled={!selectedAddress}
        >
          {t("next")}
          <MoveRight className="size-4" />
        </Button>
      </div>
    </>
  );
}
