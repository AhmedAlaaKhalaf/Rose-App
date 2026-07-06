import { resetPasswordAction } from "@/lib/actions/auth.actions";
import { NewPasswordFields } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export default function useNewPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: NewPasswordFields) => {
      const payload = await resetPasswordAction({
        token: fields.token,
        newPassword: fields.password,
        confirmPassword: fields.confirmPassword,
      });

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Failed to reset password");
      }

      return payload;
    },
  });

  return { isPending, error, newPassword: mutate };
}
