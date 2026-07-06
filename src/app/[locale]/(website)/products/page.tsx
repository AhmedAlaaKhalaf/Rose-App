import ProductsList from "@/components/shared/products-list";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import { serializeProductFiltersKey } from "@/lib/utils/product-filters";
import { Suspense } from "react";
import FiltersSidebar from "./_components/filters-sidebar";

type ProductsPageProps = { searchParams: SearchParams };

export const PRODUCT_GRID_CLASS =
  "gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filtersKey = serializeProductFiltersKey(searchParams);

  return (
    <main className="flex md:flex-row flex-col gap-6 md:gap-8 mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 w-full container">
      {/* Filtration sidebar (accordion on mobile) */}
      <FiltersSidebar />

      {/* Products */}
      <div className="space-y-6 w-full min-w-0">
        <Suspense
          key={filtersKey}
          fallback={<ProductListSkeleton className={PRODUCT_GRID_CLASS} />}
        >
          <ProductsList searchParams={searchParams} className={PRODUCT_GRID_CLASS} />
        </Suspense>
      </div>
    </main>
  );
}
