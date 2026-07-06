"use client";

import ErrorBoundary from "@/components/shared/error-boundary";
import ReviewCardSkeleton from "@/components/skeletons/review-card/review-card.skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useProductReviews } from "../../_hooks/use-product-reviews";
import ReviewCard from "./review-card";

export default function Reviews({ productId }: { productId: string }) {
  const t = useTranslations("product-reviews");
  const { reviewsOfProduct, isLoading, error, refetch } = useProductReviews(productId);

  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  const reviews = reviewsOfProduct?.payload.data ?? [];

  return (
    <div className="bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 rounded-2xl min-h-[20rem] overflow-hidden">
      <ScrollArea className="h-[28rem] md:h-[32rem]">
        <div className="p-5 md:p-6">
          {isLoading ? (
            <ReviewCardSkeleton />
          ) : reviews.length === 0 ? (
            <p className="py-16 text-zinc-500 text-sm text-center">{t("no-reviews")}</p>
          ) : (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
