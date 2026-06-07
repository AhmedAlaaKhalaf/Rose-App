import { Skeleton } from "@/components/ui/skeleton";

export function CartItemsListSkeleton() {
  return (
    <div className="space-y-5 p-5 border border-border rounded-md">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex gap-4 pb-5 border-border dark:border-zinc-700 border-b">
          {/* Skeleton Cart image */}
          <Skeleton className="rounded-md w-[117px] h-[140px] max-h-[8.75rem] shrink-0" />
          {/* Skeleton Cart details */}
          <div className="flex lg:flex-row flex-col flex-1 justify-between gap-4 lg:gap-0">
            {/* Skeleton Cart detail */}
            <div className="flex flex-col flex-1 justify-between h-full">
              {/* Skeleton Cart title & rating wrapper */}
              <div className="space-y-3">
                {/* item name */}
                <Skeleton className="w-3/4 h-5" />
                {/* Cart title / Rating */}
                <div className="flex items-center gap-2">
                  {/* Star icon placeholder */}
                  <Skeleton className="rounded-full size-5" />
                  {/* Rating text placeholder */}
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>

              {/* Cart price */}
              <div className="flex items-center gap-2 mt-6 lg:mt-auto">
                {/* Quantity multiplier */}
                <Skeleton className="w-12 h-4" />
                {/* Price number */}
                <Skeleton className="w-20 h-7" />
                {/* Currency */}
                <Skeleton className="w-8 h-4" />
              </div>
            </div>

            {/* Skeleton Cart actions */}
            <div className="flex flex-col justify-between items-end gap-4 lg:gap-0 min-w-[120px]">
              {/* Item delete button placeholder */}
              <Skeleton className="w-full max-w-[140px] h-10" />

              {/* Quantity picker placeholder */}
              <Skeleton className="w-full max-w-[140px] h-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
