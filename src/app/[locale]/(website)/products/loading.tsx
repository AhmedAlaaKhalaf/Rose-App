import PageLoadingShell from "@/components/shared/page-loading-shell";
import ProductListSkeleton from "@/components/skeletons/shared/product-list.skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <PageLoadingShell className="mx-auto mt-16 mb-44 max-w-[91.5%]">
      <main className="gap-6 grid grid-cols-10 dark:bg-zinc-800">
        <aside className="space-y-8 col-span-2 pe-[21px] border-zinc-100 dark:border-zinc-700 border-e h-full">
          <div className="space-y-4 pb-5 border-zinc-100 dark:border-zinc-700 border-b">
            <Skeleton className="w-24 h-6" />
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="rounded-lg w-[calc(50%-0.375rem)] h-[74px]" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="w-16 h-6" />
            <div className="flex gap-2">
              <Skeleton className="rounded-md w-1/2 h-10" />
              <Skeleton className="rounded-md w-1/2 h-10" />
            </div>
          </div>
        </aside>
        <div className="col-span-8">
          <ProductListSkeleton className="gap-4 grid-cols-3" />
        </div>
      </main>
    </PageLoadingShell>
  );
}
