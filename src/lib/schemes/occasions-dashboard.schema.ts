import { Translation } from "@/lib/types/global";
import z from "zod";

export const addOccasionSchema = (t: Translation) =>
  z.object({
    name: z.string().min(5).nonempty(),
    image: z.string().nonempty(),
  });

export const updateOccasionSchema = () =>
  z.object({
    name: z.string().min(5).nonempty(),
  });
