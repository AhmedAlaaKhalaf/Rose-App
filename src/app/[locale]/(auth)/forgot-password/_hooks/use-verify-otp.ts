import { verifyOtp } from "@/lib/actions/auth.actions";
import { VerifyOtpFields } from "@/lib/types/auth-types/forgot-password";
import { useMutation } from "@tanstack/react-query";

export default function useVerifyOtp() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (resetCode: VerifyOtpFields) => {
      const payload = await verifyOtp(resetCode);

      if ("message" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isVerifyPending: isPending, verifyError: error, verifyOtp: mutate };
}
