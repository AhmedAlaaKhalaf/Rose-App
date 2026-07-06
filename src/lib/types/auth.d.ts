import { registerSchema, resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { User } from "next-auth";
import { emailStepSchema, newPasswordSchema } from "../schemes/af-task-schema/auth.schema";
import z from "zod";

// Fields Types
export type RegisterFormFields = z.infer<ReturnType<typeof registerSchema>>;

export type EmailStepField = z.infer<ReturnType<typeof emailStepSchema>>;

export type NewPasswordFields = z.infer<ReturnType<typeof newPasswordSchema>>;

export type ResetPasswordFields = z.infer<ReturnType<typeof resetPasswordSchema>>;

// Confirm email-verification (registration step 2)
export type ConfirmEmailFields = {
  email: string;
  code: string;
};

// Response Types
export type loginResponse = {
  user: User["user"];
  token: string;
};

export type RegisterResponse = {
  token: string;
  user: User["user"];
};

export type EmailStepResponse = {
  info: string;
};

export type NewPasswordResponse = {
  token: string;
};
