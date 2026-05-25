import { Translation } from "@/lib/types/global";
import z from "zod";

export const emailStepSchema = (t: Translation) =>
  z.object({
    email: z.email(t("validation-email")).nonempty(t("email-require")),
  });

export const newPasswordSchema = (t: Translation) =>
  z
    .object({
      password: z
        .string()
        .nonempty(t("password-require"))
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, `${t("strong-password")}`),
      confirmPassword: z.string().nonempty(t("rePassword-require")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password-confirmPassword"),
      path: ["confirmPassword"],
    });
