import { addOccasionSchema } from "@/lib/schemes/occasions-dashboard.schema";
import z from "zod";
import { TOccasion } from "../occasion";

export type TAddOccasionFields = z.infer<ReturnType<typeof addOccasionSchema>>;

export type TOccasionDetailsResponse = {
  occasion: TOccasion;
};

export type DeleteResponse = {
  message: string;
};
