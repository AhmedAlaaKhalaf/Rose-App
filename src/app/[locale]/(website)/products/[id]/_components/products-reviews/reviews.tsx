"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductReviews } from "../../_hooks/use-product-reviews";
import ReviewCard from "./review-card";
import ReviewCardSkeleton from "@/components/skeletons/review-card/review-card.skeleton";
import ErrorBoundary from "@/components/shared/error-boundary";
import { useLocale } from "next-intl";

export default function Reviews({ productId }: { productId: string }) {
  // Hooks
  const locale = useLocale();
  const { reviewsOfProduct, isLoading, error, refetch } = useProductReviews(productId);

  // Handling Error
  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  return (
    <ScrollArea
      className="col-span-2 me-1 p-2 pe-4 border-e border-zinc-100"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="h-80">
        {isLoading ? (
          <ReviewCardSkeleton />
        ) : (
          reviewsOfProduct?.payload.data.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
