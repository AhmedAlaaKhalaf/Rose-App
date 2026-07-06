import { useMutation } from "@tanstack/react-query";
import { RegisterFormFields } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function useRegister() {
  const router = useRouter();
  const t = useTranslations("auth.register");

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFormFields) => {
      const payload = await registerAction(fields);

      if (payload?.status === false) {
        const message = "message" in payload ? payload.message : undefined;
        throw new Error(message || "Registration failed");
      }

      return payload;
    },
    onSuccess: () => {
      toast.success(t("success-toast"));

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
  });

  return { isPending, error, register: mutate };
}
