import React from "react";
import ProductCard from "./product-card";
import { Rose } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { getProducts } from "@/lib/services/product.service";
import { SearchParams } from "@/lib/types/global";
import { getTranslations } from "next-intl/server";

type ProductsListProps = {
  searchParams?: SearchParams;
  className?: string;
};

const ProductsList = React.forwardRef<HTMLDivElement, ProductsListProps>(
  async ({ searchParams, className }, ref) => {
    // Transilations
    const t = await getTranslations("product-listing");

    // Services
    const payload = await getProducts(searchParams);

    return (
      <div ref={ref} className={cn("gap-6 grid grid-cols-4", className)}>
        {/* Data  */}
        {payload.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}

        {/* No data to display.  */}
        {!payload.products.length && (
          <div className="flex flex-col justify-center items-center gap-3 col-span-4 py-20 font-medium text-zinc-500 text-sm capitalize leading-none">
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
