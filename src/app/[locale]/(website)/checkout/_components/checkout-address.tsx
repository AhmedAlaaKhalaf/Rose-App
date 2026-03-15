import { TUserAddress } from "@/lib/types/user-address";
import { cn } from "@/lib/utils/tailwind-merge";
import { MapPin, Phone } from "lucide-react";
import { DeleteAddressModalButton } from "./delete-address-modal-button";
import { UpdateAddressModalButton } from "./update-address-modal-button";

export type CheckoutAddressProps = {
  userAddress: TUserAddress;
};

export default function CheckoutAddress({ userAddress }: CheckoutAddressProps) {
  //Variables
  const { street, phone, city, _id, username } = userAddress;

  return (
    <fieldset className="relative w-full">
      <label
        className={cn(
          "flex flex-col gap-4 relative",
          "pt-6 pb-5 ps-4 pe-9",
          "border border-zinc-300 hover:border-maroon-600 rounded-3xl",
          "dark:hover:bg-softPink-100 dark:hover:border-softPink-300"
        )}
      >
        {/* Name  */}
        <span className="-top-[1.125rem] start-3 absolute bg-white p-1 font-semibold text-maroon-600 text-2xl leading-none">
          {username}
        </span>

        {/* Header  */}
        <header className="flex justify-between items-center">
          {/* City */}
          <p className="flex items-center gap-2 font-semibold text-zinc-800 text-2xl leading-none dark:text-zinc-50">
            {/* Location */}
            <span className="flex justify-center items-center bg-emerald-500 rounded-full size-8">
              <MapPin className="size-5 text-white" strokeWidth={1.48} />
            </span>
            {city}
          </p>

          {/* Phone */}
          <p className="flex items-center gap-2 font-medium text-zinc-600 text-lg leading-none dark:text-zinc-50">
            {/* Phone Icon */}
            <span className="flex justify-center items-center rounded-full size-8">
              <Phone className="size-5 text-zinc-800" strokeWidth={1.48} />
            </span>
            {!phone.startsWith("+2") && "+2"}
            {phone}
          </p>
        </header>

        {/* Footer  */}
        <footer className="w-fit bg-zinc-100 px-3 py-1 rounded-full font-medium text-zinc-800">
          {street}
        </footer>

        {/* Radio input  */}
        <input type="radio" name="address" className="appearance-none" />
      </label>

      {/* Actions */}
      <span className="top-1/2 -translate-y-1/2 -end-[1.125rem] absolute flex flex-col gap-1">
        {/* Edit */}
        <UpdateAddressModalButton userAddress={userAddress} />

        {/* Delete */}
        <DeleteAddressModalButton addressId={_id} />
      </span>
    </fieldset>
  );
}
