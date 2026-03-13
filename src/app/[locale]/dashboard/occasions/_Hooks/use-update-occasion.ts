import { useMutation } from "@tanstack/react-query";
import { checkToken } from "@/lib/utils/check-token";
import { TAddOccasionFields } from "@/lib/types/dashboard/occasions-db";
import { updateOccasionAction } from "../_actions/update-occasion.action";

export default function useUpdateOccasion(id: string) {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: TAddOccasionFields) => {
      // Get token from sessionStorage or cookies
      const token = checkToken();

      const payload = await updateOccasionAction(
        id,
        { name: fields.name, image: fields.image },
        token
      );

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return { isPending, error, updateOccasion: mutate };
}
