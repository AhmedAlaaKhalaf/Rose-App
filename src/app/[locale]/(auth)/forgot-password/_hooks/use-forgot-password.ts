import { forgotPasswordAction } from "@/lib/actions/auth.actions";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

// Requests a password reset email (forgot-password flow)
export default function useForgotPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepField) => {
      const payload = await forgotPasswordAction(fields);

      if (payload?.status === false) {
        throw new Error(payload.message || "Failed to send reset email");
      }

      return payload;
    },
  });

  return { isPending, error, forgotPassword: mutate };
}
