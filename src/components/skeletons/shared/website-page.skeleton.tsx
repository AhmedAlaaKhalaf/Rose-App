import { Skeleton } from "@/components/ui/skeleton";

export default function WebsitePageSkeleton() {
  return (
    <div className="space-y-8 mx-auto px-4 sm:px-6 lg:px-8 mt-24 md:mt-28 mb-16 md:mb-24 max-w-7xl animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="rounded w-32 h-5" />
        <Skeleton className="rounded w-64 h-10" />
      </div>
      <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="rounded-3xl w-full aspect-[4/3]" />
        ))}
      </div>
    </div>
  );
}
