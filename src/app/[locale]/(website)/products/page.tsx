import ProductsList from "@/components/shared/products-list";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import { serializeProductFiltersKey } from "@/lib/utils/product-filters";
import { Suspense } from "react";
import ProductsFilters from "./_components/products-filters";

type ProductsPageProps = { searchParams: SearchParams };

export const PRODUCT_GRID_CLASS =
  "gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filtersKey = serializeProductFiltersKey(searchParams);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl">
      <ProductsFilters />
      <Suspense key={filtersKey} fallback={<ProductListSkeleton className={PRODUCT_GRID_CLASS} />}>
        <ProductsList searchParams={searchParams} className={PRODUCT_GRID_CLASS} />
      </Suspense>
    </main>
  );
}
