import { Skeleton } from "@/components/ui/skeleton";

type ReviewCardSkeletonProps = {
  length?: number;
};

export default function ReviewCardSkeleton({ length = 2 }: ReviewCardSkeletonProps) {
  return (
    <div className="lg:col-span-8 me-1 p-2 pe-4 border-border lg:border-e h-96">
      {Array.from({ length }).map((_, key) => (
        <div key={key} className="mb-3 pb-4 border-zinc-100 border-b w-full overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex justify-center items-center border rounded-full w-11 h-11 overflow-hidden">
              <Skeleton className="rounded-full w-11 h-11" />
            </div>
            <div>
              <Skeleton className="mb-1 rounded w-28 h-4" />
              <Skeleton className="rounded w-20 h-3" />
            </div>
          </div>
          <div className="flex gap-1 my-2">
            {/* Placeholder for rating stars */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="rounded-full w-4 h-4" />
            ))}
          </div>
          <Skeleton className="mt-2 rounded w-44 h-5" />
          <Skeleton className="mt-1 rounded w-full h-4" />
          <Skeleton className="mt-1 rounded w-5/6 h-4" />
        </div>
      ))}
    </div>
  );
}
