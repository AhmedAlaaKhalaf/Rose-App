import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAddressAction } from "../_actions/address.action";
import { TUserAddress } from "@/lib/types/user-address";

export default function useUpdateUserAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-address"],
    mutationFn: (addressDetails: TUserAddress) => updateUserAddressAction(addressDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
    },
  });
}
