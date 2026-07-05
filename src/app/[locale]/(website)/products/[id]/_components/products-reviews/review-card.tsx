"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/star-rating";
import { TReview } from "@/lib/types/reviews";
import { Star } from "lucide-react";
import { useFormatter } from "next-intl";

type ReviewProps = {
  review: TReview;
};

export default function ReviewCard({ review }: ReviewProps) {
  const createdAt = new Date(review.createdAt);
  const format = useFormatter();
  const initials =
    `${review.user.firstName?.charAt(0) ?? ""}${review.user.lastName?.charAt(0) ?? ""}`.toUpperCase() ||
    "U";

  return (
    <article className="mb-4 last:mb-0 pb-5 last:pb-0 border-zinc-100 dark:border-zinc-800 border-b last:border-b-0">
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-11 h-11">
          {review.user.photo && <AvatarImage src={review.user.photo} alt={review.user.firstName} />}
          <AvatarFallback className="bg-maroon-600 font-semibold text-white">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
            {review.user.firstName} {review.user.lastName}
          </p>
          <p className="text-zinc-400 text-sm">{format.dateTime(createdAt, "short")}</p>
        </div>

        <div className="flex items-center gap-1.5">
          <Rating value={review.rating} size={16} variant="yellow" Icon={<Star strokeWidth={0} />} />
          <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-sm">
            {review.rating}
          </span>
        </div>
      </div>

      <h4 className="mb-1 font-semibold text-zinc-900 dark:text-zinc-50">{review.headline}</h4>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{review.content}</p>
    </article>
  );
}
