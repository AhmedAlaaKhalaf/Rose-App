import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";
import { Translation } from "../types/global";

export const registerSchema = (t: Translation) =>
  z
    .object({
      // Username
      username: z
        .string()
        .nonempty({ message: t("username.required") })
        .trim()
        .min(3, { message: t("username.min", { min: 3 }) })
        .max(20, { message: t("username.max", { max: 20 }) })
        .regex(/^[a-zA-Z0-9_]+$/, { message: t("username.invalid") }),

      // First name
      firstName: z
        .string()
        .nonempty({ message: t("firstName.required") })
        .trim()
        .min(2, { message: t("firstName.min", { min: 2 }) })
        .max(20, { message: t("firstName.max", { max: 20 }) }),

      // Last name
      lastName: z
        .string()
        .nonempty({ message: t("lastName.required") })
        .trim()
        .min(2, { message: t("lastName.min", { min: 2 }) })
        .max(20, { message: t("lastName.max", { max: 20 }) }),

      // Email
      email: z
        .string()
        .nonempty({ message: t("email.required") })
        .trim()
        .email({ message: t("email.invalid") })
        .min(5, { message: t("email.tooShort") })
        .max(128, { message: t("email.tooLong") }),

      // Phone (optional in API)
      phone: z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || isValidPhoneNumber(val), {
          message: t("phone.invalid"),
        }),

      // Gender (optional in API; values are MALE | FEMALE)
      gender: z.enum(["MALE", "FEMALE"]).optional(),

      // Password
      password: z
        .string()
        .nonempty({ message: t("password.required") })
        .trim()
        .min(8, { message: t("password.min", { min: 8 }) })
        .max(20, { message: t("password.max", { max: 20 }) })
        .regex(/[A-Z]/, { message: t("password.upper") })
        .regex(/[a-z]/, { message: t("password.lower") })
        .regex(/[0-9]/, { message: t("password.number") })
        .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, { message: t("password.special") }),

      // Confirm password
      confirmPassword: z.string().nonempty({ message: t("confirmPassword.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("password.mismatch"),
      path: ["confirmPassword"],
    });

// Reset password (used by forgot-password flow with a token from email)
export const resetPasswordSchema = (t: Translation) =>
  z
    .object({
      token: z
        .string()
        .nonempty({ message: t("token.required") })
        .trim(),
      newPassword: z
        .string()
        .nonempty({ message: t("password.required") })
        .trim()
        .min(8, { message: t("password.min", { min: 8 }) })
        .regex(/[A-Z]/, { message: t("password.upper") })
        .regex(/[a-z]/, { message: t("password.lower") })
        .regex(/[0-9]/, { message: t("password.number") }),
      confirmPassword: z.string().nonempty({ message: t("confirmPassword.required") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("password.mismatch"),
      path: ["confirmPassword"],
    });
