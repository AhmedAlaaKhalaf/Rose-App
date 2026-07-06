import { sendEmailVerificationAction } from "@/lib/actions/auth.actions";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

// Sends a 6-digit OTP for the registration email-verification flow
export default function useSendOTP() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepField) => {
      const payload = await sendEmailVerificationAction(fields);

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Failed to send verification code");
      }

      return payload;
    },
  });

  return { isPending, error, sendOTP: mutate };
}
