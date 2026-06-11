import { Skeleton } from "@/components/ui/skeleton";

export default function CategorySkeleton() {
  return (
    <div className="space-y-2.5 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="bg-zinc-200 w-full h-9">
          <Skeleton className="bg-zinc-400 w-9 h-9" />
        </Skeleton>
      ))}
    </div>
  );
}
