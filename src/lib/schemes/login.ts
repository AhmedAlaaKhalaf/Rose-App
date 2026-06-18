import { getTranslations } from "next-intl/server";
import z from "zod";

type Ttranslations = Awaited<ReturnType<typeof getTranslations>>;

export const loginSchema = (t: Ttranslations) =>
  z.object({
    username: z.string(),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t("password-invalid")
      ),
  });
