import ProductsList from "@/components/shared/products-list";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import { serializeProductFiltersKey } from "@/lib/utils/product-filters";
import { Suspense } from "react";
import OccasionFilter from "./_components/occasion-filter";
import PriceFilter from "./_components/price-filter";

type ProductsPageProps = { searchParams: SearchParams };

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filtersKey = serializeProductFiltersKey(searchParams);

  return (
    <main className="gap-6 grid grid-cols-10 dark:bg-zinc-800 mx-auto mt-16 mb-44 max-w-[91.5%]">
      <aside className="col-span-2 pe-[21px] border-e border-zinc-100 dark:border-zinc-700 h-full">
        <OccasionFilter />
        <PriceFilter />
      </aside>
      <div className="space-y-6 col-span-8">
        <Suspense key={filtersKey} fallback={<ProductListSkeleton />}>
          <ProductsList searchParams={searchParams} className="gap-4 grid-cols-3" />
        </Suspense>
      </div>
    </main>
  );
}
