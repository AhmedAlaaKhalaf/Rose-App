import { confirmEmailVerificationAction } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

// Confirms the OTP from the registration email-verification flow
export default function useVerifyOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: { email: string; code: string }) => {
      const payload = await confirmEmailVerificationAction(fields);

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Invalid verification code");
      }

      return payload;
    },
  });

  return { isVerifyPending: isPending, verifyError: error, verifyOtp: mutate };
}
