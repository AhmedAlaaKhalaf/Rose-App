"use client";

import CarouselFallback from "@/components/shared/carousel-fallback";
import ErrorBoundary from "@/components/shared/error-boundary";
import ProductCard from "@/components/shared/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRelatedProducts } from "@/hooks/related-products/use-related-products";
import { Link } from "@/i18n/navigation";

export default function RelatedCarousel({ id }: { id: string }) {
  // Variables
  const direction =
    typeof document !== "undefined" && document.documentElement.dir === "rtl" ? "rtl" : "ltr";

  // Hooks
  const { data, isLoading, error, refetch } = useRelatedProducts(id);

  // Handling Loading
  if (isLoading) return <CarouselFallback />;

  // Handling the Error
  if (error) return <ErrorBoundary onRetry={refetch} error={error} />;

  // Related Products Carousel
  return (
    <Carousel
      opts={{
        align: "start",
        direction: direction,
      }}
    >
      {data?.payload.data.length === 0 ? (
        <p className="py-10 text-zinc-500 text-sm text-center">No related products found</p>
      ) : (
        <CarouselContent className="px-2 py-3" dir={direction}>
          {data?.payload.data.map((product) => (
            <CarouselItem key={product.id} className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4">
              <Link href={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>{" "}
            </CarouselItem>
          ))}
        </CarouselContent>
      )}

      {/* Carousel Buttons */}
      <CarouselNext
        variant={"destructive"}
        className="bg-maroon-600 rounded-3xl size-10 rtl:-start-2 ltr:-end-2"
      />

      <CarouselPrevious
        variant={"destructive"}
        className="bg-maroon-600 rounded-3xl size-10 rtl:-end-2 ltr:-start-2"
      />
    </Carousel>
  );
}
