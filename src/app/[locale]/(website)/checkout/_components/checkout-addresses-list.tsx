import { TUserAddress } from "@/lib/types/user-address";
import CheckoutAddress from "./checkout-address";
import { MapPinHouse } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

type CheckoutAddressesList = {
  userAddresses: TUserAddress[] | null;
};

export default function CheckoutAddressesList({ userAddresses }: CheckoutAddressesList) {
  if (!userAddresses)
    return (
      <section className="border border-zinc-200 rounded-3xl flex flex-col items-center gap-4 p-5 text-zinc-400">
        <MapPinHouse className="size-64" strokeWidth={1.48} />
        <p className="text-lg leading-none">Sign in to see your addresses</p>
      </section>
    );

  return !userAddresses.length ? (
    <section className="border border-zinc-200 rounded-3xl flex flex-col items-center gap-4 p-5 text-zinc-400">
      <MapPinHouse className="size-64" strokeWidth={1.48} />
      <p className="text-lg leading-none">There are no addresses.</p>
    </section>
  ) : (
    <section
      className={cn(
        "flex flex-col gap-9 max-h-128",
        userAddresses.length > 3 && "py-2 pe-5 overflow-y-auto scroll-smooth overflow-x-hidden"
      )}
    >
      {userAddresses.map((userAddress) => (
        <CheckoutAddress key={userAddress._id} userAddress={userAddress} />
      ))}
    </section>
  );
}
// There are no addresses.
