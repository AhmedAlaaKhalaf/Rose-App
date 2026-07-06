import { Translation } from "@/lib/types/global";
import z from "zod";

export const reviewSchema = (t: Translation) =>
  z.object({
    rating: z
      .number()
      .min(1, t("rating-required"))
      .max(5),
    title: z.string().trim().min(1, t("title-field")).min(3).max(100),
    comment: z.string().trim().min(1, t("comment-required")).max(500),
  });
