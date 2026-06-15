import { TReview } from "@/lib/types/reviews";
import Image from "next/image";
import { useFormatter } from "next-intl";
import { useSession } from "next-auth/react";
import StarRating from "@/components/shared/star-rating";

type ReviewProps = {
  review: TReview;
};

export default function ReviewCard({ review }: ReviewProps) {
  // Variables
  const createdAt = new Date(review.createdAt);

  // Hooks
  const format = useFormatter();
  const session = useSession();

  return (
    <div className="mb-3 pb-4 border-zinc-100 border-b w-full overflow-hidden">
      {/* User Info */}
      <div className="flex items-center gap-2 mb-2">
        <Image
          sizes="auto"
          src={session.data?.user.photo || "/public/assets/logo.png"}
          alt="userImage"
          className="bg-maroon-600 rounded-full h-11 object-cover"
          width={45}
          height={45}
        />
        <div>
          <p className="font-semibold text-zinc-800">
            {review.user.firstName} {review.user.lastName}
          </p>
          <p className="font-medium text-zinc-400 text-sm">{format.dateTime(createdAt, "short")}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex">
        <StarRating value={review.rating} />

        {/* <Rating value={}  variant="yellow" Icon={<Star strokeWidth={0} />} /> */}
        <span className="font-semibold text-zinc-800">({review.rating})</span>
      </div>

      {/* Review Title */}
      <h2 className="mt-2 font-semibold text-black">{review.headline}</h2>

      {/* Review Comment */}
      <p className="mt-1 text-zinc-600">
        {review.content} {review.content} {review.content} {review.content} {review.content}{" "}
        {review.content}
      </p>
    </div>
  );
}
