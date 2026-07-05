import ProductCard from "@/components/shared/product-card";
import { Rose } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { getProductsWithOccasionFallback } from "@/lib/services/product.service";
import { getLocale, getTranslations } from "next-intl/server";

type MostPopularProductsListProps = {
  occasionId?: string;
  className?: string;
};

export default async function MostPopularProductsList({
  occasionId,
  className,
}: MostPopularProductsListProps) {
  const t = await getTranslations("product-listing");
  const locale = await getLocale();

  const {
    payload: { data: products },
  } = await getProductsWithOccasionFallback(occasionId);

  return (
    <div className={cn("gap-6 grid grid-cols-4", className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {!products.length && (
        <div
          className={cn(
            locale === "ar" && "font-tajawal",
            "flex flex-col justify-center items-center gap-3 col-span-4 py-20 font-medium text-zinc-500 text-sm capitalize leading-none"
          )}
        >
          <Rose className="size-12 text-zinc-500" strokeWidth={1.75} />
          {t("no-products-message")}
        </div>
      )}
    </div>
  );
}
