import { useMutation } from "@tanstack/react-query";
import { RegisterFormFields } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { registerAction } from "@/lib/actions/auth.action";
import { toast } from "sonner";

export default function useRegister() {
  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegisterFormFields) => {
      const payload = await registerAction(fields);

      if (payload?.status === false) {
        throw new Error(payload.message || "Registration failed");
      }

      return payload;
    },
    onSuccess: () => {
      toast.success("Your account has been created successfully.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
  });

  return { isPending, error, register: mutate };
}
