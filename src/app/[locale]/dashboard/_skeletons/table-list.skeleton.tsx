import { Skeleton } from "@/components/ui/skeleton";

export default function OccasionListSkeleton() {
  return (
    <tr className="hover:bg-maroon-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-32 rounded-md bg-zinc-100" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Skeleton className="h-4 w-24 rounded-md bg-zinc-100" />
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-20 rounded-md bg-zinc-100" />
          <Skeleton className="h-8 w-20 rounded-md bg-zinc-100" />
        </div>
      </td>
    </tr>
  );
}
