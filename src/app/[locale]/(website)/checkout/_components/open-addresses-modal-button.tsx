import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddAddressModalButton } from "./add-address-modal-button";
import { Suspense } from "react";
import { CheckoutAddressSkeleton } from "../_skeletons/checkout-address.skeleton";
import CheckoutAddressesList from "./checkout-addresses-list";
import { getUserAddresses } from "@/lib/services/user-address.service";
import { TUserAddress } from "@/lib/types/user-address";
import { getDecodedToken } from "@/hooks/shared/use-decoded-token";
import { getTranslations } from "next-intl/server";

export async function OpenAddressesModalButton() {
  // Translation
  const t = await getTranslations("user-address.modal.addresses-list");

  // Variables
  const token = await getDecodedToken();
  let userAddresses: TUserAddress[] | null = null;

  if (token) {
    const payload = await getUserAddresses();
    userAddresses = payload.addresses;
  }

  return (
    // Addresses Modal
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">{t("create-button")}</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="">
        {/* Header  */}
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <AddAddressModalButton />
        </DialogHeader>

        {/* Addresses */}
        <Suspense fallback={<CheckoutAddressSkeleton />}>
          <CheckoutAddressesList userAddresses={userAddresses} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
