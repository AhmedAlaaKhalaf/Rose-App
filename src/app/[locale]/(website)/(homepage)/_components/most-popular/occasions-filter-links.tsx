import { Link } from "@/i18n/navigation";
import { SearchParams } from "@/lib/types/global";
import { TOccasion } from "@/lib/types/occasion";
import { cn } from "@/lib/utils/tailwind-merge";

type OccasionsFilterLinksProps = {
  searchParams: SearchParams;
  occasions: TOccasion[];
};

export default function OccasionsFilterLinks({
  occasions,
  searchParams,
}: OccasionsFilterLinksProps) {
  // Variables
  const activeOccasionId = searchParams.occasionId;

  return (
    // Occasions Filter
    <ul className="flex flex-wrap sm:justify-between gap-2">
      {occasions.map(({ title, id }) => {
        const isActive = activeOccasionId === id;

        return (
          // Occasions link
          <li
            key={id}
            className={cn(
              "font-medium capitalize transition-colors cursor-pointer",
              isActive
                ? "text-maroon-600 dark:text-softPink-200"
                : "text-zinc-700 dark:text-zinc-400 hover:text-maroon-600"
            )}
          >
            <Link scroll={false} href={`?occasionId=${id}`} className="text-inherit">
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
