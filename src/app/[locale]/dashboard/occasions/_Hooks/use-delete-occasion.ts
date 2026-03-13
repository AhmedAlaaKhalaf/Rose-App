import { useMutation } from "@tanstack/react-query";
import { checkToken } from "@/lib/utils/check-token";
import { deleteOccasionAction } from "../_actions/delete-occsion.action";

export default function useDeleteOccasion() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      // Get token from sessionStorage or cookies
      const token = checkToken();

      const payload = await deleteOccasionAction(id, token);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { isPending, error, deleteOccasion: mutate };
}
