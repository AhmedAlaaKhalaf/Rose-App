import React from "react";
import ProductCard from "./product-card";
import { Rose } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { getProducts } from "@/lib/services/product.service";
import { SearchParams, TLocale } from "@/lib/types/global";
import { getLocale, getTranslations } from "next-intl/server";

type ProductsListProps = {
  searchParams?: SearchParams;
  className?: string;
};

const ProductsList = React.forwardRef<HTMLDivElement, ProductsListProps>(
  async ({ searchParams, className }, ref) => {
    const t = await getTranslations("product-listing");

    // Hooks
    const locale = (await getLocale()) as TLocale;

    // Services
    const {
      payload: { data: products },
    } = await getProducts(searchParams);

    return (
      <div ref={ref} className={cn("gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
        {/* Data  */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* No data to display.  */}
        {!products.length && (
          <div
            className={cn(
              locale === "ar" && "font-tajawal",
              "flex flex-col justify-center items-center gap-3 col-span-full py-20 font-medium text-zinc-500 text-sm capitalize leading-none"
            )}
          >
            <Rose className="size-12 text-zinc-500" strokeWidth={1.75} />
            {t("no-products-message")}
          </div>
        )}
      </div>
    );
  }
);

ProductsList.displayName = "ProductsList";

export default ProductsList;
