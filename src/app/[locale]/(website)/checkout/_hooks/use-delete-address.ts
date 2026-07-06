import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAddressAction } from "../_actions/address.action";

export default function useDeleteUserAddress(addressId: string) {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["address", addressId],
    mutationFn: () => deleteUserAddressAction(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
    },
  });

  return { isPending, error, mutateAsync };
}
