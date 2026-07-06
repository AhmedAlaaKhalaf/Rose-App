import { confirmEmailVerificationAction } from "@/lib/actions/auth.actions";
import { ConfirmEmailFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useConfirmEmailVerification() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ConfirmEmailFields) => {
      const payload = await confirmEmailVerificationAction(fields);

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Invalid verification code");
      }

      return payload;
    },
  });

  return { isPending, error, confirmEmailVerification: mutate };
}
