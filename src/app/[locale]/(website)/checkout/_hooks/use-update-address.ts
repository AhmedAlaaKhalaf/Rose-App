import { useMutation } from "@tanstack/react-query";
import { updateUserAddressAction } from "../_actions/address.action";
import { TUserAddress } from "@/lib/types/user-address";

export default function useUpdateUserAddress() {
  return useMutation({
    mutationKey: ["update-address"],
    mutationFn: (addressDetails: TUserAddress) => updateUserAddressAction(addressDetails),
  });
}
