import { cn } from "@/lib/utils/tailwind-merge";
import { Star } from "lucide-react";

type starRatingPorps = {
  value: number;
  size?: number;
};

export default function StarRating({ value, size }: starRatingPorps) {
  return Array.from({ length: value }).map((_, key) => (
    <Star
      key={key}
      size={size}
      className={cn(
        "size-20",
        key < Math.round(value)
          ? "fill-[#FBA707] flex text-[#FBA707] size-4"
          : "flex text-[#FBA707] size-4"
      )}
    />
  ));
}
