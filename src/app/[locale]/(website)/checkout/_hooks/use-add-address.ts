import { useMutation } from "@tanstack/react-query";
import { addUserAddressAction } from "../_actions/address.action";
import { TUserAddressDetails } from "@/lib/types/user-address";

export default function useAddUserAddress() {
  return useMutation({
    mutationKey: ["add-address"],
    mutationFn: (addressDetails: TUserAddressDetails) => addUserAddressAction(addressDetails),
  });
}
