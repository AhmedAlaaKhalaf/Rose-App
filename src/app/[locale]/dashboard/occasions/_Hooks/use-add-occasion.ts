import { useMutation } from "@tanstack/react-query";
import { checkToken } from "@/lib/utils/check-token";
import { addOccasionAction } from "../_actions/add-occasion.action";
import { TAddOccasionFields } from "@/lib/types/dashboard/occasions-db";

export default function useAddOccasion() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: TAddOccasionFields) => {
      // Get token from sessionStorage or cookies
      const token = checkToken();

      const payload = await addOccasionAction(
        {
          name: fields.name,
          image: fields.image,
        },
        token
      );

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { isPending, error, addOccasion: mutate };
}
