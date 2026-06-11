import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryKkelton() {
  return (
    <div className="space-y-2.5 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full bg-zinc-200 ">
          <Skeleton className="h-9 w-9 bg-zinc-400 " />
        </Skeleton>
      ))}
    </div>
  );
}
