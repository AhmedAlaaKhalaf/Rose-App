import { useMutation } from "@tanstack/react-query";
import { addOccasionAction } from "../_actions/add-occasion.action";
import { TAddOccasionFields } from "@/lib/types/dashboard/occasions-db";

export default function useAddOccasion(fields: TAddOccasionFields) {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: () =>
      addOccasionAction({
        name: fields.name,
        image: fields.image,
      }),
  });

  return { isPending, error, addOccasion: mutate };
}
