import { useMutation } from "@tanstack/react-query";
import { deleteUserAddressAction } from "../_actions/address.action";

export default function useDeleteUserAddress(addressId: string) {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["address", addressId],
    mutationFn: () => deleteUserAddressAction(addressId),
  });

  return { isPending, error, mutateAsync };
}
