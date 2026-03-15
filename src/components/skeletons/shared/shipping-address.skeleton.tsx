import { Skeleton } from "@/components/ui/skeleton";

export default function ShippingAddressSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-zinc-300 p-4 rounded-lg py-3 px-4 flex justify-between items-start"
        >
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-24 rounded" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
          <div className="flex gap-2 items-center">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-5 w-28 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
