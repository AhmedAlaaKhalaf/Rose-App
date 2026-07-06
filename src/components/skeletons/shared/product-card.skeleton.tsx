import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <section className="space-y-4">
      {/* Cover */}
      <section className="relative h-[14rem] sm:h-[17rem]">
        <Skeleton className="h-full w-full rounded-3xl bg-zinc-300 dark:bg-zinc-600" />
      </section>

      {/* Details */}
      <footer className="space-y-2">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />

        {/* Rating + Price + Button */}
        <div className="flex justify-between items-center pt-3">
          {/* Rating + Price */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              ))}
            </div>
            <Skeleton className="h-4 w-20 rounded bg-zinc-300 dark:bg-zinc-600" />
            <Skeleton className="h-4 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
          </div>

          {/* Add to cart button */}
          <Skeleton className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
        </div>
      </footer>
    </section>
  );
}
