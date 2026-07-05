import { Skeleton } from "@/components/ui/skeleton";

export function OccasionsGridSkeleton() {
  return (
    <section className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="relative rounded-3xl aspect-[4/3] overflow-hidden">
          <Skeleton className="rounded-3xl w-full h-full" />
          <div className="right-0 bottom-0 left-0 absolute space-y-3 p-6">
            <Skeleton className="rounded w-2/3 h-7" />
            <Skeleton className="rounded w-full h-4" />
            <Skeleton className="rounded w-1/3 h-4" />
          </div>
        </div>
      ))}
    </section>
  );
}

export default function OccasionsPageSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <header className="flex flex-col items-center gap-3">
        <Skeleton className="rounded w-28 h-5" />
        <Skeleton className="rounded w-72 max-w-full h-10" />
      </header>
      <OccasionsGridSkeleton />
    </div>
  );
}
