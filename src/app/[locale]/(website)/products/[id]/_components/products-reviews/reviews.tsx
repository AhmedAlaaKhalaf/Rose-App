"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductReviews } from "../../_hooks/use-product-reviews";
import ReviewCard from "./review-card";
import ReviewCardSkeleton from "@/components/skeletons/review-card/review-card.skeleton";
import ErrorBoundary from "@/components/shared/error-boundary";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { Rose } from "lucide-react";

export default function Reviews({ productId }: { productId: string }) {
  // Translations
  const t = useTranslations("product-reviews");

  // Services
  const { reviewsOfProduct, isLoading, error, refetch } = useProductReviews(productId);

  // Hooks
  const locale = useLocale();

  // Handling Loading state
  if (isLoading) return <ReviewCardSkeleton />;

  // Handling Error
  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  return (
    <ScrollArea
      className="col-span-2 me-1 p-2 pe-4 border-e border-zinc-100"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="h-80">
        {/* Loading  */}
        {/* {isLoading && <ReviewCardSkeleton />} */}

        {!reviewsOfProduct?.payload.data.length ? (
          <div
            className={cn(
              locale === "ar" && "font-tajawal",
              "flex flex-col justify-center items-center gap-3 col-span-4 py-20 font-medium text-zinc-500 text-sm capitalize leading-none"
            )}
          >
            <Rose className="size-12 text-zinc-500" strokeWidth={1.75} />
            {t("no-reviews-found")}
          </div>
        ) : (
          reviewsOfProduct?.payload.data.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>
    </ScrollArea>
  );
}
