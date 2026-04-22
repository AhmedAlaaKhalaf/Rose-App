import { sendEmailVerificationAction } from "@/lib/actions/auth.actions";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

// Sends a 6-digit OTP for the registration email-verification flow
export default function useSendOTP() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepField) => {
      const payload = await sendEmailVerificationAction(fields);

      if (payload?.status === false) {
        throw new Error(payload.message || "Failed to send verification code");
      }

      return payload;
    },
  });

  return { isPending, error, sendOTP: mutate };
}
