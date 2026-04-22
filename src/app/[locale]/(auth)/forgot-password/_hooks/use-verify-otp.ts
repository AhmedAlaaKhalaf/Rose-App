import { confirmEmailVerificationAction } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";

// Confirms the OTP from the registration email-verification flow
export default function useVerifyOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: { email: string; code: string }) => {
      const payload = await confirmEmailVerificationAction(fields);

      if (payload?.status === false) {
        throw new Error(payload.message || "Invalid verification code");
      }

      return payload;
    },
  });

  return { isVerifyPending: isPending, verifyError: error, verifyOtp: mutate };
}
