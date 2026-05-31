import { useMutation } from "@tanstack/react-query";
import { deleteOccasionAction } from "../_actions/delete-occasion.action";

export default function useDeleteOccasion(id: string) {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: () => deleteOccasionAction(id),
  });

  return { isPending, error, deleteOccasion: mutate };
}
