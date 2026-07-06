import { forgotPasswordAction } from "@/lib/actions/auth.actions";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

// Requests a password reset email (forgot-password flow)
export default function useForgotPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepField) => {
      const payload = await forgotPasswordAction(fields);

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Failed to send reset email");
      }

      return payload;
    },
  });

  return { isPending, error, forgotPassword: mutate };
}
