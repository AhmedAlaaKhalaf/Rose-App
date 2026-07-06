import React from "react";
import ProductCardSkeleton from "./product-card.skeleton";
import { cn } from "@/lib/utils/tailwind-merge";

const ProductListSkeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)} {...props}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
);

ProductListSkeleton.displayName = "ProductListSkeleton";

export default ProductListSkeleton;
