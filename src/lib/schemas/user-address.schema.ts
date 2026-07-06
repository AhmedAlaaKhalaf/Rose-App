import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";
import { Translation } from "../types/global";

export const userAddressSchema = (t: Translation) =>
  z.object({
    title: z
      .string()
      .nonempty({ message: t("title.required") })
      .trim()
      .min(2, { message: t("title.min", { min: 2 }) })
      .max(40, { message: t("title.max", { max: 40 }) }),

    city: z
      .string()
      .nonempty({ message: t("city.required") })
      .trim()
      .min(2, { message: t("city.min", { min: 2 }) })
      .max(40, { message: t("city.max", { max: 40 }) }),

    street: z
      .string()
      .nonempty({ message: t("address.required") })
      .trim()
      .min(2, { message: t("address.min", { min: 2 }) })
      .max(200, { message: t("address.max", { max: 200 }) }),

    phone: z
      .string()
      .nonempty({ message: t("phone.required") })
      .refine(isValidPhoneNumber, { message: t("phone.invalid") }),
  });
