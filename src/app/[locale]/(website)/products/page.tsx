import { WishlistProvider } from "@/components/providers/wishlist/wishlist.provider";
import ProductsList from "@/components/shared/products-list";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { SearchParams } from "@/lib/types/global";
import { Suspense } from "react";
import OccasionFilter from "./_components/occasion-filter";
import PriceFilter from "./_components/price-filter";

type ProductsPageProps = { searchParams: SearchParams };

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <main className="flex md:flex-row flex-col gap-6 dark:bg-zinc-800 mx-auto mb-44 max-w-[91.5%]">
      {/* Filtration Sidebar  */}
      <aside className="flex flex-col flex-1 pe-[21px] border-e border-zinc-100 dark:border-zinc-700 h-full">
        <OccasionFilter />

        <PriceFilter />
      </aside>
      {/* Content */}
      <div className="space-y-6">
        {/* Products */}
        <Suspense fallback={<ProductListSkeleton />}>
          <WishlistProvider>
            <ProductsList
              searchParams={searchParams}
              className="gap-4 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3"
            />
          </WishlistProvider>
        </Suspense>

        {/* Pagination */}
        {/* <ProductsPagination /> */}
      </div>
    </main>
  );
}
