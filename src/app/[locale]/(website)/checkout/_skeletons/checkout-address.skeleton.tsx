import { Skeleton } from "@/components/ui/skeleton";

export function CheckoutAddressSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="p-4 border border-zinc-300 rounded-3xl">
          <Skeleton className="h-6 w-1/3 mb-3" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      ))}
    </div>
  );
}
