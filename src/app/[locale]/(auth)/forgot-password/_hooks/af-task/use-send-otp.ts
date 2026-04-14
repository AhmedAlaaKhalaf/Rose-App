import { sendOTPAction } from "@/lib/actions/auth.actions";
import { EmailStepField } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useSendOTP() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: EmailStepField) => {
      const payload = await sendOTPAction(fields);

      if ("message" in payload) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return { isPending, error, sendOTP: mutate };
}
