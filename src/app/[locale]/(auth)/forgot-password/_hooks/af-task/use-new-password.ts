import { newPasswordAction } from "@/lib/actions/auth.actions";
import { NewPasswordFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useNewPassword() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: NewPasswordFields & { email: string }) => {
      const payload = await newPasswordAction({
        email: fields.email,
        newPassword: fields.password,
      });

      if ("message" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isPending, error, newPassword: mutate };
}
